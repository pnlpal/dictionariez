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
    sentence && dict.chatgptPromptWithContext
      ? dict.chatgptPromptWithContext
          .replaceAll("<word>", w)
          .replaceAll("<sentence>", sentence)
          .replace("<language>", languagePrompt ? ` in ${languagePrompt}` : "")
      : dict.chatgptPrompt
          .replaceAll("<word>", w)
          .replace("<language>", languagePrompt ? ` in ${languagePrompt}` : "");

  const textarea = document.querySelector(dict.inputSelector);
  // var nativeTextAreaValueSetter = Object.getOwnPropertyDescriptor(
  //   window.HTMLTextAreaElement.prototype,
  //   "value"
  // ).set;
  // nativeTextAreaValueSetter.call(textarea, prompt);
  textarea.value = prompt;

  await utils.promisifiedTimeout(200);

  const event = new Event("input", { bubbles: true });
  textarea.dispatchEvent(event);

  const btn = document.querySelector(dict.submitButtonSelector);
  btn.removeAttribute("disabled");
  btn.click();
}

export async function initOnLoadDynamicDict({ word, sentence, dict }, $) {
  if (location.href.startsWith(dict.windowUrl)) {
    if (dict && word) {
      doQuery(word, sentence, "", dict);
    }

    chrome.runtime.onMessage.addListener((request) => {
      if (request.type == "querying") {
        doQuery(request.text, request.sentence, request.languagePrompt, dict);
      }
    });
  }
}
