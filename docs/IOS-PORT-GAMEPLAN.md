# Pinyin Reader — iOS Port & Monetization Gameplan

**Status:** Draft v1 · **Audience:** solo developer (you), building with Claude Code
**Scope:** Ship the full existing web app (all 13 feature areas) as a native App Store app, then make it pay for itself and more.

---

## TL;DR (the decisions, up front)

1. **Port approach: Capacitor hybrid.** Keep `app.js` + `index.html` almost verbatim inside a WKWebView (Capacitor shell), and write **native Swift plugins only where a webview genuinely fails**: audio session / background audio, mic capture (Whisper, pitch shadowing, ACRCloud), StoreKit 2 IAP, file/EPUB import, share extension, push. Do **not** rewrite 7k lines of working JS in SwiftUI.
2. **Milestones:** M0 wrap & TestFlight (week 1–2) → M1 native audio/mic bridges (week 3–5) → M2 accounts + StoreKit paywall + server-side entitlements (week 6–8) → M3 offline/perf/polish (week 9–10) → M4 App Review hardening & submission (week 11–12).
3. **Pricing: freemium subscription.** Free tier = dictionary/breakdown, stroke order, flashcards, HSK games (non-AI), limited TTS. **Pro at $9.99/mo or $59.99/yr** unlocks unlimited natural TTS, reader audiobook mode, video mode, karaoke, register lens, daily serial — with a **metered Realtime tutor allowance (60 min/mo)** plus consumable top-ups. No lifetime tier (your costs are recurring).
4. **All API keys stay on the VPS.** The app talks only to your server; entitlements are validated server-side from StoreKit JWS transactions; per-user quotas protect the OpenAI bill. (You already had one key-leak incident — the architecture below makes a repeat structurally impossible.)
5. **Biggest risks:** App Review on the video-link features (guideline 5.2.3), OpenAI cost blowout on a viral spike, and the home RTX 3070 as a single point of failure. Each has a concrete mitigation in Part B §10.

---

# Part A — Porting strategy (technical)

## A1. Recommended approach: Capacitor hybrid (webview shell + native plugins)

### The three options, honestly compared

| | (a) Pure WKWebView/Capacitor wrapper | (b) Full SwiftUI rewrite | (c) **Hybrid: Capacitor + native plugins** |
|---|---|---|---|
| Time to all 13 features live | ~2–4 weeks | 6–12+ months, realistically never at feature parity for a solo dev | **~10–12 weeks** |
| Code reuse | ~100% of app.js | ~0% (server reused) | ~95% of app.js |
| Background audiobook/karaoke audio | ❌ webview audio dies on lock/background | ✅ | ✅ via AVAudioSession plugin |
| Mic for Whisper / pitch / ACRCloud | ⚠️ getUserMedia works in WKWebView since iOS 14.3 but is flaky: no background capture, sample-rate quirks, permission UX is poor | ✅ | ✅ AVAudioEngine plugin |
| StoreKit IAP | ❌ (and 3.1.1 forbids web payments for digital goods anyway) | ✅ | ✅ StoreKit 2 plugin |
| EPUB/PDF/SRT file import, "Open in…" | ⚠️ clunky `<input type=file>` only | ✅ | ✅ UIDocumentPicker + share extension |
| App Review perception | Risk of 4.2 "minimum functionality" (looks like a website) | Fine | **Fine** — native audio, IAP, share ext, widgets make it clearly an app |
| Maintenance | One codebase | Two codebases forever (web + iOS) | One codebase + a thin plugin layer |
| Risk of regressions | Low | Very high (re-implementing HanziWriter, EPUB rendering, pitch detection, karaoke sync…) | Low |

### Recommendation: **(c) Hybrid**, without hesitation

You have a working, feature-dense, no-build vanilla-JS app. The value is in the 7k lines of `app.js` and the server pipeline — not in the rendering layer. A SwiftUI rewrite would mean re-implementing HanziWriter stroke animation, EPUB pagination, LRC karaoke sync, tone-color rendering, the SRS engine, and the video subtitle player from scratch; that's 6–12 months of risk for zero user-visible gain. A *pure* wrapper, meanwhile, silently breaks the features that make the app special (audiobook mode dies when the screen locks; ACRCloud can't hear the room reliably; you can't take money).

Capacitor specifically (over bare WKWebView) because: it gives you the Xcode project scaffolding, a stable JS↔Swift bridge (`Capacitor.Plugins.X.call()` with typed plugin API), a plugin ecosystem you can cherry-pick (Filesystem, Preferences, Haptics, Share), `capacitor://localhost` origin (so `getUserMedia`, service workers, and IndexedDB behave like a real origin), and live-reload during dev. Your no-build setup ports trivially: `npx cap add ios`, point `webDir` at the folder containing `index.html` + `app.js`.

