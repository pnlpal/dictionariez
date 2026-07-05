import utils from "utils";
import debounce from "lodash/debounce";
import getTextFromNode from "../shared-readonly/getTextFromNode.js";
import audioListener from "./audio-listener";
// Import styles from external CSS file (loaded as raw string for Shadow DOM injection)
import TOOLTIP_STYLES from "./plain-lookup-tooltip.css?raw";
import FONTELLO_STYLES from "./inject-fontello.css?raw";
import TTS_STYLES from "./tts.css?raw";

const pnlBase = process.env.NODE_ENV === "development" ? "http://localhost:4567" : "https://pnl.dev";

// Template functions (unchanged)
const wTpl = (w) => `<strong class='fairydict-w' dir='auto'> ${w} </strong>`;
const defTpl = (def) => `<span class='fairydict-def'> ${def} </span>`;
const defsTpl = (defs) => `<span class='fairydict-defs'> ${defs} </span>`;
const labelsTpl = (labels) => `<div class='fairydict-labels'> ${labels} </div>`;
const labelTpl = (label) => `<span class='fairydict-label'> ${label} </span>`;
const posTpl = (pos) => `<span class='fairydict-pos' dir='auto'> ${pos} </span>`;
const contentTpl = (content) => `<div class='fairydict-content'> ${content} </div>`;
const pronSymbolTpl = (symbol = "", type = "", lang = "") =>
    `<span class='fairydict-symbol fairydict-symbol-${type}' title='${lang}'> <em> ${symbol} </em> </span>`;
const pronAudioTpl = (w, src = "", type = "", synthesis = "", lang = "") =>
    `<a class='fairydict-pron-audio fairydict-pron-audio-${type}' data-mp3='${src}' data-synthesis='${synthesis}' data-lang='${lang}' data-w='${w}'><i class='icon-fairydict-volume'></i></a>`;
const pronsTpl = (w, prons) => `<div class='fairydict-prons'> ${w} ${prons} </div>`;
const sectionTitleTpl = (title) => `<div class='fairydict-section-title'>${title}</div>`;
const exampleTpl = (example, translation, lang) =>
    `<div class='fairydict-example' dir='auto'>
    <span class='fairydict-example-text pnl-tts-empowered' data-tts-lang='${lang}'>
        <span class="pnl-tts-icon">🔊</span>
        ${example}
    </span>${translation ? `<span class='fairydict-example-translation' dir='auto'> — ${translation}</span>` : ""}</div>`;
const synonymsTpl = (synonyms) =>
    `<div class='fairydict-synonyms'><strong>Synonyms:</strong> <span dir='auto'>${synonyms}</span></div>`;
