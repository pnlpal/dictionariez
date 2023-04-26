export default [{
    'dictName': 'Longman English'
    'entry': 'LongmanEnglish'
    'windowUrl': 'https://www.ldoceonline.com/dictionary/<word>'
    'fixSpaceInWords': '-',
    "resources": {
        styles: ['longmanenglish.less']
    }
}, {
    "dictName": "chatgpt definition",
    "chatgptPrompt": "Give me the full definitions of \"<word>\"<language>, if possible try to include IPA, definitions each with at least two examples, etymology, conjugations, related words with explanations, and in a pretty output with formatting like bold, italics etc.",
    "chatgptPromptWithContext": "Give me the full definitions of \"<word>\"<language>, which is used in the context \"<sentence>\", if possible try to include IPA, definitions each with at least two examples, etymology, conjugations, related words with explanations etc, and in a pretty output with formatting like bold, italics etc."
}, {
    'dictName': "vocabulary.com",
    'windowUrl': 'https://www.vocabulary.com/dictionary/<word>',
    "resources": {
        styles: ['vocabulary.less']
    }
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
    'dictName': "Bing Dict (必应词典)",
    'windowUrl': 'https://cn.bing.com/dict/search?mkt=zh-cn&q=<word>', # must has mkt 
    "resources": {
        styles: ['bing.less']
    }
}, {
    'dictName': 'Oxford Learner',
    'entry': 'OxfordLearner',
    'fixSpaceInWords': '-',
    'windowUrl': 'https://www.oxfordlearnersdictionaries.com/search/english/?q=<word>'
    "resources": {
        styles: ['oxfordlearner.less']
    }
}, {
    'dictName': 'Cambridge English'
    'entry': 'CambridgeEnglish'
    'windowUrl': 'https://dictionary.cambridge.org/dictionary/english/<word>'
    "resources": {
        styles: ['cambridgeenglish.less']
    }
}, {
    'dictName': "thefreedictionary.com",
    'windowUrl': 'https://www.thefreedictionary.com/<word>',
    "resources": {
        styles: ['thefreedictionary.less']
    }
}, {
    'dictName': "Wiktionary",
    'windowUrl': 'https://en.m.wiktionary.org/wiki/<word>',
    "resources": {
        styles: ['wiktionary.less']
    }
}, {
  "dictName": "Google Image",
  "windowUrl": "https://www.google.com/search?tbm=isch&q=<word>",
  "css": "c-wiz[jsdata='deferred-i3']>div:first-child {display: none;} body {margin-top: 50px !important;}"
}]