### Exactly which features need native help (the honest list)

A WKWebView **cannot or should not** handle:

1. **Background audio** (audiobook read-aloud, karaoke, TTS "play all") — web audio is suspended when the app backgrounds or the screen locks. Needs `AVAudioSession(.playback)`, the `audio` `UIBackgroundModes` entitlement, and `MPNowPlayingInfoCenter` / `MPRemoteCommandCenter` for lock-screen controls.
2. **Microphone capture** for three consumers: Whisper voice input, the Pitch game's live pitch detection, and ACRCloud song fingerprinting. `getUserMedia` inside WKWebView works but with caveats (no capture while backgrounded, occasional 48kHz-only streams, permission prompt shows the *app's* name only if `NSMicrophoneUsageDescription` is set — do it natively via **AVAudioEngine** and stream PCM frames over the bridge; you get correct sample rates for pitch detection and raw buffers for ACRCloud's fingerprint SDK).
3. **StoreKit 2 IAP** — mandatory for selling Pro (guideline 3.1.1). No web equivalent allowed.
4. **On-device speech** — `Speech.framework` (`SFSpeechRecognizer` with `zh-CN` locale, `requiresOnDeviceRecognition = true`) as a free/offline fallback for the Speak game and voice input; cuts Whisper spend.
5. **File/EPUB/PDF/SRT import** — `UIDocumentPickerViewController` + declaring `CFBundleDocumentTypes`/UTIs so Pinyin Reader appears in the system **share sheet ("Open in Pinyin Reader")** for .epub, .pdf, .srt, .vtt, .ass, .txt, and images.
6. **Push notifications** (daily serial reminder, SRS due-cards nudge) — APNs, no web push needed in-app.
7. **Realtime tutor audio path** — the OpenAI Realtime session should use a native `AVAudioSession(.playAndRecord, mode: .voiceChat)` with echo cancellation; WebRTC in WKWebView is possible but the voiceChat mode + AirPods handling is far better native.

Everything else — rendering, segmentation UI, dictionaries, HanziWriter, flashcards, EPUB reading UI, karaoke lyric sync display, video subtitle player, themes — runs in the webview unchanged.

---

## A2. Step-by-step port plan (dependency-ordered milestones)

### M0 — Wrap & ship to internal TestFlight (week 1–2)
**Goal:** the entire web app running inside Capacitor on your phone, warts and all.

- `npm init` a thin wrapper project; `npx cap add ios`; `webDir` = the existing static folder. No bundler — your no-build setup is an asset here.
- Point API base URL at the Tokyo VPS over HTTPS (Caddy already gives you TLS — **App Transport Security** requires TLS 1.2+, valid cert chain; you should need **no ATS exceptions**. If any exception creeps in, App Review will ask why).
- iOS APIs touched: `WKWebViewConfiguration` (via Capacitor config): `allowsInlineMediaPlayback = true`, `mediaTypesRequiringUserActionForPlayback = []` (so TTS `<audio>` can be triggered programmatically *after* the first user gesture), `limitsNavigationsToAppBoundDomains` if you want SW support.
- **Gotchas:**
  - Safe areas / notch: add `viewport-fit=cover` + `env(safe-area-inset-*)` padding to `index.html`. Your inline design system makes this a 20-line change.
  - iOS rubber-band scrolling and pull-to-refresh will fight your SPA; disable webview bounce (`webView.scrollView.bounces = false`) except inside scrollable containers.
  - `speechSynthesis` in WKWebView is even less reliable than iOS Safari — treat it as dead. Your OpenAI TTS path is the real one (good news: you built the right thing already).
  - Tesseract.js WASM works in WKWebView but is slow; fine as fallback, keep server OCR primary.
- Apple Developer account ($99/yr), App ID, internal TestFlight. **Ship this in week 1** even though audio breaks on lock — you want the feedback loop running.

### M1 — Native audio & mic bridges (week 3–5)
**Goal:** the app's soul — audio — works like a native app. This is the hardest milestone; do it before any business logic.

- **AudioSessionPlugin (Swift):**
  - `AVAudioSession.sharedInstance().setCategory(.playback)` when entering audiobook/karaoke/TTS-play-all; `.playAndRecord, mode: .voiceChat` for the tutor; `.playAndRecord, mode: .measurement` for pitch shadowing (measurement mode disables voice processing — you want raw pitch).
  - Add `UIBackgroundModes: [audio]` to Info.plist.
  - Route TTS/audiobook playback through a native `AVAudioPlayer`/`AVQueuePlayer` fed by the same server-cached mp3 URLs the web app uses. The JS keeps sequencing (which sentence next); the plugin plays and reports `ended` events back. This gives you background playback *without* rewriting the audiobook logic.
  - `MPNowPlayingInfoCenter` (title = chapter/song, artwork = book cover) + `MPRemoteCommandCenter` (play/pause/skip-sentence) → lock-screen & AirPods controls.
  - Handle interruptions (`AVAudioSession.interruptionNotification` — phone call pauses audiobook, resumes after) and route changes (unplugging headphones pauses).
