import { useMemo } from "preact/hooks";
import debounce from "lodash/debounce";
import utils from "utils";
import allLangs from "../../resources/langs.json";
import { setting, saveSetting, updateSetting, isSidePal, toast, loadDicts } from "../state.js";
import { SwitchRow, KeySelect, Select, modifierKeys } from "../components/controls.jsx";
import LanguagePicker from "../components/LanguagePicker.jsx";
import enableLanguages from "../enableLanguages.js";

const letters = ["Disabled", ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))];
const allKeys = [...letters, ...Object.keys(utils.extraKeyMap)];
const optionalModifierKeys = [["", "Empty"], ...modifierKeys];
const englishLookupSources = [
    ["wiktionary", "Wiktionary"],
    ["bingCN", "Bing Dict CN"],
];

// The native color input needs a hex value, but older settings may hold a color name like "yellow".
const toHex = (color) => {
    const ctx = document.createElement("canvas").getContext("2d");
    ctx.fillStyle = color || "yellow";
    return ctx.fillStyle;
};

function HelpLink({ href }) {
    return (
        <a href={href} target="_blank" title="What is this?" class="help-link">
            <i class="small">help</i>
        </a>
    );
}

function HotkeyInline({ sk, k, keys = letters }) {
    return (
        <nav class="small-space wrap">
            <KeySelect k={sk} />
            <span>+</span>
            <KeySelect k={k} options={keys} />
        </nav>
    );
}

function LookupLanguages() {
    const save = async (langs) => {
        updateSetting("enabledLanguages", langs);
        await enableLanguages(langs);
        await loadDicts();
        toast("Language settings and dictionaries updated.");
    };

    const enabled = setting.value.enabledLanguages || [];
    return (
        <div class="setting-block">
            <LanguagePicker value={enabled} onChange={save} label="Target languages to look up" />
            <p class="small-text muted">
                Some words (like "gift") exist in multiple languages (English/German/Swedish). Select the languages you want to
                capture. See{" "}
                <a class="link" href="examples.html" target="_blank">
                    how it works
                </a>
                .
            </p>

            {enabled.includes("Chinese") && (
                <article class="border round small-padding">
                    <h6 class="small">Chinese options</h6>
                    <SwitchRow k="enableConvertCn2T" label="Show definitions in Traditional Chinese instead of Simplified Chinese." />
                    <p class="small-text muted">
                        <i class="small">info</i> Japanese Kanji often conflicts with Chinese. Deselect Chinese above if you are
                        learning Japanese.
                    </p>
                </article>
            )}

            {enabled.includes("English") && (
                <article class="border round small-padding">
                    <h6 class="small">English options</h6>
                    <Select
                        className="key-select wide"
                        label="Lookup source"
                        value={setting.value.englishLookupSource}
                        options={englishLookupSources}
                        onChange={(v) => saveSetting("englishLookupSource", v)}
                    />
                </article>
            )}
        </div>
    );
}

export function GeneralSettings() {
    const s = setting.value;
    const saveExcludedSites = useMemo(() => debounce((v) => saveSetting("excludedSites", v), 600), []);

    return (
        <>
            <article class="round">
                <h6>Selection & highlight</h6>
                <SwitchRow k="markWords" label="Highlight your selected words (not permanent, gone after page refresh)">
                    <label class="button border small" title="Choose highlight color">
                        <i class="fill" style={{ color: toHex(s.markColor) }}>
                            circle
                        </i>
                        <span>Highlight color</span>
                        <input
                            type="color"
                            class="hidden-input"
                            value={toHex(s.markColor)}
                            onChange={(e) => saveSetting("markColor", e.currentTarget.value)}
                        />
                    </label>
                    <SwitchRow k="enableMarkWordsSK1" label="Only when using the hotkey">
                        <HotkeyInline sk="markWordsSK1" k="markWordsKey" />
                    </SwitchRow>
                </SwitchRow>

                <SwitchRow k="enableSelectionOnMouseMove" label="Automatically select the word underneath when moving the mouse">
                    <SwitchRow k="enableSelectionSK1" label="Need to hold the key">
                        <nav>
                            <KeySelect k="selectionSK1" />
                        </nav>
                    </SwitchRow>
                </SwitchRow>
            </article>

            {!isSidePal && (
                <article class="round">
                    <h6>Definition bubble</h6>
                    <SwitchRow
                        k="enablePlainLookup"
                        label="Show a floating definition bubble when you select a word (supports multiple languages)"
                    >
                        <SwitchRow
                            k="needDblclick"
                            label="Only trigger lookup when double-clicking a word"
                            hint="If off, selecting any word will show the definition bubble."
                        />
                        <SwitchRow k="enablePlainSK1" label="Need to hold the key to look up">
                            <nav>
                                <KeySelect k="plainSK1" />
                            </nav>
                        </SwitchRow>
                        <LookupLanguages />
                    </SwitchRow>
                </article>
            )}

            <article class="round">
                <h6>Dictionary window</h6>
                {!isSidePal && (
                    <SwitchRow k="enableMinidict" label="Automatically open the popup dict window to look up the selected word">
                        <SwitchRow k="enableMouseSK1" label="Need to hold the key">
                            <nav>
                                <KeySelect k="mouseSK1" />
                            </nav>
                        </SwitchRow>
                    </SwitchRow>
                )}
                {!isSidePal && (
                    <SwitchRow
                        k="enableAutoCloseMinidict"
                        label="Automatically close the popup dict window when focusing a normal window"
                    />
                )}
                {!isSidePal && <SwitchRow k="disableWikipediaCard" label="Disable the Wikipedia result in the popup dict window" />}
                <SwitchRow k="disableWordHistory" label="Disable word history" />
                <SwitchRow k="disableContextMenu" label="Disable the lookup item in the context menu" />
                {!s.disableContextMenu && (
                    <SwitchRow
                        k="enableMultiDictContextMenu"
                        label="Show all dictionaries in the context menu (hierarchical menu with dictionary options)"
                    />
                )}
                <SwitchRow
                    k="enableReadClipboard"
                    label="Enable reading the clipboard to get the selected word"
                    hint={s.readClipboardError}
                />
            </article>

            <article class="round">
                <h6>Don't run on these websites</h6>
                <p class="small-text muted">
                    This extension injects a script on web pages so that when you select a word or use the keyboard shortcut, it can
                    look up the word for you. But some websites may not be compatible with it. You can add the exceptions here, one
                    per line. Regex is supported.
                </p>
                <div class="field textarea border">
                    <textarea
                        rows="5"
                        value={s.excludedSites || ""}
                        onInput={(e) => saveExcludedSites(e.currentTarget.value)}
                    ></textarea>
                </div>
            </article>
        </>
    );
}

