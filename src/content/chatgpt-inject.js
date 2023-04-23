import utils from "utils";

export async function initOnChatGPT({ word, dict }) {
  async function doQuery(w) {
    if (!w) return;

    await utils.checkInTime(() => document.querySelector("main form textarea"));
    const prompt = dict.chatgptPrompt.replaceAll("<word>", w);
    const textarea = document.querySelector("main form textarea");
    const btn = document.querySelector("main form textarea+button");
    textarea.value = prompt;

    btn.removeAttribute("disabled");
    btn.click();
  }

  if (location.host === "chat.openai.com") {
    if (dict && word) {
      doQuery(word);
    }

    chrome.runtime.onMessage.addListener((request) => {
      if (request.type == "querying") {
        console.log("querying...", request.text);
        doQuery(request.text);
      }
    });
  }
}
