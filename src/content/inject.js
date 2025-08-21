/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
import $ from "jquery";
import utils from "utils";
import debounce from "lodash/debounce";
import highlight from "./editable-highlight";

import "./card-iframe.js";
import "./pnlpal-inject.js";
import { initCaptionzInjection } from "./captionz-inject.js";
import { initYtbInjection } from "./ytb-inject.js";
import { initOnLoadDynamicDict } from "./dynamic-dict-inject.js";
import { initAnkiInjection } from "./anki-inject.js";
import initLookupParser from "./lookup-parser.js";
import { initClipboardReader } from "./read-clipboard.js";
import plainLookupTooltip from "./plain-lookup-tooltip.js";

import {
    getWordAtPoint,
    getWordFromSelection,
    getSentenceOfSelection,
    getSentenceFromAllFrames,
    checkEditable,
} from "./common-text-utils.js";

const setupStyles = function () {
    require("./inject.less");
    // Interesting: font url is embedded, for some websites' security setting font-src,
    // it might be forbidden to load the font url.
    // but after webpack build, it not a problem any more.
    return require("./inject-fontello.css");
};

const run = () => {
    if (process.env.PRODUCT !== "SidePal") {
        setupStyles();
        initYtbInjection();
        initCaptionzInjection();
        initLookupParser();
    }

    initAnkiInjection();
    initClipboardReader();

    let isInDict = false;

    chrome.runtime.sendMessage(
        {
            type: "injected",
            origin: location.origin,
            url: location.href,
        },
        function (res) {
            if (res?.dictUrl && window.self === window.top) {
                // append to html rather than body.
                // some websites such as naver dict, may clear body when reload to another page.
                // But somehow for ChatGPT, it has to append to body.
                if (location.href.includes("chatgpt.com")) {
                    $(`<iframe id='dictionaries-iframe' src='${res.dictUrl}'> </iframe>`).appendTo("body");
                } else {
                    $(`<iframe id='dictionaries-iframe' src='${res.dictUrl}'> </iframe>`).appendTo("html");
                }

                isInDict = true;
                initOnLoadDynamicDict({
                    word: res.word,
                    sentence: res.sentence,
                    dict: res.dict,
                    isHelpMeRefine: res.isHelpMeRefine,
                });
            }

            if (res?.isInSidePanelDict) {
                isInDict = true;
                initOnLoadDynamicDict({
                    word: res.word,
                    sentence: res.sentence,
                    dict: res.dict,
                    isHelpMeRefine: res.isHelpMeRefine,
                });
                window.top.postMessage({ type: "injectedInDict" }, "*");
            }

            if (res?.cardUrl && res.word && !location.host.includes("wikipedia.org") && window.self === window.top) {
                const comparedLoc = decodeURI(location.href).toLowerCase();
                if (res.word.split(/\s/).every((s) => comparedLoc.includes(s.toLowerCase()))) {
                    return $(
                        `<iframe class='dictionaries-card dictionaries-card-wiki' src='${res.cardUrl}?sys=wiki' style='display: none;'> </iframe>`
                    ).appendTo("body");
                }
            }
        }
    );

    return chrome.runtime.sendMessage(
        {
            type: "setting",
        },
        async function (setting) {
            const mouseMoveTimer = null;
            let plainQuerying = null;
            let lastAutoSelection = "";

            const checkExcludedSites = function () {
                for (var sitePattern of setting.excludedSites.split("\n")) {
                    if (sitePattern && location.href.match(new RegExp(sitePattern))) {
                        return true;
                    }
                }
                return false;
            };

            if (checkExcludedSites()) {
                return;
            }
            await utils.promisify($(document).ready);

            if (document.body?.isContentEditable) {
                // If the page is editable, such as blogger's editor, disable the injection.
                // See issue #45
                return;
            }

            if (process.env.PRODUCT !== "SidePal") {
                plainLookupTooltip.init();
            }

            if (setting.enableReadClipboard) {
                document.addEventListener(
                    "copy",
                    function () {
                        const sentence = getSentenceOfSelection();
                        return utils.send("copy event triggered", {
                            sentence,
                            s: location.href,
                            sc: document.title,
                        });
                    },
                    true
                );
            }

            $(document).mousemove(
                debounce(function (e) {
                    if ($(e.target).hasClass("dictionariez-w")) {
                        let w = $(e.target).data("w") || $(e.target).text();
                        w = w.trim();
                        if (w === plainQuerying) {
                            return;
                        }
                        if (!setting.enablePlainLookup) {
                            return;
                        }

                        plainLookupTooltip.showPlainContent(null, e);
                        plainQuerying = w;
                        return utils.send(
                            "look up plain",
                            {
                                w,
                            },
                            function (res) {
                                if (plainQuerying !== w) {
                                    return;
                                }
                                plainLookupTooltip.renderPlainResult(res);
                                return (plainQuerying = null);
                            }
                        );
                    } else {
                        if (setting.enableSelectionOnMouseMove) {
                            if (!setting.enableSelectionSK1 || utils.checkEventKey(e, setting.selectionSK1)) {
                                return handleSelectionWord(e);
                            }
                        }
                    }
                }, 200)
            );

            // 对 mouseup 事件做一个延时处理，
            // 	# 以避免取消选中后getSelection依然能获得文字。
            $(document).on(
                "mouseup",
                debounce((e) => handleMouseUp(e), 100)
            );
            $(document).on(
                "touchstart",
                debounce(async function (e) {
                    try {
                        await utils.checkInTime(() => window.getSelection()?.getRangeAt(0)?.toString(), 3000);
                        return handleMouseUp(e);
                    } catch (error) {}
                }, 800)
            );

            $(document).bind("keydown", function (event) {
                if (utils.checkEventKey(event, setting.openSK1, setting.openSK2, setting.openKey)) {
                    const w = getWordFromSelection();
                    const isInEditable = utils.isSentence(w) && checkEditable(event.target);
                    const sentence = getSentenceOfSelection();
                    chrome.runtime.sendMessage({
                        type: "look up",
                        means: "keyboard",
                        w,
                        s: location.href,
                        sc: document.title,
                        sentence,
                        isInEditable,
                    });
                }
                if (event.key === "Escape") {
                    plainLookupTooltip.hide();
                    plainQuerying = null;

                    if (isInDict) {
                        utils.sendToDict("keypress focus");
                    }
                }

                if (utils.checkEventKey(event, setting.openOptionSK1, setting.openOptionSK2, setting.openOptionKey)) {
                    utils.send("open options");
                    return false;
                }

                if (setting.markWords) {
                    if (
                        setting.enableMarkWordsSK1 &&
                        utils.checkEventKey(event, setting.markWordsSK1, null, setting.markWordsKey)
                    ) {
                        highlight(setting.markColor);
                    }
                }

                if (isInDict) {
                    if (utils.checkEventKey(event, setting.prevHistorySK1, null, setting.prevHistoryKey)) {
                        chrome.runtime.sendMessage({
                            type: "query",
                            previousWord: true,
                        });
                        return false;
                    }

                    if (utils.checkEventKey(event, setting.nextHistorySK1, null, setting.nextHistoryKey)) {
                        chrome.runtime.sendMessage({
                            type: "query",
                            nextWord: true,
                        });
                        return false;
                    }
                    if (utils.checkEventKey(event, setting.prevDictSK1, null, setting.prevDictKey)) {
                        chrome.runtime.sendMessage({
                            type: "query",
                            previousDict: true,
                        });
                        return false;
                    }
                    if (utils.checkEventKey(event, setting.nextDictSK1, null, setting.nextDictKey)) {
                        chrome.runtime.sendMessage({
                            type: "query",
                            nextDict: true,
                        });
                        return false;
                    }
                    if ((event.ctrlKey || event.metaKey) && event.key.match(/\d/)) {
                        chrome.runtime.sendMessage({
                            type: "query",
                            dictNumber: parseInt(event.key.match(/\d/)[0]),
                        });
                        return false;
                    }
                }
            });

            var handleSelectionWord = function (e) {
                const selObj = window.getSelection();
                if (checkEditable(selObj.focusNode)) {
                    return;
                }

                let word = selObj.toString().trim();

                // filter last auto selection word, let choose another word.
                if (word === lastAutoSelection) {
                    word = getWordAtPoint(e.target, e.clientX, e.clientY);
                    lastAutoSelection = word;
                } else {
                    lastAutoSelection = "";
                }

                if (word) {
                    return handleLookupByMouse(e, word);
                }
            };

            var handleMouseUp = function (event) {
                let text;
                if (isInDict) {
                    window.top.postMessage({ type: "toggleDropdown", open: false }, "*");
                }

                const selObj = window.getSelection();
                if (selObj.rangeCount > 0) {
                    text = selObj.getRangeAt(0)?.toString().trim();
                }
                if (!text) {
                    // click inside the dict
                    if ($(".dictionaries-tooltip").has(event.target).length) {
                        return;
                    }
                    if (plainQuerying) {
                        // if is querying, wait for the result.
                        return;
                    }

                    plainLookupTooltip.hide();
                    plainQuerying = null;
                    return;
                }

                // issue #4
                // check if mouse is at the same position of the selected text
                let including = $(event.target).has(selObj.focusNode).length || $(event.target).is(selObj.focusNode);
                // on Firefox, the focusNode might be exactly adjoining the click target.
                if (!including) {
                    including =
                        $(event.target).has(selObj.focusNode.previousElementSibling).length ||
                        $(event.target).is(selObj.focusNode.previousElementSibling);
                }
                if (!including) {
                    return;
                }

                // check if click in editable element
                if (checkEditable(selObj.focusNode)) {
                    return;
                }

                if (event.which === 0 || event.which === 1) {
                    // left mouse or touchend
                    return handleLookupByMouse(event, text);
                }
            };

            var handleLookupByMouse = debounce(
                async function (event, text) {
                    if (!text) {
                        return;
                    }
                    if (text === plainQuerying) {
                        return;
                    }
                    let sentence = "";
                    const markWordAfterward = function (lookupResult) {
                        // highlight selected words is a special feature
                        // even if the floating definition is turned off, still highlight can be working.
                        if (lookupResult && setting.markWords && !setting.enableMarkWordsSK1) {
                            return highlight(setting.markColor);
                        }
                    };

                    // popup window
                    if (!setting.enableMouseSK1 || (setting.mouseSK1 && utils.checkEventKey(event, setting.mouseSK1))) {
                        if (process.env.PRODUCT === "SidePal" || setting.enableMinidict) {
                            sentence = getSentenceOfSelection();
                            chrome.runtime.sendMessage(
                                {
                                    type: "look up",
                                    means: "mouse",
                                    sentence,
                                    w: text,
                                    s: location.href,
                                    sc: document.title,
                                    isInEditable: utils.isSentence(text) && checkEditable(event.target),
                                },
                                markWordAfterward
                            );
                        }
                    }

                    // floating definition
                    text = await utils.send("check text supported", { w: text });
                    if (!text) {
                        return;
                    }

                    if (setting.enablePlainLookup) {
                        if (!setting.enablePlainSK1 || utils.checkEventKey(event, setting.plainSK1)) {
                            let isOk;
                            plainLookupTooltip.showPlainContent(null, event);
                            plainQuerying = text;
                            if (!sentence) {
                                sentence = getSentenceOfSelection();
                            }
                            return (isOk = await utils.send(
                                "look up plain",
                                {
                                    means: "mouse",
                                    sentence,
                                    w: text,
                                    s: location.href,
                                    sc: document.title,
                                },
                                function (res) {
                                    if (plainQuerying !== text) {
                                        return;
                                    }
                                    plainLookupTooltip.renderPlainResult(res);
                                    plainQuerying = null;
                                    return markWordAfterward(res);
                                }
                            ));
                        }
                    }
                },
                500,
                { leading: true, trailing: false }
            );

            return utils.listenToBackground("get info before open dict", (request, sender, sendResponse) => {
                const word = getWordFromSelection(true);
                const isInEditable = utils.isSentence(word) && checkEditable(window.getSelection().focusNode);
                const sentence = getSentenceFromAllFrames();

                return sendResponse({
                    w: word,
                    s: location.href,
                    sc: document.title,
                    sentence,
                    isInEditable,
                    screen: {
                        width: screen.width,
                        height: screen.height,
                        availLeft: screen.availLeft,
                        availTop: screen.availTop,
                    },
                });
            });
        }
    );
};

if (!window.dictionariezInjected) {
    run();
    window.dictionariezInjected = true;
}
