require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const multer = require('multer');
const FormData = require('form-data');
const { OpenAI } = require('openai');
const compression = require('compression');
const fs = require('fs').promises; // Use the promise-based version of fs
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const crypto = require('crypto');

// === Cache Management ===
const CACHE_LIMIT = 2000;
const characterCache = new Map();
let decompositionData = {};
// Reverse index: component character -> [characters that contain it]. Built once
// from the decomposition data, this powers the phonetic-series explorer.
let componentIndex = {};

// Ideographic Description Characters (⿰⿱⿲… U+2FF0–U+2FFF) used to describe how
// components combine in an IDS string. We strip these to recover the components.
const IDS_CHARS = /[⿰-⿿]/g;
// CJK ideographs (main block + extension A + compatibility).
const CJK_CHAR = /[㐀-鿿豈-﫿]/;

// Load character decomposition data from the Make Me a Hanzi project (a JSONL
// dictionary). Parsed once at startup into an in-memory map so per-character
// lookups are instant. The previous source (hanzi-writer-data CH-decomp.json)
// no longer exists on the CDN, which is why decomposition had silently broken.
async function loadDecompositionData() {
    const url = 'https://cdn.jsdelivr.net/gh/skishore/makemeahanzi@master/dictionary.txt';
    try {
        const resp = await fetch(url);
        if (!resp.ok) throw new Error(`Failed to load decomposition data: ${resp.status}`);
        const text = await resp.text();
        const map = {};
        for (const line of text.split('\n')) {
            if (!line.trim()) continue;
            let entry;
            try { entry = JSON.parse(line); } catch (_) { continue; }
            const char = entry.character;
            if (!char) continue;
            const decomp = typeof entry.decomposition === 'string' ? entry.decomposition : '';
            // Recover the component characters: drop the description operators and
            // keep only CJK ideographs that differ from the character itself.
            const components = Array.from(decomp.replace(IDS_CHARS, ''))
                .filter(c => c !== char && CJK_CHAR.test(c));
            map[char] = { components, radical: entry.radical || null };
        }
        decompositionData = map;
        // Build the reverse component index: for every character, register it
        // under each of its components, so we can later find the whole family of
        // characters that share a phonetic component (青 -> 请/情/晴/清…).
        const idx = {};
        for (const [char, info] of Object.entries(map)) {
            for (const comp of info.components) {
                (idx[comp] = idx[comp] || []).push(char);
            }
        }
        componentIndex = idx;
        console.log(`✅ Loaded decomposition data for ${Object.keys(map).length} characters (${Object.keys(idx).length} components indexed).`);
    } catch (error) {
        console.warn('⚠️ Could not load decomposition data:', error.message);
        decompositionData = {};
        componentIndex = {};
    }
}

const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 25 * 1024 * 1024 }
});

const app = express();
const PORT = 3000;
// Behind Caddy — trust the first proxy hop so express-rate-limit keys on the
// real client IP (X-Forwarded-For) instead of lumping every user under the
// proxy's single IP (which made the limits global rather than per-user).
app.set('trust proxy', 1);

// === Middleware ===
app.use(helmet({
    contentSecurityPolicy: false, // Disabled for local dev flexibility with CDNs
}));
app.use(compression());
app.use(cors()); // Allow requests from your frontend
app.use(express.json({ limit: '50mb' })); // Increase the limit to handle larger DB files

// Never serve server code, dependency manifests, or runtime data files.
app.use((req, res, next) => {
    if (/^\/(server\.js|package\.json|package-lock\.json|translation-cache\.json(\.tmp)?|tts-cache(\/|$)|scripts(\/|$))/.test(req.path)) {
        return res.status(404).end();
    }
    next();
});

// Serve static assets with cache policies tuned per file:
// - dictionary.json is large (~6MB) and rarely changes -> cache for a day so
//   repeat visits skip the download entirely (big win on slow connections).
// - custom-db.json is mutable user data -> always revalidate.
// - index.html / app.js deploy frequently (cron pull) -> always revalidate so
//   updates appear immediately.
// The app root is static-served, so guard the files the client never needs but
// that would leak if fetched: planning docs (*.md, docs/), source (server.js),
// worker scripts, deps, dotfiles (.git/.env/.claude), and lockfiles. The client
// only needs index.html, app.js, the *.json data files, favicon and tts-cache.
const BLOCKED_STATIC = /(?:^|\/)(?:\.[^/]+|node_modules|docs|scripts)(?:\/|$)|\.(?:md|env)$|(?:^|\/)(?:server\.js|package\.json|package-lock\.json)$/i;
app.use((req, res, next) => {
    if (BLOCKED_STATIC.test(req.path)) return res.status(404).send('Not found');
    next();
});

app.use(express.static(__dirname, {
    etag: true,
    lastModified: true,
    setHeaders: (res, filePath) => {
        const base = path.basename(filePath);
        if (base === 'dictionary.json') {
            res.setHeader('Cache-Control', 'public, max-age=86400'); // 1 day
        } else if (base === 'custom-db.json' || base === 'index.html' || base === 'app.js') {
            res.setHeader('Cache-Control', 'no-cache');
        }
    }
}));

// Rate Limiting
const aiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // Limit each IP to 50 expensive AI requests per window
    message: 'Too many requests for AI services from this IP, please try again after 15 minutes.',
    standardHeaders: true,
    legacyHeaders: false,
});

const utilityLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200, // Keep a more generous limit for less expensive utilities
    standardHeaders: true,
    legacyHeaders: false,
});

// TTS is cached (repeat playback is free), but cap per-IP requests so an abuser
// can't run up an unbounded OpenAI bill with a flood of unique inputs. Generous
// enough for a heavy study session; still bounded.
const ttsLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 500,
    standardHeaders: true,
    legacyHeaders: false,
});

// Writes to the shared custom-db.json — should be infrequent.
const saveDbLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
});

// Apply stricter limits to expensive AI endpoints
app.use('/transcribe', aiLimiter);
app.use('/enhance', aiLimiter);
app.use('/radical-info', aiLimiter);
app.use('/register', aiLimiter);
app.use('/daily-serial', aiLimiter);
app.use('/ocr', aiLimiter);
app.use('/realtime-session', aiLimiter);
app.use('/tutor-debrief', aiLimiter);
app.use('/song-search', utilityLimiter);
app.use('/song-lyric', utilityLimiter);
app.use('/resolve-track', utilityLimiter);
app.use('/summarize', aiLimiter);
app.use('/video-subs', utilityLimiter);
app.use('/identify-song', aiLimiter);
app.use('/tts', ttsLimiter);              // BUG-03: was unlimited -> unbounded OpenAI spend
app.use('/save-custom-db', saveDbLimiter); // BUG-01: throttle writes to the shared DB
app.use('/translate', utilityLimiter); // Apply lenient limit to utility endpoint
app.use('/date-reply-suggestions', utilityLimiter); // called per tutor turn — lenient, not the expensive-AI budget

