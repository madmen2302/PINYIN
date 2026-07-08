// One-time script: tag every HSK word with a semantic topic using OpenAI, so
// the app can offer topic-based practice (food, sports, travel, ...).
//
// Run it ONCE on the server (where OPENAI_API_KEY lives), then commit the
// generated hsk-topics.json so it deploys. It is resumable — safe to re-run
// if it's interrupted; it skips words already tagged.
//
//   cd /var/www/PINYIN && node scripts/tag-hsk-topics.js
//
// Cost: ~11,470 words in batches of 60 => ~190 cheap gpt-4o-mini calls.

require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const fs = require('fs');
const path = require('path');
const { OpenAI } = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const TOPICS = [
    'food & drink', 'sports & fitness', 'travel & transport', 'family & people',
    'work & study', 'health & body', 'nature & weather', 'technology & media',
    'shopping & money', 'home & daily life', 'time & dates', 'emotions & personality',
    'arts & culture', 'abstract & function words'
];

const hskPath = path.join(__dirname, '..', 'hsk.json');
const outPath = path.join(__dirname, '..', 'hsk-topics.json');

const hsk = JSON.parse(fs.readFileSync(hskPath, 'utf8'));
const words = Object.keys(hsk);
const out = fs.existsSync(outPath) ? JSON.parse(fs.readFileSync(outPath, 'utf8')) : {};
const todo = words.filter(w => !out[w]);

const BATCH = 60;

(async () => {
    if (!process.env.OPENAI_API_KEY) { console.error('OPENAI_API_KEY missing.'); process.exit(1); }
    console.log(`Tagging ${todo.length} of ${words.length} words (rest already done)...`);
    for (let i = 0; i < todo.length; i += BATCH) {
        const batch = todo.slice(i, i + BATCH);
        const prompt =
            `Classify each Chinese word into EXACTLY ONE topic from this list: ${TOPICS.join(', ')}.\n` +
            `Return a strict JSON object mapping each word (exactly as given) to its single best topic.\n` +
            `Words: ${batch.join(' ')}`;
        try {
            const c = await openai.chat.completions.create({
                model: 'gpt-4o-mini',
                temperature: 0,
                response_format: { type: 'json_object' },
                messages: [{ role: 'user', content: prompt }]
            });
            const obj = JSON.parse(c.choices[0].message.content);
            for (const [w, t] of Object.entries(obj)) {
                if (hsk[w] && typeof t === 'string') out[w] = t.toLowerCase().trim();
            }
            fs.writeFileSync(outPath, JSON.stringify(out));
            console.log(`  tagged ${Math.min(i + BATCH, todo.length)}/${todo.length}`);
        } catch (e) {
            console.error(`  batch at ${i} failed: ${e.message} (will retry on next run)`);
        }
    }
    console.log(`Done. Wrote ${Object.keys(out).length} tags -> ${outPath}`);
    console.log('Now: git add hsk-topics.json && git commit && push, then pm2 restart pinyin is NOT needed (static file).');
})();
