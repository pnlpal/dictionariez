import { useState } from "preact/hooks";
import allLangs from "../../resources/langs.json";

const langNames = Object.keys(allLangs);

const matches = (lang, term) => {
    if (!term) return true;
    const t = term.toLowerCase();
    if (lang.toLowerCase().includes(t)) return true;
    return (allLangs[lang].otherNames || []).some((name) => name.toLowerCase().includes(t));
};

// Multi-select of languages with search (also matching alternative names like "Mandarin").
// error: message shown under the field, which turns red while it's set
export default function LanguagePicker({ value = [], onChange, label = "Languages to look up", error }) {
    const [term, setTerm] = useState("");
    const [active, setActive] = useState(0);

    const results = langNames.filter((lang) => !value.includes(lang) && matches(lang, term.trim()));

    const add = (lang) => {
        onChange([...value, lang]);
        setTerm("");
        setActive(0);
    };
    const remove = (lang) => onChange(value.filter((l) => l !== lang));

    const onKeyDown = (e) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActive((i) => Math.min(i + 1, results.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActive((i) => Math.max(i - 1, 0));
        } else if (e.key === "Enter" && results[active]) {
            e.preventDefault();
            add(results[active]);
        } else if (e.key === "Backspace" && !term && value.length) {
            remove(value[value.length - 1]);
        }
    };

    return (
        <div>
            {value.length > 0 && (
                <nav class="wrap small-space">
                    {value.map((lang) => (
                        <button class="chip fill round" onClick={() => remove(lang)} title={`Remove ${lang}`}>
                            <span>{lang}</span>
                            <i class="small">close</i>
                        </button>
                    ))}
                </nav>
            )}
            <div class={`field border label prefix${error ? " invalid" : ""}`}>
                <i>translate</i>
                <input
                    type="text"
                    role="combobox"
                    aria-expanded="true"
                    aria-autocomplete="list"
                    value={term}
                    placeholder=" "
                    onInput={(e) => {
                        setTerm(e.currentTarget.value);
                        setActive(0);
                    }}
                    onKeyDown={onKeyDown}
                />
                <label>{label}</label>
                {error && <output class="invalid">{error}</output>}
                <menu role="listbox">
                    {results.map((lang, i) => (
                        <li
                            role="option"
                            aria-selected={i === active}
                            class={i === active ? "active" : ""}
                            // keep focus in the input so the menu stays open
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => add(lang)}
                        >
                            <span>{lang}</span>
                            {allLangs[lang].otherNames && (
                                <span class="small-text muted">{allLangs[lang].otherNames.join(", ")}</span>
                            )}
                        </li>
                    ))}
                    {!results.length && <li class="muted">No matching language</li>}
                </menu>
            </div>
        </div>
    );
}