const DEEPL_API_KEY = process.env.DEEPL_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!DEEPL_API_KEY || !OPENAI_API_KEY) {
    console.warn("⚠️ WARNING: API keys (DeepL or OpenAI) are missing in .env file.");
}

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

// === Persistent translation cache ===
// Stores every exact (target_lang, text) -> translation so repeated sentences
// never hit DeepL again. It is a growing lookup table (not a model): it only
// helps for text it has seen before, but it survives restarts and shrinks the
// quota used on re-reads and common phrases over time.
const TRANSLATION_CACHE_FILE = path.join(__dirname, 'translation-cache.json');
let translationCache = {};
let translationCacheDirty = false;

async function loadTranslationCache() {
    try {
        const raw = await fs.readFile(TRANSLATION_CACHE_FILE, 'utf8');
        translationCache = JSON.parse(raw) || {};
        console.log(`✅ Loaded ${Object.keys(translationCache).length} cached translations.`);
    } catch (_) {
        translationCache = {};
    }
}

async function saveTranslationCache() {
    if (!translationCacheDirty) return;
    try {
        // Write to a temp file then rename, so a crash mid-write can't corrupt it.
        const tmp = TRANSLATION_CACHE_FILE + '.tmp';
        await fs.writeFile(tmp, JSON.stringify(translationCache), 'utf8');
        await fs.rename(tmp, TRANSLATION_CACHE_FILE);
        translationCacheDirty = false; // clear only after a successful write
    } catch (e) {
        console.warn('Could not persist translation cache:', e.message);
    }
}
setInterval(saveTranslationCache, 30 * 1000); // flush at most every 30s

// === Text-to-speech cache ===
// Natural-voice audio (OpenAI TTS) is expensive per call, so every generated
// clip is cached to disk keyed by sha1(voice + text). A whole re-read of a book,
// or replaying a word, is then free and instant. Audio is always synthesized at
// speed 1.0; the client changes playbackRate, so speed never fragments the cache.
const TTS_CACHE_DIR = path.join(__dirname, 'tts-cache');
const TTS_MODEL = process.env.TTS_MODEL || 'gpt-4o-mini-tts';
const TTS_VOICE = process.env.TTS_VOICE || 'alloy';
fs.mkdir(TTS_CACHE_DIR, { recursive: true }).catch(() => {});
function ttsCachePath(voice, text) {
    const hash = crypto.createHash('sha1').update(`${voice}\n${text}`).digest('hex');
    return path.join(TTS_CACHE_DIR, `${hash}.mp3`);
}

// === Routes ===

// Natural-voice text-to-speech. Returns audio/mpeg; served from disk cache when
// the same (voice, text) was synthesized before. Speed is applied client-side.
app.post('/tts', async (req, res) => {
    let { text, voice } = req.body || {};
    if (!text || typeof text !== 'string') return res.status(400).json({ error: 'Missing text' });
    text = text.trim().slice(0, 800); // cap length to bound cost/latency
    if (!text) return res.status(400).json({ error: 'Empty text' });
    voice = (typeof voice === 'string' && /^[a-z]+$/.test(voice)) ? voice : TTS_VOICE;
    if (!OPENAI_API_KEY) return res.status(500).json({ error: 'TTS is not configured (OpenAI key missing).' });

    const cacheFile = ttsCachePath(voice, text);
    try {
        const cached = await fs.readFile(cacheFile);
        res.set('Content-Type', 'audio/mpeg');
        res.set('Cache-Control', 'public, max-age=31536000, immutable');
        res.set('X-TTS-Cache', 'hit');
        return res.send(cached);
    } catch (_) { /* cache miss — synthesize below */ }

    try {
        const speech = await openai.audio.speech.create({
            model: TTS_MODEL,
            voice,
            input: text,
            response_format: 'mp3'
        });
        const buffer = Buffer.from(await speech.arrayBuffer());
        fs.writeFile(cacheFile, buffer).catch(e => console.warn('TTS cache write failed:', e.message));
        res.set('Content-Type', 'audio/mpeg');
        res.set('Cache-Control', 'public, max-age=31536000, immutable');
        res.set('X-TTS-Cache', 'miss');
        return res.send(buffer);
    } catch (e) {
        console.warn('TTS synthesis failed:', e.message);
        return res.status(502).json({ error: 'Could not synthesize speech.' });
    }
});

