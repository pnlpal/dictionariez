import utils from "utils";
import debounce from "lodash/debounce";
import { detectLanguage } from "../shared-readonly/detectLanguage.js";

export default () => {
    function isInPlayer(node) {
        while (node) {
            if (node.tagName === "PNL-TTS-PLAYER") {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    }
    const handleSentenceSelected = async (ev) => {
        const text = window.getSelection().toString().trim();
        if (!text || !utils.isSentence(text) || isInPlayer(ev.target)) {
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
