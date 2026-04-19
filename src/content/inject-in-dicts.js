import { initOnLoadDynamicDict } from "./dynamic-dict-inject.js";
import "./inject-in-dicts.less";

window.isInDict = false;

async function waitForElement(selector, timeout = 10000) {
    const startTime = Date.now();
    return new Promise((resolve, reject) => {
        const checkExist = setInterval(() => {
            const element = document.querySelector(selector);
            if (element) {
                clearInterval(checkExist);
                resolve(element);
            }
            if (Date.now() - startTime > timeout) {
                clearInterval(checkExist);
                reject(new Error(`Element ${selector} not found within ${timeout}ms`));
            }
        }, 10);
    });
}

async function appendElementTo(selector, element) {
    try {
        const parent = await waitForElement(selector);
        parent.appendChild(element);
    } catch (error) {
        console.error(`Failed to append element to ${selector}:`, error);
    }
}

export default function injectInDicts(res) {
    if (res?.dictUrl && window.self === window.top) {
        // append to html rather than body.
        // some websites such as naver dict, may clear body when reload to another page.
        // But somehow for ChatGPT, it has to append to body.
        const iframe = document.createElement("iframe");
        iframe.id = "dictionaries-iframe";
        iframe.className = "dictionariez-iframe";
        iframe.src = res.dictUrl;

        if (location.href.includes("chatgpt.com")) {
            appendElementTo("body", iframe);
        } else {
            appendElementTo("html", iframe);
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
        require("./card-iframe.js");

        const comparedLoc = decodeURI(location.href).toLowerCase();
        if (res.word.split(/\s/).every((s) => comparedLoc.includes(s.toLowerCase()))) {
            const cardIframe = document.createElement("iframe");
            cardIframe.className = "dictionaries-card dictionaries-card-wiki";
            cardIframe.src = `${res.cardUrl}?sys=wiki`;
            cardIframe.style.display = "none";
            appendElementTo("body", cardIframe);
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
}