app.post('/translate', async (req, res) => {
    const { text, target_lang } = req.body;
    if (!text || !target_lang) return res.status(400).json({ error: 'Missing parameters' });
    
    if (!DEEPL_API_KEY) return res.status(500).json({ error: 'DeepL API key not configured on server.' });

    // Serve from the persistent cache when we've translated this exact text before.
    const cacheKey = `${target_lang} ${text}`;
    if (translationCache[cacheKey]) {
        return res.json({ translations: [{ text: translationCache[cacheKey], detected_source_language: '' }] });
    }

    const url = 'https://api-free.deepl.com/v2/translate';
    try {
        const deeplResponse = await fetch(url, {
            method: 'POST',
            headers: { 'Authorization': `DeepL-Auth-Key ${DEEPL_API_KEY}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: [text], target_lang })
        });

        // DeepL can return an empty or non-JSON body on errors (e.g. 456 quota,
        // 429 rate limit), which used to make .json() throw "Unexpected end of
        // JSON input" and 500 every translation. Read as text and parse safely.
        const raw = await deeplResponse.text();
        let data = null;
        if (raw) { try { data = JSON.parse(raw); } catch (_) { /* non-JSON error body */ } }

        if (!deeplResponse.ok) {
            let msg = (data && data.message) || raw || `DeepL error ${deeplResponse.status}`;
            if (deeplResponse.status === 456) msg = 'DeepL quota exceeded for this billing period.';
            else if (deeplResponse.status === 429) msg = 'DeepL rate limit hit — too many requests. Please slow down.';
            console.error(`DeepL ${deeplResponse.status}: ${msg}`);
            return res.status(502).json({ error: msg });
        }
        if (!data) {
            console.error('DeepL returned an empty/invalid body.');
            return res.status(502).json({ error: 'DeepL returned an empty or invalid response.' });
        }
        const translated = data?.translations?.[0]?.text;
        if (translated) {
            translationCache[cacheKey] = translated;
            translationCacheDirty = true;
            // Keep the cache bounded — drop the oldest entries past a ceiling.
            const keys = Object.keys(translationCache);
            if (keys.length > 60000) { for (let i = 0; i < 10000; i++) delete translationCache[keys[i]]; }
        }
        res.json(data);
    } catch (error) {
        console.error('Error proxying to DeepL:', error.message);
        res.status(502).json({ error: error.message });
    }
});

// i+1 Daily Serial: generate the next episode of a story at the learner's level.
app.post('/daily-serial', async (req, res) => {
    if (!OPENAI_API_KEY) return res.status(500).json({ error: 'OpenAI API key not configured.' });
    const { level, targetWords, previousSummary } = req.body || {};
    try {
        const words = Array.isArray(targetWords) && targetWords.length
            ? `Naturally include these words the learner is studying: ${targetWords.slice(0, 8).join('、')}. ` : '';
        const cont = previousSummary
            ? `Continue the ongoing story from where it left off: ${String(previousSummary).slice(0, 400)}. `
            : 'Start a new story and introduce a relatable recurring main character. ';
        const prompt = `Write the next short episode (about 300–450 Chinese characters) of a simple, engaging story for a Mandarin learner at roughly HSK level ${level || 2}. ` +
            `Use mostly common vocabulary at or below that level so it's comfortably readable. ${words}${cont}` +
            `Return STRICT JSON {"title":"<short Chinese title>","story":"<the episode; Chinese punctuation; separate paragraphs with \\n>","summary":"<one short English sentence: what happened, for continuity>"}.`;
        const c = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            temperature: 0.85,
            response_format: { type: 'json_object' },
            messages: [{ role: 'user', content: prompt }]
        });
        const d = JSON.parse(c.choices[0]?.message?.content || '{}');
        res.json({ title: d.title || '今天的故事', story: d.story || '', summary: d.summary || '' });
    } catch (error) {
        console.error('Daily serial error:', error.message);
        res.status(502).json({ error: 'Could not generate the story.' });
    }
});

// Register Lens: rewrite a sentence in casual / formal / internet-slang registers.
const registerCache = {};
app.post('/register', async (req, res) => {
    if (!OPENAI_API_KEY) return res.status(500).json({ error: 'OpenAI API key not configured.' });
    const { text } = req.body || {};
    if (!text) return res.status(400).json({ error: 'Missing text.' });
    if (registerCache[text]) return res.json(registerCache[text]);
    try {
        const prompt = `Rewrite this Mandarin sentence in three registers, keeping the meaning. ` +
            `Return STRICT JSON {"casual":"<natural spoken 口语 version>","formal":"<formal written 书面语 version>","slang":"<internet/网络语 version; if slang doesn't apply, a very casual version>"}. Sentence: "${String(text).slice(0, 400)}"`;
        const c = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            temperature: 0.4,
            response_format: { type: 'json_object' },
            messages: [{ role: 'user', content: prompt }]
        });
        const data = JSON.parse(c.choices[0]?.message?.content || '{}');
        const out = { casual: data.casual || '', formal: data.formal || '', slang: data.slang || '' };
        registerCache[text] = out;
        const keys = Object.keys(registerCache);
        if (keys.length > 5000) delete registerCache[keys[0]];
        res.json(out);
    } catch (error) {
        console.error('Register error:', error.message);
        res.status(502).json({ error: 'Register lookup failed.' });
    }
});

// Video AI summary: a short Chinese summary of a transcript (the client then
// runs its existing pinyin generator + English translator on this same
// summary so all three blocks — Chinese/English/pinyin — stay consistent).
app.post('/summarize', async (req, res) => {
    if (!OPENAI_API_KEY) return res.status(500).json({ error: 'OpenAI API key not configured.' });
    let { text } = req.body || {};
    if (!text || typeof text !== 'string') return res.status(400).json({ error: 'Missing text.' });
    text = text.trim().slice(0, 6000); // cap input length to bound cost
    if (!text) return res.status(400).json({ error: 'Empty text.' });
    try {
        const prompt = `Summarize the following Chinese video transcript in simple, natural Mandarin — 2-4 short sentences, ` +
            `capturing only the main point(s). Return STRICT JSON {"summary":"<the Chinese summary>"}. Transcript: "${text}"`;
        const c = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            temperature: 0.4,
            response_format: { type: 'json_object' },
            messages: [{ role: 'user', content: prompt }]
        });
        const data = JSON.parse(c.choices[0]?.message?.content || '{}');
        const summary = (data.summary || '').trim();
        if (!summary) throw new Error('Empty summary from model.');
        res.json({ summary });
    } catch (error) {
        console.error('Summarize error:', error.message);
        res.status(502).json({ error: 'Could not summarize.' });
    }
});

app.post('/enhance', async (req, res) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'Missing "text" in request body' });
    if (!OPENAI_API_KEY) return res.status(500).json({ error: 'OpenAI API key not configured.' });

    const prompt = `For the following Chinese sentence, provide a concise, context-aware English definition for EACH unique Chinese character present. Format the output STRICTLY as a JSON object where keys are the characters and values are the definitions (max 6 words each). Sentence: "${text}"`;
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini", // Use a more reliable model for structured JSON output.
            messages: [{ role: "user", content: prompt }],
            temperature: 0.2,
            response_format: { type: "json_object" },
        });
        const responseContent = completion.choices[0]?.message?.content;
        if (!responseContent) throw new Error("OpenAI returned an empty response.");
        const enhancedDefinitions = JSON.parse(responseContent);
        res.json(enhancedDefinitions);
    } catch (error) {
        console.error('Error calling OpenAI:', error);
        res.status(500).json({ error: `OpenAI API error: ${error.message}` });
    }
});

