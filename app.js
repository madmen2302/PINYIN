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
const viewportQuery = window.matchMedia('(max-width: 1024px)');
let flashcardRenderToken = 0;
const panelDragState = { active: false, pointerId: null, startX: 0, target: null, initialWidth: 0, panelElement: null, handleElement: null };
let flashcardStore = { decks: [], activeDeckId: null }; // === NEW ===
let currentFlashcardIndex = 0; // === NEW ===
let currentTestSession = null; // === NEW ===
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

async function loadDictionaryAndLibs() {
    try {
        // === OPTIMIZATION: Fetch all initial data in parallel ===
        const [dictResult, customDbResult] = await Promise.allSettled([
            fetch('./dictionary.json'),
            fetch('./custom-db.json')
        ]);

        if (dictResult.status === 'fulfilled' && dictResult.value.ok) {
            dictionary = await dictResult.value.json();
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
document.body.addEventListener('click', () => { if (!userGestureMade) { userGestureMade = true; if ('speechSynthesis' in window) { window.speechSynthesis.speak(new SpeechSynthesisUtterance('')); } console.log("Audio unlocked."); } }, { once: true });

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
    if (e.key === 'Escape') {
        toggleHistoryPanel(false);
        toggleRightPanel(false);
    }
});

function stopAllAudio() {
    speechQueue = [];
    window.speechSynthesis.cancel();
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

// === NEW: Voice Settings Toggle ===
voiceSettingsToggle.addEventListener('click', () => {
    // Ensure main controls are visible
    if (topControlsWrapper.classList.contains('hidden')) {
        controlsToggleBtn.click();
    }
    // Toggle TTS controls
    const ttsVisible = ttsControls.style.display === 'grid';
    ttsControls.style.display = ttsVisible ? 'none' : 'grid';
});

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
flashcardEl.addEventListener('click', (event) => {
    if (event.target.closest('.flashcard-writer')) return;
    flashcardEl.classList.toggle('flipped');
});
flashcardNextBtn.addEventListener('click', () => showFlashcard(currentFlashcardIndex + 1));
flashcardFlipBtn.addEventListener('click', () => flashcardEl.classList.toggle('flipped'));
flashcardAiBtn.addEventListener('click', showFlashcardAiInsight);
flashcardPrevBtn.addEventListener('click', () => showFlashcard(currentFlashcardIndex - 1));
testRightBtn.addEventListener('click', () => recordTestAnswer(true));
testWrongBtn.addEventListener('click', () => recordTestAnswer(false));
testSkipBtn.addEventListener('click', skipCurrentCard);
downloadCsvBtn.addEventListener('click', downloadDeckAsCsv);


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
async function startListening() {
    if (!dictionary || !segmentit) { isListening = false; return; }
    
    // === FIX: Resume AudioContext (Browsers suspend it by default) ===
    if (audioContext && audioContext.state === 'suspended') {
        await audioContext.resume();
    }
    // ================================================================

    wave.classList.add('show');
    finalOutput.innerHTML = "";
    statsContent.innerHTML = "";
    downloadFab.style.display = 'none';
    summaryFab.style.display = 'none';
    playAllFab.style.display = 'none';
    playCharListFab.style.display = 'none'; // Hide new button
    stopFab.style.display = 'none';
    fullAudioChunks = [];
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContext.createMediaStreamSource(stream);
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 512;
        source.connect(analyser);
        visualize();
        mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
        mediaRecorder.addEventListener('dataavailable', (e) => { if (e.data.size > 0) fullAudioChunks.push(e.data); });
        mediaRecorder.addEventListener('stop', processFullRecording);
        mediaRecorder.start();
    } catch (error) { console.error('Microphone error:', error); }
}
function stopListening() {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
        mediaRecorder.stream.getTracks().forEach(track => track.stop());
    }
    wave.classList.remove('show');
    if (audioContext) { audioContext.close(); audioContext = null; }
    if (animationFrameId) { cancelAnimationFrame(animationFrameId); animationFrameId = null; }
    bars.forEach(bar => bar.style.height = '5px');
}

