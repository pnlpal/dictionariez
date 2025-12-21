import utils from "utils";

async function doQuery(w, sentence, languagePrompt, dict, isHelpMeRefine) {
    if (!w || !dict.inputSelector) return;
    if (w === localStorage.lastWord && (sentence || "") === localStorage.lastSentence) {
        return;
    }

    localStorage.lastWord = w;
    localStorage.lastSentence = sentence || "";

    await utils.checkInTime(() => document.querySelector(dict.inputSelector));

    const couldBeAIDict = dict.chatgptPrompt || dict.prompt;
    const helpMeRefinePrompt =
        dict.helpMeRefinePrompt ||
        'Please help me refine the text to make it clearer, more concise, correct any grammatical errors, and ensure the output is simple: \n\n"<word>"';

    const translationPrompt =
        dict.translationPrompt ||
        (couldBeAIDict ? 'Translate this text, keep it simple, clear and natural: "<word>"' : "<word>");

    const prompt = isHelpMeRefine
        ? helpMeRefinePrompt.replaceAll("<word>", w)
        : utils.isSentence(w)
        ? translationPrompt.replaceAll("<word>", w)
        : sentence && (dict.chatgptPromptWithContext || dict.promptWithContext)
        ? (dict.chatgptPromptWithContext || dict.promptWithContext)
              .replaceAll("<word>", w)
              .replaceAll("<sentence>", sentence)
              .replace("<language>", languagePrompt ? ` in ${languagePrompt}` : "")
        : (dict.chatgptPrompt || dict.prompt || "<word>")
              .replaceAll("<word>", w)
              .replace("<language>", languagePrompt ? ` in ${languagePrompt}` : "");

    const textarea = document.querySelector(dict.inputSelector);
    const isRichEditor = dict.isRichEditor || textarea.contentEditable === "true";
    if (isRichEditor) {
        textarea.innerHTML = `<p>${prompt || w}</p>`;
    } else {
        textarea.value = prompt || w;
    }

    await utils.promisifiedTimeout(200);

    const event = new Event("input", { bubbles: true });
    textarea.dispatchEvent(event);

    const triggerClick = () => {
        if (!dict.submitButtonSelector) return;
        const btn = document.querySelector(dict.submitButtonSelector);
        btn.removeAttribute("disabled");
        btn.click();
    };

    const triggerMoreClicks = async () => {
        let maxLoops = 5;
        while (maxLoops--) {
            await utils.promisifiedTimeout(500);

            const inputValue = isRichEditor ? textarea.innerHTML : textarea.value;
            if (inputValue.includes(prompt)) {
                triggerClick();
            } else {
                break;
            }
        }
    };

    triggerClick();

    // For chatgpt, gemini and claude, when the previous query is still responding, it needs double(or even more) clicks to stop the previous query first then send the request.
    if (
        dict.doubleClickForMore ||
        dict.windowUrl.includes("gemini") ||
        dict.windowUrl.includes("claude") ||
        dict.windowUrl.includes("chatgpt")
    ) {
        triggerMoreClicks();
    }
}

async function fixQueryingOnEnterForChatGPT(dict) {
    if (!utils.isMobile() && location.href.startsWith("https://chatgpt.com")) {
        await utils.promisifiedTimeout(1000);
        const textarea = document.querySelector(dict.inputSelector);
        textarea.addEventListener("keydown", (event) => {
            if (event.key === "Enter" && !event.shiftKey && textarea.innerText.trim()) {
                event.preventDefault();
                const btn = document.querySelector(dict.submitButtonSelector);
                btn.click();
            }
        });
    }
}

export async function initOnLoadDynamicDict({ word, sentence, dict, isHelpMeRefine }) {
    if (dict.windowUrl.includes(location.origin)) {
        if (dict && word) {
            doQuery(word, sentence, "", dict, isHelpMeRefine);
        }

        fixQueryingOnEnterForChatGPT(dict);

        utils.listenToBackground("querying", (request) => {
            // console.log("querying", request);
            doQuery(request.text, request.sentence, request.languagePrompt, dict, request.isHelpMeRefine);
        });

        window.addEventListener("message", (event) => {
            if (event.data.type === "look up in dynamic dict") {
                // console.log("on message", event.data);
                doQuery(
                    event.data.word,
                    event.data.sentence,
                    event.data.languagePrompt,
                    dict,
                    event.data.isHelpMeRefine
                );
            }
        });
    }
}
