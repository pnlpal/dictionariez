import utils from "utils";
import debounce from "lodash/debounce";

const setupAudioListener = () => {
    $(document).on(
        "click mouseover",
        ".fairydict-pron-audio",
        debounce(
            (e) => {
                e.stopPropagation();

                if (utils.isMobile() && e.type === "mouseover") {
                    return; // on mobile mouseover will be triggered when click.
                }

                let synthesisObj = null;

                if ($(e.currentTarget).data("mp3")) {
                    utils.send("play audios", {
                        w: $(e.currentTarget).data("w"),
                        otherSrc: $(e.currentTarget).data("mp3"),
                        synthesis:
                            $(e.currentTarget).data("synthesis") ||
                            (e.currentTarget.classList.contains("fairydict-pron-audio-bre")
                                ? "en-GB"
                                : e.currentTarget.classList.contains("fairydict-pron-audio-ame")
                                ? "en-US"
                                : ""),
                    });
                } else if ($(e.currentTarget).data("synthesis")) {
                    synthesisObj = {
                        text: $(e.currentTarget).data("w"),
                        name: $(e.currentTarget).data("lang"),
                        lang: $(e.currentTarget).data("synthesis"),
                    };
                    utils.send("play audios", { synthesisObj });
                } else if ($(e.currentTarget).hasClass("for-chatgpt-audio")) {
                    synthesisObj = {
                        text: $(e.currentTarget).parent().text(),
                        lang: "en-US",
                    };
                    utils.send("play audios", { synthesisObj });
                }

                return false;
            },
            1000,
            { leading: true, trailing: false }
        )
    );
};

const wTpl = (w) => `<strong class='fairydict-w'> ${w} </strong>`;
const defTpl = (def) => `<span class='fairydict-def'> ${def} </span>`;
const defsTpl = (defs) => `<span class='fairydict-defs'> ${defs} </span>`;
const labelsTpl = (labels) => `<div class='fairydict-labels'> ${labels} </div>`;
const labelTpl = (label) => `<span class='fairydict-label'> ${label} </span>`;
const posTpl = (pos) => `<span class='fairydict-pos'> ${pos} </span>`;
const contentTpl = (content) => `<div class='fairydict-content'> ${content} </div>`;
const pronSymbolTpl = (symbol = "", type = "", lang = "") =>
    `<span class='fairydict-symbol fairydict-symbol-${type}' title='${lang}'> <em> ${symbol} </em> </span>`;
const pronAudioTpl = (w, src = "", type = "", synthesis = "", lang = "") =>
    `<a class='fairydict-pron-audio fairydict-pron-audio-${type}' data-mp3='${src}' data-synthesis='${synthesis}' data-lang='${lang}' data-w='${w}'><i class='icon-fairydict-volume'></i></a>`;
const pronsTpl = (w, prons) => `<div class='fairydict-prons'> ${w} ${prons} </div>`;
const sectionTitleTpl = (title) => `<div class='fairydict-section-title'>${title}</div>`;
const exampleTpl = (example, translation, lang) =>
    `<div class='fairydict-example'>
    <span class='fairydict-example-text pnl-tts-empowered' data-tts-lang='${lang}'>
        <span class="pnl-tts-icon">🔊</span>
        ${example}
    </span>${translation ? `<span class='fairydict-example-translation'> — ${translation}</span>` : ""}</div>`;