function visualize() { if (!analyser) return; const bufferLength = analyser.frequencyBinCount; const dataArray = new Uint8Array(bufferLength); analyser.getByteFrequencyData(dataArray); const barCount = bars.length; for (let i = 0; i < barCount; i++) { const dataIndex = Math.floor(bufferLength / barCount * i); const barHeight = Math.pow(dataArray[dataIndex] / 255, 2.5) * 40; bars[i].style.height = `${Math.max(5, barHeight)}px`; } animationFrameId = requestAnimationFrame(visualize); }

async function processFullRecording() {
    wave.classList.remove('show');
    if (fullAudioChunks.length === 0) {
        processingOverlay.classList.remove('visible');
        finalOutput.innerHTML = "<p class='info'>No audio recorded.</p>";
        return;
    }
    processingOverlay.classList.add('visible');
    const fullAudioBlob = new Blob(fullAudioChunks, { type: 'audio/webm' });
    const CHUNK_LIMIT = 24 * 1024 * 1024;
    try {
        let whisperResult = {};
        if (fullAudioBlob.size <= CHUNK_LIMIT) {
            whisperResult = await sendBlobToWhisper(fullAudioBlob);
        } else {
            let fullText = "";
            let start = 0;
            while (start < fullAudioBlob.size) {
                const end = Math.min(start + CHUNK_LIMIT, fullAudioBlob.size);
                const chunk = fullAudioBlob.slice(start, end, 'audio/webm');
                const chunkResult = await sendBlobToWhisper(chunk, fullText);
                if (chunkResult.text) fullText += chunkResult.text + " ";
                start += CHUNK_LIMIT;
            }
            whisperResult = { text: fullText, language: 'zh' };
        }
        if (whisperResult.text) {
            let text = whisperResult.text.trim().replace(/\n/g, '。');
            await processTranscription(text, whisperResult.language);
        } else {
            processingOverlay.classList.remove('visible');
            finalOutput.innerHTML = `<p class="info">No speech detected.</p>`;
        }
    } catch (error) {
        processingOverlay.classList.remove('visible');
        finalOutput.innerHTML = `<p class="error">⚠️ Final Error: ${error.message}</p>`;
    }
}
async function sendBlobToWhisper(blob, prompt = "") {
    const formData = new FormData();
    formData.append('file', blob, 'recording.webm');
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
                            let charDef = dictionary ? dictionary[char] : null;
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
                                    <div class="word-english" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" onclick="event.stopPropagation(); window.showText('Definition for ${char}', this.parentElement.parentElement.dataset.def)" data-full-def="${escapedFullCharDef}">${shortCharDef}</div>
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
                            charGridHtml += `<div class="char-unit"><div class="char" data-char="${char}" onclick="window.showStrokes('${char}')">${char}</div></div>`;
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
                            <div class="word-english" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" onclick="event.stopPropagation(); window.showText('Definition for ${word}', this.parentElement.parentElement.dataset.def)" data-full-def="${escapedFullWordDef}">${shortWordDef}</div>
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
            <div class="final-pinyin">${finalPinyin}</div>
            <div class="final-chinese">${finalChineseText} <span class="play-btn-svg" onclick="window.requestSpeech(this.parentElement.textContent.replace('▶️', '').trim())">${playIcon}</span></div>
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
    const chars = sentence.match(/[\u4e00-\u9fff]/g);
    stopAllAudio();
    playAllFab.classList.add('playing');
    if (soundStopFab) soundStopFab.classList.add('playing');
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
        await processTranscription(session.transcription, 'zh', true, enhancedDefsData);
        revertBtn.style.display = 'inline-block';
    } catch (error) {
        console.error("Enhance failed:", error);
        session.breakdownHtml = oldBreakdown;
        displaySession(currentSessionId);
        showModal("Enhancement Failed", `AI enhancement failed: ${error.message}`);
    } finally {
        enhanceBtn.disabled = false;
        enhanceBtn.classList.remove('working');
        enhanceBtn.style.display = 'none';
    }
}
function revertDefinitions() {
    const session = findSessionById(currentSessionId);
    if (!session) return;
    revertBtn.disabled = true;
    processTranscription(session.transcription, 'zh', true, null);
    revertBtn.disabled = false;
    revertBtn.style.display = 'none';
    enhanceBtn.style.display = 'inline-block';
}