app.get('/character-data/:char', async (req, res) => {
    const rawChar = req.params.char;
    if (!rawChar) return res.status(400).json({ error: 'Missing character parameter' });

    const decodedChar = decodeURIComponent(rawChar);
    
    if (characterCache.has(decodedChar)) {
        // LRU Cache Hit: Get the value, delete the key, then set it again
        // to move it to the end of the map, marking it as most recently used.
        const value = characterCache.get(decodedChar);
        characterCache.delete(decodedChar);
        characterCache.set(decodedChar, value);
        return res.json(value);
    }

    let components = [];
    let strokeCount = null;
    let charData = null;

    const decompEntry = decompositionData[decodedChar];
    if (decompEntry && Array.isArray(decompEntry.components)) {
        components = decompEntry.components;
    }

    // --- OPTIMIZATION ---
    // Only fetch the full character stroke data if we couldn't find the stroke count locally.
    // The client can fetch full stroke data on-demand if needed for animations.
    if (strokeCount === null) {
        try {
            const charUrl = `https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0/${encodeURIComponent(decodedChar)}.json`;
            const resp = await fetch(charUrl);
            if (resp.ok) {
                charData = await resp.json();
                if (Array.isArray(charData.strokes)) {
                    strokeCount = charData.strokes.length;
                }
            }
        } catch (error) { console.warn(`⚠️ Character data fetch failed for ${decodedChar}:`, error.message); }
    }

    components = Array.from(new Set(components.filter(Boolean)));
    const payload = {
        char: decodedChar,
        components,
        strokeCount,
        charData
    };

    if (characterCache.size >= CACHE_LIMIT) {
        // LRU Eviction: The first key in the map is the least recently used.
        const firstKey = characterCache.keys().next().value;
        characterCache.delete(firstKey);
    }
    characterCache.set(decodedChar, payload);

    res.json(payload);
});

// Phonetic-series explorer: given a character, find the phonetic component it
// shares with a family of other characters (e.g. 请 -> phonetic 青 -> 情/晴/清/静…).
// Pure decomposition lookup, no AI — the client enriches each character with
// pinyin/definition and highlights the ones the learner already knows.
app.get('/phonetic-series/:char', (req, res) => {
    const char = decodeURIComponent(req.params.char || '');
    if (!char) return res.status(400).json({ error: 'Missing character parameter' });

    const entry = decompositionData[char];
    const radical = (entry && entry.radical) || null;
    const comps = (entry && Array.isArray(entry.components)) ? entry.components : [];

    // Candidate phonetic roots: the character itself (it may BE a phonetic, like
    // 青), then its non-radical components. Pick the one with the largest family.
    const candidates = [char, ...comps.filter(c => c !== radical)];
    let phonetic = null;
    let bestFamily = [];
    for (const cand of candidates) {
        const fam = componentIndex[cand] || [];
        if (fam.length > bestFamily.length) { phonetic = cand; bestFamily = fam; }
    }

    if (!phonetic || bestFamily.length < 2) {
        return res.json({ phonetic: null, radical, family: [] });
    }

    const set = new Set(bestFamily);
    set.add(char);                                   // keep the queried character
    if (decompositionData[phonetic] || CJK_CHAR.test(phonetic)) set.add(phonetic); // the root itself
    const family = Array.from(set).slice(0, 40);

    res.json({ phonetic, radical, family });
});

app.post('/radical-info', async (req, res) => {
    const { char, pinyin, definition, components, strokeCount } = req.body;
    if (!char) return res.status(400).json({ error: 'Missing character parameter' });
    if (!OPENAI_API_KEY) return res.status(500).json({ error: 'OpenAI API key not configured.' });

    const cleanComponents = Array.isArray(components) ? components.join(', ') : (components || 'N/A');
    const prompt = `You are an encouraging Chinese language tutor. The learner is studying the character "${char}".
Provide a JSON object with these fields:
- "explanation": a concise paragraph (max 3 sentences) describing meaning, nuance, and when to use the character.
- "mnemonic": a vivid story (max 3 sentences) linking its components to its meaning and sound.
- "strokeTips": actionable guidance (max 3 bullet-style sentences) for remembering stroke order and direction.
- "componentsDetail": optional array listing each component with a short English gloss.

Character facts:
- Character: ${char}
- Pinyin: ${pinyin || 'unknown'}
- Meaning: ${definition || 'unknown'}
- Components: ${cleanComponents}
- Stroke count: ${strokeCount || 'unknown'}
`;

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            response_format: { type: "json_object" },
            temperature: 0.4,
            max_tokens: 400,
            messages: [
                { role: "system", content: "You are an enthusiastic yet concise Chinese language tutor." },
                { role: "user", content: prompt }
            ]
        });

        const content = completion.choices[0]?.message?.content;
        if (!content) throw new Error('OpenAI returned an empty response.');
        const parsed = JSON.parse(content);

        res.json({
            explanation: parsed.explanation || '',
            mnemonic: parsed.mnemonic || '',
            strokeTips: parsed.strokeTips || parsed.stroke_tips || '',
            componentsDetail: parsed.componentsDetail || parsed.components_detail || []
        });
    } catch (error) {
        console.error('Error calling OpenAI for radical info:', error);
        res.status(500).json({ error: `OpenAI API error: ${error.message}` });
    }
});

app.post('/transcribe', upload.single('file'), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No audio file provided.' });
    if (!OPENAI_API_KEY) return res.status(500).json({ error: 'OpenAI API key not configured.' });

    try {
        const formData = new FormData();
        formData.append('file', req.file.buffer, {
            filename: req.file.originalname, // Use the original filename and extension
            contentType: req.file.mimetype, // Use the original mimetype
        });
        formData.append('model', 'whisper-1');
        formData.append('response_format', 'verbose_json');
        if (req.body.prompt) {
            formData.append('prompt', req.body.prompt);
        }

        const whisperResponse = await fetch('https://api.openai.com/v1/audio/transcriptions', {
            method: 'POST',
            headers: {
                ...formData.getHeaders(),
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
            },
            body: formData,
        });

        const data = await whisperResponse.json();
        if (!whisperResponse.ok) throw new Error(data.error?.message || 'Whisper API error');
        res.json(data);
    } catch (error) {
        console.error('Error proxying to Whisper:', error);
        res.status(500).json({ error: `Whisper API error: ${error.message}` });
    }
});

