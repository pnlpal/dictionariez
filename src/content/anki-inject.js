import $ from "jquery";
import debounce from "lodash/debounce";
import utils from "utils";
import "./anki-inject.less";

let currentWordItem = null;

const triggerInput = (el) => {
    const event = new Event("input", { bubbles: true });
    el.dispatchEvent(event);
};

const getAnkiInfo = (ankiSavedWord, ankiSkippedWord) =>
    chrome.runtime.sendMessage(
        {
            type: "get anki info",
            ankiSavedWord,
            ankiSkippedWord,
        },
        async function (res) {
            if (!res?.wordItem) {
                currentWordItem = null;
                return;
            }

            await utils.checkInTime(() => $(".field").length, 5000);

            currentWordItem = res.wordItem;

            if (res.wordItem?.sentence) {
                $(".field:eq(0)").append(renderTTS(res.wordItem.sentence));
                $(".field:eq(0)").append(renderQuoteInfo(res.wordItem));
            }

            if (Array.isArray(res.lookupInfo)) {
                res.lookupInfo.forEach(renderLookupInfo(res.wordItem, res.followedWords));
            } else {
                renderLookupInfo(res.wordItem)(res.lookupInfo);
            }

            $(".field:eq(1)").append("<br><br>");

            triggerInput($(".field:eq(0)")[0]);
            triggerInput($(".field:eq(1)")[0]);

            $(".field:eq(0), .field:eq(1)").on(
                "input",
                debounce(
                    (e) =>
                        $("img", e.target).each(async function () {
                            const $img = $(this);
                            if ($img.attr("is-handling")) {
                                return;
                            }

                            if (this.style.visibility === "hidden") {
                                // Firefox will copy the hidden image esp from Google image search.
                                $img.remove();
                                return;
                            }

                            $img.attr("is-handling", true);
                            const src = $img.attr("src");
                            const imageInfo = await utils.send("image to data url", { src });
                            $img.replaceWith(renderImage(imageInfo));

                            triggerInput($(".field:eq(0)")[0]);
                            triggerInput($(".field:eq(1)")[0]);
                        }),
                    1000
                )
            );

            $(".field").on("click", ".dictionariez-anki-image-close", function (e) {
                this.parentElement.remove();
            });
        }
    );

const addSkipButton = async () => {
    await utils.checkInTime(() => $("button.btn-primary").length, 5000);
    const btn = `<button class="btn btn-secondary btn-skip mt-2" style="float: right">Skip</button>`;
    $(btn).insertAfter("button.btn-primary");

    $(".btn-skip").on("click", () => {
        $(".field:eq(0)").empty();
        $(".field:eq(1)").empty();
        getAnkiInfo(null, currentWordItem.w);
    });
};

const wordSavedCallback = async (ev) => {
    if (!ev.target.classList.contains("btn-primary")) {
        return;
    }
    if (!currentWordItem?.w) {
        return;
    }

    try {
        await utils.checkInTime(() => $(".field:eq(0)").text().trim() === "");

        getAnkiInfo(currentWordItem.w);
    } catch (error) {
        console.error(`Anki save failed on word: ${currentWordItem.w}`);
    }
};

function renderLookupInfo(wordItem, followedWords) {
    return function (lookupInfo) {
        if (lookupInfo?.images?.length) {
            $(".field:eq(0)").append(renderImages(lookupInfo.images));
        }

        if (lookupInfo?.w) {
            $(".field:eq(0)").append(renderLookupDefs(lookupInfo, followedWords));
            $(".field:eq(0)").append("<br>");

            $(".field:eq(1)").append(renderTTS(lookupInfo.w.replaceAll("·", "")));
            $(".field:eq(1)").append(renderLookupWords(wordItem, lookupInfo));
        }
    };
}

const replaceW = (text, w) =>
    text
        .replaceAll(w, "<span style='font-weight: bold'>[?]</span>")
        .replaceAll(utils.toUpperFirst(w), "<span style='font-weight: bold'>[?]</span>");

