export default [{
    'dictName': "thefreedictionary.com",
    'windowUrl': 'https://www.thefreedictionary.com/<word>',
    "resources": {
        styles: ['thefreedictionary.less']
    }
},{
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
    "dictName": "WordReference Defenition", 
    "windowUrl": "https://www.wordreference.com/definition/<word>", 
    "css": "c-wiz[jsdata='deferred-i3']>div:first-child {display: none;} body {margin-top: 50px !important;}"
}, {
    "dictName": "Merriam-webster Dictionary",
    "windowUrl": "https://www.merriam-webster.com/dictionary/<word>",
    "css": "header, .home-top-creative-cont, .mw-ad-slot-top, #main-banner-ad-container, .container-top-ads {display: none !important; }"
}, {
  "dictName": "Google Translate (Auto -> EN)", 
  "windowUrl": "https://translate.google.com/?sl=auto&tl=en&text=<word>&op=translate",
  "css":".navbar {display: none !important;}"
}, {
    "dictName": "DeepL (Auto -> EN)",
    "windowUrl": "https://www.deepl.com/translator#auto/en-us/<word>"
}
]
