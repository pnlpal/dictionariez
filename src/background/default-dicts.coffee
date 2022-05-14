export default [{
    'dictName': 'Longman English'
    'entry': 'LongmanEnglish'
    'windowUrl': 'https://www.ldoceonline.com/dictionary/<word>'
    'windowUrlMatch': '/dictionary/([^&/?]+)',
    'fixSpaceInWords': '-',
    "resources": {
        styles: ['longmanenglish.less']
    }
}, {
    'dictName': "vocabulary.com",
    'windowUrl': 'https://www.vocabulary.com/dictionary/<word>',
    'windowUrlMatch': '/dictionary/([^&/?]+)',
    "resources": {
        styles: ['vocabulary.less']
    }
}, {
    'dictName': 'Macmilland Dictionary',
    'windowUrl': 'https://www.macmillandictionary.com/dictionary/british/<word>',
    'windowUrlMatch': '/british/([^&/?]+)',
    'fixSpaceInWords': '-',
    "resources": {
        styles: ['macmilland.less']
    }
}, {
    'dictName': 'Urban Dictionary',
    'windowUrl': 'https://www.urbandictionary.com/define.php?term=<word>',
    'windowUrlMatch': '[^\\w]term=([^&]+)',
    "resources": {
        styles: ['urban.less']
    }
}, {
    'dictName': 'Collins English Dictionary',
    'windowUrl': 'https://www.collinsdictionary.com/dictionary/english/<word>',
    'fixSpaceInWords': '+',
    'windowUrlMatch': '/english/([^&/?]+)',
    "resources": {
        styles: ['collins.less']
    }
}, {
    'dictName': "Wikipedia",
    'windowUrl': 'https://en.m.wikipedia.org/wiki/<word>',
    'windowUrlMatch': 'wiki/([^&]+)',
    "resources": {
        styles: ['wikipedia.less']
    }
}, {
    'dictName': "Bing Dict (必应词典)",
    'windowUrl': 'https://cn.bing.com/dict/search?mkt=zh-cn&q=<word>', # must has mkt 
    'windowUrlMatch': '[^\\w]q=([^&]+)',
    "resources": {
        styles: ['bing.less']
    }
}, {
    'dictName': 'Oxford Learner',
    'entry': 'OxfordLearner',
    'fixSpaceInWords': '-',
    'windowUrl': 'https://www.oxfordlearnersdictionaries.com/search/english/?q=<word>'
    'windowUrlMatch': '/english/([^&/?]+)'
    "resources": {
        styles: ['oxfordlearner.less']
    }
}, {
    'dictName': 'Oxford Living',
    'entry': 'Oxfordliving',
    'fixSpaceInWords': '-',
    'windowUrl': 'https://www.lexico.com/definition/<word>'
    'windowUrlMatch': '/definition/([^&/?]+)'
    "resources": {
        styles: ['oxfordliving.less']
    }
}, {
    'dictName': 'Cambridge English'
    'entry': 'CambridgeEnglish'
    'windowUrl': 'https://dictionary.cambridge.org/dictionary/english/<word>'
    'windowUrlMatch': '/english/([^&/?]+)',
    "resources": {
        styles: ['cambridgeenglish.less']
    }
}, {
    'dictName': 'Cambridge English (汉化版)'
    'entry': 'CambridgeEnglish-zh'
    'windowUrl': 'https://dictionary.cambridge.org/zhs/词典/英语-汉语-简体/<word>'
    'windowUrlMatch': '/英语-汉语-简体/([^&/?]+)',
    "resources": {
        styles: ['cambridgeenglish.less']
    }
}, {
    'dictName': 'Merriam-webster Dictionary',
    'windowUrl': 'https://www.merriam-webster.com/dictionary/<word>',
    'windowUrlMatch': '/dictionary/([^&/?]+)',
    "resources": {
        styles: ['merriamwebster.less']
    }
}, {
    'dictName': 'Merriam-webster Thesaurus',
    'windowUrl': 'https://www.merriam-webster.com/thesaurus/<word>',
    'windowUrlMatch': '/thesaurus/([^&/?]+)',
    "resources": {
        styles: ['merriamwebster.less']
    }
}, {
    'dictName': 'Merriam-webster Learner',
    'windowUrl': 'https://learnersdictionary.com/definition/<word>',
    'windowUrlMatch': '/definition/([^&/?]+)',
    "resources": {
        styles: ['merriamwebster-learner.less']
    }
}, {
    'dictName': 'Collins English Dictionary (汉化版)',
    'windowUrl': 'https://www.collinsdictionary.com/zh/dictionary/english/<word>',
    'fixSpaceInWords': '+',
    'windowUrlMatch': '/english/([^&/?]+)',
    "resources": {
        styles: ['collins.less']
    }
}, {
    'dictName': 'Collins English Thesaurus',
    'windowUrl': 'https://www.collinsdictionary.com/dictionary/english-thesaurus/<word>',
    'fixSpaceInWords': '+',
    'windowUrlMatch': '/english-thesaurus/([^&/?]+)',
    "resources": {
        styles: ['collins.less']
    }
}, {
    'dictName': 'Thesaurus.com',
    'windowUrl': 'https://www.thesaurus.com/browse/<word>',
    'windowUrlMatch': '/browse/([^&/?]+)',
    "resources": {
        styles: ['dictionary-com.less']
    }
}, {
    'dictName': "Lexico",
    'windowUrl': 'https://www.lexico.com/en/definition/<word>',
    'windowUrlMatch': '/definition/([^&/?]+)'
}, {
    'dictName': 'Dictionary.com',
    'windowUrl': 'https://www.dictionary.com/browse/<word>',
    'windowUrlMatch': '/browse/([^&/?]+)',
    "resources": {
        styles: ['dictionary-com.less']
    }
}, {
    'dictName': 'American Heritage Dictionary',
    'windowUrl': 'https://ahdictionary.com/word/search.html?q=<word>',
    'windowUrlMatch': '[^\\w]q=([^&]+)',
    "resources": {
        styles: ['ahdictionary.less']
    }
}, {
    'dictName': "thefreedictionary.com",
    'windowUrl': 'https://www.thefreedictionary.com/<word>',
    'windowUrlMatch': 'thefreedictionary.com/([^&/?]+)',
    "resources": {
        styles: ['thefreedictionary.less']
    }
}, {
    'dictName': "Green’s Dictionary of Slang",
    'windowUrl': 'https://greensdictofslang.com/search/basic?q=<word>',
    'windowUrlMatch': '[^\\w]q=([^&]+)',
    "resources": {
        styles: ['greensdictofslang.less']
    }
}, {
    'dictName': "Wiktionary",
    'windowUrl': 'https://en.m.wiktionary.org/wiki/<word>',
    'windowUrlMatch': 'wiki/([^&]+)',
    "resources": {
        styles: ['wiktionary.less']
    }
}, {
    'dictName': "WordReference",
    'windowUrl': 'https://www.wordreference.com/definition/<word>',
    'windowUrlMatch': 'definition/([^&]+)',
    "resources": {
        styles: ['wordreference.less']
    }
}, {
    'dictName': '欧陆词典',
    'entry': 'eudic',
    'windowUrl': 'https://dict.eudic.net/dicts/en/<word>',
    'windowUrlMatch': '/en/([^&/?]+)'
    "resources": {
        styles: ['eudic.less']
    }
}, {
    'dictName': '金山词霸',
    'windowUrl': 'http://www.iciba.com/<word>',
    'windowUrlMatch': 'iciba.com/([^&]+)',
    "resources": {
        styles: ['iciba.less']
    }
}, {
    'dictName': '有道词典',
    'entry': 'youdao',
    'windowUrl': 'http://dict.youdao.com/w/eng/<word>',
    'windowUrlMatch': '/eng/([^&/?]+)'
    "resources": {
        styles: ['youdao.less']
    }
}, {
    'dictName': '海词词典',
    'entry': 'dict-cn',
    'windowUrl': 'http://dict.cn/<word>',
    'windowUrlMatch': 'dict.cn/([^&/?]+)'
    "resources": {
        styles: ['dict-cn.less']
    }
}, {
    'dictName': '沪江词典',
    'entry': 'hjenglish',
    'windowUrl': 'https://dict.hjenglish.com/w/<word>',
    'windowUrlMatch': '/w/([^&/?]+)'
    "resources": {
        styles: ['hjenglish.less']
    }
}, {
    'dictName': '人人词典',
    'entry': '91dict',
    'windowUrl': 'http://www.91dict.com/words?w=<word>',
    'windowUrlMatch': '[^\\w]w=([^&]+)'
    "resources": {
        styles: ['91dict.less']
    }
}, {
    'dictName': '汉典',
    'entry': 'zdic',
    'windowUrl': 'https://www.zdic.net/hans/<word>',
    'windowUrlMatch': 'hans/([^&/?]+)'
    "resources": {
        styles: ['zdic.less']
    }
}, {
    'dictName': '百度词典（汉语）',
    'entry': 'baidu-dict',
    'windowUrl': 'https://dict.baidu.com/s?wd=<word>',
    'windowUrlMatch': '[^\\w]wd=([^&]+)'
    "resources": {
        styles: ['baidu-dict.less']
    }
}, {
    'dictName': 'JapanDict',
    'windowUrl': 'https://www.japandict.com/<word>',
    'windowUrlMatch': '.com/([^&/?]+)',
    "resources": {
        styles: ['japandict.less']
    }
}, {
    'dictName': 'Bab.la (Korean)',
    'windowUrl': 'https://en.bab.la/dictionary/korean-english/<word>',
    'windowUrlMatch': '/korean-english/([^&/?]+)',
    "resources": {
        styles: ['bab.la.less']
    }
}, {
    'dictName': 'Naver Dict (Korean)',
    'windowUrl': 'https://dict.naver.com/search.nhn?query=<word>&target=dic',
    'windowUrlMatch': '[^\\w]query=([^&]+)',
    "resources": {
        styles: ['naver.less']
    }
}, {
    'dictName': 'Naver Dict (Korean to English)',
    'windowUrl': 'https://en.dict.naver.com/#/search?range=all&query=<word>',
    'windowUrlMatch': '[^\\w]query=([^&]+)',
    "resources": {
        styles: ['naver.less']
    }, 
},  {
        'dictName': 'Naver Korean Resizable', 
        'windowUrl': 'https://ko.dict.naver.com/search.nhn?query=<word>&target=dic',
        'windowUrlMatch': '[^\\w]query=([^&]+)',
        'resources': {
            styles: ['naver-resizable.less']
    },
}]