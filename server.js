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

// === Cache Management ===
const CACHE_LIMIT = 2000;
const characterCache = new Map();
let decompositionData = null;

async function loadDecompositionData() {
    const url = 'https://cdn.jsdelivr.net/npm/hanzi-writer-data@latest/data/CH-decomp.json';
    try {
        const resp = await fetch(url);
        if (!resp.ok) throw new Error(`Failed to load decomposition data: ${resp.status}`);
        decompositionData = await resp.json();
        console.log('✅ Loaded decomposition data.');
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
app.use(express.static(__dirname));

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
app.use('/translate', utilityLimiter); // Apply lenient limit to utility endpoint

const DEEPL_API_KEY = process.env.DEEPL_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!DEEPL_API_KEY || !OPENAI_API_KEY) {
    console.warn("⚠️ WARNING: API keys (DeepL or OpenAI) are missing in .env file.");
}

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

// === Routes ===

app.post('/translate', async (req, res) => {
    const { text, target_lang } = req.body;
    if (!text || !target_lang) return res.status(400).json({ error: 'Missing parameters' });
    
    if (!DEEPL_API_KEY) return res.status(500).json({ error: 'DeepL API key not configured on server.' });

    const url = 'https://api-free.deepl.com/v2/translate';
    try {
        const deeplResponse = await fetch(url, {
            method: 'POST',
            headers: { 'Authorization': `DeepL-Auth-Key ${DEEPL_API_KEY}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: [text], target_lang })
        });
        const data = await deeplResponse.json();
        if (!deeplResponse.ok) throw new Error(data.message || 'DeepL API error');
        res.json(data);
    } catch (error) {
        console.error('Error proxying to DeepL:', error);
        res.status(500).json({ error: error.message });
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

    if (decompositionData && decompositionData[decodedChar]) {
        const entry = decompositionData[decodedChar];
        if (Array.isArray(entry)) {
            if (Array.isArray(entry[1])) components = entry[1];
            if (typeof entry[2] === 'number') strokeCount = entry[2];
        }
    }

    // --- OPTIMIZATION ---
    // Only fetch the full character stroke data if we couldn't find the stroke count locally.
    // The client can fetch full stroke data on-demand if needed for animations.
    if (strokeCount === null) {
        try {
            const charUrl = `https://cdn.jsdelivr.net/npm/hanzi-writer-data@latest/data/${encodeURIComponent(decodedChar)}.json`;
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

    app.listen(PORT, () => {
        console.log(`✅ Server is running on http://localhost:${PORT}`);
        console.log("Waiting for requests...");
    });
}

startServer();