const otherFormsTpl = (forms) => `<em class='fairydict-other-forms' dir='auto'>${forms}</em>`;
const escapeHtml = (text) =>
    String(text || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

// Convert a small subset of Markdown to HTML while preserving existing HTML.
const renderSimpleRichText = (text) => {
    if (!text && text !== 0) return "";
    let out = String(text);
    // bold **text**
    out = out.replace(/\*\*(.+?)\*\*/g, "<strong class='default-color'>$1</strong>");
    // italics *text*
    out = out.replace(/\*(.+?)\*/g, "<em>$1</em>");
    // simple unordered lists: lines starting with '- '
    const lines = out.split(/\r?\n/);
    let resultLines = [];
    let inList = false;
    for (const line of lines) {
        if (/^\s*-\s+/.test(line)) {
            if (!inList) {
                inList = true;
                resultLines.push('<ul class="fairydict-mini-list">');
            }
            const li = line.replace(/^\s*-\s+/, "");
            resultLines.push(`<li>${li}</li>`);
        } else {
            if (inList) {
                inList = false;
                resultLines.push("</ul>");
            }
            resultLines.push(line);
        }
    }
    if (inList) resultLines.push("</ul>");
    out = resultLines.join("<br>");
    // Preserve intentional paragraph/newline separation
    out = out.replace(/\n/g, "<br>");
    return out;
};
const followUpActionBtnTpl = (label) =>
    `<button class='fairydict-ai-followup-action-btn' data-action-key='${escapeHtml(label)}'>${escapeHtml(label)}</button>`;
const followUpActionsTpl = (actions) =>
    `<div class='fairydict-ai-followup-actions'>${actions.map(followUpActionBtnTpl).join("")}</div>`;
const followUpInputTpl = () =>
    `<div class='fairydict-ai-followup-input'>
        <input class='fairydict-ai-followup-question-input' type='text' placeholder='Ask a follow-up question...' autocomplete='off' />
        <button class='fairydict-ai-followup-send-btn'>Ask</button>
    </div>`;
const normalizeFollowUpAnswer = (item) => {
    if (!item) return { actionKey: "", followUpQuestion: "", answer: "" };
    if (typeof item === "string") {
        return { actionKey: "", followUpQuestion: "Follow-up", answer: item };
    }
    return {
        actionKey: item.actionKey || "",
        followUpQuestion: item.followUpQuestion || item.actionKey || "Follow-up",
        answer: item.answer || "",
    };
};
const followUpConversationEntryTpl = (item) => {
    const { actionKey, followUpQuestion, answer } = normalizeFollowUpAnswer(item);
    const userText = escapeHtml(followUpQuestion || actionKey || "Follow-up");
    const assistantHtml = renderSimpleRichText(answer || "");

    return `
        <div class='fairydict-ai-followup-conversation-entry'>
            <div class='fairydict-ai-followup-user-bubble' dir='auto'>${userText}</div>
            <div class='fairydict-ai-followup-assistant-bubble' dir='auto'>${assistantHtml}</div>
        </div>`;
};
const followUpPreviousAnswersTpl = (answers) =>
    `<div class='fairydict-ai-followup-previous-answers'>
        ${answers.map(followUpConversationEntryTpl).join("<hr class='fairydict-ai-followup-previous-answer-separator' />")}
    </div>`;
const definitionTpl = (def) => `<div class='fairydict-definition' dir='auto'>${def}</div>`;
const toolbarTpl = () => `
<div class='fairydict-toolbar'>
    <button class='fairydict-toolbar-btn fairydict-btn-plain' title='Dictionary Lookup' data-action='plain'>📖</button>
    <button class='fairydict-toolbar-btn fairydict-btn-ai' title='AI Lookup' data-action='ai'>🤖</button>
    <button class='fairydict-toolbar-btn fairydict-btn-app-lookup' title='Open other dictionaries' data-action='app-lookup'>📚</button>
    <button class='fairydict-toolbar-btn fairydict-btn-anki hidden-xss' title='Export to Anki' data-action='anki'>🗂️</button>
    <button class='fairydict-toolbar-btn fairydict-btn-options hidden-xss' title='Open Options' data-action='options'>⚙️</button>
    <button class='fairydict-toolbar-btn fairydict-btn-close' title='Close' data-action='close'>✕</button>
</div>`;

const genPlainResult = (res) => {
    let html = "";

    let wHtml = "";
    x;
    let pronHtml = "";
    if (res?.w) {
        wHtml = wTpl(res.w);

        if (res?.prons) {
            pronHtml = res.prons.reduce((prev, cur) => {
                if (cur.synthesis || cur.audio || cur.symbol) {
                    if (cur.symbol) prev += pronSymbolTpl(cur.symbol, cur.type, res.lang);
                    if (cur.synthesis || cur.audio)
                        prev += pronAudioTpl(res.w.replaceAll("·", ""), cur.audio, cur.type, cur.synthesis, res.lang);
                }
                return prev;
            }, "");
        }
    }

    if (pronHtml || wHtml) html += pronsTpl(wHtml, pronHtml);

    const renderItem = (item) => {
        let posHtml = "";
        let defsHtml = "";
        let labelsHtml = "";

        if (item.pos) posHtml = posTpl(item.pos);
        const labelsCon = (item.labels || [])
            .map((name) => (name ? labelTpl(name) : ""))
            .reduce((prev, cur) => (cur ? prev + cur : prev), "");
        if (labelsCon) labelsHtml = labelsTpl(labelsCon);
        const defs = Array.isArray(item.def) ? item.def : [item.def];
        const defsCon = defs
            .map((def, i) => (def ? (defs.length === 1 ? defTpl(def) : defTpl(`${i + 1}. ${def}`)) : ""))
            .reduce((prev, next) => (next ? prev + "<br>" + next : prev));
        if (defsCon) defsHtml = defsTpl(defsCon);

        if (defsHtml) html += contentTpl(posHtml + labelsHtml + defsHtml);
    };

    if (res?.defs) res.defs.forEach(renderItem);
    if (res?.defs2) res.defs2.forEach(renderItem);
    return html;
};

const genAIResult = (res) => {
    let html = "";

    // === HEADER SECTION ===
    let headerHtml = "";

    // Word and pronunciation
    let wHtml = "";
    let pronHtml = "";
    if (res?.word) {
        wHtml = wTpl(res.word);
        if (res?.pronunciation) {
            pronHtml = pronSymbolTpl(res.pronunciation, "", res.language || "");
        }
        if (res?.language) {
            if (res.language === "en") {
                [
                    { symbol: "UK", type: "bre", synthesis: "en-GB" },
                    { symbol: "US", type: "ame", synthesis: "en-US" },
                ].forEach((item) => {
                    pronHtml += pronSymbolTpl(item.symbol, item.type, "English");
                    pronHtml += pronAudioTpl(res.word, "", item.type, item.synthesis, "English");
                });
            } else if (res.language === "es") {
                [
                    { symbol: "ES", type: "es-es", synthesis: "es-ES" },
                    { symbol: "US", type: "es-us", synthesis: "es-US" },
                ].forEach((item) => {
                    pronHtml += pronSymbolTpl(item.symbol, item.type, "Spanish");
                    pronHtml += pronAudioTpl(res.word, "", item.type, item.synthesis, "Spanish");
                });
            } else if (res.language === "zh") {
                [
                    { symbol: "普", type: "zh-cn", synthesis: "zh-CN" },
                    { symbol: "粤", type: "yue-hk", synthesis: "zh-HK" },
                    { symbol: "台", type: "zh-tw", synthesis: "zh-TW" },
                ].forEach((item) => {
                    pronHtml += pronSymbolTpl(item.symbol, item.type, "Chinese");
                    pronHtml += pronAudioTpl(res.word, "", item.type, item.synthesis, "Chinese");
                });
            } else {
                pronHtml += pronAudioTpl(res.word, "", "", res.language);
            }
        }
    }
    if (pronHtml || wHtml) headerHtml += pronsTpl(wHtml, pronHtml);

    // Other forms
    if (res?.otherForms && res.otherForms.length > 0) {
        const formsHtml = res.otherForms.map((form) => `<span class='fairydict-form'>${form}</span>`).join(", ");
        headerHtml += otherFormsTpl(formsHtml);
    }

    if (headerHtml) {
        html += `<div class='fairydict-ai-header'>${headerHtml}</div>`;
    }

    // === BODY SECTION ===
    let bodyHtml = "";

    if (res?.definition) {
        let defContent = res.definition;
        if (res?.partOfSpeech) {
            defContent = `${posTpl("(" + res.partOfSpeech + ")")} ${defContent}`;
        }
        bodyHtml += definitionTpl(defTpl(renderSimpleRichText(defContent)));
    }

    if (res?.otherCommonMeanings && res.otherCommonMeanings.length > 0) {
        bodyHtml += sectionTitleTpl("Other Common Meanings");
        const meaningsHtml = res.otherCommonMeanings
            .map((meaning) => defTpl(renderSimpleRichText(meaning)))
            .join("<br>");
        bodyHtml += `<div dir='auto'>${meaningsHtml}</div>`;
    }

    if (bodyHtml) {
        html += `<div class='fairydict-ai-body'>${bodyHtml}</div>`;
    }

    // === FOOTER SECTION ===
    let footerHtml = "";

    if (res?.synonyms && res.synonyms.length > 0) {
        const synonymsText = res.synonyms.join(", ");
        footerHtml += synonymsTpl(synonymsText);
    }

    if (res?.examples && res.examples.length > 0) {
        footerHtml += sectionTitleTpl("Examples");
        const examplesHtml = res.examples.map((ex) => exampleTpl(ex.example, ex.translation, res.language)).join("");
        footerHtml += examplesHtml;
    }

    if (footerHtml) {
        html += `<div class='fairydict-ai-footer'>${footerHtml}</div>`;
    }

    return html;
};

const followUpPanelTpl = (availableActions = [], followUpAnswers = []) => {
    let html = "";
    if (availableActions.length > 0) {
        html += followUpActionsTpl(availableActions);
    }
    html += `<div class='fairydict-ai-followup-history'>`;
    if (Array.isArray(followUpAnswers) && followUpAnswers.length > 0) {
        html += followUpPreviousAnswersTpl(followUpAnswers);
    }
    html += `</div>`;
    html += `<div class='fairydict-ai-followup'>${followUpInputTpl()}</div>`;
    return html;
};

class DictionariezTooltip extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
        this.currentLookupData = {
            type: null,
            word: null,
            sentence: null,
            detectedLangInContext: null,
            previousAssistantAnswer: null,
        };
        this.containerElement = null;
        this.tooltipOffsetLeft = 0;
        this.tooltipOffsetTop = 0;
    }

    connectedCallback() {
        // Inject styles
        const fontelloStyleEl = document.createElement("style");
        fontelloStyleEl.textContent = FONTELLO_STYLES;
        this.shadow.appendChild(fontelloStyleEl);

        const styleEl = document.createElement("style");
        styleEl.textContent = TOOLTIP_STYLES;
        this.shadow.appendChild(styleEl);

        const ttsStyleEl = document.createElement("style");
        ttsStyleEl.textContent = TTS_STYLES;
        this.shadow.appendChild(ttsStyleEl);

        // Create tooltip structure
        const wrapper = document.createElement("div");
        wrapper.innerHTML = `
            <div class="dictionaries-tooltip" dir="auto">
                ${toolbarTpl()}
                <div class="fairydict-spinner">
                    <div class="fairydict-bounce1"></div>
                    <div class="fairydict-bounce2"></div>
                    <div class="fairydict-bounce3"></div>
                </div>
                <div class="dictionaries-tooltip-content" dir="auto"></div>
            </div>
        `;
        this.shadow.appendChild(wrapper.firstElementChild);
        this.setupEventListeners();
    }

    // Arrow function property to ensure it's defined during construction (Firefox compatibility)
    setupEventListeners = () => {
        audioListener(this.shadow);

        // Toolbar button handler and follow-up buttons
        this.shadow.addEventListener("click", (e) => {
            const followUpActionBtn = e.target.closest(".fairydict-ai-followup-action-btn");
            if (followUpActionBtn) {
                e.stopPropagation();
                const actionKey = followUpActionBtn.dataset.actionKey;
                const panel = this.shadow.querySelector(".fairydict-ai-followup");
                const input = panel?.querySelector(".fairydict-ai-followup-question-input");
                if (input) {
                    input.value = actionKey;
                }
                this.handleFollowUpRequest(actionKey, actionKey);
                return;
            }

            const followUpSendBtn = e.target.closest(".fairydict-ai-followup-send-btn");
            if (followUpSendBtn) {
                e.stopPropagation();
                const panel = this.shadow.querySelector(".fairydict-ai-followup");
                const input = panel?.querySelector(".fairydict-ai-followup-question-input");
                if (!input) return;
                this.handleFollowUpRequest(input.value.trim());
                return;
            }

            const btn = e.target.closest(".fairydict-toolbar-btn, .fairydict-switch-to-ai-btn");
            if (!btn) return;

            e.stopPropagation();
            const action = btn.dataset.action;

            switch (action) {
                case "plain":
                    if (this.currentLookupData.type === "ai") {
                        this.show("", null);
                        utils.send(
                            "look up plain",
                            {
                                w: this.currentLookupData.word,
                                sentence: this.currentLookupData.sentence || "",
                                detectedLangInContext: this.currentLookupData.detectedLangInContext || "",
                            },
                            (res) => {
                                this.renderPlainResult(
                                    res,
                                    this.currentLookupData.word,
                                    this.currentLookupData.sentence,
                                    this.currentLookupData.detectedLangInContext,
                                );
                            },
                        );
                        window.defaultClickLookup = "plain";
                        utils.send("save setting", { key: "defaultClickLookup", value: "plain" });
                    }
                    break;

                case "ai":
                    if (this.currentLookupData.type === "plain") {
                        this.show("", null);
                        utils
                            .send("look up in AI", {
                                word: this.currentLookupData.word,
                                sentence: this.currentLookupData.sentence || "",
                                detectedLangInContext: this.currentLookupData.detectedLangInContext || "",
                            })
                            .then((res) => {
                                this.renderAIResult(
                                    res,
                                    this.currentLookupData.word,
                                    this.currentLookupData.sentence,
                                    this.currentLookupData.detectedLangInContext,
                                );
                            })
                            .catch((err) => {
                                this.renderAIError(
                                    err,
                                    this.currentLookupData.word,
                                    this.currentLookupData.sentence,
                                    this.currentLookupData.detectedLangInContext,
                                );
                            });
                        window.defaultClickLookup = "ai";
                        utils.send("save setting", { key: "defaultClickLookup", value: "ai" });
                    }
                    break;

                case "app-lookup":
                    if (this.currentLookupData.word) {
                        utils.send("look up", {
                            w: this.currentLookupData.word,
                            sentence: this.currentLookupData.sentence,
                            detectedLangInContext: this.currentLookupData.detectedLangInContext,
                        });
                    }
                    break;

                case "anki":
                    if (this.currentLookupData.word) {
                        utils.send("open anki", {
                            w: this.currentLookupData.word,
                            detectedLangInContext: this.currentLookupData.detectedLangInContext,
                        });
                        btn.style.background = "#4a4";
                        setTimeout(() => {
                            btn.style.background = "";
                        }, 500);
                    }
                    break;

                case "options": {
                    const optionsTarget = this.currentLookupData.type === "ai" ? "pro-setting" : "function-setting";
                    utils.send("open options", { to: optionsTarget });
                    break;
                }

                case "close":
                    this.hide();
                    break;
            }
        });

        // Submit follow-up when Enter is pressed inside the follow-up input
        this.shadow.addEventListener("keydown", (e) => {
            const input =
                e.target && e.target.closest ? e.target.closest(".fairydict-ai-followup-question-input") : null;
            if (!input) return;
            if (e.key === "Enter") {
                e.preventDefault();
                e.stopPropagation();
                const val = input.value.trim();
                if (!val) return;
                this.handleFollowUpRequest(val);
            }
        });

        // Handle text selection within the tooltip for nested word lookup
        const handleWordLookupInTooltip = debounce(
            (e) => {
                // Get selection - works for shadow DOM in modern browsers
                const selection = window.getSelection();
                if (!selection || selection.rangeCount === 0) return;

                const selectedText = selection.toString().trim();
                if (!selectedText || selectedText.length > 100) return;

                // Don't trigger on single clicks without selection
                if (!selectedText) return;

                // Check if selection is within this webcomponent
                if (this !== e.target) return;

                // Don't re-lookup the same word we're already showing
                if (selectedText === this.currentLookupData.word) return;
                // Emit a custom event that the parent page can listen to
                this.dispatchEvent(
                    new CustomEvent("dictionariez-plain-lookup", {
                        bubbles: true,
                        composed: true, // crosses shadow DOM boundary
                        detail: {
                            word: selectedText,
                            selection: selection,
                        },
                    }),
                );
            },
            100,
            { leading: false, trailing: true },
        );

        // Listen for dblclick to trigger word lookup
        this.shadow.addEventListener("dblclick", handleWordLookupInTooltip);

        // Handle TTS icon clicks within shadow DOM (global listener can't reach inside shadow DOM)
        this.shadow.addEventListener("click", (e) => {
            if (!e.target.classList.contains("pnl-tts-icon")) {
                return;
            }
            e.stopPropagation();
            e.preventDefault();

            const parent = e.target.parentElement;
            if (!parent) return;

            // Get text content excluding the icon itself
            const text = getTextFromNode(parent);
            if (!text) return;

            const lang = parent.dataset.ttsLang || "";
            window.postMessage({ command: "pnl-tts-play", text, lang }, window.location.origin);
        });
    };

    handleFollowUpRequest = async (followUpQuestion, actionKey) => {
        if (!followUpQuestion || !followUpQuestion.trim()) {
            return;
        }

        const submitBtn = this.shadow.querySelector(".fairydict-ai-followup-send-btn");
        const answerEl = this.shadow.querySelector(".fairydict-ai-followup-answer");
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = "Asking...";
        }
        if (answerEl) {
            answerEl.innerHTML = "<em>Thinking...</em>";
        }

        try {
            const payload = {
                word: this.currentLookupData.word,
                sentence: this.currentLookupData.sentence,
                detectedLangInContext: this.currentLookupData.detectedLangInContext,
                previousAssistantAnswer: this.currentLookupData.previousAssistantAnswer,
                followUpQuestion,
                actionKey,
                pageTitle: document.title,
                pageUrl: window.location.href,
            };
            const response = await utils.send("ai follow up", payload);

            if (response?.answer) {
                this.currentLookupData.previousAssistantAnswer = response.answer;
                this.appendFollowUpConversationEntry(
                    {
                        actionKey,
                        followUpQuestion,
                        answer: response.answer,
                    },
                    true,
                );
            } else {
                this.appendFollowUpConversationEntry(
                    {
                        actionKey,
                        followUpQuestion,
                        answer: "No answer received.",
                    },
                    true,
                );
            }
        } catch (error) {
            const message = error?.message || "Follow-up request failed.";
            this.appendFollowUpConversationEntry(
                {
                    actionKey,
                    followUpQuestion,
                    answer: `Error: ${escapeHtml(message)}`,
                },
                true,
            );
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = "Ask";
            }
        }
    };

    appendFollowUpConversationEntry({ actionKey, followUpQuestion, answer } = {}, clearInput = false) {
        const historyContainer = this.shadow.querySelector(".fairydict-ai-followup-history");
        if (!historyContainer) return;
        const entryHtml = followUpConversationEntryTpl({ actionKey, followUpQuestion, answer });
        historyContainer.insertAdjacentHTML("beforeend", entryHtml);
        if (clearInput) {
            const input = this.shadow.querySelector(".fairydict-ai-followup-question-input");
            if (input) {
                input.value = "";
            }
        }
        const newEntry = historyContainer.lastElementChild;
        if (newEntry) {
            newEntry.scrollIntoView({ block: "nearest" });
        }
    }

    setContainerElement = (element) => {
        this.containerElement = element;
    };

    setOffsets = (left, top) => {
        this.tooltipOffsetLeft = left || 0;
        this.tooltipOffsetTop = top || 0;
    };

    setupPlainContentPosition = (e) => {
        const tooltip = this.shadow.querySelector(".dictionaries-tooltip");
        let pageX, pageY;

        if (e.pageX && e.pageY) {
            pageX = e.pageX;
            pageY = e.pageY;
        } else {
            pageX = e.changedTouches ? e.changedTouches[0].pageX : 0;
            pageY = e.changedTouches ? e.changedTouches[0].pageY : 0;
        }

        const containerEl = this.containerElement || document.documentElement;
        const containerRect = containerEl.getBoundingClientRect();
        const containerOffset = {
            left: containerRect.left + window.scrollX,
            top: containerRect.top + window.scrollY,
        };

        if (tooltip && pageY) {
            let mousex = pageX - containerOffset.left + 25 + this.tooltipOffsetLeft;
            let mousey = pageY - containerOffset.top + 25 + this.tooltipOffsetTop;
            let top = mousey;
            let left = mousex;

            const rect = this.containerElement
                ? this.containerElement.getBoundingClientRect()
                : document.scrollingElement.getBoundingClientRect();
            const domW = window.innerWidth - rect.left;
            const domH = window.innerHeight - rect.top;

            const isOnSmallScreen = domW <= 700;
            const isOnMacbookAir = domW <= 1280;

            if (domH - top < 300) {
                top = top - 10;
            }
            if (domH - top < 30) {
                top = top - 100;
            }

            // Position the host element
            if (isOnSmallScreen) {
                this.style.top = `${top}px`;
                this.style.left = "10px";
                this.style.right = "10px";
                tooltip.style.width = "auto";
            } else {
                if (isOnMacbookAir) {
                    if (domW - left < 590) {
                        left = domW - 590;
                    }
                } else {
                    if (domW - left < 690) {
                        left = domW - 690;
                    }
                }

                this.style.top = `${top}px`;
                this.style.left = `${left}px`;
                this.style.right = "";
            }
        }
    };

    show = (htmlContent = "", e = null) => {
        const tooltip = this.shadow.querySelector(".dictionaries-tooltip");
        const spinner = this.shadow.querySelector(".fairydict-spinner");
        const content = this.shadow.querySelector(".dictionaries-tooltip-content");
        const toolbar = this.shadow.querySelector(".fairydict-toolbar");

        const clickInside = e && e.target && this.shadow.contains(e.target);

        tooltip.classList.add("visible");

        if (htmlContent) {
            tooltip.classList.remove("loading");
            spinner.style.display = "none";
            content.innerHTML = htmlContent;
            toolbar.classList.add("showing");
        } else {
            tooltip.classList.add("loading");
            spinner.style.display = "";
            content.innerHTML = "";
            toolbar.classList.remove("showing");

            if (e && !clickInside) {
                this.setupPlainContentPosition(e);
            }
        }
    };

    hide = () => {
        const tooltip = this.shadow.querySelector(".dictionaries-tooltip");
        tooltip.classList.remove("visible");
    };

    renderPlainResult = (res, word, sentence, detectedLangInContext) => {
        let html = "";
        res = Array.isArray(res) ? res : [res];

        this.currentLookupData = {
            type: "plain",
            word: word,
            sentence: sentence,
            detectedLangInContext: detectedLangInContext,
        };

        for (const item of res) {
            html += genPlainResult(item);
        }

        const plainBtn = this.shadow.querySelector(".fairydict-btn-plain");
        const aiBtn = this.shadow.querySelector(".fairydict-btn-ai");
        if (plainBtn) plainBtn.classList.add("active");
        if (aiBtn) aiBtn.classList.remove("active");

        if (html) {
            this.show(html);
        } else {
            html = `<div class='fairydict-no-result'>
                <p>😕 No quick result found for "${word}"</p>
                <p>Try <button class='fairydict-switch-to-ai-btn' data-action="ai">🤖 AI Lookup</button> for a better explanation</p>
            </div>`;
            this.show(html);
        }
        return html;
    };

    renderAIResult = (res, word, sentence, detectedLangInContext) => {
        const { lookup, trialsUsed, trialsMaxAllowed, isProUser } = res;

        this.currentLookupData = {
            type: "ai",
            word,
            sentence,
            detectedLangInContext,
        };

        const html = genAIResult(lookup);

        if (html) {
            let finalHtml = html;
            if (!isProUser && trialsUsed !== undefined && trialsMaxAllowed !== undefined) {
                const upgradeUrl = `${pnlBase}/pro`;
                finalHtml += `<div class='fairydict-trial-info'>Trial usage: ${trialsUsed}/${trialsMaxAllowed} — <a href='${upgradeUrl}' target='_blank'>Upgrade to Pro</a></div>`;
            }
            const followUpAnswers = Array.isArray(res.followUpAnswers)
                ? res.followUpAnswers
                : Array.isArray(res.anwsers)
                  ? res.anwsers
                  : [];
            finalHtml += followUpPanelTpl(res?.availableActions || [], followUpAnswers);
            this.currentLookupData.previousAssistantAnswer =
                followUpAnswers.length > 0 ? followUpAnswers[followUpAnswers.length - 1] : lookup.definition || null;
            this.show(finalHtml);

            const plainBtn = this.shadow.querySelector(".fairydict-btn-plain");
            const aiBtn = this.shadow.querySelector(".fairydict-btn-ai");
            if (aiBtn) aiBtn.classList.add("active");
            if (plainBtn) plainBtn.classList.remove("active");

            return finalHtml;
        } else {
            return this.renderAIError(
                new Error("No AI result, please try again later."),
                word,
                sentence,
                detectedLangInContext,
            );
        }
    };

    renderAIError = (error, word, sentence, detectedLangInContext) => {
        this.currentLookupData = {
            type: "ai",
            word,
            sentence,
            detectedLangInContext,
            previousAssistantAnswer: null,
        };
        error = error || new Error("Unknown error");

        const getPrettyMessage = (msg) => {
            if (!msg) return "";
            const lowermsg = msg.toLowerCase();

            if (
                lowermsg.includes("failed to fetch") ||
                lowermsg.includes("networkerror") ||
                lowermsg.includes("network error") ||
                lowermsg.includes("fetch failed")
            ) {
                return "Network error or server is unreachable. Please try again later.";
            }
            if (lowermsg.includes("timeout")) {
                return "The request timed out. Please check your internet connection and try again.";
            }
            if (lowermsg.includes("forbidden")) {
                return "You do not have permission to access this resource.";
            }
            if (lowermsg.includes("internal server error")) {
                return "Server encountered an error. Please try again later.";
            }
            return msg;
        };

        const errorMsg = getPrettyMessage(error.message || error.status?.message || String(error));

        let html = "";
        if (errorMsg === "Unauthorized" || error.statusCode === 401) {
            const loginUrl = `${pnlBase}/login`;
            html = `<div class='fairydict-ai-error'>
                <p class='error-icon'>🔒</p>
                <p class='error-title'>Login Required</p>
                <p class='error-message'>Please log in to use AI Lookup feature.</p>
                <div class='fairydict-error-actions'>
                    <a href='${loginUrl}' target='_blank' class='fairydict-error-btn'>Log In</a>
                    <a href='https://pnl.dev/topic/1048/dictionariez-v7-0-a-new-milestone-in-ai-powered-language-learning' target='_blank' class='fairydict-error-link'>What is this?</a>
                </div>
            </div>`;
        } else if (error.type === "trial-limit-reached") {
            const upgradeUrl = `${pnlBase}/pro`;
            const { trialsUsed, trialsMaxAllowed } = error;
            html = `<div class='fairydict-ai-error'>
                <p class='error-icon'>⚡</p>
                <p class='error-title'>Trial Limit Reached</p>
                <p class='error-message'>You've used (${trialsUsed}/${trialsMaxAllowed}) free AI lookups. Upgrade to PNL Pro for unlimited access.</p>
                <a href='${upgradeUrl}' target='_blank' class='fairydict-error-btn'>Upgrade to Pro</a>
            </div>`;
        } else {
            html = `<div class='fairydict-ai-error'>
                <p class='error-icon'>⚠️</p>
                <p class='error-title'>AI Lookup Failed</p>
                <p class='error-message'>${errorMsg}</p>
            </div>`;
        }

        this.show(html);

        const plainBtn = this.shadow.querySelector(".fairydict-btn-plain");
        const aiBtn = this.shadow.querySelector(".fairydict-btn-ai");
        if (aiBtn) aiBtn.classList.add("active");
        if (plainBtn) plainBtn.classList.remove("active");

        return html;
    };
}