// === Realtime voice tutor: mint a short-lived ephemeral token ===
// The browser never sees the real API key; it gets a short-lived token to
// open a WebRTC session directly with OpenAI's Realtime API.
const REALTIME_MODEL = process.env.REALTIME_MODEL || 'gpt-realtime-2.1';
const REALTIME_VOICE = process.env.REALTIME_VOICE || 'marin';
const TUTOR_INSTRUCTIONS =
    'You are a warm, patient Mandarin Chinese conversation tutor for a beginner learner. ' +
    'CRITICAL RULES: (1) Speak SLOWLY and clearly. (2) Keep every reply to ONE short, simple sentence — never a paragraph. ' +
    '(3) Wait patiently and let the learner finish speaking; NEVER interrupt or rush to answer. ' +
    '(4) After you reply, ask at most one simple question, then STOP and wait for their answer. ' +
    'Use only common, everyday Mandarin vocabulary. Gently correct a clear mistake in one short phrase. ' +
    'If the learner is stuck or uses English, give a brief hint in English, then return to simple Mandarin. Be encouraging and unhurried.';

app.post('/realtime-session', async (req, res) => {
    if (!OPENAI_API_KEY) return res.status(500).json({ error: 'OpenAI API key not configured.' });
    try {
        // Scenario Director: role-play scenario + the learner's due SRS words to elicit.
        const { scenario, targetWords } = req.body || {};
        let instructions = TUTOR_INSTRUCTIONS;
        if (scenario) instructions += ` Role-play this scenario and stay in character throughout: ${String(scenario).slice(0, 1200)}.`;
        if (Array.isArray(targetWords) && targetWords.length) {
            instructions += ` During the conversation, naturally create openings for the learner to use these words (weave them in, do not list them): ${targetWords.slice(0, 12).join('、')}.`;
        }
        const resp = await fetch('https://api.openai.com/v1/realtime/client_secrets', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                session: {
                    type: 'realtime',
                    model: REALTIME_MODEL,
                    instructions,
                    audio: {
                        input: {
                            // Transcribe the learner's speech so the client can show it.
                            transcription: { model: 'whisper-1' },
                            // Wait for a clear pause before responding, so it doesn't
                            // interrupt or rush the learner.
                            turn_detection: { type: 'server_vad', threshold: 0.6, prefix_padding_ms: 300, silence_duration_ms: 900 }
                        },
                        // Slightly slower, calmer speech for a beginner.
                        output: { voice: REALTIME_VOICE, speed: 0.85 }
                    }
                }
            })
        });
        const raw = await resp.text();
        let data = null;
        if (raw) { try { data = JSON.parse(raw); } catch (_) { /* non-JSON */ } }
        if (!resp.ok) {
            const msg = (data && (data.error?.message || data.error)) || raw || `Realtime session error ${resp.status}`;
            console.error(`Realtime session ${resp.status}: ${msg}`);
            return res.status(502).json({ error: msg });
        }
        const token = data?.value || data?.client_secret?.value;
        if (!token) return res.status(502).json({ error: 'No ephemeral token in response.' });
        res.json({ token, model: REALTIME_MODEL });
    } catch (error) {
        console.error('Realtime session error:', error.message);
        res.status(502).json({ error: error.message });
    }
});

// === Scenario Director debrief: one small pass over the conversation transcript ===
app.post('/tutor-debrief', async (req, res) => {
    if (!OPENAI_API_KEY) return res.status(500).json({ error: 'OpenAI API key not configured.' });
    const { transcript, targetWords } = req.body || {};
    if (!transcript) return res.status(400).json({ error: 'Missing transcript.' });
    try {
        const prompt = `A learner practiced Mandarin in this conversation (their lines are "You", the tutor's are "Tutor"). ` +
            `Target words they were meant to practice: ${(Array.isArray(targetWords) ? targetWords.join('、') : '') || 'none'}.\n\n` +
            `Transcript:\n${String(transcript).slice(0, 4000)}\n\n` +
            `Return STRICT JSON: {"used":["<target words the learner actually used correctly>"], ` +
            `"corrections":[{"said":"<short thing the learner said>","better":"<a more natural Mandarin version>","note":"<max 8 words>"}]}. ` +
            `Max 4 corrections, most useful first; empty array if nothing worth correcting.`;
        const c = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            temperature: 0.3,
            response_format: { type: 'json_object' },
            messages: [{ role: 'user', content: prompt }]
        });
        const data = JSON.parse(c.choices[0]?.message?.content || '{}');
        res.json({
            used: Array.isArray(data.used) ? data.used : [],
            corrections: Array.isArray(data.corrections) ? data.corrections : []
        });
    } catch (error) {
        console.error('Debrief error:', error.message);
        res.status(502).json({ error: 'Debrief failed.' });
    }
});

// === Date practice: suggest a few things the learner could say back ===
// Given the date's last line (+ a little context), return 2-3 short, natural
// replies the learner can read aloud. Keeps them simple, flirty, and in the
// spirit of the roleplay. Falls back to an empty list on any error.
app.post('/date-reply-suggestions', async (req, res) => {
    if (!OPENAI_API_KEY) return res.status(500).json({ error: 'OpenAI API key not configured.' });
    const { lastLine, history } = req.body || {};
    if (!lastLine) return res.status(400).json({ error: 'Missing lastLine.' });
    try {
        const prompt =
            `A male learner is on a playful, flirtatious practice date with a Chinese woman (roleplay). ` +
            `Recent lines (most recent last):\n${String(history || '').slice(0, 1200)}\n\n` +
            `She just said: "${String(lastLine).slice(0, 300)}".\n\n` +
            `Suggest 2-3 things HE could say back, out loud, in simple spoken Mandarin. ` +
            `Make them warm and a little bold/flirty but always respectful and non-explicit; vary them ` +
            `(e.g. one answer, one playful/teasing, one question back). Keep each to one short sentence a beginner can pronounce. ` +
            `Return STRICT JSON: {"suggestions":[{"zh":"<Chinese>","en":"<natural English>"}]}.`;
        const c = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            temperature: 0.8,
            response_format: { type: 'json_object' },
            messages: [{ role: 'user', content: prompt }]
        });
        const data = JSON.parse(c.choices[0]?.message?.content || '{}');
        const suggestions = (Array.isArray(data.suggestions) ? data.suggestions : [])
            .filter(s => s && s.zh)
            .slice(0, 3)
            .map(s => ({ zh: String(s.zh).slice(0, 60), en: String(s.en || '').slice(0, 120) }));
        res.json({ suggestions });
    } catch (error) {
        console.error('Date-suggestions error:', error.message);
        res.status(502).json({ error: 'Suggestions failed.' });
    }
});

