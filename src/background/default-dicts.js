export default [
    {
        dictName: "Longman English",
        entry: "LongmanEnglish",
        windowUrl: "https://www.ldoceonline.com/dictionary/<word>",
        fixSpaceInWords: "-",
        css: "body .header, body .topslot-container, body #ad_topslot { display: none !important; } body .content { margin-top: 50px; }",
    },
    {
        dictName: "chatgpt definition",
        prompt: 'Give me the full definitions of "<word>"<language>, if possible try to include IPA, definitions each with at least two examples, etymology, conjugations, related words with explanations etc. And make a pretty output with formatting like bold, italics etc.',
        promptWithContext:
            'Give me the full definitions of "<word>"<language>, which is used in the context "<sentence>", if possible try to include IPA, definitions each with at least two examples, etymology, conjugations, related words with explanations etc. And make a pretty output with formatting like bold, italics etc.',
    },
    {
        dictName: "vocabulary.com",
        windowUrl: "https://www.vocabulary.com/dictionary/<word>",
        css: "header, .fixed-tray, #dictionaryNav, .top-notes { display: none; } body { margin-top: 30px; }",
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
        dictName: "Bing Dict (必应词典)",
        windowUrl: "https://cn.bing.com/dict/search?mkt=zh-cn&q=<word>", // must has mkt
        css: "body { padding-top: 20px !important; width: auto !important; min-width: auto !important; } header { display: none !important; } .contentPadding {padding-left: 10px !important;}",
    },
    {
        dictName: "Oxford Learner",
        entry: "OxfordLearner",
        fixSpaceInWords: "-",
        windowUrl: "https://www.oxfordlearnersdictionaries.com/search/english/?q=<word>",
        ttsHelperSelector: "ul.examples>li",
        css: "body .mainsearch { display: none; }",
    },
    {
        dictName: "Cambridge English",
        windowUrl: "https://dictionary.cambridge.org/dictionary/english/<word>",
        css: "#header, #ad_topslot_a {display: none;} div.cc { margin-top: -75px !important; }",
        ttsHelperSelector: ".def-body .examp",
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
        dictName: "Google Image",
        windowUrl: "https://www.google.com/search?tbm=isch&q=<word>",
        css: "c-wiz[jsdata='deferred-i3']>div:first-child {display: none;} body {margin-top: 50px !important;}",
    },
    {
        dictName: "Captionz (examples on YouTube)",
        windowUrl: "https://pnl.dev/captionz-ii/?NO_REDIRECT=true",
        inputSelector: ".search-container input.text-search",
    },
];
