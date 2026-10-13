import { ui } from "beercss/dist/cdn/beer.min.js";
import "material-dynamic-colors";

const themeColor = "#2a6fdb"; // Ocean

export const themeModes = ["auto", "light", "dark"];

let currentMode = "auto";
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (currentMode === "auto") ui("mode", "auto");
});

export async function applyTheme(mode = "auto") {
    currentMode = mode;
    await ui("theme", themeColor);
    ui("mode", mode);
}
