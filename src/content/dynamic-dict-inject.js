import utils from "utils";

async function doQuery(w, sentence, languagePrompt, dict) {
  if (!w) return;

  await utils.checkInTime(
    () =>
      document.querySelector(dict.inputSelector) &&
      document.querySelector(dict.submitButtonSelector)
  );
  await utils.promisifiedTimeout(500);

  const prompt =
    sentence && (dict.chatgptPromptWithContext || dict.promptWithContext)
      ? (dict.chatgptPromptWithContext || dict.promptWithContext)
          .replaceAll("<word>", w)
          .replaceAll("<sentence>", sentence)
          .replace("<language>", languagePrompt ? ` in ${languagePrompt}` : "")
      : (dict.chatgptPrompt || dict.prompt)
          .replaceAll("<word>", w)
          .replace("<language>", languagePrompt ? ` in ${languagePrompt}` : "");

  const textarea = document.querySelector(dict.inputSelector);
  const isRichEditor = dict.isRichEditor || textarea.contentEditable === "true";
  if (isRichEditor) {
    textarea.innerHTML = `<p>${prompt}</p>`;
  } else {
    textarea.value = prompt;
  }

  await utils.promisifiedTimeout(200);

  const event = new Event("input", { bubbles: true });
  textarea.dispatchEvent(event);

  const triggerClick = () => {
    const btn = document.querySelector(dict.submitButtonSelector);
    btn.removeAttribute("disabled");
    btn.click();
  };

  triggerClick();

  // For gemini and claude, when the previous query is still responding, it needs double(or even more) clicks to stop the previous query first then send the request.
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
}

async function fixQueryingOnEnterForChatGPT(dict) {
  if (!utils.isMobile() && location.href.startsWith("https://chatgpt.com")) {
    await utils.promisifiedTimeout(1000);
    const textarea = document.querySelector(dict.inputSelector);
    textarea.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && !event.shiftKey && textarea.value) {
        event.preventDefault();
        const btn = document.querySelector(dict.submitButtonSelector);
        btn.click();
      }
    });
  }
}

export async function initOnLoadDynamicDict({ word, sentence, dict }, $) {
  if (location.href.startsWith(dict.windowUrl)) {
    if (dict && word) {
      doQuery(word, sentence, "", dict);
    }

    fixQueryingOnEnterForChatGPT(dict);

    window.addEventListener("message", (event) => {
      if (event.data.type === "look up in dynamic dict") {
        doQuery(
          event.data.word,
          event.data.sentence,
          event.data.languagePrompt,
          dict
        );
      }
    });
  }
}
