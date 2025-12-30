import utils from "utils";
import debounce from "lodash/debounce";
import detectLanguage from "./detect-language.js";
import getTextFromNode from "../shared-readonly/getTextFromNode.js";
import { checkEditable } from "./common-text-utils.js";

export default (setting) => {
    if (setting.disableTTS && setting.disableTranslator && setting.disableAIHelper) {
        return;
    }

    let currentBubble = null;

    function createBubble(text, lang) {
        // Remove existing bubble
        removeBubble();

        const selection = window.getSelection();
        if (!selection.rangeCount) return;

        const range = selection.getRangeAt(0);

        // Try to get the end position first
        const endRange = document.createRange();
        endRange.setStart(range.endContainer, range.endOffset);
        endRange.setEnd(range.endContainer, range.endOffset);
        const selectionRect = range.getBoundingClientRect();

        let endRect = endRange.getBoundingClientRect();

        // If the end rect is invalid (all zeros or very small), fall back to selection rect
        if (endRect.width === 0 && endRect.height === 0) {
            // For multi-line selections, get the bottom-right of the last line
            const rects = range.getClientRects();
            if (rects.length > 0) {
                const lastRect = rects[rects.length - 1];
                endRect = {
                    right: lastRect.right,
                    bottom: lastRect.bottom,
                    left: lastRect.right,
                    top: lastRect.bottom,
                };
            } else if (selectionRect.right !== 0 || selectionRect.bottom !== 0) {
                // Final fallback to selection rect
                endRect = {
                    right: selectionRect.right,
                    bottom: selectionRect.bottom,
                    left: selectionRect.right,
                    top: selectionRect.bottom,
                };
            } else if (range.endContainer?.getBoundingClientRect) {
                endRect = range.endContainer.getBoundingClientRect();
            }
        }

        // Calculate position at bottom right of the last line
        const x = endRect.right + window.scrollX;
        const y = endRect.bottom + window.scrollY;
        let bubbleRight;

        // Safety check - if position is still invalid, don't show bubble
        if (x <= 0 || y <= 0) {
            return;
        }

        const viewportWidth = window.innerWidth;
        if (viewportWidth - x < 90) {
            bubbleRight = 20;
        }

        const ttsSpeakerHtml = setting.disableTTS
            ? ""
            : `<div class="pnl-tts-speaker" title="Read this sentence aloud by ${process.env.PRODUCT}">🔊</div>`;
        const translatorIconHtml = setting.disableTranslator
            ? ""
            : `<div class="pnl-translator-icon" title="Translate this text by ${process.env.PRODUCT}">🌐</div>`;

        const isInEditable = checkEditable(selection.focusNode);
        const dictIconHtml = setting.disableAIHelper
            ? ""
            : isInEditable
            ? `<div class="pnl-ai-helper-icon" title="Request AI dict to help me refine my writing by ${process.env.PRODUCT}">📚</div>`
            : "";

        if (!ttsSpeakerHtml && !translatorIconHtml && !dictIconHtml) {
            return;
        }

        const bubble = document.createElement("div");
        bubble.className = "pnl-sentence-selected-bubble";
        bubble.innerHTML = `
        ${ttsSpeakerHtml}
        ${translatorIconHtml}
        ${dictIconHtml}
        </div>
        `;

        // Rest of your existing code...
        bubble.style.cssText = `
        position: absolute;
        top: ${y + 16}px;
        ${bubbleRight ? `right: ${bubbleRight}px;` : `left: ${x + 8}px;`}
        background: #1a1a1a;
        color: white;
        padding: 8px 12px;
        border-radius: 0 8px 8px 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 2147483647;
        font-size: 16px;
        cursor: pointer;
        user-select: none;
        animation: pnl-bubble-fade-in 0.2s ease-out;
        display: flex;
        gap: 8px;
        align-items: center;
    `;

        // Update arrow position for right-aligned bubble
        if (!document.querySelector("#pnl-sentence-selected-styles")) {
            const style = document.createElement("style");
            style.id = "pnl-sentence-selected-styles";
            style.textContent = `
@keyframes pnl-bubble-fade-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
.pnl-sentence-selected-bubble {
    position: relative;
}
.pnl-sentence-selected-bubble:before {
    content: "";
    position: absolute;
    left: 0;
    top: -6px;
    border-bottom: 12px solid #1a1a1a;
    border-right: 12px solid transparent;
}
.pnl-sentence-selected-bubble:hover {
    background: #333 !important;
    transform: scale(1.05) !important;
    transition: all 0.2s ease;
}
.pnl-sentence-selected-bubble:hover:before {
    border-bottom-color: #333 !important;
    transition: all 0.2s ease;
}
.pnl-tts-speaker, .pnl-translator-icon, .pnl-ai-helper-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 20px;
    cursor: pointer;
    padding: 2px;
    border-radius: 4px;
    transition: background-color 0.2s ease;
}
.pnl-tts-speaker:hover, .pnl-translator-icon:hover, .pnl-ai-helper-icon:hover {
    background-color: rgba(255, 255, 255, 0.1);
}
`;
            document.head.appendChild(style);
        }

        const ttsIcon = bubble.querySelector(".pnl-tts-speaker");
        const translatorIcon = bubble.querySelector(".pnl-translator-icon");
        const dictIcon = bubble.querySelector(".pnl-ai-helper-icon");

        ttsIcon?.addEventListener("click", (e) => {
            e.stopPropagation();
            window.postMessage({ command: "pnl-tts-play", text, lang }, window.location.origin);
            removeBubble();
        });

        translatorIcon?.addEventListener("click", (e) => {
            e.stopPropagation();
            window.postMessage(
                {
                    command: "pnl-translate",
                    text,
                    lang,
                    selectionRect,
                    translatorSettings: setting.translatorSettings ? JSON.parse(setting.translatorSettings) : {},
                },
                window.location.origin
            );
            removeBubble();
        });
        dictIcon?.addEventListener("click", (e) => {
            e.stopPropagation();
            utils.send("look up", {
                type: "look up",
                w: text,
                s: location.href,
                sc: document.title,
                isInEditable,
            });
            removeBubble();
        });

        document.documentElement.appendChild(bubble);
        currentBubble = bubble;
    }

    function removeBubble() {
        if (currentBubble) {
            currentBubble.remove();
            currentBubble = null;
        }
    }

    const handleSentenceSelected = async (ev) => {
        const text = window.getSelection().toString().trim();
        if (!text || !utils.isSentence(text) || ev.target.closest("pnl-tts-player")) {
            removeBubble();
            return;
        }
        if (ev.target.closest(".pnl-sentence-selected-bubble")) {
            return; // Clicked inside the bubble, do nothing
        }

        // Only show bubble if SK key is pressed
        if (setting.sentenceBubbleSK && !utils.isOnlySKPressed(ev, setting.sentenceBubbleSK)) {
            removeBubble();
            return;
        }

        const lang = await detectLanguage(text, window.getSelection().focusNode);
        // Show TTS bubble
        createBubble(text, lang);
    };

    const injectSpeakerIconInElements = (selector) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el) => {
            if (el.classList.contains("pnl-tts-empowered")) {
                return; // Already has speaker icon
            }

            el.classList.add("pnl-tts-empowered");

            // Create a real speaker element instead of using pseudo-element
            const speakerIcon = document.createElement("span");
            speakerIcon.className = "pnl-tts-icon";
            speakerIcon.textContent = "🔊";
            speakerIcon.title = "Read this text aloud";

            // Insert at the beginning of the element
            el.insertBefore(speakerIcon, el.firstChild);
        });

        // Add the CSS for the speaker icon
        if (!document.querySelector("#pnl-tts-icon-styles")) {
            const style = document.createElement("style");
            style.id = "pnl-tts-icon-styles";
            style.textContent = `
            .pnl-tts-icon {
                opacity: 0.7;
                margin-right: 1px;
                cursor: pointer;
                user-select: none;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                font-size: 0.9em;
                transition: opacity 0.2s ease;
                vertical-align: middle;
            }
            .pnl-tts-empowered:hover .pnl-tts-icon {
                opacity: 1;
            }
            .pnl-tts-icon:hover {
                transform: scale(1.1);
                opacity: 1 !important;
            }
        `;
            document.head.appendChild(style);
        }

        // Listen to tts-icon click events globally (for dynamically added elements) (also for examples in AI lookup results)
        document.addEventListener("click", async (e) => {
            if (!e.target.classList.contains("pnl-tts-icon")) {
                return;
            }
            e.stopPropagation();
            e.preventDefault();

            const text = getTextFromNode(e.target.parentElement);
            if (!text) return;

            const lang = await detectLanguage(text, e.target.parentElement);
            window.postMessage({ command: "pnl-tts-play", text, lang }, window.location.origin);
        });
    };

    // Remove bubble when clicking elsewhere
    document.addEventListener("click", (ev) => {
        if (
            ev.target.classList.contains("pnl-sentence-selected-bubble") ||
            ev.target.closest(".pnl-sentence-selected-bubble")
        ) {
            return;
        }

        removeBubble();
    });

    window.addEventListener("mouseup", debounce(handleSentenceSelected, 250));
    window.addEventListener("touchend", debounce(handleSentenceSelected, 250));
    injectSpeakerIconInElements(".pnl-tts-helper");

    (() => {
        let skHasDown = false;
        const handleKeyDown = (ev) => {
            // Only respond to Ctrl key alone
            if (utils.isOnlySKPressed(ev, setting.sentenceBubbleSK)) {
                skHasDown = true;
            } else {
                skHasDown = false;
            }
        };

        // Show/hide bubble based on Ctrl key state
        const handleKeyUp = (ev) => {
            // Only respond to Ctrl key alone
            if (utils.isOnlySKPressed(ev, setting.sentenceBubbleSK) && skHasDown) {
                handleSentenceSelected(ev);
            } else if (ev.key === "Control" || ev.key === "a") {
                // Ctrl + A means select all, so if in editable, trigger the bubble
                const isInEditable = checkEditable(window.getSelection().focusNode);
                if (isInEditable) {
                    handleSentenceSelected(ev);
                } else {
                    removeBubble();
                }
            } else {
                removeBubble();
            }
        };
        window.addEventListener("keydown", debounce(handleKeyDown, 250));
        window.addEventListener("keyup", debounce(handleKeyUp, 250));
    })();
};
