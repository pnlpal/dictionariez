import setting from "./setting.js"
import storage from  "./storage.js"
import dict from "./dict.coffee"
import message from "./message.js"
import readClipboard from "./clipboard.coffee"
import utils from "utils"

export default {
    word: '',
    sentence: '',
    dictName: '',

    lookup: ({ w, s, sc, sentence, languagePrompt, screen, dictName } = {}) ->
        storage.addHistory { w, s, sc, sentence } if w and s and w.split(/\s/).length <= 3  # ignore lookup from options page

        @word = w || @word
        @sentence = sentence || @sentence
        @dictName = dictName || @dictName || setting.getValue('dictionary')
        setting.setValue 'dictionary', @dictName

        if @word
            result = await dict.query(@word, @dictName) 
            utils.send 'look up result', { 
                word: @word, 
                dictName: @dictName, 
                sentence: @sentence,
                languagePrompt,
                ...result 
            }
            
            return result


    init: () ->
        if not setting.getValue "disableContextMenu"
            chrome.contextMenus.create {
                id: "lookup",
                title: "Look up '%s' in SidePal",
                contexts: ["selection"],
            }
            

        message.on "copy event triggered", ({s, sc, sentence}, sender) => 
            w = await readClipboard(sender.tab)
            if w
                @lookup({ w, s, sc, sentence })

        message.on 'look up', ({ dictName, w, s, sc, sentence, means, newDictWindow }, sender) =>
            # 'look up' can be triggered by the context menu or the hotkey or any webpages or in the options page
            if means == 'mouse'
                if not setting.getValue('enableMinidict')
                    return

            if !w 
                w = await readClipboard(sender.tab)

            if w 
                if w.split(/\s/).length > 3 and 
                @dictName?.toLowerCase().indexOf('translate') == -1 and 
                @dictName?.toLowerCase().indexOf('deepl') == -1
                    return
               
            @lookup({ w: w?.trim(), s, sc, sentence, dictName })
            

        message.on 'query', (request, sender) =>
            # query message only comes from the dict window.
            dictName = request.dictName || @dictName
            w = request.w || @word
            languagePrompt = w?.split(" /")[1]
            w = w?.split(" /")[0]
            sentence = request.sentence
            
            if request.nextDict
                dictName = dict.getNextDict(dictName).dictName
            else if request.previousDict
                dictName = dict.getPreviousDict(dictName).dictName
            else if request.dictNumber 
                d = dict.getDictByNumber(request.dictNumber)
                return if not d 
                dictName = d.dictName
            
            if request.previousWord
                prev = await storage.getPrevious(w)
                w = prev?.w
                sentence = prev?.sentence
            else if request.nextWord
                next = await storage.getNext(w, true)
                w = next?.w 
                sentence = next?.sentence
            else if w and w.split(/\s/).length <= 3
                storage.addHistory { w, sentence } 

            return @lookup({ w, sentence, languagePrompt, dictName })
                            
        message.on 'dictionary', (request, sender) =>
            currentDictName = @dictName || setting.getValue('dictionary')
            currentDictName = dict.getDict(currentDictName).dictName
            
            if @word 
                wordDetail = await storage.getWordDetail(@word)
                r = wordDetail?.r
                previous = wordDetail?.previous
                { windowUrl } = await dict.query(@word, currentDictName) 
            else 
                previous = await storage.getPrevious()
                    
            history = await storage.getHistory(10) # at most show 10 words in the history list on dictionary header.

            nextDictName = dict.getNextDict(currentDictName).dictName
            previousDictName = dict.getPreviousDict(currentDictName).dictName
            
            return { allDicts: dict.allDicts, history, currentDictName, nextDictName, previousDictName, previous, w: @word, r, windowUrl }
        
        message.on 'dictionary history', (request, sender) =>
            history = await storage.getHistory(10) # at most show 8 words in the history list on dictionary header.
            return { history }

        message.on 'injected', (request, sender) =>
            fromSidePanel = sender.id and !sender.tab
            if fromSidePanel
                return {
                    isInDict: true,
                    cardUrl: chrome.runtime.getURL('card.html'),
                    dict: dict.getDict(@dictName),
                    word: @word,
                    sentence: @sentence 
                }
          


        message.on 'sendToDict', ( request, sender ) =>
            @getByTab(sender.tab.id)?.sendMessage request

        message.on 'get wikipedia', ( request, sender ) =>
            return if not @word 
            
            if utils.isEnglish @word 
                return utils.loadJson "https://en.m.wikipedia.org/api/rest_v1/page/summary/" + @word
            else if utils.isChinese(@word) and setting.getValue "enableLookupChinese"
                return utils.loadJson "https://zh.wikipedia.org/api/rest_v1/page/summary/" + @word
            else if utils.isJapanese @word
                return utils.loadJson "https://ja.wikipedia.org/api/rest_v1/page/summary/" + @word

        message.on 'card setting', ( { sys, origin } ) =>
            if sys == 'wiki' 
                disabled = setting.getValue 'disableWikipediaCard'
            
            s = setting.getValue 'minimalCards'
            minimal = s.includes(sys)

            return { disabled, minimal }

        message.on 'card minimal', ( { sys, minimal } ) =>
            s = setting.getValue 'minimalCards'
            arr = s.split(',').filter (n) -> n != sys 
            if minimal
                arr.push sys 
            setting.setValue 'minimalCards', arr.join(',')

}