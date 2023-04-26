import $ from 'jquery'
import storage from  "./storage.coffee"
import message from "./message.coffee"
import defaultDicts from "./default-dicts.coffee"

chatgptDefault = {
    "windowUrl": "https://chat.openai.com",
    "css": "body {margin-top: 50px !important;}",
    "inputSelector": "main form textarea",
    "submitButtonSelector": "main form textarea+button"
}

export default {
    setting: undefined,
    allDicts: [],

    init: () ->
        await @initAllDicts()
        
        message.on 'set-dictionary-reorder', ({ dictMap }) =>
            changed = [] 

            @allDicts.forEach (d) =>
                s = dictMap[d.dictName] 
                if s 
                    Object.assign d, s 
                    changed.push d 
            
            @allDicts.sort (a, b) -> a.sequence - b.sequence

            storage.setAllByK 'dict-', 'dictName', changed 

        message.on 'dictionary-remove', ({ dictName }) =>
            i = @allDicts.findIndex (d)-> d.dictName == dictName 
            if i >=0 
                @allDicts.splice(i, 1)

            storage.remove ('dict-'+dictName)
        
        message.on 'dictionary-add', ({ dict }) =>
            @addToDictionariez dict 

        message.on 'restore-default-dicts', () =>
            @restoreDefaultDicts()
        
    initAllDicts: () ->
        allDicts = await storage.getAllByK 'dict-'
        
        if not allDicts.length 
            # get dicts from default and old settings 
            dictSettings = await storage.get('dictionary-setting', {})
            storage.remove 'dictionary-setting'

            extraDicts = await storage.get('extra-dicts', [])
            storage.remove 'extra-dicts'

            defaultDicts.forEach (d, oi) =>
                s = dictSettings[d.dictName]
                d.sequence = oi
                if s
                    Object.assign d, s 

                d = Object.assign {}, chatgptDefault, d if d.chatgptPrompt
                allDicts.push d 
            
            extraDicts.forEach (d)=>
                locDict = allDicts.find (d1) ->
                    d1.dictName == d.dictName 

                if locDict
                    Object.assign locDict, d
                else 
                    d.sequence = allDicts.length
                    allDicts.push d
            
            storage.setAllByK 'dict-', 'dictName', allDicts

        allDicts.sort (a, b) -> a.sequence - b.sequence

        allDicts.forEach (d, oi) => 
            d.sequence = oi 

        @allDicts = allDicts   

    addToDictionariez: (d) ->
        locDict = @allDicts.find (d1) ->
            d1.dictName == d.dictName 

        if locDict
            Object.assign locDict, d
            d = locDict
        else 
            d.sequence = @allDicts.length
            d = Object.assign {}, chatgptDefault, d if d.chatgptPrompt
            @allDicts.push d
        
        storage.setAllByK 'dict-', 'dictName', [d]
    
    restoreDefaultDicts: () ->
        added = []

        defaultDicts.forEach (d, oi) =>
            currentDict = @allDicts.find (d1) -> d1.dictName == d.dictName 
            if currentDict 
                Object.assign currentDict, d, (if d.chatgptPrompt then chatgptDefault else null)
                return  # ignore existing ones 

            d.sequence = oi
            d = Object.assign {}, chatgptDefault, d if d.chatgptPrompt
            @allDicts.push d 
            added.push d 

        if added.length
            @allDicts.sort (a, b) -> a.sequence - b.sequence
            storage.setAllByK 'dict-', 'dictName', added 

    getDict: (dictName) ->
        dict = @allDicts.find (d)->
            d.dictName == dictName
        return dict or @allDicts[0]

    getNextDict: (dictName) ->
        i = @allDicts.findIndex (d) -> d.dictName == dictName
        if i >= 0 and i < @allDicts.length - 1
            return @allDicts[i + 1]
        else
            return @allDicts[0]

    getPreviousDict: (dictName) ->
        i = @allDicts.findIndex (d) -> d.dictName == dictName
        if i > 0 and i <= @allDicts.length - 1
            return @allDicts[i - 1]
        else
            return @allDicts[@allDicts.length - 1]

    getDictByNumber: (n) ->
        if n == 9
            return @allDicts[@allDicts.length-1]
        return @allDicts[n-1]

    query: (word, dictName)->
        dfd = $.Deferred()
        dict = @getDict(dictName)
        if dict.fixSpaceInWords
            word = word.replace(/\s+/g, dict.fixSpaceInWords)

        if dict.windowUrl
            windowUrl = dict.windowUrl.replace('<word>', word)
        else if dict.chatgptPrompt 
            windowUrl = 'https://chat.openai.com/'

        return dfd.resolve { windowUrl }
    
    searchDicts: (key) ->
        results = []
        for dict in @allDicts
            if dict.dictName.toLowerCase().startsWith(key)
                results.push(dict)
            else if dict.windowUrl
                domain = dict.windowUrl.match(/:\/\/([^\/\?]+)/)[1]
                domain = domain.replace(/^www\.|^dict\.|^dictionary\.|^m\.|\.m\./, '')
                domains = domain.split('.')
                domains.pop()

                domains.forEach (s)->
                    if s.toLowerCase().startsWith(key)
                        results.push(dict)
                
            
            if results.length >= 3
                break

        return results
}