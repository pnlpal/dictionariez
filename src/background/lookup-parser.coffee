import $ from "jquery"
import dict from "./dict.coffee"
import message from "./message.coffee"
import storage from "./storage.coffee"
import setting from "./setting.coffee"
import utils from "utils"
import parsers from '../resources/dict-parsers.json'
import langs from '../resources/langs.json'
import stringSimilarity from 'string-similarity'

trimWordPos = (pos) ->
    pos = pos.toLowerCase()
    specials = ["adjective", "adverb", "interjection", "numeral", "article", "determiner"]
    
    if specials.includes(pos) 
        return pos.slice(0, 3)

    if pos.length > 4
        return pos.slice(0, 4)
    return pos 

virtualDom = undefined

$clean = (html) ->
    # To let jQuery parse HTML without loading resources.
    # see: https://stackoverflow.com/questions/15113910/jquery-parse-html-without-loading-images
    virtualDom ?= document.implementation.createHTMLDocument('virtual')
    return $(html, virtualDom)

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
        
    isLangDisabled: (lang) ->
        setting.getValue("otherSupportedLanguages", []).includes(lang) \
            && setting.getValue("otherDisabledLanguages", []).includes(lang)

    checkType: (w) ->
        if utils.isEnglish(w) and setting.getValue "enableLookupEnglish"
            return setting.getValue "englishLookupSource" # google, bing, wiktionary

        if utils.hasKorean(w) and setting.getValue "enableLookupKorean"
            return setting.getValue "koreanLookupSource" # google, wiktionary, naver (korean only)

        for name, dictDesc of @data
            if dictDesc.supportChinese
                return name if utils.isChinese(w) and setting.getValue "enableLookupChinese"
            
            if dictDesc.languages
                for lang in dictDesc.languages 
                    if w.match(new RegExp(langs[lang].regex, 'ug'))?.length == w.length \
                        and not @isLangDisabled(lang)
                        return name

    checkLangs: (w) ->
        res =  []
        for lang, n of langs 
            if w.match(new RegExp(n.regex, 'ug'))?.length == w.length \
            and not @isLangDisabled(lang)
                res.push lang 
        return res 

    load: (url, credentials='omit') ->
        utils.promiseInTime(fetch(url, {
            method: 'GET', 
            credentials,
        }), 5000)
        .then((resp) -> 
            if not resp.ok
                err = new Error(resp.statusText) 
                err.status = resp.status
                throw err

            return resp.text()
        )
        .then($clean)

    loadJson: (url, credentials) ->
        utils.promiseInTime(fetch(url, {
            method: 'GET', 
            credentials
        }), 5000)
        .then((resp) -> 
            if not resp.ok
                err = new Error(resp.statusText) 
                err.status = resp.status
                throw err

            return resp.json()
        )

    parse: (w, tname, prevResult, url) ->
        tname ?= @checkType(w)
        return unless tname 

        dictDesc = @data[tname]
        url = (url or dictDesc.url).replace('<word>', w)

        # special handle Chinese
        if tname == 'google' 
            if setting.getValue('showOtherLang')
                url = url.replace 'hl=en-US', 'hl='+setting.getValue('otherLang')

        try
            if tname == "naver"
                json = await @loadJson url, dictDesc.credentials
            else
                html = await @load url, dictDesc.credentials
        catch err 
            if err.message == 'timeout' \
                and tname != 'wiktionary' \
                and utils.isEnglish(w)
                return @parse(w, 'wiktionary')

            else if (err.status == 404 \
                and tname == 'wiktionary' \
                and (not url.includes('sv.wiktionary.org')) \
                and @checkLangs(w).includes('Swedish')) 
                return @parse(w, 'wiktionary', prevResult, url.replace('en.wiktionary.org', 'sv.wiktionary.org'))

            console.error "Failed to parse: ", url, err.message
            return prevResult

        if tname == "naver"
            result = @parseNaver json, dictDesc.result
        else
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
                result.lang = 'English'
                setEnglishProns(result)
                if not setting.getValue "enableLookupEnglish"
                    result = null 

            else if result.langSymbol == 'ko'
                result.lang = 'Korean'
                if not setting.getValue "enableLookupKorean"
                    result = null

            else if result.langSymbol
                for lang, n of langs 
                    if n.symbol == result?.langSymbol and result
                        result.lang = lang 

                        if @isLangDisabled(lang)
                            result = null 
                        else 
                            synthesis = if n.synthesis? then n.synthesis else "#{result.langSymbol}-#{result.langSymbol.toUpperCase()}"
                            result.prons = [{
                                "symbol": result.langSymbol.toUpperCase(),
                                "synthesis": synthesis
                            }]

            # parse the second language if possible.
            possibleLangs = @checkLangs(w).filter((l) -> l != result?.lang)
            if possibleLangs.length
                return @parse w, 'wiktionary', result 


        if tname == 'wiktionary'
            multipleResult = []
            if prevResult
                multipleResult.push prevResult

            for targetLang in (result.langTargets || [])
                if targetLang.lang 
                    if prevResult?.lang == targetLang.lang && prevResult.w == w 
                        continue 

                    # Special handle for Norwegian on Wiktionary
                    # see https://en.wiktionary.org/wiki/bl%C3%A5kval#Norwegian
                    if targetLang.lang.includes('Norwegian')
                        targetLang.lang = 'Norwegian'
                    
                    if targetLang.lang == 'Svenska'
                        targetLang.lang = 'Swedish'

                    if @isLangDisabled(targetLang.lang) or not langs[targetLang.lang]
                        targetLang = null 
                    else if targetLang.lang == 'English' and not setting.getValue "enableLookupEnglish"
                        targetLang = null
                    else if targetLang.lang == 'Korean' and not setting.getValue "enableLookupKorean"
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

                        if targetLang.lang == 'Tajik'
                            return @parseOtherLang w, 'Tajik', targetLang, prevResult

                        if targetLang.lang == 'Indonesian' 
                            return @parseOtherLang w, 'Indonesian', targetLang, prevResult

                        # use followWord fist, then try optionalFollowWord
                        if targetLang.defs?.length >= 1 and targetLang.defs[0].followWord and !prevResult
                            return @parse targetLang.defs[0].followWord, 'wiktionary', targetLang
                        else if targetLang.defs?.length >= 1 and targetLang.defs[0].optionalFollowWord and !prevResult
                            if stringSimilarity.compareTwoStrings(w, targetLang.defs[0].optionalFollowWord) > 0.7
                                return @parse targetLang.defs[0].optionalFollowWord, 'wiktionary', targetLang

                        multipleResult.push targetLang if multipleResult.length < 3
                        
            
            if !multipleResult.length
                # merge Tajik
                if @checkLangs(w).includes('Tajik')
                    return @parseTajik w

                upperFirst = utils.toUpperFirst w 
                if !result and upperFirst != w and html.find("a[href='/wiki/#{upperFirst}']").get(0)
                    return @parse(upperFirst, 'wiktionary')

            return multipleResult

        return result

    parseOtherLang: (w, lang, wiktionaryResult, prevResult) ->
        result = await @parse(w, lang)

        # wiktionary result is first.
        if wiktionaryResult and result.w != wiktionaryResult.w 
            return wiktionaryResult
        
        # merge 
        if not result?.defs?.length
            result.defs = wiktionaryResult.defs 
        
        if not result?.prons?[0]?.symbol and wiktionaryResult.prons?.length
            result.prons = wiktionaryResult.prons
        
        return if prevResult then [prevResult, result] else result 

    parseNaver: (json, obj) ->
        result = {}
        definitions = json.searchResultMap.searchResultListMap.WORD.items

        result['langSymbol'] = 'ko'
        result['defs'] = []

        for explanation in definitions
            newDef = {}
            entry = explanation.expEntry.replace(/(<([^>]+)>)/gi, "")
            meansCollector = explanation.meansCollector[0]

            newDef['def'] = []

            count = 1
            for def in meansCollector.means
                pretty_value = def.value.replace(/(<([^>]+)>)/gi, "")

                if meansCollector.means.length != 1
                    pretty_value = count.toString() + ". " + def.value.replace(/(<([^>]+)>)/gi, "")

                if count == 1
                    pretty_value = entry + ": " + pretty_value

                count += 1
                newDef['def'].push pretty_value

            result['defs'].push newDef

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
                            _ctnr = $clean('<div></div>')
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
                            _ctnr = $clean('<div></div>')
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
            value = $el.toArray().map((item) -> item.innerText?.trim()).filter((x) -> x)
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
    # parser.parse('배').then console.log # this example is here because 배 has a lot of different definitions
    # parser.parse('бештар').then console.log 
    # parser.parse('бо').then console.log 
    # parser.parse('ไทย').then console.log 
    parser.parse('anhållen').then console.log 

# test()

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
