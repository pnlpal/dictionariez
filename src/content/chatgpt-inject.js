import utils from "utils";

async function doQuery(w, sentence, languagePrompt, dict) {
  if (!w) return;

  await utils.checkInTime(() => document.querySelector("main form textarea"));
  const prompt =
    sentence && dict.chatgptPromptWithContext
      ? dict.chatgptPromptWithContext
          .replaceAll("<word>", w)
          .replaceAll("<sentence>", sentence)
          .replace("<language>", languagePrompt ? ` in ${languagePrompt}` : "")
      : dict.chatgptPrompt
          .replaceAll("<word>", w)
          .replace("<language>", languagePrompt ? ` in ${languagePrompt}` : "");
  const textarea = document.querySelector("main form textarea");
  const btn = document.querySelector("main form textarea+button");
  textarea.value = prompt;

  btn.removeAttribute("disabled");
  btn.click();
}

export async function initOnChatGPT({ word, sentence, dict }) {
  if (location.host === "chat.openai.com") {
    if (dict && word) {
      doQuery(word, sentence, "", dict);
    }

    chrome.runtime.onMessage.addListener((request) => {
      if (request.type == "querying") {
        console.log("querying...", request.text);
        doQuery(request.text, request.sentence, request.languagePrompt, dict);
      }
    });
  }
}
