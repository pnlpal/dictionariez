import utils from "utils";
import debounce from "lodash/debounce";
import { detectLanguage } from "../shared-readonly/detectLanguage.js";

export default () => {
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

        let endRect = endRange.getBoundingClientRect();

        // If the end rect is invalid (all zeros or very small), fall back to selection rect
        if (endRect.width === 0 && endRect.height === 0) {
            const selectionRect = range.getBoundingClientRect();

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
            } else {
                // Final fallback to selection rect
                endRect = {
                    right: selectionRect.right,
                    bottom: selectionRect.bottom,
                    left: selectionRect.right,
                    top: selectionRect.bottom,
                };
            }
        }

        // Calculate position at bottom right of the last line
        const x = endRect.right + window.scrollX;
        const y = endRect.bottom + window.scrollY;

        // Safety check - if position is still invalid, don't show bubble
        if (x <= 0 || y <= 0) {
            return;
        }

        const bubble = document.createElement("div");
        bubble.className = "pnl-sentence-selected-bubble";
        bubble.innerHTML = `
        <div class="pnl-tts-speaker" title="Read this sentence aloud by ${process.env.PRODUCT}">
            🔊
        </div>
        `;

        // Rest of your existing code...
        bubble.style.cssText = `
        position: absolute;
        left: ${x + 8}px;
        top: ${y + 8}px;
        background: #1a1a1a;
        color: white;
        padding: 8px 12px;
        border-radius: 0 8px 8px 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 999999;
        font-size: 16px;
        cursor: pointer;
        user-select: none;
        animation: pnl-bubble-fade-in 0.2s ease-out;
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
}
.pnl-tts-speaker {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 20px;
}
`;
            document.head.appendChild(style);
        }

        // Rest of your code...
        bubble.addEventListener("click", (e) => {
            e.stopPropagation();
            window.postMessage({ command: "pnl-tts-play", text, lang }, window.location.origin);
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
        if (
            !text ||
            !utils.isSentence(text) ||
            ev.target.closest("pnl-tts-player") ||
            ev.target.closest(".pnl-sentence-selected-bubble")
        ) {
            removeBubble();
            return;
        }

        const lang = (await detectLanguage(text)) || localStorage.getItem("pnl-sentence-lang-detected");
        if (lang) {
            localStorage.setItem("pnl-sentence-lang-detected", lang);
        }

        // Show TTS bubble
        createBubble(text, lang);
    };

    // Remove bubble when clicking elsewhere
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".pnl-sentence-selected-bubble")) {
            removeBubble();
        }
    });

    window.addEventListener("mouseup", debounce(handleSentenceSelected, 250));
    window.addEventListener("touchend", debounce(handleSentenceSelected, 250));
};