function renderTTS(s) {
    const sanitized = utils.sanitizeHTML(s);
    return `<tts service='android' voice='en-US' style='position: absolute; left: 9999px;'>${sanitized}</tts>`;
}

function renderQuoteInfo(res) {
    const sanitizedSentence = utils.sanitizeHTML(res.sentence);
    const filteredSentence = replaceW(sanitizedSentence, res.w);
    return `
<blockquote style="font-style:italic;font-size: 16px; padding: 0.3em 5px 0.3em 20px;border-left:5px solid #78C0A8;">
<span style="font-size: 16px;"> {sentence} </span>
<div style="margin-top: 5px;">-- <a href="{s}" style="font-size: 15px;"> {sc} </a></div>
</blockquote>
`
        .replace("{s}", res.s)
        .replace("{sc}", res.sc)
        .replace("{sentence}", filteredSentence);
}

function renderImage(image) {
    const dataImgTpl = `
<div class='dictionariez-anki-image-wrapper' contenteditable='false'>
	<div class='dictionariez-anki-image-close' style='display: none;'>X</div>
	<div style='max-width: 100%; max-height: 700px;
		content: url("{dataUrl}");
	' class='dictionariez-anki-image'>
	</div>
</div>
`;
    return dataImgTpl.replace("{dataUrl}", image.dataUrl);
}

function renderImages(images) {
    const imgs = images.map((cur, i) => {
        if (cur.dataUrl && i < 2) {
            // only display two images
            return renderImage(cur);
        }
        return "";
    });
    return `<div class='fairydict-images'> ${imgs.join("")} </div>`;
}

function renderLookupDefs(res, followedWords = []) {
    let pronHtml;
    const defTpl = (def) =>
        `<span class='fairydict-def' style='display: inline-flex;margin-bottom: 3px;'> ${def} </span>`;
    const defsTpl = (defs) =>
        `<span class='fairydict-defs' style='display: table-cell;padding-top: 1px;'> ${defs} </span>`;
    const labelsTpl = (labels) => `<div class='fairydict-labels' style='margin: 8px 0px;'> ${labels} </div>`;
    const labelTpl = (label) =>
        `<span class='fairydict-label' style='border: 1px solid;border-radius: 3px;padding: 1px 2px;margin-right: 3px;border-color: dimgray;'> ${label} </span>`;
    const posTpl = (pos) =>
        `<span class='fairydict-pos' style='display: table-cell;width: 40px;padding-top: 1px;'> ${pos} </span>`;
    const contentTpl = (content) =>
        `<div class='fairydict-content' style='font-size: 15px;line-height: 15px; padding: 0 5px; border-left:5px solid gold;'> ${content} </div>`;
    const pronSymbolTpl = (symbol = "", type = "") =>
        `<span class='fairydict-symbol fairydict-symbol-${type}'> <em> ${symbol} </em> </span>`;
    const pronAudioTpl = (w, src = "", type = "", synthesis = "") =>
        `<a class='fairydict-pron-audio fairydict-pron-audio-${type}' data-mp3='${src}' data-synthesis='${synthesis}' data-w='${w}'><i class='icon-fairydict-volume'></i></a>`;
    const pronsTpl = (prons) => `<div class='fairydict-prons' style='font-size: 15px;'> ${prons} </div>`;

    let html = "";

    if (res?.prons && res.w) {
        pronHtml = res.prons.reduce((prev, cur) => {
            if (cur.synthesis || cur.audio) {
                // prev += pronSymbolTpl(cur.symbol, cur.type)
                prev += pronAudioTpl(res.w.replaceAll("·", ""), cur.audio, cur.type, cur.synthesis);
            }
            return prev;
        }, "");

        if (res.prons[res.prons.length - 1]?.synthesis) {
            $(".field tts").attr("voice", res.prons[res.prons.length - 1].synthesis);
        }
    }

    if (pronHtml) {
        html += pronsTpl(pronHtml);
    }

    const renderDef = (def) => {
        if (def) {
            return defTpl(followedWords.reduce((res, fw) => res.replace(fw, "[?]"), def));
        }
    };

    const renderItem = (item) => {
        let posHtml = "";
        let defsHtml = "";
        let labelsHtml = "";

        if (item.pos) {
            posHtml = posTpl(item.pos);
        }
        const labelsCon = (item.labels || [])
            .map((name) => {
                if (name) {
                    return labelTpl(name);
                }
            })
            .reduce((prev, cur) => {
                if (cur) {
                    prev += cur;
                }
                return prev;
            }, "");
        if (labelsCon) {
            labelsHtml = labelsTpl(labelsCon);
        }

        const defs = Array.isArray(item.def) ? item.def : [item.def];
        const defsCon = defs
            .map((def, i) => {
                if (def) {
                    if (defs.length === 1) {
                        return renderDef(def);
                    } else {
                        return renderDef(`${i + 1}. ${def}`);
                    }
                }
                return "";
            })
            .reduce((prev, next) => {
                if (next) {
                    return prev + "<br>" + next;
                }
                return prev;
            });

        if (defsCon) {
            defsHtml = defsTpl(defsCon);
        }

        if (defsHtml) {
            return (html += contentTpl(posHtml + labelsHtml + defsHtml));
        }
    };

    if (res?.defs) {
        res.defs.forEach(renderItem);
    }
    if (res?.defs2) {
        res.defs2.forEach(renderItem);
    }

    return html;
}

