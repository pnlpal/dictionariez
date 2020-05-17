import $ from 'jquery'
import storage from  "./storage.coffee"
import message from "./message.coffee"

allDicts = [{
    'dictName': "Bing Dict (必应词典)",
    'windowUrl': 'https://cn.bing.com/dict/search?mkt=zh-cn&q=<word>', # must has mkt 
    'windowUrlMatch': '[^\\w]q=([^&]+)',
    "resources": {
        styles: ['bing.less']
    }
}, {
    'dictName': 'Oxford Learner',
    'entry': 'OxfordLearner',
    'windowUrl': 'https://www.oxfordlearnersdictionaries.com/definition/english/<word>'
    'windowUrlMatch': '/english/([^&/?]+)'
    "resources": {
        styles: ['oxfordlearner.less']
    }
}, {
    'dictName': 'Oxford Living',
    'entry': 'Oxfordliving',
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
    'dictName': 'Longman English'
    'entry': 'LongmanEnglish'
    'windowUrl': 'https://www.ldoceonline.com/dictionary/<word>'
    'windowUrlMatch': '/dictionary/([^&/?]+)',
    "resources": {
        styles: ['longmanenglish.less']
    }
}, {
    'dictName': 'Urban Dictionary',
    'windowUrl': 'https://www.urbandictionary.com/define.php?term=<word>',
    'windowUrlMatch': '[^\\w]term=([^&]+)',
    "resources": {
        styles: ['urban.less']
    }
}, {
    'dictName': 'Dictionary.com',
    'windowUrl': 'https://www.dictionary.com/browse/<word>',
    'windowUrlMatch': '/browse/([^&/?]+)',
    "resources": {
        styles: ['dictionary-com.less']
    }
}, {
    'dictName': 'Thesaurus.com',
    'windowUrl': 'https://www.thesaurus.com/browse/<word>',
    'windowUrlMatch': '/browse/([^&/?]+)',
    "resources": {
        styles: ['dictionary-com.less']
    }
}, {
    'dictName': 'Macmilland Dictionary',
    'windowUrl': 'https://www.macmillandictionary.com/dictionary/british/<word>',
    'windowUrlMatch': '/british/([^&/?]+)',
    "resources": {
        styles: ['macmilland.less']
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
    'dictName': 'Collins English Dictionary',
    'windowUrl': 'https://www.collinsdictionary.com/dictionary/english/<word>',
    'windowUrlMatch': '/english/([^&/?]+)',
    "resources": {
        styles: ['collins.less']
    }
}, {
    'dictName': 'Collins English Thesaurus',
    'windowUrl': 'https://www.collinsdictionary.com/dictionary/english-thesaurus/<word>',
    'windowUrlMatch': '/english-thesaurus/([^&/?]+)',
    "resources": {
        styles: ['collins.less']
    }
}, {
    'dictName': "Lexico",
    'windowUrl': 'https://www.lexico.com/en/definition/<word>',
    'windowUrlMatch': '/definition/([^&/?]+)'
}, {
    'dictName': 'American Heritage Dictionary',
    'windowUrl': 'https://ahdictionary.com/word/search.html?q=<word>',
    'windowUrlMatch': '[^\\w]q=([^&]+)',
    "resources": {
        styles: ['ahdictionary.less']
    }
}, {
    'dictName': "vocabulary.com",
    'windowUrl': 'https://www.vocabulary.com/dictionary/<word>',
    'windowUrlMatch': '/dictionary/([^&/?]+)',
    "resources": {
        styles: ['vocabulary.less']
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
    'dictName': '金山词霸',
    'windowUrl': 'http://www.iciba.com/<word>',
    'windowUrlMatch': 'iciba.com/([^&]+)',
    "resources": {
        styles: ['iciba.less']
    }
    # 'entry': 'Iciba',
    # 'baseUrl': 'http://dict-co.iciba.com/api/dictionary.php',
    # 'queryType': 'get',
    # 'params': {
    #     'key': '0AAE477DB66EC58D12E1451877045CA5'
    # },
    # 'queryKey': 'w'
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
    'dictName': '欧陆词典',
    'entry': 'eudic',
    'windowUrl': 'https://dict.eudic.net/dicts/en/<word>',
    'windowUrlMatch': '/en/([^&/?]+)'
    "resources": {
        styles: ['eudic.less']
    }
}, {
    'dictName': '汉典',
    'entry': 'zdic',
    'windowUrl': 'https://www.zdic.net/search/?c=3&q=<word>',
    'windowUrlMatch': '[^\\w]q=([^&]+)'
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
    'windowUrlMatch': '.com/([^&/?]+)'
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
    }
}, {
    'dictName': 'Bab.la (Korean)',
    'windowUrl': 'https://en.bab.la/dictionary/korean-english/<word>',
    'windowUrlMatch': '/korean-english/([^&/?]+)',
    "resources": {
        styles: ['bab.la.less']
    }
}]



export default {
    setting: undefined,
    init: () ->
        @setting ?= await storage.get('dictionary-setting', {})
        allDicts.forEach (d, oi) =>
            s = @setting[d.dictName]
            d.sequence = oi
            if s
                d.sequence = s.sequence if s.sequence?
                d.disabled = s.disabled if s.disabled?
        allDicts.sort (a, b) -> a.sequence - b.sequence

        message.on 'set-dictionary-reorder', ({ dicts }) =>
            dicts.forEach (d) =>
                @setting[d.dictName] ?= {}
                @setting[d.dictName].sequence = d.sequence

            allDicts.sort (a, b) -> a.sequence - b.sequence
            @saveSetting()

        message.on 'set-dictionary-disable', ({ dictName, disabled }) =>
            @setting[dictName] ?= {}
            @setting[dictName].disabled = disabled

            @saveSetting()

    saveSetting: ()->
        @init()  # update allDicts list
        storage.set {'dictionary-setting': @setting}

    allDicts: allDicts,

    getDict: (dictName) ->
        dict = allDicts.find (d)->
            d.dictName == dictName
        return dict or allDicts[0]

    getNextDict: (dictName) ->
        dictEnabled = allDicts.filter (d) -> not d.disabled
        i = dictEnabled.findIndex (d) -> d.dictName == dictName
        if i >= 0 and i < dictEnabled.length - 1
            return dictEnabled[i + 1]
        else
            return dictEnabled[0]

    getPreviousDict: (dictName) ->
        dictEnabled = allDicts.filter (d) -> not d.disabled
        i = dictEnabled.findIndex (d) -> d.dictName == dictName
        if i > 0 and i <= dictEnabled.length - 1
            return dictEnabled[i - 1]
        else
            return dictEnabled[dictEnabled.length - 1]

    getDictResources: (dictName)->
        dict = @getDict(dictName)
        if dict.windowUrl
            # web dict
            return dict.resources

    getDictFromOrigin: (origin) ->
        allDicts.find (d) ->
            d.windowUrl?.includes(origin)

    getWordFromUrl: (url, dictName)->
        dict = @getDict dictName
        if dict?.windowUrlMatch
            m = new RegExp(dict.windowUrlMatch)
            s = url?.match(m)?[1]
            if s
                s = s.replace(/[+_]/g, ' ')
                return decodeURI(s)
        return

    query: (word, dictName)->
        dfd = $.Deferred()
        dict = @getDict(dictName)
        params = $.extend(true, {}, dict.params)
        params[dict.queryKey] = word if dict.queryKey
        url = dict.baseUrl if dict.baseUrl
        url = dict.headerUrl + encodeURI(word) if dict.headerUrl
        if url
            return $[dict.queryType || 'get'](url, params, null, 'text').then (res)=>
                return {html: @['parse' + dict.entry](res)}
        else if dict.windowUrl
            return dfd.resolve {windowUrl: dict.windowUrl.replace('<word>', word)}
        else
            return dfd.resolve({html: @['parse' + dict.entry](word)})

    queryWordPain: (word) ->
        url = "http://xtk.azurewebsites.net/BingDictService.aspx?Word=#{word}&Samples=false"
        return $.get(url)

    parseAonaware: (text)->
        xml = $.parseXML(text)
        return '<pre>' + $('Definitions WordDefinition', xml).text() + '</pre>'
    parseIciba: (text)->
        d = $(document.createElement('div'))
        xml = $.parseXML(text)
        d.append('<h4></h4>')
        $('ps', xml).each (index, el)->
            t = $(el).text()
            audio = $(el).next('pron').text()
            n = '<span class="pron">' + t + '&nbsp<i class="fa fa-volume-up sound"></i>' + '<audio src="' + audio + '"></audio>&nbsp&nbsp&nbsp&nbsp' + '</span>'
            $('h4', d).append(n)

        $('pos', xml).each (i, el)->
            m = $(el).next('acceptation').text()
            s = '<p>' + $(el).text() + '<b>' + m + '</b>' + '</p>'
            d.append(s)

        $('orig, fy', xml).each (i, el)->
            m = $(el).next('trans').text()
            s = '<p class="example"><i class="fa fa-coffee"></i>' + $(el).text() + '</p>'
            s2 = '<p>' + m + '</p>'
            d.append(s)
            d.append(s2)

        return d.html()

    parseWebster: (text)->
        wrapper = $(document.createElement('div'))
        wrapper.addClass('webster')
        xml = $.parseXML(text)
        $('entry', xml).each (index, entry)->
            entryId = $(entry).attr('id')
            wrapper.append('<div entry="' + entryId + '"> </div>')
            d = $('div[entry]', wrapper).last()

            pro = $('pr', entry).text()

            soundEl = $('sound', entry)
            audio = $('wav', soundEl).text()
            wpr = $('wpr', soundEl).text()

            baseUrl = 'http://media.merriam-webster.com/soundc11/'
            subp = audio[0]
            ms = audio.match(/^bix|^gg|^\d+/)
            if ms
                subp = ms[0]

            url = baseUrl + subp + '/' + audio


            n = '<h4><b>' +entryId+
                '</b>' +
                '<span class="pron">' + pro +
                '&nbsp<i class="fa fa-volume-up sound"></i>' +
                '<audio src="' + url + '"></audio>&nbsp' + wpr +
                '&nbsp&nbsp&nbsp&nbsp</span></h4>'
            d.append(n)

            et = $('et', entry).html()
            n2 = '<p>'+et+'</p>'
            d.append(n2)

            $(entry).children('def').each (j, defEl)->
                vt = $('vt', defEl).text()
                date = $('date', defEl).text()
                d.append('<p>'+vt+', '+date + '</p>')
                $('sn', defEl).each (k, snEl)->
                    sntext = $(snEl).nextUtil('sn').text()
                    d.append('<p>'+sntext+'</p>')

        return wrapper.htm()
}