const synonymsTpl = (synonyms) => `<div class='fairydict-synonyms'><strong>Synonyms:</strong> ${synonyms}</div>`;
const otherFormsTpl = (forms) => `<em class='fairydict-other-forms'>${forms}</em>`;
const definitionTpl = (def) => `<div class='fairydict-definition'>${def}</div>`;
const toolbarTpl = () => `
<div class='fairydict-toolbar'>
    <button class='fairydict-toolbar-btn fairydict-btn-plain' title='Dictionary Lookup' data-action='plain'>📖</button>
    <button class='fairydict-toolbar-btn fairydict-btn-ai' title='AI Lookup' data-action='ai'>🤖</button>
    <button class='fairydict-toolbar-btn fairydict-btn-app-lookup' title='Look up in App' data-action='app-lookup'>📚</button>
    <button class='fairydict-toolbar-btn fairydict-btn-anki hidden-xss' title='Export to Anki' data-action='anki'>🗂️</button>
    <button class='fairydict-toolbar-btn fairydict-btn-options hidden-xss' title='Open Options' data-action='options'>⚙️</button>
    <button class='fairydict-toolbar-btn fairydict-btn-close' title='Close' data-action='close'>✕</button>
</div>`;

// Track current lookup state
let currentLookupData = {
    type: null, // 'plain' or 'ai'
    word: null,
    sentence: null,
    detectedLangInContext: null,
};

