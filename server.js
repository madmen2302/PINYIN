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
        console.log(`✅ Loaded decomposition data for ${Object.keys(map).length} characters.`);
    } catch (error) {
        console.warn('⚠️ Could not load decomposition data:', error.message);
        decompositionData = {};
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
app.use('/ocr', aiLimiter);
app.use('/realtime-session', aiLimiter);
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
    translationCacheDirty = false;
    try {
        await fs.writeFile(TRANSLATION_CACHE_FILE, JSON.stringify(translationCache), 'utf8');
    } catch (e) {
        console.warn('Could not persist translation cache:', e.message);
    }
}
setInterval(saveTranslationCache, 30 * 1000); // flush at most every 30s

// === Routes ===

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
        }
        res.json(data);
    } catch (error) {
        console.error('Error proxying to DeepL:', error.message);
        res.status(502).json({ error: error.message });
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
        const resp = await fetch('https://api.openai.com/v1/realtime/client_secrets', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                session: {
                    type: 'realtime',
                    model: REALTIME_MODEL,
                    instructions: TUTOR_INSTRUCTIONS,
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
            body: new URLSearchParams({ s: q, type: '1', limit: '20', offset: '0' }).toString()
        });
        const data = await resp.json();
        const songs = (data?.result?.songs || []).map(s => ({
            id: s.id,
            name: s.name,
            artist: (s.artists || []).map(a => a.name).join(', '),
            album: s.album?.name || ''
        }));
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
        res.json({ lrc: data?.lrc?.lyric || '', tlyric: data?.tlyric?.lyric || '' });
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