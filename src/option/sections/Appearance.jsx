import { setting, saveSetting } from "../state.js";
import { applyTheme, defaultThemeColor } from "../theme.js";

const modes = [
    ["auto", "brightness_auto", "Auto"],
    ["light", "light_mode", "Light"],
    ["dark", "dark_mode", "Dark"],
];

const presets = [
    [defaultThemeColor, "Lavender"],
    ["#2a6fdb", "Ocean"],
    ["#00897b", "Teal"],
    ["#2e7d32", "Forest"],
    ["#e8710a", "Sunset"],
    ["#d81b60", "Rose"],
    ["#8d6e63", "Paper"],
];

export default function Appearance() {
    const mode = setting.value.themeMode || "auto";
    const color = setting.value.themeColor || defaultThemeColor;

    const change = (key, value) => {
        saveSetting(key, value, { silent: true });
        applyTheme(key === "themeMode" ? value : mode, key === "themeColor" ? value : color);
    };

    return (
        <article class="round">
            <h6>Mode</h6>
            <nav class="group connected">
                {modes.map(([value, icon, label]) => (
                    <button class={`${mode === value ? "active" : ""} border`} onClick={() => change("themeMode", value)}>
                        <i>{icon}</i>
                        <span>{label}</span>
                    </button>
                ))}
            </nav>

            <h6>Color</h6>
            <nav class="wrap">
                {presets.map(([value, label]) => (
                    <button
                        class="circle large theme-swatch"
                        style={{ backgroundColor: value }}
                        title={label}
                        aria-label={label}
                        onClick={() => change("themeColor", value)}
                    >
                        {color.toLowerCase() === value && <i style={{ color: "#fff" }}>check</i>}
                    </button>
                ))}
                <label class="button border" title="Pick any color">
                    <i>palette</i>
                    <span>Custom</span>
                    <input
                        type="color"
                        class="hidden-input"
                        value={color}
                        onChange={(e) => change("themeColor", e.currentTarget.value)}
                    />
                </label>
            </nav>
        </article>
    );
}
