define ["jquery",
    "utils"], ($, utils)->
    console.log "[dict] init"

    allDicts = [{
        'dictName': '金山词霸',
        'entry': 'Iciba',
        'baseUrl': 'http://dict-co.iciba.com/api/dictionary.php',
        'queryType': 'get',
        'params': {
            'key': '0AAE477DB66EC58D12E1451877045CA5'
        },
        'queryKey': 'w'
    }, {
        'dictName': '海词词典',
        'entry': 'DictCN'
    }, {
        'dictName': 'Easton\'s 1897 Bible Dictionary',
        'entry': 'Aonaware',
        'baseUrl': 'http://services.aonaware.com/DictService/DictService.asmx/DefineInDict',
        'queryType': 'post',
        'params': {
            'dictId': 'easton'
        },
        'queryKey': 'word'
    }, {
        'dictName': "必应词典",
        'windowUrl': 'http://cn.bing.com/dict/search?q=<word>',
        'windowUrlMatch': '[^\\w]q=([^&]+)',
        "resources": {
            styles: ['css/bing.css']
        }
    }, {
        'dictName': 'Urban Dictionary',
        'windowUrl': 'http://zh.urbandictionary.com/define.php?term=<word>',
        'windowUrlMatch': '[^\\w]term=([^&]+)',
        "resources": {
            styles: ['css/urban.css']
        }
    }, {
        'dictName': 'dictionary.com',
        'windowUrl': 'http://www.dictionary.com/browse/<word>',
        'windowUrlMatch': 'browse/([^&?]+)',
        "resources": {
            styles: ['css/dictionary-com.css']
        }
    }]

    dictManager =
        allDicts: allDicts,
        getDict: (dictName)->
            dict = allDicts.find (d)->
                d.dictName == dictName
            return dict or allDicts[0]

        getDictResources: (dictName)->
            dict = @getDict(dictName)
            if dict.windowUrl
                # web dict
                return dict.resources

        getWordFromUrl: (url, dictName)->
            dict = @getDict(dictName)
            if dict.windowUrlMatch
                m = new RegExp(dict.windowUrlMatch)
                s = url?.match(m)?[1]
                if s
                    s = s.replace(/\+/g, ' ')
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

        parseDictCN: (word)->
            src = "http://dict.cn/mini.php?q=" + word
            frameStr = '<iframe src="' + src + '"></iframe>'
            return frameStr

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


    return dictManager
