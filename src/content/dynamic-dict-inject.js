import utils from "utils";

const replacePromptPlaceholders = ({ template, word, sentence, languagePrompt, aiResponseLanguage }) => {
    return (template || "")
        .replaceAll("<word>", word)
        .replaceAll("<sentence>", sentence || "")
        .replace("<language>", languagePrompt ? ` in ${languagePrompt}` : "")
        .replaceAll("<aiResponseLanguage>", aiResponseLanguage || "");
};

const setNativeValue = (element, value) => {
    // For React and other frameworks that intercept .value assignments,
    // we use the native setter to bypass their event interception
    const prototype = Object.getPrototypeOf(element);
    const descriptor = Object.getOwnPropertyDescriptor(prototype, "value");
    const valueSetter = descriptor ? descriptor.set : null;

    if (valueSetter) {
        valueSetter.call(element, value);
    } else {
        element.value = value;
    }
};

async function doQuery(w, sentence, languagePrompt, dict, isHelpMeRefine, aiResponseLanguage) {
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
        ? replacePromptPlaceholders({
              template: helpMeRefinePrompt,
              word: w,
              sentence,
              languagePrompt,
              aiResponseLanguage,
          })
        : utils.isSentence(w)
          ? replacePromptPlaceholders({
                template: translationPrompt,
                word: w,
                sentence,
                languagePrompt,
                aiResponseLanguage,
            })
          : sentence && (dict.chatgptPromptWithContext || dict.promptWithContext)
            ? replacePromptPlaceholders({
                  template: dict.chatgptPromptWithContext || dict.promptWithContext,
                  word: w,
                  sentence,
                  languagePrompt,
                  aiResponseLanguage,
              })
            : replacePromptPlaceholders({
                  template: dict.chatgptPrompt || dict.prompt || "<word>",
                  word: w,
                  sentence,
                  languagePrompt,
                  aiResponseLanguage,
              });

    const textarea = document.querySelector(dict.inputSelector);
    const isRichEditor = dict.isRichEditor || textarea.contentEditable === "true";
    if (isRichEditor) {
        textarea.innerHTML = `<p>${prompt || w}</p>`;
    } else {
        // Use native setter to bypass React's event interception
        setNativeValue(textarea, prompt || w);
    }

    await utils.promisifiedTimeout(200);

    const event = new Event("input", { bubbles: true });
    textarea.dispatchEvent(event);

    const getSubmitButton = () => {
        if (!dict.submitButtonSelector) return null;
        return document.querySelector(dict.submitButtonSelector);
    };

    const isStopButton = (btn) => {
        if (!btn) return false;
        const attrs = [btn.getAttribute("data-testid"), btn.getAttribute("aria-label"), btn.getAttribute("title")]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();
        return /stop|cancel|abort|interrupt|停止/.test(attrs);
    };

    const clickSubmitButton = (btn) => {
        if (!btn) return;
        btn.removeAttribute("disabled");
        btn.click();
    };

    const submitPrompt = async () => {
        const isLikelyAIChat =
            dict.doubleClickForMore ||
            dict.windowUrl.includes("gemini") ||
            dict.windowUrl.includes("claude") ||
            dict.windowUrl.includes("chatgpt");

        // First click can be "stop" if a previous response is still running.
        let btn = getSubmitButton();
        if (!btn) {
            await utils.promisifiedTimeout(500);
            btn = getSubmitButton();
        }

        if (!btn) return;

        if (isLikelyAIChat && isStopButton(btn)) {
            clickSubmitButton(btn);
            // Wait briefly for UI to switch back to a "send" state.
            await utils.promisifiedTimeout(500);
            btn = getSubmitButton();
        }

        if (!btn || (isLikelyAIChat && isStopButton(btn))) {
            return;
        }

        clickSubmitButton(btn);

        if (isLikelyAIChat) {
            // Guarded retry: only retry when nothing started (button still looks like send) and input is unchanged.
            await utils.promisifiedTimeout(450);
            const inputValue = isRichEditor ? textarea.innerHTML : textarea.value;
            const nextBtn = getSubmitButton();
            if (inputValue.includes(prompt) && nextBtn && !isStopButton(nextBtn)) {
                clickSubmitButton(nextBtn);
            }
        }
    };

    await submitPrompt();
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

export async function initOnLoadDynamicDict({
    word,
    sentence,
    languagePrompt,
    aiResponseLanguage,
    dict,
    isHelpMeRefine,
}) {
    if (dict.windowUrl.includes(location.origin)) {
        if (dict && word) {
            console.log(
                `[Init Dynamic Dict] word: ${word}, sentence: ${sentence}, language: ${languagePrompt}, isHelpMeRefine: ${isHelpMeRefine}`,
            );
            doQuery(word, sentence, languagePrompt, dict, isHelpMeRefine, aiResponseLanguage);
        }

        fixQueryingOnEnterForChatGPT(dict);

        utils.listenToBackground("querying", (request) => {
            console.log(
                `[Querying] word: ${request.text}, sentence: ${request.sentence}, language: ${request.languagePrompt}`,
            );
            doQuery(
                request.text,
                request.sentence,
                request.languagePrompt,
                dict,
                request.isHelpMeRefine,
                request.aiResponseLanguage || aiResponseLanguage,
            );
        });

        window.addEventListener("message", (event) => {
            if (event.data.type === "look up in dynamic dict") {
                console.log(
                    `[Look up in dynamic dict] word: ${event.data.word}, sentence: ${event.data.sentence}, language: ${event.data.languagePrompt}`,
                );
                doQuery(
                    event.data.word,
                    event.data.sentence,
                    event.data.languagePrompt,
                    dict,
                    event.data.isHelpMeRefine,
                    event.data.aiResponseLanguage || aiResponseLanguage,
                );
            }
        });
    }
}