// Register the custom element
if (!customElements.get("dictionariez-tooltip")) {
    customElements.define("dictionariez-tooltip", DictionariezTooltip);
}

// Factory function for creating/getting the tooltip instance
export function createTooltip(containerElement = null) {
    let tooltip = document.querySelector("dictionariez-tooltip");
    if (!tooltip) {
        tooltip = document.createElement("dictionariez-tooltip");
        const parent = containerElement || document.documentElement;
        parent.appendChild(tooltip);
    }
    return tooltip;
}

// Export a compatibility layer that matches the old API
export default {
    _tooltip: null,
    _containerElement: null,

    init() {
        const container = document.getElementById("dictionariez-tooltip-container") || document.documentElement;
        this._containerElement = container;
        this._tooltip = createTooltip(container);

        // Handle offsets from container data attributes
        if (container.dataset) {
            this._tooltip.setOffsets(
                parseInt(container.dataset.dictionariezTooltipOffsetLeft) || 0,
                parseInt(container.dataset.dictionariezTooltipOffsetTop) || 0,
            );
        }
        this._tooltip.setContainerElement(container);
    },

    show(htmlContent = "", e = null) {
        if (!this._tooltip) {
            this.init();
        }
        this._tooltip.show(htmlContent, e);
    },

    hide() {
        if (this._tooltip) {
            this._tooltip.hide();
        }
    },

    renderPlainResult(res, word, sentence, detectedLangInContext) {
        if (!this._tooltip) {
            this.init();
        }
        return this._tooltip.renderPlainResult(res, word, sentence, detectedLangInContext);
    },

    renderAIResult(res, word, sentence, detectedLangInContext) {
        if (!this._tooltip) {
            this.init();
        }
        return this._tooltip.renderAIResult(res, word, sentence, detectedLangInContext);
    },

    renderAIError(error, word, sentence, detectedLangInContext) {
        if (!this._tooltip) {
            this.init();
        }

        return this._tooltip.renderAIError(error, word, sentence, detectedLangInContext);
    },
};
