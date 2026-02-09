export default [
    {
        dictName: "vocabulary.com",
        windowUrl: "https://www.vocabulary.com/dictionary/<word>",
        css: "header, .fixed-tray, #dictionaryNav, .top-notes { display: none; } body { margin-top: 30px; }",
    },
    {
        dictName: "chatgpt definition",
        prompt: 'Give me the full definitions of "<word>"<language>, if possible try to include IPA, definitions each with at least two examples, etymology, conjugations, related words with explanations etc. And make a pretty output with formatting like bold, italics etc.',
        promptWithContext:
            'Give me the full definitions of "<word>"<language>, which is used in the context "<sentence>", if possible try to include IPA, definitions each with at least two examples, etymology, conjugations, related words with explanations etc. And make a pretty output with formatting like bold, italics etc.',
    },
    {
        dictName: "Urban Dictionary",
        windowUrl: "https://www.urbandictionary.com/define.php?term=<word>",
        ttsHelperSelector: ".definition .example.italic",
        css: "body { margin-top: -30px !important; } body #urban-top-bar { display: none !important; }",
    },
    {
        dictName: "Collins English Dictionary",
        windowUrl: "https://www.collinsdictionary.com/dictionary/english/<word>",
        fixSpaceInWords: "+",
        css: "body > header { display: none !important; } body > main { padding-top: 45px !important; } body .topslot_container { display: none; } body .padding-pub { display: none !important; }",
    },
    {
        dictName: "Cambridge English",
        windowUrl: "https://dictionary.cambridge.org/dictionary/english/<word>",
        css: "#header, #ad_topslot_a {display: none;}",
        ttsHelperSelector: ".def-body .examp",
    },
    {
        dictName: "Bing Dict (必应词典)",
        windowUrl: "https://cn.bing.com/dict/search?mkt=zh-cn&q=<word>", // must has mkt
        css: "body { padding-top: 20px !important; width: auto !important; min-width: auto !important; } header { display: none !important; } .contentPadding {padding-left: 10px !important;}",
    },
    {
        dictName: "Wiktionary",
        windowUrl: "https://en.m.wiktionary.org/wiki/<word>",
        css: "header { display: none; } main { margin-top: 25px; }",
    },
    {
        dictName: "Merriam-webster Dictionary",
        windowUrl: "https://www.merriam-webster.com/dictionary/<word>",
        css: "header, .home-top-creative-cont, .mw-ad-slot-top, #main-banner-ad-container, .container-top-ads {display: none !important; }",
    },
    {
        dictName: "thefreedictionary.com",
        windowUrl: "https://www.thefreedictionary.com/<word>",
        css: ".header-top { display: none; } .adsbygoogle { height: 0 !important; } body { margin-top: -35px !important; } @media only screen and (max-width: 775px) { #header { display: none; } }",
    },
    {
        dictName: "TextPixie (AI translator)",
        windowUrl: "https://textpixie.com/",
        translationPrompt: "<word>",
        inputSelector: "#trtxt-inputTextArea",
        submitButtonSelector: "#trtxt-translateBtn",
        css: "#global-nav, #page-heading, #howto-section, #benefits-section, #user-cases-section, #faq-section, #popular-langpairs-section, #global-footer { display: none;} #converter-tabbar { padding-top: 32px; }",
    },
    {
        dictName: "DeepL Translator (Auto - English)",
        windowUrl: "https://www.deepl.com/en/translator/en-us/",
        inputSelector: "#textareasContainer div[contenteditable]",
        translationPrompt: "<word>",
        css: '[data-testid="dl-cookieBanner"] {display: none;}',
    },
];
