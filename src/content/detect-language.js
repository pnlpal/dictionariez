import { detectLanguage } from "../shared-readonly/detectLanguage.js";

export default async (text, node = null) => {
    const lang = (await detectLanguage(text, node)) || localStorage.getItem("pnl-sentence-lang-detected");
    if (lang && node) {
        localStorage.setItem("pnl-sentence-lang-detected", lang);
        // console.log("Detected language:", lang);
    }
    return lang;
};