- **MicPlugin (Swift):** `AVAudioEngine` tap on the input node → downsample to 16kHz mono PCM → stream chunks to JS (for pitch detection, reuse your existing JS autocorrelation on the streamed buffers — or port the pitch detector to Swift with `vDSP` later for battery) and/or POST to server (Whisper). ACRCloud: use their iOS SDK natively in this plugin, return the fingerprint match to JS.
- **SpeechPlugin:** `SFSpeechRecognizer(locale: zh-CN)`, on-device where available — free scoring for the Speak game, offline voice input fallback.
- **Gotchas:** you cannot hold both `.playback` and `.playAndRecord` ergonomically — build a tiny session-state machine (READING / TUTORING / PITCH_GAME / IDLE) in the plugin and have JS declare intent. Mic permission: `NSMicrophoneUsageDescription` and `NSSpeechRecognitionUsageDescription` strings that mention *pronunciation practice and voice input* explicitly (App Review reads these).

### M2 — Accounts, IAP, server-side entitlements (week 6–8)
**Goal:** you can take money, and a jailbroken phone can't steal your OpenAI budget.

- **Sign in with Apple** (required by 4.8 if you offer any third-party login; even if Apple-only, it's the lowest-friction choice). `ASAuthorizationAppleIDProvider` → identity token → server verifies against Apple's JWKS → issues your own session JWT. Store session token in **Keychain** (`kSecClassGenericPassword`), never localStorage.
- **StoreKit 2** plugin: `Product.products(for:)`, `product.purchase()`, listen to `Transaction.updates`. On purchase/restore, send the **signed transaction JWS** to the server; server verifies signature against Apple's certs (or calls the App Store Server API) and flips `pro_until` on the user row. **The client never decides entitlement** — every AI endpoint on `server.js` checks the DB.
- Server work: users table, per-user quotas table (TTS chars, tutor seconds, video minutes, GPT calls per month), middleware that 402s over-quota requests with a friendly JSON the web UI turns into an upsell/limit screen.
- App Store Server Notifications V2 (webhook to VPS) for renewals/refunds/cancellations.
- **Gotchas:** test with StoreKit Testing in Xcode + a sandbox account; handle `Transaction.currentEntitlements` on every launch (restore purchases must be a visible button — reviewers check); family sharing decision (enable it, it's goodwill).

### M3 — Offline, performance, native polish (week 9–10)
- Bundle the dictionary (CC-CEDICT–style data), HSK lists, and deck data locally (Capacitor Filesystem / IndexedDB) → breakdown + flashcards + stroke order work in airplane mode.
- Cache TTS mp3s on-device (you already cache server-side; add a client LRU on disk) → repeat listens cost $0 and work offline.
- `BackgroundTasks` (`BGAppRefreshTask`) to pre-fetch the daily serial overnight; local notification "Your daily story is ready".
- Share extension target ("Send to Pinyin Reader" from Safari/YouTube/Books) + `CFBundleDocumentTypes` for epub/pdf/srt/txt/images.
- Widgets + **App Intents**: "Word of the Day" widget, Siri shortcut "practice my flashcards". Cheap to build, disproportionate ASO/retention value, and further inoculates against 4.2 minimum-functionality.
- PDFKit only if you want native PDF rendering; your existing JS PDF path is acceptable — defer.

### M4 — App Review hardening & submission (week 11–12)
- Purpose strings audit (mic, speech, camera/photos for OCR, notifications).
- App Privacy "nutrition label" (see §B9).
- Reframe video/karaoke UI copy for review safety (see §A5).
- Review notes with a demo account, a sample EPUB, a sample video link that works, and a paragraph explaining the home-worker architecture is *your* infrastructure.
- Screenshots, ASO metadata, phased release ON.

---

## A3. Feature-by-feature port notes

Legend: **WV** = works in webview as-is · **NB** = needs native bridge · **SS** = server-side, no app change.

| # | Feature | Verdict | Specific iOS concern / action |
|---|---------|---------|------------------------------|
| 1 | Text breakdown (segment, tone-color pinyin, DeepL, tap cards) | **WV** (+SS) | Pure DOM + server calls. Only work: safe-area CSS, tap targets ≥44pt. |
| 2 | Character deep-dive (HanziWriter, radicals, AI mnemonics, phonetic series) | **WV** (+SS) | HanziWriter is SVG — flawless in WKWebView. Mnemonic GPT calls stay server-side behind quota. |
| 3 | Natural TTS (gpt-4o-mini-tts, cached mp3, speed control) | **NB** | Playback must move to native AVAudioPlayer for background/lock-screen. iOS `speechSynthesis` fallback is unreliable in WKWebView — demote it to last resort; your server TTS is primary. Autoplay: first play needs a user gesture; after the audio session is active, programmatic sequencing is fine. Speed via `AVAudioPlayer.rate` (enable `enableRate`). |
| 4 | OCR (image → text; server + Tesseract fallback) | **WV** (+SS) | `<input type=file capture>` works; nicer: Capacitor Camera plugin. Add `NSCameraUsageDescription`/`NSPhotoLibraryUsageDescription`. Later upgrade: **Vision framework** `VNRecognizeTextRequest` (zh-Hans support) = free, on-device, better than Tesseract. |
| 5 | Voice input (Whisper) | **NB** | Native mic capture (AVAudioEngine) → POST to server Whisper. Add on-device `SFSpeechRecognizer` fallback = $0 and offline. |
| 6 | EPUB/PDF reader (tap-define, audiobook mode, register lens, heat map) | **WV + NB** | Reading UI stays JS. Audiobook mode = native audio queue (M1) or it dies on screen lock — this is *the* flagship fix. File import via UIDocumentPicker + share extension. Register-lens AI calls: SS behind quota. |
| 7 | Flashcards / SRS | **WV** | Fully local-able. Move deck storage to Filesystem/IndexedDB + iCloud/`CloudKit` or server sync later. Free tier anchor. |
| 8 | HSK games (Match, Quiz, Listen, Speak, Pitch, Trouble spots) | **WV + NB** | Match/Quiz/Listen/Trouble: WV. **Speak** → SFSpeechRecognizer (NB, free) with Whisper as premium accuracy. **Pitch** → native mic tap with `.measurement` mode; WebAudio `getUserMedia` pitch detection *can* work in WKWebView but sample-rate and AGC quirks make contours noisy — bridge it. |
| 9 | Karaoke (LRCLIB/NetEase/QQ lyrics, ACRCloud identify, link paste, speed sync) | **WV + NB** | Lyric fetch/sync display: WV+SS. **ACRCloud identify** → their native iOS SDK in MicPlugin (webview mic audio is AGC-processed; fingerprinting wants raw). Review framing: see §A5 — "sync lyrics to music you're playing", never "download songs". |
| 10 | Video mode (YouTube/Bilibili/XHS/Douyin → captions/GPU transcribe, synced subs, summaries, local srt/vtt/ass) | **WV + SS** | Player UI + subs: WV. Extraction/transcription: SS (VPS + home worker; see §B9 for the SPOF plan). **Highest App Review risk — see §A5.** Local subtitle files via document picker. Background *audio* of a video's read-aloud → native audio path. |
| 11 | Daily serial (AI i+1 story) | **SS** | No change. Add BGAppRefreshTask prefetch + push notification. Paid-tier anchor (recurring GPT cost). |
| 12 | Voice tutor (OpenAI Realtime) | **NB + SS** | Native `.voiceChat` audio session, echo cancellation, AirPods routing. Keep the Realtime session **server-brokered** (ephemeral session tokens minted by VPS; the OpenAI key never touches the client). Hard-metered (most expensive feature per minute). |
| 13 | History/sessions, themes, tone colors | **WV** | Persist via Filesystem/IndexedDB; respect `prefers-color-scheme`; you already have light/dark. |

---

## A4. What to improve while porting (native dividends)

Do these because they're cheap in the hybrid model and materially improve retention/economics:

1. **Background audiobook with lock-screen controls** (MPNowPlayingInfoCenter + MPRemoteCommandCenter). Turns the reader into a genuine audiobook app — the single biggest UX unlock of the port.
2. **Offline core**: bundled dictionary + local decks + on-device TTS cache. Learners on the Hangzhou metro with no signal keep studying; marginal API cost of a study session drops toward zero.
3. **On-device ASR** (Speech.framework, on-device mode) for the Speak game and quick voice input → cuts Whisper spend to ~zero for free-tier users, and works offline.
4. **Vision framework OCR** (`VNRecognizeTextRequest`, zh-Hans) → free, fast, on-device; keep server OCR for hard cases only.
5. **Widgets & App Intents**: Word-of-the-day widget, "cards due" widget, Siri "start my review". Retention + ASO surface.
6. **Push**: SRS due reminder + "daily serial is ready". These two notifications alone are a retention engine; make them opt-in and gentle.
7. **Sign in with Apple** → real accounts → cross-device sync (phone + web app share the same VPS backend; your web users become iOS users and vice versa).
8. **Handoff** (`NSUserActivity`): start reading on the web app, continue on the phone. Cheap because both clients hit the same session store.
9. **Haptics** on card grading and game feedback (Capacitor Haptics) — small, feels native, costs an hour.

---

## A5. App Review risk list (and how to survive it)

| Guideline | Exposure | Mitigation |
|---|---|---|
| **3.1.1 In-App Purchase** | All digital content (Pro subscription, tutor minutes) MUST use IAP. No links to your website's checkout, no "cheaper on the web" mentions, no external purchase buttons. | StoreKit 2 only, inside the app. If you later sell web subscriptions too, never *mention* them in the iOS binary. (US External-link entitlements exist post-*Epic* ruling but are not worth the review friction at your scale — skip.) |
| **5.2.3 Audio/Video downloading** + **4.x** | The video mode ("paste a YouTube/Bilibili link → we extract audio and transcribe") and karaoke link-paste are the app's biggest rejection risk. 5.2.3 bans apps that "facilitate illegal file sharing or download media without authorization." | Frame and *build* it as a **study tool for content the user already has access to**, not a downloader: (1) never store or export the media file to the user — output is *subtitles and study data only*; (2) no bundled catalog, no search-for-videos inside the app — user pastes their own link; (3) UI copy: "Study a video's language" not "Download/rip"; (4) prefer the official captions path (pulling published captions is far more defensible than audio extraction) and present transcription as fallback; (5) keep local-file (.srt/.vtt/.ass + user's own recordings) as the headline flow in screenshots and review notes; (6) be ready with a review-note paragraph: educational transformation, no redistribution, no media retained. Contingency if rejected: ship v1 with local-files + official-captions only, move link-transcription server-side behind a later update or keep it web-only. |
| **2.1 / 4.2 Minimum functionality** ("web clipping") | A pure webview wrapper can be rejected as "just a website." | The hybrid plan inoculates: native background audio, lock-screen controls, share extension, widgets, StoreKit, offline mode. Mention these in review notes. |
| **Background audio entitlement** | `UIBackgroundModes: audio` must be *used for continuous audible content*. | Audiobook mode and karaoke are legitimate continuous playback. Don't keep the session active when nothing is audible (Apple tests for silent background sessions). |
| **5.1.1 / 5.1.2 Privacy** | Mic (3 uses), camera/photos (OCR), speech recognition, reading content sent to server, audio sent to OpenAI/ACRCloud. | Precise purpose strings; App Privacy label declaring audio data + user content, "linked to user" if accounts on; privacy policy URL covering third-party processors (OpenAI, DeepL, ACRCloud) and retention. See §B9. |
| **Kids/education category** | If you set age rating low or land in Kids category, ACRCloud/mic/AI chat trigger extra scrutiny (5.1.4). | Rate **4+ is wrong** here — the tutor is open-ended AI chat. Set age rating 12+ (or 17+ if you want zero AI-content risk), category **Education**, do NOT opt into the Kids category. |
| **2.5.2 / remote code** | Capacitor apps that hot-update JS from a server can be rejected. | Ship `app.js` bundled in the binary; server serves *data*, not app code. (You lose web-style instant deploys on iOS — accept it; that's what phased releases are for.) |
| **4.8 Sign in with Apple** | Required if any third-party/social login exists. | Offer Sign in with Apple as the primary (or only) login. |

---

# Part B — Monetization & economics

## B6. Pricing & packaging (the recommendation)

**Model: Freemium subscription. "Pinyin Reader Pro" — $9.99/month, $59.99/year (≈$5/mo, the price you actually want everyone on), 7-day free trial on annual. No lifetime tier.**

Why no lifetime: every valuable feature has a *recurring marginal cost* (OpenAI, DeepL). A $79 lifetime user who uses the tutor 2h/month is underwater within a year. Pleco can sell lifetime because its dictionary is a one-time asset; yours is a service. If you ever want a big-ticket SKU, sell a **12-month prepaid** ($59.99) instead — same psychology, bounded liability.

Add one consumable: **Tutor Time top-up** — e.g., $4.99 for +60 tutor minutes — so heavy tutor users self-fund instead of being capped or subsidized.

### Feature → tier mapping (value × marginal cost)

| Feature | Tier | Why (value vs. your marginal cost) |
|---|---|---|
| Text breakdown + tap-to-define + tone colors | **Free** (unlimited) | Core hook; near-zero cost once dictionary is bundled on-device. DeepL sentence translation lightly metered in free (e.g., 100 sentences/day) — DeepL is cheap but not free. |
| Stroke order (HanziWriter) | **Free** | Zero marginal cost, high perceived value, competes with Pleco's paid add-on. |
| Character deep-dive: radical breakdown | **Free** | Static data, zero cost. |
| AI mnemonics / phonetic-series AI explanations | **Free: 5/day → Pro: unlimited** | GPT cost is small per call and *cacheable per character* (generate once, serve to everyone — cache aggressively and this approaches $0). Taste of AI magic in free drives conversion. |
| Natural TTS (gpt-4o-mini-tts) | **Free: ~10 min audio/day → Pro: unlimited*** (fair-use cap ~5 h/day) | The signature "wow." Cache hit rate makes real cost far below naive math (common words/sentences are served from cache). Free users get enough to fall in love; device speechSynthesis as their overflow. |
| OCR (image → text) | **Free: 10/day → Pro: unlimited** | Moves toward free Vision-framework OCR anyway. |
| Voice input (Whisper / on-device) | **Free (on-device SFSpeech) → Pro (Whisper accuracy)** | On-device is $0; Whisper $0.006/min is the paid-accuracy path. |
| EPUB/PDF reader (tap-define, heat map, chapters) | **Free** | Retention monster, zero marginal cost. |
| **Audiobook read-aloud mode** | **Pro** | Continuous TTS = the single largest honest TTS cost; also the flagship native feature. Perfect paywall anchor. |
| Register lens (casual/formal/slang rewrites) | **Pro** | Pure GPT cost, power-user feature. |
| Flashcards / SRS (all decks) | **Free** | $0 cost, daily-habit engine — never paywall the habit loop. |
| HSK games: Match, Quiz, Listen, Trouble spots | **Free** | Local/cheap; Listen uses cached TTS clips. |
| Speak + Pitch games | **Free (on-device) / Pro (unlimited + Whisper scoring)** | On-device ASR + local pitch detection = $0. |
| Karaoke (lyrics sync, pinyin/EN) | **Pro** (song identify included) | Lyric APIs cheap, ACRCloud per-lookup cost real but small; premium *feel* justifies Pro. Free users get 3 songs total as a demo. |
| **Video mode** (captions/transcription + AI summary) | **Pro, metered: e.g. 10 videos or 100 transcription-min/mo** | Transcription + summary is your second-costliest pipeline and rides on the home GPU. Meter it from day one. |
| **Daily serial** (AI graded story) | **Pro** (free users get 1/week teaser) | Recurring GPT cost per user per day; strong daily-return anchor for Pro. Cost trick: generate per-*level* (6–10 HSK bands), not per-user — one story serves every user at that level, cost collapses to ~$1/day total. |
| **Voice tutor (Realtime)** | **Pro: 60 min/mo included**, then $4.99/60-min top-up | By far your highest per-minute cost. Never unlimited, for anyone. |
| History/sessions, themes | **Free** | $0. |

**Where the paywall sits:** the user can *study anything they paste, forever, free* (breakdown, dictionary, SRS, most games). They hit the wall when they want the app to *speak at length, watch videos with them, sing with them, write for them, or converse* — i.e., exactly where your API bill lives. This is both the fair line and the profitable one.

## B7. Unit economics

**Assumptions (stated, adjustable):**
- gpt-4o-mini-tts ≈ **$0.015/min of generated audio**; Mandarin speech ≈ 250 chars/min → ≈ $0.06 per 1,000 chars *before caching*. Your server cache + on-device cache should absorb 40–70% of requests for a heavy reader (re-listens, common words, shared sentences).
- Whisper ≈ **$0.006/min**. Realtime tutor (mini-realtime class) ≈ **$0.06–0.15/min** blended in+out — use **$0.10/min** for planning.
- GPT text calls (mnemonics, summaries, register lens, serial) on a mini-class model: fractions of a cent per call; summaries of a 20-min video ≈ $0.01–0.05.
- DeepL Pro: $5.49/mo + ~$25/1M chars.
- Fixed: VPS $10–40/mo, Apple $99/yr, ACRCloud plan (entry tiers ~$0–99/mo depending on volume; budget $25/mo at small scale).

**A genuinely heavy Pro user, per month:**

| Usage | Volume | Cost |
|---|---|---|
| Fresh TTS (audiobook + play-all), after ~50% cache hits | ~300 min generated | ~$4.50 |
| Realtime tutor | 60 min (the included cap) | ~$6.00 |
| Video transcription | 100 min (on home GPU: ~$0; cloud fallback Whisper) | $0–0.60 |
| Video summaries + register lens + mnemonics | ~100 calls | ~$1.00 |
| Whisper voice input / Speak scoring | 30 min | ~$0.18 |
| DeepL | ~200k chars | ~$5.00 → **cacheable + swappable to GPT-mini translation (~$0.30)** |
| **Total, worst case** | | **~$12–17** |
| **Total, typical Pro user** (most users are not heavy) | | **~$2–5** |

**Margin math (annual plan, the one to optimize):** $59.99/yr = $5.00/mo gross → **$4.25/mo net after Apple's 15%** (Small Business Program — **enroll immediately**, you qualify under $1M/yr; at the default 30% you'd net $3.50 and the model still works but breathes harder).

- Typical Pro user costs $2–5/mo → margin roughly breakeven-to-60% on annual, healthy on monthly ($9.99 → $8.49 net vs $2–5 cost).
- The tail is what kills you, so **cap the tail**: tutor hard-metered (60 min, top-ups are 100%-margin-ish after the ~$6 cost is prepaid), video metered (100 min/mo), TTS fair-use ceiling (5 h/day triggers a soft "you're our favorite user" throttle), per-user server-side quotas on *every* AI endpoint (already needed for security, §B9).
- **Cost levers to pull early:** (1) per-character mnemonic cache = generate once ever; (2) per-level daily serial = one generation serves the cohort; (3) TTS cache both sides; (4) swap DeepL for GPT-mini translation where quality permits (~10× cheaper); (5) on-device ASR/OCR for free tier.
- **Break-even:** fixed costs ≈ $75–150/mo (VPS + DeepL base + ACRCloud + Apple amortized). ~20–30 annual subscribers covers fixed; beyond that, each typical subscriber contributes ~$1.5–4/mo, each monthly subscriber ~$4–6/mo.

## B8. Competitive landscape & positioning

| App | Model | Price | What it does that you do |
|---|---|---|---|
| **Pleco** | Freemium, one-time add-ons | ~$30–60 bundles (lifetime) | Dictionary, OCR, stroke order, flashcards add-on. The default install for every Chinese learner. |
| **Du Chinese** | Subscription | ~$11.99/mo, ~$89.99/yr | Graded readers with pinyin + audio (human-recorded). Your daily serial + reader compete here. |
| **LingQ** | Subscription | ~$12.99/mo | Import-anything reader, known-word tracking (your heat map). Clunky UX is its weakness. |
| **HelloChinese** | Subscription | ~$9–14/mo | Gamified course, speaking exercises. Beginner-heavy. |
| **Skritter** | Subscription | ~$14.99/mo | Handwriting + SRS. Narrow but loved. |
| **Migaku / Language Reactor** | Subscription | ~$9.99/mo | Video immersion + subtitle mining. Your video mode competes directly — and they've survived App Review/extension review with the "study content you're watching" framing. |
| **Duolingo** | Freemium ads/sub | Super ~$12.99/mo | Habit gamification; shallow for Chinese specifically. |

**Positioning:** every serious learner today runs a *stack* — Pleco (dictionary) + Du Chinese (reading) + Language Reactor (video) + Skritter or Anki (SRS) + maybe iTalki (speaking) — easily $25–40/mo plus juggling. **Pinyin Reader is the stack in one app**: import-anything reader *with a natural-TTS audiobook voice* (nobody else has gpt-4o-class TTS on arbitrary text), video & karaoke immersion, tone-contour speaking practice, SRS, and a realtime speaking tutor. The tutor alone benchmarks against iTalki at $10–25/hour of human time.

**Price the market will bear:** the cluster sits at $9–15/mo and $60–90/yr. **$9.99/mo / $59.99/yr is deliberately at the cluster's floor** — you're the newcomer bundling five apps; win on "replaces your stack for less than one of its parts." Do not launch above Du Chinese. Revisit at $12.99/mo once reviews/retention prove out.

## B9. Security & trust

- **All API keys live on the VPS only** — OpenAI, DeepL, ACRCloud, everything. Nothing in the app bundle, nothing in JS, ever. (This was already violated once — the leak-and-rotate incident — so treat it as a standing invariant: `grep -ri "sk-" the client bundle` in a pre-ship script and fail the build if anything matches.) The iOS app is a pure client of `server.js`.
- **Realtime tutor:** server mints **ephemeral Realtime session tokens** per request; client connects with the short-lived token; server records minutes against the user's quota.
- **Entitlements are server-truth:** client sends StoreKit 2 **JWS transaction** → server verifies signature (App Store Server API / Apple root certs) → sets `pro_until` in DB → **every** AI endpoint checks DB entitlement + quota before spending a cent. A jailbroken client that fakes local "isPro" gets 402s; the worst it can steal is UI chrome.
- **Accounts:** Sign in with Apple → server-verified identity token → your own JWT in **Keychain**. Anonymous mode allowed for free features (device-ID rate-limited); account required for Pro (quotas need identity).
- **Rate limiting & quotas:** per-user *and* per-IP ceilings on every OpenAI-touching route; monthly quota counters; a global monthly OpenAI budget kill-switch (env var `MAX_MONTHLY_OPENAI_USD` → past it, degrade to cached/on-device paths and show a status banner). This is your viral-spike insurance.
- **Home GPU worker (RTX 3070 over Tailscale):** a hobbyist single point of failure — fine for beta, not a paid-SLA dependency. Plan: (1) queue with graceful degradation — if the worker is down, fall back to official captions or cloud Whisper ($0.006/min ≈ $0.60 per 100-min quota, entirely absorbable within Pro margin); (2) at scale, move transcription to a serverless GPU (RunPod/Modal, whisper-large ≈ $0.01–0.03/audio-min) and keep the 3070 as the cheap first shift. Never let a paid feature's availability equal your home internet's uptime — the *fallback* is the product guarantee.
- **Privacy policy & App Privacy label:** declare — mic audio (voice input, pronunciation, song ID) processed via OpenAI/ACRCloud, not retained beyond processing; images (OCR) transient; reading content and study stats stored per-account; third-party processors named (OpenAI, DeepL, ACRCloud); deletion on request (and **in-app account deletion — Apple requires it** if you have accounts, guideline 5.1.1(v)). Data "linked to user": identifiers, usage data, user content. No tracking/ads SDKs → no ATT prompt needed. Keep it that way.
- **ATS:** VPS behind Caddy with a real cert = TLS out of the box; ship with **zero ATS exceptions**. Tailscale hops are server-internal and invisible to the app.

## B10. Go-to-market & risk

**Launch sequence:** 2-week internal TestFlight (you + friends) at M0 → public TestFlight (~50–200 users from r/ChineseLanguage, Discord servers, your existing web users) during M1–M3 → App Store phased release at M4. Web app stays live as the acquisition top-of-funnel; add an "Get the iOS app" banner (but never mention pricing differences inside the iOS app).

**ASO:** title "Pinyin Reader — Learn Chinese"; keyword field: `pinyin, hanzi, HSK, chinese reader, mandarin, flashcards, stroke order, chinese subtitles, learn chinese`. Screenshots lead with: tone-colored reader → audiobook lock screen → video subtitles → tutor. Localize the listing for en, zh-Hant, ja, ko, es early — cheap, meaningful.

**Top risks & mitigations:**

| Risk | Likelihood | Mitigation |
|---|---|---|
| App Review rejects video-link transcription (5.2.3) | Medium-high | Framing per §A5; captions-first; local-files headline; contingency build with link-transcription disabled behind a server flag so you can resubmit same-day. |
| OpenAI cost blowout (viral spike / abuse) | Medium | Server quotas per user, global monthly budget kill-switch, cached/on-device degradation paths, alerts at 50/80/100% of budget. Costs scale with *users of paid features*, and paid features require paying accounts — the architecture is inherently self-limiting if you never expose expensive endpoints to anonymous users. |
| Home GPU dies / home ISP outage | Certain, eventually | Automatic cloud-Whisper fallback (pennies), health-check + silent failover; user never knows. |
| Solo-dev bus factor / burnout | — | The hybrid choice *is* the mitigation: one JS codebase, thin plugins, no parallel native rewrite to maintain. |
| Slow initial sales | Likely (it's an App Store) | Fixed costs are ~$100/mo — you can run indefinitely. Annual-first pricing + free tier retention (SRS + reader) compounds; this is a marathon product. |

---

## Appendix: 90-day checklist

- [ ] Week 1–2 (M0): Capacitor shell, safe areas, TestFlight internal, ATS-clean HTTPS to VPS
- [ ] Week 3–5 (M1): AudioSessionPlugin (background audio, NowPlaying, remote commands), MicPlugin (AVAudioEngine → Whisper/pitch/ACRCloud native SDK), SpeechPlugin (on-device zh ASR)
- [ ] Week 6–8 (M2): Sign in with Apple, Keychain sessions, StoreKit 2 + server JWS validation, per-user quotas on every AI route, App Store Server Notifications, Small Business Program enrollment
- [ ] Week 9–10 (M3): offline dictionary/decks, on-device TTS cache, BGAppRefreshTask serial prefetch, share extension + document types, word-of-day widget, push (SRS + serial)
- [ ] Week 11–12 (M4): purpose strings, privacy label + policy, account deletion in-app, video-feature framing pass, review notes + demo account, screenshots/ASO, phased release
- [ ] Ongoing: budget kill-switch + cost alerts live before public TestFlight; cloud transcription failover before charging anyone for video mode
