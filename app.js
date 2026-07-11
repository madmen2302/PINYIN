// ======== latest ========
//const backendUrl = 'http://localhost:3000'; // <-- CHANGE FOR LOCAL TESTING
const backendUrl = 'https://pinyin.namm.xyz:8443'; // <-- ADD THIS LINE

// === SVG ICONS ===Global Character Stats
const playIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M8 5v14l11-7z"></path></svg>`;
const chevronDownIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>`;
const chevronUpIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>`;
const historyIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.25 2.52.77-1.28-3.52-2.09V8H12z"/></svg>`;
const toolsIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41h-3.84 c-0.24,0-0.44,0.17-0.48,0.41L9.2,5.77C8.61,6.01,8.08,6.33,7.58,6.71L5.19,5.75C4.97,5.68,4.72,5.75,4.6,5.97L2.68,9.29 c-0.11,0.2-0.06,0.47,0.12,0.61l2.03,1.58C4.78,11.7,4.76,12,4.76,12.3c0,0.3,0.02,0.6,0.06,0.9l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.04,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.48-0.41l0.36-2.54c0.59-0.24,1.12-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0.01,0.59-0.22l1.92-3.32c0.11-0.2,0.06-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/></svg>`;
const textInputIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM4 12h4v2H4v-2zm10 6H4v-2h10v2zm6 0h-4v-2h4v2zm0-4H10v-2h10v2z"/></svg>`;

// ======== ELEMENTS ========
const downloadAllBtn = document.getElementById('download-all-btn');
const finalOutput = document.getElementById('finalOutput');
const wave = document.getElementById('waveContainer');
const modal = document.getElementById('main-modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const modalContent = document.getElementById('modal-content');
const modalCloseBtn = document.getElementById('modal-close-btn');
const statsOutput = document.getElementById('statsOutput');
const statsTitle = document.getElementById('stats-title');
const statsContent = document.getElementById('stats-content');
const historyList = document.getElementById('history-list');
const clearHistoryBtn = document.getElementById('clear-history-btn');
const historyCategoryFilters = document.getElementById('history-category-filters'); // === NEW ===
const historySearchInput = document.getElementById('history-search-input'); // === NEW ===
const historyPanel = document.getElementById('history-panel');
const historyDragHandle = document.getElementById('history-drag-handle');
const topControlsWrapper = document.getElementById('top-controls-wrapper');
// Create the button dynamically instead of getting it from HTML
const controlsToggleBtn = document.createElement('button');
controlsToggleBtn.id = 'controls-toggle-btn';
controlsToggleBtn.className = 'header-icon-btn';
controlsToggleBtn.innerHTML = textInputIcon; // Give the button an icon
controlsToggleBtn.title = 'Show / hide the text input';
controlsToggleBtn.setAttribute('aria-label', 'Show or hide the text input');
const darkModeToggle = document.getElementById('dark-mode-toggle');
const bars = document.querySelectorAll('.bar');
const textInput = document.getElementById('text-input');
const autoPronounceToggle = document.getElementById('auto-pronounce-toggle');
const repeatCountSelector = document.getElementById('repeat-count-selector');
const voiceSelector = document.getElementById('voice-selector');
const speedSlider = document.getElementById('speed-slider');
const enhanceBtn = document.getElementById('enhance-btn');
const revertBtn = document.getElementById('revert-btn');
const ttsControls = document.getElementById('tts-controls');
const processingOverlay = document.getElementById('processing-overlay');
const saveSessionToggle = document.getElementById('save-session-toggle');
const autoSaveStatus = document.getElementById('auto-save-status');

// === FAB Elements ===
const micFab = document.getElementById('mic-fab');
const summaryFab = document.getElementById('summary-fab');
const downloadFab = document.getElementById('download-fab');
const playAllFab = document.getElementById('play-all-fab');
const playCharListFab = document.getElementById('play-char-list-fab'); // === NEW ===
const soundStopFab = document.getElementById('sound-stop-fab');

// === Global Stats Elements ===
const globalStatsOutput = document.getElementById('global-stats-output'); // === NEW ===
const globalStatsTitle = document.getElementById('global-stats-title'); // === NEW ===
const globalStatsContent = document.getElementById('global-stats-content'); // === NEW ===

// === Right Panel Elements ===
const rightPanel = document.getElementById('right-panel');
const rightPanelDragHandle = document.getElementById('right-panel-drag-handle');
const voiceSettingsToggle = document.getElementById('voice-settings-toggle');
const panelOverlay = document.getElementById('panel-overlay');

// === Flashcard Elements ===
const flashcardBtn = document.getElementById('flashcard-btn');
const flashcardGameBtn = document.getElementById('flashcard-game-btn');
const flashcardModal = document.getElementById('flashcard-modal');
const flashcardMain = document.getElementById('flashcard-main');
const flashcardCloseBtn = document.getElementById('flashcard-close-btn');
const deckManager = document.getElementById('deck-manager');
const deckDetails = document.getElementById('deck-details');
const flashcardViewer = document.getElementById('flashcard-viewer');
const deckList = document.getElementById('deck-list');
const deckSelector = document.getElementById('flashcard-deck-selector');
const addToDeckBtn = document.getElementById('add-to-deck-btn');
const createDeckBtn = document.getElementById('create-deck-btn');
const deleteDeckBtn = document.getElementById('delete-deck-btn');
const deckSummary = document.getElementById('deck-summary');
const deckCardTable = document.getElementById('deck-card-table');
const flashcardSettings = document.getElementById('flashcard-settings');
const selectAllCharsBtn = document.getElementById('select-all-chars-btn');
const flashcardTestModeCheckboxes = document.querySelectorAll('#flashcard-test-options .test-mode-checkbox');
const flashcardLayoutCheckboxes = document.querySelectorAll('#flashcard-settings input[type="checkbox"]');
const flashcardEl = document.getElementById('flashcard');
const flashcardFront = document.getElementById('flashcard-front');
const flashcardBack = document.getElementById('flashcard-back');
const flashcardNav = document.getElementById('flashcard-nav');
const flashcardPrevBtn = document.getElementById('flashcard-prev-btn');
const flashcardCounter = document.getElementById('flashcard-counter');
const flashcardFlipBtn = document.getElementById('flashcard-flip-btn');
const flashcardAiBtn = document.getElementById('flashcard-ai-btn');
const flashcardNextBtn = document.getElementById('flashcard-next-btn');
const flashcardTestControls = document.getElementById('flashcard-test-controls');
const testWrongBtn = document.getElementById('test-wrong-btn');
const testRightBtn = document.getElementById('test-right-btn');
const startStudyBtn = document.getElementById('start-study-btn');
const startTestBtn = document.getElementById('start-test-btn');
const reviewDueBtn = document.getElementById('review-due-btn');
const resetStatsBtn = document.getElementById('reset-stats-btn');
const downloadCsvBtn = document.getElementById('download-csv-btn');
const backToDecksBtn = document.getElementById('back-to-decks-btn');
const testScore = document.getElementById('test-score');
const testSkipBtn = document.getElementById('test-skip-btn');
const flashcardFeedback = document.getElementById('flashcard-feedback');
const flashcardDueIndicator = document.getElementById('flashcard-due-indicator');
const sayFirstToggle = document.getElementById('say-first-toggle');
const sayFirstBar = document.getElementById('say-first-bar');
const sayFirstMic = document.getElementById('say-first-mic');
const sayFirstStatus = document.getElementById('say-first-status');

// === Radicals Elements ===
const mnemonicModal = document.getElementById('mnemonic-modal');
const mnemonicModalTitle = document.getElementById('mnemonic-modal-title');
const mnemonicInput = document.getElementById('mnemonic-input');
const mnemonicSaveBtn = document.getElementById('mnemonic-save-btn');
const mnemonicCancelBtn = document.getElementById('mnemonic-cancel-btn');

// === Radicals Elements ===
const radicalsBtn = document.getElementById('radicals-btn');
const radicalsPanel = document.getElementById('radicals-panel');
const radicalsCharList = document.getElementById('radicals-char-list');
const radicalsOutput = document.getElementById('radicals-output');

// === NEW: Character Info Edit Modal Elements ===
const charInfoModal = document.getElementById('char-info-modal');
const charInfoModalTitle = document.getElementById('char-info-modal-title');
const charInfoSaveBtn = document.getElementById('char-info-save-btn');
const charInfoCancelBtn = document.getElementById('char-info-cancel-btn');
const charInfoSaveBackBtn = document.getElementById('char-info-save-back-btn');
let activeEditChar = null;


// === NEW: Session Edit Modal Elements ===
const sessionEditModal = document.getElementById('session-edit-modal');
const sessionEditTitle = document.getElementById('session-edit-title');
const sessionNameInput = document.getElementById('session-name-input');
const sessionCategoriesList = document.getElementById('session-categories-list');
const sessionEditSaveBtn = document.getElementById('session-edit-save-btn');
const sessionEditCancelBtn = document.getElementById('session-edit-cancel-btn');
let activeEditSessionId = null;

const resetPanelsBtn = document.getElementById('reset-panels-btn'); // === NEW ===

// ======== STATE, LIBS & DATA ========
let isListening = false;
let mediaRecorder = null;
let dictionary = null;
let segmentit = null;
let hanziWriter = null;
let fullAudioChunks = [];
let sessionHistory = [];
let audioContext = null;
let analyser = null;
let animationFrameId = null;
let availableVoices = [];
let speechQueue = [];
let isSpeaking = false;
let userGestureMade = false;
let currentSessionId = null;
let controlsState = 'hidden'; // 'hidden', 'basic', 'full'
let autoSaveSessions = true;
let temporarySession = null;
let loopingChar = null; // To control the active animation loop
let customDbData = null; // To hold your custom database
let userMnemonics = {}; // === NEW ===
let chaiziData = null; // === NEW: Replaced radicalData
let mnemonicModalState = { char: null, sourceView: null };
const characterMetadataCache = new Map();
const activeFlashcardWriters = { front: null, back: null };
const flashcardConfig = {
    front: ['char'],
    back: ['def', 'pinyin', 'userMnemonic', 'components', 'mnemonic'],
    testModes: {
        char: true,
        pinyin: true,
        definition: true,
        writing: false
    }
};
const flashcardModeLabels = {
    char: 'Character',
    pinyin: 'Pinyin',
    definition: 'Meaning',
    writing: 'Writing',
    components: 'Components',
    equation: 'Equation',
    mnemonic: 'DB Mnemonic',
    userMnemonic: 'Your Mnemonic'
};
// Named card-layout presets (M4B). Recognition is the default; the segmented
// control in the deck sheet writes one of these into flashcardConfig, and
// "Custom" reveals the raw checkboxes. Detection is order-insensitive.
const FLASHCARD_PRESETS = {
    recognition: { front: ['char'], back: ['pinyin', 'def', 'userMnemonic', 'components', 'mnemonic'] },
    recall: { front: ['def'], back: ['char', 'pinyin'] },
    writing: { front: ['writing'], back: ['char', 'pinyin', 'def'] },
    cloze: { front: ['sentence', 'pinyin'], back: ['char', 'pinyin', 'def', 'sentence'] }
};
function fcSameSet(a, b) {
    if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return false;
    const sb = new Set(b);
    return a.every(x => sb.has(x));
}
function detectFlashcardPreset() {
    for (const [name, p] of Object.entries(FLASHCARD_PRESETS)) {
        if (fcSameSet(flashcardConfig.front, p.front) && fcSameSet(flashcardConfig.back, p.back)) return name;
    }
    return 'custom';
}
function isRecognitionConfig() { return detectFlashcardPreset() === 'recognition'; }
function syncLayoutCheckboxes() {
    document.querySelectorAll('.layout-checkbox').forEach(cb => {
        const face = cb.dataset.face;
        cb.checked = (flashcardConfig[face] || []).includes(cb.value);
    });
}
function applyFlashcardPreset(name) {
    const p = FLASHCARD_PRESETS[name];
    if (!p) return;
    flashcardConfig.front = [...p.front];
    flashcardConfig.back = [...p.back];
    saveFlashcardPreferences();
    syncLayoutCheckboxes();
    renderPresetControl();
    if (currentTestSession) showFlashcard(currentFlashcardIndex);
}
function renderPresetControl() {
    const el = document.getElementById('fc-preset-control');
    if (!el) return;
    const active = detectFlashcardPreset();
    const labels = { recognition: 'Recognition', recall: 'Recall', writing: 'Writing', cloze: 'Sentence', custom: 'Custom' };
    el.innerHTML = Object.keys(labels).map(name =>
        `<button type="button" class="fc-preset-pill${name === active ? ' active' : ''}" data-preset="${name}">${labels[name]}</button>`
    ).join('');
    el.querySelectorAll('.fc-preset-pill').forEach(btn => {
        btn.addEventListener('click', () => {
            const name = btn.dataset.preset;
            const details = document.getElementById('fc-custom-layout');
            if (name === 'custom') { if (details) details.open = true; return; }
            applyFlashcardPreset(name);
        });
    });
    const details = document.getElementById('fc-custom-layout');
    if (details) details.open = (active === 'custom');
}

const viewportQuery = window.matchMedia('(max-width: 1024px)');
let flashcardRenderToken = 0;
const panelDragState = { active: false, pointerId: null, startX: 0, target: null, initialWidth: 0, panelElement: null, handleElement: null };
let flashcardStore = { decks: [], activeDeckId: null }; // === NEW ===
let currentFlashcardIndex = 0; // === NEW ===
let currentTestSession = null; // === NEW ===
let fcAnswerLocked = false; // BUG-07: guards recordTestAnswer/skipCurrentCard against double-tap
let radicalPracticeWriter = null;
let radicalHistoryStack = [];
const chineseCharRegex = /[\u4e00-\u9fff]/;
const punctuationRegex = /[，。？！、；：“”‘’（）《》〈〉【】〖〗]/;
const numberRegex = /^\d+$/; // === NEW ===

// === NEW: Categories Definition ===
const CATEGORIES = {
    class: { color: 'var(--category-class)', label: 'Class' }, // Orange
    hw: { color: 'var(--category-hw)', label: 'Homework' }, // Blue
    discussion: { color: 'var(--category-discussion)', label: 'Discussion' }, // Green
    practice: { color: 'var(--category-practice)', label: 'Practice' }, // Purple
    life: { color: 'var(--category-life)', label: 'Life' } // Teal
};

function loadUserPreferences() {
    try {
        const storedAutoSave = localStorage.getItem('autoSaveSessions');
        if (storedAutoSave !== null) {
            autoSaveSessions = JSON.parse(storedAutoSave);
        }
    } catch (error) {
        console.warn('Failed to load auto save preference.', error);
        autoSaveSessions = true;
    }
    if (saveSessionToggle) {
        saveSessionToggle.checked = autoSaveSessions;
    }

    try {
        const storedFlashcardPrefs = localStorage.getItem('flashcardPreferences');
        if (storedFlashcardPrefs) {
            const parsed = JSON.parse(storedFlashcardPrefs);
            if (Array.isArray(parsed.front) && parsed.front.length > 0) flashcardConfig.front = parsed.front;
            if (Array.isArray(parsed.back) && parsed.back.length > 0) flashcardConfig.back = parsed.back;
            if (parsed.testModes && typeof parsed.testModes === 'object') {
                flashcardConfig.testModes = {
                    ...flashcardConfig.testModes,
                    ...parsed.testModes
                };
            }
        }
    } catch (error) {
        console.warn('Failed to load flashcard preferences.', error);
    }

    flashcardLayoutCheckboxes.forEach(cb => {
        const face = cb.dataset.face; // 'front' or 'back'
        const value = cb.value;
        if (face && value && Array.isArray(flashcardConfig[face])) {
            cb.checked = flashcardConfig[face].includes(value);
        }
    });

    flashcardTestModeCheckboxes.forEach(cb => {
        const mode = cb.dataset.mode;
        if (mode) {
            cb.checked = !!flashcardConfig.testModes[mode];
        }
    });

    
    document.body.classList.toggle('auto-save-disabled', !autoSaveSessions);
    updateAutoSaveIndicator(document.body.classList.contains('has-temporary-session'));
}

// Wire up the "Hide Play Buttons" / "Hide Punctuation" display toggles.
// These drive body classes (styled in index.html) and persist to localStorage.
function setupDisplayPreferences() {
    const prefs = [
        { id: 'hide-play-buttons-toggle', cls: 'hide-play-buttons', key: 'hidePlayButtons' },
        { id: 'hide-punctuation-toggle', cls: 'hide-punctuation', key: 'hidePunctuation' }
    ];
    prefs.forEach(({ id, cls, key }) => {
        const el = document.getElementById(id);
        if (!el) return;
        let saved = false;
        try { saved = localStorage.getItem(key) === 'true'; } catch (_) { /* ignore */ }
        el.checked = saved;
        document.body.classList.toggle(cls, saved);
        el.addEventListener('change', () => {
            document.body.classList.toggle(cls, el.checked);
            try { localStorage.setItem(key, String(el.checked)); } catch (_) { /* ignore */ }
        });
    });
}

function loadUserMnemonics() {
    try {
        const saved = localStorage.getItem('userMnemonics');
        if (saved) userMnemonics = JSON.parse(saved);
    } catch (error) {
        console.warn('Could not load user mnemonics.', error);
        userMnemonics = {};
    }
}

function persistAutoSavePreference() {
    try {
        localStorage.setItem('autoSaveSessions', JSON.stringify(autoSaveSessions));
    } catch (error) {
        console.warn('Failed to persist auto save preference.', error);
    }
}

function saveUserMnemonics() {
    try {
        localStorage.setItem('userMnemonics', JSON.stringify(userMnemonics));
    } catch (error) {
        console.warn('Failed to save user mnemonics.', error);
    }
}

function saveFlashcardPreferences() {
    try {
        localStorage.setItem('flashcardPreferences', JSON.stringify({
            front: Array.isArray(flashcardConfig.front) ? flashcardConfig.front : [flashcardConfig.front],
            back: Array.isArray(flashcardConfig.back) ? flashcardConfig.back : [flashcardConfig.back],
            testModes: flashcardConfig.testModes
        }));
    } catch (error) {
        console.warn('Failed to save flashcard preferences.', error);
    }
}

function updateAutoSaveIndicator(isTemporarySession = false) {
    if (!autoSaveStatus) return;
    if (!autoSaveSessions) {
        autoSaveStatus.textContent = 'Not saving';
        autoSaveStatus.setAttribute('aria-label', 'Auto save disabled');
    } else if (isTemporarySession) {
        autoSaveStatus.textContent = 'Unsaved';
        autoSaveStatus.setAttribute('aria-label', 'Current session is not saved');
    } else {
        autoSaveStatus.textContent = '';
        autoSaveStatus.removeAttribute('aria-label');
    }
}

// Safari / iOS don't support audio/webm for MediaRecorder — pick a supported
// type (mp4 there) so recording doesn't throw. Returns '' to let the browser default.
function supportedAudioMime() {
    if (typeof MediaRecorder === 'undefined' || !MediaRecorder.isTypeSupported) return '';
    if (MediaRecorder.isTypeSupported('audio/webm')) return 'audio/webm';
    if (MediaRecorder.isTypeSupported('audio/mp4')) return 'audio/mp4';
    return '';
}
function makeRecorder(stream) {
    const mime = supportedAudioMime();
    return new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
}
function audioFilename(type, base) {
    const t = type || '';
    const ext = (t.includes('mp4') || t.includes('mpeg') || t.includes('m4a')) ? 'm4a' : (t.includes('wav') ? 'wav' : 'webm');
    return `${base}.${ext}`;
}

// Encode an AudioBuffer to a 16-bit PCM mono WAV (ACRCloud reliably decodes WAV,
// unlike browser webm/opus).
function audioBufferToWav(buffer) {
    const sampleRate = buffer.sampleRate;
    let data = buffer.getChannelData(0);
    if (buffer.numberOfChannels > 1) {
        const ch1 = buffer.getChannelData(1);
        const mixed = new Float32Array(data.length);
        for (let i = 0; i < data.length; i++) mixed[i] = (data[i] + ch1[i]) / 2;
        data = mixed;
    }
    const total = 44 + data.length * 2;
    const ab = new ArrayBuffer(total);
    const view = new DataView(ab);
    const writeStr = (o, s) => { for (let i = 0; i < s.length; i++) view.setUint8(o + i, s.charCodeAt(i)); };
    writeStr(0, 'RIFF'); view.setUint32(4, total - 8, true); writeStr(8, 'WAVE');
    writeStr(12, 'fmt '); view.setUint32(16, 16, true); view.setUint16(20, 1, true); view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true); view.setUint32(28, sampleRate * 2, true); view.setUint16(32, 2, true); view.setUint16(34, 16, true);
    writeStr(36, 'data'); view.setUint32(40, data.length * 2, true);
    let off = 44;
    for (let i = 0; i < data.length; i++) {
        const s = Math.max(-1, Math.min(1, data[i]));
        view.setInt16(off, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
        off += 2;
    }
    return ab;
}

async function blobToWav(blob) {
    const arrayBuf = await blob.arrayBuffer();
    const AC = window.AudioContext || window.webkitAudioContext;
    const ctx = new AC();
    try {
        const audioBuf = await ctx.decodeAudioData(arrayBuf);
        return new Blob([audioBufferToWav(audioBuf)], { type: 'audio/wav' });
    } finally {
        ctx.close();
    }
}

function getCharDomId(char, prefix = 'char') {
    if (!char) return `${prefix}-unknown`;
    const codes = Array.from(char).map(ch => ch.codePointAt(0));
    return `${prefix}-${codes.join('-')}`;
}

// Escape untrusted text (AI output, translations, user mnemonics, definitions)
// before it is interpolated into innerHTML. Prevents both broken layout from a
// stray "<" and script injection.
function escapeHtml(value) {
    if (value === null || value === undefined) return '';
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// ======== INITIALIZATION ========
loadDictionaryAndLibs();

// dictionary.json stores one context-free gloss per character, and for several
// common polyphonic characters that gloss is the meaning of the LESS common
// reading (a CEDICT first-sense artifact — e.g. 喝 stored as "to shout"/hè
// instead of "to drink"/hē). We can't do reading-aware selection without richer
// data, so lead each of these with the dominant reading's meaning (most-common
// first, since compact views show only the first sense).
const DICTIONARY_CORRECTIONS = {
    '喝': 'to drink; to shout',                 // hē ≫ hè
    '和': 'and; with; harmonious; peace',       // hé
    '长': 'long; to grow; chief; elder',        // cháng / zhǎng
    '重': 'heavy; serious; to repeat; again',   // zhòng / chóng
    '乐': 'happy; joyful; music',               // lè / yuè
    '还': 'still; yet; also; to return',        // hái / huán
    '得': 'to obtain; to get; (structural particle)', // dé / de
    '教': 'to teach; teaching; religion',       // jiāo / jiào
};
function applyDictionaryCorrections(dict) {
    if (!dict) return;
    for (const [ch, gloss] of Object.entries(DICTIONARY_CORRECTIONS)) {
        if (ch in dict) dict[ch] = gloss;
    }
}

async function loadDictionaryAndLibs() {
    try {
        // === OPTIMIZATION: Fetch all initial data in parallel ===
        const [dictResult, customDbResult] = await Promise.allSettled([
            fetch('./dictionary.json'),
            fetch('./custom-db.json')
        ]);

        if (dictResult.status === 'fulfilled' && dictResult.value.ok) {
            dictionary = await dictResult.value.json();
            applyDictionaryCorrections(dictionary);
            console.log('✅ Dictionary loaded.');
        } else {
            console.error('❌ Failed to load dictionary.json.');
        }

        if (customDbResult.status === 'fulfilled' && customDbResult.value.ok) {
            customDbData = await customDbResult.value.json();
            console.log('✅ Your custom mnemonics database loaded.');
        } else {
            console.warn('⚠️ Could not load custom-db.json. The app will use other data sources.');
        }

        // Character decomposition now comes from the server's /character-data
        // endpoint (backed by Make Me a Hanzi), so no separate client fetch.
        // ==========================================================
        segmentit = Segmentit.useDefault(new Segmentit.Segment());
        console.log('✅ Dictionary and Segmenter loaded.');
        loadHistory(); // This now also loads global stats
        loadFlashcards(); // === NEW ===
        populateVoiceList();
        voiceSelector.addEventListener('change', () => { try { localStorage.setItem('preferredVoice', voiceSelector.value); } catch (_) { /* ignore */ } });
        if (speedSlider) {
            try { const s = localStorage.getItem('preferredSpeed'); if (s) speedSlider.value = s; } catch (_) { /* ignore */ }
            speedSlider.addEventListener('input', () => {
                if (ttsAudioEl) ttsAudioEl.playbackRate = currentTtsRate(); // live speed change
                try { localStorage.setItem('preferredSpeed', speedSlider.value); } catch (_) { /* ignore */ }
            });
        }
        loadUserMnemonics(); // === NEW ===
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = populateVoiceList;
        }
        renderCategoryFilters(); // === NEW ===
        setupDarkMode();
        loadUserPreferences();
        loadPanelWidths(); // === NEW ===
        initializeToggles(); // === NEW ===
        setupDisplayPreferences(); // Wire up Hide Play Buttons / Hide Punctuation

        // === NEW: Character Info Edit Modal Listeners ===
        // This ensures the buttons on the edit pop-up are functional.
        if (charInfoModal) {
            charInfoCancelBtn.addEventListener('click', () => charInfoModal.classList.remove('active'));
            charInfoModal.addEventListener('click', (e) => {
                if (e.target === charInfoModal) charInfoModal.classList.remove('active');
            });
            charInfoSaveBtn.addEventListener('click', saveCharInfoFromModal);
            charInfoSaveBackBtn.addEventListener('click', saveAndGoBackToHanziModal);
        }
    } catch (error) { console.error('❌ Could not load libraries:', error); }
}

// ======== EVENT LISTENERS ========
document.body.addEventListener('click', () => {
    if (userGestureMade) return;
    userGestureMade = true;
    // Unlock both audio paths within the first user gesture (iOS requires it).
    if ('speechSynthesis' in window) window.speechSynthesis.speak(new SpeechSynthesisUtterance(''));
    try { const a = getTtsAudio(); a.muted = true; a.play().catch(() => {}); a.pause(); a.muted = false; } catch (_) { /* ignore */ }
}, { once: true });

if (panelOverlay) {
    panelOverlay.addEventListener('click', () => {
        toggleHistoryPanel(false);
        toggleRightPanel(false);
    });
}


handleViewportChange(viewportQuery);
viewportQuery.addEventListener('change', handleViewportChange);

micFab.addEventListener('click', () => {
    isListening = !isListening;
    if (isListening) {
        startListening();
        micFab.classList.add('recording');
    } else {
        stopListening();
        micFab.classList.remove('recording');
    }
});

const stopFab = document.getElementById('stop-fab');
stopFab.addEventListener('click', stopAllAudio);

if (textInput) {
    textInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            let text = textInput.value.trim();
            if (!text) return;
            if (!dictionary || !segmentit) return;
            text = text.replace(/\n/g, '。');
            processingOverlay.classList.add('visible');
            statsContent.innerHTML = "";
            processTranscription(text);
            textInput.value = "";
        }
    });
}

controlsToggleBtn.addEventListener('click', () => {
    // NEW LOGIC: Just toggle the text input wrapper
    const isHidden = topControlsWrapper.classList.toggle('hidden');
    controlsToggleBtn.classList.toggle('active', !isHidden);
});

document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    // Close the topmost open transient surface (one per press), most-nested first,
    // and only fall back to the side panels if nothing overlay-like is open.
    const aaPop = document.getElementById('reader-aa-popover');
    if (ttsControls && ttsControls.style.display === 'grid') { ttsControls.style.display = 'none'; return; }
    if (aaPop && aaPop.style.display === 'grid') { aaPop.style.display = 'none'; return; }
    if (modal && modal.classList.contains('active')) { closeHanziModal(); return; }
    if (charInfoModal && charInfoModal.classList.contains('active')) { charInfoModal.classList.remove('active'); return; }
    if (gamesModalEl && gamesModalEl.classList.contains('active')) { gameTopClose(); return; }
    if (karaokeOverlayEl && karaokeOverlayEl.classList.contains('active')) { closeKaraoke(); return; }
    if (subsOverlayEl && subsOverlayEl.classList.contains('active')) { closeSubs(); return; }
    const readerOverlay = document.getElementById('reader-overlay');
    if (readerOverlay && readerOverlay.classList.contains('active')) {
        const rc = document.getElementById('reader-close');
        if (rc) { rc.click(); return; } // reuse the reader's own teardown
    }
    toggleHistoryPanel(false);
    toggleRightPanel(false);
});

function stopAllAudio() {
    speechQueue = [];
    window.speechSynthesis.cancel();
    ttsCurrentToken++; // invalidate any in-flight natural-voice playback
    if (ttsAudioEl) { try { ttsAudioEl.pause(); } catch (_) { /* ignore */ } }
    isSpeaking = false;
    document.querySelectorAll('.highlight').forEach(el => el.classList.remove('highlight'));
    playAllFab.classList.remove('playing');
    if (soundStopFab) soundStopFab.classList.remove('playing');
    if (!mediaRecorder || mediaRecorder.state !== 'recording') {
        if (stopFab) stopFab.style.display = 'none';
        if (micFab) micFab.style.display = 'flex';
    }
}

function handleViewportChange(e) {
    const isMobile = e.matches;
    document.body.classList.toggle('mobile-layout', isMobile);
    if (!isMobile) {
    }
}

modal.addEventListener('click', closeHanziModal);
modalContent.addEventListener('click', (e) => e.stopPropagation());
modalCloseBtn.addEventListener('click', closeHanziModal);

summaryFab.addEventListener('click', () => {
    statsOutput.classList.add('collapsed');
    globalStatsOutput.classList.add('collapsed');
    topControlsWrapper.classList.add('hidden');
    controlsToggleBtn.classList.remove('active');

    const summaryEl = finalOutput.querySelector('.char-list-summary') || finalOutput.querySelector('.full-paragraph-output');
    if (summaryEl) {
        summaryEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
});

// === Settings popover (⚙️) ===
// Consolidates the voice selector, speed slider, mic toggle and auto-save
// toggle — previously scattered across the always-visible header — behind
// one gear button. The controls themselves keep their original ids/listeners;
// this only relocates them into a floating popover anchored to the button.
function initSettingsPopover() {
    if (!ttsControls || !voiceSettingsToggle) return;
    voiceSettingsToggle.innerHTML = '⚙️';
    voiceSettingsToggle.setAttribute('aria-label', 'Settings');
    voiceSettingsToggle.title = 'Settings';

    ttsControls.classList.add('settings-popover');
    document.body.appendChild(ttsControls); // escape header/card overflow clipping

    // Fold the mic (voice input) and auto-save toggles into the same popover
    // instead of leaving them as separate always-visible header icons.
    if (micFab) {
        const row = document.createElement('div');
        row.className = 'tts-group settings-popover-row';
        const lbl = document.createElement('label');
        lbl.textContent = 'Voice input:';
        row.appendChild(lbl);
        row.appendChild(micFab);
        ttsControls.appendChild(row);
    }
    if (saveSessionToggle) {
        const row = document.createElement('div');
        row.className = 'tts-group settings-popover-row';
        const lbl = document.createElement('label');
        lbl.setAttribute('for', 'save-session-toggle');
        lbl.textContent = 'Auto-save sessions:';
        row.appendChild(lbl);
        const wrap = document.createElement('span');
        wrap.className = 'settings-popover-autosave';
        // Move the whole toggle-switch label (not just the bare <input>) — the
        // switch's visual knob is a sibling <span class="toggle-slider"> that
        // only lights up via a same-parent CSS selector.
        const toggleWrapper = saveSessionToggle.closest('label.toggle-switch') || saveSessionToggle;
        wrap.appendChild(toggleWrapper);
        if (autoSaveStatus) wrap.appendChild(autoSaveStatus);
        row.appendChild(wrap);
        ttsControls.appendChild(row);
    }

    const positionPopover = () => {
        const r = voiceSettingsToggle.getBoundingClientRect();
        const margin = 8;
        const width = Math.min(320, window.innerWidth - margin * 2);
        ttsControls.style.width = width + 'px';
        let left = r.right - width;
        left = Math.max(margin, Math.min(left, window.innerWidth - width - margin));
        ttsControls.style.top = Math.min(r.bottom + margin, window.innerHeight - 40) + 'px';
        ttsControls.style.left = left + 'px';
    };

    voiceSettingsToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const opening = ttsControls.style.display !== 'grid';
        ttsControls.style.display = opening ? 'grid' : 'none';
        if (opening) positionPopover();
    });
    window.addEventListener('resize', () => { if (ttsControls.style.display === 'grid') positionPopover(); });
    document.addEventListener('click', (e) => {
        if (ttsControls.style.display !== 'grid') return;
        if (ttsControls.contains(e.target) || voiceSettingsToggle.contains(e.target)) return;
        ttsControls.style.display = 'none';
    });
    ttsControls.addEventListener('click', (e) => e.stopPropagation());
    // Whatever's left of the old header icon groups (now missing mic/auto-save)
    // — drop any that ended up empty instead of leaving a bare pill behind.
    document.querySelectorAll('.top-right-group').forEach(g => { if (!g.children.length) g.remove(); });
}
initSettingsPopover();

if (saveSessionToggle) {
    saveSessionToggle.addEventListener('change', () => {
        autoSaveSessions = saveSessionToggle.checked;
        persistAutoSavePreference();
        document.body.classList.toggle('auto-save-disabled', !autoSaveSessions);
        updateAutoSaveIndicator(document.body.classList.contains('has-temporary-session'));
    });
}

// === NEW: Flashcard Listeners ===
flashcardBtn.addEventListener('click', showFlashcardModal);
const flashcardsLauncherBtn = document.getElementById('flashcards-launcher-btn');
if (flashcardsLauncherBtn) flashcardsLauncherBtn.addEventListener('click', showFlashcardModal);
// Deck sheet (M4) wiring
document.getElementById('fc-deck-scrim')?.addEventListener('click', closeDeckSheet);
document.getElementById('fc-sheet-close')?.addEventListener('click', closeDeckSheet);
document.getElementById('fc-sheet-rename')?.addEventListener('click', renameActiveDeck);
document.getElementById('fc-sheet-study')?.addEventListener('click', () => { const id = flashcardStore.activeDeckId; closeDeckSheet(); fcStartSmartSession(id); });
document.getElementById('fc-sheet-preview')?.addEventListener('click', () => { closeDeckSheet(); startFlashcardSession('study'); });
document.getElementById('fc-sheet-practice')?.addEventListener('click', () => { closeDeckSheet(); startFlashcardSession('test', {}); });
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.getElementById('fc-deck-sheet')?.classList.contains('open')) { e.preventDefault(); closeDeckSheet(); }
});
flashcardGameBtn.addEventListener('click', openGamesHub);
selectAllCharsBtn.addEventListener('click', selectAllCharacters);
flashcardCloseBtn.addEventListener('click', () => {
    flashcardModal.style.display = 'none';
    showDeckManager();
});
createDeckBtn.addEventListener('click', createNewDeck);
addToDeckBtn.addEventListener('click', addSelectedCharsToDeck);
deckSelector.addEventListener('change', () => selectDeck(deckSelector.value));
deckList.addEventListener('click', (event) => {
    const item = event.target.closest('.deck-item');
    if (item) selectDeck(item.dataset.id);
});
deckCardTable.addEventListener('click', handleDeckTableClick);
deleteDeckBtn.addEventListener('click', deleteActiveDeck);
startStudyBtn.addEventListener('click', () => startFlashcardSession('study'));
startTestBtn.addEventListener('click', () => startFlashcardSession('test'));
reviewDueBtn.addEventListener('click', reviewDueCards);
resetStatsBtn.addEventListener('click', resetDeckProgress);

flashcardLayoutCheckboxes.forEach(cb => {
    cb.addEventListener('change', () => {
        const face = cb.dataset.face;
        const selected = Array.from(document.querySelectorAll(`#flashcard-${face}-options input:checked`)).map(i => i.value);
        if (selected.length > 0) {
            flashcardConfig[face] = selected;
            saveFlashcardPreferences();
            renderPresetControl(); // reflect the change (likely -> Custom) in the pills
            if (currentTestSession) showFlashcard(currentFlashcardIndex);
        } else {
            cb.checked = true; // Prevent unchecking the last item
        }
    });
});

flashcardTestModeCheckboxes.forEach(cb => {
    cb.addEventListener('change', () => {
        const mode = cb.dataset.mode;
        if (!mode) return;
        flashcardConfig.testModes[mode] = cb.checked;
        if (!Object.values(flashcardConfig.testModes).some(Boolean)) {
            flashcardConfig.testModes[mode] = true;
            cb.checked = true;
            return;
        }
        saveFlashcardPreferences();
    });
});

backToDecksBtn.addEventListener('click', showDeckManager);
// Reusable flip (respects the say-first gate) + review-mode helpers shared by the
// click, keyboard and swipe inputs (M3 part C).
let fcSuppressClick = false;
function fcFlip() {
    if (sayFirstFlipLocked()) { pulseSayFirstBar(); return; }
    flashcardEl.classList.toggle('flipped');
}
function fcReviewActive() {
    return flashcardModal && flashcardModal.style.display !== 'none'
        && flashcardMain && flashcardMain.classList.contains('view-mode')
        && !!currentTestSession;
}
function fcIsFlipped() { return flashcardEl && flashcardEl.classList.contains('flipped'); }
function fcSummaryOpen() { const s = document.getElementById('fc-summary'); return s && getComputedStyle(s).display !== 'none'; }
function fcConfirmExit() {
    if (currentTestSession && currentTestSession.mode === 'test' && currentTestSession.answered < currentTestSession.total
        && !confirm('End this session? Progress on graded cards is already saved.')) return;
    showDeckManager();
}
flashcardEl.addEventListener('click', (event) => {
    if (event.target.closest('.flashcard-writer, .fc-audio-btn')) return;
    if (fcSuppressClick) { fcSuppressClick = false; return; } // a swipe just happened
    fcFlip();
});
flashcardNextBtn.addEventListener('click', () => showFlashcard(currentFlashcardIndex + 1));
flashcardFlipBtn.addEventListener('click', fcFlip);
flashcardAiBtn.addEventListener('click', () => showFlashcardAiInsight(false));
flashcardPrevBtn.addEventListener('click', () => showFlashcard(currentFlashcardIndex - 1));
testRightBtn.addEventListener('click', () => recordTestAnswer(true));
testWrongBtn.addEventListener('click', () => recordTestAnswer(false));
testSkipBtn.addEventListener('click', skipCurrentCard);
downloadCsvBtn.addEventListener('click', downloadDeckAsCsv);

// === Review keyboard shortcuts (desktop) ===
document.addEventListener('keydown', (e) => {
    if (!fcReviewActive() || fcSummaryOpen()) return;
    const t = e.target;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
    const mode = currentTestSession.mode;
    const k = e.key;
    if (k === ' ' || k === 'Spacebar' || k === 'Enter') { e.preventDefault(); fcFlip(); return; }
    if (k === 'Escape') { e.preventDefault(); fcConfirmExit(); return; }
    if (mode === 'study') {
        if (k === 'ArrowLeft') { e.preventDefault(); showFlashcard(currentFlashcardIndex - 1); }
        else if (k === 'ArrowRight') { e.preventDefault(); showFlashcard(currentFlashcardIndex + 1); }
        return;
    }
    // test mode — grades require a revealed card; an arrow on an unflipped card flips it first
    if (k === 'ArrowLeft' || k === '1') { e.preventDefault(); if (fcIsFlipped()) recordTestAnswer(false); else fcFlip(); }
    else if (k === 'ArrowRight' || k === '2') { e.preventDefault(); if (fcIsFlipped()) recordTestAnswer(true); else fcFlip(); }
    else if (k === 's' || k === 'S') { e.preventDefault(); skipCurrentCard(); }
});

// === Swipe-to-grade (mobile) === drag a revealed card right = Got it, left = Again.
(function setupFlashcardSwipe() {
    if (!flashcardEl) return;
    let dragging = false, startX = 0, startY = 0, dx = 0, moved = false, pid = null;
    function ensureBadge() {
        let b = document.getElementById('fc-swipe-badge');
        if (!b) { b = document.createElement('div'); b.id = 'fc-swipe-badge'; flashcardEl.appendChild(b); }
        return b;
    }
    flashcardEl.addEventListener('pointerdown', (e) => {
        if (!fcReviewActive() || currentTestSession.mode !== 'test' || !fcIsFlipped()) return;
        if (e.target.closest('.flashcard-writer, .fc-audio-btn, button')) return;
        dragging = true; moved = false; startX = e.clientX; startY = e.clientY; dx = 0; pid = e.pointerId;
        try { flashcardEl.setPointerCapture(pid); } catch (_) { /* ignore */ }
        flashcardEl.style.transition = 'none';
    });
    flashcardEl.addEventListener('pointermove', (e) => {
        if (!dragging) return;
        dx = e.clientX - startX;
        if (Math.abs(dx) > 8 || Math.abs(e.clientY - startY) > 8) moved = true;
        flashcardEl.style.transform = `translateX(${dx}px) rotate(${dx / 40}deg)`;
        const b = ensureBadge();
        if (dx > 40) { b.textContent = 'Got it ✓'; b.className = 'right'; b.style.opacity = '1'; }
        else if (dx < -40) { b.textContent = 'Again ↺'; b.className = 'left'; b.style.opacity = '1'; }
        else { b.style.opacity = '0'; }
    });
    function endDrag() {
        if (!dragging) return;
        dragging = false;
        try { flashcardEl.releasePointerCapture(pid); } catch (_) { /* ignore */ }
        const b = document.getElementById('fc-swipe-badge'); if (b) b.style.opacity = '0';
        flashcardEl.style.transition = '';
        flashcardEl.style.transform = '';
        if (moved) fcSuppressClick = true; // don't let the trailing click flip the card
        if (Math.abs(dx) >= 80 && !fcAnswerLocked) {
            recordTestAnswer(dx > 0); // its fc-out animation continues the motion
        }
        dx = 0;
    }
    flashcardEl.addEventListener('pointerup', endDrag);
    flashcardEl.addEventListener('pointercancel', endDrag);
})();

// === Say-it-first gate ===
// In test mode, optionally require the learner to say the card aloud before the
// answer is revealed — active production before recognition. Whisper transcribes
// the attempt and a bounded pinyin-equivalence check tells them if it matched;
// either way, making an attempt unlocks the flip (we gate on effort, not accuracy,
// so a Whisper miss never traps the learner).
let sayFirstEnabled = false;
try { sayFirstEnabled = localStorage.getItem('sayFirstGate') === '1'; } catch (_) { /* ignore */ }
let sayFirstAttempted = false;
let sayFirstRecorder = null, sayFirstStream = null, sayFirstChunks = [], sayFirstBusy = false;

function sayFirstActive() {
    return sayFirstEnabled && currentTestSession && currentTestSession.mode === 'test';
}
function sayFirstFlipLocked() {
    return sayFirstActive() && !sayFirstAttempted && flashcardEl && !flashcardEl.classList.contains('flipped');
}
function updateSayFirstToggleLabel() {
    if (!sayFirstToggle) return;
    sayFirstToggle.textContent = `🎤 Say-it-first: ${sayFirstEnabled ? 'On' : 'Off'}`;
    sayFirstToggle.classList.toggle('active', sayFirstEnabled);
}
if (sayFirstToggle) {
    updateSayFirstToggleLabel();
    sayFirstToggle.addEventListener('click', () => {
        sayFirstEnabled = !sayFirstEnabled;
        try { localStorage.setItem('sayFirstGate', sayFirstEnabled ? '1' : '0'); } catch (_) { /* ignore */ }
        updateSayFirstToggleLabel();
        updateSayFirstGate(currentTestSession ? currentTestSession.cards[currentFlashcardIndex] : null);
    });
}
if (sayFirstMic) sayFirstMic.addEventListener('click', toggleSayFirstRecording);

// Show/reset the gate for the current card. Called on each card render and when
// the toggle flips.
function updateSayFirstGate(card) {
    const inTest = !!(currentTestSession && currentTestSession.mode === 'test');
    if (sayFirstToggle) sayFirstToggle.style.display = inTest ? 'inline-flex' : 'none';
    if (!sayFirstBar) return;
    if (!sayFirstActive() || !card) { sayFirstBar.style.display = 'none'; return; }
    sayFirstAttempted = false;
    sayFirstBar.style.display = 'flex';
    sayFirstBar.classList.remove('unlocked');
    if (sayFirstMic) { sayFirstMic.classList.remove('recording'); sayFirstMic.textContent = '🎤 Say it, then flip'; sayFirstMic.disabled = false; }
    if (sayFirstStatus) sayFirstStatus.textContent = '';
}

function pulseSayFirstBar() {
    if (!sayFirstBar) return;
    sayFirstBar.classList.remove('pulse');
    void sayFirstBar.offsetWidth; // restart the animation
    sayFirstBar.classList.add('pulse');
    if (sayFirstStatus && !sayFirstStatus.textContent) sayFirstStatus.textContent = 'Say it aloud first ↑';
}

async function toggleSayFirstRecording() {
    if (sayFirstBusy) return;
    if (sayFirstRecorder && sayFirstRecorder.state === 'recording') { sayFirstRecorder.stop(); return; }
    try {
        sayFirstStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (e) {
        if (sayFirstStatus) sayFirstStatus.textContent = 'Mic denied — flipping anyway.';
        sayFirstAttempted = true; // don't trap the learner
        return;
    }
    sayFirstChunks = [];
    try {
        sayFirstRecorder = makeRecorder(sayFirstStream);
    } catch (e) {
        sayFirstStream.getTracks().forEach(t => t.stop()); sayFirstStream = null;
        if (sayFirstStatus) sayFirstStatus.textContent = "Recording unsupported — flip freely.";
        sayFirstAttempted = true;
        return;
    }
    sayFirstRecorder.ondataavailable = e => { if (e.data.size) sayFirstChunks.push(e.data); };
    sayFirstRecorder.onstop = evaluateSayFirst;
    sayFirstRecorder.start();
    if (sayFirstMic) { sayFirstMic.classList.add('recording'); sayFirstMic.textContent = '⏹ Stop'; }
    if (sayFirstStatus) sayFirstStatus.textContent = 'Listening…';
}

async function evaluateSayFirst() {
    if (sayFirstStream) { sayFirstStream.getTracks().forEach(t => t.stop()); sayFirstStream = null; }
    if (sayFirstMic) { sayFirstMic.classList.remove('recording'); sayFirstMic.textContent = '🎤 Say it, then flip'; }
    const card = currentTestSession && currentTestSession.cards[currentFlashcardIndex];
    if (!card || sayFirstChunks.length === 0) { sayFirstAttempted = true; revealAfterSayFirst(); return; }
    sayFirstBusy = true;
    if (sayFirstMic) sayFirstMic.disabled = true;
    if (sayFirstStatus) sayFirstStatus.textContent = 'Checking…';
    try {
        const blob = new Blob(sayFirstChunks, { type: (sayFirstChunks[0] && sayFirstChunks[0].type) || 'audio/webm' });
        const result = await sendBlobToWhisper(blob, card.char);
        const { correct, heard } = comparePronunciation(card, result.text || '');
        if (sayFirstStatus) sayFirstStatus.innerHTML = correct
            ? `<span style="color:var(--success-color);font-weight:700;">✅ Heard: ${escapeHtml(heard)}</span>`
            : `Heard: ${escapeHtml(heard)}`;
    } catch (e) {
        if (sayFirstStatus) sayFirstStatus.textContent = 'Could not check — revealing.';
    } finally {
        sayFirstBusy = false;
        if (sayFirstMic) sayFirstMic.disabled = false;
        sayFirstAttempted = true;
        revealAfterSayFirst();
    }
}

// After an attempt, unlock and flip to the answer.
function revealAfterSayFirst() {
    if (sayFirstBar) sayFirstBar.classList.add('unlocked');
    if (flashcardEl && !flashcardEl.classList.contains('flipped')) flashcardEl.classList.add('flipped');
}

// Wire up the "Your Mnemonic" modal (Save / Cancel / backdrop) — was inert.
if (mnemonicModal) {
    mnemonicSaveBtn.addEventListener('click', saveUserMnemonicFromModal);
    mnemonicCancelBtn.addEventListener('click', () => { mnemonicModal.style.display = 'none'; });
    mnemonicModal.addEventListener('click', (e) => { if (e.target === mnemonicModal) mnemonicModal.style.display = 'none'; });
}


function toggleHistoryPanel(forceOpen) {
    if (!historyPanel) return;
    const targetState = typeof forceOpen === 'boolean' ? forceOpen : historyPanel.classList.contains('collapsed');
    historyPanel.classList.toggle('collapsed', !targetState);
    document.body.classList.toggle('left-panel-open', targetState);
    if (targetState && viewportQuery.matches) toggleRightPanel(false);
}

function toggleRightPanel(forceOpen) {
    if (!rightPanel) return;
    const targetState = typeof forceOpen === 'boolean' ? forceOpen : rightPanel.classList.contains('collapsed');
    document.body.classList.toggle('right-panel-open', targetState);
    if (targetState && viewportQuery.matches) {
        toggleHistoryPanel(false);
    }
    rightPanel.classList.toggle('collapsed', !targetState);
}

function setupPanelDrag(handle, target) {
    const panelElement = target === 'history' ? historyPanel : rightPanel;
    if (!handle || !panelElement) return;
    const onPointerDown = (event) => {
        // === NEW: Add toggle functionality on simple click ===
        // We'll check on pointerup if it was a drag or a click.
        // For now, just record the start time.
        panelDragState.startTime = Date.now();
        panelDragState.moved = false; // Flag to track movement
        // =======================================================

        // Prevent click from propagating if panel is open, to avoid unintended behavior
        if (!panelElement.classList.contains('collapsed')) {
            event.preventDefault();
            event.stopPropagation();
        }

        panelDragState.active = true;
        panelDragState.pointerId = event.pointerId;
        panelDragState.startX = event.clientX;
        panelDragState.target = target;
        panelDragState.panelElement = panelElement;
        panelDragState.handleElement = handle;
        panelDragState.initialWidth = panelElement.offsetWidth;

        try { handle.setPointerCapture(event.pointerId); } catch (_) { /* ignore */ }

    };

    handle.addEventListener('pointerdown', onPointerDown);

    // Use document for move and up events to capture outside the handle
    document.addEventListener('pointermove', (event) => {
        if (!panelDragState.active || panelDragState.pointerId !== event.pointerId) return;

        // Add resizing styles only when moving
        if (!document.body.classList.contains('resizing')) {
            document.body.classList.add('resizing');
            panelDragState.handleElement.classList.add('resizing');
            panelDragState.moved = true; // It's a drag, not a click
        }

        const deltaX = event.clientX - panelDragState.startX;
        let newWidth;

        if (panelDragState.target === 'history') {
            newWidth = panelDragState.initialWidth + deltaX;
        } else { // 'right' panel
            newWidth = panelDragState.initialWidth - deltaX;
        }

        // Add constraints
        const minWidth = 240;
        const maxWidth = 600;
        newWidth = Math.max(minWidth, Math.min(newWidth, maxWidth));

        const variableName = target === 'history' ? '--left-panel-width' : '--right-panel-width';
        document.documentElement.style.setProperty(variableName, `${newWidth}px`);
        panelDragState.panelElement.style.width = `${newWidth}px`; 
        // No transition during drag for responsiveness
        panelDragState.panelElement.style.transition = 'none';
    });

    ['pointerup', 'pointercancel'].forEach(evtName => {
        document.addEventListener(evtName, (event) => {
            if (panelDragState.pointerId !== event.pointerId) return;

            // === NEW: Check if it was a click or a drag ===
            const wasClick = !panelDragState.moved && (Date.now() - panelDragState.startTime < 200);
            if (wasClick) {
                if (panelDragState.target === 'history') {
                    toggleHistoryPanel();
                } else if (panelDragState.target === 'right') {
                    toggleRightPanel();
                }
            }
            // ===============================================
            finalizePanelDrag();
        });
    });
}

function finalizePanelDrag() {
    if (!panelDragState.active) return;

    // === NEW: Save width to localStorage ===
    if (panelDragState.panelElement) {
        const finalWidth = panelDragState.panelElement.offsetWidth + 'px';
        const storageKey = panelDragState.target === 'history' ? 'leftPanelWidth' : 'rightPanelWidth';
        localStorage.setItem(storageKey, finalWidth);
    }

    if (panelDragState.panelElement) {
        // Restore transitions and remove direct width style
        panelDragState.panelElement.style.transition = '';
        panelDragState.panelElement.style.width = ''; // Let the CSS variable take over
    }
    if (panelDragState.handleElement) {
        panelDragState.handleElement.classList.remove('resizing');
    }

    panelDragState.active = false;
    panelDragState.pointerId = null;
    panelDragState.target = null;
    panelDragState.panelElement = null;
    panelDragState.handleElement = null;

    document.body.classList.remove('resizing');
}

function initializeToggles() {
    const mainHeader = document.querySelector('.main-header');
    if (!mainHeader) return;

    mainHeader.innerHTML = ''; // Clear previous content

    // --- Left Group ---
    const leftGroup = document.createElement('div');
    leftGroup.className = 'header-group left';

    // Add the text input toggle button to the left group.
    if (controlsToggleBtn) leftGroup.appendChild(controlsToggleBtn);

    // Move existing top-right controls (like dark mode) into the left group
    const topRights = document.querySelector('.top-right-controls');
    if (topRights) {
        // Convert .top-right-btn to .header-icon-btn for consistency
        topRights.querySelectorAll('.top-right-btn').forEach(btn => {
            btn.classList.remove('top-right-btn');
            btn.classList.add('header-icon-btn');
        });
        // Move all children of top-right-controls into the new leftGroup
        while (topRights.firstChild) {
            leftGroup.appendChild(topRights.firstChild);
        }
        topRights.style.display = 'none'; // Hide the old container
    }

    const mobileHistoryBtn = document.createElement('button');
    mobileHistoryBtn.id = 'mobile-history-toggle';
    mobileHistoryBtn.className = 'header-icon-btn';
    mobileHistoryBtn.innerHTML = historyIcon;
    mobileHistoryBtn.ariaLabel = 'Toggle History Panel';
    mobileHistoryBtn.addEventListener('click', () => toggleHistoryPanel());
    leftGroup.appendChild(mobileHistoryBtn);
    mainHeader.appendChild(leftGroup);

    // --- Center Group ---
    const centerGroup = document.createElement('div');
    centerGroup.className = 'header-group center'; // This will now be empty, but we can leave it for future use.
    mainHeader.appendChild(centerGroup);

    // --- Right Group ---
    const rightGroup = document.createElement('div');
    rightGroup.className = 'header-group right';

    const mobileToolsBtn = document.createElement('button');
    mobileToolsBtn.id = 'mobile-tools-toggle';
    mobileToolsBtn.className = 'header-icon-btn';
    mobileToolsBtn.innerHTML = toolsIcon;
    mobileToolsBtn.ariaLabel = 'Toggle Tools Panel';
    mobileToolsBtn.addEventListener('click', () => toggleRightPanel());
    // Add the tools button to the right group
    rightGroup.appendChild(mobileToolsBtn);
    mainHeader.appendChild(rightGroup);

    mainHeader.style.display = 'flex'; // Make the header visible

    // Setup desktop drag handles
    setupPanelDrag(historyDragHandle, 'history');
    setupPanelDrag(rightPanelDragHandle, 'right');
}

// === NEW: Radicals Listeners ===
radicalsBtn.addEventListener('click', showRadicalsPanel);
radicalsCharList.addEventListener('click', (e) => {
    // Use .closest() to ensure the click is handled even on child elements
    if (e.target.closest('.char-selector-btn')) {
        radicalHistoryStack = [];
    }
});
document.getElementById('radicals-title').addEventListener('click', () => {
    radicalsPanel.classList.toggle('collapsed');
});

// === NEW: Collapse Listeners for Right Panel ===
statsTitle.addEventListener('click', () => {
    const isOpening = statsOutput.classList.contains('collapsed');
    statsOutput.classList.toggle('collapsed', !isOpening);
    globalStatsOutput.classList.add('collapsed');
});
globalStatsTitle.addEventListener('click', () => {
    const isCollapsed = globalStatsOutput.classList.contains('collapsed');
    // Toggle current
    globalStatsOutput.classList.toggle('collapsed', !isCollapsed);
    // Ensure stats are calculated if opening
    if (isCollapsed) { 
        updateGlobalStatsDisplay(); 
        if (statsOutput) statsOutput.classList.add('collapsed'); // Close session stats to save space
    }
});

playAllFab.addEventListener('click', playAllCharacters);
playCharListFab.addEventListener('click', playCharList); // === NEW ===
enhanceBtn.addEventListener('click', enhanceDefinitions);
revertBtn.addEventListener('click', revertDefinitions);
downloadFab.addEventListener('click', downloadOutput);
downloadAllBtn.addEventListener('click', downloadAllOutput);
clearHistoryBtn.addEventListener('click', () => clearHistory());
document.addEventListener('keydown', handleKeyboardNavigation);
if (historySearchInput) {
    historySearchInput.addEventListener('input', () => {
        renderHistory();
    });
}
if (resetPanelsBtn) {
    resetPanelsBtn.addEventListener('click', resetPanelWidths);
}

// === NEW: Session Edit Modal Listeners ===
if (sessionEditModal) {
    sessionEditCancelBtn.addEventListener('click', () => sessionEditModal.classList.remove('active'));
    sessionEditModal.addEventListener('click', (e) => {
        if (e.target === sessionEditModal) sessionEditModal.classList.remove('active');
    });
    sessionEditSaveBtn.addEventListener('click', saveSessionEdits);
}

if (historyCategoryFilters) {
    historyCategoryFilters.addEventListener('click', (e) => {
        if (e.target.classList.contains('category-filter-btn')) toggleCategoryFilter(e.target);
    });
}

const trashBtn = document.getElementById('category-trash-btn');
if (trashBtn) {
    trashBtn.addEventListener('dragover', (e) => e.preventDefault()); // Allow drop
    trashBtn.addEventListener('drop', (e) => {
        e.preventDefault();
        const category = e.dataTransfer.getData('text/plain');
        if (category && CATEGORIES[category]) {
            if(confirm(`Delete ALL history for "${CATEGORIES[category].label}"?`)) {
                deleteSessionsByCategory(category);
            }
        }
        trashBtn.classList.remove('drag-over');
    });
}

// === NEW: Category Filter Logic ===
function renderCategoryFilters() {
    if (!historyCategoryFilters) return;
    
    historyCategoryFilters.innerHTML = Object.entries(CATEGORIES).map(([key, { color, label }]) =>
        `<button class="category-filter-btn" 
                 draggable="true" 
                 data-category="${key}" 
                 style="background-color: ${color};" 
                 title="${label}">
         </button>`
    ).join('');

    // Add Drag Event Listeners
    document.querySelectorAll('.category-filter-btn').forEach(btn => {
        btn.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', btn.dataset.category);
            document.getElementById('category-trash-btn').classList.add('drag-over');
        });
        btn.addEventListener('dragend', () => {
            document.getElementById('category-trash-btn').classList.remove('drag-over');
        });
    });
}

// ======== CORE LOGIC (AUDIO, DATA, UI) ========
// Recording rotates every few minutes so a long recording becomes several
// small, independently-decodable files (you can't byte-slice one WebM blob —
// chunk 2+ has no header and Whisper rejects it).
let recordedSegments = [];
let recordRotateTimer = null;
let recordStream = null;
let recordStopReason = 'final'; // 'rotate' | 'final'
const RECORD_ROTATE_MS = 4 * 60 * 1000;

function startRecorderSegment() {
    fullAudioChunks = [];
    mediaRecorder = makeRecorder(recordStream);
    mediaRecorder.addEventListener('dataavailable', (e) => { if (e.data.size > 0) fullAudioChunks.push(e.data); });
    mediaRecorder.addEventListener('stop', onRecorderStop);
    mediaRecorder.start();
}

function rotateRecorder() {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        recordStopReason = 'rotate';
        mediaRecorder.stop();
    }
}

function onRecorderStop() {
    if (fullAudioChunks.length) {
        recordedSegments.push(new Blob(fullAudioChunks, { type: (fullAudioChunks[0] && fullAudioChunks[0].type) || supportedAudioMime() || 'audio/webm' }));
    }
    if (recordStopReason === 'rotate') {
        recordStopReason = 'final';
        startRecorderSegment(); // keep recording on the same stream
        return;
    }
    if (recordStream) { recordStream.getTracks().forEach(t => t.stop()); recordStream = null; }
    processFullRecording();
}

async function startListening() {
    if (!dictionary || !segmentit) { isListening = false; return; }
    
    // === FIX: Resume AudioContext (Browsers suspend it by default) ===
    if (audioContext && audioContext.state === 'suspended') {
        await audioContext.resume();
    }
    // ================================================================

    wave.classList.add('show');
    fullAudioChunks = [];
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        // Permission granted and recording is really starting — only NOW is it
        // safe to clear the previous session's output. Doing this earlier wiped
        // the user's work even when they denied the mic prompt (data loss).
        finalOutput.innerHTML = "";
        statsContent.innerHTML = "";
        downloadFab.style.display = 'none';
        summaryFab.style.display = 'none';
        playAllFab.style.display = 'none';
        playCharListFab.style.display = 'none'; // Hide new button
        stopFab.style.display = 'none';
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContext.createMediaStreamSource(stream);
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 512;
        source.connect(analyser);
        visualize();
        recordStream = stream;
        recordedSegments = [];
        recordStopReason = 'final';
        startRecorderSegment();
        recordRotateTimer = setInterval(rotateRecorder, RECORD_ROTATE_MS);
    } catch (error) {
        console.error('Microphone error:', error);
        // Reset the recording UI so it isn't stuck "on" after a denial/failure.
        isListening = false;
        wave.classList.remove('show');
        if (micFab) micFab.classList.remove('recording');
        if (animationFrameId) { cancelAnimationFrame(animationFrameId); animationFrameId = null; }
        // Report via modal instead of overwriting finalOutput, so a denied
        // prompt (or missing mic) doesn't destroy the current breakdown.
        showModal('Microphone', `<p class="error">Couldn't start recording: ${escapeHtml(error.message || 'microphone unavailable')}.</p>`);
    }
}
function stopListening() {
    if (recordRotateTimer) { clearInterval(recordRotateTimer); recordRotateTimer = null; }
    recordStopReason = 'final';
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop(); // onRecorderStop releases the mic + starts transcription
    } else if (recordStream) {
        recordStream.getTracks().forEach(t => t.stop());
        recordStream = null;
    }
    wave.classList.remove('show');
    if (audioContext) { audioContext.close(); audioContext = null; }
    if (animationFrameId) { cancelAnimationFrame(animationFrameId); animationFrameId = null; }
    bars.forEach(bar => bar.style.height = '5px');
}

function visualize() { if (!analyser) return; const bufferLength = analyser.frequencyBinCount; const dataArray = new Uint8Array(bufferLength); analyser.getByteFrequencyData(dataArray); const barCount = bars.length; for (let i = 0; i < barCount; i++) { const dataIndex = Math.floor(bufferLength / barCount * i); const barHeight = Math.pow(dataArray[dataIndex] / 255, 2.5) * 40; bars[i].style.height = `${Math.max(5, barHeight)}px`; } animationFrameId = requestAnimationFrame(visualize); }

async function processFullRecording() {
    wave.classList.remove('show');
    if (recordedSegments.length === 0) {
        processingOverlay.classList.remove('visible');
        finalOutput.innerHTML = "<p class='info'>No audio recorded.</p>";
        return;
    }
    processingOverlay.classList.add('visible');
    const segments = recordedSegments;
    recordedSegments = [];
    try {
        let fullText = "";
        let language = 'zh';
        // Each segment is a small, independently-valid file — transcribe in order,
        // feeding the prior text as a prompt for continuity across boundaries.
        for (const seg of segments) {
            const result = await sendBlobToWhisper(seg, fullText.slice(-200));
            if (result.text) fullText += (fullText ? " " : "") + result.text.trim();
            if (result.language) language = result.language;
        }
        if (fullText.trim()) {
            await processTranscription(fullText.trim().replace(/\n/g, '。'), language);
        } else {
            processingOverlay.classList.remove('visible');
            finalOutput.innerHTML = `<p class="info">No speech detected.</p>`;
        }
    } catch (error) {
        processingOverlay.classList.remove('visible');
        finalOutput.innerHTML = `<p class="error">⚠️ Transcription error: ${escapeHtml(error.message)}</p>`;
    }
}
async function sendBlobToWhisper(blob, prompt = "") {
    const formData = new FormData();
    formData.append('file', blob, audioFilename(blob.type, 'recording'));
    if (prompt) {
        formData.append('prompt', prompt);
    }

    const url = `${backendUrl}/transcribe`;
    const response = await fetch(url, {
        method: 'POST',
        body: formData
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Server transcription error');
    return data;
}
async function translateText(text, targetLanguage) { const url = `${backendUrl}/translate`; try { const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text, target_lang: targetLanguage }) }); const data = await response.json(); if (!response.ok) throw new Error(data.error || 'Server error'); return data.translations[0].text; } catch (error) { throw error; } }

// === OPTIMIZED processTranscription ===
async function processTranscription(text, languageHint = null, useEnhancedDefs = false, enhancedDefsData = null) {
    let inputLanguage = 'en';
    if (languageHint) { inputLanguage = languageHint.toLowerCase().startsWith('zh') ? 'zh' : 'en'; }
    else if (chineseCharRegex.test(text)) { inputLanguage = 'zh'; }

    let breakdownHtml = '';
    let currentCharacterStats = {};
    let originalTextForSession = text;
    let finalChineseText;

    if (!useEnhancedDefs) stopAllAudio();

    try {
        if (inputLanguage === 'en') {
            finalChineseText = await translateText(text, 'ZH');
        } else {
            finalChineseText = text;
        }
        if (!finalChineseText) { throw new Error("Translation failed."); }

        // Split sentences but keep delimiters
        const sentences = finalChineseText.match(/[^，。？！]+[，。？！]?/g) || [finalChineseText];
        
        // === OPTIMIZATION: Translate all sentences in parallel ===
        const translationPromises = sentences
            .filter(s => s.trim() !== "")
            .map(s => translateText(s.trim(), 'EN'));
        
        // Use Promise.allSettled to handle individual translation failures gracefully
        const results = await Promise.allSettled(translationPromises);
        const translations = results.map(res => res.status === 'fulfilled' ? res.value : '[Translation Failed]');
        // ========================================================

        let transIndex = 0;

        for (const sentence of sentences) {
            if (sentence.trim() === "") continue;

            const sentenceTranslation = translations[transIndex++] || "[Translation Unavailable]";
            const escapedSentence = sentence.trim().replace(/'/g, "\\'").replace(/"/g, '&quot;');

            const words = segmentit.doSegment(sentence, { simple: true });
            let wordGridHtml = '';

            for (const word of words) {
                // Handle Punctuation
                if (punctuationRegex.test(word) && word.length === 1) { // Display punctuation without a card
                    wordGridHtml += `<div class="punctuation-mark" style="font-size: 3em; margin-top: 1em;">${word}</div>`;
                    continue;
                }
                // Handle Numbers
                if (numberRegex.test(word)) {
                        wordGridHtml += `<div class="word-unit number-unit">
                            <div class="char-grid">
                                <div class="char-unit"><div class="char">${word}</div></div>
                            </div>
                        </div>`;
                        continue;
                    }

                // --- Process Chinese Word ---
                let wordDef = useEnhancedDefs && enhancedDefsData && enhancedDefsData[word] ? enhancedDefsData[word] : (dictionary ? dictionary[word] : null);
                let definitionFound = !!wordDef; 

                // If it's a multi-char word NOT found, break it down
                if (word.length > 1 && !definitionFound) {
                    for (const char of word) {
                        if (chineseCharRegex.test(char)) {
                            currentCharacterStats[char] = (currentCharacterStats[char] || 0) + 1;
                            let charDef = (useEnhancedDefs && enhancedDefsData && enhancedDefsData[char]) ? enhancedDefsData[char] : (dictionary ? dictionary[char] : null);
                            let charPinyin = window.pinyinPro ? window.pinyinPro.pinyin(char, { toneType: 'symbol' }) : '';
                            let shortCharDef = 'n/a';
                            let fullCharDef = 'n/a';
                            if (charDef) {
                                shortCharDef = charDef.split(';')[0].split('/')[0].replace(/\[.*?\]|\(.*?\)/g, '').trim();
                                fullCharDef = charDef;
                            }
                            const escapedChar = char.replace(/'/g, "\\'").replace(/"/g, '&quot;');
                            const escapedFullCharDef = fullCharDef.replace(/"/g, '&quot;').replace(/'/g, '&#39;');

                            wordGridHtml += `<div class="word-unit" style="flex-basis: 100px; flex-grow: 0;" data-char="${char}" data-pinyin="${charPinyin}" data-def="${escapedFullCharDef}" onclick="toggleCardSelection(this, event)">
                                <div class="char-grid"><div class="char-unit"><div class="char" data-char="${char}" onclick="event.stopPropagation(); window.showStrokes('${escapedChar}')">${char}</div></div></div>
                                <div class="word-definition">
                                    <div class="word-pinyin" onclick="event.stopPropagation(); window.requestSpeech('${escapedChar}')">${charPinyin}</div>
                                    <div class="word-english" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" onclick="event.stopPropagation(); window.showText('Definition for ${char}', this.parentElement.parentElement.dataset.def)" data-full-def="${escapedFullCharDef}">${escapeHtml(shortCharDef)}</div>
                                </div>
                            </div>`;
                        }
                    }
                } else { 
                    // Process as a single unit
                    let charGridHtml = '';
                    let hasChineseChar = false;

                    for (const char of word) {
                        if (chineseCharRegex.test(char)) {
                            hasChineseChar = true;
                            currentCharacterStats[char] = (currentCharacterStats[char] || 0) + 1;
                            charGridHtml += `<div class="char-unit"><div class="char" data-char="${char}" onclick="event.stopPropagation(); window.showStrokes('${char}')">${char}</div></div>`;
                        }
                    }

                    let wordDefinitionHtml = '';
                    let wordPinyin = '';
                    let shortWordDef = 'n/a';
                    let fullWordDef = 'n/a';
                    
                    if (hasChineseChar) {
                        wordPinyin = window.pinyinPro ? window.pinyinPro.pinyin(word, { toneType: 'symbol' }) : '';

                        if (wordDef) { 
                            shortWordDef = wordDef.split(';')[0].split('/')[0].replace(/\[.*?\]|\(.*?\)/g, '').trim();
                            fullWordDef = wordDef;
                        }

                        const escapedWord = word.replace(/'/g, "\\'").replace(/"/g, '&quot;');
                        const escapedFullWordDef = fullWordDef.replace(/"/g, '&quot;').replace(/'/g, '&#39;'); 

                        wordDefinitionHtml = `<div class="word-definition">
                            <div class="word-pinyin" onclick="event.stopPropagation(); window.requestSpeech('${escapedWord}')">${wordPinyin}</div>
                            <div class="word-english" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" onclick="event.stopPropagation(); window.showText('Definition for ${word}', this.parentElement.parentElement.dataset.def)" data-full-def="${escapedFullWordDef}">${escapeHtml(shortWordDef)}</div>
                        </div>`;
                    }

                    if (hasChineseChar) {
                        wordGridHtml += `<div class="word-unit" style="flex-basis: 100px; flex-grow: 0;" data-char="${word}" data-pinyin="${wordPinyin}" data-def="${fullWordDef.replace(/"/g, '&quot;').replace(/'/g, '&#39;')}" onclick="toggleCardSelection(this, event)">
                            <div class="char-grid">${charGridHtml}</div>
                            ${wordDefinitionHtml}
                        </div>`;
                    }
                } 
            } 

            if (autoPronounceToggle.checked && !useEnhancedDefs) { speechQueue.push(sentence.trim()); }

            breakdownHtml += `<div class="sentence-group" tabindex="0">
                <div class="word-grid">${wordGridHtml}</div>
                <div class="sentence-translation">
                    <span class="play-btn-svg" onclick="window.playSentenceWithHighlight('${escapedSentence}', this)">${playIcon}</span>
                    <span>${escapeHtml(sentenceTranslation)}</span>
                </div>
            </div>`;
        }

        if (autoPronounceToggle.checked && speechQueue.length > 0 && !useEnhancedDefs) { speakFromQueue(); }

        const finalEnglishText = await translateText(finalChineseText, 'EN');
        const finalPinyin = window.pinyinPro ? window.pinyinPro.pinyin(finalChineseText, { toneType: 'symbol' }) : '';
        
        const fullParagraphOutput = `<div class="full-paragraph-output">
            <div class="final-english">${escapeHtml(finalEnglishText)}</div>
            <div class="final-pinyin">${escapeHtml(finalPinyin)}</div>
            <div class="final-chinese">${escapeHtml(finalChineseText)} <span class="play-btn-svg" onclick="window.requestSpeech(this.parentElement.textContent.replace('▶️', '').trim())">${playIcon}</span></div>
        </div>`;
        breakdownHtml += fullParagraphOutput;

        const charListHtml = generateCharacterListHtml(finalChineseText);
        breakdownHtml += charListHtml;

        if (!useEnhancedDefs) {
            const newSession = {
                id: Date.now(), date: new Date().toLocaleString(), name: null, categories: [],
                transcription: originalTextForSession, chineseText: finalChineseText, breakdownHtml,
                stats: currentCharacterStats
            };
            if (autoSaveSessions) {
                sessionHistory.unshift(newSession);
                temporarySession = null;
                saveHistory(); 
                renderHistory();
            } else {
                temporarySession = newSession;
            }
            displaySession(newSession.id);
        } else {
            // Enhanced defs handling remains the same...
            const activeSession = findSessionById(currentSessionId);
            if (activeSession) {
                activeSession.breakdownHtml = breakdownHtml;
                activeSession.stats = currentCharacterStats;
                if (sessionHistory.some(s => s.id === activeSession.id)) {
                    saveHistory();
                } else {
                    temporarySession = activeSession;
                }
                displaySession(currentSessionId);
            }
        }

        processingOverlay.classList.remove('visible');
        topControlsWrapper.classList.add('hidden');
        statsOutput.classList.add('collapsed');
        controlsToggleBtn.classList.remove('active');
        globalStatsOutput.classList.add('collapsed'); 

    } catch (error) {
        console.error(error);
        processingOverlay.classList.remove('visible');
        finalOutput.innerHTML = `<p class="error">Processing failed: ${error.message}</p>`;
    }
    controlsToggleBtn.style.display = 'block';
    playAllFab.style.display = 'flex';
    playCharListFab.style.display = 'flex';
    updateSelectedCount(); 
    populateRadicalCharList(); 
    flashcardBtn.style.display = 'flex'; 
    flashcardGameBtn.style.display = 'flex'; 
    selectAllCharsBtn.style.display = 'flex'; 
    radicalsBtn.style.display = 'flex'; 
}


// === UPDATED: Show/Hide playCharListFab ===
function findSessionById(sessionId) {
    const match = sessionHistory.find(s => String(s.id) === String(sessionId));
    if (match) return match;
    if (temporarySession && String(temporarySession.id) === String(sessionId)) return temporarySession;
    return null;
}

function getActiveSession() {
    if (currentSessionId) {
        const session = findSessionById(currentSessionId);
        if (session) return session;
    }
    if (temporarySession) return temporarySession;
    return sessionHistory[0] || null;
}

function displaySession(sessionId) {
    const session = findSessionById(sessionId);
    if (!session) return;
    currentSessionId = sessionId;
    const isTemporary = !sessionHistory.some(s => s.id === sessionId);
    document.body.classList.toggle('has-temporary-session', isTemporary);
    document.body.classList.toggle('auto-save-disabled', !autoSaveSessions);
    updateAutoSaveIndicator(isTemporary);
    finalOutput.innerHTML = session.breakdownHtml;
    updateStatsDisplay(session.stats);
    updateGlobalStatsDisplay(); // Update global stats when displaying
    document.querySelectorAll('.history-item').forEach(item => item.classList.toggle('active', item.dataset.id == sessionId));
    downloadFab.style.display = 'flex';
    summaryFab.style.display = 'flex';
    enhanceBtn.style.display = 'inline-block';
    revertBtn.style.display = 'none';

    controlsToggleBtn.style.display = 'block';
    playAllFab.style.display = 'flex';
    playCharListFab.style.display = 'flex'; // Show
    // stopFab is controlled by listeners
    if (ttsControls) ttsControls.style.display = 'none'; // Hide TTS controls by default
    topControlsWrapper.classList.remove('hidden'); // Show text input
    controlsToggleBtn.classList.add('active');
    updateSelectedCount(); // === NEW ===
    populateRadicalCharList(); // === NEW ===
    flashcardBtn.style.display = 'flex'; // === NEW ===
    flashcardGameBtn.style.display = 'flex'; // === NEW ===
    selectAllCharsBtn.style.display = 'flex'; // === NEW ===
    radicalsBtn.style.display = 'flex'; // === NEW ===
}


function handleKeyboardNavigation(e) {
    const active = document.activeElement;
    // Allow navigation between sentence groups and the final sections
    if (active && (active.classList.contains('sentence-group') || active.classList.contains('full-paragraph-output') || active.classList.contains('char-list-summary'))) {
        let target;
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') {
            target = active.nextElementSibling;
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            target = active.previousElementSibling;
        }

        // Find the next valid focus target
        while(target && !(target.classList.contains('sentence-group') || target.classList.contains('full-paragraph-output') || target.classList.contains('char-list-summary'))) {
            target = (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') ? target.nextElementSibling : target.previousElementSibling;
        }

        if (target) {
            e.preventDefault();
            if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '0'); // Ensure focusable
            target.focus();
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
}
async function playAllCharacters() {
    const session = findSessionById(currentSessionId);
    if (!session || !session.chineseText) return;
    stopAllAudio();
    const allChars = session.chineseText.match(/[\u4e00-\u9fff]/g);
    if (!allChars) return;

    playAllFab.classList.add('playing');
    if (stopFab) stopFab.style.display = 'flex';
    speechQueue = [...allChars];
    // Use finalOutput as scope to avoid highlighting char list
    speakFromQueueWithHighlight(finalOutput.querySelector('.full-paragraph-output')?.parentElement || finalOutput);
}

// === NEW: Play entire character list ===
function playCharList() {
    const charListContainer = finalOutput.querySelector('.char-list-container');
    if (!charListContainer) return;
    stopAllAudio();
    const charElements = charListContainer.querySelectorAll('.char-list-char');
    const charsToPlay = Array.from(charElements).map(el => el.textContent.trim()).filter(char => chineseCharRegex.test(char));
    if (charsToPlay.length === 0) return;

    playCharListFab.classList.add('playing'); // Add playing class to this button
    if (stopFab) stopFab.style.display = 'flex';
    speechQueue = charsToPlay;
    speakFromQueueWithHighlight(charListContainer); // Use char list container as scope
}

async function animateCharacterList(characters) {
    // Create a modal for the animation sequence.
    const animationModal = document.createElement('div');
    animationModal.id = 'hanzi-animation-modal';
    Object.assign(animationModal.style, {
        position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex',
        alignItems: 'center', justifyContent: 'center', zIndex: '2000', cursor: 'pointer'
    });

    // Create a dedicated host inside the modal for the writer.
    const writerHost = document.createElement('div');
    animationModal.appendChild(writerHost);
    document.body.appendChild(animationModal);

    let writer = null;
    let isCancelled = false;

    // This master cleanup function handles everything.
    const cleanupAndRemove = () => {
        isCancelled = true; // Signal to any ongoing loops to stop.
        if (writer) {
            writer.cleanup();
            writer = null;
        }
        // Make sure the modal is still in the DOM before trying to remove it.
        if (document.body.contains(animationModal)) {
            animationModal.remove();
        }
    };

    // Close the modal if the background is clicked.
    animationModal.addEventListener('click', (e) => {
        if (e.target === animationModal) {
            cleanupAndRemove();
        }
    });

    // The for...of loop with await correctly handles the sequence of promises.
    for (const char of characters) {
        // If the modal was closed while awaiting, break the loop.
        if (isCancelled) {
            break;
        }

        writerHost.innerHTML = ''; // Clear the host for the new writer.

        writer = HanziWriter.create(writerHost, char, {
            width: 200,
            height: 200,
            padding: 20,
            strokeAnimationSpeed: 1.2,
            delayBetweenStrokes: 150,
            strokeColor: '#FFFFFF',
            outlineColor: '#555555'
        });

        // await pauses the loop until the animateCharacter() promise resolves.
        await writer.animateCharacter();
    }

    // After the loop has finished (or was broken), do a final cleanup.
    cleanupAndRemove();
}

window.playSentenceWithHighlight = (sentence, buttonElement) => {
    const sentenceGroup = buttonElement.closest('.sentence-group');
    const chars = sentence.match(/[\u4e00-\u9fff]/g) || [];
    if (chars.length === 0) return; // nothing Chinese to speak
    stopAllAudio();
    playAllFab.classList.add('playing');
    if (soundStopFab) soundStopFab.classList.add('playing');
    // Natural voice returns one clip for the whole sentence \u2014 play it and keep
    // the sentence highlighted for the duration (no per-char boundaries to sync).
    if (isNaturalVoiceSelected()) {
        const els = sentenceGroup ? Array.from(sentenceGroup.querySelectorAll('.char')) : [];
        els.forEach(el => el.classList.add('highlight'));
        naturalSpeak(sentence, { onend: () => {
            els.forEach(el => el.classList.remove('highlight'));
            playAllFab.classList.remove('playing');
            if (soundStopFab) soundStopFab.classList.remove('playing');
            playCharListFab.classList.remove('playing');
        }});
        return;
    }
    speechQueue = [...chars];
    speakFromQueueWithHighlight(sentenceGroup);
}

// === UPDATED: Add scrollIntoView, adjust highlight target for char list ===
async function speakFromQueueWithHighlight(scopeElement = document) {
    if (speechQueue.length === 0) {
        isSpeaking = false;
        playAllFab.classList.remove('playing');
        playCharListFab.classList.remove('playing'); // Ensure char list button reverts
        return;
    }

    isSpeaking = true;
    const char = speechQueue.shift();
    let charElements;
    let elementToScroll;

    // Adjust selector based on scope
    if (scopeElement.classList.contains('char-list-container')) {
        charElements = scopeElement.querySelectorAll(`.char-list-item[data-char="${char}"]`); // Target the item
        elementToScroll = charElements[0]; // Scroll the whole item
    } else {
        charElements = scopeElement.querySelectorAll(`.char[data-char="${char}"]`);
        elementToScroll = charElements[0]?.closest('.word-unit') || charElements[0]; // Scroll word or char unit
    }


    if (charElements.length > 0) {
        charElements.forEach(el => el.classList.add('highlight'));

        // Scroll into view
        if (elementToScroll) {
            elementToScroll.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    }


    await new Promise(resolve => {
        const utterance = new SpeechSynthesisUtterance(char);
        const selectedVoice = availableVoices.find(v => v.name === voiceSelector.value);
        if (selectedVoice) utterance.voice = selectedVoice;
        utterance.lang = 'zh-CN';
        utterance.rate = parseFloat(speedSlider.value);
        utterance.onend = resolve;
        utterance.onerror = (e) => { console.error("Speech Error:", e); resolve(); };
        window.speechSynthesis.speak(utterance);
    });

    if (charElements.length > 0) {
        charElements.forEach(el => el.classList.remove('highlight'));
    }


    if (speechQueue.length > 0) {
        setTimeout(() => speakFromQueueWithHighlight(scopeElement), 100);
    } else {
        isSpeaking = false;
        playAllFab.classList.remove('playing');
        playCharListFab.classList.remove('playing');
    }
}


// ======== DARK MODE ========
function setupDarkMode() {
    const toggle = document.getElementById('dark-mode-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) { document.body.dataset.theme = savedTheme; }
    else if (prefersDark) { document.body.dataset.theme = 'dark'; }
    toggle.textContent = document.body.dataset.theme === 'dark' ? '☀️' : '🌙';
    toggle.addEventListener('click', () => {
        let theme = document.body.dataset.theme;
        if (theme === 'dark') {
            document.body.dataset.theme = 'light';
            toggle.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        } else {
            document.body.dataset.theme = 'dark';
            toggle.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        }
    });
}
async function enhanceDefinitions() {
    const session = findSessionById(currentSessionId);
    if (!session || !session.chineseText) return;

    const oldBreakdown = session.breakdownHtml;
    enhanceBtn.disabled = true;
    enhanceBtn.classList.add('working');
    revertBtn.style.display = 'none';
    finalOutput.innerHTML = oldBreakdown + "<p class='info' style='text-align:center;'>🧠 Enhancing definitions with AI...</p>";

    try {
        const response = await fetch(`${backendUrl}/enhance`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: session.chineseText })
        });
        const enhancedDefsData = await response.json();
        if (!response.ok) throw new Error(enhancedDefsData.error || 'Enhance API error');
        // Re-render from the Chinese text (not the original input, which may be
        // English) so the AI's per-character definitions line up with the text.
        await processTranscription(session.chineseText, 'zh', true, enhancedDefsData);
        revertBtn.style.display = 'inline-block';
        enhanceBtn.style.display = 'none'; // hide only on success
    } catch (error) {
        console.error("Enhance failed:", error);
        session.breakdownHtml = oldBreakdown;
        displaySession(currentSessionId);
        showModal("Enhancement Failed", `AI enhancement failed: ${error.message}`);
    } finally {
        enhanceBtn.disabled = false;
        enhanceBtn.classList.remove('working');
    }
}
function revertDefinitions() {
    const session = findSessionById(currentSessionId);
    if (!session) return;
    revertBtn.disabled = true;
    processTranscription(session.chineseText, 'zh', true, null);
    revertBtn.disabled = false;
    revertBtn.style.display = 'none';
    enhanceBtn.style.display = 'inline-block';
}

// ======== HISTORY & STATE MANAGEMENT ========
// === UPDATED: Save triggers global stats update ===
function saveHistory() {
    // Guard against localStorage quota: a full store must not blow up an
    // otherwise-successful transcription. Drop the oldest sessions and retry.
    for (let attempt = 0; attempt < 6; attempt++) {
        try {
            localStorage.setItem('transcriptionHistory', JSON.stringify(sessionHistory));
            break;
        } catch (e) {
            if (sessionHistory.length <= 1) { console.warn('History too large to save.', e); break; }
            sessionHistory = sessionHistory.slice(0, Math.ceil(sessionHistory.length / 2)); // keep newest half
        }
    }
    updateGlobalStatsDisplay(); // Update global stats whenever history is saved
}
// === UPDATED: Load history also loads global stats ===
function loadHistory() {
    try {
        const savedHistoryJSON = localStorage.getItem('transcriptionHistory');
        if (savedHistoryJSON) {
            sessionHistory = JSON.parse(savedHistoryJSON);
            if (!Array.isArray(sessionHistory) || (sessionHistory.length > 0 && !sessionHistory[0].id)) {
                throw new Error("Data format is incorrect.");
            }
        }
    } catch (error) {
        console.error("Could not parse saved history. Data might be corrupted.", error);
        if (confirm("Error loading session history. Data may be corrupted. Clear history?")) {
            clearHistory(true); // Force clear if corrupted
        }
        return;
    } finally {
        renderHistory(); // Render history list regardless of error
        updateGlobalStatsDisplay(); // Calculate and display global stats
    }

    if (sessionHistory.length > 0) {
        displaySession(sessionHistory[0].id);
        // === NEW: Ensure panels are closed on initial load ===
        toggleHistoryPanel(false);
        toggleRightPanel(false);
    } else {
        updateStatsDisplay({}); // Clear session stats if no history
    }
}
// === UPDATED: Clear global stats too ===
function clearHistory(force = false) {
    if (force || confirm("Are you sure you want to delete ALL sessions? This cannot be undone.")) {
        sessionHistory = [];
        temporarySession = null;
        currentSessionId = null;
        localStorage.removeItem('transcriptionHistory');
        renderHistory();
        finalOutput.innerHTML = "<p class='info'>History cleared.</p>";
        statsContent.innerHTML = "";
        updateGlobalStatsDisplay(); // Update global stats (will show empty)
        downloadFab.style.display = 'none';
        summaryFab.style.display = 'none';
        downloadAllBtn.style.display = 'none';
        enhanceBtn.style.display = 'none';
        revertBtn.style.display = 'none';
        playAllFab.style.display = 'none';
        playCharListFab.style.display = 'none';
        stopFab.style.display = 'none';
        flashcardBtn.style.display = 'none'; // === NEW ===
        flashcardGameBtn.style.display = 'none'; // === NEW ===
        selectAllCharsBtn.style.display = 'none'; // === NEW ===
        radicalsBtn.style.display = 'none'; // === NEW ===
        document.body.classList.remove('has-temporary-session');
        updateAutoSaveIndicator(false);
    }
}
function renderHistory() {
    const activeCategoryFilter = document.querySelector('.category-filter-btn.active')?.dataset.category;
    const searchTerm = historySearchInput ? historySearchInput.value.toLowerCase().trim() : '';

    const filteredSessions = sessionHistory.filter(session => {
        const categoryMatch = !activeCategoryFilter || (session.categories && session.categories.includes(activeCategoryFilter));
        if (!categoryMatch) return false;

        if (searchTerm) {
            const nameMatch = session.name && session.name.toLowerCase().includes(searchTerm);
            const transcriptionMatch = session.transcription && session.transcription.toLowerCase().includes(searchTerm);
            const chineseMatch = session.chineseText && session.chineseText.toLowerCase().includes(searchTerm);
            return nameMatch || transcriptionMatch || chineseMatch;
        }
        return true; // No search term, just category match
    });

    if (sessionHistory.length === 0) {
        historyList.innerHTML = '<p class="info">No saved sessions.</p>';
        downloadAllBtn.style.display = 'none';
        return;
    }

    downloadAllBtn.style.display = filteredSessions.length > 0 ? 'block' : 'none';

    if (filteredSessions.length === 0) {
        if (searchTerm && activeCategoryFilter) {
            historyList.innerHTML = `<p class="info">No sessions match "${searchTerm}" in the selected category.</p>`;
        } else if (searchTerm) {
            historyList.innerHTML = `<p class="info">No sessions match "${searchTerm}".</p>`;
        } else if (activeCategoryFilter) {
            historyList.innerHTML = `<p class="info">No sessions in this category.</p>`;
        } else {
            historyList.innerHTML = '<p class="info">No saved sessions.</p>';
        }
        return;
    }

    const highlightText = (text, term) => {
        const safe = escapeHtml(text || ''); // escape first — this goes into innerHTML
        if (!term) return safe;
        const regex = new RegExp(`(${term.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
        return safe.replace(regex, '<mark class="search-highlight">$1</mark>');
    };

    historyList.innerHTML = filteredSessions.map(session => {
        const categoryDots = (session.categories || [])
            .map(catKey => CATEGORIES[catKey] ? `<span class="category-dot" style="background-color: ${CATEGORIES[catKey].color};" title="${CATEGORIES[catKey].label}"></span>` : '')
            .join('');


        let previewText = session.transcription.length > 30 ? session.transcription.substring(0, 30) + '...' : session.transcription;
        const sessionDate = new Date(session.id);
        let displayName = session.name || sessionDate.toLocaleDateString();
        const displayTime = sessionDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        displayName = highlightText(displayName, searchTerm);
        previewText = highlightText(previewText, searchTerm);

        return `<div class="history-item" data-id="${session.id}">
            <div class="history-item-content" onclick="displaySession(${session.id})">
                <div class="history-item-header">
                    <div class="date">${displayName}</div>
                    <div class="history-item-categories">${categoryDots}</div>
                    <div class="timestamp">${displayTime}</div>
                </div>
                <div class="preview">${previewText}</div>
            </div>
            <div class="history-item-controls">
                <button class="history-btn" onclick="openSessionEditModal(${session.id})">Edit</button>
                <button class="history-btn delete-btn" onclick="deleteSession(${session.id})">Delete</button>
            </div>
        </div>`;
    }).join('');
}

// === NEW: Session Edit Modal Logic ===
function openSessionEditModal(sessionId) {
    const session = findSessionById(sessionId);
    if (!session) return;

    activeEditSessionId = sessionId;
    sessionEditTitle.textContent = `Edit Session`;
    sessionNameInput.value = session.name || '';

    sessionCategoriesList.innerHTML = Object.entries(CATEGORIES).map(([key, { label }]) => `
        <label>
            <input type="checkbox" class="session-category-checkbox" value="${key}" ${(session.categories || []).includes(key) ? 'checked' : ''}>
            ${label}
        </label>
    `).join('');

    sessionEditModal.classList.add('active');
    sessionNameInput.focus();
}

function saveSessionEdits() {
    const session = findSessionById(activeEditSessionId);
    if (!session) return;

    const newName = sessionNameInput.value.trim();
    const selectedCategories = Array.from(document.querySelectorAll('.session-category-checkbox:checked')).map(cb => cb.value);

    session.name = newName;
    session.categories = selectedCategories;

    if (sessionHistory.some(s => s.id === activeEditSessionId)) {
        saveHistory();
    } else if (temporarySession && temporarySession.id === activeEditSessionId) {
        temporarySession = session;
    }

    renderHistory();
    displaySession(activeEditSessionId); // Refresh the view
    sessionEditModal.classList.remove('active');
    activeEditSessionId = null;
}

function renameSession(sessionId) { // Kept for reference, but now replaced by modal
    openSessionEditModal(sessionId);
}

// === UPDATED: Update global stats after deleting ===
function deleteSession(sessionId) {
    const session = sessionHistory.find(s => s.id === sessionId);
    if (!session) return;
    const displayName = session.name || `session from ${session.date}`;
    if (confirm(`Delete "${displayName}"?`)) {
        sessionHistory = sessionHistory.filter(s => s.id !== sessionId);
        saveHistory(); // This saves and triggers global stats update
        renderHistory();
        if (sessionHistory.length > 0) {
            displaySession(sessionHistory[0].id);
        } else {
            finalOutput.innerHTML = "<p class='info'>History is empty.</p>";
            statsContent.innerHTML = "";
            downloadFab.style.display = 'none';
            summaryFab.style.display = 'none';
            enhanceBtn.style.display = 'none';
            revertBtn.style.display = 'none';
            playAllFab.style.display = 'none';
            playCharListFab.style.display = 'none';
            stopFab.style.display = 'none';
            flashcardBtn.style.display = 'none'; // === NEW ===
            flashcardGameBtn.style.display = 'none'; // === NEW ===
            selectAllCharsBtn.style.display = 'none'; // === NEW ===
            radicalsBtn.style.display = 'none'; // === NEW ===
        }
    }
}

// ======== UI & INTERACTIVITY (SPEECH, STROKES, DOWNLOADS) ========
// === Natural voice (server TTS) ===
// A sentinel voice option routes playback through the server's OpenAI TTS for
// natural, human-sounding audio — and reliable playback on iOS, where
// speechSynthesis is flaky. Each phrase is fetched once, cached as an object URL,
// and played through a shared <audio> element whose playbackRate is the speed
// control. Any failure (offline / server down) falls back to browser speech.
const NATURAL_VOICE_VALUE = '__natural__';
let ttsAudioEl = null;
const ttsBlobCache = new Map(); // text -> object URL
let ttsCurrentToken = 0;

function getTtsAudio() {
    if (!ttsAudioEl) { ttsAudioEl = new Audio(); ttsAudioEl.preload = 'auto'; }
    return ttsAudioEl;
}
function currentTtsRate() {
    const r = parseFloat(speedSlider?.value || '1');
    return isNaN(r) ? 1 : Math.max(0.5, Math.min(2, r));
}
function isNaturalVoiceSelected() {
    return voiceSelector && voiceSelector.value === NATURAL_VOICE_VALUE;
}
function stopAllSpeech() {
    ttsCurrentToken++;
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    if (ttsAudioEl) { try { ttsAudioEl.pause(); } catch (_) { /* ignore */ } }
}

async function fetchTtsUrl(text) {
    if (ttsBlobCache.has(text)) return ttsBlobCache.get(text);
    const resp = await fetch(`${backendUrl}/tts`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
    });
    if (!resp.ok) throw new Error('tts failed');
    const blob = await resp.blob();
    const url = URL.createObjectURL(blob);
    if (ttsBlobCache.size > 200) { // bound memory
        const first = ttsBlobCache.keys().next().value;
        URL.revokeObjectURL(ttsBlobCache.get(first));
        ttsBlobCache.delete(first);
    }
    ttsBlobCache.set(text, url);
    return url;
}

// Play text with the natural voice; resolves when playback ends. Falls back to
// browser speech on any failure so audio still plays offline / when the key is
// unset. onstart/onend let callers drive highlighting.
function naturalSpeak(text, { onstart, onend } = {}) {
    return new Promise((resolve) => {
        const token = ++ttsCurrentToken;
        const audio = getTtsAudio();
        try { window.speechSynthesis.cancel(); } catch (_) { /* ignore */ }
        try { audio.pause(); } catch (_) { /* ignore */ }
        const finish = () => { if (onend) onend(); resolve(); };
        fetchTtsUrl(text).then(url => {
            if (token !== ttsCurrentToken) return resolve(); // superseded by a newer request
            audio.src = url;
            audio.playbackRate = currentTtsRate();
            audio.onended = () => { if (token === ttsCurrentToken) finish(); };
            audio.onerror = () => { if (token === ttsCurrentToken) browserSpeak(text, { onstart, onend: finish }); };
            if (onstart) onstart();
            const p = audio.play();
            if (p && p.catch) p.catch(() => { if (token === ttsCurrentToken) browserSpeak(text, { onstart, onend: finish }); });
        }).catch(() => {
            if (token !== ttsCurrentToken) return resolve();
            browserSpeak(text, { onstart, onend: finish });
        });
    });
}

// Speak with the browser's speechSynthesis (used for non-natural voices and as
// the fallback path).
function browserSpeak(text, { onstart, onend } = {}) {
    if (!('speechSynthesis' in window)) { if (onend) onend(); return; }
    const u = new SpeechSynthesisUtterance(text);
    const v = availableVoices.find(voice => voice.name === voiceSelector.value);
    if (v) u.voice = v;
    u.lang = 'zh-CN';
    u.rate = currentTtsRate();
    if (onstart) u.onstart = onstart;
    u.onend = () => { if (onend) onend(); };
    u.onerror = () => { if (onend) onend(); };
    window.speechSynthesis.speak(u);
}

// Unified single-phrase speak used across the app.
function speakSmart(text, opts) {
    if (isNaturalVoiceSelected()) return naturalSpeak(text, opts);
    browserSpeak(text, opts);
    return Promise.resolve();
}

window.requestSpeech = (text) => {
    stopAllSpeech();
    speechQueue = [];
    isSpeaking = false;
    const repeatCount = parseInt(repeatCountSelector.value, 10) || 1;
    playAllFab.classList.add('playing');
    if (isNaturalVoiceSelected()) {
        let i = 0;
        const playNext = () => {
            if (i++ >= repeatCount) { playAllFab.classList.remove('playing'); playCharListFab.classList.remove('playing'); return; }
            naturalSpeak(text, { onend: () => setTimeout(playNext, 120) });
        };
        playNext();
        return;
    }
    for (let i = 0; i < repeatCount; i++) { speechQueue.push(text); }
    speakFromQueue();
};
function speakFromQueue() {
    if (isSpeaking || speechQueue.length === 0) {
        if (!isSpeaking && speechQueue.length === 0) {
            playAllFab.classList.remove('playing');
            playCharListFab.classList.remove('playing');
        }
        return;
    }
    isSpeaking = true;
    const text = speechQueue.shift();
    const utterance = new SpeechSynthesisUtterance(text);
    const selectedVoiceName = voiceSelector.value;
    const selectedVoice = availableVoices.find(voice => voice.name === selectedVoiceName);
    if (selectedVoice) utterance.voice = selectedVoice;
    utterance.lang = 'zh-CN';
    utterance.rate = parseFloat(speedSlider.value);
    utterance.onend = () => { isSpeaking = false; setTimeout(speakFromQueue, 100); };
    utterance.onerror = (e) => { isSpeaking = false; console.error("Speech error:", e); setTimeout(speakFromQueue, 100); };
    window.speechSynthesis.speak(utterance);
}
function populateVoiceList() {
    let previous = voiceSelector.value || localStorage.getItem('preferredVoice') || NATURAL_VOICE_VALUE;
    availableVoices = speechSynthesis.getVoices().filter(voice => voice.lang.startsWith('zh'));
    voiceSelector.innerHTML = '';
    // Natural (AI) voice first — the default, and the only option that sounds
    // human. Works even when the browser has no bundled Chinese voices.
    const natOpt = document.createElement('option');
    natOpt.textContent = '✨ Natural (AI) — recommended';
    natOpt.value = NATURAL_VOICE_VALUE;
    voiceSelector.appendChild(natOpt);
    for (const voice of availableVoices) {
        const option = document.createElement('option');
        option.textContent = `${voice.name} (${voice.lang})`;
        option.value = voice.name;
        voiceSelector.appendChild(option);
    }
    // Preserve the user's choice across the repeated voiceschanged events;
    // default to the natural voice.
    if (previous !== NATURAL_VOICE_VALUE && !availableVoices.some(v => v.name === previous)) {
        previous = NATURAL_VOICE_VALUE;
    }
    voiceSelector.value = previous;
}

function updateStatsDisplay(stats) {
    const statsToDisplay = stats || {};
    const sortedStats = Object.entries(statsToDisplay).sort((a, b) => b[1] - a[1]);
    const topN = sortedStats.slice(0, 8); // Show top 8 for session
    if (topN.length === 0) {
        statsContent.innerHTML = '<p class="info">No stats for this session.</p>';
        return;
    }
    let statsHtml = topN.map(([char, count]) => {
        const pinyin = window.pinyinPro?.pinyin ? window.pinyinPro.pinyin(char, { toneType: 'symbol' }) : '';
        const rawDef = dictionary && dictionary[char] ? dictionary[char] : '...';
        const definition = rawDef.split(';')[0].split('/')[0];
        return `<div class="stat-item" onclick="window.showStrokes('${char}')"><span class="stat-char">${char}</span><span class="stat-pinyin">${pinyin}</span><span class="stat-english">${escapeHtml(definition)}</span><span class="stat-count">${count}</span></div>`;
    }).join('');
    statsContent.innerHTML = `<div class="stats-list">${statsHtml}</div>`;
}

// === NEW: Global Stats Calculation ===
function calculateGlobalStats() {
    const globalStats = {};
    for (const session of sessionHistory) {
        if (session && session.stats) {
            for (const [char, count] of Object.entries(session.stats)) {
                globalStats[char] = (globalStats[char] || 0) + count;
            }
        }
    }
    if (temporarySession && temporarySession.stats) {
        for (const [char, count] of Object.entries(temporarySession.stats)) {
            globalStats[char] = (globalStats[char] || 0) + count;
        }
    }
    return globalStats;
}

// === NEW: Global Stats Display Update ===
function updateGlobalStatsDisplay() {
    const globalStats = calculateGlobalStats();
    const sortedStats = Object.entries(globalStats).sort((a, b) => b[1] - a[1]);
    const topN = sortedStats.slice(0, 15); // Show more for global, e.g., top 15

    if (topN.length === 0) {
        globalStatsContent.innerHTML = '<p class="info">No global character stats yet.</p>';
        return;
    }
    let statsHtml = topN.map(([char, count]) => {
        const pinyin = window.pinyinPro?.pinyin ? window.pinyinPro.pinyin(char, { toneType: 'symbol' }) : '';
        const rawDef = dictionary && dictionary[char] ? dictionary[char] : '...';
        const definition = rawDef.split(';')[0].split('/')[0];
        return `<div class="stat-item" onclick="window.showStrokes('${char}')"><span class="stat-char">${char}</span><span class="stat-pinyin">${pinyin}</span><span class="stat-english">${escapeHtml(definition)}</span><span class="stat-count">${count}</span></div>`;
    }).join('');
    globalStatsContent.innerHTML = `<div class="stats-list">${statsHtml}</div>`;
}


function closeHanziModal() {
    loopingChar = null; // Stop any animation loops
    // Closing the modal also cancels any in-flight video-subtitle poll (the
    // extract prompt lives in this modal) so it can't ambush the user by
    // force-opening the player ~30 min later after they've moved on.
    videoExtractToken++;
    modal.classList.remove('active');
    if (hanziWriter && typeof hanziWriter.cleanup === 'function') {
        hanziWriter.cleanup();
        hanziWriter = null; // Dereference
    }
    modalBody.innerHTML = "";
}

window.showStrokes = async (char) => {
    closeHanziModal();
    loopingChar = char; // Set the current character for the animation loop
    modalCloseBtn.style.display = ''; // keep the Close button visible so the view is dismissable

    // === NEW: Navigation logic ===
    const session = getActiveSession();
    let charList = [];
    if (session && session.stats) {
        charList = Object.keys(session.stats);
    }
    const currentIndex = charList.indexOf(char);
    const prevChar = currentIndex > 0 ? charList[currentIndex - 1] : null;
    const nextChar = currentIndex < charList.length - 1 ? charList[currentIndex + 1] : null;

    const prevBtnHtml = prevChar ? `<button id="hanzi-prev-btn" class="panel-btn" onclick="showStrokes('${prevChar}')">‹ Prev</button>` : `<button id="hanzi-prev-btn" class="panel-btn" disabled>‹ Prev</button>`;
    const nextBtnHtml = nextChar ? `<button id="hanzi-next-btn" class="panel-btn" onclick="showStrokes('${nextChar}')">Next ›</button>` : `<button id="hanzi-next-btn" class="panel-btn" disabled>Next ›</button>`;
    const pinyin = window.pinyinPro?.pinyin ? window.pinyinPro.pinyin(char, { toneType: 'symbol' }) : char;
    const fullDef = dictionary[char] || '(No definition found)';
    const shortDef = fullDef.split(';')[0].split('/')[0];

    modalTitle.textContent = ''; // Remove the title
    
    // === NEW: Add nav buttons to modal body ===
    modalBody.innerHTML = `
        <div id="stroke-target"></div>
        <div id="hanzi-modal-info">
            <div id="hanzi-modal-pinyin" onclick="window.requestSpeech('${char}')">${pinyin}</div>
            <div id="hanzi-modal-def" onclick="window.showText('Definition for ${char}', '${fullDef.replace(/'/g, '&#39;').replace(/"/g, '&quot;')}')">${escapeHtml(shortDef)}</div>
        </div>
        <div id="hanzi-modal-details">
            <div class="hanzi-modal-components component-list loading">Fetching components...</div>
            <div class="hanzi-modal-equation loading">Fetching equation...</div>
            <div class="hanzi-modal-mnemonic loading">Fetching mnemonic...</div>
        </div>
        <div id="hanzi-phonetic" class="hanzi-phonetic"></div>
        <div id="hanzi-modal-controls">
            ${prevBtnHtml} ${nextBtnHtml}
        </div>
        <div class="hanzi-modal-actions">
            <button class="panel-btn" onclick="shortcutToAddInfo('${char}', 'hanzi-modal')">Add Info</button>
        </div>
    `;
    
    modal.classList.add('active');

    // --- Fetch and render details ---
    const componentsEl = document.querySelector('.hanzi-modal-components');
    const equationEl = document.querySelector('.hanzi-modal-equation');
    const mnemonicEl = document.querySelector('.hanzi-modal-mnemonic');

    // 1. Check custom DB
    if (customDbData?.[char]) {
        const localData = customDbData[char];
        const localComponents = localData.equation ? localData.equation.replace(/[+=()0-9a-z]/g, ' ').trim().split(' ').filter(Boolean).map(c => `<div class="component-item-wrapper"><button class="component-item" onclick="getRadicalInfo('${c}')">${c}</button></div>`).join('') : '';
        componentsEl.innerHTML = localComponents;
        equationEl.textContent = localData.equation || '';
        mnemonicEl.textContent = localData.mnemonic || '';
        componentsEl.classList.remove('loading');
        equationEl.classList.remove('loading');
        mnemonicEl.classList.remove('loading');
    } else {
        // 2. Fallback to AI
        try {
            // Fetch stroke/component metadata here (not before the modal opens) so
            // the card appears instantly and only this slow branch waits on it.
            const metadata = await fetchCharacterMetadata(char);
            const response = await fetch(`${backendUrl}/radical-info`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ char, pinyin, definition: shortDef, components: metadata.components, strokeCount: metadata.strokeCount })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'AI API error');

            const formatted = (data.componentsDetail || []).map(entry => {
                const part = (entry && (entry.component || entry.name)) || (typeof entry === 'string' ? entry : '');
                const gloss = (entry && (entry.meaning || entry.gloss || entry.note)) || '';
                if (typeof entry === 'string' && !chineseCharRegex.test(entry)) return `<span class="component-separator">${entry}</span>`;
                return `<div class="component-item-wrapper"><button class="component-item" title="${gloss}" onclick="getRadicalInfo('${part}')">${part}</button><div class="component-meaning">${gloss || '&nbsp;'}</div></div>`;
            }).join('');

            componentsEl.innerHTML = formatted;
            equationEl.textContent = data.explanation || '';
            mnemonicEl.textContent = data.mnemonic || '';
        } catch (error) {
            equationEl.textContent = `Error: ${error.message}`;
            mnemonicEl.textContent = '';
            componentsEl.textContent = '';
        } finally {
            componentsEl.classList.remove('loading');
            equationEl.classList.remove('loading');
            mnemonicEl.classList.remove('loading');
        }
    }

    const createWriter = () => {
        if (hanziWriter && typeof hanziWriter.cleanup === 'function') {
            hanziWriter.cleanup();
        }
        hanziWriter = null;
        document.getElementById('stroke-target').innerHTML = '';
        const options = {
            width: 200,
            height: 200,
            showOutline: true,
            strokeAnimationSpeed: 1,
            delayBetweenStrokes: 250,
            padding: 20
        };
        hanziWriter = HanziWriter.create('stroke-target', char, options);
        loopAnimation();
    }

    function loopAnimation() {
        // Only loop if this is the currently active character animation
        if (hanziWriter && loopingChar === char) {
            hanziWriter.animateCharacter({
                onComplete: function() {
                    // Check again in case the user navigated while the animation was playing
                    if(hanziWriter && loopingChar === char) setTimeout(loopAnimation, 500);
                }
            });
        }
    }
    
    createWriter();
    loadPhoneticSeries(char);
}

// Phonetic-series explorer: fetch the family of characters that share this
// character's phonetic component, enrich each with pinyin + short meaning, and
// highlight the ones the learner already knows. Learning one member of a
// phonetic family gives a foothold on the rest.
async function loadPhoneticSeries(char) {
    const el = document.getElementById('hanzi-phonetic');
    if (!el) return;
    el.innerHTML = '';
    let data;
    try {
        const resp = await fetch(`${backendUrl}/phonetic-series/${encodeURIComponent(char)}`);
        data = await resp.json();
        if (!resp.ok) throw new Error(data.error || 'lookup failed');
    } catch (_) { return; } // silent — this is a bonus panel
    if (!data || !data.phonetic || !Array.isArray(data.family) || data.family.length < 2) return;

    const known = buildKnownCharSet();
    const py = c => window.pinyinPro?.pinyin ? window.pinyinPro.pinyin(c, { toneType: 'symbol' }) : '';
    const toneOf = c => (typeof readerToneNumber === 'function') ? readerToneNumber(c) : '5';
    const shortDef = c => ((dictionary && dictionary[c]) || '').split(';')[0].split('/')[0].replace(/\[.*?\]|\(.*?\)/g, '').trim();

    // Put the phonetic root first, then the queried char, then the rest.
    const ordered = data.family.slice().sort((a, b) => {
        const rank = c => c === data.phonetic ? 0 : (c === char ? 1 : 2);
        return rank(a) - rank(b);
    });

    const chips = ordered.map(c => {
        const isKnown = known.has(c);
        const isSelf = c === char;
        const isRoot = c === data.phonetic;
        const cls = `phonetic-chip tone-${toneOf(c)}${isKnown ? ' known' : ''}${isSelf ? ' self' : ''}${isRoot ? ' root' : ''}`;
        const def = escapeHtml(truncateDefinition(shortDef(c), 3));
        return `<button class="${cls}" onclick="window.showStrokes('${c}')" title="${escapeHtml(py(c))}${def ? ' · ' + def : ''}">
            <span class="phonetic-hanzi">${escapeHtml(c)}</span>
            <span class="phonetic-py">${escapeHtml(py(c))}</span>
        </button>`;
    }).join('');

    const knownCount = ordered.filter(c => known.has(c)).length;
    el.innerHTML = `
        <div class="phonetic-head">
            <span class="phonetic-title">Phonetic family: <b class="tone-${toneOf(data.phonetic)}">${escapeHtml(data.phonetic)}</b></span>
            <span class="phonetic-count">${knownCount}/${ordered.length} known</span>
        </div>
        <div class="phonetic-grid">${chips}</div>`;
}

window.showText = (title, text) => {
    closeHanziModal();
    modalTitle.textContent = title;
    modalBody.innerHTML = '';
    const p = document.createElement('p');
    p.textContent = text; // definitions/AI text as text, not HTML (avoids injection & broken layout)
    modalBody.appendChild(p);
    modal.classList.add('active');
}

function showModal(title, content) {
    closeHanziModal();
    modalTitle.textContent = title;
    modalBody.innerHTML = content;
    modalCloseBtn.style.display = ''; // restore the Close button (showStrokes hides it)
    modal.classList.add('active');
}

function truncateDefinition(text, wordLimit = 3) {
    if (!text || typeof text !== 'string') return '';
    // Improved splitting to handle definitions with slashes better
    const parts = text.split(/[\s/;]+/); // Split by space, slash, or semicolon
    const words = parts.filter(p => p.trim() !== ''); // Remove empty strings
    if (words.length > wordLimit) {
        return words.slice(0, wordLimit).join(' ') + '...';
    }
    // Return original (cleaned) if shorter or equal
    return words.join(' ');
}


// === UPDATED: Function to generate the new char list format ===
function generateCharacterListHtml(chineseText) {
    if (!chineseText) return '';

    let itemsHtml = '';    
    let charCountSinceBreak = 0;
    const maxCharsBeforeBreakOnComma = 4;
    let currentLineHtml = ''; // Build line HTML

    const flushLine = (isLastLine = false) => {
        if (currentLineHtml) {
            itemsHtml += `<div class="char-list-line">${currentLineHtml}</div>`;
            if (!isLastLine) {
                // itemsHtml += `<span class="char-list-break"></span>`; // Break is handled by flex-direction
            }
        }
        currentLineHtml = '';
        charCountSinceBreak = 0;
    };

    for (let i = 0; i < chineseText.length; i++) {
        const char = chineseText[i];

        if (chineseCharRegex.test(char)) {
            const pinyin = window.pinyinPro?.pinyin ? window.pinyinPro.pinyin(char, { toneType: 'symbol' }) : char;
            const fullDef = dictionary[char] || 'n/a';
            const shortDef = truncateDefinition(fullDef.split(';')[0].split('/')[0].replace(/\[.*?\]|\(.*?\)/g, '').trim());
            const escapedChar = char.replace(/'/g, "\\'").replace(/"/g, '&quot;');
            const escapedFullDef = fullDef.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
            
            currentLineHtml += `<div class="char-list-item" data-char="${char}" data-pinyin="${pinyin}" data-def="${escapedFullDef}" onclick="toggleCardSelection(this, event)">
                <div class="char-list-char" onclick="event.stopPropagation(); window.showStrokes('${escapedChar}')">${char}</div>
                <div class="char-list-pinyin" onclick="event.stopPropagation(); window.requestSpeech('${escapedChar}')">${pinyin}</div>
                <div class="char-list-english" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 60px;" onclick="event.stopPropagation(); window.showText('Def. for ${char}', '${escapedFullDef}')" title="${escapeHtml(fullDef)}">${escapeHtml(shortDef)}</div>
            </div>`;
            charCountSinceBreak++;
        } else if (numberRegex.test(char)) { // Handle numbers
            currentLineHtml += `<div class="char-list-item number-item">
                <div class="char-list-char">${char}</div>
                <div class="char-list-pinyin">&nbsp;</div>
                <div class="char-list-english">&nbsp;</div>
            </div>`;
            charCountSinceBreak++; // Count numbers towards break limit
        } else if (char === '。' || char === '.') {
            currentLineHtml += `<span class="char-list-punctuation">${char}</span>`;
            flushLine();
        } else if (char === '，' || char === ',') {
            currentLineHtml += `<span class="char-list-punctuation">${char}</span>`;
            if (charCountSinceBreak > maxCharsBeforeBreakOnComma) {
                flushLine();
            }
        } else if (punctuationRegex.test(char)) {
            currentLineHtml += `<span class="char-list-punctuation">${char}</span>`;
        }
        // Ignore spaces or other non-Chinese, non-punctuation chars
    }

    // Add play button for the last line if it wasn't ended by punctuation
    flushLine(true); // Flush any remaining content as the last line

    return `<div class="char-list-summary" tabindex="0">
        <h3>Character List</h3>
        <div class="char-list-container">${itemsHtml}</div>
    </div>`;
}


function downloadOutput() {
    const activeSessionId = document.querySelector('.history-item.active')?.dataset.id || currentSessionId;
    if (!activeSessionId) {
        alert("Please select a session to download."); return;
    }
    const activeSession = findSessionById(activeSessionId);
    if (!activeSession) {
        alert('Unable to locate that session.');
        return;
    }
    const mainStyles = document.querySelector('style').innerHTML;
    const downloadSpecificStyles = `
        body { height: auto; overflow: auto; } .main-container { display: block; }
        .glass-card { height: auto; max-width: 900px; margin: 2rem auto; }
        #finalOutput, #statsOutput, #global-stats-output { max-height: none; overflow-y: visible; }
        #top-controls-wrapper, #history-panel, #right-panel, #controls-toggle-btn, #dark-mode-toggle, #history-toggle-btn, #right-panel-toggle-btn, #enhance-controls, .top-right-controls, #center-toggle-controls,
        #fab-container { display: none !important; }
        #statsOutput, #global-stats-output { height: auto; } .header-icon-btn { display: none; }
        #stats-title, #global-stats-title { text-align: center; font-size: 1.1rem; padding: 0.5rem; margin: 0; }
        #stats-content, #global-stats-content { margin-top: 1rem; }
        /* UPDATED char list styles for download */
        .char-list-summary h3 { text-align: center; margin-top: 0; }
        .char-list-container { display: flex; flex-direction: column; gap: 0.3rem; }
        .char-list-line { display: flex; flex-wrap: wrap; align-items: flex-end; gap: 0.3rem 0.5rem; }
        .char-list-item { display: inline-flex; flex-direction: column; align-items: center; padding: 0.1rem 0.3rem; min-width: 40px; text-align: center; margin-bottom: 0.2rem; }
        .char-list-char { font-size: 1.5em; color: var(--text-main); line-height: 1.1; cursor: pointer; }
        .char-list-pinyin { font-size: 0.75em; color: var(--text-secondary); cursor: pointer; margin-top: 0.1rem; }
        .char-list-english { font-size: 0.65em; color: var(--text-subtle); cursor: pointer; margin-top: 0.1rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 50px; }
        .char-list-punctuation { font-size: 1.5em; color: var(--text-secondary); margin: 0 0.1rem; display: inline-flex; align-items: flex-end; padding-bottom: 0.1rem;}
        .char-list-line-play { display: none; } /* Hide play buttons in download */
    `;
    const content = activeSession.breakdownHtml;
    const stats = generateStatsHtmlForSession(activeSession.stats);
    const globalStats = calculateGlobalStats(); // Get current global stats
    const globalStatsHtml = generateGlobalStatsHtmlForDownload(globalStats); // Generate HTML for download

    const htmlString = `
        <!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Transcription - ${activeSession.name || activeSession.date}</title>
        <script src="https://cdn.jsdelivr.net/npm/hanzi-writer@3.5/dist/hanzi-writer.min.js"><\/script>
        <style>${mainStyles} ${downloadSpecificStyles}<\/style>
        </head><body data-theme="${document.body.dataset.theme || 'light'}"><div class="glass-card">
            <h1>Transcription: ${activeSession.name || activeSession.date}</h1>
            <div id="finalOutput">${content}</div>
            <div id="statsOutput">${stats}</div>
            <div id="global-stats-output">${globalStatsHtml}</div>
        </div>
        <div id="main-modal"><div id="modal-content"><h3 id="modal-title"></h3><div id="modal-body"></div><button id="modal-close-btn">Close</button></div></div>
        <script>
            let hanziWriter = null;
            const modal = document.getElementById('main-modal');

            function closeHanziModal() {
                modal.classList.remove('active');
                if (hanziWriter) { hanziWriter = null; }
                document.getElementById('modal-body').innerHTML = "";
            }
            
            // Simplified showStrokes for downloaded file
            window.showStrokes = (char) => {
                closeHanziModal();
                const pinyin = "Loading..."; // Pinyin lib not included in download
                const definition = "Loading...";
                const strokeCount = "N/A";
            
                modalTitle.textContent = \`Stroke Order for '\${char}'\`;
                modalBody.innerHTML = \`
                    <div id="stroke-target"></div>
                    <div id="hanzi-modal-info">
                        <div id="hanzi-modal-pinyin">\${pinyin}</div>
                        <div id="hanzi-modal-def">\${definition}</div>
                        <div id="hanzi-modal-stats">Stroke Count: \${strokeCount}</div>
                    </div>
                    <div id="hanzi-modal-controls">
                        <button id="hanzi-reload-btn">Reload Animation</button>
                    </div>
                \`;
                modal.classList.add('active');
            
                const createWriter = () => {
                    if (hanziWriter) hanziWriter = null;
                    document.getElementById('stroke-target').innerHTML = '';
                    hanziWriter = HanziWriter.create('stroke-target', char, {
                        width: 200, height: 200, showOutline: true, strokeAnimationSpeed: 1,
                        delayBetweenStrokes: 250, padding: 20
                    });
                    loopAnimation();
                }
            
                function loopAnimation() {
                    if (hanziWriter) {
                        hanziWriter.animateCharacter({
                            onComplete: function() {
                                if(hanziWriter) setTimeout(loopAnimation, 500);
                            }
                        });
                    }
                }
                
                document.getElementById('hanzi-reload-btn').addEventListener('click', createWriter);
                createWriter();
            }

            window.showText = (title, text) => {
                closeHanziModal();
                document.getElementById('modal-title').textContent = title;
                document.getElementById('modal-body').innerHTML = \`<p>\${text}</p>\`;
                modal.classList.add('active');
            }

            window.requestSpeech = (text) => { console.log('Speech requested for:', text); alert('Speech synthesis is not available in this downloaded file.'); }
            window.playSentenceWithHighlight = (text, el) => { console.log('Speech requested for:', text); alert('Speech synthesis is not available in this downloaded file.'); }
            

            modal.addEventListener('click', closeHanziModal);
            document.getElementById('modal-content').addEventListener('click', (e) => e.stopPropagation());
            document.getElementById('modal-close-btn').addEventListener('click', closeHanziModal);
        <\/script></body></html>`;
    const blob = new Blob([htmlString], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transcription-${activeSession.id}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// === NEW: Helper for generating global stats HTML for downloads ===
function generateGlobalStatsHtmlForDownload(globalStats) {
    const sortedStats = Object.entries(globalStats).sort((a, b) => b[1] - a[1]);
    const topN = sortedStats.slice(0, 15); // Match display logic

    if (topN.length === 0) {
        return '<h3 id="global-stats-title">Global Character Stats</h3><div id="global-stats-content"><p class="info">No global character stats yet.</p></div>';
    }
    let statsHtml = topN.map(([char, count]) => {
        const pinyin = "N/A"; // Pinyin lib not available
        const definition = "N/A"; // Dictionary not available
        return `<div class="stat-item"><span class="stat-char">${char}</span><span class="stat-pinyin">${pinyin}</span><span class="stat-english">${escapeHtml(definition)}</span><span class="stat-count">${count}</span></div>`;
    }).join('');
    return `<h3 id="global-stats-title">Global Character Stats</h3><div id="global-stats-content"><div class="stats-list">${statsHtml}</div></div>`;
}

function deleteSessionsByCategory(category) {
    sessionHistory = sessionHistory.filter(s => !s.categories || !s.categories.includes(category));
    saveHistory();
    renderHistory();
    finalOutput.innerHTML = `<p class='info'>Cleared all "${CATEGORIES[category].label}" sessions.</p>`;
}

function downloadAllOutput() {
    if (sessionHistory.length === 0) { alert("No sessions to download."); return; }
    const mainStyles = document.querySelector('style').innerHTML;
    const downloadSpecificStyles = `
        body { height: auto; overflow: auto; } .main-container { display: block; }
        #finalOutput, #statsOutput, #global-stats-output { max-height: none; overflow-y: visible; }
        #top-controls-wrapper, #history-panel, #right-panel, #controls-toggle-btn, #dark-mode-toggle, #history-toggle-btn, #right-panel-toggle-btn, #enhance-controls, .top-right-controls, #center-toggle-controls,
        #fab-container { display: none !important; }
        .glass-card { height: auto; max-width: 900px; margin: 2rem auto; } .header-icon-btn { display: none; }
        #statsOutput, #global-stats-output { height: auto; }
        #stats-title, #global-stats-title { text-align: center; font-size: 1.1rem; padding: 0.5rem; margin: 0; }
        #stats-content, #global-stats-content { margin-top: 1rem; }
        /* UPDATED char list styles for download */
        .char-list-summary h3 { text-align: center; margin-top: 0; }
        .char-list-container { display: flex; flex-direction: column; gap: 0.3rem; }
        .char-list-line { display: flex; flex-wrap: wrap; align-items: flex-end; gap: 0.3rem 0.5rem; }
        .char-list-item { display: inline-flex; flex-direction: column; align-items: center; padding: 0.1rem 0.3rem; min-width: 40px; text-align: center; margin-bottom: 0.2rem; }
        .char-list-char { font-size: 1.5em; color: var(--text-main); line-height: 1.1; cursor: pointer; }
        .char-list-pinyin { font-size: 0.75em; color: var(--text-secondary); cursor: pointer; margin-top: 0.1rem; }
        .char-list-english { font-size: 0.65em; color: var(--text-subtle); cursor: pointer; margin-top: 0.1rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 50px; }
        .char-list-punctuation { font-size: 1.5em; color: var(--text-secondary); margin: 0 0.1rem; display: inline-flex; align-items: flex-end; padding-bottom: 0.1rem;}
        .char-list-line-play { display: none; }
    `;
    const globalStats = calculateGlobalStats(); // Calculate once
    const globalStatsHtml = generateGlobalStatsHtmlForDownload(globalStats); // Generate HTML once

    let allSessionsHtml = [...sessionHistory].reverse().map(session => {
        // We can't regenerate char list HTML without the dictionary, so we'll use the saved one
        const statsHtml = generateStatsHtmlForSession(session.stats, true); // Pass 'true' to skip pinyin/def
        let finalBreakdownHtml = session.breakdownHtml;

        return `<div class="glass-card">
            <h2>${session.name || session.date}</h2>
            <div id="finalOutput">${finalBreakdownHtml}</div>
            <div id="statsOutput">${statsHtml}</div>
            </div>`; // Global stats added once below
    }).join('');

    const htmlString = `
        <!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>All Transcriptions</title>
        <script src="https://cdn.jsdelivr.net/npm/hanzi-writer@3.5/dist/hanzi-writer.min.js"><\/script>
        <style>${mainStyles} ${downloadSpecificStyles}<\/style>
        </head><body data-theme="${document.body.dataset.theme || 'light'}"><h1>All Saved Transcriptions</h1>${allSessionsHtml}
        <div class="glass-card">
            <div id="global-stats-output">${globalStatsHtml}</div>
        </div>
        <div id="main-modal"><div id="modal-content"><h3 id="modal-title"></h3><div id="modal-body"></div><button id="modal-close-btn">Close</button></div></div>
        <script>
            let hanziWriter = null;
            const modal = document.getElementById('main-modal');

            function closeHanziModal() {
                modal.classList.remove('active');
                if (hanziWriter) { hanziWriter = null; }
                document.getElementById('modal-body').innerHTML = "";
            }

            // Simplified showStrokes for downloaded file
            window.showStrokes = (char) => {
                closeHanziModal();
                const pinyin = "Loading..."; // Pinyin lib not included in download
                const definition = "Loading...";
                const strokeCount = "N/A";
            
                modalTitle.textContent = \`Stroke Order for '\${char}'\`;
                modalBody.innerHTML = \`
                    <div id="stroke-target"></div>
                    <div id="hanzi-modal-info">
                        <div id="hanzi-modal-pinyin">\${pinyin}</div>
                        <div id="hanzi-modal-def">\${definition}</div>
                        <div id="hanzi-modal-stats">Stroke Count: \${strokeCount}</div>
                    </div>
                    <div id="hanzi-modal-controls">
                        <button id="hanzi-reload-btn">Reload Animation</button>
                    </div>
                \`;
                modal.classList.add('active');
            
                const createWriter = () => {
                    if (hanziWriter) hanziWriter = null;
                    document.getElementById('stroke-target').innerHTML = '';
                    hanziWriter = HanziWriter.create('stroke-target', char, {
                        width: 200, height: 200, showOutline: true, strokeAnimationSpeed: 1,
                        delayBetweenStrokes: 250, padding: 20
                    });
                    loopAnimation();
                }
            
                function loopAnimation() {
                    if (hanziWriter) {
                        hanziWriter.animateCharacter({
                            onComplete: function() {
                                if(hanziWriter) setTimeout(loopAnimation, 500);
                            }
                        });
                    }
                }
                
                document.getElementById('hanzi-reload-btn').addEventListener('click', createWriter);
                createWriter();
            }

            window.showText = (title, text) => {
                closeHanziModal();
                document.getElementById('modal-title').textContent = title;
                document.getElementById('modal-body').innerHTML = \`<p>\${text}</p>\`;
                modal.classList.add('active');
            }

            window.requestSpeech = (text) => { console.log('Speech requested for:', text); alert('Speech synthesis is not available in this downloaded file.'); }
            window.playSentenceWithHighlight = (text, el) => { console.log('Speech requested for:', text); alert('Speech synthesis is not available in this downloaded file.'); }
            

            modal.addEventListener('click', closeHanziModal);
            document.getElementById('modal-content').addEventListener('click', (e) => e.stopPropagation());
            document.getElementById('modal-close-btn').addEventListener('click', closeHanziModal);
        <\/script></body></html>`;
    const blob = new Blob([htmlString], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `all_transcriptions.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function generateStatsHtmlForSession(stats, isDownloadAll = false) {
    const statsToDisplay = stats || {};
    const sortedStats = Object.entries(statsToDisplay).sort((a, b) => b[1] - a[1]);
    const topN = sortedStats.slice(0, 8);
    let contentHtml;
    if (topN.length === 0) {
        contentHtml = '<p class="info">No stats for this session.</p>';
    } else {
        let statsHtml = topN.map(([char, count]) => {
            const pinyin = (isDownloadAll || !window.pinyinPro) ? "N/A" : window.pinyinPro.pinyin(char, { toneType: 'symbol' });
            const definition = (isDownloadAll || !dictionary) ? "N/A" : (dictionary[char] || '...').split(';')[0].split('/')[0];
            return `<div class="stat-item"><span class="stat-char">${char}</span><span class="stat-pinyin">${pinyin}</span><span class="stat-english">${escapeHtml(definition)}</span><span class="stat-count">${count}</span></div>`;
        }).join('');
        contentHtml = `<div class="stats-list">${statsHtml}</div>`;
    }
    return `<h3 id="stats-title">Character Stats</h3><div id="stats-content">${contentHtml}</div>`;
}

// === NEW: Update selected char count ===
function updateSelectedCount() {
    const selected = document.querySelectorAll('#finalOutput .selected');
    const uniqueChars = new Set();
    selected.forEach(el => uniqueChars.add(el.dataset.char));
    if (addToDeckBtn) addToDeckBtn.textContent = `Add (${uniqueChars.size}) Selected`;
    updateSelectionPill(uniqueChars.size);
}

// VIS-06: a floating pill so the "add these words to a deck" action is visible
// out in the session (not only inside the flashcard modal). Tapping it opens
// Flashcards, where "Add (N) Selected" completes the flow.
function updateSelectionPill(count) {
    let pill = document.getElementById('fc-selection-pill');
    if (!pill) {
        pill = document.createElement('button');
        pill.id = 'fc-selection-pill';
        pill.type = 'button';
        pill.addEventListener('click', () => showFlashcardModal());
        document.body.appendChild(pill);
    }
    if (count > 0) {
        pill.innerHTML = `<span class="fc-pill-count">${count}</span> selected · Add to deck`;
        pill.style.display = 'inline-flex';
    } else {
        pill.style.display = 'none';
    }
}

function toggleCardSelection(element, event) {
    if (event) event.stopPropagation();
    element.classList.toggle('selected');
    updateSelectedCount();
}

function selectAllCharacters() {
    // Select all selectable cards in the main output, including the character list
    const cards = document.querySelectorAll('#finalOutput .word-unit[data-char], #finalOutput .char-list-item[data-char]');
    // Check if we should select all or deselect all
    const shouldSelect = Array.from(cards).some(card => !card.classList.contains('selected'));
    cards.forEach(card => {
        card.classList.toggle('selected', shouldSelect);
    });
    updateSelectedCount();
}


// ===================================
// ======== FLASHCARD SYSTEM =========
// ===================================

function saveFlashcards() {
    normalizeFlashcardStore();
    try {
        localStorage.setItem('flashcardStore', JSON.stringify(flashcardStore));
    } catch (error) {
        console.warn('Unable to persist flashcards.', error);
    }
    updateFlashcardsLauncherBadge();
}

function loadFlashcards() {
    try {
        const saved = localStorage.getItem('flashcardStore');
        if (saved) {
            flashcardStore = JSON.parse(saved);
        }
    } catch (error) {
        console.warn('Flashcard data could not be parsed. Resetting.', error);
        flashcardStore = { decks: [], activeDeckId: null };
    }
    normalizeFlashcardStore();
    renderDeckManager();
}

function normalizeFlashcardStore() {
    if (!flashcardStore || typeof flashcardStore !== 'object') {
        flashcardStore = { decks: [], activeDeckId: null };
    }
    flashcardStore.decks = Array.isArray(flashcardStore.decks) ? flashcardStore.decks : [];
    flashcardStore.decks.forEach(deck => {
        if (!deck.id) {
            deck.id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
        }
        deck.cards = Array.isArray(deck.cards) ? deck.cards : [];
        const seen = new Set();
        deck.cards = deck.cards.filter(card => {
            if (!card || !card.char) return false;
            ensureCardSchema(card);
            if (seen.has(card.char)) return false;
            seen.add(card.char);
            return true;
        });
    });
    if (!flashcardStore.activeDeckId && flashcardStore.decks.length > 0) {
        flashcardStore.activeDeckId = flashcardStore.decks[0].id;
    }
}

function createEmptyStats() {
    return {
        correct: 0,
        incorrect: 0,
        streak: 0,
        ease: 2.5,
        interval: 0,
        due: Date.now(),
        lastReviewed: null,
        lapses: 0,
        lastResult: null
    };
}

function ensureCardSchema(card) {
    if (!card) return;
    card.char = card.char || '';
    card.pinyin = card.pinyin || '';
    card.def = card.def || '';
    card.sentence = card.sentence || ''; // source sentence (Context Resurrection)
    if (!card.id) {
        card.id = `${card.char}-${Math.random().toString(36).slice(2, 8)}`;
    }
    if (!card.stats || typeof card.stats !== 'object') {
        card.stats = createEmptyStats();
    } else {
        card.stats = {
            ...createEmptyStats(),
            ...card.stats
        };
        card.stats.due = card.stats.due || Date.now();
        card.stats.ease = card.stats.ease || 2.5;
    }
    if (typeof card.suspended !== 'boolean') {
        card.suspended = false;
    }
    if (!card.createdAt) {
        card.createdAt = Date.now();
    }
}

function getActiveDeck() {
    return flashcardStore.decks.find(deck => deck.id === flashcardStore.activeDeckId) || null;
}

function selectDeck(deckId) {
    flashcardStore.activeDeckId = deckId;
    if (deckSelector) {
        deckSelector.value = deckId || '';
    }
    renderDeckManager();
    saveFlashcards();
}

function showFlashcardModal() {
    flashcardModal.style.display = 'flex';
    showDeckManager();
    renderDeckManager();
    updateSelectedCount();
}

function showDeckManager() {
    resetFlashcardWriters();
    currentTestSession = null;
    flashcardFeedback.textContent = '';
    flashcardMain?.classList.remove('view-mode');
    // Deck Home shows the new grid; deck actions/settings live in the deck sheet.
    if (typeof closeDeckSheet === 'function') closeDeckSheet();
    deckManager.style.display = 'flex';
    if (deckDetails) deckDetails.style.display = 'flex';
    flashcardModal.classList.remove('fullscreen-view');
    flashcardEl.style.width = ''; // Reset game mode size override
    flashcardEl.style.height = ''; // Reset game mode size override
    // Reset button display when exiting game mode
    flashcardAiBtn.style.display = ''; 
    flashcardFlipBtn.style.display = ''; 
    flashcardViewer.style.display = 'none';
    backToDecksBtn.style.display = 'none';
}

function computeDeckMetrics(deck) {
    if (!deck) {
        return { total: 0, active: 0, due: 0, newCards: 0, suspended: 0, accuracy: null };
    }
    const now = Date.now();
    let due = 0;
    let newCards = 0;
    let suspended = 0;
    let attempts = 0;
    let correct = 0;

    deck.cards.forEach(card => {
        ensureCardSchema(card);
        if (card.suspended) {
            suspended++;
            return;
        }
        const stats = card.stats;
        const cardAttempts = (stats.correct || 0) + (stats.incorrect || 0);
        if (cardAttempts === 0) {
            newCards++;
        }
        if (stats.due <= now) {
            due++;
        }
        attempts += cardAttempts;
        correct += stats.correct || 0;
    });

    const active = deck.cards.length - suspended;
    return {
        total: deck.cards.length,
        active,
        due,
        newCards,
        suspended,
        accuracy: attempts > 0 ? Math.round((correct / attempts) * 100) : null
    };
}

// === Deck Home (M2): a full-screen grid of deck cards with due/new/total chips,
// a progress bar, and a smart "Study" CTA — the flashcards landing screen. ===
function renderFcDeckGrid() {
    const grid = document.getElementById('fc-deck-grid');
    if (!grid) return;
    const decks = flashcardStore.decks;
    if (decks.length === 0) {
        grid.classList.add('fc-empty');
        grid.innerHTML = `<div class="fc-empty-state">
            <div class="fc-empty-emoji">🎴</div>
            <h3>No decks yet</h3>
            <p>Make a deck, then add words from any lesson, book, or video you process.</p>
            <button class="modal-btn primary" onclick="createNewDeck()">Create your first deck</button>
        </div>`;
        return;
    }
    grid.classList.remove('fc-empty');
    const cardsHtml = decks.map(d => {
        const m = computeDeckMetrics(d);
        const learned = m.active > 0 ? Math.round(100 * Math.max(0, m.active - m.newCards - m.due) / m.active) : 0;
        const label = m.due > 0 ? `Study ${m.due} due` : (m.newCards > 0 ? `Study ${m.newCards} new` : 'Review deck');
        const chips = [
            m.due > 0 ? `<span class="fc-chip fc-chip-due">${m.due} due</span>` : '',
            m.newCards > 0 ? `<span class="fc-chip fc-chip-new">${m.newCards} new</span>` : '',
            `<span class="fc-chip fc-chip-total">${m.total} card${m.total === 1 ? '' : 's'}</span>`
        ].join('');
        const active = d.id === flashcardStore.activeDeckId ? ' active' : '';
        return `<article class="fc-deck-card${active}" data-id="${escapeHtml(d.id)}">
            <button class="fc-deck-more-btn" aria-label="Deck options" onclick="fcOpenDeckDetails('${d.id}', event)">⋯</button>
            <div class="fc-deck-name">${escapeHtml(d.name)}</div>
            <div class="fc-deck-chips">${chips}</div>
            <div class="fc-deck-bar"><div class="fc-deck-bar-fill" style="width:${learned}%"></div></div>
            <button class="fc-deck-study-btn modal-btn primary" onclick="fcStartSmartSession('${d.id}', event)">${escapeHtml(label)}</button>
        </article>`;
    }).join('');
    grid.innerHTML = cardsHtml + `<button class="fc-new-deck-card" onclick="createNewDeck()">＋ New deck</button>`;
    grid.querySelectorAll('.fc-deck-card').forEach(el => {
        el.addEventListener('click', (e) => {
            if (e.target.closest('button')) return; // buttons handle themselves
            fcOpenDeckDetails(el.dataset.id, e);
        });
    });
}

// Smart Study CTA: make this deck active and start a session — due cards if any
// are due, otherwise a full review of the deck.
function fcStartSmartSession(deckId, event) {
    if (event) event.stopPropagation();
    selectDeck(deckId);
    const deck = getActiveDeck();
    if (!deck || deck.cards.length === 0) { showDeckManager(); return; }
    const m = computeDeckMetrics(deck);
    if (m.due > 0) startFlashcardSession('test', { dueOnly: true });
    else startFlashcardSession('test', {});
}

// Deck sheet (M4): the ⋯ / card body opens a bottom sheet (mobile) / side panel
// (desktop) with this deck's actions, cards and settings. The existing legacy
// controls are relocated into the sheet once (ids preserved) so every handler
// keeps working; activeDeckId stays the single source of "which deck".
function fcOpenDeckDetails(deckId, event) {
    openDeckSheet(deckId, event);
}

function openDeckSheet(deckId, event) {
    if (event) event.stopPropagation();
    if (deckId) selectDeck(deckId);
    const sheet = document.getElementById('fc-deck-sheet');
    const body = document.getElementById('fc-sheet-body');
    if (!sheet || !body) return;
    const keepalive = document.getElementById('fc-legacy-keepalive');
    if (keepalive && keepalive.parentElement !== body) { keepalive.hidden = false; body.appendChild(keepalive); }
    const deck = getActiveDeck();
    const title = document.getElementById('fc-sheet-title');
    if (title) title.textContent = deck ? deck.name : 'Deck';
    const counts = document.getElementById('fc-sheet-counts');
    if (counts) {
        if (deck) {
            const m = computeDeckMetrics(deck);
            counts.textContent = `${m.total} card${m.total === 1 ? '' : 's'} · ${m.due} due · ${m.newCards} new${m.suspended ? ` · ${m.suspended} paused` : ''}`;
        } else counts.textContent = '';
    }
    renderDeckManager();
    renderPresetControl();
    sheet.classList.add('open');
    document.getElementById('fc-deck-scrim')?.classList.add('open');
}

function closeDeckSheet() {
    document.getElementById('fc-deck-sheet')?.classList.remove('open');
    document.getElementById('fc-deck-scrim')?.classList.remove('open');
}

function renameActiveDeck() {
    const deck = getActiveDeck();
    if (!deck) return;
    const name = prompt('Rename deck:', deck.name);
    if (name === null) return;
    const trimmed = name.trim();
    if (!trimmed) return;
    deck.name = trimmed;
    saveFlashcards();
    renderDeckManager();
    const title = document.getElementById('fc-sheet-title');
    if (title) title.textContent = deck.name;
}

// Keep the launcher card's "N due today" subtitle current (total across all decks).
function updateFlashcardsLauncherBadge() {
    const sub = document.getElementById('flashcards-launcher-sub');
    if (!sub) return;
    const now = Date.now();
    let due = 0;
    (flashcardStore.decks || []).forEach(d => (d.cards || []).forEach(c => {
        if (c && !c.suspended && c.stats && c.stats.due <= now) due++;
    }));
    sub.textContent = due > 0 ? `${due} due today` : 'Review your decks';
}

function renderDeckManager() {
    normalizeFlashcardStore();
    const deck = getActiveDeck();
    renderFcDeckGrid();            // the new Deck Home grid
    updateFlashcardsLauncherBadge();

    if (flashcardStore.decks.length === 0) {
        deckList.innerHTML = '<p class="info">No decks created.</p>';
        deckSelector.innerHTML = '<option value="">No decks</option>';
        renderDeckSummary(null);
        renderDeckCardTable(null);
        updateFlashcardButtons(null);
        return;
    }

    deckList.innerHTML = flashcardStore.decks.map(existingDeck => `
        <div class="deck-item ${existingDeck.id === flashcardStore.activeDeckId ? 'active' : ''}" data-id="${existingDeck.id}">
            <span>${escapeHtml(existingDeck.name)}</span>
            <span>${existingDeck.cards.length}</span>
        </div>
    `).join('');

    deckSelector.innerHTML = flashcardStore.decks.map(existingDeck =>
        `<option value="${existingDeck.id}" ${existingDeck.id === flashcardStore.activeDeckId ? 'selected' : ''}>${escapeHtml(existingDeck.name)}</option>`
    ).join('');

    const metrics = renderDeckSummary(deck);
    renderDeckCardTable(deck);
    updateFlashcardButtons(deck, metrics);
}

function renderDeckSummary(deck) {
    if (!deck) {
        deckSummary.innerHTML = '<p class="info">Create or choose a deck to begin.</p>';
        return { total: 0, active: 0, due: 0, newCards: 0, suspended: 0, accuracy: null };
    }
    if (deck.cards.length === 0) {
        // A deck IS selected, it's just empty — don't imply the user hasn't chosen one.
        deckSummary.innerHTML = '<p class="info">This deck is empty. Select words in a session, then tap “Add Selected” to fill it.</p>';
        return { total: 0, active: 0, due: 0, newCards: 0, suspended: 0, accuracy: null };
    }
    const metrics = computeDeckMetrics(deck);
    // Use simpler HTML structure for the CSS grid.
    deckSummary.innerHTML = `
        <div class="summary-row"><span>Total cards</span><span class="summary-value">${metrics.total}</span></div>
        <div class="summary-row"><span>Due now</span><span class="summary-value" style="color: var(--danger-color); font-weight:bold;">${metrics.due}</span></div>
        <div class="summary-row"><span>New</span><span class="summary-value" style="color: var(--accent-color);">${metrics.newCards}</span></div>
        <div class="summary-row"><span>Accuracy</span><span class="summary-value">${metrics.accuracy !== null ? metrics.accuracy + '%' : '—'}</span></div>
    `;
    return metrics;
}

function renderDeckCardTable(deck) {
    if (!deck || deck.cards.length === 0) {
        deckCardTable.innerHTML = '<p class="info">No cards yet. Add characters from a session to begin.</p>';
        return;
    }

    deckCardTable.innerHTML = deck.cards.map(card => {
        ensureCardSchema(card);
        const stats = card.stats;
        const totalAttempts = (stats.correct || 0) + (stats.incorrect || 0);
        const accuracy = totalAttempts > 0 ? Math.round((stats.correct / totalAttempts) * 100) : null;
        const dueLabel = totalAttempts === 0 ? 'New' : formatDueTimestamp(stats.due);
        return `
            <div class="deck-card-row ${card.suspended ? 'suspended' : ''}" data-card-id="${card.id}">
                <div class="deck-card-char">${card.char}</div>
                <div>
                    <div>${card.pinyin || '&nbsp;'}</div>
                    <div class="deck-card-meaning">${card.def || ''}</div>
                </div>
                <div class="deck-card-score">${accuracy === null ? '—' : `${accuracy}%`}</div>
                <div class="deck-card-actions">
                    <span class="deck-card-due">${dueLabel}</span>
                    <button class="card-toggle-btn" data-card-id="${card.id}">${card.suspended ? 'Resume' : 'Pause'}</button>
                    <button class="card-reset-btn" data-card-id="${card.id}">Reset</button>
                </div>
            </div>
        `;
    }).join('');
}

function updateFlashcardButtons(deck, metrics = null) {
    const hasDeck = !!deck;
    const hasCards = hasDeck && deck.cards.length > 0;
    const computed = metrics || computeDeckMetrics(deck);
    startStudyBtn.disabled = !hasCards;
    startTestBtn.disabled = !hasCards;
    reviewDueBtn.disabled = !hasCards || computed.due === 0;
    resetStatsBtn.disabled = !hasCards;
    downloadCsvBtn.disabled = !hasCards;
    addToDeckBtn.disabled = !hasDeck;
    deleteDeckBtn.disabled = !hasDeck;
}

function handleDeckTableClick(event) {
    const toggleBtn = event.target.closest('.card-toggle-btn');
    if (toggleBtn) {
        toggleCardSuspension(toggleBtn.dataset.cardId);
        return;
    }
    const resetBtn = event.target.closest('.card-reset-btn');
    if (resetBtn) {
        resetCardStats(resetBtn.dataset.cardId);
    }
}

function formatDueTimestamp(timestamp) {
    if (!timestamp) return 'New';
    const diff = timestamp - Date.now();
    if (diff <= 0) return 'Due now';
    const minutes = Math.round(diff / 60000);
    if (minutes < 60) return `In ${minutes} min`;
    const hours = Math.round(diff / 3600000);
    if (hours < 24) return `In ${hours} h`;
    const days = Math.round(diff / 86400000);
    return `In ${days} d`;
}

function createNewDeck() {
    const defaultName = `Deck ${flashcardStore.decks.length + 1}`;
    const deckName = prompt("Enter new deck name:", defaultName);
    if (!deckName) return;
    const trimmed = deckName.trim();
    if (!trimmed) return;
    const newDeck = {
        id: Date.now().toString(),
        name: trimmed,
        cards: []
    };
    flashcardStore.decks.push(newDeck);
    flashcardStore.activeDeckId = newDeck.id;
    saveFlashcards();
    renderDeckManager();
}

function deleteActiveDeck() {
    const deck = getActiveDeck();
    if (!deck) {
        alert("No deck selected.");
        return;
    }
    if (!confirm(`Delete the deck "${deck.name}"? This cannot be undone.`)) return;
    flashcardStore.decks = flashcardStore.decks.filter(d => d.id !== deck.id);
    flashcardStore.activeDeckId = flashcardStore.decks.length > 0 ? flashcardStore.decks[0].id : null;
    saveFlashcards();
    renderDeckManager();
}

function addSelectedCharsToDeck() {
    const deck = getActiveDeck();
    if (!deck) {
        alert("Please select or create a deck first.");
        return;
    }
    const selected = document.querySelectorAll('#finalOutput .selected');
    if (selected.length === 0) {
        alert("No characters selected.");
        return;
    }
    const existing = new Set(deck.cards.map(card => card.char));
    let addedCount = 0;
    selected.forEach(el => {
        const char = el.dataset.char;
        if (!char || existing.has(char)) return;
        const card = {
            char,
            pinyin: el.dataset.pinyin || window.pinyinPro?.pinyin(char, { toneType: 'symbol' }) || '',
            def: el.dataset.def || (dictionary?.[char] || '').split(';')[0] || ''
        };
        ensureCardSchema(card);
        deck.cards.push(card);
        existing.add(char);
        addedCount++;
    });
    if (addedCount === 0) {
        flashcardFeedback.textContent = 'All selected characters are already in this deck.';
    } else {
        flashcardFeedback.textContent = `Added ${addedCount} new ${addedCount === 1 ? 'card' : 'cards'} to "${deck.name}".`;
    }
    saveFlashcards();
    renderDeckManager();
    selected.forEach(el => el.classList.remove('selected'));
    updateSelectedCount();
}

function buildSessionCards(deck, options = {}) {
    const { dueOnly = false } = options;
    const now = Date.now();
    const filtered = deck.cards.filter(card => {
        ensureCardSchema(card);
        if (card.suspended) return false;
        if (!dueOnly) return true;
        const stats = card.stats;
        const attempts = (stats.correct || 0) + (stats.incorrect || 0);
        return stats.due <= now || attempts === 0;
    });
    return filtered
        .sort((a, b) => {
            const aAttempts = (a.stats.correct || 0) + (a.stats.incorrect || 0);
            const bAttempts = (b.stats.correct || 0) + (b.stats.incorrect || 0);
            if (aAttempts === 0 && bAttempts !== 0) return -1;
            if (bAttempts === 0 && aAttempts !== 0) return 1;
            return (a.stats.due || 0) - (b.stats.due || 0);
        });
}

function startFlashcardSession(mode = 'study', options = {}) {
    const deck = getActiveDeck();
    if (!deck || deck.cards.length === 0) {
        alert("This deck is empty.");
        return;
    }
    const cards = buildSessionCards(deck, options);
    if (cards.length === 0) {
        alert(options.dueOnly ? "No cards are due right now. Great job!" : "All cards in this deck are currently suspended.");
        return;
    }
    currentTestSession = {
        deckId: deck.id,
        mode,
        cards,
        answered: 0,
        correct: 0,
        wrong: 0,
        skipped: 0,
        total: cards.length,
        dueOnly: !!options.dueOnly,
        sessionStreak: 0,
        bestStreak: 0
    };
    currentFlashcardIndex = 0;
    fcAnswerLocked = false;
    if (typeof closeDeckSheet === 'function') closeDeckSheet();
    const streakChip = document.getElementById('fc-streak-chip');
    if (streakChip) streakChip.style.display = 'none';
    const fcSummaryEl = document.getElementById('fc-summary');
    if (fcSummaryEl) fcSummaryEl.style.display = 'none';
    deckManager.style.display = 'none';
    if (deckDetails) deckDetails.style.display = 'none';
    flashcardMain?.classList.add('view-mode');
    flashcardModal.classList.add('fullscreen-view');
    flashcardViewer.style.display = 'flex';
    backToDecksBtn.style.display = 'inline-block';
    flashcardEl.classList.remove('flipped');
    
    // NEW: Check if it's the special game mode
    const isGameMode = options.dueOnly === true;

    flashcardTestControls.style.display = mode === 'test' ? 'flex' : 'none';
    testSkipBtn.style.display = mode === 'test' ? 'inline-flex' : 'none';
    flashcardAiBtn.style.display = isGameMode ? 'none' : 'flex';
    flashcardFlipBtn.style.display = isGameMode ? 'none' : 'flex';

    flashcardNav.querySelectorAll('.study-nav').forEach(btn => {
        btn.style.display = mode === 'study' ? 'flex' : 'none';
    });

    testScore.style.display = mode === 'test' ? 'block' : 'none';
    flashcardFeedback.textContent = mode === 'test'
        ? 'Answer each prompt, then mark it as right or wrong.'
        : 'Tap the card or use Next/Prev to study.';
    const focusModes = Object.entries(flashcardConfig.testModes)
        .filter(([, enabled]) => enabled)
        .map(([key]) => flashcardModeLabels[key])
        .filter(Boolean);
    if (mode === 'test') {
        testScore.textContent = `Score: 0 / ${currentTestSession.total}`;
        if (focusModes.length) {
            flashcardFeedback.textContent += ` Focus: ${focusModes.join(', ')}`;
        }
    }
    showFlashcard(0);
}

async function showFlashcard(index) {
    if (!currentTestSession) return;
    const cards = currentTestSession.cards;
    if (!cards || cards.length === 0) {
        finishFlashcardSession(false);
        return;
    }
    if (index < 0) index = cards.length - 1;
    if (index >= cards.length) index = index % cards.length;
    currentFlashcardIndex = index;
    const card = cards[index];
    flashcardEl.classList.remove('flipped');
    const renderToken = ++flashcardRenderToken;
    await Promise.all([
        renderCardFace(flashcardFront, flashcardConfig.front, card, 'front', renderToken),
        renderCardFace(flashcardBack, flashcardConfig.back, card, 'back', renderToken)
    ]);
    updateFlashcardProgress(card);
    updateSayFirstGate(card);
}

async function renderCardFace(target, types, card, faceKey, token) {
    target.className = `flashcard-face`;
    target.innerHTML = '';
    if (faceKey === 'back') target.classList.add('flashcard-face-back-detailed');

    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'flashcard-content-wrapper'; // Use a class for styling
    target.appendChild(contentWrapper);

    // Audio button (M3C): speak the character aloud without flipping the card.
    if (card && card.char) {
        const fcAudio = document.createElement('button');
        fcAudio.type = 'button';
        fcAudio.className = 'fc-audio-btn';
        fcAudio.setAttribute('aria-label', 'Play pronunciation');
        fcAudio.textContent = '🔊';
        fcAudio.addEventListener('click', (e) => { e.stopPropagation(); speakSmart(card.char); });
        target.appendChild(fcAudio);
    }

    // 2. Render Content
    for (const type of types) {
        const partEl = document.createElement('div');
        partEl.className = `flashcard-face-part ${type}`;

        if (type === 'char') {
            partEl.textContent = card.char;
        } else if (type === 'pinyin') {
            partEl.textContent = card.pinyin || window.pinyinPro?.pinyin(card.char, { toneType: 'symbol' });
        } else if (type === 'def') {
            partEl.textContent = truncateDefinition(card.def || dictionary?.[card.char] || '', 6);
        } else if (type === 'sentence') {
            if (card.sentence) {
                partEl.classList.add('flashcard-sentence');
                if (faceKey === 'front') {
                    partEl.textContent = card.sentence.split(card.char).join(' ＿＿ '); // cloze
                } else {
                    partEl.innerHTML = renderRubyLine(card.sentence, card.char);
                }
            }
        } else if (type === 'userMnemonic') {
            const userMnemonic = userMnemonics[card.char];
            if (userMnemonic) {
                partEl.innerHTML = `
                    <div class="flashcard-part-label">Your Mnemonic</div>
                    <p>${escapeHtml(userMnemonic)}</p>
                `;
            }
        } else if (type === 'components' && customDbData?.[card.char]?.equation) {
            const localData = customDbData[card.char];
            const localComponents = localData.equation.replace(/[+=()0-9a-z]/g, ' ').trim().split(' ').filter(Boolean);
            if (localComponents.length > 0) {
                partEl.classList.add('component-list'); // Use same class for styling
                partEl.innerHTML = localComponents.map(c => 
                    `<div class="component-item-wrapper">
                        <button class="component-item" onclick="event.stopPropagation(); getRadicalInfo('${c}')">${c}</button>
                    </div>`
                ).join('');
            }
        } else if (type === 'mnemonic' && customDbData?.[card.char]?.mnemonic) {
            partEl.innerHTML = `
                <div class="flashcard-part-label">Mnemonic</div>
                <p>${escapeHtml(customDbData[card.char].mnemonic)}</p>
            `;
        } else if (type === 'writing') {
            const writerHost = document.createElement('div');
            writerHost.className = 'flashcard-writer';
            partEl.appendChild(writerHost); // Add host to the DOM first

            // Cleanup previous writer to prevent memory leaks/freezing
            clearFlashcardWriter(faceKey);

            // Check token again before creating the writer to avoid race conditions
            if (token !== flashcardRenderToken) return;

            // Create writer immediately for better performance and responsiveness.
            try {
                const writer = HanziWriter.create(writerHost, card.char, {
                    width: 220, height: 220, padding: 10, showOutline: true, strokeAnimationSpeed: 1.5
                }); activeFlashcardWriters[faceKey] = writer; if (faceKey === 'front') writer.quiz(); else writer.animateCharacter();
            } catch(e) { console.warn(`Failed to create HanziWriter for ${card.char}`, e); }
        }
        contentWrapper.appendChild(partEl);
    }

    // 3. Add Action Bar
    if (faceKey === 'back') {
        const userMnemonic = userMnemonics[card.char];
        const userMnemonicHtml = userMnemonic ? `<div class="radical-user-mnemonic"><span>Your Mnemonic:</span><p>${escapeHtml(userMnemonic)}</p></div>` : '';
        const dbData = customDbData?.[card.char];
        const dbExplanationHtml = dbData?.equation ? `<div class="radical-explanation"><span></span><p>${escapeHtml(dbData.equation)}</p></div>` : '';
        const dbMnemonicHtml = dbData?.mnemonic ? `<div class="radical-mnemonic"><span></span><p>${escapeHtml(dbData.mnemonic)}</p></div>` : '';

        // NEW: Restructured HTML for a cleaner look
        const detailedHtml = `
            <div class="flashcard-back-content">
                <div class="flashcard-back-char" style="font-size: 200%; font-weight: bold;">${card.char}</div>
                <div class="flashcard-back-details">
                    <div class="radical-pinyin">${escapeHtml(card.pinyin || '')}</div>
                    <div class="radical-def">${escapeHtml(card.def || '')}</div>
                    ${userMnemonicHtml}
                    <div class="radical-ai">
                        ${dbExplanationHtml}
                        ${dbMnemonicHtml}
                    </div>
                </div>
            </div>
        `;
        // Only the Recognition preset uses this rich fixed back layout; other
        // presets honor the configured back parts already rendered by the loop
        // above — making the Back checkboxes honest without changing the default.
        if (isRecognitionConfig()) {
            contentWrapper.innerHTML = detailedHtml;
            // No custom-DB data: DON'T auto-fire a paid AI call on every card render
            // (that spent money on every flip and could 429 the rate limiter). The
            // learner taps the "AI Insight" button on demand instead.
            if (!dbData) {
                const aiSlot = contentWrapper.querySelector('.radical-ai');
                if (aiSlot) aiSlot.innerHTML = `<p class="info" style="font-size:0.85em;">Tap “AI Insight” for an explanation &amp; mnemonic.</p>`;
            }
        }
    }
}

function updateFlashcardProgress(card) {
    if (!currentTestSession) return;
    const totalCards = currentTestSession.cards.length;
    flashcardCounter.textContent = `${currentFlashcardIndex + 1} / ${totalCards}`;
    const fill = document.querySelector('.fc-progress-fill');
    if (fill && totalCards > 0) {
        // test mode measures graded progress; study mode measures position.
        const pct = currentTestSession.mode === 'test'
            ? (currentTestSession.answered / (currentTestSession.total || totalCards)) * 100
            : ((currentFlashcardIndex + 1) / totalCards) * 100;
        fill.style.width = Math.max(0, Math.min(100, pct)) + '%';
    }
    if (!card) {
        flashcardDueIndicator.textContent = '';
        flashcardDueIndicator.classList.remove('due-soon');
        return;
    }
    ensureCardSchema(card);
    const stats = card.stats;
    const attempts = (stats.correct || 0) + (stats.incorrect || 0);
    if (attempts === 0) {
        flashcardDueIndicator.textContent = 'New card';
        flashcardDueIndicator.classList.remove('due-soon');
    } else {
        flashcardDueIndicator.textContent = formatDueTimestamp(stats.due);
        flashcardDueIndicator.classList.toggle('due-soon', stats.due <= Date.now());
    }
}

function clearFlashcardWriter(faceKey) {
    const writer = activeFlashcardWriters[faceKey];
    if (writer && typeof writer.cancelAnimation === 'function') {
        try { writer.cancelAnimation(); } catch (_) { /* ignore */ }
    }
    activeFlashcardWriters[faceKey] = null;
}

function resetFlashcardWriters() {
    clearFlashcardWriter('front');
    clearFlashcardWriter('back');
}

function recordTestAnswer(isCorrect) {
    if (!currentTestSession || currentTestSession.mode !== 'test') return;
    if (fcAnswerLocked) return;
    const card = currentTestSession.cards[currentFlashcardIndex];
    if (!card) return;
    fcAnswerLocked = true;
    testRightBtn.disabled = true;
    testWrongBtn.disabled = true;
    testSkipBtn.disabled = true;
    updateCardStats(card, isCorrect);
    currentTestSession.answered++;
    if (isCorrect) {
        currentTestSession.correct++;
        currentTestSession.sessionStreak = (currentTestSession.sessionStreak || 0) + 1;
        currentTestSession.bestStreak = Math.max(currentTestSession.bestStreak || 0, currentTestSession.sessionStreak);
        flashcardFeedback.textContent = 'Marked correct. Scheduled further out.';
        const fill = document.querySelector('.fc-progress-fill');
        if (fill) { fill.classList.add('pulse'); setTimeout(() => fill.classList.remove('pulse'), 220); }
    } else {
        currentTestSession.wrong++;
        currentTestSession.sessionStreak = 0;
        flashcardFeedback.textContent = 'Marked for quick review.';
    }
    updateStreakChip();
    testScore.textContent = `Score: ${currentTestSession.correct} / ${currentTestSession.answered}`;
    saveFlashcards();
    renderDeckManager();
    flashcardEl.classList.add('flipped');

    // Grade -> (card shows answer) -> slide the card out in the grade's direction
    // -> render + slide the next card in. Kept within the original ~900ms budget;
    // reduced-motion skips straight to the plain advance. Buttons stay locked
    // (BUG-07) until the advance actually runs.
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let advanced = false;
    const advance = () => {
        if (advanced) return;
        advanced = true;
        fcAnswerLocked = false;
        testRightBtn.disabled = false;
        testWrongBtn.disabled = false;
        testSkipBtn.disabled = false;
        if (!currentTestSession) return;
        const completed = currentTestSession.correct + currentTestSession.wrong + currentTestSession.skipped;
        if (completed >= currentTestSession.total) { finishFlashcardSession(true); return; }
        const nextIndex = (currentFlashcardIndex + 1) % currentTestSession.cards.length;
        flashcardEl.classList.remove('fc-out-right', 'fc-out-wrong', 'flipped');
        showFlashcard(nextIndex);
        if (!reduce) {
            flashcardEl.classList.add('fc-in');
            setTimeout(() => flashcardEl.classList.remove('fc-in'), 320);
        }
    };
    if (reduce) {
        setTimeout(advance, 900);
    } else {
        setTimeout(() => {
            if (advanced || !currentTestSession) { advance(); return; }
            flashcardEl.classList.add(isCorrect ? 'fc-out-right' : 'fc-out-wrong');
            const onEnd = () => { flashcardEl.removeEventListener('animationend', onEnd); advance(); };
            flashcardEl.addEventListener('animationend', onEnd);
            setTimeout(onEnd, 420); // fallback if animationend never fires
        }, 550);
    }
}

// Session streak chip: shows "🔥 N" once the learner is on a 2+ correct run.
function updateStreakChip() {
    const chip = document.getElementById('fc-streak-chip');
    if (!chip) return;
    const s = currentTestSession ? (currentTestSession.sessionStreak || 0) : 0;
    if (s >= 2) {
        chip.textContent = `🔥 ${s}`;
        chip.style.display = '';
        chip.classList.remove('fc-pop');
        void chip.offsetWidth; // restart the pop animation
        chip.classList.add('fc-pop');
    } else {
        chip.style.display = 'none';
    }
}

// Session summary overlay — replaces the old alert() at the end of a test.
function showFlashcardSummary(summary) {
    const el = document.getElementById('fc-summary');
    if (!el) return;
    const graded = summary.correct + summary.wrong;
    const acc = graded > 0 ? Math.round(100 * summary.correct / graded) : 0;
    const headline = acc >= 80 ? 'Nice session!' : 'Session complete';
    const best = summary.bestStreak || 0;
    const deck = getActiveDeck();
    const metrics = deck ? computeDeckMetrics(deck) : { due: 0 };
    const canAgain = metrics.due > 0;
    el.innerHTML = `
        <div class="fc-summary-card">
            <div class="fc-summary-emoji">${acc >= 80 ? '🎉' : '✅'}</div>
            <h2>${headline}</h2>
            <div class="fc-summary-tiles">
                <div class="fc-summary-tile"><span class="fc-summary-num" style="color:var(--accent-color)">${summary.correct}</span><span>Got it</span></div>
                <div class="fc-summary-tile"><span class="fc-summary-num" style="color:var(--danger-color)">${summary.wrong}</span><span>Again</span></div>
                <div class="fc-summary-tile"><span class="fc-summary-num">${summary.skipped}</span><span>Skipped</span></div>
            </div>
            <div class="fc-summary-streak">Best streak 🔥 ${best}</div>
            <button class="modal-btn primary" id="fc-summary-again"${canAgain ? '' : ' disabled'}>Study again</button>
            ${canAgain ? '' : '<p class="info" style="margin:0;">Nothing due — come back later.</p>'}
            <button class="modal-btn" id="fc-summary-home">Back to decks</button>`;
    el.style.display = 'flex';
    const homeBtn = document.getElementById('fc-summary-home');
    if (homeBtn) homeBtn.onclick = () => { el.style.display = 'none'; };
    const againBtn = document.getElementById('fc-summary-again');
    if (canAgain && againBtn) againBtn.onclick = () => { el.style.display = 'none'; startFlashcardSession('test', { dueOnly: summary.dueOnly }); };
}

function skipCurrentCard() {
    if (!currentTestSession || currentTestSession.mode !== 'test') return;
    if (fcAnswerLocked) return;
    const card = currentTestSession.cards[currentFlashcardIndex];
    if (!card) return;
    fcAnswerLocked = true;
    card.suspended = true;
    currentTestSession.skipped++;
    flashcardFeedback.textContent = `${card.char} paused. Resume it from the deck list.`;
    saveFlashcards();
    renderDeckManager();
    currentTestSession.cards.splice(currentFlashcardIndex, 1);
    const completed = currentTestSession.correct + currentTestSession.wrong + currentTestSession.skipped;
    if (completed >= currentTestSession.total || currentTestSession.cards.length === 0) {
        finishFlashcardSession(true);
        fcAnswerLocked = false;
        return;
    }
    if (currentFlashcardIndex >= currentTestSession.cards.length) {
        currentFlashcardIndex = 0;
    }
    showFlashcard(currentFlashcardIndex);
    fcAnswerLocked = false;
}

function updateCardStats(card, isCorrect) {
    ensureCardSchema(card);
    const stats = card.stats;
    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;
    stats.lastReviewed = now;
    if (isCorrect) {
        stats.correct++;
        stats.streak++;
        stats.ease = Math.min((stats.ease || 2.5) + 0.08, 3.0);
        const nextInterval = stats.interval === 0 ? 0.5 : Math.min(stats.interval * stats.ease, 60);
        stats.interval = Number(nextInterval.toFixed(2));
        stats.due = now + stats.interval * dayMs;
    } else {
        stats.incorrect++;
        stats.streak = 0;
        stats.lapses++;
        stats.ease = Math.max((stats.ease || 2.5) - 0.25, 1.3);
        stats.interval = 0;
        stats.due = now + 10 * 60 * 1000;
    }
    stats.lastResult = isCorrect ? 'right' : 'wrong';
}

function finishFlashcardSession(showSummary = true) {
    if (!currentTestSession) return;
    const summary = currentTestSession;
    fcAnswerLocked = false;
    testRightBtn.disabled = false;
    testWrongBtn.disabled = false;
    testSkipBtn.disabled = false;
    if (sayFirstBar) sayFirstBar.style.display = 'none';
    if (sayFirstToggle) sayFirstToggle.style.display = 'none';
    if (sayFirstRecorder && sayFirstRecorder.state === 'recording') { try { sayFirstRecorder.stop(); } catch (_) { /* ignore */ } }
    showDeckManager();
    if (showSummary && summary.mode === 'test') {
        showFlashcardSummary(summary); // overlays the Deck Home we just returned to
    }
    currentTestSession = null;
}

function showMnemonicModal(char, sourceView) {
    if (!mnemonicModal) return;
    mnemonicModalState = { char, sourceView };
    mnemonicModalTitle.textContent = `Your Mnemonic for "${char}"`;
    const existingMnemonic = userMnemonics[char] || '';
    mnemonicInput.value = existingMnemonic;
    mnemonicModal.style.display = 'flex';
    mnemonicInput.focus();
}

function saveUserMnemonicFromModal() {
    const { char, sourceView } = mnemonicModalState;
    if (!char) return;

    const newMnemonic = mnemonicInput.value.trim();
    userMnemonics[char] = newMnemonic;
    saveUserMnemonics();

    // Refresh the view where the edit was initiated
    if (sourceView === 'radicals') {
        getRadicalInfo(char);
    } else if (sourceView === 'flashcard') {
        showFlashcardAiInsight();
    }

    mnemonicModal.style.display = 'none';
}

async function fetchMnemonic(card) {
    // === NEW: Check custom DB first (primary source) ===
    if (customDbData?.[card.char]?.mnemonic) {
        return customDbData[card.char].mnemonic;
    }

    // Fallback to AI
    const response = await fetch(`${backendUrl}/radical-info`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ char: card.char, pinyin: card.pinyin, definition: card.def })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'AI API error');
    return data.mnemonic || 'Mnemonic not found.';
}

async function showFlashcardAiInsight(renderInCard = false) {
    const card = currentTestSession?.cards[currentFlashcardIndex];
    if (!card) return;

    let targetElement;
    if (renderInCard) {
        targetElement = document.querySelector('#flashcard-back .radical-ai');
        if (!targetElement) return;
        targetElement.innerHTML = `
            <div class="radical-explanation"><span>AI Insight:</span><p class="loading">Fetching guidance...</p></div>
            <div class="radical-mnemonic"><span>Mnemonic:</span><p class="loading">Fetching memory aid...</p></div>
        `;
    } else {
        showModal(`AI Insight for ${card.char}`, `<p class="loading">Fetching insights...</p>`);
    }

    const userMnemonic = userMnemonics[card.char];
    const userMnemonicHtml = userMnemonic
        ? `<h4>Your Mnemonic</h4><p>${escapeHtml(userMnemonic)}</p>`
        : '';

    // === NEW: Check custom DB first (primary source) ===
    if (customDbData?.[card.char]) {
        const local = customDbData[card.char]; // This case is handled by renderCardFace, so this block is for the modal view.
        const insightHtml = `
            <div class="ai-insight-layout">
                <div class="ai-insight-char">${card.char}</div>
                <div class="ai-insight-content">
                    ${userMnemonicHtml}
                    <h4>Explanation (from Your DB)</h4>
                    <p>${escapeHtml(local.equation) || 'No explanation available.'}</p>
                    <h4>Mnemonic (from Your DB)</h4>
                    <p>${escapeHtml(local.mnemonic) || 'No mnemonic available.'}</p>
                </div>
            </div>
            <div class="modal-actions">
                <button onclick="showMnemonicModal('${card.char}', 'flashcard')">
                    ${userMnemonic ? 'Edit' : 'Add'} Your Mnemonic
                </button>
                </div>
            </div>
        `;
        if (!renderInCard) {
            showModal(`AI Insight for ${card.char}`, insightHtml);
        }
        return;
    }

    try {
        const metadata = await fetchCharacterMetadata(card.char);
        const body = {
            char: card.char,
            pinyin: card.pinyin,
            definition: card.def,
            components: metadata.components,
            strokeCount: metadata.strokeCount
        };

        const response = await fetch(`${backendUrl}/radical-info`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'AI API error');
        // Fallback to AI-generated content
        let insightHtml = `
            <div class="ai-insight-layout">
                <div class="ai-insight-char">${card.char}</div>
                <div class="ai-insight-content">
                    ${userMnemonicHtml}
                    <h4>Explanation</h4>
                    <p>${escapeHtml(data.explanation) || 'No explanation available.'}</p>
                    <h4>Mnemonic</h4>
                    <p>${escapeHtml(data.mnemonic) || 'No mnemonic available.'}</p>
                </div>
            </div>
            <div class="modal-actions">
                <button onclick="showMnemonicModal('${card.char}', 'flashcard')">
                    ${userMnemonic ? 'Edit' : 'Add'} Your Mnemonic
                </button>
            </div>
        `;

        if (renderInCard && targetElement) {
            targetElement.innerHTML = `
                <div class="radical-explanation"><span>AI Insight:</span><p>${escapeHtml(data.explanation) || 'No insight available.'}</p></div>
                <div class="radical-mnemonic"><span>Mnemonic:</span><p>${escapeHtml(data.mnemonic) || 'No mnemonic available.'}</p></div>
            `;
        } else {
            showModal(`AI Insight for ${card.char}`, insightHtml);
        }
    } catch (error) {
        console.error('AI Insight fetch failed:', error);
        if (renderInCard && targetElement) {
            targetElement.innerHTML = `<p class="error">Failed to fetch AI insight: ${error.message}</p>`;
        } else {
            showModal(`AI Insight for ${card.char}`, `<p class="error">Failed to fetch AI insight: ${error.message}</p>`);
        }
    }
}

function startStrokePractice(char, practiceId, messageId) {
    const practiceContainer = document.getElementById(practiceId);
    const messageEl = document.getElementById(messageId);
    if (!practiceContainer) return;

    // === NEW: Toggle visibility logic ===
    if (practiceContainer.style.display === 'block') {
        practiceContainer.style.display = 'none';
        if (messageEl) messageEl.style.display = 'none';
        if (radicalPracticeWriter && typeof radicalPracticeWriter.cleanup === 'function') {
            try { radicalPracticeWriter.cleanup(); } catch (_) { /* ignore */ }
            radicalPracticeWriter = null; // Clear the writer instance
        }
        practiceContainer.innerHTML = ''; // Clear the content
        return; // Exit the function
    }

    // === NEW: Make the practice area visible ===
    practiceContainer.style.display = 'block';
    if (messageEl) messageEl.style.display = 'block';

    practiceContainer.innerHTML = '';
    if (messageEl) {
        messageEl.textContent = 'Trace each stroke in order. The board resets after completion.';
        messageEl.classList.remove('error');
    }
    if (radicalPracticeWriter && typeof radicalPracticeWriter.cleanup === 'function') {
        try { radicalPracticeWriter.cleanup(); } catch (_) { /* ignore */ }
    }
    fetchCharacterMetadata(char).then(metadata => {
        const options = {
            width: practiceContainer.clientWidth || 240,
            height: practiceContainer.clientWidth || 240,
            padding: 20,
            showOutline: true
        }
        radicalPracticeWriter = HanziWriter.create(practiceId, char, options);
        radicalPracticeWriter.quiz({
            onMistake: () => { if (messageEl) { messageEl.textContent = 'Try again—follow the stroke order carefully.'; messageEl.classList.add('error'); } },
            onComplete: () => { if (messageEl) { messageEl.textContent = 'Nice! You nailed the stroke order.'; messageEl.classList.remove('error'); } }
        });
    }).catch(error => {
        console.warn('Stroke practice unavailable:', error);
        if (messageEl) {
            messageEl.textContent = 'Stroke data unavailable for this character.';
            messageEl.classList.add('error');
        }
    });
}
window.startStrokePractice = startStrokePractice;

function downloadDeckAsCsv() {
    const deck = getActiveDeck();
    if (!deck || deck.cards.length === 0) {
        alert("Deck is empty.");
        return;
    }
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Front,Back\n";
    deck.cards.forEach(card => {
        // Front is always the character
        const front = (card.char || '').replace(/"/g, '""');
        
        // Dynamically build the back content based on flashcardConfig.back
        const backParts = flashcardConfig.back.map(type => {
            let content = '';
            switch (type) {
                case 'pinyin':
                    return card.pinyin || '';
                case 'def':
                    return card.def || '';
                case 'userMnemonic':
                    return userMnemonics[card.char] ? `My Mnemonic: ${userMnemonics[card.char]}` : '';
                case 'components':
                    return customDbData?.[card.char]?.equation ? ` ${customDbData[card.char].equation}` : '';
                case 'mnemonic':
                     return customDbData?.[card.char]?.mnemonic ? ` ${customDbData[card.char].mnemonic}` : '';
                default:
                    return '';
            }
        }).filter(Boolean); // Filter out empty strings

        // Join the parts with a line break, and escape for CSV
        const back = backParts.join('<br>.......................<br>').replace(/"/g, '""');

        csvContent += `"${front}","${back}"\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${deck.name}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function toggleCardSuspension(cardId) {
    const deck = getActiveDeck();
    if (!deck) return;
    const card = deck.cards.find(c => c.id === cardId);
    if (!card) return;
    card.suspended = !card.suspended;
    flashcardFeedback.textContent = card.suspended
        ? `${card.char} will be skipped until resumed.`
        : `${card.char} reactivated.`;
    saveFlashcards();
    renderDeckManager();
}

function resetCardStats(cardId) {
    const deck = getActiveDeck();
    if (!deck) return;
    const card = deck.cards.find(c => c.id === cardId);
    if (!card) return;
    if (!confirm(`Reset progress for "${card.char}"?`)) return;
    card.stats = createEmptyStats();
    card.suspended = false;
    flashcardFeedback.textContent = `${card.char} reset.`;
    saveFlashcards();
    renderDeckManager();
}

function resetDeckProgress() {
    const deck = getActiveDeck();
    if (!deck) return;
    if (!confirm(`Reset progress for every card in "${deck.name}"?`)) return;
    deck.cards.forEach(card => {
        card.stats = createEmptyStats();
        card.suspended = false;
    });
    flashcardFeedback.textContent = `Deck "${deck.name}" reset.`;
    saveFlashcards();
    renderDeckManager();
}

function reviewDueCards() {
    startFlashcardSession('test', { dueOnly: true });
}


// ===================================
// ======== RADICALS & MNEMONICS =====
// ===================================

function showRadicalsPanel() {
    const isVisible = radicalsPanel.style.display === 'block';
    if (isVisible) {
        radicalHistoryStack = [];
        radicalsPanel.style.display = 'none';
    } else {
        radicalsPanel.style.display = 'block';
        radicalsPanel.classList.remove('collapsed');
        populateRadicalCharList();
    }
}

function populateRadicalCharList() {
    if (!currentSessionId) {
        radicalsCharList.innerHTML = '<p class="info">No active session.</p>';
        return;
    }
    const session = findSessionById(currentSessionId);
    if (!session || !session.stats) {
        radicalsCharList.innerHTML = '<p class="info">No characters in session.</p>';
        return;
    }
    
    const uniqueChars = Object.keys(session.stats);
    radicalsCharList.innerHTML = uniqueChars.map(char => 
        `<button class="radical-char-btn" data-char="${char}" onclick="getRadicalInfo('${char}')" ondblclick="toggleCardSelection(this)">${char}</button>`
    ).join('');
    radicalsOutput.innerHTML = ''; // Clear output
}

async function fetchCharacterMetadata(char) {
    if (!char) {
        return { char: '', strokeCount: null, components: [], charData: null };
    }
    if (characterMetadataCache.has(char)) {
        return characterMetadataCache.get(char);
    }
    let payload = { char, strokeCount: null, components: [], charData: null };
    let ok = false;
    try {
        const response = await fetch(`${backendUrl}/character-data/${encodeURIComponent(char)}`);
        if (response.ok) {
            const data = await response.json();
            payload.strokeCount = data.strokeCount ?? null;
            payload.components = Array.isArray(data.components) ? data.components : [];
            payload.charData = data.charData || null;
            ok = true;
        } else {
            console.warn('Character metadata request failed:', response.status);
        }
    } catch (error) {
        console.warn('Character metadata fetch failed:', error.message);
    }

    // Only cache successful results — don't let a transient failure poison the
    // cache permanently.
    if (ok) characterMetadataCache.set(char, payload);
    return payload;
}

async function getRadicalInfo(char, isBack = false) {
    document.querySelectorAll('.radical-char-btn').forEach(btn =>
        btn.classList.toggle('active', btn.dataset.char === char)
    );

    const currentRadicalChar = radicalsOutput.dataset.currentChar;

    if (!isBack && currentRadicalChar && currentRadicalChar !== char) {
        radicalHistoryStack.push(currentRadicalChar);
    }

    const backButtonHtml = radicalHistoryStack.length > 0
        ? `<div class="radical-nav">
               <button class="panel-btn" onclick="goBackRadical()">‹ Go Back</button>
           </div>`
        : '';

    if (radicalPracticeWriter && typeof radicalPracticeWriter.cleanup === 'function') {
        try { radicalPracticeWriter.cleanup(); } catch (_) { /* ignore */ }
        radicalPracticeWriter = null;
    }

    const pinyin = window.pinyinPro?.pinyin ? window.pinyinPro.pinyin(char, { toneType: 'symbol' }) : char;
    const rawDefinition = dictionary && dictionary[char] ? dictionary[char] : '...';
    const definition = rawDefinition.split(';')[0].split('/')[0];

    // Fetch initial metadata, but we will rely on the AI for component details
    const metadata = await fetchCharacterMetadata(char);
    const componentsList = metadata.components || []; // Now sourced from chaiziData via fetchCharacterMetadata
    let components = componentsList.length > 0
        ? componentsList.map(c => `<button class="component-item" onclick="getRadicalInfo('${c}')">${c}</button>`).join('')
        : '...';
    const strokeCount = metadata.strokeCount ?? 'N/A';
    const charSlug = getCharDomId(char, 'radical');
    const explanationId = `${charSlug}-explanation`;
    const mnemonicId = `${charSlug}-mnemonic`;
    const practiceId = `${charSlug}-practice`;
    const practiceMsgId = `${charSlug}-practice-msg`;

    // === NEW: Check for user mnemonic ===
    const userMnemonic = userMnemonics[char];
    const userMnemonicHtml = userMnemonic
        ? `<div class="radical-user-mnemonic">
               <span>Your Mnemonic:</span>
               <p>${escapeHtml(userMnemonic)}</p>
           </div>`
        : '';

    radicalsOutput.innerHTML = `
        ${backButtonHtml}
        <div class="radical-item" data-current-char="${char}">
            <div class="radical-item-header">
                <span class="radical-char">${char}</span>
                <div>
                    <div class="radical-pinyin">${pinyin}</div>
                    <div class="radical-def">${escapeHtml(definition)}</div>
                </div>
            </div>
            <div class="radical-strokes">
                <span>Strokes:</span> ${strokeCount}
            </div>
            <div class="radical-components">
                <span class="component-list loading">${components}</span>
            </div>
            ${userMnemonicHtml}
            <div class="radical-ai">
                <div class="radical-explanation" id="${explanationId}">
                    <span>AI Insight:</span>
                    <p class="loading">Fetching guidance...</p>
                </div>
                <div class="radical-mnemonic" id="${mnemonicId}">
                    <span>Mnemonic:</span>
                    <p class="loading">Fetching memory aid...</p>
                </div>
            </div>
            <div class="radical-actions">
                <button class="radical-practice-btn" onclick="startStrokePractice('${char}', '${practiceId}', '${practiceMsgId}')">Practice Strokes</button>
                <button class="radical-info-btn" onclick="showAddInfoModal('${char}')">Add Info</button>
            </div>
            <div id="${practiceMsgId}" class="radical-practice-message"></div>
            <div id="${practiceId}" class="radical-practice-area"></div>
        </div>
    `;

    // === NEW: Check your custom database first ===
    if (customDbData && customDbData[char]) {
        const localData = customDbData[char];
        const explanationEl = document.getElementById(explanationId);
        const mnemonicEl = document.getElementById(mnemonicId);
        const componentsRow = radicalsOutput.querySelector('.radical-components');

        if (explanationEl) {
            explanationEl.innerHTML = `<p>${escapeHtml(localData.equation) || 'Not available.'}</p>`;
        }
        if (mnemonicEl) {
            mnemonicEl.innerHTML = `<p>${escapeHtml(localData.mnemonic) || 'Not available.'}</p>`;
        }
        if (componentsRow) {
            const localComponents = localData.equation ? localData.equation.replace(/[+=()0-9a-z]/g, ' ').trim().split(' ').filter(Boolean).map(c => `<button class="component-item" onclick="getRadicalInfo('${c}')">${c}</button>`).join('') : 'Basic component';
            componentsRow.innerHTML = `<div class="component-list">${localComponents}</div>`;
        }
        // Update stroke count if available in your DB
        if (localData.strokes) {
            radicalsOutput.querySelector('.radical-strokes').innerHTML = `<span>Strokes:</span> ${localData.strokes}`;
        }
        return; // Data found in your DB, no need to proceed
    }

    // --- Fallback to AI if not in local data ---
    const explanationEl = document.getElementById(explanationId);
    if (explanationEl) explanationEl.querySelector('p').textContent = "Fetching AI guidance...";
    const mnemonicEl = document.getElementById(mnemonicId);
    if (mnemonicEl) mnemonicEl.querySelector('p').textContent = "Fetching AI memory aid...";

    try {
        const response = await fetch(`${backendUrl}/radical-info`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ char, pinyin, definition, components: componentsList, strokeCount })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'AI API error');

        // Re-select elements in case they were modified
        const explanationEl = document.getElementById(explanationId);
        const mnemonicEl = document.getElementById(mnemonicId);
        if (explanationEl) {
            explanationEl.innerHTML = `<span>AI Insight:</span><p>${escapeHtml(data.explanation) || 'No insight available.'}</p>`;
        }
        if (mnemonicEl) {
            mnemonicEl.innerHTML = `<span>Mnemonic:</span><p>${escapeHtml(data.mnemonic) || 'Visualise the components to remember the meaning.'}</p>`;
        }
        if (Array.isArray(data.componentsDetail) && data.componentsDetail.length > 0) {
            const componentsRow = radicalsOutput.querySelector('.radical-components');
            if (componentsRow) {
                const formatted = data.componentsDetail.map(entry => {
                    // Handle separators like '+' or '='
                    if (typeof entry === 'string' && !chineseCharRegex.test(entry)) {
                        return `<span class="component-separator">${entry}</span>`;
                    }

                    // Handle component objects or simple character strings
                    const part = (entry && (entry.component || entry.name)) || (typeof entry === 'string' ? entry : '');
                    const gloss = (entry && (entry.meaning || entry.gloss || entry.note)) || '';

                    return `<div class="component-item-wrapper">
                                <button class="component-item" title="${gloss}" onclick="getRadicalInfo('${part}')">${part}</button>
                                <div class="component-meaning">${gloss || '&nbsp;'}</div>
                            </div>`;
                }).join('');
                componentsRow.innerHTML = `<div class="component-list">${formatted}</div>`;
            }
        }
    } catch (error) {
        console.error('Radical info AI failed:', error);
        const explanationEl = document.getElementById(explanationId);
        const mnemonicEl = document.getElementById(mnemonicId);
        const errorHtml = `<p class="error">${error.message}</p>`;
        if (explanationEl) explanationEl.innerHTML = `<span>AI Insight:</span>${errorHtml}`;
        if (mnemonicEl) mnemonicEl.innerHTML = `<span>Mnemonic:</span>${errorHtml}`;
    }
}

async function shortcutToAddInfo(char, source) {
    // 1. Close the stroke animation modal
    closeHanziModal();

    // 2. Ensure the main right-side "Tools" panel is open
    const isRightPanelCollapsed = rightPanel.classList.contains('collapsed');
    if (isRightPanelCollapsed) {
        toggleRightPanel(true); // Force it open
    }

    // 3. Ensure the "Radicals & Mnemonics" sub-panel is open
    const isRadicalsPanelVisible = radicalsPanel.style.display === 'block';
    if (!isRadicalsPanelVisible) {
        showRadicalsPanel(); // This will toggle it open
    }

    // 4. Populate the panel for the correct character
    await getRadicalInfo(char);

    // 5. Finally, open the "Add Info" modal
    showAddInfoModal(char, source);
}

async function showAddInfoModal(char, source = 'radicals') {
    if (!charInfoModal) return;

    charInfoSaveBackBtn.style.display = source === 'hanzi-modal' ? 'inline-block' : 'none';

    activeEditChar = char;
    charInfoModalTitle.textContent = `Edit Info for "${char}"`;

    // --- Data Gathering ---
    // 1. Start with data from your custom DB if it exists
    let prefillData = customDbData?.[char] ? { ...customDbData[char] } : {};

    // 2. Augment with data currently displayed in the panel (from AI or Tuttle)
    const radicalItem = document.querySelector(`.radical-item[data-current-char="${char}"]`);
    if (radicalItem) {
        if (!prefillData.pinyin) prefillData.pinyin = radicalItem.querySelector('.radical-pinyin')?.textContent || '';
        if (!prefillData.meaning) prefillData.meaning = radicalItem.querySelector('.radical-def')?.textContent || '';
        if (!prefillData.strokes) {
            const strokesText = radicalItem.querySelector('.radical-strokes')?.textContent || '';
            prefillData.strokes = strokesText.replace(/[^0-9]/g, '') || '';
        }
        // Get equation/mnemonic from the AI section if not already filled
        if (!prefillData.equation) {
            const explanationP = document.getElementById(`${getCharDomId(char, 'radical')}-explanation`)?.querySelector('p');
            if (explanationP && !explanationP.classList.contains('loading')) {
                prefillData.equation = explanationP.textContent;
            }
        }
        if (!prefillData.mnemonic) {
            const mnemonicP = document.getElementById(`${getCharDomId(char, 'radical')}-mnemonic`)?.querySelector('p');
            if (mnemonicP && !mnemonicP.classList.contains('loading')) {
                prefillData.mnemonic = mnemonicP.textContent;
            }
        }
    }

    // --- Populate Form ---
    document.getElementById('char-info-char').value = char;
    document.getElementById('char-info-pinyin').value = prefillData.pinyin || '';
    document.getElementById('char-info-meaning').value = prefillData.meaning || '';
    document.getElementById('char-info-radical').value = prefillData.radical || '';
    document.getElementById('char-info-strokes').value = prefillData.strokes || '';
    document.getElementById('char-info-eq').value = prefillData.equation || '';
    document.getElementById('char-info-mnemonic').value = prefillData.mnemonic || '';

    charInfoModal.classList.add('active');
}

async function saveCharInfoFromModal() {
    if (!activeEditChar) return;

    const saveBtn = document.getElementById('char-info-save-btn');
    const originalBtnText = saveBtn.textContent;

    const strokesValue = document.getElementById('char-info-strokes').value.trim();
    const updatedInfo = {
        pinyin: document.getElementById('char-info-pinyin').value.trim(),
        meaning: document.getElementById('char-info-meaning').value.trim(),
        radical: document.getElementById('char-info-radical').value.trim(),
        strokes: strokesValue ? parseInt(strokesValue, 10) : null,
        equation: document.getElementById('char-info-eq').value.trim(),
        mnemonic: document.getElementById('char-info-mnemonic').value.trim(),
    };
    
    // Clean up null/empty values to avoid sending invalid data
    Object.keys(updatedInfo).forEach(key => {
        if (updatedInfo[key] === null || updatedInfo[key] === '' || Number.isNaN(updatedInfo[key])) {
            delete updatedInfo[key];
        }
    });


    // Update the in-memory database
    if (!customDbData) customDbData = {};
    if (!customDbData[activeEditChar]) customDbData[activeEditChar] = {};
    customDbData[activeEditChar] = { ...customDbData[activeEditChar], ...updatedInfo };


    // --- NEW: Save to server ---
    saveBtn.textContent = 'Saving...';
    saveBtn.disabled = true;

    try {
        const response = await fetch(`${backendUrl}/save-custom-db`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(customDbData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Server responded with an error.');
        }

        saveBtn.textContent = 'Saved!';
        setTimeout(() => {
            charInfoModal.classList.remove('active');
            saveBtn.textContent = originalBtnText;
            saveBtn.disabled = false;
        }, 1000);

    } catch (error) {
        alert(`Error saving to server: ${error.message}\n\nYour changes are saved for this session only.`);
        saveBtn.textContent = originalBtnText;
        saveBtn.disabled = false;
    } finally {
        // Refresh the view immediately with the new data
        await getRadicalInfo(activeEditChar);
    }
}

async function saveAndGoBackToHanziModal() {
    if (!activeEditChar) return;

    const saveBtn = document.getElementById('char-info-save-back-btn');
    const originalBtnText = saveBtn.textContent;

    const updatedInfo = {
        pinyin: document.getElementById('char-info-pinyin').value.trim(),
        meaning: document.getElementById('char-info-meaning').value.trim(),
        radical: document.getElementById('char-info-radical').value.trim(),
        strokes: document.getElementById('char-info-strokes').value.trim(),
        equation: document.getElementById('char-info-eq').value.trim(),
        mnemonic: document.getElementById('char-info-mnemonic').value.trim(),
    };

    if (!customDbData) customDbData = {};
    customDbData[activeEditChar] = updatedInfo;

    saveBtn.textContent = 'Saving...';
    saveBtn.disabled = true;

    try {
        const response = await fetch(`${backendUrl}/save-custom-db`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(customDbData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Server responded with an error.');
        }

        charInfoModal.classList.remove('active');
        await showStrokes(activeEditChar); // Re-open the hanzi modal
        toggleRightPanel(false); // Collapse the right side panel

    } catch (error) {
        alert(`Error saving to server: ${error.message}\n\nYour changes are saved for this session only.`);
    } finally {
        saveBtn.textContent = originalBtnText;
        saveBtn.disabled = false;
        // Also refresh the main radicals panel in the background
        await getRadicalInfo(activeEditChar);
    }
}

function goBackRadical() {
    if (radicalHistoryStack.length > 0) {
        const lastChar = radicalHistoryStack.pop();
        getRadicalInfo(lastChar, true);
    }
}

function resetPanelWidths() {
    // Remove the inline styles set by the drag functionality
    document.documentElement.style.removeProperty('--left-panel-width');
    document.documentElement.style.removeProperty('--right-panel-width');

    // === NEW: Clear from localStorage ===
    localStorage.removeItem('leftPanelWidth');
    localStorage.removeItem('rightPanelWidth');

    // The CSS will now fall back to the default width of 300px
    // Provide feedback to the user
    const btn = document.getElementById('reset-panels-btn');
    if (btn) {
        const originalText = btn.querySelector('span').textContent;
        btn.querySelector('span').textContent = 'Reset!';
        setTimeout(() => { btn.querySelector('span').textContent = originalText; }, 1500);
    }
}

// === NEW: Load panel widths from localStorage ===
function loadPanelWidths() {
    const leftWidth = localStorage.getItem('leftPanelWidth');
    const rightWidth = localStorage.getItem('rightPanelWidth');
    if (leftWidth) document.documentElement.style.setProperty('--left-panel-width', leftWidth);
    if (rightWidth) document.documentElement.style.setProperty('--right-panel-width', rightWidth);
}

function toggleCategoryFilter(button) {
    const wasActive = button.classList.contains('active');

    // Deactivate all buttons first
    document.querySelectorAll('.category-filter-btn').forEach(btn => btn.classList.remove('active'));

    // If the clicked button was not active, activate it
    if (!wasActive) {
        button.classList.add('active');
    }

    renderHistory();
}

// ===================================
// ============ GAMES MODE ===========
// ===================================
// Three quick games (Match / Quiz / Listen) built on the active flashcard
// deck, or the current text session's characters as a fallback. Quiz/Listen
// answers feed the SRS via updateCardStats when the source is a real deck card.

const gameSession = { type: null, cards: [], index: 0, score: 0, total: 0 };
let gamesModalEl = null;
// Whether the games modal is showing the hub (picker) or an actual game, plus the
// original argument openGamesHub was launched with — so the topbar button can go
// back to the hub mid-game instead of dead-ending the whole flow.
let gamesAtHub = true;
let lastGamesCustomArg;

// --- Confusion Graph: aggregate every game mistake so we can drill trouble spots ---
// miss:  { "字": count }            — how often a target character was missed
// pairs: { "字→子": count }         — target character confused with a chosen one
let confusionData = { miss: {}, pairs: {} };
(function loadConfusionData() {
    try {
        const raw = JSON.parse(localStorage.getItem('confusionData'));
        if (raw && typeof raw === 'object') confusionData = raw;
    } catch (e) { /* corrupt or empty — keep the default */ }
    if (!confusionData.miss) confusionData.miss = {};
    if (!confusionData.pairs) confusionData.pairs = {};
})();

function saveConfusionData() {
    try { localStorage.setItem('confusionData', JSON.stringify(confusionData)); } catch (e) { /* quota — non-critical */ }
}

// Log a wrong answer. target = the character that should have been answered;
// chosen = the character the learner picked instead (optional — only games where
// the distractor is itself a character, i.e. Listen/Match, can build a real pair).
function logGameMiss(target, chosen) {
    if (!target || !chineseCharRegex.test(target)) return;
    confusionData.miss[target] = (confusionData.miss[target] || 0) + 1;
    if (chosen && chosen !== target && chineseCharRegex.test(chosen)) {
        const key = `${target}→${chosen}`;
        confusionData.pairs[key] = (confusionData.pairs[key] || 0) + 1;
    }
    saveConfusionData();
}

function gameShuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// A "what the answer was" line for game feedback: character, pinyin, meaning.
function gameCardInfoHtml(card) {
    const py = card.pinyin || (window.pinyinPro?.pinyin ? window.pinyinPro.pinyin(card.char, { toneType: 'symbol' }) : '');
    return `<span class="game-answer"><span class="game-answer-char">${escapeHtml(card.char)}</span> <span class="game-answer-py">${escapeHtml(py)}</span>${card.def ? ` — ${escapeHtml(card.def)}` : ''}</span>`;
}

function speakOnce(text) {
    if (isNaturalVoiceSelected()) { naturalSpeak(text); return; }
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const v = availableVoices.find(voice => voice.name === voiceSelector.value);
    if (v) u.voice = v;
    u.lang = 'zh-CN';
    u.rate = currentTtsRate();
    window.speechSynthesis.speak(u);
}

// Build the card pool: prefer the active deck, fall back to the current session.
function getGamesSourceCards() {
    const deck = getActiveDeck();
    if (deck && deck.cards.length > 0) {
        return deck.cards
            .filter(c => c.char && chineseCharRegex.test(c.char))
            .map(c => ({ char: c.char, pinyin: c.pinyin, def: c.def, _card: c }));
    }
    const session = findSessionById(currentSessionId);
    if (session && session.stats) {
        return Object.keys(session.stats)
            .filter(char => chineseCharRegex.test(char))
            .map(char => ({
                char,
                pinyin: window.pinyinPro?.pinyin(char, { toneType: 'symbol' }) || '',
                def: (dictionary?.[char] || '').split(';')[0].split('/')[0].replace(/\[.*?\]|\(.*?\)/g, '').trim(),
                _card: null
            }));
    }
    return [];
}

function ensureGamesModal() {
    if (gamesModalEl) return gamesModalEl;
    gamesModalEl = document.createElement('div');
    gamesModalEl.id = 'games-modal';
    gamesModalEl.className = 'main-modal';
    gamesModalEl.innerHTML = `
        <div class="modal-content game-modal-content">
            <div class="game-topbar">
                <h3 id="game-title">Games</h3>
                <button id="game-close-btn" class="modal-btn">Close</button>
            </div>
            <div id="game-body"></div>
        </div>`;
    document.body.appendChild(gamesModalEl);
    gamesModalEl.querySelector('#game-close-btn').addEventListener('click', gameTopClose);
    gamesModalEl.addEventListener('click', (e) => { if (e.target === gamesModalEl) closeGames(); });
    return gamesModalEl;
}

// Topbar button: mid-game it steps back to the games hub; from the hub it closes.
function gameTopClose() {
    if (!gamesAtHub) {
        if ('speechSynthesis' in window) window.speechSynthesis.cancel();
        openGamesHub(lastGamesCustomArg);
        return;
    }
    closeGames();
}

function setGameCloseLabel(inGame) {
    const btn = gamesModalEl && gamesModalEl.querySelector('#game-close-btn');
    if (btn) btn.textContent = inGame ? '‹ Games' : 'Close';
}

function closeGames() {
    if (gamesModalEl) gamesModalEl.classList.remove('active');
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
}

function openGamesHub(customCards) {
    ensureGamesModal();
    gamesAtHub = true;
    lastGamesCustomArg = customCards;
    setGameCloseLabel(false);
    const cards = Array.isArray(customCards) ? customCards : getGamesSourceCards();
    const body = gamesModalEl.querySelector('#game-body');
    gamesModalEl.querySelector('#game-title').textContent = 'Games';

    if (cards.length < 4) {
        body.innerHTML = `<p class="info" style="text-align:center; padding:1.5rem 0.5rem;">You need at least 4 characters to play. Add characters to a flashcard deck, or process some text first, then come back.</p>`;
        gamesModalEl.classList.add('active');
        return;
    }

    const deck = getActiveDeck();
    const source = Array.isArray(customCards) ? 'from your selected words'
        : (deck && deck.cards.length ? `from "${escapeHtml(deck.name)}"` : 'from this session');
    body.innerHTML = `
        <p class="game-hub-sub">Playing with ${cards.length} characters ${source}.</p>
        <div class="game-hub">
            <button class="game-hub-choice" data-game="match">
                <span class="game-hub-emoji">🀄</span>
                <span class="game-hub-name">Match</span>
                <span class="game-hub-desc">Pair each character with its meaning</span>
            </button>
            <button class="game-hub-choice" data-game="quiz">
                <span class="game-hub-emoji">✅</span>
                <span class="game-hub-name">Quiz</span>
                <span class="game-hub-desc">Multiple-choice meaning &amp; pinyin</span>
            </button>
            <button class="game-hub-choice" data-game="listen">
                <span class="game-hub-emoji">🎧</span>
                <span class="game-hub-name">Listen</span>
                <span class="game-hub-desc">Hear it, then pick the character</span>
            </button>
            <button class="game-hub-choice" data-game="speak">
                <span class="game-hub-emoji">🎤</span>
                <span class="game-hub-name">Speak</span>
                <span class="game-hub-desc">Say it aloud, check your pronunciation</span>
            </button>
            <button class="game-hub-choice" data-game="pitch">
                <span class="game-hub-emoji">🎵</span>
                <span class="game-hub-name">Pitch</span>
                <span class="game-hub-desc">Shadow the tone contour, see your pitch vs the target</span>
            </button>
            ${confusionMissCount() ? `
            <button class="game-hub-choice game-hub-trouble" data-game="trouble">
                <span class="game-hub-emoji">🎯</span>
                <span class="game-hub-name">Trouble spots</span>
                <span class="game-hub-desc">Drill the ${confusionMissCount()} characters you keep missing</span>
            </button>` : ''}
        </div>`;
    body.querySelectorAll('.game-hub-choice').forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.dataset.game === 'trouble') return showTroubleSpots();
            startGame(btn.dataset.game, cards);
        });
    });
    gamesModalEl.classList.add('active');
}

function startGame(type, cards) {
    gameSession.type = type;
    gamesAtHub = false;
    setGameCloseLabel(true);
    if (type === 'match') return startMatchGame(cards);
    if (type === 'quiz') return startQuizGame(cards);
    if (type === 'listen') return startListenGame(cards);
    if (type === 'speak') return startSpeakGame(cards);
    if (type === 'pitch') return startPitchGame(cards);
}

// --- Match: tap a character, then tap its meaning ---
function startMatchGame(allCards) {
    const body = gamesModalEl.querySelector('#game-body');
    gamesModalEl.querySelector('#game-title').textContent = 'Match';
    const pool = gameShuffle(allCards).slice(0, Math.min(6, allCards.length));

    const leftCol = pool.map(c => `<button class="game-tile match-char" data-key="${escapeHtml(c.char)}">${escapeHtml(c.char)}</button>`).join('');
    const rightCol = gameShuffle(pool).map(c => {
        const meaning = escapeHtml(truncateDefinition(c.def || '', 4) || c.pinyin || '?');
        const label = c.pinyin ? `${escapeHtml(c.pinyin)} · ${meaning}` : meaning;
        return `<button class="game-tile match-def" data-key="${escapeHtml(c.char)}">${label}</button>`;
    }).join('');

    body.innerHTML = `
        <div class="game-header"><span id="game-progress">0 / ${pool.length} matched</span><button class="modal-btn game-restart">Restart</button></div>
        <div class="match-grid"><div class="match-col">${leftCol}</div><div class="match-col">${rightCol}</div></div>
        <div id="game-feedback" class="game-feedback"></div>`;

    let selected = null;
    let matched = 0;
    const progress = body.querySelector('#game-progress');
    body.querySelector('.game-restart').addEventListener('click', () => startMatchGame(allCards));

    body.querySelectorAll('.match-char').forEach(tile => tile.addEventListener('click', () => {
        if (tile.classList.contains('faded')) return;
        body.querySelectorAll('.match-char').forEach(x => x.classList.remove('selected'));
        tile.classList.add('selected');
        selected = tile;
    }));

    body.querySelectorAll('.match-def').forEach(tile => tile.addEventListener('click', () => {
        if (tile.classList.contains('faded') || !selected) return;
        if (tile.dataset.key === selected.dataset.key) {
            const charTile = selected;
            [charTile, tile].forEach(t => { t.classList.remove('selected'); t.classList.add('correct'); });
            setTimeout(() => [charTile, tile].forEach(t => t.classList.add('faded')), 350);
            markHskLearned(tile.dataset.key);
            selected = null;
            matched++;
            progress.textContent = `${matched} / ${pool.length} matched`;
            if (matched === pool.length) {
                const fb = body.querySelector('#game-feedback');
                fb.innerHTML = `<div class="game-win">🎉 Cleared in ${pool.length} pairs! <button class="modal-btn primary game-again" style="margin-left:0.5rem;">Play again</button></div>`;
                fb.querySelector('.game-again').addEventListener('click', () => startMatchGame(allCards));
            }
        } else {
            tile.classList.add('wrong');
            logGameMiss(selected.dataset.key, tile.dataset.key);
            setTimeout(() => tile.classList.remove('wrong'), 450);
            selected.classList.remove('selected');
            selected = null;
        }
    }));
}

// --- Quiz: character -> pick the meaning (or pinyin) ---
function startQuizGame(allCards) {
    gamesModalEl.querySelector('#game-title').textContent = 'Quiz';
    gameSession.cards = gameShuffle(allCards).slice(0, Math.min(10, allCards.length));
    gameSession.index = 0;
    gameSession.score = 0;
    gameSession.total = gameSession.cards.length;
    showQuizRound(allCards);
}

function showQuizRound(allCards) {
    const gs = gameSession;
    const body = gamesModalEl.querySelector('#game-body');
    if (gs.index >= gs.cards.length) return showGameSummary(allCards, 'quiz');

    const card = gs.cards[gs.index];
    const mode = card.pinyin && Math.random() < 0.4 ? 'pinyin' : 'meaning';
    const textFor = c => mode === 'pinyin' ? (c.pinyin || '') : truncateDefinition(c.def || '', 5);
    const correct = textFor(card) || card.pinyin || '?';

    const options = [correct];
    const seen = new Set([correct]);
    for (const c of gameShuffle(allCards)) {
        if (c.char === card.char) continue;
        const t = textFor(c);
        if (t && !seen.has(t)) { seen.add(t); options.push(t); }
        if (options.length >= 4) break;
    }

    body.innerHTML = `
        <div class="game-header"><span>${gs.index + 1} / ${gs.total}</span><span>Score: ${gs.score}</span></div>
        <div class="quiz-prompt">${escapeHtml(card.char)}</div>
        <div class="quiz-sub">What's the ${mode === 'pinyin' ? 'pinyin' : 'meaning'}?</div>
        <div class="quiz-options">${gameShuffle(options).map(o => `<button class="game-tile quiz-opt">${escapeHtml(o)}</button>`).join('')}</div>
        <div id="game-feedback" class="game-feedback"></div>`;

    body.querySelectorAll('.quiz-opt').forEach(btn => btn.addEventListener('click', () => {
        const isCorrect = btn.textContent === correct;
        body.querySelectorAll('.quiz-opt').forEach(b => {
            b.disabled = true;
            if (b.textContent === correct) b.classList.add('correct');
        });
        if (isCorrect) gs.score++; else { btn.classList.add('wrong'); logGameMiss(card.char); }
        if (card._card) updateCardStats(card._card, isCorrect);
        if (isCorrect && card._hsk) markHskLearned(card._hsk);
        body.querySelector('#game-feedback').innerHTML = gameCardInfoHtml(card);
        gs.index++;
        setTimeout(() => showQuizRound(allCards), 1700);
    }));
}

// --- Listen: hear a character, pick it from four ---
function startListenGame(allCards) {
    gamesModalEl.querySelector('#game-title').textContent = 'Listen';
    gameSession.cards = gameShuffle(allCards).slice(0, Math.min(10, allCards.length));
    gameSession.index = 0;
    gameSession.score = 0;
    gameSession.total = gameSession.cards.length;
    showListenRound(allCards);
}

function showListenRound(allCards) {
    const gs = gameSession;
    const body = gamesModalEl.querySelector('#game-body');
    if (gs.index >= gs.cards.length) return showGameSummary(allCards, 'listen');

    const card = gs.cards[gs.index];
    const others = gameShuffle(allCards.filter(c => c.char !== card.char)).slice(0, 3);
    const options = gameShuffle([card, ...others]);

    body.innerHTML = `
        <div class="game-header"><span>${gs.index + 1} / ${gs.total}</span><span>Score: ${gs.score}</span></div>
        <button id="listen-play" class="listen-play-btn">🔊 Play</button>
        <div class="listen-sub">Which character did you hear?</div>
        <div class="quiz-options listen-options">${options.map(o => `<button class="game-tile listen-opt" data-char="${escapeHtml(o.char)}">${escapeHtml(o.char)}</button>`).join('')}</div>
        <div id="game-feedback" class="game-feedback"></div>`;

    body.querySelector('#listen-play').addEventListener('click', () => speakOnce(card.char));
    setTimeout(() => speakOnce(card.char), 250);

    body.querySelectorAll('.listen-opt').forEach(btn => btn.addEventListener('click', () => {
        const isCorrect = btn.dataset.char === card.char;
        body.querySelectorAll('.listen-opt').forEach(b => {
            b.disabled = true;
            if (b.dataset.char === card.char) b.classList.add('correct');
        });
        if (isCorrect) gs.score++; else { btn.classList.add('wrong'); logGameMiss(card.char, btn.dataset.char); }
        if (card._card) updateCardStats(card._card, isCorrect);
        if (isCorrect && card._hsk) markHskLearned(card._hsk);
        body.querySelector('#game-feedback').innerHTML = gameCardInfoHtml(card);
        gs.index++;
        setTimeout(() => showListenRound(allCards), 1800);
    }));
}

function showGameSummary(allCards, type) {
    const gs = gameSession;
    if (gs.cards.some(c => c._card)) saveFlashcards(); // persist SRS updates
    const pct = gs.total ? Math.round((gs.score / gs.total) * 100) : 0;
    const body = gamesModalEl.querySelector('#game-body');
    body.innerHTML = `
        <div class="game-summary">
            <div class="game-summary-score">${gs.score} / ${gs.total}</div>
            <div class="game-summary-pct">${pct}% correct</div>
            <div class="game-summary-actions">
                <button class="modal-btn primary" id="game-replay">Play again</button>
                <button class="modal-btn" id="game-hub-back">Back to games</button>
            </div>
        </div>`;
    body.querySelector('#game-replay').addEventListener('click', () => startGame(type, allCards));
    body.querySelector('#game-hub-back').addEventListener('click', () => openGamesHub());
}

// --- Speak: say the character aloud; Whisper checks your pronunciation ---
let speakMediaRecorder = null;
let speakChunks = [];
let speakStream = null;
let speakBusy = false;

function startSpeakGame(allCards) {
    gamesModalEl.querySelector('#game-title').textContent = 'Speak';
    gameSession.cards = gameShuffle(allCards).slice(0, Math.min(8, allCards.length));
    gameSession.index = 0;
    gameSession.score = 0;
    gameSession.total = gameSession.cards.length;
    showSpeakRound(allCards);
}

function showSpeakRound(allCards) {
    const gs = gameSession;
    const body = gamesModalEl.querySelector('#game-body');
    if (gs.index >= gs.cards.length) return showGameSummary(allCards, 'speak');
    const card = gs.cards[gs.index];
    body.innerHTML = `
        <div class="game-header"><span>${gs.index + 1} / ${gs.total}</span><span>Score: ${gs.score}</span></div>
        <div class="quiz-prompt">${escapeHtml(card.char)}</div>
        <div class="speak-hint"><span class="speak-pinyin">${escapeHtml(card.pinyin || '')}</span> · ${escapeHtml(truncateDefinition(card.def || '', 5))}
            <button class="modal-btn speak-hear" style="margin-left:0.5rem;">🔊 Hear it</button></div>
        <button id="speak-record-btn" class="speak-record-btn">🎤 Tap &amp; speak</button>
        <div id="game-feedback" class="game-feedback"></div>
        <div id="speak-next-wrap" style="text-align:center; margin-top:0.5rem;"></div>`;
    body.querySelector('.speak-hear').addEventListener('click', () => speakOnce(card.char));
    const recBtn = body.querySelector('#speak-record-btn');
    recBtn.addEventListener('click', () => toggleSpeakRecording(recBtn, card, allCards));
}

async function toggleSpeakRecording(btn, card, allCards) {
    if (speakBusy) return;
    if (speakMediaRecorder && speakMediaRecorder.state === 'recording') {
        speakMediaRecorder.stop();
        return;
    }
    try {
        speakStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (e) {
        gamesModalEl.querySelector('#game-feedback').innerHTML = `<span class="error">Microphone access denied.</span>`;
        return;
    }
    speakChunks = [];
    try {
        speakMediaRecorder = makeRecorder(speakStream);
    } catch (e) {
        speakStream.getTracks().forEach(t => t.stop());
        speakStream = null;
        gamesModalEl.querySelector('#game-feedback').innerHTML = `<span class="error">Recording isn't supported on this browser.</span>`;
        return;
    }
    speakMediaRecorder.ondataavailable = e => { if (e.data.size) speakChunks.push(e.data); };
    speakMediaRecorder.onstop = () => evaluateSpeech(btn, card, allCards);
    speakMediaRecorder.start();
    btn.classList.add('recording');
    btn.textContent = '⏹ Stop';
}

async function evaluateSpeech(btn, card, allCards) {
    if (speakStream) { speakStream.getTracks().forEach(t => t.stop()); speakStream = null; }
    btn.classList.remove('recording');
    btn.textContent = '🎤 Tap & speak';
    if (speakChunks.length === 0) return;
    speakBusy = true;
    const fb = gamesModalEl.querySelector('#game-feedback');
    fb.innerHTML = '<span class="loading">Checking…</span>';
    try {
        const blob = new Blob(speakChunks, { type: (speakChunks[0] && speakChunks[0].type) || 'audio/webm' });
        const result = await sendBlobToWhisper(blob, card.char);
        const { correct, heard } = comparePronunciation(card, result.text || '');
        if (correct) gameSession.score++; else logGameMiss(card.char);
        if (card._card) updateCardStats(card._card, correct);
        if (correct && card._hsk) markHskLearned(card._hsk);
        fb.innerHTML = (correct
            ? `<span style="color:var(--success-color); font-weight:700;">✅ Nice! Heard: ${escapeHtml(heard)}</span>`
            : `<span style="color:var(--danger-color); font-weight:700;">Heard: ${escapeHtml(heard)} — try again</span>`)
            + `<br>${gameCardInfoHtml(card)}`;
        const nextWrap = gamesModalEl.querySelector('#speak-next-wrap');
        nextWrap.innerHTML = `<button class="modal-btn primary" id="speak-next">Next ›</button>`;
        nextWrap.querySelector('#speak-next').addEventListener('click', () => { gameSession.index++; showSpeakRound(allCards); });
    } catch (e) {
        fb.innerHTML = `<span class="error">${escapeHtml(e.message || 'Could not check audio.')}</span>`;
    } finally {
        speakBusy = false;
    }
}

// Correct if Whisper heard the exact character, or a homophone (toneless pinyin match).
function comparePronunciation(card, heardRaw) {
    const clean = s => (s || '').replace(/\s+/g, '').replace(/[，。？！、；：""''（）(),.?!]/g, '');
    const heard = clean(heardRaw);
    if (!heard) return { correct: false, heard: '(nothing heard)' };
    if (heard.includes(card.char)) return { correct: true, heard };
    const targetPy = window.pinyinPro?.pinyin(card.char, { toneType: 'none' }) || '';
    const heardPy = window.pinyinPro?.pinyin(heard, { toneType: 'none' }) || '';
    const correct = !!targetPy && heardPy.split(/\s+/).includes(targetPy);
    return { correct, heard };
}

// ===================================
// ====== PITCH-CONTOUR SHADOWING ====
// ===================================
// Show the canonical Mandarin tone contour for a word, let the learner record
// themselves, extract their pitch track (F0 via autocorrelation) fully in the
// browser, and overlay the two so tone-shape errors are visible. No server call.

let pitchRecorder = null, pitchStream = null, pitchChunks = [], pitchBusy = false;

// Canonical normalized pitch shapes per Mandarin tone (0 = bottom of the
// speaker's range, 1 = top), following Chao tone-letter pitch values.
const TONE_SHAPES = {
    '1': [0.88, 0.90, 0.88],       // high level (55)
    '2': [0.40, 0.55, 0.95],       // rising (35)
    '3': [0.30, 0.12, 0.10, 0.45], // low dipping (214)
    '4': [0.95, 0.55, 0.08],       // falling (51)
    '5': [0.45, 0.40]              // neutral (light)
};

function startPitchGame(allCards) {
    gamesModalEl.querySelector('#game-title').textContent = 'Pitch';
    gameSession.cards = gameShuffle(allCards).slice(0, Math.min(8, allCards.length));
    gameSession.index = 0;
    gameSession.score = 0;
    gameSession.total = gameSession.cards.length;
    showPitchRound(allCards);
}

// Tone digits for each syllable of a word, e.g. 你好 -> ['3','3'].
function wordToneDigits(word) {
    try {
        const arr = window.pinyinPro?.pinyin(word, { toneType: 'num', type: 'array' }) || [];
        return arr.map(s => { const m = String(s).match(/[1-5]/); return m ? m[0] : '5'; });
    } catch (e) { return []; }
}

// Build the target contour as points {x:0..1, y:0..1} across all syllables.
function buildTargetContour(word) {
    const tones = wordToneDigits(word);
    if (!tones.length) return [];
    const pts = [];
    const n = tones.length;
    tones.forEach((t, si) => {
        const shape = TONE_SHAPES[t] || TONE_SHAPES['5'];
        shape.forEach((y, k) => {
            const within = shape.length > 1 ? k / (shape.length - 1) : 0.5;
            const x = (si + within * 0.82 + 0.09) / n; // small gap between syllables
            pts.push({ x, y });
        });
    });
    return pts;
}

function showPitchRound(allCards) {
    const gs = gameSession;
    const body = gamesModalEl.querySelector('#game-body');
    if (gs.index >= gs.cards.length) return showGameSummary(allCards, 'pitch');
    const card = gs.cards[gs.index];
    const py = card.pinyin || (window.pinyinPro?.pinyin ? window.pinyinPro.pinyin(card.char, { toneType: 'symbol' }) : '');
    body.innerHTML = `
        <div class="game-header"><span>${gs.index + 1} / ${gs.total}</span><span>Best: ${gs.score}%</span></div>
        <div class="pitch-prompt">${escapeHtml(card.char)}</div>
        <div class="pitch-py">${escapeHtml(py)} <button class="modal-btn pitch-hear" style="margin-left:0.4rem;">🔊 Hear</button></div>
        <canvas id="pitch-canvas" width="600" height="240"></canvas>
        <div class="pitch-legend"><span class="pitch-key target">target tone</span><span class="pitch-key you">you</span></div>
        <button id="pitch-record-btn" class="speak-record-btn">🎤 Tap &amp; shadow</button>
        <div id="game-feedback" class="game-feedback"></div>
        <div id="pitch-next-wrap" style="text-align:center; margin-top:0.5rem;"></div>`;
    const canvas = body.querySelector('#pitch-canvas');
    const target = buildTargetContour(card.char);
    drawPitchContours(canvas, target, null);
    body.querySelector('.pitch-hear').addEventListener('click', () => speakOnce(card.char));
    const recBtn = body.querySelector('#pitch-record-btn');
    recBtn.addEventListener('click', () => togglePitchRecording(recBtn, card, target, allCards));
}

async function togglePitchRecording(btn, card, target, allCards) {
    if (pitchBusy) return;
    if (pitchRecorder && pitchRecorder.state === 'recording') { pitchRecorder.stop(); return; }
    try {
        pitchStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (e) {
        gamesModalEl.querySelector('#game-feedback').innerHTML = `<span class="error">Microphone access denied.</span>`;
        return;
    }
    pitchChunks = [];
    try { pitchRecorder = makeRecorder(pitchStream); }
    catch (e) {
        pitchStream.getTracks().forEach(t => t.stop()); pitchStream = null;
        gamesModalEl.querySelector('#game-feedback').innerHTML = `<span class="error">Recording isn't supported here.</span>`;
        return;
    }
    pitchRecorder.ondataavailable = e => { if (e.data.size) pitchChunks.push(e.data); };
    pitchRecorder.onstop = () => analyzePitch(btn, card, target, allCards);
    pitchRecorder.start();
    btn.classList.add('recording');
    btn.textContent = '⏹ Stop';
}

async function analyzePitch(btn, card, target, allCards) {
    if (pitchStream) { pitchStream.getTracks().forEach(t => t.stop()); pitchStream = null; }
    btn.classList.remove('recording');
    btn.textContent = '🎤 Tap & shadow';
    if (pitchChunks.length === 0) return;
    pitchBusy = true;
    const fb = gamesModalEl.querySelector('#game-feedback');
    fb.innerHTML = '<span class="loading">Analyzing pitch…</span>';
    try {
        const blob = new Blob(pitchChunks, { type: (pitchChunks[0] && pitchChunks[0].type) || 'audio/webm' });
        const arrayBuf = await blob.arrayBuffer();
        const AC = window.AudioContext || window.webkitAudioContext;
        const ctx = new AC();
        const audioBuf = await ctx.decodeAudioData(arrayBuf);
        ctx.close();
        const measured = extractPitchTrack(audioBuf);
        const canvas = gamesModalEl.querySelector('#pitch-canvas');
        if (measured.length < 3) {
            drawPitchContours(canvas, target, null);
            fb.innerHTML = `<span class="error">Didn't catch a clear voice — try again, a bit louder.</span>`;
        } else {
            drawPitchContours(canvas, target, measured);
            const score = scorePitch(target, measured);
            if (score > gameSession.score) gameSession.score = score;
            const label = score >= 80 ? '🎯 Excellent tone match!' : score >= 60 ? '👍 Close — watch the shape.' : '🔁 Keep shadowing the curve.';
            fb.innerHTML = `<span style="font-weight:700;">${label}</span> <span class="pitch-score">${score}%</span>`;
        }
        const nextWrap = gamesModalEl.querySelector('#pitch-next-wrap');
        nextWrap.innerHTML = `<button class="modal-btn primary" id="pitch-next">Next ›</button>`;
        nextWrap.querySelector('#pitch-next').addEventListener('click', () => { gameSession.index++; showPitchRound(allCards); });
    } catch (e) {
        fb.innerHTML = `<span class="error">${escapeHtml(e.message || 'Could not analyze audio.')}</span>`;
    } finally {
        pitchBusy = false;
    }
}

// Extract a normalized pitch track ({x:0..1, y:0..1}) from an AudioBuffer using
// frame-wise autocorrelation. Unvoiced/quiet frames are dropped.
function extractPitchTrack(audioBuf) {
    const sr = audioBuf.sampleRate;
    const data = audioBuf.getChannelData(0);
    const frame = 1024;
    const hop = Math.max(256, Math.floor((data.length - frame) / 80)); // ~80 frames
    const raw = [];
    for (let start = 0; start + frame <= data.length; start += hop) {
        const f0 = autoCorrelatePitch(data.subarray(start, start + frame), sr);
        raw.push({ t: start / data.length, f0 });
    }
    const voiced = raw.filter(p => p.f0 >= 70 && p.f0 <= 400);
    if (voiced.length < 3) return [];
    const t0 = voiced[0].t, t1 = voiced[voiced.length - 1].t;
    const span = (t1 - t0) || 1;
    const logs = voiced.map(p => Math.log(p.f0));
    const lo = Math.min(...logs), hi = Math.max(...logs);
    const range = (hi - lo) || 1;
    const pts = voiced.map(p => ({
        x: (p.t - t0) / span,
        y: 0.08 + 0.84 * ((Math.log(p.f0) - lo) / range)
    }));
    return smoothContour(pts);
}

function smoothContour(pts) {
    if (pts.length < 3) return pts;
    return pts.map((p, i) => {
        const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
        return { x: p.x, y: (a.y + p.y + b.y) / 3 };
    });
}

// Classic normalized autocorrelation pitch detector; returns Hz or -1 (unvoiced).
function autoCorrelatePitch(buf, sampleRate) {
    const SIZE = buf.length;
    let rms = 0;
    for (let i = 0; i < SIZE; i++) rms += buf[i] * buf[i];
    rms = Math.sqrt(rms / SIZE);
    if (rms < 0.008) return -1; // too quiet
    let r1 = 0, r2 = SIZE - 1;
    const thres = 0.2;
    for (let i = 0; i < SIZE / 2; i++) if (Math.abs(buf[i]) < thres) { r1 = i; break; }
    for (let i = 1; i < SIZE / 2; i++) if (Math.abs(buf[SIZE - i]) < thres) { r2 = SIZE - i; break; }
    const b = buf.subarray(r1, r2);
    const n = b.length;
    if (n < 32) return -1;
    const c = new Float32Array(n);
    for (let i = 0; i < n; i++) { let sum = 0; for (let j = 0; j < n - i; j++) sum += b[j] * b[j + i]; c[i] = sum; }
    let d = 0; while (d < n - 1 && c[d] > c[d + 1]) d++;
    let maxval = -1, maxpos = -1;
    for (let i = d; i < n; i++) if (c[i] > maxval) { maxval = c[i]; maxpos = i; }
    if (maxpos <= 0) return -1;
    let T0 = maxpos;
    const x1 = c[T0 - 1] || 0, x2 = c[T0], x3 = c[T0 + 1] || 0;
    const a = (x1 + x3 - 2 * x2) / 2, bb = (x3 - x1) / 2;
    if (a) T0 = T0 - bb / (2 * a);
    return T0 > 0 ? sampleRate / T0 : -1;
}

// Resample a contour to N evenly-spaced x samples (linear interpolation).
function resampleContour(pts, N) {
    if (!pts.length) return [];
    const sorted = pts.slice().sort((p, q) => p.x - q.x);
    const out = [];
    let j = 0;
    for (let i = 0; i < N; i++) {
        const x = i / (N - 1);
        while (j < sorted.length - 1 && sorted[j + 1].x < x) j++;
        const a = sorted[Math.min(j, sorted.length - 1)];
        const b = sorted[Math.min(j + 1, sorted.length - 1)];
        const dx = (b.x - a.x) || 1;
        const f = Math.max(0, Math.min(1, (x - a.x) / dx));
        out.push(a.y + (b.y - a.y) * f);
    }
    return out;
}

// Score similarity of the measured contour to the target (0-100) via correlation
// of the SHAPE (mean-removed) — tone is relative movement, not absolute pitch —
// plus a small penalty for absolute level mismatch.
function scorePitch(target, measured) {
    const N = 24;
    const t = resampleContour(target, N);
    const m = resampleContour(measured, N);
    if (t.length !== N || m.length !== N) return 0;
    const mean = a => a.reduce((s, v) => s + v, 0) / a.length;
    const tm = mean(t), mm = mean(m);
    let num = 0, dt = 0, dm = 0;
    for (let i = 0; i < N; i++) { const a = t[i] - tm, b = m[i] - mm; num += a * b; dt += a * a; dm += b * b; }
    const corr = num / (Math.sqrt(dt * dm) || 1); // -1..1
    const level = 1 - Math.min(1, Math.abs(tm - mm) * 1.2);
    const combined = 0.8 * ((corr + 1) / 2) + 0.2 * level;
    return Math.max(0, Math.min(100, Math.round(combined * 100)));
}

function drawPitchContours(canvas, target, measured) {
    if (!canvas || !canvas.getContext) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    const pad = 16;
    const X = x => pad + x * (W - 2 * pad);
    const Y = y => H - pad - y * (H - 2 * pad);
    ctx.strokeStyle = 'rgba(128,128,128,0.18)'; ctx.lineWidth = 1;
    for (let g = 0; g <= 4; g++) { const y = Y(g / 4); ctx.beginPath(); ctx.moveTo(pad, y); ctx.lineTo(W - pad, y); ctx.stroke(); }
    const css = getComputedStyle(document.documentElement);
    const accent = css.getPropertyValue('--accent-color').trim() || '#5f5be6';
    const accent2 = css.getPropertyValue('--accent-2').trim() || '#17c0aa';
    drawCurve(ctx, target, X, Y, accent2, 5, true);
    if (measured && measured.length) drawCurve(ctx, measured, X, Y, accent, 3.5, false);
}

function drawCurve(ctx, pts, X, Y, color, width, dashed) {
    if (!pts || !pts.length) return;
    const sorted = pts.slice().sort((p, q) => p.x - q.x);
    ctx.save();
    ctx.strokeStyle = color; ctx.lineWidth = width; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    ctx.globalAlpha = dashed ? 0.6 : 0.95;
    if (dashed) ctx.setLineDash([2, 9]);
    ctx.beginPath();
    sorted.forEach((p, i) => { const x = X(p.x), y = Y(p.y); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); });
    ctx.stroke();
    ctx.restore();
}

// --- Trouble spots: surface & drill the Confusion Graph the games have logged ---
function confusionMissCount() {
    return Object.keys(confusionData.miss || {}).length;
}

// Tone number (1-5) of a single character's first syllable, for coloring.
function charToneNum(char) {
    try {
        const arr = window.pinyinPro?.pinyin(char, { toneType: 'num', type: 'array' }) || [];
        const m = (arr[0] || '').match(/[1-5]/);
        return m ? m[0] : '5';
    } catch (e) { return '5'; }
}

// Turn a bare character into a game card (pinyin + short def), reusing a real
// deck card when one exists so drilling still feeds the SRS.
function buildDrillCard(char) {
    const deck = getActiveDeck();
    const existing = deck && deck.cards.find(c => c.char === char);
    if (existing) return { char, pinyin: existing.pinyin, def: existing.def, _card: existing };
    return {
        char,
        pinyin: window.pinyinPro?.pinyin(char, { toneType: 'symbol' }) || '',
        def: (dictionary?.[char] || '').split(';')[0].split('/')[0].replace(/\[.*?\]|\(.*?\)/g, '').trim(),
        _card: null
    };
}

function showTroubleSpots() {
    gamesAtHub = false;
    setGameCloseLabel(true);
    const body = gamesModalEl.querySelector('#game-body');
    gamesModalEl.querySelector('#game-title').textContent = 'Trouble spots';
    const misses = Object.entries(confusionData.miss || {}).sort((a, b) => b[1] - a[1]);
    const pairs = Object.entries(confusionData.pairs || {}).sort((a, b) => b[1] - a[1]).slice(0, 8);

    if (!misses.length) {
        body.innerHTML = `<p class="info" style="text-align:center; padding:1.5rem 0.5rem;">No trouble spots yet — play a few rounds and the characters you miss will collect here for targeted drilling.</p>
            <div style="text-align:center;"><button class="modal-btn" id="trouble-back">Back to games</button></div>`;
        body.querySelector('#trouble-back').addEventListener('click', () => openGamesHub());
        return;
    }

    const items = misses.slice(0, 12).map(([char, n]) => {
        const card = buildDrillCard(char);
        const py = escapeHtml(card.pinyin || '');
        const def = escapeHtml(truncateDefinition(card.def || '', 5));
        return `<li class="trouble-item">
            <span class="trouble-char tone-${charToneNum(char)}">${escapeHtml(char)}</span>
            <span class="trouble-info"><span class="trouble-py">${py}</span><span class="trouble-def">${def}</span></span>
            <span class="trouble-count" title="missed ${n} time${n === 1 ? '' : 's'}">×${n}</span>
        </li>`;
    }).join('');

    const pairsHtml = pairs.length ? `
        <div class="trouble-subhead">Easily confused</div>
        <div class="trouble-pairs">${pairs.map(([key, n]) => {
            const [a, b] = key.split('→');
            return `<span class="trouble-pair"><b class="tone-${charToneNum(a)}">${escapeHtml(a)}</b> vs <b class="tone-${charToneNum(b)}">${escapeHtml(b)}</b> <em>×${n}</em></span>`;
        }).join('')}</div>` : '';

    body.innerHTML = `
        <p class="game-hub-sub">The characters you miss most, straight from your game history.</p>
        <ul class="trouble-list">${items}</ul>
        ${pairsHtml}
        <div class="trouble-actions">
            <button class="modal-btn primary" id="trouble-drill">🎯 Drill these</button>
            <button class="modal-btn" id="trouble-hub">Back to games</button>
            <button class="modal-btn danger-ghost" id="trouble-clear">Clear</button>
        </div>`;

    body.querySelector('#trouble-drill').addEventListener('click', startTroubleDrill);
    body.querySelector('#trouble-hub').addEventListener('click', () => openGamesHub());
    body.querySelector('#trouble-clear').addEventListener('click', () => {
        if (!confirm('Clear your logged trouble spots? This cannot be undone.')) return;
        confusionData = { miss: {}, pairs: {} };
        saveConfusionData();
        openGamesHub();
    });
}

// Build a drill pool from the most-missed characters, padded with other known
// cards so the picked games always have enough distractors, then open the hub.
function startTroubleDrill() {
    const missChars = Object.entries(confusionData.miss || {})
        .sort((a, b) => b[1] - a[1]).slice(0, 12).map(e => e[0]);
    const drill = missChars.map(buildDrillCard);
    const have = new Set(missChars);
    for (const c of getGamesSourceCards()) {
        if (drill.length >= Math.max(8, missChars.length + 4)) break;
        if (c.char && !have.has(c.char)) { have.add(c.char); drill.push(c); }
    }
    openGamesHub(drill);
}

// ===================================
// ======== IMAGE / CAMERA OCR =======
// ===================================
// Extract Chinese text from a photo or uploaded image. Uses the server's
// OpenAI Vision endpoint by default, and lazy-loads Tesseract.js as an
// on-device fallback when offline or if the server call fails.

const ocrBtn = document.getElementById('ocr-btn');
const ocrFileInput = document.getElementById('ocr-file-input');
let tesseractLoadPromise = null;

if (ocrBtn && ocrFileInput) {
    ocrBtn.addEventListener('click', () => ocrFileInput.click());
    ocrFileInput.addEventListener('change', () => {
        const file = ocrFileInput.files && ocrFileInput.files[0];
        if (file) handleOcrImage(file);
        ocrFileInput.value = ''; // allow re-selecting the same file
    });
}

async function ocrViaServer(file) {
    const formData = new FormData();
    formData.append('image', file);
    const response = await fetch(`${backendUrl}/ocr`, { method: 'POST', body: formData });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Server OCR error');
    return data.text || '';
}

function loadTesseract() {
    if (window.Tesseract) return Promise.resolve(window.Tesseract);
    if (tesseractLoadPromise) return tesseractLoadPromise;
    tesseractLoadPromise = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js';
        script.onload = () => resolve(window.Tesseract);
        script.onerror = () => { tesseractLoadPromise = null; reject(new Error('Could not load the offline OCR engine.')); };
        document.head.appendChild(script);
    });
    return tesseractLoadPromise;
}

async function ocrViaTesseract(file) {
    const Tesseract = await loadTesseract();
    const { data } = await Tesseract.recognize(file, 'chi_sim');
    // On-device Chinese OCR tends to insert spaces between characters; strip them.
    return (data.text || '').replace(/\s+/g, '');
}

async function handleOcrImage(file) {
    processingOverlay.classList.add('visible');
    let text = '';
    try {
        try {
            text = navigator.onLine ? await ocrViaServer(file) : await ocrViaTesseract(file);
        } catch (serverErr) {
            // Fall back to on-device OCR if the server path fails while online.
            console.warn('Server OCR failed, trying on-device:', serverErr.message);
            text = await ocrViaTesseract(file);
        }

        if (text && text.trim()) {
            const cleaned = text.trim().replace(/\n/g, '。');
            statsContent.innerHTML = '';
            await processTranscription(cleaned);
        } else {
            processingOverlay.classList.remove('visible');
            showModal('No text found', 'No Chinese text was detected in that image. Try a clearer, closer photo.');
        }
    } catch (error) {
        processingOverlay.classList.remove('visible');
        showModal('Scan failed', escapeHtml(error.message || 'Could not read the image.'));
    }
}

// ===================================
// ======== REALTIME VOICE TUTOR =====
// ===================================
// Live spoken conversation with an AI Mandarin tutor over WebRTC. The server
// mints a short-lived ephemeral token (/realtime-session); the browser then
// opens a peer connection straight to OpenAI's Realtime API. The real API key
// never reaches the client.

let tutorPc = null;
let tutorStream = null;
let tutorModalEl = null;
let tutorActive = false;

const voiceTutorBtn = document.getElementById('voice-tutor-btn');
if (voiceTutorBtn) voiceTutorBtn.addEventListener('click', openVoiceTutor);

// Scenario Director: role-play missions the tutor stays in character for.
const TUTOR_SCENARIOS = [
    { id: 'free', emoji: '💬', name: 'Free chat', prompt: '' },
    { id: 'restaurant', emoji: '🍜', name: 'Order food', prompt: 'You are a waiter at a Chinese restaurant; the learner is ordering a meal.' },
    { id: 'directions', emoji: '🧭', name: 'Ask directions', prompt: 'You are a passer-by; the learner is lost and asking how to get somewhere.' },
    { id: 'shopping', emoji: '🛍️', name: 'Go shopping', prompt: 'You are a shop clerk; the learner is buying clothes and asking about size and price.' },
    { id: 'rent', emoji: '🏠', name: 'Rent a flat', prompt: 'You are a landlord; the learner is negotiating rent and asking about the apartment.' },
    { id: 'doctor', emoji: '🏥', name: 'See a doctor', prompt: 'You are a doctor; the learner describes feeling unwell and you ask about symptoms.' },
    { id: 'interview', emoji: '💼', name: 'Job interview', prompt: 'You are an interviewer; the learner is interviewing for a job and you ask about their experience.' }
];
let tutorScenario = TUTOR_SCENARIOS[0];
let tutorTranscriptLog = [];
let tutorTargetWords = [];

// Up to 8 SRS cards that are due, as the words to weave into this session.
function gatherDueWords() {
    const now = Date.now();
    const due = [];
    (flashcardStore.decks || []).forEach(d => (d.cards || []).forEach(c => {
        if (!c.char || c.suspended) return;
        const s = c.stats || {};
        if ((s.due || 0) <= now) due.push({ char: c.char, due: s.due || 0 });
    }));
    due.sort((a, b) => a.due - b.due);
    return due.slice(0, 8).map(d => d.char);
}

function renderTutorScenarios() {
    const wrap = tutorModalEl.querySelector('#tutor-scenarios');
    wrap.style.display = '';
    wrap.innerHTML = TUTOR_SCENARIOS.map(s =>
        `<button class="tutor-scenario ${s.id === tutorScenario.id ? 'active' : ''}" data-id="${s.id}">${s.emoji} ${escapeHtml(s.name)}</button>`).join('');
    wrap.querySelectorAll('.tutor-scenario').forEach(btn => btn.addEventListener('click', () => {
        tutorScenario = TUTOR_SCENARIOS.find(s => s.id === btn.dataset.id) || TUTOR_SCENARIOS[0];
        wrap.querySelectorAll('.tutor-scenario').forEach(b => b.classList.toggle('active', b === btn));
    }));
}

// One bounded pass after the call: which target words were used + top fixes.
async function runTutorDebrief() {
    const debriefEl = tutorModalEl && tutorModalEl.querySelector('#tutor-debrief');
    if (!debriefEl || !tutorTranscriptLog.length) return;
    const transcript = tutorTranscriptLog.map(l => `${l.who === 'you' ? 'You' : 'Tutor'}: ${l.zh}`).join('\n');
    debriefEl.innerHTML = `<div class="tutor-debrief-title">Debrief</div><p class="loading">Reviewing your conversation…</p>`;
    try {
        const resp = await fetch(`${backendUrl}/tutor-debrief`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ transcript, targetWords: tutorTargetWords })
        });
        const data = await resp.json();
        if (!resp.ok) throw new Error(data.error || 'Debrief failed.');
        const used = (data.used || []).filter(Boolean);
        const usedHtml = tutorTargetWords.length
            ? `<div class="tutor-debrief-used">Target words: ${tutorTargetWords.map(w => `<span class="${used.includes(w) ? 'used' : 'missed'}">${escapeHtml(w)}</span>`).join(' ')}</div>`
            : '';
        const corr = (data.corrections || []).slice(0, 4).map(c =>
            `<div class="tutor-correction"><span class="c-said">${escapeHtml(c.said || '')}</span> → <span class="c-better">${escapeHtml(c.better || '')}</span>${c.note ? `<div class="c-note">${escapeHtml(c.note)}</div>` : ''}</div>`).join('');
        debriefEl.innerHTML = `<div class="tutor-debrief-title">Debrief</div>${usedHtml}${corr || '<p class="info">Nice — nothing major to correct.</p>'}`;
    } catch (e) {
        debriefEl.innerHTML = `<div class="tutor-debrief-title">Debrief</div><p class="error">${escapeHtml(e.message)}</p>`;
    }
}

function ensureTutorModal() {
    if (tutorModalEl) return tutorModalEl;
    tutorModalEl = document.createElement('div');
    tutorModalEl.id = 'tutor-modal';
    tutorModalEl.className = 'main-modal';
    tutorModalEl.innerHTML = `
        <div class="modal-content tutor-modal-content">
            <div class="game-topbar">
                <h3>Voice Tutor</h3>
                <button id="tutor-close" class="modal-btn">Close</button>
            </div>
            <div id="tutor-scenarios" class="tutor-scenarios"></div>
            <div id="tutor-orb" class="tutor-orb"></div>
            <div id="tutor-status" class="tutor-status">Pick a scenario (or free chat), then tap start and speak in Chinese.</div>
            <button id="tutor-toggle" class="speak-record-btn">Start conversation</button>
            <div id="tutor-transcript" class="tutor-transcript"></div>
            <div id="tutor-debrief" class="tutor-debrief"></div>
            <audio id="tutor-audio" autoplay></audio>
        </div>`;
    document.body.appendChild(tutorModalEl);
    tutorModalEl.querySelector('#tutor-close').addEventListener('click', () => { stopTutor(true); tutorModalEl.classList.remove('active'); });
    tutorModalEl.querySelector('#tutor-toggle').addEventListener('click', () => tutorActive ? stopTutor() : startTutor());
    tutorModalEl.addEventListener('click', (e) => { if (e.target === tutorModalEl) { stopTutor(true); tutorModalEl.classList.remove('active'); } });
    return tutorModalEl;
}

function openVoiceTutor() {
    ensureTutorModal();
    const status = tutorModalEl.querySelector('#tutor-status');
    const toggle = tutorModalEl.querySelector('#tutor-toggle');
    status.textContent = 'Tap start, then just speak in Chinese — your AI tutor replies out loud.';
    toggle.textContent = 'Start conversation';
    toggle.classList.remove('recording');
    tutorModalEl.querySelector('#tutor-orb').classList.remove('active');
    tutorModalEl.querySelector('#tutor-transcript').innerHTML = '';
    tutorModalEl.querySelector('#tutor-debrief').innerHTML = '';
    renderTutorScenarios();
    tutorModalEl.classList.add('active');
}

async function startTutor() {
    const status = tutorModalEl.querySelector('#tutor-status');
    const toggle = tutorModalEl.querySelector('#tutor-toggle');
    const orb = tutorModalEl.querySelector('#tutor-orb');
    status.textContent = 'Connecting…';
    toggle.disabled = true;
    tutorTranscriptLog = [];
    tutorTargetWords = gatherDueWords();
    tutorModalEl.querySelector('#tutor-scenarios').style.display = 'none';
    tutorModalEl.querySelector('#tutor-debrief').innerHTML = '';
    try {
        // 1. Ephemeral token from our server (with the chosen scenario + due words).
        const sess = await fetch(`${backendUrl}/realtime-session`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ scenario: tutorScenario.prompt, targetWords: tutorTargetWords })
        });
        const sdata = await sess.json();
        if (!sess.ok) throw new Error(sdata.error || 'Could not start a session.');

        // 2. Peer connection + remote audio playback.
        tutorPc = new RTCPeerConnection();
        const audioEl = tutorModalEl.querySelector('#tutor-audio');
        tutorPc.ontrack = (e) => { audioEl.srcObject = e.streams[0]; };
        tutorPc.onconnectionstatechange = () => {
            if (tutorPc && ['failed', 'disconnected', 'closed'].includes(tutorPc.connectionState)) {
                if (tutorActive) { status.textContent = 'Connection lost.'; stopTutor(); }
            }
        };

        // 3. Microphone.
        tutorStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        tutorStream.getTracks().forEach(t => tutorPc.addTrack(t, tutorStream));

        // 4. Data channel (events). Greet the learner once it opens.
        const dc = tutorPc.createDataChannel('oai-events');
        dc.onopen = () => { try { dc.send(JSON.stringify({ type: 'response.create' })); } catch (_) { /* ignore */ } };
        dc.onmessage = (e) => { try { handleTutorEvent(JSON.parse(e.data)); } catch (_) { /* ignore non-JSON */ } };

        // 5. SDP offer -> OpenAI Realtime -> answer.
        const offer = await tutorPc.createOffer();
        await tutorPc.setLocalDescription(offer);
        const sdpResp = await fetch('https://api.openai.com/v1/realtime/calls', {
            method: 'POST',
            body: offer.sdp,
            headers: { 'Authorization': `Bearer ${sdata.token}`, 'Content-Type': 'application/sdp' }
        });
        if (!sdpResp.ok) throw new Error(`Realtime handshake failed (${sdpResp.status}).`);
        await tutorPc.setRemoteDescription({ type: 'answer', sdp: await sdpResp.text() });

        tutorActive = true;
        status.textContent = '🎙️ Connected — start speaking in Chinese!';
        toggle.textContent = 'End conversation';
        toggle.classList.add('recording');
        orb.classList.add('active');
    } catch (error) {
        console.error('Voice tutor error:', error);
        status.innerHTML = `<span class="error">${escapeHtml(error.message || 'Could not connect.')}</span>`;
        stopTutor(true);
    } finally {
        toggle.disabled = false;
    }
}

function stopTutor(silent) {
    tutorActive = false;
    if (tutorStream) { tutorStream.getTracks().forEach(t => t.stop()); tutorStream = null; }
    if (tutorPc) { try { tutorPc.close(); } catch (_) { /* ignore */ } tutorPc = null; }
    if (tutorModalEl && !silent) {
        const toggle = tutorModalEl.querySelector('#tutor-toggle');
        toggle.textContent = 'Start conversation';
        toggle.classList.remove('recording');
        tutorModalEl.querySelector('#tutor-orb').classList.remove('active');
        tutorModalEl.querySelector('#tutor-status').textContent = 'Conversation ended. Tap start to go again.';
        renderTutorScenarios();
        runTutorDebrief(); // one bounded review pass over what was said
    }
}

// Realtime events carry transcripts of both sides. Render each as Chinese +
// pinyin (local) + English (translated, cached). Event names vary slightly by
// API version, so we match a few.
function handleTutorEvent(evt) {
    if (!evt || !evt.type) return;
    if (evt.type === 'conversation.item.input_audio_transcription.completed' && evt.transcript) {
        addTutorTranscriptLine('you', evt.transcript);
    } else if ((evt.type === 'response.audio_transcript.done' || evt.type === 'response.output_audio_transcript.done') && evt.transcript) {
        addTutorTranscriptLine('tutor', evt.transcript);
    }
}

async function addTutorTranscriptLine(who, chinese) {
    chinese = (chinese || '').trim();
    if (!chinese || !tutorModalEl) return;
    tutorTranscriptLog.push({ who, zh: chinese }); // for the debrief
    const wrap = tutorModalEl.querySelector('#tutor-transcript');
    if (!wrap) return;
    const pinyin = window.pinyinPro?.pinyin ? window.pinyinPro.pinyin(chinese, { toneType: 'symbol' }) : '';
    const line = document.createElement('div');
    line.className = `tutor-line ${who}`;
    line.innerHTML = `
        <div class="tutor-line-who">${who === 'you' ? 'You' : 'Tutor'}</div>
        <div class="tutor-line-zh">${escapeHtml(chinese)}</div>
        <div class="tutor-line-py">${escapeHtml(pinyin)}</div>
        <div class="tutor-line-en loading">…</div>`;
    wrap.appendChild(line);
    wrap.scrollTop = wrap.scrollHeight;
    const enEl = line.querySelector('.tutor-line-en');
    try {
        const en = await translateText(chinese, 'EN');
        enEl.textContent = en;
    } catch (_) {
        enEl.textContent = '(translation unavailable)';
    }
    enEl.classList.remove('loading');
    wrap.scrollTop = wrap.scrollHeight;
}

// ===================================
// ============ BOOK READER ==========
// ===================================
// Read a Chinese book (EPUB / PDF / TXT) in a continuous-scroll reader with
// tone-colored pinyin over every character, new-character underlining,
// tap-to-define, and lazy per-paragraph translation (cached server-side).
// Pinyin + dictionary are free/local; only translation (on tap) costs anything.

const readBookBtn = document.getElementById('read-book-btn');
const bookFileInput = document.getElementById('book-file-input');
let jsZipPromise = null;
let pdfJsPromise = null;
let readerObserver = null;

if (readBookBtn && bookFileInput) {
    readBookBtn.addEventListener('click', () => bookFileInput.click());
    bookFileInput.addEventListener('change', () => {
        const file = bookFileInput.files && bookFileInput.files[0];
        if (file) handleBookFile(file);
        bookFileInput.value = '';
    });
}

function loadScriptOnce(src, globalName, existingPromiseSetter, existingPromise, friendly) {
    if (window[globalName]) return Promise.resolve(window[globalName]);
    if (existingPromise) return existingPromise;
    const p = new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = src;
        s.onload = () => resolve(window[globalName]);
        s.onerror = () => reject(new Error(friendly || 'Could not load a required library.'));
        document.head.appendChild(s);
    });
    existingPromiseSetter(p);
    return p;
}
function loadJSZip() {
    return loadScriptOnce('https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js', 'JSZip',
        (p) => { jsZipPromise = p; }, jsZipPromise, 'Could not load the EPUB engine.');
}
function loadPdfJs() {
    if (window.pdfjsLib) return Promise.resolve(window.pdfjsLib);
    if (pdfJsPromise) return pdfJsPromise;
    pdfJsPromise = new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.min.js';
        s.onload = () => {
            window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js';
            resolve(window.pdfjsLib);
        };
        s.onerror = () => { pdfJsPromise = null; reject(new Error('Could not load the PDF engine.')); };
        document.head.appendChild(s);
    });
    return pdfJsPromise;
}

async function handleBookFile(file) {
    const name = (file.name || '').toLowerCase();
    processingOverlay.classList.add('visible');
    try {
        let book;
        if (name.endsWith('.epub')) book = await parseBookEpub(file);
        else if (name.endsWith('.pdf')) book = await parseBookPdf(file);
        else book = await parseBookTxt(file);
        processingOverlay.classList.remove('visible');
        if (!book.chapters || book.chapters.length === 0) {
            showModal('Nothing to read', 'Could not extract any text from that file.');
            return;
        }
        openReader(book);
    } catch (error) {
        processingOverlay.classList.remove('visible');
        showModal('Could not open book', escapeHtml(error.message || 'Parsing failed.'));
    }
}

// Split plain text into chapters on common Chinese/English chapter headings.
function textToChapters(text, fallbackTitle) {
    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    const chapterRe = /^(第\s*[0-9零一二三四五六七八九十百千两]+\s*[章回節节篇卷]|Chapter\s+\d+|CHAPTER\s+\d+)/;
    const chapters = [];
    let current = { title: fallbackTitle || 'Start', paragraphs: [] };
    for (const line of lines) {
        if (chapterRe.test(line) && line.length < 40) {
            if (current.paragraphs.length) chapters.push(current);
            current = { title: line, paragraphs: [] };
        } else {
            current.paragraphs.push(line);
        }
    }
    if (current.paragraphs.length) chapters.push(current);
    return chapters.length ? chapters : [{ title: fallbackTitle || 'Text', paragraphs: lines }];
}

async function parseBookTxt(file) {
    const text = await file.text();
    return { title: file.name.replace(/\.[^.]+$/, ''), chapters: textToChapters(text, file.name) };
}

async function parseBookEpub(file) {
    const JSZip = await loadJSZip();
    const zip = await JSZip.loadAsync(file);
    const parser = new DOMParser();
    const containerXml = await zip.file('META-INF/container.xml').async('string');
    const opfPath = parser.parseFromString(containerXml, 'application/xml')
        .querySelector('rootfile').getAttribute('full-path');
    const opfDir = opfPath.includes('/') ? opfPath.replace(/[^/]+$/, '') : '';
    const opf = parser.parseFromString(await zip.file(opfPath).async('string'), 'application/xml');
    const title = opf.querySelector('metadata title, title')?.textContent?.trim() || file.name;
    const manifest = {};
    opf.querySelectorAll('manifest > item').forEach(it => { manifest[it.getAttribute('id')] = it.getAttribute('href'); });
    const spine = [...opf.querySelectorAll('spine > itemref')]
        .map(ir => manifest[ir.getAttribute('idref')]).filter(Boolean);

    const chapters = [];
    for (const href of spine) {
        const path = opfDir + decodeURIComponent(href.split('#')[0]);
        const entry = zip.file(path);
        if (!entry) continue;
        const doc = parser.parseFromString(await entry.async('string'), 'text/html');
        const chTitle = doc.querySelector('h1,h2,h3,title')?.textContent?.trim() || `Section ${chapters.length + 1}`;

        // Walk paragraphs and images in document order so illustrations stay in place.
        const blocks = [];
        for (const node of doc.querySelectorAll('p, img, image')) {
            const tag = node.tagName.toLowerCase();
            if (tag === 'img' || tag === 'image') {
                const rawSrc = node.getAttribute('src') || node.getAttribute('xlink:href') || node.getAttribute('href');
                const imgPath = resolveZipPath(path, rawSrc);
                if (!imgPath) continue;
                const dataUrl = await zipImageToDataUrl(zip, imgPath);
                if (dataUrl) blocks.push({ t: 'img', src: dataUrl });
            } else {
                const text = node.textContent.replace(/\s+/g, ' ').trim();
                if (text) blocks.push({ t: 'p', text });
            }
        }
        if (blocks.every(b => b.t !== 'p')) {
            (doc.body?.textContent || '').split(/\n+/).map(s => s.trim()).filter(Boolean).forEach(t => blocks.push({ t: 'p', text: t }));
        }
        if (blocks.some(b => b.t === 'img' || (b.text && chineseCharRegex.test(b.text)))) {
            chapters.push({ title: chTitle, blocks });
        }
    }
    return { title, chapters };
}

// Resolve an epub-internal image reference (relative to the chapter file) to a
// zip path, handling ./ and ../
function resolveZipPath(base, rel) {
    if (!rel) return null;
    rel = decodeURIComponent(rel.split(/[?#]/)[0]);
    if (/^[a-z]+:\/\//i.test(rel) || rel.startsWith('data:')) return null; // external/inline
    const baseDir = base.includes('/') ? base.replace(/[^/]+$/, '') : '';
    const out = [];
    for (const part of (baseDir + rel).split('/')) {
        if (part === '..') out.pop();
        else if (part !== '.' && part !== '') out.push(part);
    }
    return out.join('/');
}

async function zipImageToDataUrl(zip, path) {
    const entry = zip.file(path);
    if (!entry) return null;
    try {
        const base64 = await entry.async('base64');
        const ext = (path.split('.').pop() || '').toLowerCase();
        const mime = ext === 'png' ? 'image/png' : ext === 'gif' ? 'image/gif'
            : ext === 'svg' ? 'image/svg+xml' : ext === 'webp' ? 'image/webp' : 'image/jpeg';
        return `data:${mime};base64,${base64}`;
    } catch (_) { return null; }
}

async function parseBookPdf(file) {
    const pdfjsLib = await loadPdfJs();
    const data = new Uint8Array(await file.arrayBuffer());
    const pdf = await pdfjsLib.getDocument({ data }).promise;
    const chapters = [];
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        let text = content.items.map(it => it.str).join(' ').replace(/[ \t]+/g, ' ').trim();
        if (text.replace(/\s/g, '').length < 4) {
            // Likely a scanned/image page — OCR it (pricier).
            text = await ocrPdfPage(page);
        }
        if (text && chineseCharRegex.test(text)) {
            const paragraphs = text.split(/(?<=[。！？!?])/).map(s => s.trim()).filter(Boolean);
            chapters.push({ title: `Page ${i}`, paragraphs: paragraphs.length ? paragraphs : [text] });
        }
    }
    return { title: file.name.replace(/\.[^.]+$/, ''), chapters };
}

async function ocrPdfPage(page) {
    try {
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
        const blob = await new Promise(r => canvas.toBlob(r, 'image/jpeg', 0.85));
        return await ocrViaServer(blob);
    } catch (_) {
        return '';
    }
}

// Characters the learner already knows: everything in their decks + seen stats.
function buildKnownCharSet() {
    const set = new Set();
    (flashcardStore.decks || []).forEach(d => (d.cards || []).forEach(c => {
        if (c.char) for (const ch of c.char) set.add(ch);
    }));
    try {
        const globalStats = calculateGlobalStats();
        Object.keys(globalStats).forEach(ch => set.add(ch));
    } catch (_) { /* ignore */ }
    return set;
}

// --- Retrievability heat: estimate how much a scheduled card's memory has
// decayed since its last review (R = exp(-elapsed / stability), R≈0.37 at due),
// so the reader can tint fading words. Reading them becomes a micro-review. ---
function cardRetrievability(stats) {
    if (!stats) return 1;
    const interval = Number(stats.interval) || 0;
    const due = Number(stats.due) || 0;
    if (interval <= 0 || !due) return 0.3; // brand-new / in learning: fragile
    const DAY = 86400000;
    const elapsedDays = interval - (due - Date.now()) / DAY;
    const stability = Math.max(interval, 0.1);
    return Math.exp(-Math.max(elapsedDays, 0) / stability);
}

// 0 = solid (no tint), 1 = faint, 2 = warm, 3 = hot (due/overdue).
function heatLevelFromR(r) {
    if (r >= 0.85) return 0;
    if (r >= 0.6) return 1;
    if (r >= 0.35) return 2;
    return 3;
}

// char -> highest heat (lowest retrievability) among the cards containing it.
function buildReaderHeatMap() {
    const map = new Map();
    (flashcardStore.decks || []).forEach(d => (d.cards || []).forEach(c => {
        if (!c.char) return;
        const lvl = heatLevelFromR(cardRetrievability(c.stats));
        if (!lvl) return;
        for (const ch of c.char) {
            if (!chineseCharRegex.test(ch)) continue;
            map.set(ch, Math.max(map.get(ch) || 0, lvl));
        }
    }));
    return map;
}

function readerToneNumber(ch) {
    const arr = window.pinyinPro?.pinyin ? window.pinyinPro.pinyin(ch, { toneType: 'num', type: 'array' }) : null;
    const m = arr && arr[0] ? arr[0].match(/[1-5]/) : null;
    return m ? m[0] : '5';
}

// One pinyin-pro call per character gives both the toned pinyin and the tone
// number (was two calls per char).
function readerPinyinTone(ch) {
    if (!window.pinyinPro?.pinyin) return { py: '', tone: '5' };
    const r = window.pinyinPro.pinyin(ch, { type: 'all' });
    const o = Array.isArray(r) ? r[0] : r;
    if (!o) return { py: '', tone: '5' };
    const m = String(o.num == null ? '' : o.num).match(/[1-5]/);
    return { py: o.pinyin || '', tone: m ? m[0] : '5' };
}

// One tone-colored, tappable character (opens its individual meaning card).
function renderCharRuby(ch, known) {
    const { py, tone } = readerPinyinTone(ch);
    const newClass = known && !known.has(ch) ? ' new-char' : '';
    const heat = readerHeat && readerHeat.get(ch);
    const heatClass = heat ? ` rd-heat-${heat}` : '';
    return `<ruby class="rd-char tone-${tone}${newClass}${heatClass}" data-char="${escapeHtml(ch)}" onclick="event.stopPropagation(); window.readerCharInfo(this)">${escapeHtml(ch)}<rt>${escapeHtml(py)}</rt></ruby>`;
}

function renderReaderParagraph(text, known) {
    let inner = '';
    // Segment into words (like the dashboard) so a multi-character word is one
    // tap target for its combined meaning, while each character inside is still
    // individually tappable for its own meaning.
    let tokens = null;
    if (segmentit && typeof segmentit.doSegment === 'function') {
        try { tokens = segmentit.doSegment(text, { simple: true }).map(t => t.w || t); } catch (_) { tokens = null; }
    }
    if (!tokens) tokens = Array.from(text); // fallback: character by character
    for (const tok of tokens) {
        const s = String(tok);
        if (!chineseCharRegex.test(s)) { inner += escapeHtml(s); continue; }
        let rubies = '';
        for (const ch of s) rubies += chineseCharRegex.test(ch) ? renderCharRuby(ch, known) : escapeHtml(ch);
        // Wrap real multi-character words; a single char needs no wrapper.
        inner += (Array.from(s).length > 1)
            ? `<span class="rd-word" data-word="${escapeHtml(s)}" onclick="window.readerWordInfo(this)">${rubies}</span>`
            : rubies;
    }
    // NB: this wrapper is a <div>, not a <p>: it contains a block-level
    // <div class="rd-registers">, which the parser would hoist out of a <p>
    // (breaking readerRegister's para.querySelector('.rd-registers') lookup).
    return `<div class="rd-para" data-zh="${escapeHtml(text)}">${inner} <button class="rd-play" onclick="window.readerPlayParagraph(this)" title="Read this paragraph aloud" aria-label="Read this paragraph aloud">🔊</button><button class="rd-translate" onclick="window.readerTranslate(this)" title="Show English translation" aria-label="Show English translation">译</button><button class="rd-register" onclick="window.readerRegister(this)" title="Formal / casual / slang variants" aria-label="Register variants">语</button><span class="rd-en"></span><div class="rd-registers"></div></div>`;
}

// Register Lens: show the sentence in casual / formal / internet-slang forms.
window.readerRegister = async (btn) => {
    const para = btn.closest('.rd-para');
    const wrap = para.querySelector('.rd-registers');
    if (wrap.innerHTML) { wrap.innerHTML = ''; return; } // toggle off
    wrap.innerHTML = '<span class="loading">…</span>';
    try {
        const resp = await fetch(`${backendUrl}/register`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: para.dataset.zh })
        });
        const d = await resp.json();
        if (!resp.ok) throw new Error(d.error || 'Register lookup failed.');
        const row = (label, txt) => txt ? `<div class="rd-reg-row"><span class="rd-reg-label">${label}</span><span class="rd-reg-zh">${renderRubyLine(txt)}</span></div>` : '';
        wrap.innerHTML = row('口语', d.casual) + row('书面', d.formal) + row('网络', d.slang) || '<span class="info">No variants.</span>';
    } catch (e) {
        wrap.innerHTML = `<span class="error">${escapeHtml(e.message)}</span>`;
    }
};

// i+1 Daily Serial: a story generated at the learner's level, read in the reader.
const dailySerialBtn = document.getElementById('daily-serial-btn');
if (dailySerialBtn) dailySerialBtn.addEventListener('click', openDailySerial);

// Estimate the learner's HSK level: highest band where they know ~35%+ of it.
async function estimateHskLevel() {
    try { await loadHskData(); } catch (_) { return 2; }
    const seen = computeSeenWords();
    const totals = {}, known = {};
    for (const [w, e] of Object.entries(hskMap)) { totals[e.l] = (totals[e.l] || 0) + 1; if (seen.has(w)) known[e.l] = (known[e.l] || 0) + 1; }
    let level = 1;
    for (let l = 1; l <= 6; l++) { if ((known[l] || 0) >= (totals[l] || 1) * 0.35) level = l + 1; else break; }
    return Math.min(level, 6);
}

async function openDailySerial() {
    processingOverlay.classList.add('visible');
    try {
        const level = await estimateHskLevel();
        const targetWords = (typeof gatherDueWords === 'function') ? gatherDueWords() : [];
        let previousSummary = '';
        try { previousSummary = localStorage.getItem('dailySerialSummary') || ''; } catch (_) { /* ignore */ }
        const resp = await fetch(`${backendUrl}/daily-serial`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ level, targetWords, previousSummary })
        });
        const d = await resp.json();
        processingOverlay.classList.remove('visible');
        if (!resp.ok) throw new Error(d.error || 'Could not generate the story.');
        try { if (d.summary) localStorage.setItem('dailySerialSummary', d.summary); } catch (_) { /* ignore */ }
        const paragraphs = (d.story || '').split(/\n+/).map(s => s.trim()).filter(Boolean);
        if (!paragraphs.length) throw new Error('The story came back empty — try again.');
        openReader({ title: d.title || '每日故事', chapters: [{ title: d.title || '每日故事', paragraphs }] });
    } catch (e) {
        processingOverlay.classList.remove('visible');
        showModal('Story failed', escapeHtml(e.message));
    }
}

// Lightweight tap card for the reader: pinyin + full definition instantly
// (local, no API), a button to the stroke view, and "Add to flashcards" which
// captures the SOURCE SENTENCE with the card (Context Resurrection).
let readerCharSentence = '';

// Speak a word/phrase on demand from the reader (natural voice when selected).
window.readerSpeak = (text) => { if (readerAloud.active) stopReaderAloud(); stopAllSpeech(); speakSmart(text); };

window.readerCharInfo = (elOrChar) => {
    if (readerAloud.active) stopReaderAloud();
    let char, sentence = '';
    if (elOrChar && elOrChar.dataset) {
        char = elOrChar.dataset.char;
        sentence = (elOrChar.closest('.rd-para') || {}).dataset ? elOrChar.closest('.rd-para').dataset.zh : '';
    } else {
        char = elOrChar;
    }
    readerCharSentence = sentence || '';
    const py = window.pinyinPro?.pinyin ? window.pinyinPro.pinyin(char, { toneType: 'symbol' }) : '';
    const full = (dictionary && dictionary[char]) ? dictionary[char] : '(no dictionary entry)';
    showModal('', `
        <div class="char-info-card">
            <div class="char-info-hanzi">${escapeHtml(char)}</div>
            <div class="char-info-py">${escapeHtml(py)} <button class="reader-play-inline" onclick="window.readerSpeak('${escapeHtml(char)}')" title="Hear it" aria-label="Hear it">🔊</button></div>
            <div class="char-info-def">${escapeHtml(full)}</div>
            <div class="char-info-actions">
                <button class="modal-btn" onclick="window.showStrokes('${escapeHtml(char)}')">Strokes</button>
                <button class="modal-btn primary" onclick="window.addReaderWordToDeck('${escapeHtml(char)}')">＋ Flashcard</button>
            </div>
        </div>`);
    speakSmart(char); // auto-play the pronunciation on tap
};

// Word card: combined meaning of a segmented word, its component characters as
// chips (each opens its own char card), a replay button, and add-to-deck.
window.readerWordInfo = (el) => {
    if (readerAloud.active) stopReaderAloud();
    const word = el.dataset.word;
    const para = el.closest('.rd-para');
    readerCharSentence = (para && para.dataset) ? para.dataset.zh : '';
    const py = window.pinyinPro?.pinyin ? window.pinyinPro.pinyin(word, { toneType: 'symbol' }) : '';
    const wordDef = (dictionary && dictionary[word]) ? dictionary[word] : '';
    const chars = Array.from(word).filter(c => chineseCharRegex.test(c));
    const chips = chars.map(c => `<button class="reader-char-chip tone-${readerToneNumber(c)}" onclick="window.readerCharInfo('${escapeHtml(c)}')">${escapeHtml(c)}</button>`).join('');
    const defHtml = wordDef
        ? escapeHtml(wordDef)
        : '<span class="info">No combined dictionary entry — tap a character below for its meaning.</span>';
    showModal('', `
        <div class="char-info-card">
            <div class="char-info-hanzi">${escapeHtml(word)}</div>
            <div class="char-info-py">${escapeHtml(py)} <button class="reader-play-inline" onclick="window.readerSpeak('${escapeHtml(word)}')" title="Hear it" aria-label="Hear it">🔊</button></div>
            <div class="char-info-def">${defHtml}</div>
            <div class="reader-char-chips">${chips}</div>
            <div class="char-info-actions">
                <button class="modal-btn primary" onclick="window.addReaderWordToDeck('${escapeHtml(word)}')">＋ Flashcard</button>
            </div>
        </div>`);
    speakSmart(word); // auto-play the word on tap
};

// Read one paragraph aloud (its 🔊 button), highlighting it while it plays.
window.readerPlayParagraph = (btn) => {
    const para = btn.closest('.rd-para');
    if (!para) return;
    if (readerAloud.active) stopReaderAloud();
    stopAllSpeech();
    document.querySelectorAll('.rd-para.speaking').forEach(p => p.classList.remove('speaking'));
    para.classList.add('speaking');
    const done = () => para.classList.remove('speaking');
    if (isNaturalVoiceSelected()) naturalSpeak(para.dataset.zh, { onend: done });
    else { browserSpeak(para.dataset.zh, { onend: done }); }
};

// Add a word to the active deck (creating a "Reading" deck if none), keeping
// the sentence it appeared in so reviews can resurrect the original context.
window.addReaderWordToDeck = (char) => {
    if (!getActiveDeck()) {
        const deck = { id: Date.now().toString(), name: 'Reading', cards: [] };
        flashcardStore.decks.push(deck);
        flashcardStore.activeDeckId = deck.id;
    }
    const deck = getActiveDeck();
    if (deck.cards.some(c => c.char === char)) {
        showModal('Already saved', `${escapeHtml(char)} is already in "${escapeHtml(deck.name)}".`);
        return;
    }
    const card = {
        char,
        pinyin: window.pinyinPro?.pinyin ? window.pinyinPro.pinyin(char, { toneType: 'symbol' }) : '',
        def: (dictionary && dictionary[char] || '').split(';')[0].split('/')[0].replace(/\[.*?\]|\(.*?\)/g, '').trim(),
        sentence: readerCharSentence || ''
    };
    ensureCardSchema(card);
    deck.cards.push(card);
    saveFlashcards();
    showModal('Saved', `Added ${escapeHtml(char)} to "${escapeHtml(deck.name)}"${card.sentence ? ' with its sentence.' : '.'}`);
};

window.readerTranslate = async (btn) => {
    const para = btn.closest('.rd-para');
    const enEl = para.querySelector('.rd-en');
    if (enEl.textContent) { enEl.textContent = ''; return; } // toggle off
    enEl.textContent = '…';
    try {
        enEl.textContent = await translateText(para.dataset.zh, 'EN');
    } catch (_) {
        enEl.textContent = '(translation unavailable)';
    }
};

function ensureReaderOverlay() {
    let o = document.getElementById('reader-overlay');
    if (o) return o;
    o = document.createElement('div');
    o.id = 'reader-overlay';
    o.innerHTML = `
        <div class="reader-topbar">
            <h3 id="reader-title">Reader</h3>
            <div class="reader-nav">
                <button class="reader-nav-btn" id="reader-prev" aria-label="Previous chapter">‹</button>
                <select id="reader-chapter-select" aria-label="Jump to chapter"></select>
                <button class="reader-nav-btn" id="reader-next" aria-label="Next chapter">›</button>
            </div>
            <button class="reader-nav-btn" id="reader-aloud-toggle" title="Read aloud like an audiobook" aria-label="Read aloud">🎧</button>
            <button class="reader-nav-btn" id="reader-aa-toggle" title="Reading settings — font size, theme, heat map" aria-label="Reading settings">Aa</button>
            <button class="reader-nav-btn reader-close-btn" id="reader-close" aria-label="Close reader">✕</button>
        </div>
        <div id="reader-heat-legend">
            <span class="rd-heat-key">Memory fading:</span>
            <span class="rd-heat-swatch rd-heat-1"></span><span class="rd-heat-lbl">fresh</span>
            <span class="rd-heat-swatch rd-heat-2"></span><span class="rd-heat-lbl">fading</span>
            <span class="rd-heat-swatch rd-heat-3"></span><span class="rd-heat-lbl">due</span>
        </div>
        <div id="reader-aa-popover" class="settings-popover popover-grid" style="display:none;">
            <div class="tts-group"><label>Font size:</label>
                <div class="reader-fontsize-row">
                    <button class="reader-transport-chip" id="reader-font-dec" aria-label="Smaller text">A-</button>
                    <span id="reader-font-pct">100%</span>
                    <button class="reader-transport-chip" id="reader-font-inc" aria-label="Larger text">A+</button>
                </div>
            </div>
            <div class="tts-group"><label>Theme:</label><button class="reader-transport-chip" id="reader-theme-btn">🌙 Dark</button></div>
            <div class="tts-group"><label for="reader-heat-checkbox">Memory heat map:</label>
                <label class="toggle-switch"><input type="checkbox" id="reader-heat-checkbox"><span class="toggle-slider"></span></label>
            </div>
        </div>
        <div id="reader-content"></div>
        <div id="reader-transport">
            <span id="reader-transport-status">Reading…</span>
            <button id="reader-transport-play" class="reader-transport-btn" aria-label="Play or pause">⏸</button>
            <button id="reader-transport-speed" class="reader-transport-chip" title="Playback speed">1×</button>
            <button id="reader-transport-stop" class="reader-transport-chip" aria-label="Stop reading">Stop</button>
        </div>`;
    document.body.appendChild(o);
    wireReaderTransport(o);
    const heatCheckbox = o.querySelector('#reader-heat-checkbox');
    const applyHeatState = (on) => {
        o.querySelector('#reader-content').classList.toggle('heat-on', on);
        o.querySelector('#reader-heat-legend').classList.toggle('visible', on);
        heatCheckbox.checked = on;
    };
    heatCheckbox.addEventListener('change', () => {
        applyHeatState(heatCheckbox.checked);
        try { localStorage.setItem('readerHeatOn', heatCheckbox.checked ? '1' : '0'); } catch (_) { /* ignore */ }
    });
    o.querySelector('#reader-aloud-toggle').addEventListener('click', () => {
        if (readerAloud.active) stopReaderAloud();
        else startReaderAloud();
    });
    // === "Aa" reading-settings popover: font size / theme / heat map ===
    const aaBtn = o.querySelector('#reader-aa-toggle');
    const aaPopover = o.querySelector('#reader-aa-popover');
    const fontPct = o.querySelector('#reader-font-pct');
    const READER_FONT_STEPS = [0.85, 1, 1.15, 1.3, 1.45];
    let fontStepIdx = 1;
    try {
        const saved = parseFloat(localStorage.getItem('readerFontScale'));
        const idx = READER_FONT_STEPS.indexOf(saved);
        if (idx >= 0) fontStepIdx = idx;
    } catch (_) { /* ignore */ }
    const applyFontScale = () => {
        const scale = READER_FONT_STEPS[fontStepIdx];
        o.querySelector('#reader-content').style.setProperty('--rd-font-scale', scale);
        fontPct.textContent = Math.round(scale * 100) + '%';
    };
    applyFontScale();
    o.querySelector('#reader-font-dec').addEventListener('click', () => {
        fontStepIdx = Math.max(0, fontStepIdx - 1);
        applyFontScale();
        try { localStorage.setItem('readerFontScale', String(READER_FONT_STEPS[fontStepIdx])); } catch (_) { /* ignore */ }
    });
    o.querySelector('#reader-font-inc').addEventListener('click', () => {
        fontStepIdx = Math.min(READER_FONT_STEPS.length - 1, fontStepIdx + 1);
        applyFontScale();
        try { localStorage.setItem('readerFontScale', String(READER_FONT_STEPS[fontStepIdx])); } catch (_) { /* ignore */ }
    });
    const themeBtn = o.querySelector('#reader-theme-btn');
    const syncThemeBtn = () => { themeBtn.textContent = document.body.dataset.theme === 'dark' ? '☀️ Light' : '🌙 Dark'; };
    syncThemeBtn();
    themeBtn.addEventListener('click', () => { darkModeToggle.click(); syncThemeBtn(); });
    const positionAaPopover = () => {
        const r = aaBtn.getBoundingClientRect();
        const margin = 8;
        const width = Math.min(280, window.innerWidth - margin * 2);
        aaPopover.style.width = width + 'px';
        let left = r.right - width;
        left = Math.max(margin, Math.min(left, window.innerWidth - width - margin));
        aaPopover.style.top = Math.min(r.bottom + margin, window.innerHeight - 40) + 'px';
        aaPopover.style.left = left + 'px';
    };
    aaBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const opening = aaPopover.style.display !== 'grid';
        aaPopover.style.display = opening ? 'grid' : 'none';
        if (opening) positionAaPopover();
    });
    aaPopover.addEventListener('click', (e) => e.stopPropagation());
    document.addEventListener('click', (e) => {
        if (aaPopover.style.display !== 'grid') return;
        if (aaPopover.contains(e.target) || aaBtn.contains(e.target)) return;
        aaPopover.style.display = 'none';
    });
    window.addEventListener('resize', () => { if (aaPopover.style.display === 'grid') positionAaPopover(); });
    o.querySelector('#reader-close').addEventListener('click', () => {
        stopReaderAloud();
        aaPopover.style.display = 'none';
        o.classList.remove('active');
        if (readerObserver) { readerObserver.disconnect(); readerObserver = null; }
        if (readerHydrateObserver) { readerHydrateObserver.disconnect(); readerHydrateObserver = null; }
    });
    const jump = (delta) => {
        const sel = o.querySelector('#reader-chapter-select');
        const cur = parseInt((sel.value || 'rd-ch-0').replace('rd-ch-', ''), 10) || 0;
        const next = Math.max(0, Math.min((readerBook ? readerBook.chapters.length : 1) - 1, cur + delta));
        hydrateReaderChapter(next);
        const el = document.getElementById(`rd-ch-${next}`);
        if (el) { el.scrollIntoView(); sel.value = `rd-ch-${next}`; }
    };
    o.querySelector('#reader-prev').addEventListener('click', () => jump(-1));
    o.querySelector('#reader-next').addEventListener('click', () => jump(1));
    return o;
}

// === Reader read-aloud (audiobook mode) ===
// Plays the book paragraph by paragraph with the natural voice, highlighting and
// scrolling to each, auto-advancing across chapters (hydrating them as it goes).
const readerAloud = { active: false, paused: false, i: 0 };
const READER_SPEEDS = [0.75, 1, 1.25, 1.5];

function wireReaderTransport(o) {
    o.querySelector('#reader-transport-play').addEventListener('click', () => {
        if (readerAloud.paused) resumeReaderAloud(); else pauseReaderAloud();
    });
    o.querySelector('#reader-transport-stop').addEventListener('click', stopReaderAloud);
    o.querySelector('#reader-transport-speed').addEventListener('click', () => {
        const cur = currentTtsRate();
        let next = READER_SPEEDS.find(s => s > cur + 0.001);
        if (next === undefined) next = READER_SPEEDS[0];
        if (speedSlider) speedSlider.value = String(next);
        if (ttsAudioEl) ttsAudioEl.playbackRate = next;
        try { localStorage.setItem('preferredSpeed', String(next)); } catch (_) { /* ignore */ }
        updateReaderTransport();
    });
}

function readerAloudParas() {
    return Array.from(document.querySelectorAll('#reader-content .rd-para'));
}

function updateReaderTransport() {
    const o = document.getElementById('reader-overlay');
    if (!o) return;
    const playBtn = o.querySelector('#reader-transport-play');
    const status = o.querySelector('#reader-transport-status');
    const speed = o.querySelector('#reader-transport-speed');
    if (playBtn) playBtn.textContent = readerAloud.paused ? '▶' : '⏸';
    if (status) status.textContent = readerAloud.paused ? 'Paused' : 'Reading aloud…';
    if (speed) { const r = currentTtsRate(); speed.textContent = (Number.isInteger(r) ? r : r) + '×'; }
    const toggle = o.querySelector('#reader-aloud-toggle');
    if (toggle) toggle.classList.toggle('active', readerAloud.active);
}

function startReaderAloud(startEl) {
    const o = document.getElementById('reader-overlay');
    if (!o) return;
    readerAloud.active = true;
    readerAloud.paused = false;
    const paras = readerAloudParas();
    let idx = 0;
    if (startEl) {
        idx = paras.indexOf(startEl);
    } else {
        // start from the first paragraph at/below the current scroll position
        const content = document.getElementById('reader-content');
        const top = content.getBoundingClientRect().top;
        idx = paras.findIndex(p => p.getBoundingClientRect().bottom > top + 60);
    }
    readerAloud.i = idx < 0 ? 0 : idx;
    o.querySelector('#reader-transport').classList.add('active');
    document.getElementById('reader-content').classList.add('aloud-active');
    updateReaderTransport();
    readerAloudPlayCurrent();
}

function readerAloudPlayCurrent() {
    if (!readerAloud.active || readerAloud.paused) return;
    let paras = readerAloudParas();
    if (readerAloud.i >= paras.length) {
        // reached the end of loaded content — try to hydrate the next chapter
        const last = paras[paras.length - 1];
        const sec = last ? last.closest('.rd-chapter') : null;
        const chIdx = sec ? (+sec.dataset.idx) : -1;
        if (chIdx >= 0 && readerBook && chIdx + 1 < readerBook.chapters.length) {
            hydrateReaderChapter(chIdx + 1);
            paras = readerAloudParas();
        }
    }
    const para = paras[readerAloud.i];
    if (!para) { stopReaderAloud(); return; } // whole book finished
    document.querySelectorAll('.rd-para.speaking').forEach(p => p.classList.remove('speaking'));
    para.classList.add('speaking');
    para.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const text = para.dataset.zh || '';
    const advance = () => {
        para.classList.remove('speaking');
        if (!readerAloud.active || readerAloud.paused) return;
        readerAloud.i++;
        readerAloudPlayCurrent();
    };
    if (!text.trim()) { advance(); return; }
    if (isNaturalVoiceSelected()) naturalSpeak(text, { onend: advance });
    else browserSpeak(text, { onend: advance });
}

function pauseReaderAloud() {
    if (!readerAloud.active) return;
    readerAloud.paused = true;
    if (ttsAudioEl) { try { ttsAudioEl.pause(); } catch (_) { /* ignore */ } }
    if ('speechSynthesis' in window) { try { window.speechSynthesis.pause(); } catch (_) { /* ignore */ } }
    updateReaderTransport();
}

function resumeReaderAloud() {
    if (!readerAloud.active) return;
    readerAloud.paused = false;
    updateReaderTransport();
    // Resume in place when possible; otherwise replay the current paragraph.
    if (ttsAudioEl && ttsAudioEl.src && !ttsAudioEl.ended && ttsAudioEl.currentTime > 0) {
        const p = ttsAudioEl.play(); if (p && p.catch) p.catch(() => readerAloudPlayCurrent());
    } else if ('speechSynthesis' in window && window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
    } else {
        readerAloudPlayCurrent();
    }
}

function stopReaderAloud() {
    if (!readerAloud.active) return;
    readerAloud.active = false;
    readerAloud.paused = false;
    stopAllSpeech();
    document.querySelectorAll('.rd-para.speaking').forEach(p => p.classList.remove('speaking'));
    const o = document.getElementById('reader-overlay');
    if (o) {
        o.querySelector('#reader-transport').classList.remove('active');
        const content = document.getElementById('reader-content');
        if (content) content.classList.remove('aloud-active');
        updateReaderTransport();
    }
}

let readerBook = null;
let readerKnown = null;
let readerHeat = null; // char -> heat level (1-3) for the retrievability heat map
let readerHydrateObserver = null;

// Render one chapter's paragraphs on demand (avoids building the entire book —
// hundreds of thousands of DOM nodes — in one synchronous pass).
function hydrateReaderChapter(idx) {
    idx = +idx;
    if (!readerBook || idx < 0 || idx >= readerBook.chapters.length) return;
    const section = document.getElementById(`rd-ch-${idx}`);
    if (!section || section.dataset.hydrated) return;
    section.dataset.hydrated = '1';
    const body = section.querySelector('.rd-chapter-body');
    if (!body) return;
    const ch = readerBook.chapters[idx];
    if (Array.isArray(ch.blocks)) {
        body.innerHTML = ch.blocks.map(b => b.t === 'img'
            ? `<img class="rd-img" src="${b.src}" alt="" loading="lazy">`
            : renderReaderParagraph(b.text, readerKnown)).join('');
    } else {
        body.innerHTML = (ch.paragraphs || []).map(p => renderReaderParagraph(p, readerKnown)).join('');
    }
}

function openReader(book) {
    const overlay = ensureReaderOverlay();
    readerBook = book;
    readerKnown = buildKnownCharSet();
    readerHeat = buildReaderHeatMap();
    const content = overlay.querySelector('#reader-content');
    // Restore the reader's heat-map preference (default off — it's opt-in).
    let heatOn = false;
    try { heatOn = localStorage.getItem('readerHeatOn') === '1'; } catch (_) { /* ignore */ }
    content.classList.toggle('heat-on', heatOn);
    overlay.querySelector('#reader-heat-legend').classList.toggle('visible', heatOn);
    overlay.querySelector('#reader-heat-checkbox').checked = heatOn;
    const select = overlay.querySelector('#reader-chapter-select');
    overlay.querySelector('#reader-title').textContent = book.title || 'Reader';

    select.innerHTML = book.chapters.map((c, i) =>
        `<option value="rd-ch-${i}">${escapeHtml(c.title || ('Chapter ' + (i + 1)))}</option>`).join('');

    // Build only chapter shells up front; bodies are filled lazily.
    content.innerHTML = book.chapters.map((c, i) => `
        <section class="rd-chapter" id="rd-ch-${i}" data-idx="${i}">
            <div class="rd-chapter-title">${escapeHtml(c.title || ('Chapter ' + (i + 1)))}</div>
            <div class="rd-chapter-body"></div>
        </section>`).join('');
    content.scrollTop = 0;

    select.onchange = () => { hydrateReaderChapter(select.value.replace('rd-ch-', '')); document.getElementById(select.value)?.scrollIntoView(); };

    // Two observers: one hydrates chapters as they approach; one keeps the
    // dropdown in sync with the topmost visible chapter.
    if (readerObserver) readerObserver.disconnect();
    if (readerHydrateObserver) readerHydrateObserver.disconnect();
    readerHydrateObserver = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { hydrateReaderChapter(e.target.dataset.idx); hydrateReaderChapter(+e.target.dataset.idx + 1); } });
    }, { root: content, rootMargin: '1000px 0px 1000px 0px' });
    readerObserver = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) select.value = e.target.id; });
    }, { root: content, rootMargin: '0px 0px -80% 0px' });
    book.chapters.forEach((_, i) => {
        const el = document.getElementById(`rd-ch-${i}`);
        if (el) { readerHydrateObserver.observe(el); readerObserver.observe(el); }
    });

    hydrateReaderChapter(0); // first chapter immediately
    overlay.classList.add('active');
}

// ===================================
// ========== HSK PROGRESS ===========
// ===================================
// Tag words by HSK 3.0 level (from bundled hsk.json) and show how much of each
// level you've encountered across your sessions and decks.

let hskMap = null;
let hskTopics = null; // optional word->topic map (generated by scripts/tag-hsk-topics.js)
let hskLoadPromise = null;
let hskModalEl = null;

const HSK_CATEGORIES = { all: 'All types', n: 'Nouns', v: 'Verbs', a: 'Adjectives', d: 'Adverbs', q: 'Measure words', r: 'Pronouns', m: 'Numbers', p: 'Prepositions', c: 'Conjunctions', o: 'Other' };

// Words the learner has answered correctly in HSK practice (memorized).
let hskLearned = new Set();
try { hskLearned = new Set(JSON.parse(localStorage.getItem('hskLearned') || '[]')); } catch (_) { hskLearned = new Set(); }
function markHskLearned(word) {
    if (!word || hskLearned.has(word)) return;
    hskLearned.add(word);
    try { localStorage.setItem('hskLearned', JSON.stringify([...hskLearned])); } catch (_) { /* ignore */ }
}

const hskProgressBtn = document.getElementById('hsk-progress-btn');
if (hskProgressBtn) hskProgressBtn.addEventListener('click', showHskProgress);

function loadHskData() {
    if (hskMap) return Promise.resolve(hskMap);
    if (hskLoadPromise) return hskLoadPromise;
    hskLoadPromise = fetch('./hsk.json')
        .then(r => { if (!r.ok) throw new Error('Could not load HSK data.'); return r.json(); })
        .then(async (m) => {
            hskMap = m;
            // Optional semantic-topic tags (generated on the server). Ignore if absent.
            try { const r2 = await fetch('./hsk-topics.json'); if (r2.ok) hskTopics = await r2.json(); } catch (_) { /* no topics yet */ }
            return m;
        })
        .catch(e => { hskLoadPromise = null; throw e; });
    return hskLoadPromise;
}

// Every distinct word the learner has met: segmented session texts + deck cards.
function computeSeenWords() {
    const words = new Set();
    const texts = sessionHistory.map(s => s.chineseText).filter(Boolean);
    if (temporarySession && temporarySession.chineseText) texts.push(temporarySession.chineseText);
    if (segmentit) {
        for (const t of texts) {
            try {
                for (const w of segmentit.doSegment(t, { simple: true })) {
                    if (chineseCharRegex.test(w)) words.add(w);
                }
            } catch (_) { /* ignore */ }
        }
    }
    (flashcardStore.decks || []).forEach(d => (d.cards || []).forEach(c => { if (c.char) words.add(c.char); }));
    return words;
}

function ensureHskModal() {
    if (hskModalEl) return hskModalEl;
    hskModalEl = document.createElement('div');
    hskModalEl.id = 'hsk-modal';
    hskModalEl.className = 'main-modal';
    hskModalEl.innerHTML = `
        <div class="modal-content hsk-modal-content">
            <div class="game-topbar">
                <h3>HSK Progress</h3>
                <button id="hsk-close" class="modal-btn">Close</button>
            </div>
            <div id="hsk-body"></div>
        </div>`;
    document.body.appendChild(hskModalEl);
    hskModalEl.querySelector('#hsk-close').addEventListener('click', () => hskModalEl.classList.remove('active'));
    hskModalEl.addEventListener('click', (e) => { if (e.target === hskModalEl) hskModalEl.classList.remove('active'); });
    return hskModalEl;
}

async function showHskProgress() {
    ensureHskModal();
    const body = hskModalEl.querySelector('#hsk-body');
    body.innerHTML = `<p class="info" style="text-align:center; padding:1rem;">Loading HSK data…</p>`;
    hskModalEl.classList.add('active');
    let map;
    try {
        map = await loadHskData();
    } catch (e) {
        body.innerHTML = `<p class="error" style="text-align:center;">${escapeHtml(e.message)}</p>`;
        return;
    }
    const seen = computeSeenWords();
    const totals = {}, learned = {};
    let totalWords = 0, totalLearned = 0;
    for (const [word, entry] of Object.entries(map)) {
        const level = entry.l;
        totals[level] = (totals[level] || 0) + 1;
        totalWords++;
        if (hskLearned.has(word)) { learned[level] = (learned[level] || 0) + 1; totalLearned++; }
    }
    const label = (l) => (l === 7 ? '7–9' : String(l));
    let rows = '';
    for (let l = 1; l <= 7; l++) {
        const t = totals[l] || 0;
        const learnt = learned[l] || 0;
        const pct = t ? Math.round((learnt / t) * 100) : 0;
        rows += `
            <div class="hsk-row">
                <div class="hsk-badge hsk-L${l}">HSK ${label(l)}</div>
                <div class="hsk-bar"><div class="hsk-bar-fill" style="width:${pct}%"></div></div>
                <div class="hsk-count">${learnt} / ${t} · ${pct}%</div>
            </div>`;
    }
    const overallPct = totalWords ? Math.round((totalLearned / totalWords) * 100) : 0;
    const grammCats = Object.entries(HSK_CATEGORIES).map(([k, v]) => `<option value="${k === 'all' ? 'all' : 'g:' + k}">${v}</option>`).join('');
    const topicSet = hskTopics ? [...new Set(Object.values(hskTopics))].sort() : [];
    const topicCats = topicSet.map(t => `<option value="t:${escapeHtml(t)}">${escapeHtml(t)}</option>`).join('');
    const catOptions = grammCats + (topicCats ? `<optgroup label="Topics">${topicCats}</optgroup>` : '');
    const levelOptions = [1, 2, 3, 4, 5, 6, 7].map(l => `<option value="${l}">HSK ${label(l)}</option>`).join('');
    body.innerHTML = `
        <div class="hsk-total">Memorized <strong>${totalLearned.toLocaleString()}</strong> of ${totalWords.toLocaleString()} HSK words (${overallPct}%).</div>
        ${rows}
        <div class="hsk-practice">
            <div class="hsk-practice-title">Practice</div>
            <div class="hsk-practice-controls">
                <select id="hsk-practice-level">${levelOptions}</select>
                <select id="hsk-practice-cat">${catOptions}</select>
                <button id="hsk-practice-start" class="modal-btn primary">Practice</button>
            </div>
            <div id="hsk-practice-note" class="info" style="font-size:0.78rem; margin-top:0.5rem;">Answer correctly in the games to mark words memorized.</div>
        </div>`;
    body.querySelector('#hsk-practice-start').addEventListener('click', () => {
        const lvl = parseInt(body.querySelector('#hsk-practice-level').value, 10);
        const cat = body.querySelector('#hsk-practice-cat').value;
        startHskPractice(lvl, cat);
    });
}

// Build practice cards from HSK words at a level (optionally one category).
// Pinyin comes from pinyin-pro and meanings from the dictionary — both local.
function buildHskCards(level, category) {
    if (!hskMap) return [];
    const words = Object.entries(hskMap)
        .filter(([w, e]) => {
            if (e.l !== level) return false;
            if (category === 'all') return true;
            if (category.startsWith('g:')) return e.g === category.slice(2);
            if (category.startsWith('t:')) return hskTopics && hskTopics[w] === category.slice(2);
            return true;
        })
        .map(([w]) => w);
    // Prefer words that have a dictionary entry so cards have a meaning.
    const withDef = words.filter(w => dictionary && dictionary[w]);
    const pool = (withDef.length >= 8 ? withDef : words);
    return gameShuffle(pool).slice(0, 20).map(w => ({
        char: w,
        pinyin: window.pinyinPro?.pinyin ? window.pinyinPro.pinyin(w, { toneType: 'symbol' }) : '',
        def: (dictionary?.[w] || '').split(';')[0].split('/')[0].replace(/\[.*?\]|\(.*?\)/g, '').trim(),
        _hsk: w
    }));
}

async function startHskPractice(level, category) {
    if (!hskMap) { try { await loadHskData(); } catch (_) { return; } }
    const cards = buildHskCards(level, category);
    if (cards.length < 4) {
        const note = hskModalEl.querySelector('#hsk-practice-note');
        if (note) { note.textContent = 'Not enough words with data for that combination — try "All types" or another level.'; note.classList.add('error'); }
        return;
    }
    hskModalEl.classList.remove('active');
    openGamesHub(cards);
}

// ===================================
// ============ KARAOKE ==============
// ===================================
// Search a Chinese song (via the server's NetEase proxy), pull its time-coded
// lyrics + translation, and sing along: every line shows tone-colored pinyin
// and English, with the current line highlighted on a tap-to-start timer
// (play the actual song on your own player and hit ▶ in sync).

let karaokeOverlayEl = null;
const karaoke = { lines: [], playing: false, elapsed: 0, base: 0, startedAt: 0, raf: null, activeIdx: -1, rate: 1 };
const KARA_SPEEDS = [0.5, 0.75, 1, 1.25, 1.5];
try { const saved = parseFloat(localStorage.getItem('karaokeSpeed')); if (!isNaN(saved) && KARA_SPEEDS.includes(saved)) karaoke.rate = saved; } catch (_) { /* ignore */ }

const karaokeBtn = document.getElementById('karaoke-btn');
if (karaokeBtn) karaokeBtn.addEventListener('click', openKaraoke);

// Tone-colored ruby for one line (chars only; punctuation passes through).
// Optionally highlight every occurrence of `highlightChar`.
function renderRubyLine(text, highlightChar) {
    let inner = '';
    for (const ch of text) {
        if (chineseCharRegex.test(ch)) {
            const py = window.pinyinPro?.pinyin ? window.pinyinPro.pinyin(ch, { toneType: 'symbol' }) : '';
            const hl = (highlightChar && ch === highlightChar) ? ' rd-char-hl' : '';
            inner += `<ruby class="rd-char tone-${readerToneNumber(ch)}${hl}">${escapeHtml(ch)}<rt>${escapeHtml(py)}</rt></ruby>`;
        } else {
            inner += escapeHtml(ch);
        }
    }
    return inner;
}

function parseLrc(lrc) {
    const out = [];
    for (const raw of (lrc || '').split('\n')) {
        const stamps = [...raw.matchAll(/\[(\d+):(\d+)(?:[.:](\d+))?\]/g)];
        const text = raw.replace(/\[[^\]]*\]/g, '').trim();
        if (!text || stamps.length === 0) continue;
        for (const s of stamps) {
            const sec = (+s[1]) * 60 + (+s[2]) + (s[3] ? +('0.' + s[3]) : 0);
            out.push({ t: sec, text });
        }
    }
    return out.sort((a, b) => a.t - b.t);
}

function ensureKaraokeOverlay() {
    if (karaokeOverlayEl) return karaokeOverlayEl;
    karaokeOverlayEl = document.createElement('div');
    karaokeOverlayEl.id = 'karaoke-overlay';
    karaokeOverlayEl.innerHTML = `
        <div class="kara-topbar">
            <h3 id="kara-title">Karaoke</h3>
            <button class="modal-btn" id="kara-back" style="display:none;">Search</button>
            <button class="modal-btn" id="kara-close">Close</button>
        </div>
        <div id="kara-search-view">
            <div class="kara-search">
                <input type="search" id="kara-input" placeholder="Search a song or artist…">
                <button class="modal-btn primary" id="kara-search-btn">Search</button>
            </div>
            <div class="kara-search kara-link-search">
                <input type="url" id="kara-link-input" inputmode="url" placeholder="…or paste a Spotify / Apple Music / YouTube link" autocomplete="off">
                <button class="modal-btn" id="kara-link-btn">Use link</button>
            </div>
            <button class="modal-btn" id="kara-identify" style="display:block; margin:0 auto 0.5rem;">🎧 Identify the song playing now</button>
            <div class="kara-results" id="kara-results"></div>
        </div>
        <div class="kara-player" id="kara-player" style="display:none;"></div>
        <div class="kara-transport" id="kara-transport" style="display:none;">
            <button class="kara-play-btn" id="kara-play">▶</button>
            <span class="kara-time" id="kara-time">0:00</span>
            <button class="reader-transport-chip" id="kara-speed" title="Playback speed — slow down or speed up to match the song">1×</button>
        </div>`;
    document.body.appendChild(karaokeOverlayEl);
    karaokeOverlayEl.querySelector('#kara-close').addEventListener('click', closeKaraoke);
    karaokeOverlayEl.querySelector('#kara-back').addEventListener('click', showKaraokeSearch);
    karaokeOverlayEl.querySelector('#kara-search-btn').addEventListener('click', () => searchSongs());
    karaokeOverlayEl.querySelector('#kara-input').addEventListener('keydown', (e) => { if (e.key === 'Enter') searchSongs(); });
    karaokeOverlayEl.querySelector('#kara-link-btn').addEventListener('click', () => resolveKaraokeLink());
    karaokeOverlayEl.querySelector('#kara-link-input').addEventListener('keydown', (e) => { if (e.key === 'Enter') resolveKaraokeLink(); });
    karaokeOverlayEl.querySelector('#kara-play').addEventListener('click', toggleKaraokePlay);
    karaokeOverlayEl.querySelector('#kara-identify').addEventListener('click', identifySong);
    const speedBtn = karaokeOverlayEl.querySelector('#kara-speed');
    speedBtn.textContent = karaoke.rate + '×';
    speedBtn.addEventListener('click', () => {
        let next = KARA_SPEEDS.find(s => s > karaoke.rate + 0.001);
        if (next === undefined) next = KARA_SPEEDS[0];
        // Rebase the timer so changing speed mid-playback doesn't jump the elapsed time.
        karaoke.base = karaoke.elapsed;
        karaoke.startedAt = performance.now();
        karaoke.rate = next;
        speedBtn.textContent = next + '×';
        try { localStorage.setItem('karaokeSpeed', String(next)); } catch (_) { /* ignore */ }
    });
    return karaokeOverlayEl;
}

// Paste a link from Apple Music / Spotify / YouTube / etc, resolve it to a
// "title artist" search query server-side (no client API keys needed), then
// run the normal song search with that query.
async function resolveKaraokeLink() {
    const input = karaokeOverlayEl.querySelector('#kara-link-input');
    const url = (input.value || '').trim();
    if (!url) return;
    const results = karaokeOverlayEl.querySelector('#kara-results');
    results.innerHTML = `<p class="info" style="text-align:center;">Reading the link…</p>`;
    try {
        const resp = await fetch(`${backendUrl}/resolve-track`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url })
        });
        if (resp.status === 404) throw new Error("Couldn't read that link — try typing the song name instead.");
        const data = await resp.json();
        if (!resp.ok) throw new Error(data.error || "Couldn't read that link — try typing the song name instead.");
        const query = data.query || `${data.title || ''} ${data.artist || ''}`.trim();
        if (!query) throw new Error("Couldn't figure out the song from that link.");
        karaokeOverlayEl.querySelector('#kara-input').value = query;
        await searchSongs();
    } catch (e) {
        results.innerHTML = `<p class="error" style="text-align:center;">${escapeHtml(e.message)}</p>`;
    }
}

// Normalize a title/artist string for fuzzy matching: lowercase, drop
// parenthetical suffixes ("(Live)", "（伴奏）"...) and non-alphanumeric chars.
function normalizeForMatch(s) {
    return (s || '')
        .toLowerCase()
        .replace(/[\(\[（【][^)\]）】]*[\)\]）】]/g, '')
        .replace(/[^\p{L}\p{N}]+/gu, '')
        .trim();
}

// ACRCloud correctly recognizes the title+artist, but a NetEase search for
// that query can rank an unrelated hit first (a same-named song by a
// different artist, a cover, a remix). Blindly taking hits[0] is what made
// the app "identify the right song but display the wrong one" — score every
// hit against the recognized title/artist and pick the closest match instead
// of trusting search position.
function pickBestSongMatch(hits, title, artist) {
    if (!hits || !hits.length) return null;
    const nTitle = normalizeForMatch(title);
    const nArtist = normalizeForMatch(artist);
    let best = null, bestScore = -1;
    for (const s of hits) {
        const hTitle = normalizeForMatch(s.name);
        const hArtist = normalizeForMatch(s.artist);
        let score = 0;
        if (nTitle && hTitle === nTitle) score += 2;
        else if (nTitle && hTitle && (hTitle.includes(nTitle) || nTitle.includes(hTitle))) score += 1;
        if (nArtist && hArtist === nArtist) score += 2;
        else if (nArtist && hArtist && (hArtist.includes(nArtist) || nArtist.includes(hArtist))) score += 1;
        if (score > bestScore) { bestScore = score; best = s; }
    }
    // Only trust a hit that actually matched title or artist; otherwise fall
    // back to the top search result (still better than nothing).
    return bestScore > 0 ? best : hits[0];
}

// Record ~8s of the song playing, identify it via ACRCloud, then auto-load its
// lyrics and jump to the recognized position so it plays in sync.
let identifyRecorder = null;
async function identifySong() {
    const results = karaokeOverlayEl.querySelector('#kara-results');
    const btn = karaokeOverlayEl.querySelector('#kara-identify');
    if (identifyRecorder) return;
    let stream;
    try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (_) {
        results.innerHTML = `<p class="error" style="text-align:center;">Microphone access denied.</p>`;
        return;
    }
    btn.textContent = '🎧 Listening… (8s)';
    btn.disabled = true;
    const chunks = [];
    try {
        identifyRecorder = makeRecorder(stream);
    } catch (e) {
        stream.getTracks().forEach(t => t.stop());
        btn.textContent = '🎧 Identify the song playing now';
        btn.disabled = false;
        results.innerHTML = `<p class="error" style="text-align:center;">Recording isn't supported on this browser.</p>`;
        return;
    }
    identifyRecorder.ondataavailable = e => { if (e.data.size) chunks.push(e.data); };
    identifyRecorder.onstop = async () => {
        stream.getTracks().forEach(t => t.stop());
        identifyRecorder = null;
        btn.textContent = '🎧 Identify the song playing now';
        btn.disabled = false;
        results.innerHTML = `<p class="info" style="text-align:center;">Identifying…</p>`;
        try {
            const fd = new FormData();
            const recordedBlob = new Blob(chunks, { type: (chunks[0] && chunks[0].type) || 'audio/webm' });
            // ACRCloud struggles to decode webm/opus — convert to WAV first.
            let sampleBlob = recordedBlob;
            try { sampleBlob = await blobToWav(recordedBlob); } catch (_) { /* fall back to original */ }
            fd.append('sample', sampleBlob, sampleBlob.type === 'audio/wav' ? 'sample.wav' : audioFilename(sampleBlob.type, 'sample'));
            const resp = await fetch(`${backendUrl}/identify-song`, { method: 'POST', body: fd });
            const data = await resp.json();
            if (!resp.ok) throw new Error(data.error || 'No match.');
            results.innerHTML = `<p class="info" style="text-align:center;">Found: <strong>${escapeHtml(data.title)}</strong> — ${escapeHtml(data.artist)}. Loading synced lyrics…</p>`;
            // Find the song on NetEase and auto-open it at the recognized offset.
            // Match against the recognized title/artist (not just the top hit) —
            // see pickBestSongMatch for why.
            const sResp = await fetch(`${backendUrl}/song-search?q=${encodeURIComponent(data.title + ' ' + data.artist)}`);
            const sData = await sResp.json();
            const song = pickBestSongMatch(sData.songs, data.title, data.artist);
            if (!song) throw new Error(`Recognized "${data.title}" but couldn't find its lyrics.`);
            selectSong(song.id, `${song.name} — ${song.artist}`, (data.offsetMs || 0) / 1000);
        } catch (e) {
            results.innerHTML = `<p class="error" style="text-align:center;">${escapeHtml(e.message)}</p>`;
        }
    };
    identifyRecorder.start();
    setTimeout(() => { if (identifyRecorder && identifyRecorder.state === 'recording') identifyRecorder.stop(); }, 8000);
}

function openKaraoke() {
    ensureKaraokeOverlay();
    showKaraokeSearch();
    karaokeOverlayEl.classList.add('active');
    karaokeOverlayEl.querySelector('#kara-input').focus();
}

function closeKaraoke() {
    stopKaraokeTimer();
    if (karaokeOverlayEl) karaokeOverlayEl.classList.remove('active');
}

function showKaraokeSearch() {
    stopKaraokeTimer();
    karaokeOverlayEl.querySelector('#kara-search-view').style.display = 'flex';
    karaokeOverlayEl.querySelector('#kara-player').style.display = 'none';
    karaokeOverlayEl.querySelector('#kara-transport').style.display = 'none';
    karaokeOverlayEl.querySelector('#kara-back').style.display = 'none';
    karaokeOverlayEl.querySelector('#kara-title').textContent = 'Karaoke';
}

async function searchSongs() {
    const q = karaokeOverlayEl.querySelector('#kara-input').value.trim();
    if (!q) return;
    const results = karaokeOverlayEl.querySelector('#kara-results');
    results.innerHTML = `<p class="info" style="text-align:center;">Searching…</p>`;
    try {
        const resp = await fetch(`${backendUrl}/song-search?q=${encodeURIComponent(q)}`);
        const data = await resp.json();
        if (!resp.ok) throw new Error(data.error || 'Search failed.');
        if (!data.songs || data.songs.length === 0) {
            results.innerHTML = `<p class="info" style="text-align:center;">No songs found.</p>`;
            return;
        }
        results.innerHTML = data.songs.map(s => `
            <div class="kara-result" data-id="${s.id}" data-name="${escapeHtml(s.name)} — ${escapeHtml(s.artist)}">
                <div><div class="kara-result-name">${escapeHtml(s.name)}</div><div class="kara-result-artist">${escapeHtml(s.artist)}${s.album ? ' · ' + escapeHtml(s.album) : ''}</div></div>
            </div>`).join('');
        results.querySelectorAll('.kara-result').forEach(el => el.addEventListener('click', () => selectSong(el.dataset.id, el.dataset.name)));
    } catch (e) {
        results.innerHTML = `<p class="error" style="text-align:center;">${escapeHtml(e.message)}</p>`;
    }
}

async function selectSong(id, name, autoStartSec) {
    const player = karaokeOverlayEl.querySelector('#kara-player');
    karaokeOverlayEl.querySelector('#kara-search-view').style.display = 'none';
    player.style.display = 'block';
    player.innerHTML = `<p class="info">Loading lyrics…</p>`;
    try {
        const resp = await fetch(`${backendUrl}/song-lyric?id=${encodeURIComponent(id)}`);
        const data = await resp.json();
        if (!resp.ok) throw new Error(data.error || 'Could not load lyrics.');
        const lines = parseLrc(data.lrc);
        if (lines.length === 0 || data.available === false) {
            throw new Error('This recording has no synced lyrics (often the licensed original). Tap ‹ Back and pick another version of the song.');
        }
        const transMap = {};
        for (const l of parseLrc(data.tlyric)) transMap[l.t.toFixed(1)] = l.text;
        renderKaraokePlayer(name, lines, transMap);
        if (typeof autoStartSec === 'number' && autoStartSec > 0) {
            seekKaraoke(autoStartSec);
            toggleKaraokePlay(); // auto-play in sync from the recognized position
        }
    } catch (e) {
        player.innerHTML = `<p class="error" style="text-align:center;">${escapeHtml(e.message)}</p>`;
        karaokeOverlayEl.querySelector('#kara-search-view').style.display = 'none';
        karaokeOverlayEl.querySelector('#kara-player').style.display = 'block';
        karaokeOverlayEl.querySelector('#kara-back').style.display = 'inline-block';
    }
}

function renderKaraokePlayer(name, lines, transMap) {
    karaoke.lines = lines;
    karaoke.elapsed = 0;
    karaoke.base = 0;
    karaoke.activeIdx = -1;
    karaoke.playing = false;

    karaokeOverlayEl.querySelector('#kara-title').textContent = name;
    karaokeOverlayEl.querySelector('#kara-search-view').style.display = 'none';
    karaokeOverlayEl.querySelector('#kara-back').style.display = 'inline-block';
    const player = karaokeOverlayEl.querySelector('#kara-player');
    const transport = karaokeOverlayEl.querySelector('#kara-transport');
    player.style.display = 'block';
    transport.style.display = 'flex';
    karaokeOverlayEl.querySelector('#kara-play').textContent = '▶';

    player.innerHTML =
        `<p class="kara-hint">Play the song on your own music app, then tap ▶ in sync. Tap any line to jump.</p>` +
        lines.map((l, i) => {
            const en = transMap[l.t.toFixed(1)];
            return `<div class="kara-line" data-i="${i}" data-t="${l.t}" data-zh="${escapeHtml(l.text)}">
                <div class="kara-zh">${renderRubyLine(l.text)}</div>
                <div class="kara-en">${en ? escapeHtml(en) : ''}</div>
            </div>`;
        }).join('');
    player.querySelectorAll('.kara-line').forEach(el => el.addEventListener('click', () => seekKaraoke(parseFloat(el.dataset.t))));
    updateKaraokeTime(0);
}

function toggleKaraokePlay() {
    if (karaoke.playing) {
        stopKaraokeTimer();
    } else {
        karaoke.playing = true;
        karaoke.base = karaoke.elapsed;
        karaoke.startedAt = performance.now();
        karaokeOverlayEl.querySelector('#kara-play').textContent = '⏸';
        karaokeTick();
    }
}

function stopKaraokeTimer() {
    karaoke.playing = false;
    if (karaoke.raf) { cancelAnimationFrame(karaoke.raf); karaoke.raf = null; }
    if (karaokeOverlayEl) {
        const btn = karaokeOverlayEl.querySelector('#kara-play');
        if (btn) btn.textContent = '▶';
    }
}

function seekKaraoke(t) {
    karaoke.elapsed = Math.max(0, t);
    karaoke.base = karaoke.elapsed;
    karaoke.startedAt = performance.now();
    highlightKaraoke();
    updateKaraokeTime(karaoke.elapsed);
}

function karaokeTick() {
    if (!karaoke.playing) return;
    karaoke.elapsed = karaoke.base + (performance.now() - karaoke.startedAt) / 1000 * karaoke.rate;
    highlightKaraoke();
    updateKaraokeTime(karaoke.elapsed);
    karaoke.raf = requestAnimationFrame(karaokeTick);
}

function highlightKaraoke() {
    let idx = -1;
    for (let i = 0; i < karaoke.lines.length; i++) {
        if (karaoke.lines[i].t <= karaoke.elapsed + 0.15) idx = i; else break;
    }
    if (idx === karaoke.activeIdx) return;
    karaoke.activeIdx = idx;
    const player = karaokeOverlayEl.querySelector('#kara-player');
    player.querySelectorAll('.kara-line.active').forEach(el => el.classList.remove('active'));
    if (idx >= 0) {
        const el = player.querySelector(`.kara-line[data-i="${idx}"]`);
        if (el) {
            el.classList.add('active');
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            translateKaraokeLine(el);
            // Prefetch the next line's translation so it's ready.
            translateKaraokeLine(player.querySelector(`.kara-line[data-i="${idx + 1}"]`));
        }
    }
}

// Lazily translate a lyric line (only lines you reach; cached server-side).
async function translateKaraokeLine(el) {
    if (!el) return;
    const enEl = el.querySelector('.kara-en');
    if (!enEl || enEl.textContent.trim() || enEl.dataset.pending) return;
    enEl.dataset.pending = '1';
    try {
        enEl.textContent = await translateText(el.dataset.zh, 'EN');
    } catch (_) {
        delete enEl.dataset.pending; // allow retry
    }
}

function updateKaraokeTime(sec) {
    const el = karaokeOverlayEl.querySelector('#kara-time');
    if (!el) return;
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    el.textContent = `${m}:${String(s).padStart(2, '0')}`;
}

// ===================================
// ======== SUBTITLES (TV/FILM) ======
// ===================================
// Load an .srt/.ass/.vtt for a show and get a synced, tappable Chinese
// transcript (tone-colored pinyin + lazy English). Follow along by tapping ▶
// in sync with whatever you're watching, or load the video file to auto-sync.

let subsOverlayEl = null;
const subs = { cues: [], playing: false, elapsed: 0, base: 0, startedAt: 0, raf: null, activeIdx: -1, video: null, rate: 1 };
const SUBS_SPEEDS = [0.5, 0.75, 1, 1.25, 1.5];
try { const saved = parseFloat(localStorage.getItem('subsSpeed')); if (!isNaN(saved) && SUBS_SPEEDS.includes(saved)) subs.rate = saved; } catch (_) { /* ignore */ }

// Read-aloud state for the "read whole thing" buttons (🔊中 / 🔊EN). Advances
// through the cue list line by line, highlighting each as it's spoken.
const subsReading = { active: false, token: 0 };

const subsBtn = document.getElementById('subs-btn');
const subsFileInput = document.getElementById('subs-file-input');
const subsVideoInput = document.getElementById('subs-video-input');
if (subsBtn && subsFileInput) {
    subsBtn.addEventListener('click', () => subsFileInput.click());
    subsFileInput.addEventListener('change', () => { const f = subsFileInput.files && subsFileInput.files[0]; if (f) handleSubsFile(f); subsFileInput.value = ''; });
}
if (subsVideoInput) subsVideoInput.addEventListener('change', () => { const f = subsVideoInput.files && subsVideoInput.files[0]; if (f) loadSubsVideo(f); subsVideoInput.value = ''; });

// --- Video link: paste a YouTube/Bilibili/XHS/Douyin URL; the server (via the
// home GPU worker) pulls captions, or transcribes the audio, and we load the
// result into the synced subtitle player with tone pinyin + English. ---
const videoLinkBtn = document.getElementById('video-link-btn');
if (videoLinkBtn) videoLinkBtn.addEventListener('click', openVideoLinkPrompt);

function openVideoLinkPrompt() {
    showModal('Paste a video link', `
        <p class="info" style="margin:0 0 0.85rem;">YouTube, Bilibili, 小红书, Douyin… I'll pull the captions — or transcribe the audio if there are none — and add tone pinyin + English.</p>
        <input id="video-url-input" type="url" inputmode="url" placeholder="https://…" autocomplete="off"
            style="width:100%; box-sizing:border-box; padding:0.7rem 0.9rem; border-radius:12px; border:1px solid var(--border-color); background:var(--input-bg); color:var(--text-main); font-size:1rem;">
        <div style="display:flex; gap:0.5rem; justify-content:center; margin-top:1rem;">
            <button class="modal-btn primary" id="video-extract-go">Extract subtitles</button>
        </div>
        <div id="video-extract-status" class="info" style="margin-top:0.85rem; min-height:1.2rem; line-height:1.5;"></div>`);
    const input = document.getElementById('video-url-input');
    if (input) {
        input.focus();
        input.addEventListener('keydown', (e) => { if (e.key === 'Enter') runVideoExtract(input.value.trim()); });
    }
    const go = document.getElementById('video-extract-go');
    if (go) go.addEventListener('click', () => runVideoExtract((input && input.value || '').trim()));
}

// Bumped whenever a new extraction starts or the prompt modal closes; a running
// poll aborts as soon as its token is superseded (no stacked polls, no ambush).
let videoExtractToken = 0;

async function runVideoExtract(url) {
    const statusEl = document.getElementById('video-extract-status');
    const setStatus = (html) => { if (statusEl) statusEl.innerHTML = html; };
    if (!/^https?:\/\/\S+$/i.test(url)) { setStatus('<span class="error">Enter a valid video URL (starting with http).</span>'); return; }
    const myToken = ++videoExtractToken; // supersede any prior in-flight poll
    const go = document.getElementById('video-extract-go');
    if (go) go.disabled = true;
    setStatus('<span class="loading">Contacting the server…</span>');
    try {
        const start = await fetch(`${backendUrl}/video-subs`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url })
        });
        const sd = await start.json();
        if (!start.ok) throw new Error(sd.error || 'Could not start extraction.');
        const jobId = sd.jobId;

        let tries = 0;
        while (tries++ < 600) { // poll up to ~30 min at 3s
            await new Promise(r => setTimeout(r, 3000));
            if (myToken !== videoExtractToken) return; // cancelled or superseded
            let d;
            try {
                const st = await fetch(`${backendUrl}/video-subs-status?jobId=${encodeURIComponent(jobId)}`);
                d = await st.json();
            } catch (_) { continue; } // transient network blip — keep polling
            if (d.status === 'pending') {
                setStatus(tries < 4
                    ? '<span class="loading">Looking for captions…</span>'
                    : '<span class="loading">No captions — transcribing the audio on your GPU. This can take a few minutes for a long video…</span>');
                continue;
            }
            if (d.status === 'error') throw new Error(d.error || 'Extraction failed.');
            if (d.status === 'done') {
                const cues = parseSrt(d.srt || '');
                if (!cues.length) throw new Error('No Chinese subtitle lines were found in this video.');
                closeHanziModal();
                renderSubsPlayer(d.title || 'Video', cues);
                return;
            }
        }
        throw new Error('Timed out waiting for the video. Try a shorter clip, or check the home worker is running.');
    } catch (e) {
        setStatus(`<span class="error">${escapeHtml(e.message)}</span>`);
    } finally {
        if (go) go.disabled = false;
    }
}

function parseSrt(text) {
    const cues = [];
    for (const block of text.replace(/\r/g, '').split(/\n\n+/)) {
        // Hours are optional so this also parses WebVTT cues written as MM:SS.mmm
        // (not just SRT's HH:MM:SS,mmm) — the .vtt file input relies on this.
        const m = block.match(/(?:(\d+):)?(\d+):(\d+)[,.](\d+)\s*-->\s*(?:(\d+):)?(\d+):(\d+)[,.](\d+)/);
        if (!m) continue;
        const start = (+m[1] || 0) * 3600 + (+m[2]) * 60 + (+m[3]) + (+m[4]) / 1000;
        const lines = block.split('\n');
        const idx = lines.findIndex(l => l.includes('-->'));
        const txt = lines.slice(idx + 1).join(' ').replace(/<[^>]+>/g, '').replace(/\{[^}]*\}/g, '').trim();
        if (txt && chineseCharRegex.test(txt)) cues.push({ t: start, text: txt });
    }
    return cues.sort((a, b) => a.t - b.t);
}

function parseAss(text) {
    const cues = [];
    const assTime = (s) => { const m = (s || '').trim().match(/(\d+):(\d+):(\d+)[.:](\d+)/); return m ? (+m[1]) * 3600 + (+m[2]) * 60 + (+m[3]) + (+m[4]) / 100 : 0; };
    for (const raw of text.split(/\r?\n/)) {
        if (!raw.startsWith('Dialogue:')) continue;
        const parts = raw.slice(9).split(',');
        if (parts.length < 10) continue;
        const start = assTime(parts[1]);
        const txt = parts.slice(9).join(',').replace(/\{[^}]*\}/g, '').replace(/\\N/gi, ' ').replace(/<[^>]+>/g, '').trim();
        if (txt && chineseCharRegex.test(txt)) cues.push({ t: start, text: txt });
    }
    return cues.sort((a, b) => a.t - b.t);
}

async function handleSubsFile(file) {
    const name = (file.name || '').toLowerCase();
    let text;
    try { text = await file.text(); } catch (_) { showModal('Could not read file', 'Please try another subtitle file.'); return; }
    const cues = (name.endsWith('.ass') || name.endsWith('.ssa')) ? parseAss(text) : parseSrt(text);
    if (cues.length === 0) { showModal('No subtitles', 'No Chinese subtitle lines found in that file.'); return; }
    renderSubsPlayer(file.name.replace(/\.[^.]+$/, ''), cues);
}

function ensureSubsOverlay() {
    if (subsOverlayEl) return subsOverlayEl;
    subsOverlayEl = document.createElement('div');
    subsOverlayEl.id = 'subs-overlay';
    subsOverlayEl.innerHTML = `
        <div class="kara-topbar">
            <h3 id="subs-title">Subtitles</h3>
            <button class="modal-btn" id="subs-load-video">Load video</button>
            <button class="modal-btn" id="subs-close">Close</button>
        </div>
        <div class="subs-toolbar" id="subs-toolbar">
            <button class="reader-transport-chip" id="subs-read-zh" title="Read the Chinese aloud, line by line">🔊中</button>
            <button class="reader-transport-chip" id="subs-read-en" title="Read the English translation aloud">🔊EN</button>
            <button class="reader-transport-chip" id="subs-read-stop" style="display:none;" title="Stop reading">⏹ Stop</button>
            <button class="reader-transport-chip" id="subs-summary-btn" title="Summarize this video with AI (Chinese, English &amp; pinyin)">📝 AI summary</button>
        </div>
        <video id="subs-video" controls playsinline></video>
        <div class="kara-player" id="subs-player"></div>
        <div id="subs-summary-panel" class="subs-summary-panel" style="display:none;"></div>
        <div class="kara-transport" id="subs-transport">
            <div id="subs-playback-controls" style="display:contents;">
                <button class="kara-play-btn" id="subs-play">▶</button>
                <span class="kara-time" id="subs-time">0:00</span>
            </div>
            <button class="reader-transport-chip" id="subs-speed" title="Playback speed — slow down or speed up to match the video">1×</button>
        </div>`;
    document.body.appendChild(subsOverlayEl);
    subsOverlayEl.querySelector('#subs-close').addEventListener('click', closeSubs);
    subsOverlayEl.querySelector('#subs-load-video').addEventListener('click', () => subsVideoInput.click());
    subsOverlayEl.querySelector('#subs-play').addEventListener('click', toggleSubsPlay);
    subsOverlayEl.querySelector('#subs-read-zh').addEventListener('click', readSubsChinese);
    subsOverlayEl.querySelector('#subs-read-en').addEventListener('click', readSubsEnglish);
    subsOverlayEl.querySelector('#subs-read-stop').addEventListener('click', stopSubsReading);
    subsOverlayEl.querySelector('#subs-summary-btn').addEventListener('click', openSubsSummary);
    const subsSpeedBtn = subsOverlayEl.querySelector('#subs-speed');
    subsSpeedBtn.textContent = subs.rate + '×';
    subsSpeedBtn.addEventListener('click', () => {
        let next = SUBS_SPEEDS.find(s => s > subs.rate + 0.001);
        if (next === undefined) next = SUBS_SPEEDS[0];
        subs.rate = next;
        subsSpeedBtn.textContent = next + '×';
        // Rebase the timer-driven mode so the change doesn't jump elapsed time.
        subs.base = subs.elapsed;
        subs.startedAt = performance.now();
        if (subs.video && subs.video.classList.contains('loaded')) subs.video.playbackRate = next;
        try { localStorage.setItem('subsSpeed', String(next)); } catch (_) { /* ignore */ }
    });
    subs.video = subsOverlayEl.querySelector('#subs-video');
    subs.video.addEventListener('timeupdate', () => {
        if (!subs.video.classList.contains('loaded')) return;
        subs.elapsed = subs.video.currentTime;
        highlightSubs();
        updateSubsTime(subs.elapsed);
    });
    return subsOverlayEl;
}

function closeSubs() {
    stopSubsTimer();
    stopSubsReading();
    if (subs.video) { try { subs.video.pause(); } catch (_) {} }
    if (subsOverlayEl) subsOverlayEl.classList.remove('active');
}

function renderSubsPlayer(name, cues) {
    ensureSubsOverlay();
    stopSubsReading();
    subs.cues = cues;
    subs.elapsed = 0; subs.base = 0; subs.activeIdx = -1; subs.playing = false;
    subsOverlayEl.querySelector('#subs-title').textContent = name;
    subsOverlayEl.querySelector('#subs-play').textContent = '▶';
    // Reset transport to the timer-driven layout (a fresh subs file has no
    // video attached yet); loadSubsVideo() re-hides the play/time half.
    subsOverlayEl.querySelector('#subs-transport').style.display = 'flex';
    subsOverlayEl.querySelector('#subs-playback-controls').style.display = 'contents';
    const summaryPanel = subsOverlayEl.querySelector('#subs-summary-panel');
    summaryPanel.style.display = 'none';
    summaryPanel.innerHTML = '';
    const player = subsOverlayEl.querySelector('#subs-player');
    player.innerHTML =
        `<p class="kara-hint">Tap ▶ in sync with what you're watching, or “Load video” to auto-sync. Tap a line to jump.</p>` +
        cues.map((c, i) => `<div class="kara-line" data-i="${i}" data-t="${c.t}" data-zh="${escapeHtml(c.text)}">
            <div class="kara-zh">${renderRubyLine(c.text)}</div>
            <div class="kara-en"></div>
        </div>`).join('');
    player.querySelectorAll('.kara-line').forEach(el => el.addEventListener('click', () => seekSubs(parseFloat(el.dataset.t))));
    updateSubsTime(0);
    subsOverlayEl.classList.add('active');
}

function loadSubsVideo(file) {
    ensureSubsOverlay();
    stopSubsTimer();
    if (subs.video.src && subs.video.src.startsWith('blob:')) URL.revokeObjectURL(subs.video.src);
    subs.video.src = URL.createObjectURL(file);
    subs.video.classList.add('loaded');
    subs.video.playbackRate = subs.rate;
    // Video controls drive sync now — hide our play/time row but keep the
    // speed chip (native <video> controls have no cross-browser speed UI).
    subsOverlayEl.querySelector('#subs-playback-controls').style.display = 'none';
}

function toggleSubsPlay() {
    if (subs.playing) { stopSubsTimer(); return; }
    subs.playing = true;
    subs.base = subs.elapsed;
    subs.startedAt = performance.now();
    subsOverlayEl.querySelector('#subs-play').textContent = '⏸';
    subsTick();
}

function stopSubsTimer() {
    subs.playing = false;
    if (subs.raf) { cancelAnimationFrame(subs.raf); subs.raf = null; }
    if (subsOverlayEl) { const b = subsOverlayEl.querySelector('#subs-play'); if (b) b.textContent = '▶'; }
}

function seekSubs(t) {
    subs.elapsed = Math.max(0, t);
    subs.base = subs.elapsed;
    subs.startedAt = performance.now();
    if (subs.video && subs.video.classList.contains('loaded')) subs.video.currentTime = subs.elapsed;
    highlightSubs();
    updateSubsTime(subs.elapsed);
}

function subsTick() {
    if (!subs.playing) return;
    subs.elapsed = subs.base + (performance.now() - subs.startedAt) / 1000 * subs.rate;
    highlightSubs();
    updateSubsTime(subs.elapsed);
    subs.raf = requestAnimationFrame(subsTick);
}

function highlightSubs() {
    let idx = -1;
    for (let i = 0; i < subs.cues.length; i++) { if (subs.cues[i].t <= subs.elapsed + 0.15) idx = i; else break; }
    if (idx === subs.activeIdx) return;
    subs.activeIdx = idx;
    const player = subsOverlayEl.querySelector('#subs-player');
    player.querySelectorAll('.kara-line.active').forEach(el => el.classList.remove('active'));
    if (idx >= 0) {
        const el = player.querySelector(`.kara-line[data-i="${idx}"]`);
        if (el) {
            el.classList.add('active');
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            translateKaraokeLine(el);
            translateKaraokeLine(player.querySelector(`.kara-line[data-i="${idx + 1}"]`));
        }
    }
}

function updateSubsTime(sec) {
    const el = subsOverlayEl && subsOverlayEl.querySelector('#subs-time');
    if (!el) return;
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    el.textContent = `${m}:${String(s).padStart(2, '0')}`;
}

// === Read-aloud (whole transcript, Chinese or English) ===
// Speaks through subs.cues line by line, highlighting the current one — this
// doubles as both "read the whole thing" and "read line by line" since the
// cues already are the natural line boundaries.
function speakEnglish(text, { onstart, onend } = {}) {
    if (!('speechSynthesis' in window)) { if (onend) onend(); return; }
    try { window.speechSynthesis.cancel(); } catch (_) { /* ignore */ }
    const u = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const v = voices.find(v => /^en/i.test(v.lang));
    if (v) u.voice = v;
    u.lang = v ? v.lang : 'en-US';
    u.rate = currentTtsRate();
    if (onstart) u.onstart = onstart;
    u.onend = () => { if (onend) onend(); };
    u.onerror = () => { if (onend) onend(); };
    window.speechSynthesis.speak(u);
}

function highlightSubsReadIdx(idx) {
    const player = subsOverlayEl.querySelector('#subs-player');
    player.querySelectorAll('.kara-line.reading').forEach(el => el.classList.remove('reading'));
    if (idx >= 0) {
        const el = player.querySelector(`.kara-line[data-i="${idx}"]`);
        if (el) { el.classList.add('reading'); el.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
    }
}

function updateSubsReadButtons() {
    if (!subsOverlayEl) return;
    const stopBtn = subsOverlayEl.querySelector('#subs-read-stop');
    if (stopBtn) stopBtn.style.display = subsReading.active ? 'inline-flex' : 'none';
    const zhBtn = subsOverlayEl.querySelector('#subs-read-zh');
    const enBtn = subsOverlayEl.querySelector('#subs-read-en');
    if (zhBtn) zhBtn.disabled = subsReading.active;
    if (enBtn) enBtn.disabled = subsReading.active;
}

function stopSubsReading() {
    subsReading.token++;
    subsReading.active = false;
    stopAllSpeech();
    if (subsOverlayEl) { highlightSubsReadIdx(-1); updateSubsReadButtons(); }
}

async function readSubsChinese() {
    if (subsReading.active || !subs.cues.length) return;
    subsReading.active = true;
    const token = ++subsReading.token;
    updateSubsReadButtons();
    for (let i = 0; i < subs.cues.length; i++) {
        if (token !== subsReading.token) return;
        highlightSubsReadIdx(i);
        await new Promise(resolve => speakSmart(subs.cues[i].text, { onend: resolve }));
    }
    if (token === subsReading.token) stopSubsReading();
}

// Reads the English translation of every cue, translating (and caching in the
// visible .kara-en element) any line that hasn't been translated yet.
async function readSubsEnglish() {
    if (subsReading.active || !subs.cues.length) return;
    subsReading.active = true;
    const token = ++subsReading.token;
    updateSubsReadButtons();
    const player = subsOverlayEl.querySelector('#subs-player');
    for (let i = 0; i < subs.cues.length; i++) {
        if (token !== subsReading.token) return;
        highlightSubsReadIdx(i);
        const enEl = player.querySelector(`.kara-line[data-i="${i}"] .kara-en`);
        let text = enEl ? enEl.textContent.trim() : '';
        if (!text) {
            try { text = await translateText(subs.cues[i].text, 'EN'); if (enEl) enEl.textContent = text; } catch (_) { text = ''; }
        }
        if (token !== subsReading.token) return;
        if (text) await new Promise(resolve => speakEnglish(text, { onend: resolve }));
    }
    if (token === subsReading.token) stopSubsReading();
}

// === AI summary (Chinese + English + pinyin, like the reader's translation) ===
async function openSubsSummary() {
    if (!subsOverlayEl || !subs.cues.length) return;
    const panel = subsOverlayEl.querySelector('#subs-summary-panel');
    panel.style.display = 'block';
    panel.innerHTML = `<p class="info" style="text-align:center;">🧠 Summarizing…</p>`;
    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const fullText = subs.cues.map(c => c.text).join('');
    try {
        const resp = await fetch(`${backendUrl}/summarize`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: fullText })
        });
        if (resp.status === 404) throw new Error('AI summary needs a server update — ask the site owner to deploy it.');
        const data = await resp.json();
        if (!resp.ok) throw new Error(data.error || 'Could not summarize this video.');
        const zh = (data.summary || '').trim();
        if (!zh) throw new Error('Got an empty summary.');
        let en = '';
        try { en = await translateText(zh, 'EN'); } catch (_) { en = ''; }
        const py = window.pinyinPro?.pinyin ? window.pinyinPro.pinyin(zh, { toneType: 'symbol' }) : '';
        panel.innerHTML = `
            <div class="subs-summary-block"><div class="subs-summary-label">中文摘要 · Chinese</div><div class="subs-summary-zh">${escapeHtml(zh)}</div></div>
            <div class="subs-summary-block"><div class="subs-summary-label">Pinyin</div><div class="subs-summary-py">${escapeHtml(py)}</div></div>
            <div class="subs-summary-block"><div class="subs-summary-label">English</div><div class="subs-summary-en">${escapeHtml(en || '(translation unavailable)')}</div></div>`;
    } catch (e) {
        panel.innerHTML = `<p class="error" style="text-align:center;">${escapeHtml(e.message)}</p>`;
    }
}