// === OCR: extract Chinese text from an uploaded image via OpenAI Vision ===
app.post('/ocr', upload.single('image'), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No image provided.' });
    if (!OPENAI_API_KEY) return res.status(500).json({ error: 'OpenAI API key not configured.' });

    try {
        const base64 = req.file.buffer.toString('base64');
        const dataUrl = `data:${req.file.mimetype || 'image/jpeg'};base64,${base64}`;
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            max_tokens: 1200,
            messages: [{
                role: 'user',
                content: [
                    { type: 'text', text: 'Extract all Chinese text from this image. Return ONLY the Chinese text exactly as it appears, preserving line breaks between separate lines. Do not add pinyin, translation, or any commentary. If there is no Chinese text, return an empty string.' },
                    { type: 'image_url', image_url: { url: dataUrl } }
                ]
            }]
        });
        const text = completion.choices[0]?.message?.content?.trim() || '';
        res.json({ text });
    } catch (error) {
        console.error('Error during OCR:', error.message);
        res.status(502).json({ error: `OCR failed: ${error.message}` });
    }
});

// === Karaoke: proxy NetEase Cloud Music (the VPS can reach it; the client can't) ===
const NETEASE_HEADERS = { 'Referer': 'https://music.163.com', 'User-Agent': 'Mozilla/5.0' };

// --- QQ Music fallback (used only when NetEase search comes back empty) ---
// NetEase search is unreliable for some songs (unlicensed, regional, or just
// missing from its catalog). QQ Music's web search + lyric endpoints are
// public, unauthenticated, and return plain base64 LRC (no per-provider
// crypto to reverse, unlike Kugou's KRC format — see LyricsKit notes below),
// which makes this a cheap second source. Fallback ids are prefixed "qq:" so
// /song-lyric knows which provider to hit.
const QQ_HEADERS = { 'Referer': 'https://y.qq.com/', 'User-Agent': 'Mozilla/5.0' };

// --- LRCLIB (lrclib.net) — PRIMARY source ---
// Free, no auth, no self-hosting; returns time-synced LRC inline as JSON. Its
// Chinese/Mando-pop coverage and matching are far better than NetEase's ranking
// (which returns unrelated hits for common titles like 童话), so it runs first
// and NetEase/QQ are only fallbacks. Etiquette: send an identifying User-Agent.
// Ids are prefixed "lrclib:" so /song-lyric fetches from GET /api/get/{id}.
const LRCLIB_HEADERS = { 'User-Agent': 'PinyinReader (https://github.com/madmen2302/PINYIN)' };

async function lrclibSearch(q) {
    const resp = await fetch(`https://lrclib.net/api/search?q=${encodeURIComponent(q)}`, { headers: LRCLIB_HEADERS });
    if (!resp.ok) return [];
    const list = await resp.json();
    if (!Array.isArray(list)) return [];
    // Karaoke needs timed lyrics — keep only entries that actually have synced LRC.
    return list
        .filter(s => s && s.syncedLyrics && s.trackName)
        .map(s => ({
            id: `lrclib:${s.id}`,
            name: s.trackName,
            artist: s.artistName || '',
            album: s.albumName || ''
        }));
}

async function lrclibLyric(id) {
    const resp = await fetch(`https://lrclib.net/api/get/${encodeURIComponent(id)}`, { headers: LRCLIB_HEADERS });
    if (!resp.ok) return { lrc: '', tlyric: '' };
    const data = await resp.json();
    // syncedLyrics is the LRC ([mm:ss.xx] lines); no separate translation track.
    return { lrc: data?.syncedLyrics || '', tlyric: '' };
}

async function qqMusicSearch(q) {
    const resp = await fetch('https://u.y.qq.com/cgi-bin/musicu.fcg', {
        method: 'POST',
        headers: { ...QQ_HEADERS, 'Content-Type': 'application/json' },
        body: JSON.stringify({
            req: {
                method: 'DoSearchForQQMusicDesktop',
                module: 'music.search.SearchCgiService',
                param: { num_per_page: 20, page_num: 1, query: q, search_type: 0, grp: 1 }
            }
        })
    });
    const data = await resp.json();
    const list = data?.req?.data?.body?.song?.list || [];
    return list.map(s => ({
        id: `qq:${s.mid}`,
        name: s.name,
        artist: (s.singer || []).map(a => a.name).join(', '),
        album: s.album?.name || ''
    })).filter(s => s.id !== 'qq:' && s.name);
}

async function qqMusicLyric(mid) {
    const resp = await fetch(`https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg?songmid=${encodeURIComponent(mid)}&g_tk=5381&format=json`, {
        headers: { ...QQ_HEADERS, 'Referer': `https://y.qq.com/n/yqq/song/${encodeURIComponent(mid)}.html` }
    });
    const data = await resp.json();
    const lrc = data?.lyric ? Buffer.from(data.lyric, 'base64').toString('utf8') : '';
    const tlyric = data?.trans ? Buffer.from(data.trans, 'base64').toString('utf8') : '';
    return { lrc, tlyric };
}

app.get('/song-search', async (req, res) => {
    const q = (req.query.q || '').trim();
    if (!q) return res.status(400).json({ error: 'Missing query.' });
    let songs = [];
    // 1) LRCLIB first — best Chinese hit rate, synced lyrics guaranteed.
    try { songs = await lrclibSearch(q); } catch (error) { console.error('LRCLIB search error:', error.message); }
    // 2) NetEase fallback (unreliable ranking, but wider catalog for some tracks).
    if (songs.length === 0) try {
        const resp = await fetch('https://music.163.com/api/search/get', {
            method: 'POST',
            headers: { ...NETEASE_HEADERS, 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ s: q, type: '1', limit: '30', offset: '0' }).toString()
        });
        // NetEase returns non-JSON for some queries (e.g. Latin text) — parse safely.
        const raw = await resp.text();
        let data = null;
        try { data = JSON.parse(raw); } catch (_) { /* non-JSON */ }
        songs = (data?.result?.songs || []).map(s => ({
            id: s.id,
            name: s.name,
            artist: (s.artists || []).map(a => a.name).join(', '),
            album: s.album?.name || ''
        }));
        // Drop obvious karaoke/instrumental/remix uploads to cut the clutter.
        const junk = /(伴奏|纯音乐|純音樂|karaoke|instrumental|remix|dj版|\bdj\b|翻自)/i;
        songs = songs.filter(s => s.name && !junk.test(s.name));
        // De-dupe by name+artist.
        const seen = new Set();
        songs = songs.filter(s => { const k = s.name + '|' + s.artist; if (seen.has(k)) return false; seen.add(k); return true; });
    } catch (error) {
        console.error('NetEase song search error:', error.message);
    }
    // 3) QQ Music last resort.
    if (songs.length === 0) {
        try { songs = await qqMusicSearch(q); } catch (error) { console.error('QQ Music fallback search error:', error.message); }
    }
    res.json({ songs });
});

