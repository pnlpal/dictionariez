import $ from "jquery"
import dict from "./dict.coffee"
import message from "./message.coffee"
import storage from "./storage.coffee"
import setting from "./setting.coffee"
import utils from "utils"
import parsers from '../resources/dict-parsers.json'
import langs from '../resources/langs.json'

trimWordPos = (pos) ->
    pos = pos.toLowerCase()
    specials = ["adjective", "adverb", "interjection", "numeral", "article", "determiner"]
    
    if specials.includes(pos) 
        return pos.slice(0, 3)

    if pos.length > 4
        return pos.slice(0, 4)
    return pos 

setEnglishProns = (result) ->
    result.prons = [
        {
        "symbol": "US",
        "type": "ame",
        "synthesis": "en-US"
        },
        {
        "symbol": "UK",
        "type": "bre",
        "synthesis": "en-GB"
        }
    ]

class LookupParser 
    constructor: (@data) ->
        @typeCount = Object.keys(@data).length

        @otherSupportedLanguages = []
        for dictDesc in Object.values(@data)
            dictDesc.languages?.forEach (n) =>
                @otherSupportedLanguages.push n if not @otherSupportedLanguages.includes(n)
                
        setting.configCache.otherSupportedLanguages = @otherSupportedLanguages
        
    checkType: (w) ->
        for name, dictDesc of @data
            if dictDesc.supportEnglish
                return name if utils.isEnglish(w) and setting.getValue "enableLookupEnglish"
            if dictDesc.supportChinese
                return name if utils.isChinese(w) and setting.getValue "enableLookupChinese"
            
            if dictDesc.languages
                for lang in dictDesc.languages 
                    if w.match(new RegExp(langs[lang].regex, 'ug'))?.length == w.length \
                        and not setting.getValue("otherDisabledLanguages", []).includes(lang)
                        return name

    checkLangs: (w) ->
        res =  []
        for lang, n of langs 
            if w.match(new RegExp(n.regex, 'ug'))?.length == w.length \
            and not setting.getValue("otherDisabledLanguages", []).includes(lang)
                res.push lang 
        return res 

    parse: (w, tname) ->
        tname ?= @checkType(w)
        return unless tname 

        dictDesc = @data[tname]
        url = dictDesc.url.replace('<word>', w)

        # special handle Chinese
        if tname == 'google' and setting.getValue 'showChineseDefinition'
            url = url.replace 'hl=en-US', 'hl=zh-CN'

        try
            html = $(await $.ajax {url, timeout: 2000})
        catch err 
            if err.statusText == 'timeout' \
            and tname != 'bing' \
            and (utils.isEnglish(w) or utils.isChinese(w)) 
                return @parse(w, 'bing')
            console.error "Failed to parse: ", url, err 
            return  

        result = @parseResult html, dictDesc.result

        # special handle of bing when look up Chinese
        if tname == "bing"
            if utils.isChinese(w) 
                result.prons.push({'synthesis': 'zh-CN'})
            else 
                result.prons = result.prons.filter (n)->n.type != 'pinyin'
            
        if tname == 'google'
            if result.w 
                result.w = result.w.replaceAll '·', ''
            else 
                return @parse.call this, w, 'wiktionary'
            
            if result.langSymbol == 'en'
                setEnglishProns(result)
                if not setting.getValue "enableLookupEnglish"
                    result = null 

            else if result.langSymbol
                for lang, n of langs 
                    if n.symbol == result.langSymbol 
                        if lang in setting.getValue("otherDisabledLanguages")
                            result = null 
                        else 
                            synthesis = if n.synthesis? then n.synthesis else "#{result.langSymbol}-#{result.langSymbol.toUpperCase()}"
                            result.prons = [{
                                "symbol": result.langSymbol.toUpperCase(),
                                "synthesis": synthesis
                            }]

        if tname == 'wiktionary'
            for targetLang in result.langTargets
                if targetLang.lang 
                    if targetLang.lang in setting.getValue("otherDisabledLanguages") or not langs[targetLang.lang]
                        targetLang = null 
                    else 
                        if targetLang.lang == 'English'
                            setEnglishProns(targetLang)
                        else 
                            n = langs[targetLang.lang]
                            synthesis = if n.synthesis? then n.synthesis else "#{n.symbol}-#{n.symbol.toUpperCase()}"
                            targetLang.prons[0].synthesis = synthesis
                            if n.symbol
                                targetLang.prons[0].symbol = "#{n.symbol.toUpperCase()} #{targetLang.prons[0].symbol || ''}"

                        targetLang.w = result.w 

                        if targetLang.lang == 'Tajik' # merge Tajik
                            return @parseTajik w, targetLang
                        return targetLang
            
            # merge Tajik
            if @checkLangs(w).includes('Tajik')
                return @parseTajik w

            result = null 
        return result

    parseTajik: (w, wiktionaryResult) ->
        result = await @parse(w, 'Tajik')

        # wiktionary result is first.
        if wiktionaryResult and result.w != wiktionaryResult.w 
            return wiktionaryResult
        
        # merge 
        if wiktionaryResult?.defs
            result.defs2 = wiktionaryResult.defs 
        
        return result 


    parseResult: ($el, obj) ->
        result = {}
        for key, desc of obj
            if Array.isArray desc 
                result[key] = []
                result[key].push @parseResult($el, subObj) for subObj in desc
            else 
                $container = $el 
                if desc.container 
                    $container = $($el.find(desc.container).get(0))

                if desc.groups 
                    result[key] = []
                    $nodes = $container.find desc.groups 
                    if desc.extendPrev
                        $nodes = $nodes.map (i, n) -> 
                            _ctnr = $('<div></div>')
                            _ctnr.append $(n).clone() 

                            _p = $(n)
                            for i in [1..20] 
                                _p = _p.prev()
                                if (_p.is(desc.extendPrev))
                                    _ctnr.append _p.clone()
                                    return _ctnr
                            return _ctnr

                    if desc.extendNextTo 
                        $nodes = $nodes.map (i, n) -> 
                            _ctnr = $('<div></div>')
                            _ctnr.append $(n).clone()

                            _p = $(n)
                            for i in [1..20] 
                                _p = _p.next()
                                if (!_p.is(desc.extendNextTo))
                                    _ctnr.append _p.clone()
                                else
                                    return _ctnr 
                            return _ctnr 
                        

                    # Thai of Bab.la need to filter some related words
                    if desc.filterRelatedWord
                        firstWord = $nodes.find(desc.filterRelatedWord).get(0)?.innerText
                        $nodes = $nodes.filter (i, el) =>
                            $(el).find(desc.filterRelatedWord).text() == firstWord

                    $nodes.each (i, el) =>
                        if not $(el).parents(desc.groups).length  # hack: ignore groups inside another group
                            result[key].push @parseResult($(el), desc.result)
                        else 
                            console.log "Find the group inside another group, ignore: ", $(el).parents(desc.groups).length
                        
                else
                    value = @parseResultItem $container, desc

                    if value and key == 'pos'
                        value = trimWordPos value 

                    result[key] = value 

        return result 

    parseResultItem: ($node, desc) ->
        value = null

        $el = $node 
        if desc.selector
            $el = $node.find(desc.selector)
            if desc.singleParents 
                $el = $el.filter (idx, item)->
                    return $(item).parents(desc.singleParents).length == 1
            if desc.excludeChild 
                $el.find(desc.excludeChild).detach()

            if desc.parents 
                $el = $el.filter (idx, item)->
                    return $(item).parents(desc.parents).length >= 1

        if typeof desc == 'string'
            value = desc 
        else if desc.toArray 
            value = $el.toArray().map (item, idx) -> 
                text = item.innerText?.trim()
                if desc.includeArrayIndex and text
                    "#{idx+1}. " + item.innerText?.trim()
                else 
                    text
            if desc.max and value.length > desc.max 
                value = value.filter (item, i) -> i < 2

        else if desc.data
            value = $el.data(desc.data)
        else if desc.attr
            value = $el.attr(desc.attr)
        else if desc.htmlRegex
            value = $el.html()?.match(new RegExp(desc.htmlRegex))?[0]
        else
            value = $el.get(0)?.innerText?.trim()
        
        if desc.strFilter and value 
            value = value.replace new RegExp(desc.strFilter, 'g'), ''
        
        return value

