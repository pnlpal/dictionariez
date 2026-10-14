import { useRef } from "preact/hooks";
import { setting, saveSetting, snackbar, closeToast } from "../state.js";

export function Snackbar() {
    const active = !!snackbar.value;
    // keep rendering the last toast while it animates out, so it hides where it was shown
    const last = useRef(null);
    if (active) last.current = snackbar.value;
    const s = last.current;
    return (
        <div
            class={`snackbar ${s?.position || "top"} ${s?.type || ""} ${active ? "active" : ""}`}
            onClick={() => active && !s?.actions && closeToast()}
        >
            <div class="max">{s?.message}</div>
            {s?.actions?.map(({ label, onClick }) => (
                <button
                    class="transparent small"
                    onClick={(e) => {
                        e.stopPropagation();
                        closeToast();
                        onClick?.();
                    }}
                >
                    {label}
                </button>
            ))}
        </div>
    );
}

// A setting switch with its description; children are rendered as indented sub-options.
export function SwitchRow({ k, label, hint, children, invert = false }) {
    const checked = invert ? !setting.value[k] : !!setting.value[k];
    return (
        <>
            <label class="row top-align setting-row medium-text">
                <span class="switch">
                    <input type="checkbox" checked={checked} onChange={(e) => saveSetting(k, invert !== e.currentTarget.checked)} />
                    <span></span>
                </span>
                <span class="max">
                    {label}
                    {hint && <div class="small-text muted">{hint}</div>}
                </span>
            </label>
            {children && checked && <div class="setting-indent">{children}</div>}
        </>
    );
}

// options: array of values or [value, label] pairs
export function Select({ value, options, onChange, label, className = "" }) {
    return (
        <div class={`field border small suffix ${label ? "label" : ""} ${className}`}>
            <select value={value ?? ""} onChange={(e) => onChange(e.currentTarget.value)}>
                {options.map((o) => {
                    const [v, text] = Array.isArray(o) ? o : [o, o];
                    return <option value={v}>{text}</option>;
                })}
            </select>
            {label && <label>{label}</label>}
            <i>arrow_drop_down</i>
        </div>
    );
}

export const modifierKeys = ["Ctrl", "Shift", "Alt", "Meta"];

// Select bound to a setting key
export function KeySelect({ k, options = modifierKeys, wide = false }) {
    return <Select className={`key-select ${wide ? "wide" : ""}`} value={setting.value[k]} options={options} onChange={(v) => saveSetting(k, v)} />;
}

export function Stars({ value = 0, max = 3, onChange }) {
    return (
        <nav class="no-space" title="Change rating">
            {Array.from({ length: max }, (_, i) => (
                <button class="transparent circle small no-margin" onClick={() => onChange(value === i + 1 ? 0 : i + 1)}>
                    <i class={i < value ? "fill amber-text" : "muted"}>star</i>
                </button>
            ))}
        </nav>
    );
}