const aiLanguageNames = (() => {
    const names = Object.keys(allLangs).filter((l) => l !== "Chinese");
    return [...names, "Chinese (Simplified)", "Chinese (Traditional)"];
})();

export function ProSettings() {
    const s = setting.value;
    const saveAiLanguage = useMemo(() => debounce((v) => saveSetting("aiResponseLanguage", v), 500), []);

    return (
        <>
            <article class="round">
                <h6>
                    AI lookup{" "}
                    <HelpLink href="https://pnl.dev/topic/1048/dictionariez-v7-0-a-new-milestone-in-ai-powered-language-learning" />
                </h6>
                <div class="field border label suffix ai-language">
                    <input
                        list="ai-language-names"
                        placeholder=" "
                        value={s.aiResponseLanguage || ""}
                        onInput={(e) => {
                            updateSetting("aiResponseLanguage", e.currentTarget.value);
                            saveAiLanguage(e.currentTarget.value.trim());
                        }}
                    />
                    <label>Response language (English by default)</label>
                    {s.aiResponseLanguage && (
                        <i
                            class="front"
                            title="Reset to English"
                            onClick={() => {
                                saveAiLanguage.cancel();
                                saveSetting("aiResponseLanguage", "");
                            }}
                        >
                            close
                        </i>
                    )}
                    <datalist id="ai-language-names">
                        {aiLanguageNames.map((name) => (
                            <option value={name} />
                        ))}
                    </datalist>
                </div>
                <p class="small-text muted">
                    Language for AI definitions and examples. For example, if you're learning Swedish but prefer German
                    explanations, choose German here.
                </p>
            </article>

            <article class="round">
                <h6>Sentence/paragraph selection bubble</h6>
                <p class="small-text muted">Quick access to TTS and translation when selecting text.</p>
                <div class="row small-space wrap">
                    <span class="max">Show the bubble only when this key is pressed</span>
                    <KeySelect k="sentenceBubbleSK" options={[["", "None (always show)"], ...modifierKeys]} wide />
                </div>
                <SwitchRow
                    k="disableTTS"
                    label={
                        <>
                            Hide the Text-to-Speech (TTS) button in the popup bubble{" "}
                            <HelpLink href="https://pnl.dev/topic/1036/introducing-tts-pro-ai-powered-text-to-speech-comes-to-dictionariez-v6-3-0" />
                        </>
                    }
                />
                <SwitchRow
                    k="disableTranslator"
                    label={
                        <>
                            Hide the Translation button in the popup bubble{" "}
                            <HelpLink href="https://pnl.dev/topic/1041/introducing-translation-pro-instant-text-translation-in-dictionariez" />
                        </>
                    }
                />
                <SwitchRow
                    k="disableAIHelper"
                    label={
                        <>
                            Hide the Help-Me-Refine button in editable fields for selected text{" "}
                            <HelpLink href="https://pnl.dev/topic/952/introducing-help-me-refine-now-available-on-dictionariez-v5-4-0-enhance-your-writing-with-ai" />
                        </>
                    }
                />
            </article>
        </>
    );
}

const hotkeys = [
    { label: "Open the dict", sk1: "openSK1", sk2: "openSK2", key: "openKey" },
    { label: "Open the lookup history", sk1: "openOptionSK1", sk2: "openOptionSK2", key: "openOptionKey" },
    { label: "Look up in previous dictionary", sk1: "prevDictSK1", key: "prevDictKey", keys: allKeys },
    { label: "Look up in next dictionary", sk1: "nextDictSK1", key: "nextDictKey", keys: allKeys },
    { label: "Look up previous history word", sk1: "prevHistorySK1", key: "prevHistoryKey", keys: allKeys },
    { label: "Look up next history word", sk1: "nextHistorySK1", key: "nextHistoryKey", keys: allKeys },
];

export function Hotkeys() {
    return (
        <article class="round">
            <table class="hotkeys-table">
                <tbody>
                    {hotkeys.map(({ label, sk1, sk2, key, keys = letters }) => (
                        <tr>
                            <td>{label}</td>
                            <td>
                                <nav class="small-space wrap">
                                    <KeySelect k={sk1} />
                                    <span>+</span>
                                    {sk2 && (
                                        <>
                                            <KeySelect k={sk2} options={optionalModifierKeys} />
                                            <span>+</span>
                                        </>
                                    )}
                                    <KeySelect k={key} options={keys} />
                                </nav>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </article>
    );
}
