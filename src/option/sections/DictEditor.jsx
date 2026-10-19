import { useRef, useState } from "preact/hooks";
import { signal } from "@preact/signals";
import utils from "utils";
import { allDicts, loadDicts, bravo, pnlBase } from "../state.js";
import { isMobile } from "../nav.js";
import { Dialog, confirm } from "../components/Dialog.jsx";
import CodeArea from "../components/CodeArea.jsx";
import { formatCss, compactCss } from "../code.js";
import { FIELD_DOCS, PLACEHOLDERS, pick } from "./dictFieldDocs.jsx";

// { original }: the dict being edited, null for a new one
const editor = signal(null);

export const openDictEditor = (dict = null) => (editor.value = { original: dict });

const close = () => (editor.value = null);

const FIELDS = {
    static: {
        main: ["windowUrl", "css"],
        advanced: ["fixSpaceInWords", "ttsHelperSelector", "noAutoDarkMode", "noAdBlocker"],
    },
    dynamic: {
        main: [
            "windowUrl",
            "inputSelector",
            "isRichEditor",
            "submitButtonSelector",
            "prompt",
            "promptWithContext",
            "css",
        ],
        advanced: ["translationPrompt", "helpMeRefinePrompt", "ttsHelperSelector"],
    },
};
const ONLY_IN = {
    static: ["fixSpaceInWords", "noAutoDarkMode", "noAdBlocker"],
    dynamic: [
        "inputSelector",
        "submitButtonSelector",
        "isRichEditor",
        "prompt",
        "promptWithContext",
        "translationPrompt",
        "helpMeRefinePrompt",
    ],
};
const BOOLEAN_FIELDS = ["noAutoDarkMode", "noAdBlocker", "isRichEditor"];
const MULTILINE_FIELDS = ["prompt", "promptWithContext", "translationPrompt", "helpMeRefinePrompt"];
const CODE_FIELDS = ["inputSelector", "submitButtonSelector", "ttsHelperSelector"];
// kept by the background on edit, not something to edit or share
const INTERNAL_KEYS = ["sequence", "troveUrl", "homepageUrl", "queryText"];

// any dynamic-only field makes it dynamic, so pasting such a dict never drops those fields
const detectType = (dict) => (ONLY_IN.dynamic.some((k) => dict[k]) ? "dynamic" : "static");

// the old field names are still accepted, e.g. in dicts pasted from pnl.dev
const ALIASES = {
    name: "dictName",
    url: "windowUrl",
    chatgptPrompt: "prompt",
    chatgptPromptWithContext: "promptWithContext",
};

function normalize(dict) {
    const next = {};
    for (const [k, v] of Object.entries(dict || {})) {
        if (INTERNAL_KEYS.includes(k)) continue;
        const key = ALIASES[k] || k;
        if (!(key in next) || k === key) next[key] = v;
    }
    // shown formatted, stored on one line, see clean()
    if (typeof next.css === "string") next.css = formatCss(next.css);
    return next;
}

// Drops the other type's fields and empty values; known fields first, unknown ones are kept at the end
function clean(draft, type) {
    const order = ["dictName", ...Object.keys(FIELD_DOCS), ...Object.keys(draft)];
    const dict = {};
    for (const k of order) {
        if (k in dict || !(k in draft) || ONLY_IN[type === "static" ? "dynamic" : "static"].includes(k)) continue;
        const v = typeof draft[k] === "string" ? draft[k].trim() : draft[k];
        if (v === "" || v === false || v == null) continue;
        dict[k] = k === "css" && typeof v === "string" ? compactCss(v) : v;
    }
    return dict;
}

function validate(dict, type, original) {
    const errors = {};
    if (!dict.dictName) errors.dictName = "The name is required";
    else if (dict.dictName !== original?.dictName && allDicts.value.some((d) => d.dictName === dict.dictName)) {
        errors.dictName = "A dictionary with this name already exists";
    }
    if (!dict.windowUrl) errors.windowUrl = "The URL is required";
    if (type === "dynamic" && !dict.inputSelector) errors.inputSelector = "The input selector is required";
    return errors;
}

const toJson = (dict) => JSON.stringify(dict, null, 4);