// ======== HISTORY & STATE MANAGEMENT ========
// === UPDATED: Save triggers global stats update ===
function saveHistory() {
    localStorage.setItem('transcriptionHistory', JSON.stringify(sessionHistory));
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
        if (!term || !text) return text;
        const regex = new RegExp(`(${term.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
        return text.replace(regex, '<mark class="search-highlight">$1</mark>');
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
window.requestSpeech = (text) => {
    speechQueue = [];
    window.speechSynthesis.cancel();
    isSpeaking = false;
    const repeatCount = parseInt(repeatCountSelector.value, 10);
    for (let i = 0; i < repeatCount; i++) { speechQueue.push(text); }
    speakFromQueue();
    playAllFab.classList.add('playing');
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
function populateVoiceList() { availableVoices = speechSynthesis.getVoices().filter(voice => voice.lang.startsWith('zh')); voiceSelector.innerHTML = ''; if (availableVoices.length === 0) { voiceSelector.innerHTML = '<option>No Chinese voices</option>'; return; } for(const voice of availableVoices) { const option = document.createElement('option'); option.textContent = `${voice.name} (${voice.lang})`; option.value = voice.name; voiceSelector.appendChild(option); } }

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
        return `<div class="stat-item" onclick="window.showStrokes('${char}')"><span class="stat-char">${char}</span><span class="stat-pinyin">${pinyin}</span><span class="stat-english">${definition}</span><span class="stat-count">${count}</span></div>`;
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
        return `<div class="stat-item" onclick="window.showStrokes('${char}')"><span class="stat-char">${char}</span><span class="stat-pinyin">${pinyin}</span><span class="stat-english">${definition}</span><span class="stat-count">${count}</span></div>`;
    }).join('');
    globalStatsContent.innerHTML = `<div class="stats-list">${statsHtml}</div>`;
}


function closeHanziModal() {
    loopingChar = null; // Stop any animation loops
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
    modalCloseBtn.style.display = 'none'; // Hide the default close button

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
    const metadata = await fetchCharacterMetadata(char);

    modalTitle.textContent = ''; // Remove the title
    
    // === NEW: Add nav buttons to modal body ===
    modalBody.innerHTML = `
        <div id="stroke-target"></div>
        <div id="hanzi-modal-info">
            <div id="hanzi-modal-pinyin" onclick="window.requestSpeech('${char}')">${pinyin}</div>
            <div id="hanzi-modal-def" onclick="window.showText('Definition for ${char}', '${fullDef.replace(/'/g, '&#39;').replace(/"/g, '&quot;')}')">${shortDef}</div>
        </div>
        <div id="hanzi-modal-details">
            <div class="hanzi-modal-components component-list loading">Fetching components...</div>
            <div class="hanzi-modal-equation loading">Fetching equation...</div>
            <div class="hanzi-modal-mnemonic loading">Fetching mnemonic...</div>
        </div>
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
            const response = await fetch(`${backendUrl}/radical-info`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ char, pinyin, definition, components: metadata.components, strokeCount: metadata.strokeCount })
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
}

window.showText = (title, text) => {
    closeHanziModal();
    modalTitle.textContent = title;
    modalBody.innerHTML = `<p>${text}</p>`;
    modal.classList.add('active');
}