app.get('/song-lyric', async (req, res) => {
    const id = (req.query.id || '').trim();
    if (!id) return res.status(400).json({ error: 'Missing id.' });
    try {
        if (id.startsWith('lrclib:')) {
            const { lrc, tlyric } = await lrclibLyric(id.slice(7));
            const stripped = lrc.replace(/\[[0-9:.]+\]/g, '').replace(/\s/g, '');
            return res.json({ lrc, tlyric, available: stripped.length > 20 });
        }
        if (id.startsWith('qq:')) {
            const { lrc, tlyric } = await qqMusicLyric(id.slice(3));
            const stripped = lrc.replace(/\[[0-9:.]+\]/g, '').replace(/\s/g, '');
            return res.json({ lrc, tlyric, available: stripped.length > 20 });
        }
        const resp = await fetch(`https://music.163.com/api/song/lyric?os=pc&id=${encodeURIComponent(id)}&lv=-1&kv=-1&tv=-1`, { headers: NETEASE_HEADERS });
        const data = await resp.json();
        const lrc = data?.lrc?.lyric || '';
        // Some (often the licensed "original") tracks expose no lyrics — the free
        // API returns "暂无歌词". Flag that so the client can suggest another take.
        const stripped = lrc.replace(/\[[0-9:.]+\]/g, '').replace(/\s/g, '');
        const available = stripped.length > 20 && !/暂无歌词|纯音乐|純音樂/.test(stripped);
        res.json({ lrc, tlyric: data?.tlyric?.lyric || '', available });
    } catch (error) {
        console.error('Song lyric error:', error.message);
        res.status(502).json({ error: 'Could not fetch lyrics.' });
    }
});

// === Resolve a music-service link (Spotify/Apple Music/YouTube/etc) to a
// "title artist" search query, so karaoke can find the right lyrics without
// the user typing the song name. Uses each service's public oEmbed endpoint
// (no auth / paid API needed) or an og:title scrape as a fallback — all done
// server-side since the browser can't reach these cross-origin.
function cleanTrackTitle(s) {
    return (s || '')
        .replace(/[\(\[][^)\]]*(official|video|audio|lyric|visualizer|remaster)[^)\]]*[\)\]]/gi, '')
        .replace(/\bmv\b/gi, '')
        .replace(/-\s*topic\s*$/i, '')
        .replace(/\bfeat\.?.*$/i, '')
        .replace(/\bft\.?.*$/i, '')
        .replace(/\s+/g, ' ')
        .trim();
}

// The generic fallback branch below fetches whatever URL the user pastes —
// block obvious loopback/private/link-local hosts so this can't be used as an
// SSRF probe against the VPS itself or its local network.
function isPrivateHost(host) {
    return /^(localhost|127\.|0\.0\.0\.0|::1$|\[::1\]$|169\.254\.|10\.|192\.168\.)/i.test(host)
        || /^172\.(1[6-9]|2\d|3[01])\./.test(host);
}

