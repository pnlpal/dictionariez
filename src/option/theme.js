import { ui } from "beercss/dist/cdn/beer.min.js";
import "material-dynamic-colors";

// Beer generates the whole light and dark palette from this seed
const themeColor = process.env.PRODUCT === "Ordböcker" ? "#0058a3" : "#2a6fdb"; // Ikea-like deep blue : Ocean

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
