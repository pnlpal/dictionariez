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
    result.prons = result.prons.concat [
        {
        "symbol": "UK",
        "type": "bre",
        "synthesis": "en-GB"
        },
        {
        "symbol": "US",
        "type": "ame",
        "synthesis": "en-US"
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
        if utils.isEnglish(w) and setting.getValue "enableLookupEnglish"
            return setting.getValue "englishLookupSource" # google, bing, wiktionary

        for name, dictDesc of @data
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

    load: (url, credentials='omit') ->
        utils.promiseInTime(fetch(url, {
            method: 'GET', 
            credentials,
        }), 5000)
        .then((resp) -> 
            throw new Error(resp.status) if not resp.ok
            return resp.text()
        )
        .then((html) -> 
            # To let jQuery parse HTML without loading resources.
            # see: https://stackoverflow.com/questions/15113910/jquery-parse-html-without-loading-images
            virtualDom = document.implementation.createHTMLDocument('virtual')
            return $(html, virtualDom)
        )

    parse: (w, tname, prevResult) ->
        console.log "STARTED PARSING WORD #{w}"
        tname ?= @checkType(w)
        return unless tname 

        dictDesc = @data[tname]
        url = dictDesc.url.replace('<word>', w)
        console.log "USING URL #{url}"

        # special handle Chinese
        if tname == 'google' 
            if setting.getValue('showOtherLang')
                url = url.replace 'hl=en-US', 'hl='+setting.getValue('otherLang')

        try
            html = await @load url, dictDesc.credentials
        catch err 
            if (err.statusText or err.message) == 'timeout' \
            and tname != 'wiktionary' \
            and utils.isEnglish(w)
                return @parse(w, 'wiktionary')
            console.error "Failed to parse: ", url, err 
            return  


        console.log "GOT HTML #{JSON.stringify(html)}"
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
                    # Special handle for Norwegian on Wiktionary
                    # see https://en.wiktionary.org/wiki/bl%C3%A5kval#Norwegian
                    if targetLang.lang.includes('Norwegian')
                        targetLang.lang = 'Norwegian'

                    if targetLang.lang in setting.getValue("otherDisabledLanguages") or not langs[targetLang.lang]
                        targetLang = null 
                    else if targetLang.lang == 'English' and not setting.getValue "enableLookupEnglish"
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

                        if targetLang.defs?.length == 1 and targetLang.defs[0].followWord and !prevResult
                            return @parse targetLang.defs[0].followWord, 'wiktionary', targetLang

                        return if prevResult then [prevResult, targetLang] else targetLang
            
            # merge Tajik
            if @checkLangs(w).includes('Tajik')
                return @parseTajik w


            upperFirst = utils.toUpperFirst w 
            if upperFirst != w and html.find("a[href='/wiki/#{upperFirst}']").get(0)
                return @parse(upperFirst, 'wiktionary')

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
        console.log "STARTED PARSING RESULT OF OBJ: #{JSON.stringify(obj)}"
        console.log "$el is: #{JSON.stringify($el)}"
        result = {}
        for key, desc of obj
            if Array.isArray desc 
                console.log "IS ARRAY!"
                result[key] = []
                result[key].push @parseResult($el, subObj) for subObj in desc
            else 
                console.log "NOT ARRAY"
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
                    console.log "PARSERESULT VALUE IS: #{value}"

                    if value and key == 'pos'
                        value = trimWordPos value 

                    result[key] = value 

        return result 

    parseResultItem: ($node, desc) ->
        console.log "PARSING RESULT ITEM"
        value = null

        $el = $node 
        if desc.selector or desc.selector1
            if desc.selector1
                $el = $node.find(desc.selector1)
                if not $el.length 
                    $el = $node.find(desc.selector)
            else 
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
    parser.parse('장소').then console.log 
    # parser.parse('бештар').then console.log 
    # parser.parse('бо').then console.log 
    # parser.parse('ไทย').then console.log 
    # parser.parse('elephant').then console.log 

test()

export default {
    parser: new LookupParser(parsers),

    checkTypeOfSupport: (w) ->
        w = w.trim()
        return unless w
        return if w.split(/\s/).length > 3

        # ignore one or two punctuation signs in the end
        w = w.replace(/[,:;'"-?!.]{1,2}$/, '')

        if @parser.checkType(w)
            return w

    init: () ->
        message.on 'check text supported', ({ w }) =>
            return @checkTypeOfSupport(w)

        message.on 'look up plain', ({w, s, sc, sentence}) =>
            w = w.trim().toLowerCase()
            return unless w

            storage.addHistory({
                w, s, sc, sentence
            }) if s  # ignore lookup from options page

            return @parser.parse(w) 

        message.on 'get real person voice', ({ w }) =>
            if setting.getValue 'enableRealPron'
                return @parser.parse(w, 'ldoce') if w.split(' ').length == 1  # ignore phrase

        message.on 'get english pron symbol', ({ w }) =>
            if setting.getValue "enableUSUKPron"
                return @parser.parse(w, 'bing') if w.split(' ').length == 1 # ignore phrase
        
        message.on 'look up phonetic', ({ w, _counter }) =>
            { prons } = await @parser.parse(w, 'bing')
            for n in prons 
                if n.type == 'ame' and n.symbol
                    ame = n.symbol.replace('US', '').trim()
                    return { ame } 
}