function renderLookupWords(wordItem, res) {
    const wTpl = (w = "", w2 = "") =>
        `<strong class='fairydict-w' style='font-size: 20px;'> ${w} </strong> &nbsp; <span style='font-size: 13px;'>${w2}</span>`;
    const pronSymbolTpl = (symbol = "", type = "") =>
        `<span class='fairydict-symbol fairydict-symbol-${type}'> <em> ${symbol} </em> </span>`;
    const pronAudioTpl = (w, src = "", type = "", synthesis = "") =>
        `<a class='fairydict-pron-audio fairydict-pron-audio-${type}' data-mp3='${src}' data-synthesis='${synthesis}' data-w='${w}'><i class='icon-fairydict-volume'></i></a>`;
    const pronsTpl = (w, prons) => `<div class='fairydict-prons' style='font-size: 15px;'> ${w} ${prons} </div>`;

    // show w2 if the lookup word is different from the selected word.
    const w2 = wordItem.w === res.w ? "" : `[${wordItem.w}]`;
    let pronHtml = "";
    let wHtml = "";
    wHtml = wTpl(res.w, w2);

    if (res?.prons && res.w) {
        pronHtml = res.prons.reduce((prev, cur) => {
            if (cur.synthesis || cur.audio || cur.symbol) {
                if (cur.symbol) {
                    prev += pronSymbolTpl(cur.symbol, cur.type);
                }
                if (cur.synthesis || cur.audio) {
                    prev += pronAudioTpl(res.w.replaceAll("·", ""), cur.audio, cur.type, cur.synthesis);
                }
            }
            return prev;
        }, "");

        if (res.prons.every((v) => ["bre", "ame"].includes(v.type))) {
            getEnglishPronAudio(res.w);
        }
    }

    if (pronHtml || wHtml) {
        return pronsTpl(wHtml, pronHtml);
    }
}

async function getEnglishPronAudio(w) {
    const { prons } = await utils.send("get real person voice", { w });

    for (const item of prons) {
        if (item.type === "ame" && item.audio) {
            $(".field .fairydict-pron-audio-ame").attr("data-mp3", item.audio);
        }
        if (item.type === "bre" && item.audio) {
            $(".field .fairydict-pron-audio-bre").attr("data-mp3", item.audio);
        }
    }
}

export const initAnkiInjection = () => {
    if (["https://ankiweb.net", "https://ankiuser.net"].includes(location.origin) && location.pathname === "/add") {
        getAnkiInfo();
        addSkipButton();
        $("body")[0].addEventListener("click", wordSavedCallback, true);

        window.addEventListener("beforeunload", () =>
            utils.send("beforeunload anki window", {
                left: window.screenX,
                top: window.screenY,
                width: window.outerWidth,
                height: window.outerHeight,
            })
        );
    }
};
