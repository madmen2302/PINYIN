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
app.use('/identify-song', aiLimiter);
app.use('/translate', utilityLimiter); // Apply lenient limit to utility endpoint

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
        if (scenario) instructions += ` Role-play this scenario and stay in character throughout: ${String(scenario).slice(0, 240)}.`;
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

app.get('/song-search', async (req, res) => {
    const q = (req.query.q || '').trim();
    if (!q) return res.status(400).json({ error: 'Missing query.' });
    try {
        const resp = await fetch('https://music.163.com/api/search/get', {
            method: 'POST',
            headers: { ...NETEASE_HEADERS, 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ s: q, type: '1', limit: '30', offset: '0' }).toString()
        });
        // NetEase returns non-JSON for some queries (e.g. Latin text) — parse safely.
        const raw = await resp.text();
        let data = null;
        try { data = JSON.parse(raw); } catch (_) { /* non-JSON */ }
        let songs = (data?.result?.songs || []).map(s => ({
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
        res.json({ songs });
    } catch (error) {
        console.error('Song search error:', error.message);
        res.status(502).json({ error: 'Song search failed.' });
    }
});

app.get('/song-lyric', async (req, res) => {
    const id = (req.query.id || '').trim();
    if (!id) return res.status(400).json({ error: 'Missing id.' });
    try {
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
app.post('/save-custom-db', async (req, res) => {
    console.log('Received request to save custom DB.');

    const dataToSave = req.body;
    const dbPath = path.join(__dirname, 'custom-db.json');

    // Basic validation: check if the received data is an object
    if (typeof dataToSave !== 'object' || dataToSave === null) {
        return res.status(400).json({ error: 'Invalid data format. Expected a JSON object.' });
    }

    try {
        // Convert the JSON object to a string with nice formatting (2-space indent)
        const jsonString = JSON.stringify(dataToSave, null, 2);

        // Asynchronously write the file. This is non-blocking.
        await fs.writeFile(dbPath, jsonString, 'utf8');

        console.log('✅ Successfully saved custom-db.json');
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