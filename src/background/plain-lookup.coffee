import dict from "./dict.coffee"
import message from "./message.js"
import storage from "./storage.js"
import setting from "./setting.js"
import utils from "utils"
import parserDescs from '../resources/dict-parsers.json'
import langs from '../resources/langs.json'
import stringSimilarity from 'string-similarity'
import * as OpenCC from 'opencc-js/cn2t';

cnConverter = null
convertCn2T = (result) ->
    if not cnConverter 
        cnConverter = OpenCC.Converter({ from: 'cn', to: 'tw' })
    result.defs?.forEach ({def}) -> 
        def?.forEach (text, i) -> 
            def[i] = cnConverter(text)
    result.w = cnConverter(result.w)

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
        if lang == 'English' and not setting.getValue "enableLookupEnglish"
            return true
        if lang == 'Chinese' and not setting.getValue "enableLookupChinese"
            return true
        return setting.getValue("otherDisabledLanguages", []).includes(lang)
    
    checkLangs: (w) ->
        res =  []
        for lang, n of langs 
            if w.match(new RegExp(n.regex, 'ug'))?.length == w.length \
            and not @isLangDisabled(lang)
                res.push lang 
        return res 

    checkType: (w) ->
        if utils.isEnglish(w) and setting.getValue "enableLookupEnglish"
            return setting.getValue "englishLookupSource" # google, bingCN, wiktionary

        for name, dictDesc of parserDescs
            if dictDesc.supportChinese
                return name if utils.isChinese(w) and setting.getValue "enableLookupChinese"
            
            if dictDesc.languages
                for lang in dictDesc.languages 
                    if w.match(new RegExp(langs[lang].regex, 'ug'))?.length == w.length \
                        and not @isLangDisabled(lang)
                        return name

    fallbackDictFromGoogle: (w) -> # fallback to other dict if Google failed
        for name, dictDesc of parserDescs
            if name == 'google'
                continue
            if dictDesc.supportChinese
                return name if utils.isChinese(w) and setting.getValue "enableLookupChinese"
            
            if dictDesc.languages
                for lang in dictDesc.languages 
                    if w.match(new RegExp(langs[lang].regex, 'ug'))?.length == w.length \
                        and not @isLangDisabled(lang)
                        return name
        return 'wiktionary'

    init: () ->
        @typeCount = Object.keys(parserDescs).length
        @otherSupportedLanguages = []
        for dictDesc in Object.values(parserDescs)
            dictDesc.languages?.forEach (n) =>
                if process.env.PRODUCT == "Ordböcker"
                    if n == 'Swedish'
                        @otherSupportedLanguages.push n if not @otherSupportedLanguages.includes(n)
                    else 
                        setting.configCache.otherDisabledLanguages.push n if not setting.configCache.otherDisabledLanguages.includes(n)
                else 
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
        possibleLangs = @checkLangs(w)

        if tname == 'google' and possibleLangs.length > 0 and possibleLangs[0] != 'English'
                # prioritize other languages over English
                langDesc = langs[possibleLangs[0]]
                url = url.replace 'hl=en', 'hl=' + langDesc.synthesis if langDesc.synthesis 

        try
            html = await utils.loadHTML url, dictDesc.credentials
        catch err 
            if err.message == 'timeout' \
                and utils.isEnglish(w) and not prevResult
                return @parse(tabId, w, if tname == 'wiktionary' then 'google' else 'wiktionary')
            else if tname == 'google' and not prevResult
                return @parse(tabId, w, @fallbackDictFromGoogle(w), prevResult)

            else if err.status == 404 \
                and tname == 'wiktionary'
                if (url.includes('en.wiktionary.org')) \
                    and possibleLangs.includes('Swedish') 
                    return @parse(tabId, w, 'wiktionary', prevResult, url.replace(/\w+.wiktionary.org/, 'sv.wiktionary.org'))
                else if (not url.includes('de.wiktionary.org')) \
                    and possibleLangs.includes('German')
                    return @parse(tabId, w, 'wiktionary', prevResult, url.replace(/\w+.wiktionary.org/, 'de.wiktionary.org'))
                else if possibleLangs.includes('Tajik')
                    return @parseOtherLang tabId, w, 'Tajik', null, prevResult
                else if possibleLangs.includes('Indonesian')
                    return @parseOtherLang tabId, w, 'Indonesian', null, prevResult
            
    
            console.error "Failed to parse: ", url, err.message
            return prevResult

        result = await utils.sendToTab tabId, { type: 'parse lookup result', html, parserDesc: dictDesc.result }
        # console.log "parse:", w, "from:", tname, "result:", result
        # fallback to wiktionary if google failed
        if tname == 'google' && (!result?.w || !result?.defs?.length)
            return prevResult if prevResult
            return @parse(tabId, w, @fallbackDictFromGoogle(w), prevResult)

        # fix prons and lang for google result 
        if tname == 'google'
            for lang, n of langs
                if n.symbol == result.langSymbol || n.aternative == result.langSymbol 
                    if @isLangDisabled(lang)
                        return @parse(tabId, w, @fallbackDictFromGoogle(w), prevResult)
                    result.lang = lang 
                    detectedPron = result.prons[0]
                    if !detectedPron.audio and result.langSymbol
                        detectedPron.type = n.symbol 
                        detectedPron.synthesis = n.synthesis
                        
                    else if detectedPron.type == 'bre' 
                        detectedPron.symbol = "#{detectedPron.symbol || ''} UK"
        
        # check other possible languages in fallback dict like wiktionary
        if tname == 'google' and possibleLangs.length > 1
            return @parse(tabId, w, @fallbackDictFromGoogle(w), result)
            
        # special handle of bing when look up Chinese
        if tname == "bingCN"
            if utils.isChinese(w) 
                result.prons?.push({'synthesis': 'zh-CN'})
                convertCn2T(result) if setting.getValue 'enableConvertCn2T'
            else 
                result.prons = result.prons?.filter (n)->n.type != 'pinyin'
                result.lang ?= 'English'
                # parse the second language if possible.
                otherPossibleLangs = possibleLangs.filter((l) -> l != result?.lang)
                if otherPossibleLangs.length and not prevResult
                    return @parse(tabId, w, @fallbackDictFromGoogle(w), if result.w then result else null)

            
        if tname == 'wiktionary'
            multipleResult = []
            if Array.isArray(prevResult)
                multipleResult = prevResult

            if result?.langTargets?.length > 1
                result.langTargets.sort (a, b) ->
                    if ['english', 'engelska'].includes(b.lang?.toLowerCase()) then -1
                    else if ['english', 'engelska'].includes(a.lang?.toLowerCase()) then 1
                    else 0

            for targetLang in (result?.langTargets || [])
                if targetLang.lang 
                    if prevResult?.lang == targetLang.lang
                        continue 
                    if prevResult?.length # parse following words
                        if targetLang.lang != prevResult[0].lang # ignore if lang is not the same.
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

                        multipleResult.push targetLang
                        await @parseFollowWordsOnWiktionary tabId, w, targetLang, multipleResult
            
            if prevResult?.w
                multipleResult.push prevResult

            if !multipleResult.length
                # merge Tajik
                if possibleLangs.includes('Tajik')
                    return @parseOtherLang tabId, w, 'Tajik', null, prevResult

                upperFirst = utils.toUpperFirst w 
                if !result and upperFirst != w and html.find("a[href='/wiki/#{upperFirst}']").get(0)
                    return @parse(tabId, upperFirst, 'wiktionary', prevResult)

            return multipleResult

        return result

    parseFollowWordsOnWiktionary: (tabId, w, targetLang, multipleResult) -> 
        # use followWord fist, then try optionalFollowWord
        followWords = targetLang.defs?.map((n) -> n.followWord).filter((n) -> n)
        followWords = [...new Set(followWords)] # remove duplicate
        optionalFollowWord = targetLang.defs?[0]?.optionalFollowWord
        isUniqueWord = (word) -> 
            word && w != word && multipleResult.every (n) -> n.w?.replaceAll('·', '') != word

        if followWords?.length and multipleResult.length < 5
            if isUniqueWord(followWords[0]) and followWords[0][0] == w[0]
                await @parse(tabId, followWords[0], 'wiktionary', multipleResult)
            if isUniqueWord(followWords[1]) and followWords[1][0] == w[0]
                await @parse(tabId, followWords[1], 'wiktionary', multipleResult)

        if optionalFollowWord and multipleResult.length < 5
            if isUniqueWord(optionalFollowWord) and stringSimilarity.compareTwoStrings(w, optionalFollowWord) > 0.7
                await @parse(tabId, optionalFollowWord, 'wiktionary', multipleResult)


    parseOtherLang: (tabId, w, lang, wiktionaryResult, prevResult) ->
        result = await @parse(tabId, w, lang)

        # wiktionary result is first.
        if wiktionaryResult and result?.w != wiktionaryResult.w 
            return wiktionaryResult
        
        # merge 
        if not result?.defs?.length and wiktionaryResult?.defs
            result.defs = wiktionaryResult.defs 
        
        if not result?.prons?[0]?.symbol and wiktionaryResult?.prons?.length
            result.prons = wiktionaryResult.prons
        
        return if prevResult then [prevResult, result] else result 
}
