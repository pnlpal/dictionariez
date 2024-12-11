import dict from "./dict.coffee"
import message from "./message.js"
import storage from "./storage.js"
import setting from "./setting.js"
import utils from "utils"
import parserDescs from '../resources/dict-parsers.json'
import langs from '../resources/langs.json'
import stringSimilarity from 'string-similarity'



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

export default {
    checkTypeOfSupport: (w) ->
        w = w.trim()
        return unless w
        return if utils.isSentence(w)
        
        # ignore one or two punctuation signs in the end
        w = w.replace(/[,:;'"-?!.]{1,2}$/, '')

        if @checkType(w)
            return w

    isLangDisabled: (lang) ->
        setting.getValue("otherSupportedLanguages", []).includes(lang) \
            && setting.getValue("otherDisabledLanguages", []).includes(lang)
    
    checkLangs: (w) ->
        res =  []
        for lang, n of langs 
            if w.match(new RegExp(n.regex, 'ug'))?.length == w.length \
            and not @isLangDisabled(lang)
                res.push lang 
        return res 

    checkType: (w) ->
        if utils.isEnglish(w) and setting.getValue "enableLookupEnglish"
            return setting.getValue "englishLookupSource" # google, bing, wiktionary

        if utils.hasKorean(w) and setting.getValue "enableLookupKorean"
            return setting.getValue "koreanLookupSource" # google, wiktionary, naver (korean only)

        for name, dictDesc of parserDescs
            if dictDesc.supportChinese
                return name if utils.isChinese(w) and setting.getValue "enableLookupChinese"
            
            if dictDesc.languages
                for lang in dictDesc.languages 
                    if w.match(new RegExp(langs[lang].regex, 'ug'))?.length == w.length \
                        and not @isLangDisabled(lang)
                        return name

    init: () ->
        @typeCount = Object.keys(parserDescs).length
        @otherSupportedLanguages = []
        for dictDesc in Object.values(parserDescs)
            dictDesc.languages?.forEach (n) =>
                @otherSupportedLanguages.push n if not @otherSupportedLanguages.includes(n)
                
        setting.configCache.otherSupportedLanguages = @otherSupportedLanguages

        message.on 'check text supported', ({ w }) =>
            return @checkTypeOfSupport(w)

        message.on 'look up plain', ({w, s, sc, sentence}, sender) =>
            w = w.trim().toLowerCase()
            return unless w

            storage.addHistory({
                w, s, sc, sentence
            }) if s  # ignore lookup from options page

            return @parse(sender.tab.id, w) 

        message.on 'get real person voice', ({ w }, sender) =>
            if setting.getValue 'enableRealPron'
                return @parse(sender.tab.id, w, 'ldoce') if w.split(' ').length == 1  # ignore phrase

        message.on 'get english pron symbol', ({ w }, sender) =>
            if setting.getValue "enableUSUKPron"
                return @parse(sender.tab.id, w, 'bing') if w.split(' ').length == 1 # ignore phrase
        
        message.on 'look up phonetic', ({ w, _counter }, sender) =>
            { prons } = await @parse(sender.tab.id, w, 'bing')
            for n in prons 
                if n.type == 'ame' and n.symbol
                    ame = n.symbol.replace('US', '').trim()
                    return { ame } 
            return {}

    parse: (tabId, w, tname, prevResult, url) ->
        tname ?= @checkType(w)
        return unless tname 

        dictDesc = parserDescs[tname]
        url = (url or dictDesc.url).replace('<word>', w)

        # console.log "Look up #{w} from #{tname} with url: #{url}"

        # special handle Chinese
        if tname == 'google' 
            if setting.getValue('showOtherLang')
                url = url.replace 'hl=en-US', 'hl='+setting.getValue('otherLang')

        try
            if tname == "naver"
                json = await utils.loadJson url, dictDesc.credentials
            else
                html = await utils.loadHTML url, dictDesc.credentials
        catch err 
            if err.message == 'timeout' \
                and tname != 'wiktionary' \
                and utils.isEnglish(w)
                return @parse(tabId, w, 'wiktionary')

            else if (err.status == 404 \
                and tname == 'wiktionary' \
                and (not url.includes('sv.wiktionary.org')) \
                and @checkLangs(w).includes('Swedish')) 
                return @parse(tabId, w, 'wiktionary', prevResult, url.replace('en.wiktionary.org', 'sv.wiktionary.org'))
            
            else if tname == 'google'
                return @parse(tabId, w, 'wiktionary', prevResult)
            
            console.error "Failed to parse: ", url, err.message
            return prevResult

        if tname == "naver"
            result = @parseNaver json, dictDesc.result
        else
            result = await utils.sendToTab tabId, { type: 'parse lookup result', html, parserDesc: dictDesc.result }

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
                return @parse(tabId, w, 'wiktionary')
            
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
                return @parse(tabId, w, 'wiktionary', result)


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
                            return @parseOtherLang tabId, w, 'Tajik', targetLang, prevResult

                        if targetLang.lang == 'Indonesian' 
                            return @parseOtherLang tabId, w, 'Indonesian', targetLang, prevResult

                        # use followWord fist, then try optionalFollowWord
                        if targetLang.defs?.length >= 1 and targetLang.defs[0].followWord and !prevResult
                            return @parse(tabId, targetLang.defs[0].followWord, 'wiktionary', targetLang)
                        else if targetLang.defs?.length >= 1 and targetLang.defs[0].optionalFollowWord and !prevResult
                            if stringSimilarity.compareTwoStrings(w, targetLang.defs[0].optionalFollowWord) > 0.7
                                return @parse(tabId, targetLang.defs[0].optionalFollowWord, 'wiktionary', targetLang)

                        multipleResult.push targetLang if multipleResult.length < 3
                        
            
            if !multipleResult.length
                # merge Tajik
                if @checkLangs(w).includes('Tajik')
                    return @parseOtherLang tabId, w, 'Tajik', null, prevResult

                upperFirst = utils.toUpperFirst w 
                if !result and upperFirst != w and html.find("a[href='/wiki/#{upperFirst}']").get(0)
                    return @parse(tabId, upperFirst, 'wiktionary')

            return multipleResult

        return result

    parseOtherLang: (tabId, w, lang, wiktionaryResult, prevResult) ->
        result = await @parse(tabId, w, lang)

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
}
