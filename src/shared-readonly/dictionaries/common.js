// This file is auto-copied. Do not edit directly.

// Universal dictionaries that work for all languages
export default [
    {
        dictName: "Mistral Definition",
        prompt: 'Give me the full definitions of "<word>"<language>. Start with the word in bold and its IPA. Then give the definitions, each with at least two examples. Then add etymology, conjugations, and related words with explanations, formatted with bold, italics etc.',
        promptWithContext:
            'Give me the full definitions of "<word>"<language>, as used in the context "<sentence>". Start with the word in bold and its IPA. Then give the definitions, with the one that fits the context first, each with at least two examples. Then add etymology, conjugations, and related words with explanations, formatted with bold, italics etc.',
        windowUrl: "https://chat.mistral.ai/chat",
        inputSelector: "form .ProseMirror[contenteditable]",
        isRichEditor: true,
        submitButtonSelector: "form button[type='submit']",
    },
    {
        dictName: "Gemini Definition",
        prompt: 'Give me the full definitions of "<word>"<language>. Start with the word in bold and its IPA. Then give the definitions, each with at least two examples. Then add etymology, conjugations, and related words with explanations, formatted with bold, italics etc.',
        promptWithContext:
            'Give me the full definitions of "<word>"<language>, as used in the context "<sentence>". Start with the word in bold and its IPA. Then give the definitions, with the one that fits the context first, each with at least two examples. Then add etymology, conjugations, and related words with explanations, formatted with bold, italics etc.',
        windowUrl: "https://gemini.google.com/app",
        isRichEditor: true,
        inputSelector: "chat-window [contenteditable='true'], chat-window [role='textbox']",
        submitButtonSelector:
            "chat-window button[aria-label='Send'], chat-window button[aria-label='Send message'], chat-window button.send-button, chat-window button[type='submit'], chat-window button[aria-label='Stop'], chat-window button[aria-label='Stop response']",
    },
    {
        dictName: "ChatGPT Definition",
        prompt: 'Give me the full definitions of "<word>"<language>. Start with the word in bold, its IPA, and playable audio of its pronunciation. Then give the definitions, each with at least two examples. Then add etymology, conjugations, and related words with explanations, formatted with bold, italics etc.',
        promptWithContext:
            'Give me the full definitions of "<word>"<language>, as used in the context "<sentence>". Start with the word in bold, its IPA, and playable audio of its pronunciation, then the context sentence with playable audio of it read aloud. Then give the definitions, with the one that fits the context first, each with at least two examples. Then add etymology, conjugations, and related words with explanations, formatted with bold, italics etc.',
        windowUrl: "https://chatgpt.com",
        css: "body {margin-top: 50px !important;}",
        inputSelector: "form div[contenteditable], #mobile-composer-prompt",
        submitButtonSelector:
            "form button[type='submit'], form button[aria-label='Send'], form button[aria-label='Stop']",
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
