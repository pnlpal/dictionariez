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

        return if utils.hasEnglish(w) && w.length == 1

        # accept one hyphen in the middle, but not other punctuation signs
        return if w.replace('-', '').match(/[,:;'"-?!.]/) 

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
            return setting.getValue "englishLookupSource" # bing, bingCN, wiktionary

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
            if w and setting.getValue 'enableRealPron'
                return @parse(sender.tab.id, w.replaceAll('·', ''), 'ldoce') if w.split(' ').length == 1  # ignore phrase

    parse: (tabId, w, tname, prevResult, url) ->
        tname ?= @checkType(w)
        return unless tname 

        dictDesc = parserDescs[tname]
        url = (url or dictDesc.url).replace('<word>', w)

        try
            html = await utils.loadHTML url, dictDesc.credentials
        catch err 
            if err.message == 'timeout' \
                and tname != 'wiktionary' \
                and utils.isEnglish(w)
                return @parse(tabId, w, 'wiktionary')
            else if tname == 'bing'
                return @parse(tabId, w, 'wiktionary', prevResult)

            else if err.status == 404 \
                and tname == 'wiktionary'
                if (not url.includes('sv.wiktionary.org')) \
                    and @checkLangs(w).includes('Swedish') 
                    return @parse(tabId, w, 'wiktionary', prevResult, url.replace('en.wiktionary.org', 'sv.wiktionary.org'))
                else if (not url.includes('de.wiktionary.org')) \
                    and @checkLangs(w).includes('German')
                    return @parse(tabId, w, 'wiktionary', prevResult, url.replace('en.wiktionary.org', 'de.wiktionary.org'))
                else if @checkLangs(w).includes('Tajik')
                    return @parseOtherLang tabId, w, 'Tajik', null, prevResult
                else if @checkLangs(w).includes('Indonesian')
                    return @parseOtherLang tabId, w, 'Indonesian', null, prevResult
            
    
            console.error "Failed to parse: ", url, err.message
            return prevResult

        result = await utils.sendToTab tabId, { type: 'parse lookup result', html, parserDesc: dictDesc.result }

        # special handle of bing when look up Chinese
        if tname == "bingCN"
            if utils.isChinese(w) 
                result.prons?.push({'synthesis': 'zh-CN'})
            else 
                result.prons = result.prons?.filter (n)->n.type != 'pinyin'

        # add American pronunciation to English
        if tname == 'bing' 
            # Bing only supports English and has only British pronunciation.
            result.lang = 'English'
            result.prons?.push({
                "symbol": "US",
                "type": "ame",
                "synthesis": "en-US"
            })
            # parse the second language if possible.
            possibleLangs = @checkLangs(w).filter((l) -> l != result?.lang)
            if possibleLangs.length
                return @parse(tabId, w, 'wiktionary', if result.w then result else null)

            
        if tname == 'wiktionary'
            multipleResult = []
            if prevResult
                multipleResult.push prevResult

            for targetLang in (result.langTargets || [])
                if targetLang.lang 
                    if prevResult?.lang == targetLang.lang && (prevResult.w == w or prevResult.w?.replaceAll('·', '') == w)
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
                        followWords = targetLang.defs?.map((n) -> n.followWord).filter((n) -> n)
                        followWords = [...new Set(followWords)] # remove duplicate
                        optionalFollowWord = targetLang.defs?[0]?.optionalFollowWord
                        if followWords?.length and !prevResult
                            if followWords[0] != w
                                followWordResults_0 = await @parse(tabId, followWords[0], 'wiktionary', targetLang)
                            if followWords[1] and followWords[1] != w
                                followWordResults_1 = await @parse(tabId, followWords[1], 'wiktionary', targetLang)

                        if optionalFollowWord and !prevResult
                            if optionalFollowWord != w and !followWords.includes(optionalFollowWord) and stringSimilarity.compareTwoStrings(w, optionalFollowWord) > 0.7
                                optionalFollowWordResults = await @parse(tabId, optionalFollowWord, 'wiktionary', targetLang)

                        multipleResult.push targetLang if multipleResult.length < 3

                        # merge the followWords result.
                        multipleResult.push followWordResults_0[1] if followWordResults_0?.length > 1 and multipleResult.length < 3
                        multipleResult.push followWordResults_1[1] if followWordResults_1?.length > 1 and multipleResult.length < 3
                        multipleResult.push optionalFollowWordResults[1] if optionalFollowWordResults?.length > 1 and multipleResult.length < 3
                        
            
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
        if wiktionaryResult and result?.w != wiktionaryResult.w 
            return wiktionaryResult
        
        # merge 
        if not result?.defs?.length
            result.defs = wiktionaryResult.defs 
        
        if not result?.prons?[0]?.symbol and wiktionaryResult?.prons?.length
            result.prons = wiktionaryResult.prons
        
        return if prevResult then [prevResult, result] else result 
}