function showModal(title, content) {
    closeHanziModal();
    modalTitle.textContent = title;
    modalBody.innerHTML = content;
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
                <div class="char-list-english" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 60px;" onclick="event.stopPropagation(); window.showText('Def. for ${char}', '${escapedFullDef}')" title="${fullDef}">${shortDef}</div>
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
        return `<div class="stat-item"><span class="stat-char">${char}</span><span class="stat-pinyin">${pinyin}</span><span class="stat-english">${definition}</span><span class="stat-count">${count}</span></div>`;
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
            return `<div class="stat-item"><span class="stat-char">${char}</span><span class="stat-pinyin">${pinyin}</span><span class="stat-english">${definition}</span><span class="stat-count">${count}</span></div>`;
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
    addToDeckBtn.textContent = `Add (${uniqueChars.size}) Selected`;
}

function toggleCardSelection(element, event) {
    if (event) event.stopPropagation();
    element.classList.toggle('selected');
    updateSelectedCount();
}

function selectAllCharacters() {
    // Select all selectable cards in the main output, excluding the character list
    const cards = document.querySelectorAll('#finalOutput .word-unit[data-char]');
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

function renderDeckManager() {
    normalizeFlashcardStore();
    const deck = getActiveDeck();

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
            <span>${existingDeck.name}</span>
            <span>${existingDeck.cards.length}</span>
        </div>
    `).join('');

    deckSelector.innerHTML = flashcardStore.decks.map(existingDeck => 
        `<option value="${existingDeck.id}" ${existingDeck.id === flashcardStore.activeDeckId ? 'selected' : ''}>${existingDeck.name}</option>`
    ).join('');

    const metrics = renderDeckSummary(deck);
    renderDeckCardTable(deck);
    updateFlashcardButtons(deck, metrics);
}

function renderDeckSummary(deck) {
    if (!deck || deck.cards.length === 0) {
        deckSummary.innerHTML = '<p class="info">Create or choose a deck to begin.</p>';
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

function startFlashcardGameMode() {
    // NEW: Apply styles to make the flashcard smaller for game mode
    flashcardEl.style.width = 'calc(0.8 * 70vh)'; // 80% of the default width
    flashcardEl.style.height = 'calc(0.8 * 70vh)'; // 80% of the default height

    showFlashcardModal();
    startFlashcardSession('test', { dueOnly: true }, true);
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
        dueOnly: !!options.dueOnly
    };
    currentFlashcardIndex = 0;
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
}

async function renderCardFace(target, types, card, faceKey, token) {
    target.className = `flashcard-face`;
    target.innerHTML = '';
    if (faceKey === 'back') target.classList.add('flashcard-face-back-detailed');

    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'flashcard-content-wrapper'; // Use a class for styling
    target.appendChild(contentWrapper);

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
        contentWrapper.innerHTML = detailedHtml;

        // If no DB data, fetch from AI
        if (!dbData) {
            // The `true` argument tells the function to render the insight directly into the card
            showFlashcardAiInsight(true); 
        }
    }
}

function updateFlashcardProgress(card) {
    if (!currentTestSession) return;
    const totalCards = currentTestSession.cards.length;
    flashcardCounter.textContent = `${currentFlashcardIndex + 1} / ${totalCards}`;
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
    const card = currentTestSession.cards[currentFlashcardIndex];
    if (!card) return;
    updateCardStats(card, isCorrect);
    currentTestSession.answered++;
    if (isCorrect) {
        currentTestSession.correct++;
        flashcardFeedback.textContent = 'Marked correct. Scheduled further out.';
    } else {
        currentTestSession.wrong++;
        flashcardFeedback.textContent = 'Marked for quick review.';
    }
    testScore.textContent = `Score: ${currentTestSession.correct} / ${currentTestSession.answered}`;
    saveFlashcards();
    renderDeckManager();
    flashcardEl.classList.add('flipped');
    setTimeout(() => {
        if (!currentTestSession) return;
        const completed = currentTestSession.correct + currentTestSession.wrong + currentTestSession.skipped;
        if (completed >= currentTestSession.total) {
            finishFlashcardSession(true);
        } else {
            const nextIndex = (currentFlashcardIndex + 1) % currentTestSession.cards.length;
            showFlashcard(nextIndex);
        }
    }, 900);
}

function skipCurrentCard() {
    if (!currentTestSession || currentTestSession.mode !== 'test') return;
    const card = currentTestSession.cards[currentFlashcardIndex];
    if (!card) return;
    card.suspended = true;
    currentTestSession.skipped++;
    flashcardFeedback.textContent = `${card.char} paused. Resume it from the deck list.`;
    saveFlashcards();
    renderDeckManager();
    currentTestSession.cards.splice(currentFlashcardIndex, 1);
    const completed = currentTestSession.correct + currentTestSession.wrong + currentTestSession.skipped;
    if (completed >= currentTestSession.total || currentTestSession.cards.length === 0) {
        finishFlashcardSession(true);
        return;
    }
    if (currentFlashcardIndex >= currentTestSession.cards.length) {
        currentFlashcardIndex = 0;
    }
    showFlashcard(currentFlashcardIndex);
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
    showDeckManager();
    if (showSummary && summary.mode === 'test') {
        alert(`Test complete!\nCorrect: ${summary.correct}\nWrong: ${summary.wrong}\nSkipped: ${summary.skipped}`);
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
    try {
        const response = await fetch(`${backendUrl}/character-data/${encodeURIComponent(char)}`);
        if (response.ok) {
            const data = await response.json();
            payload.strokeCount = data.strokeCount ?? null;
            payload.components = Array.isArray(data.components) ? data.components : [];
            payload.charData = data.charData || null;
        } else {
            console.warn('Character metadata request failed:', response.status);
        }
    } catch (error) {
        console.warn('Character metadata fetch failed:', error.message);
    }

    characterMetadataCache.set(char, payload);
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
                    <div class="radical-def">${definition}</div>
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

function gameShuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function speakOnce(text) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const v = availableVoices.find(voice => voice.name === voiceSelector.value);
    if (v) u.voice = v;
    u.lang = 'zh-CN';
    u.rate = parseFloat(speedSlider?.value || '0.9');
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
    gamesModalEl.querySelector('#game-close-btn').addEventListener('click', closeGames);
    gamesModalEl.addEventListener('click', (e) => { if (e.target === gamesModalEl) closeGames(); });
    return gamesModalEl;
}

function closeGames() {
    if (gamesModalEl) gamesModalEl.classList.remove('active');
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
}

function openGamesHub() {
    ensureGamesModal();
    const cards = getGamesSourceCards();
    const body = gamesModalEl.querySelector('#game-body');
    gamesModalEl.querySelector('#game-title').textContent = 'Games';

    if (cards.length < 4) {
        body.innerHTML = `<p class="info" style="text-align:center; padding:1.5rem 0.5rem;">You need at least 4 characters to play. Add characters to a flashcard deck, or process some text first, then come back.</p>`;
        gamesModalEl.classList.add('active');
        return;
    }

    const deck = getActiveDeck();
    const source = deck && deck.cards.length ? `from "${escapeHtml(deck.name)}"` : 'from this session';
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
        </div>`;
    body.querySelectorAll('.game-hub-choice').forEach(btn => {
        btn.addEventListener('click', () => startGame(btn.dataset.game, cards));
    });
    gamesModalEl.classList.add('active');
}

function startGame(type, cards) {
    gameSession.type = type;
    if (type === 'match') return startMatchGame(cards);
    if (type === 'quiz') return startQuizGame(cards);
    if (type === 'listen') return startListenGame(cards);
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
        if (isCorrect) gs.score++; else btn.classList.add('wrong');
        if (card._card) updateCardStats(card._card, isCorrect);
        gs.index++;
        setTimeout(() => showQuizRound(allCards), 900);
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
        if (isCorrect) gs.score++; else btn.classList.add('wrong');
        if (card._card) updateCardStats(card._card, isCorrect);
        gs.index++;
        setTimeout(() => showListenRound(allCards), 1000);
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
