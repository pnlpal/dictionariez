export default [{
    'dictName': "vocabulary.com",
    'windowUrl': 'https://www.vocabulary.com/dictionary/<word>',
    "resources": {
        styles: ['vocabulary.less']
    }
}, {
    "dictName": "chatgpt definition",
    "chatgptPrompt": "Give me the full definitions of \"<word>\"<language>, if possible try to include IPA, definitions each with at least two examples, etymology, conjugations, related words with explanations etc. And make a pretty output with formatting like bold, italics etc.",
    "chatgptPromptWithContext": "Give me the full definitions of \"<word>\"<language>, which is used in the context \"<sentence>\", if possible try to include IPA, definitions each with at least two examples, etymology, conjugations, related words with explanations etc. And make a pretty output with formatting like bold, italics etc."
}, {
    'dictName': 'Urban Dictionary',
    'windowUrl': 'https://www.urbandictionary.com/define.php?term=<word>',
    "resources": {
        styles: ['urban.less']
    }
}, {
    'dictName': 'Collins English Dictionary',
    'windowUrl': 'https://www.collinsdictionary.com/dictionary/english/<word>',
    'fixSpaceInWords': '+',
    "resources": {
        styles: ['collins.less']
    }
}, {
    'dictName': 'Cambridge English',
    'windowUrl': 'https://dictionary.cambridge.org/dictionary/english/<word>',
    'css': '#header, #ad_topslot_a {display: none;}'
}, {
    'dictName': "Bing Dict (必应词典)",
    'windowUrl': 'https://cn.bing.com/dict/search?mkt=zh-cn&q=<word>', # must has mkt 
    "resources": {
        styles: ['bing.less']
    }
}, {
    'dictName': "Wiktionary",
    'windowUrl': 'https://en.m.wiktionary.org/wiki/<word>',
    "resources": {
        styles: ['wiktionary.less']
    }
}, {
    "dictName": "Merriam-webster Dictionary",
    "windowUrl": "https://www.merriam-webster.com/dictionary/<word>",
    "css": "header, .home-top-creative-cont, .mw-ad-slot-top, #main-banner-ad-container, .container-top-ads {display: none !important; }"
}, {
    'dictName': "thefreedictionary.com",
    'windowUrl': 'https://www.thefreedictionary.com/<word>',
    "resources": {
        styles: ['thefreedictionary.less']
    }
}, {
    "dictName": "TextPixie (AI translator)",
    "windowUrl": "https://textpixie.com/",
    "translationPrompt": "<word>",
    "inputSelector": "#trtxt-inputTextArea",
    "submitButtonSelector": "#trtxt-translateBtn",
    "css": "#global-nav, #page-heading, #howto-section, #benefits-section, #user-cases-section, #faq-section, #popular-langpairs-section, #global-footer { display: none;} #converter-tabbar { padding-top: 32px; }"
}, {
    "dictName": "DeepL Translator (Auto - English)",
    "windowUrl": "https://www.deepl.com/en/translator/en-us/",
    "inputSelector": "#textareasContainer div[contenteditable]",
    "translationPrompt": "<word>",
    "css": '[data-testid="dl-cookieBanner"] {display: none;}'
}
]