import utils from "utils";
import debounce from "lodash/debounce";
import { detectLanguage } from "../shared-readonly/detectLanguage.js";

export default () => {
    const handleSentenceSelected = async () => {
        const text = window.getSelection().toString().trim();
        if (!text || !utils.isSentence(text)) {
            return;
        }
        const lang = (await detectLanguage(text)) || localStorage.getItem("pnl-tts-lang-detected");
        if (lang) {
            localStorage.setItem("pnl-tts-lang-detected", lang);
        }
        window.postMessage({ command: "pnl-tts-play", text, lang }, window.location.origin);
    };
    window.addEventListener("mouseup", debounce(handleSentenceSelected, 100));
    window.addEventListener("touchend", debounce(handleSentenceSelected, 100));
};
