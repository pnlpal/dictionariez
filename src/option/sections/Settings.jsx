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
            <LanguagePicker value={enabled} onChange={save} label="Languages you're learning" />
            <p class="small-text muted">
                Words like "gift" exist in several languages (English, German, Swedish), so only words in these languages are
                looked up. See{" "}
                <a class="link" href="examples.html" target="_blank">
                    how it works
                </a>
                .
            </p>

            {enabled.includes("Chinese") && (
                <article class="border round">
                    <h6 class="small">Chinese</h6>
                    <SwitchRow
                        k="enableConvertCn2T"
                        label="Show definitions in Traditional Chinese"
                        hint="Japanese Kanji overlaps with Chinese, so remove Chinese above if you're learning Japanese."
                    />
                </article>
            )}

            {enabled.includes("English") && (
                <article class="border round">
                    <h6 class="small">English</h6>
                    <Select
                        className="key-select"
                        label="Definitions from"
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
                <SwitchRow k="markWords" label="Highlight words you look up" hint="Temporary, cleared when the page reloads.">
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
                    <SwitchRow
                        k="enableMarkWordsSK1"
                        label="Highlight manually with a hotkey instead"
                        inline={<HotkeyInline sk="markWordsSK1" k="markWordsKey" />}
                    />
                </SwitchRow>

                <SwitchRow k="enableSelectionOnMouseMove" label="Select the word under the cursor as you move the mouse">
                    <SwitchRow k="enableSelectionSK1" label="Only while holding this key" inline={<KeySelect k="selectionSK1" />} />
                </SwitchRow>
            </article>

            {!isSidePal && (
                <article class="round">
                    <h6>Definition bubble</h6>
                    <SwitchRow
                        k="enablePlainLookup"
                        label="Show a definition bubble when you select a word"
                    >
                        <SwitchRow
                            k="needDblclick"
                            label="Only on double-click"
                            hint="Otherwise, selecting any word shows the bubble."
                        />
                        <SwitchRow k="enablePlainSK1" label="Only while holding this key" inline={<KeySelect k="plainSK1" />} />
                        <LookupLanguages />
                    </SwitchRow>
                </article>
            )}

            <article class="round">
                <h6>Dictionary window</h6>
                {!isSidePal && (
                    <SwitchRow k="enableMinidict" label="Open the dictionary window when you select a word">
                        <SwitchRow k="enableMouseSK1" label="Only while holding this key" inline={<KeySelect k="mouseSK1" />} />
                    </SwitchRow>
                )}
                {!isSidePal && (
                    <SwitchRow
                        k="enableAutoCloseMinidict"
                        label="Close the dictionary window when you go back to the browser"
                    />
                )}
                {!isSidePal && <SwitchRow k="disableWikipediaCard" invert label="Show a Wikipedia card in the dictionary window" />}
                <SwitchRow k="disableWordHistory" invert label="Save looked-up words to History" />
                <SwitchRow k="disableContextMenu" invert label={'Add a "Look up" item to the right-click menu'} />
                {!s.disableContextMenu && (
                    <SwitchRow
                        k="enableMultiDictContextMenu"
                        label="List every dictionary in the right-click menu as a submenu"
                    />
                )}
                <SwitchRow
                    k="enableReadClipboard"
                    label="Look up words you copy"
                    hint={s.readClipboardError || "Also used when no selected text can be read."}
                />
            </article>

            <article class="round">
                <h6>Turn off on these websites</h6>
                <p class="small-text muted">
                    For sites that don't work well with {process.env.PRODUCT}. One per line, regex supported.
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
                    <span>Show the bubble only when this key is pressed</span>
                    <KeySelect k="sentenceBubbleSK" options={[["", "None (always show)"], ...modifierKeys]} />
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
