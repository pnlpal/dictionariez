export default [
    {
        dictName: "Glosbe (Sv-En)",
        windowUrl: "https://glosbe.com/sv/en/<word>",
        css: ".navbar, #topBannerContainer, #topTrufleContainer {display: none !important;}",
        ttsHelperSelector: ".translation__example p[lang='sv']",
    },
    {
        dictName: "svenska.se",
        windowUrl: "https://svenska.se/tre/?sok=<word>",
        css: "header {display: none !important;} body {margin-top: 50px !important;}",
    },
    {
        dictName: "Folkets Lexikon",
        windowUrl: "https://folkets-lexikon.csc.kth.se/folkets/#lookup&<word>",
    },
    {
        dictName: "tyda.se",
        windowUrl: "https://tyda.se/search/<word>?lang%5B0%5D=en&lang%5B1%5D=sv",
        css: "#header {display: none !important;} #search-box {margin-left: 0 !important; z-index: 2 !important;} .page-searchresult .image-wrapper {text-align: start !important;} body {margin-top: 10px !important;}",
        ttsHelperSelector: ".sample ul>li",
    },
    {
        dictName: "Dict.com (No-En)",
        windowUrl: "https://www.dict.com/norwegian-english/<word>",
        css: ".navbar, .menu { display: none; } body { margin-top: 50px !important; }",
    },
    {
        dictName: "Dict.com (Da-En)",
        windowUrl: "https://www.dict.com/danish-english/<word>",
        css: ".navbar, .menu { display: none; } body { margin-top: 50px !important; }",
    },
    {
        dictName: "chatgpt definition",
        prompt: 'Give me the full definitions of "<word>"<language>, if possible try to include IPA, definitions each with at least two examples, etymology, conjugations, related words with explanations etc. And make a pretty output with formatting like bold, italics etc.',
        promptWithContext:
            'Give me the full definitions of "<word>"<language>, which is used in the context "<sentence>", if possible try to include IPA, definitions each with at least two examples, etymology, conjugations, related words with explanations etc. And make a pretty output with formatting like bold, italics etc.',
    },
    {
        dictName: "Mistral Definition",
        prompt: 'Give me the full definitions of "<word>"<language>, if possible try to include IPA, definitions each with at least two examples, etymology, conjugations, related words with explanations etc. And make a pretty output with formatting like bold, italics etc.',
        promptWithContext:
            'Give me the full definitions of "<word>"<language>, which is used in the context "<sentence>", if possible try to include IPA, definitions each with at least two examples, etymology, conjugations, related words with explanations etc. And make a pretty output with formatting like bold, italics etc.',
        windowUrl: "https://chat.mistral.ai/chat",
        inputSelector: "form .ProseMirror[contenteditable]",
        isRichEditor: true,
        submitButtonSelector: "form button[type='submit']",
    },
    {
        dictName: "Reverso Swedish Context",
        windowUrl: "https://context.reverso.net/translation/swedish-english/<word>",
        css: "header,#miniheader {display: none !important;}",
    },
    {
        dictName: "GoogleTranslate(SE -> EN)",
        windowUrl: "https://translate.google.com/?sl=sv&tl=en&text=<word>&op=translate",
        css: ".navbar {display: none !important;}",
    },
    {
        dictName: "Bab.la (Sv - En)",
        fixSpaceInWords: "-",
        windowUrl: "https://en.bab.la/dictionary/swedish-english/<word>",
        css: "aside, nav { display: none; } ",
    },
    {
        dictName: "Wiktionary (Svenska)",
        windowUrl: "https://sv.m.wiktionary.org/wiki/<word>",
        css: "header {display: none;} main {margin-top: 25px;}",
    },
    {
        dictName: "Google Image",
        windowUrl: "https://www.google.com/search?tbm=isch&q=<word>",
        css: "c-wiz[jsdata='deferred-i3']>div:first-child {display: none;} body {margin-top: 50px !important;}",
    },
    {
        dictName: "Captionz (examples on YouTube)",
        windowUrl: "https://pnl.dev/captionz-ii/?voice=Swedish&NO_REDIRECT=true",
        inputSelector: ".search-container input.text-search",
    },
];