const genPlainResult = (res) => {
    let html = "";

    let wHtml = "";
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
                    {
                        symbol: "UK",
                        type: "bre",
                        synthesis: "en-GB",
                    },
                    {
                        symbol: "US",
                        type: "ame",
                        synthesis: "en-US",
                    },
                ].forEach((item) => {
                    pronHtml += pronSymbolTpl(item.symbol, item.type, "English");
                    pronHtml += pronAudioTpl(res.word, "", item.type, item.synthesis, "English");
                });
            } else if (res.language === "es") {
                // for Spanish Spanish and US Spanish
                [
                    {
                        symbol: "ES",
                        type: "es-es",
                        synthesis: "es-ES",
                    },
                    {
                        symbol: "US",
                        type: "es-us",
                        synthesis: "es-US",
                    },
                ].forEach((item) => {
                    pronHtml += pronSymbolTpl(item.symbol, item.type, "Spanish");
                    pronHtml += pronAudioTpl(res.word, "", item.type, item.synthesis, "Spanish");
                });
            } else if (res.language === "zh") {
                // for Mandarin and Cantonese
                [
                    {
                        symbol: "普",
                        type: "zh-cn",
                        synthesis: "zh-CN",
                    },
                    {
                        symbol: "粤",
                        type: "yue-hk",
                        synthesis: "zh-HK",
                    },
                    {
                        symbol: "台",
                        type: "zh-tw",
                        synthesis: "zh-TW",
                    },
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

    // Definition with part of speech at the beginning - clean and focused
    if (res?.definition) {
        let defContent = res.definition;
        // Add part of speech in brackets at the beginning of definition
        if (res?.partOfSpeech) {
            defContent = `${posTpl("(" + res.partOfSpeech + ")")} ${defContent}`;
        }
        bodyHtml += definitionTpl(defTpl(defContent));
    }

    // Most common meanings
    if (res?.mostCommonMeanings && res.mostCommonMeanings.length > 0) {
        bodyHtml += sectionTitleTpl("Other Common Meanings");
        const meaningsHtml = res.mostCommonMeanings.map((meaning) => defTpl(meaning)).join("<br>");
        bodyHtml += meaningsHtml;
    }

    if (bodyHtml) {
        html += `<div class='fairydict-ai-body'>${bodyHtml}</div>`;
    }

    // === FOOTER SECTION ===
    let footerHtml = "";

    // Synonyms
    if (res?.synonyms && res.synonyms.length > 0) {
        const synonymsText = res.synonyms.join(", ");
        footerHtml += synonymsTpl(synonymsText);
    }

    // Examples
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

const getEnglishPronAudio = async (w) => {
    const res = await utils.send("get real person voice", { w });
    if (res?.prons) {
        let ameSrc = "";
        let breSrc = "";
        function addPronAudio(item) {
            if ($(`.fairydict-pron-audio-${item.type}`).length) {
                $(`.fairydict-pron-audio-${item.type}`).attr("data-mp3", item.audio);
            } else {
                const audioEl = pronAudioTpl(w.replaceAll("·", ""), item.audio, item.type, item.synthesis, "English");
                const label_ = item.type === "ame" ? "US" : item.type === "bre" ? "UK" : item.type;
                const elWithLabel = `<em>${label_}</em>${audioEl}`;
                $(".fairydict-prons").append(elWithLabel);
            }
        }
        for (const item of res.prons) {
            addPronAudio(item);
            if (item.type === "ame") {
                ameSrc = item.audio;
            } else if (item.type === "bre") {
                breSrc = item.audio;
            }
        }
        utils.send("play audios", { ameSrc, breSrc, checkSetting: true });
    }
};

export default {
    $dictionariezTooltipContainer: null,
    init() {
        this.$dictionariezTooltipContainer = $("#dictionariez-tooltip-container").length
            ? $("#dictionariez-tooltip-container")
            : $("html");

        $(`
<div class="dictionaries-tooltip">
    ${toolbarTpl()}
    <div class="fairydict-spinner">
    <div class="fairydict-bounce1"></div>
    <div class="fairydict-bounce2"></div>
    <div class="fairydict-bounce3"></div>
    </div>
    <div class="dictionaries-tooltip-content">
    </div>
</div>
`).appendTo(this.$dictionariezTooltipContainer);

        setupAudioListener();
        this.setupToolbarListeners();
    },
    setupToolbarListeners() {
        const self = this;

        $(document).on("click", ".fairydict-toolbar-btn", function (e) {
            e.stopPropagation();
            const action = $(this).data("action");

            switch (action) {
                case "plain":
                    if (currentLookupData.type === "ai") {
                        // Switch from AI to plain lookup
                        self.show("", null);
                        utils.send(
                            "look up plain",
                            {
                                w: currentLookupData.word,
                                sentence: currentLookupData.sentence || "",
                                detectedLangInContext: currentLookupData.detectedLangInContext || "",
                            },
                            (res) => {
                                self.renderPlainResult(
                                    res,
                                    currentLookupData.word,
                                    currentLookupData.sentence,
                                    currentLookupData.detectedLangInContext
                                );
                            }
                        );
                    }
                    break;

                case "ai":
                    if (currentLookupData.type === "plain") {
                        // Switch from plain to AI lookup
                        self.show("", null);
                        utils
                            .send("look up in AI", {
                                word: currentLookupData.word,
                                sentence: currentLookupData.sentence || "",
                                detectedLangInContext: currentLookupData.detectedLangInContext || "",
                            })
                            .then((res) => {
                                if (res?.lookup) {
                                    self.renderAIResult(
                                        res.lookup,
                                        currentLookupData.word,
                                        currentLookupData.sentence,
                                        currentLookupData.detectedLangInContext
                                    );
                                }
                            });
                    }
                    break;

                case "app-lookup":
                    // Look up the word in the main app
                    if (currentLookupData.word) {
                        utils.send("open word in dictionary", { w: currentLookupData.word });
                        self.hide();
                    }
                    break;

                case "anki":
                    // Export to Anki
                    if (currentLookupData.word) {
                        utils.send("export to anki", {
                            word: currentLookupData.word,
                            sentence: currentLookupData.sentence,
                            data: currentLookupData.data,
                        });
                        // Show feedback
                        $(this).css("background", "#4a4");
                        setTimeout(() => {
                            $(this).css("background", "");
                        }, 500);
                    }
                    break;

                case "options":
                    // Open main Dictionariez app
                    utils.send("open options page");
                    self.hide();
                    break;

                case "close":
                    self.hide();
                    break;
            }
        });
    },
    setupPlainContentPosition(e) {
        const $el = $(".dictionaries-tooltip");
        let pageX, pageY;

        if (e.pageX && e.pageY) {
            pageX = e.pageX;
            pageY = e.pageY;
        } else {
            pageX = e.changedTouches ? e.changedTouches[0].pageX : 0;
            pageY = e.changedTouches ? e.changedTouches[0].pageY : 0;
        }

        const containerOffset = this.$dictionariezTooltipContainer.offset();
        if ($el.length && pageY) {
            let mousex =
                pageX -
                containerOffset.left +
                25 +
                (this.$dictionariezTooltipContainer.data("dictionariezTooltipOffsetLeft") || 0);
            let mousey =
                pageY -
                containerOffset.top +
                25 +
                (this.$dictionariezTooltipContainer.data("dictionariezTooltipOffsetTop") || 0);
            let top = mousey;
            let left = mousex;

            const rect = $("#dictionariez-tooltip-container").length
                ? $("#dictionariez-tooltip-container")[0].getBoundingClientRect()
                : window.document.scrollingElement.getBoundingClientRect();
            const domW = window.innerWidth - rect.left;
            const domH = window.innerHeight - rect.top;

            // Corresponding to the width set in inject.less
            const isOnSmallScreen = domW <= 550;
            const isOnMacbookAir = domW <= 1280;
            if (domH - top < 300) {
                top = top - 10;
            }
            if (domH - top < 30) {
                top = top - 100;
            }

            if (isOnSmallScreen) {
                $el.css({
                    top,
                    left: "10px",
                    right: "10px",
                    width: "auto", // override fixed width for small screens in inject.less
                });
            } else {
                if (isOnMacbookAir) {
                    if (domW - left < 590) {
                        left = domW - 590;
                    }
                } else {
                    // regular screen
                    if (domW - left < 690) {
                        left = domW - 690;
                    }
                }

                $el.css({
                    top,
                    left,
                });
            }
        }
    },
    show(htmlContent = "", e = null) {
        $(".dictionaries-tooltip").fadeIn("slow");
        if (htmlContent) {
            $(".dictionaries-tooltip").removeClass("loading");
            $(".dictionaries-tooltip .fairydict-spinner").hide();
            $(".dictionaries-tooltip .dictionaries-tooltip-content").append(htmlContent);
            $(".dictionaries-tooltip .fairydict-toolbar").addClass("showing");
        } else {
            $(".dictionaries-tooltip").addClass("loading");
            $(".dictionaries-tooltip .fairydict-spinner").show();
            $(".dictionaries-tooltip .dictionaries-tooltip-content").empty();
            $(".dictionaries-tooltip .fairydict-toolbar").removeClass("showing");

            if (e) {
                const clickInside = $(".dictionaries-tooltip").has(e.target).length;
                if (!clickInside) {
                    this.setupPlainContentPosition(e);
                }
            }
        }
    },
    hide() {
        $(".dictionaries-tooltip").fadeOut().hide();
    },
    renderPlainResult(res, word, sentence, detectedLangInContext) {
        let html = "";
        res = Array.isArray(res) ? res : [res];

        // Update current lookup data
        currentLookupData = {
            type: "plain",
            word: word,
            sentence: sentence,
            detectedLangInContext: detectedLangInContext,
        };

        for (const item of res) {
            html += genPlainResult(item);

            if (item?.prons?.length && item.w) {
                if (item.prons.some((v) => ["bre", "ame"].includes(v.type))) {
                    getEnglishPronAudio(item.w);
                }
            }
        }

        if (html) {
            this.show(html);
            // Update toolbar button states
            $(".fairydict-btn-plain").addClass("active");
            $(".fairydict-btn-ai").removeClass("active");
        } else {
            this.hide();
        }
        return html;
    },
    renderAIResult(res, word, sentence, detectedLangInContext) {
        const html = genAIResult(res);

        // Update current lookup data
        currentLookupData = {
            type: "ai",
            word,
            sentence,
            detectedLangInContext,
        };

        if (html) {
            this.show(html);
            // Update toolbar button states
            $(".fairydict-btn-ai").addClass("active");
            $(".fairydict-btn-plain").removeClass("active");
        } else {
            this.hide();
        }
        return html;
    },
};
