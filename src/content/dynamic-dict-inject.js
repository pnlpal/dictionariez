import utils from "utils";

async function chatgptSpecific($) {
  await utils.promisify($(document).ready);

  $(document).on(
    "mouseenter mouseover",
    ".markdown ul, .markdown ol",
    function (e) {
      const $li = $(this).find("li");
      const pronAudioTpl =
        "<a class='fairydict-pron-audio for-chatgpt-audio' href='javascript:void(0)'><i class='icon-fairydict-volume'></i></a>";

      if (!$li.find(".fairydict-pron-audio").length) {
        $li.append(pronAudioTpl);
      }
    }
  );
  $(document).on("mouseleave", ".markdown ul, .markdown ol", function (e) {
    $(this).find("li .fairydict-pron-audio").remove();
  });
}

async function doQuery(w, sentence, languagePrompt, dict) {
  if (!w) return;

  await utils.checkInTime(
    () =>
      document.querySelector(dict.inputSelector) &&
      document.querySelector(dict.submitButtonSelector)
  );
  const prompt =
    sentence && dict.chatgptPromptWithContext
      ? dict.chatgptPromptWithContext
          .replaceAll("<word>", w)
          .replaceAll("<sentence>", sentence)
          .replace("<language>", languagePrompt ? ` in ${languagePrompt}` : "")
      : dict.chatgptPrompt
          .replaceAll("<word>", w)
          .replace("<language>", languagePrompt ? ` in ${languagePrompt}` : "");

  await utils.promisifiedTimeout(500);

  const textarea = document.querySelector(dict.inputSelector);
  // var nativeTextAreaValueSetter = Object.getOwnPropertyDescriptor(
  //   window.HTMLTextAreaElement.prototype,
  //   "value"
  // ).set;
  // nativeTextAreaValueSetter.call(textarea, prompt);
  textarea.value = prompt;

  await utils.promisifiedTimeout(1000);

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

    if (location.host === "chat.openai.com") {
      chatgptSpecific($);
    }
  }
}