test = () ->
    parser = new LookupParser(parsers)
    # parser.parse('most').then console.log 
    # parser.parse('自由').then console.log 
    # parser.parse('請').then console.log 
    # parser.parse('請う').then console.log 
    # parser.parse('あなた').then console.log 
    # parser.parse('장소').then console.log 
    # parser.parse('бештар').then console.log 
    # parser.parse('бо').then console.log 
    # parser.parse('ไทย').then console.log 
    parser.parse('elephant').then console.log 

# test()

export default {
    parser: new LookupParser(parsers),

    init: () ->
        # await @syncDictParsers()

        message.on 'check text supported', ({ w }) =>
            w = w.trim()
            return unless w

            return @parser.checkType(w)
        
        message.on 'look up plain', ({w, s, sc, sentence}) =>
            w = w.trim()
            return unless w

            storage.addHistory({
                w, s, sc, sentence
            }) if s  # ignore lookup from options page

            return @parser.parse(w) 

        message.on 'get real person voice', ({ w }) =>
            return @parser.parse(w, 'ldoce') if w.split(' ').length == 1  # ignore phrase
        message.on 'get english pron symbol', ({ w }) =>
            return @parser.parse(w, 'bing') if w.split(' ').length == 1 # ignore phrase
        
        message.on 'look up phonetic', ({ w, _counter }) =>
            { prons } = await @parser.parse(w, 'bing')
            for n in prons 
                if n.type == 'ame' and n.symbol
                    ame = n.symbol.replace('US', '').trim()
                    return { ame } 

    syncDictParsers: () ->
        errorResult = null 

        src = 'http://localhost:8000/dict-parsers.json'
        data = await $.getJSON(extraSrc).catch (err)->
                console.error "Get parsers remotely failed: ", err.status, err.statusText
                errorResult = { message: err.statusText, error: true }

        @parser = new LookupParser(data)
}