function Placeholders() {
    return (
        <table class="small-text">
            <tbody>
                {PLACEHOLDERS.map(([p, desc]) => (
                    <tr>
                        <td class="min">
                            <code>{p}</code>
                        </td>
                        <td>{desc}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

function FieldDoc({ k, type }) {
    const d = FIELD_DOCS[k];
    return (
        <>
            <h6 class="small">{pick(d.label, type)}</h6>
            {d.doc}
            {d.placeholders && <Placeholders />}
            {d.example && (
                <>
                    <div class="small-text muted">Example</div>
                    <pre class="small-text">{d.example}</pre>
                </>
            )}
        </>
    );
}

function IntroDoc() {
    return (
        <>
            <h6 class="small">Make it your own</h6>
            <p>
                <b>Static</b> dicts open a search URL with the word in it, which works for most online dictionaries.
            </p>
            <p>
                <b>Dynamic</b> dicts open a page and type the word into its input box, for AI chats and sites whose URL
                doesn't change with the search.
            </p>
            <p>Click a field to see what it does here.</p>
            <p class="small-text muted">
                Changes to a built-in dictionary are undone by "Restore default". See also the{" "}
                <a
                    class="link"
                    href="https://github.com/pnlpal/dictionariez/blob/master/HOW-TO-ADD-A-DICT.md"
                    target="_blank"
                >
                    guide to adding dicts
                </a>
                .
            </p>
        </>
    );
}

function FieldReference({ type }) {
    return (
        <>
            <h6 class="small">Fields</h6>
            <table class="small-text">
                <tbody>
                    {Object.entries(FIELD_DOCS).map(([k, d]) => (
                        <tr>
                            <td class="min">
                                <code>{k}</code>
                            </td>
                            <td>{pick(d.helper, type)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h6 class="small">Placeholders in prompts</h6>
            <Placeholders />
        </>
    );
}

function Field({ k, type, value, onChange, error, warning, focused }) {
    const label = pick(FIELD_DOCS[k].label, type);
    const helper = pick(FIELD_DOCS[k].helper, type);
    // on narrow screens the docs of the focused field unfold right below it instead of in the side panel
    const inlineDoc = focused && (
        <article class="s m surface-container round">
            <FieldDoc k={k} type={type} />
        </article>
    );

    if (BOOLEAN_FIELDS.includes(k)) {
        return (
            <div data-field={k}>
                <label class="row top-align setting-row">
                    <span class="switch">
                        <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.currentTarget.checked)} />
                        <span></span>
                    </span>
                    <span class="max">
                        {label}
                        <div class="small-text muted">{helper}</div>
                    </span>
                </label>
                {inlineDoc}
            </div>
        );
    }

    if (k === "css") {
        return (
            <div data-field={k}>
                <CodeArea value={value} onChange={onChange} label={label} helper={helper} error={error} />
                {inlineDoc}
            </div>
        );
    }

    const multiline = MULTILINE_FIELDS.includes(k);
    const Input = multiline ? "textarea" : "input";
    return (
        <div data-field={k}>
            <div class={`field border label${multiline ? " textarea" : ""}${error ? " invalid" : ""}`}>
                <Input
                    type={multiline ? undefined : "text"}
                    class={CODE_FIELDS.includes(k) ? "code-input" : ""}
                    value={value ?? ""}
                    placeholder=" "
                    spellcheck={false}
                    onInput={(e) => onChange(e.currentTarget.value)}
                />
                <label>{label}</label>
                <output class="invalid">{error}</output>
                <output>{warning || helper}</output>
            </div>
            {inlineDoc}
        </div>
    );
}

function EditorBody({ original, cancelRef }) {
    const [draft, setDraft] = useState(() => normalize(original));
    const [type, setType] = useState(() => detectType(normalize(original)));
    const [tab, setTab] = useState("form");
    const [jsonText, setJsonText] = useState("");
    const [jsonError, setJsonError] = useState(null);
    const [errors, setErrors] = useState({});
    const [focused, setFocused] = useState(null);
    const [busy, setBusy] = useState(false);
    const [initial] = useState(() => toJson(clean(normalize(original), detectType(normalize(original)))));

    const set = (k, v) => {
        setDraft((d) => ({ ...d, [k]: v }));
        if (errors[k]) setErrors((e) => ({ ...e, [k]: null }));
    };

    // The JSON tab is the source of truth while it's open
    const parseJson = () => {
        try {
            const parsed = JSON.parse(jsonText);
            if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
                throw new Error("It should be a JSON object");
            return normalize(parsed);
        } catch (e) {
            setJsonError(`Invalid JSON: ${e.message}`);
            return null;
        }
    };

    const showJson = () => {
        setJsonText(toJson(clean(draft, type)));
        setJsonError(null);
        setTab("json");
    };

    const showForm = () => {
        const parsed = parseJson();
        if (!parsed) return;
        setDraft(parsed);
        setType(detectType(parsed));
        setErrors({});
        setTab("form");
    };

    // The dict to save or share, null when it has errors
    const build = () => {
        let source = draft;
        let t = type;
        if (tab === "json") {
            source = parseJson();
            if (!source) return null;
            t = detectType(source);
        }
        const dict = clean(source, t);
        const errs = validate(dict, t, original);
        if (Object.keys(errs).length) {
            if (tab === "json") setJsonError(Object.values(errs).join(". "));
            else setErrors(errs);
            return null;
        }
        return dict;
    };

    const save = async () => {
        const dict = build();
        if (!dict) return;
        setBusy(true);
        try {
            await utils.send("dictionary-add", { dict, replace: !!original, oldName: original?.dictName });
            await loadDicts();
            bravo();
            close();
        } catch (e) {
            const message = `Failed to save: ${e.message}`;
            if (tab === "json") setJsonError(message);
            else setErrors({ dictName: message });
        } finally {
            setBusy(false);
        }
    };

    const share = async () => {
        const dict = build();
        if (!dict) return;
        await utils.send("share dict", { dict });
        window.open(`${pnlBase}/compose?cid=4`, "_blank");
    };

    const cancel = async () => {
        const current = tab === "json" ? jsonText : toJson(clean(draft, type));
        if (current === initial || (await confirm("Discard your changes?", { confirmLabel: "Discard" }))) close();
    };
    // Escape goes through the same check
    cancelRef.current = cancel;

    const onFocusField = (e) => {
        const k = e.target.closest?.("[data-field]")?.dataset.field;
        if (k) setFocused(k);
    };

    const renderField = (k) => (
        <Field
            k={k}
            type={type}
            value={draft[k]}
            onChange={(v) => set(k, v)}
            error={errors[k]}
            warning={
                k === "windowUrl" && type === "static" && draft.windowUrl && !draft.windowUrl.includes("<word>")
                    ? "No <word> in the URL, the word won't be searched"
                    : null
            }
            focused={focused === k}
        />
    );

    const { main, advanced } = FIELDS[type];

    return (
        <>
            <nav>
                <h5 class="max">{original ? `Edit ${original.dictName}` : "New dictionary"}</h5>
                <button class="transparent circle" title="Close" onClick={cancel}>
                    <i>close</i>
                </button>
            </nav>
            <div class="tabs left-align">
                <a class={tab === "form" ? "active" : ""} onClick={() => tab !== "form" && showForm()}>
                    <i>edit_note</i>
                    <span>Form</span>
                </a>
                <a class={tab === "json" ? "active" : ""} onClick={() => tab !== "json" && showJson()}>
                    <i>data_object</i>
                    <span>JSON</span>
                </a>
            </div>

            <div class="dict-body">
                <div class="grid">
                    <div class="s12 l8">
                        {tab === "form" ? (
                            <div class="dict-form" onFocusIn={onFocusField} onClick={onFocusField}>
                                {renderField("dictName")}
                                <div class="row wrap small-space" data-field="type">
                                    <span>Type</span>
                                    <nav class="group connected">
                                        {[
                                            ["static", "link", "Static"],
                                            ["dynamic", "smart_toy", "Dynamic"],
                                        ].map(([t, icon, label]) => (
                                            <button
                                                class={`small ${t === type ? "active" : "border"}`}
                                                aria-pressed={t === type}
                                                onClick={() => {
                                                    setType(t);
                                                    setErrors({});
                                                    setFocused(null);
                                                }}
                                            >
                                                <i>{icon}</i>
                                                <span>{label}</span>
                                            </button>
                                        ))}
                                    </nav>
                                </div>
                                {main.map(renderField)}
                                <details open={advanced.some((k) => draft[k])}>
                                    <summary class="row small-space padding-block">
                                        <i>expand_more</i>
                                        <span>Advanced</span>
                                    </summary>
                                    {advanced.map(renderField)}
                                </details>
                            </div>
                        ) : (
                            <>
                                <CodeArea
                                    language="json"
                                    className="json-code"
                                    value={jsonText}
                                    onChange={(v) => {
                                        setJsonText(v);
                                        setJsonError(null);
                                    }}
                                    error={jsonError}
                                    helper="Paste a dict from pnl.dev, or edit the fields directly"
                                />
                                <details class="s m">
                                    <summary class="row small-space padding-block">
                                        <i>expand_more</i>
                                        <span>Field reference</span>
                                    </summary>
                                    <FieldReference type={type} />
                                </details>
                            </>
                        )}
                    </div>
                    <aside class="l l4 dict-help">
                        <article class="surface-container round">
                            {tab === "json" ? (
                                <FieldReference type={type} />
                            ) : focused && FIELD_DOCS[focused] ? (
                                <FieldDoc k={focused} type={type} />
                            ) : (
                                <IntroDoc />
                            )}
                        </article>
                    </aside>
                </div>
            </div>

            <nav class="dict-actions">
                <button
                    class="border"
                    onClick={share}
                    disabled={busy}
                    title="Share this dictionary with others at pnl.dev"
                >
                    <i>share</i>
                    <span class="m l">Share at pnl.dev</span>
                </button>
                <div class="max"></div>
                <button class="border" onClick={cancel} disabled={busy}>
                    Cancel
                </button>
                <button onClick={save} disabled={busy}>
                    {busy && <progress class="circle small"></progress>}
                    <span>Save</span>
                </button>
            </nav>
        </>
    );
}

export function DictEditorHost() {
    const state = editor.value;
    const cancelRef = useRef(close);
    return (
        <Dialog
            open={!!state}
            onClose={() => cancelRef.current()}
            className={`dict-editor ${isMobile.value ? "max" : "large"}`}
        >
            {state && <EditorBody original={state.original} cancelRef={cancelRef} />}
        </Dialog>
    );
}
