import { ui } from "beercss/dist/cdn/beer.min.js";
import "material-dynamic-colors";

export const defaultThemeColor = "#6750a4"; // Material 3 baseline

let currentMode = "auto";
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (currentMode === "auto") ui("mode", "auto");
});

export async function applyTheme(mode = "auto", color = defaultThemeColor) {
    currentMode = mode;
    await ui("theme", color || defaultThemeColor);
    ui("mode", mode);
}
