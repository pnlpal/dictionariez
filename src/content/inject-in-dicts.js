import $ from "jquery";
import { initOnLoadDynamicDict } from "./dynamic-dict-inject.js";

window.isInDict = false;

if (!window.isInDict) {
    require("./inject.less");

    chrome.runtime.sendMessage(
        {
            type: "injected",
            origin: location.origin,
            url: location.href,
        },
        (res) => {
            if (res?.dictUrl && window.self === window.top) {
                // append to html rather than body.
                // some websites such as naver dict, may clear body when reload to another page.
                // But somehow for ChatGPT, it has to append to body.
                const iframeHtml = `<iframe id='dictionaries-iframe' class="dictionariez-iframe" src='${res.dictUrl}'> </iframe>`;
                if (location.href.includes("chatgpt.com")) {
                    $(iframeHtml).appendTo("body");
                } else {
                    $(iframeHtml).appendTo("html");
                }

                window.isInDict = true;
                initOnLoadDynamicDict({
                    word: res.word,
                    sentence: res.sentence,
                    languagePrompt: res.languagePrompt,
                    dict: res.dict,
                    isHelpMeRefine: res.isHelpMeRefine,
                });
            }

            if (res?.isInSidePanelDict) {
                window.isInDict = true;
                initOnLoadDynamicDict({
                    word: res.word,
                    sentence: res.sentence,
                    languagePrompt: res.languagePrompt,
                    dict: res.dict,
                    isHelpMeRefine: res.isHelpMeRefine,
                });
                window.top.postMessage({ type: "injectedInDict" }, "*");
            }

            if (res?.cardUrl && res.word && !location.host.includes("wikipedia.org") && window.self === window.top) {
                const comparedLoc = decodeURI(location.href).toLowerCase();
                if (res.word.split(/\s/).every((s) => comparedLoc.includes(s.toLowerCase()))) {
                    $(
                        `<iframe class='dictionaries-card dictionaries-card-wiki' src='${res.cardUrl}?sys=wiki' style='display: none;'> </iframe>`,
                    ).appendTo("body");
                }
            }

            if (window.isInDict && res.dict?.ttsHelperSelector) {
                document.querySelectorAll(res.dict.ttsHelperSelector).forEach((el) => {
                    el.classList.add("pnl-tts-helper");
                    if (el.lang) {
                        el.setAttribute("data-tts-lang", el.lang);
                    }
                });
            }
        },
    );
}
