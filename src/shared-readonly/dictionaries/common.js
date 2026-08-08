// This file is auto-copied. Do not edit directly.

// Universal dictionaries that work for all languages
export default [
  {
    dictName: "Mistral Definition",
    prompt:
      'Give me the full definitions of "<word>"<language>, if possible try to include IPA, definitions each with at least two examples, etymology, conjugations, related words with explanations etc. And make a pretty output with formatting like bold, italics etc.',
    promptWithContext:
      'Give me the full definitions of "<word>"<language>, which is used in the context "<sentence>", if possible try to include IPA, definitions each with at least two examples, etymology, conjugations, related words with explanations etc. And make a pretty output with formatting like bold, italics etc.',
    windowUrl: "https://chat.mistral.ai/chat",
    inputSelector: "form .ProseMirror[contenteditable]",
    isRichEditor: true,
    submitButtonSelector: "form button[type='submit']",
  },
  {
    dictName: "Gemini Definition",
    prompt:
      'Give me the full definitions of "<word>"<language>, if possible try to include IPA, definitions each with at least two examples, etymology, conjugations, related words with explanations etc. And make a pretty output with formatting like bold, italics etc.',
    promptWithContext:
      'Give me the full definitions of "<word>"<language>, which is used in the context "<sentence>", if possible try to include IPA, definitions each with at least two examples, etymology, conjugations, related words with explanations etc. And make a pretty output with formatting like bold, italics etc.',
    windowUrl: "https://gemini.google.com/app",
    isRichEditor: true,
    inputSelector:
      "chat-window [contenteditable='true'], chat-window [role='textbox']",
    submitButtonSelector:
      "chat-window button[aria-label='Send'], chat-window button[aria-label='Send message'], chat-window button.send-button, chat-window button[type='submit'], chat-window button[aria-label='Stop'], chat-window button[aria-label='Stop response']",
  },
  {
    dictName: "ChatGPT Definition",
    prompt:
      'Give me the full definitions of "<word>"<language>, if possible try to include IPA, definitions each with at least two examples, etymology, conjugations, related words with explanations etc. And make a pretty output with formatting like bold, italics etc.',
    promptWithContext:
      'Give me the full definitions of "<word>"<language>, which is used in the context "<sentence>", if possible try to include IPA, definitions each with at least two examples, etymology, conjugations, related words with explanations etc. And make a pretty output with formatting like bold, italics etc.',
    windowUrl: "https://chatgpt.com",
    css: "body {margin-top: 50px !important;}",
    inputSelector: "form div[contenteditable], #mobile-composer-prompt",
    submitButtonSelector:
      "form button[data-testid='send-button'], form button[data-testid='stop-button'], button[data-composer-submit]",
  },
  {
    dictName: "Google Image",
    windowUrl: "https://www.google.com/search?tbm=isch&q=<word>",
    css: "#searchform, c-wiz[jsdata='deferred-i3']>div:first-child {display: none !important;} body {margin-top: -55px !important;}",
  },
  {
    dictName: "Captionz (examples on YouTube)",
    windowUrl: "https://pnl.dev/captionz-ii/?NO_REDIRECT=true",
    inputSelector: ".search-container input.text-search",
  },
];