app.post('/resolve-track', async (req, res) => {
    const url = ((req.body && req.body.url) || '').trim();
    let host;
    try {
        const u = new URL(url);
        if (!/^https?:$/.test(u.protocol)) throw new Error('bad protocol');
        host = u.hostname.replace(/^www\./, '');
        if (isPrivateHost(host)) throw new Error('private host');
    } catch (_) { return res.status(400).json({ error: 'Provide a valid link.' }); }
    try {
        let title = '', artist = '';
        if (/open\.spotify\.com/.test(host)) {
            const r = await fetch(`https://open.spotify.com/oembed?url=${encodeURIComponent(url)}`);
            if (!r.ok) throw new Error('lookup failed');
            const d = await r.json();
            title = d.title || '';
            artist = (d.author_name && !/spotify/i.test(d.author_name)) ? d.author_name : '';
        } else if (/(^|\.)youtube\.com$|youtu\.be$/.test(host)) {
            const r = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`);
            if (!r.ok) throw new Error('lookup failed');
            const d = await r.json();
            // YouTube titles are often "Artist - Song"; author_name is the channel
            // (frequently "Artist - Topic" for auto-generated music channels).
            const m = (d.title || '').match(/^(.+?)\s*[-–]\s*(.+)$/);
            if (m) { artist = d.author_name || m[1]; title = m[2]; } else { title = d.title || ''; artist = d.author_name || ''; }
        } else if (/music\.apple\.com/.test(host)) {
            const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
            if (!r.ok) throw new Error('lookup failed');
            const html = await r.text();
            const og = html.match(/<meta property="og:title" content="([^"]+)"/i);
            const raw = og ? og[1] : '';
            // Apple Music og:title usually reads "Song by Artist on Apple Music".
            const m = raw.match(/^(.+?)\s+by\s+(.+?)(?:\s+on\s+Apple\s+Music)?$/i);
            if (m) { title = m[1]; artist = m[2]; } else { title = raw; }
        } else {
            // Generic fallback (QQ Music and anything else with an og:title/<title>).
            const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
            if (!r.ok) throw new Error('lookup failed');
            const html = await r.text();
            const og = html.match(/<meta property="og:title" content="([^"]+)"/i) || html.match(/<title>([^<]+)<\/title>/i);
            title = og ? og[1] : '';
        }
        title = cleanTrackTitle(title);
        artist = cleanTrackTitle(artist);
        if (!title) return res.status(422).json({ error: "Couldn't read that link — try typing the song name." });
        res.json({ title, artist, query: [title, artist].filter(Boolean).join(' ') });
    } catch (error) {
        console.error('resolve-track error:', error.message);
        res.status(502).json({ error: "Couldn't read that link — try typing the song name." });
    }
});

// === Video subtitle extraction (delegated to a home GPU worker) ===
// The worker (scripts/video-worker.py, run on the home PC over Tailscale) does
// yt-dlp caption extraction and, when a video has none, audio -> local
// faster-whisper. A tiny async job model keeps a long transcription from ever
// hitting the reverse-proxy's request timeout: POST /video-subs returns a jobId
// immediately and does the (possibly minutes-long) worker call in the
// background; the client polls /video-subs-status. Jobs live in memory + expire.
const VIDEO_WORKER_URL = process.env.VIDEO_WORKER_URL; // e.g. http://home-pc:8723
const videoJobs = new Map(); // jobId -> { status, result, error, at }
setInterval(() => {
    const cutoff = Date.now() - 30 * 60 * 1000;
    for (const [id, j] of videoJobs) if (j.at < cutoff) videoJobs.delete(id);
}, 5 * 60 * 1000);

app.post('/video-subs', (req, res) => {
    const url = ((req.body && req.body.url) || '').trim();
    if (!/^https?:\/\/\S+$/i.test(url)) return res.status(400).json({ error: 'Provide a valid video URL.' });
    if (!VIDEO_WORKER_URL) return res.status(503).json({ error: 'Video extraction is not configured (VIDEO_WORKER_URL unset on the server).' });
    const jobId = crypto.randomBytes(8).toString('hex');
    videoJobs.set(jobId, { status: 'pending', at: Date.now() });
    res.json({ jobId });
    (async () => {
        try {
            const r = await fetch(`${VIDEO_WORKER_URL.replace(/\/$/, '')}/extract`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, transcribe: true }),
                timeout: 30 * 60 * 1000 // ceiling for long videos
            });
            const data = await r.json().catch(() => ({}));
            if (!r.ok) throw new Error(data.error || `worker error ${r.status}`);
            videoJobs.set(jobId, { status: 'done', result: data, at: Date.now() });
        } catch (e) {
            const msg = /ECONNREFUSED|ENOTFOUND|ETIMEDOUT|network timeout/i.test(e.message || '')
                ? 'Home worker unreachable (is the PC on and on the tailnet?).'
                : (e.message || 'Extraction failed.');
            videoJobs.set(jobId, { status: 'error', error: msg, at: Date.now() });
        }
    })();
});

app.get('/video-subs-status', (req, res) => {
    const job = videoJobs.get((req.query.jobId || '').toString());
    if (!job) return res.status(404).json({ error: 'Unknown or expired job.' });
    if (job.status === 'done') return res.json({ status: 'done', ...job.result });
    if (job.status === 'error') return res.json({ status: 'error', error: job.error });
    res.json({ status: 'pending' });
});

// === Identify a playing song via ACRCloud (returns song + play offset) ===
// Requires ACR_HOST, ACR_ACCESS_KEY, ACR_ACCESS_SECRET in .env (free account
// at acrcloud.com -> a "Recognition" / Audio bucket).
const ACR_HOST = process.env.ACR_HOST;
const ACR_ACCESS_KEY = process.env.ACR_ACCESS_KEY;
const ACR_ACCESS_SECRET = process.env.ACR_ACCESS_SECRET;

app.post('/identify-song', upload.single('sample'), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No audio sample provided.' });
    if (!ACR_HOST || !ACR_ACCESS_KEY || !ACR_ACCESS_SECRET) {
        return res.status(500).json({ error: 'Song identification is not configured (ACRCloud keys missing in .env).' });
    }
    try {
        const method = 'POST', uri = '/v1/identify', dataType = 'audio', sigVersion = '1';
        const timestamp = Math.floor(Date.now() / 1000).toString();
        const stringToSign = [method, uri, ACR_ACCESS_KEY, dataType, sigVersion, timestamp].join('\n');
        const signature = crypto.createHmac('sha1', ACR_ACCESS_SECRET).update(Buffer.from(stringToSign, 'utf-8')).digest('base64');

        const form = new FormData();
        form.append('sample', req.file.buffer, { filename: 'sample' });
        form.append('sample_bytes', req.file.buffer.length.toString());
        form.append('access_key', ACR_ACCESS_KEY);
        form.append('data_type', dataType);
        form.append('signature_version', sigVersion);
        form.append('signature', signature);
        form.append('timestamp', timestamp);

        const resp = await fetch(`https://${ACR_HOST}/v1/identify`, { method: 'POST', headers: form.getHeaders(), body: form });
        const data = await resp.json();
        if (data?.status?.code !== 0) {
            return res.status(404).json({ error: data?.status?.msg || 'No song matched.' });
        }
        const m = data.metadata?.music?.[0];
        if (!m) return res.status(404).json({ error: 'No song matched.' });
        res.json({
            title: m.title || '',
            artist: (m.artists || []).map(a => a.name).join(', '),
            album: m.album?.name || '',
            offsetMs: m.play_offset_ms || 0
        });
    } catch (error) {
        console.error('ACRCloud error:', error.message);
        res.status(502).json({ error: 'Song identification failed.' });
    }
});

// === NEW ENDPOINT TO SAVE THE CUSTOM DATABASE ===
// NOTE: this endpoint is still unauthenticated and replaces the whole shared
// custom-db.json — the proper fix is per-user accounts (see the iOS/port plan).
// Until then it is rate-limited (saveDbLimiter), shape/size-validated, and
// written atomically so it can't be corrupted mid-write or by a concurrent save.
app.post('/save-custom-db', async (req, res) => {
    const dataToSave = req.body;
    const dbPath = path.join(__dirname, 'custom-db.json');

    // Must be a plain object (not null/array) with a sane number of entries.
    if (typeof dataToSave !== 'object' || dataToSave === null || Array.isArray(dataToSave)) {
        return res.status(400).json({ error: 'Invalid data format. Expected a JSON object.' });
    }
    if (Object.keys(dataToSave).length > 100000) {
        return res.status(413).json({ error: 'Payload too large.' });
    }

    try {
        const jsonString = JSON.stringify(dataToSave, null, 2);
        // Atomic write: write a temp file, then rename over the target. rename is
        // atomic on the same filesystem, so a crash or concurrent write can never
        // leave custom-db.json half-written.
        const tmpPath = `${dbPath}.tmp-${crypto.randomBytes(6).toString('hex')}`;
        await fs.writeFile(tmpPath, jsonString, 'utf8');
        await fs.rename(tmpPath, dbPath);
        res.status(200).json({ message: 'Database saved successfully.' });
    } catch (error) {
        console.error('❌ Error saving custom-db.json:', error);
        res.status(500).json({ error: 'Failed to write to the database file on the server.' });
    }
});

/**
 * Starts the server after ensuring all critical asynchronous data is loaded.
 * This prevents a race condition where the server might start handling requests
 * before it's fully initialized.
 */
async function startServer() {
    // Wait for the decomposition data to be fetched and parsed before starting the server.
    await loadDecompositionData();
    await loadTranslationCache();

    app.listen(PORT, () => {
        console.log(`✅ Server is running on http://localhost:${PORT}`);
        console.log("Waiting for requests...");
    });
}

startServer();