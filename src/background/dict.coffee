import $ from 'jquery'
import storage from  "./storage.coffee"
import message from "./message.coffee"
import defaultDicts from "./default-dicts.coffee"

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
        @allDicts = allDicts   

    addToDictionariez: (d) ->
        locDict = @allDicts.find (d1) ->
            d1.dictName == d.dictName 

        if locDict
            Object.assign locDict, d
            d = locDict
        else 
            d.sequence = @allDicts.length
            @allDicts.push d
        
        storage.setAllByK 'dict-', 'dictName', [d]
    
    restoreDefaultDicts: () ->
        added = []

        defaultDicts.forEach (d, oi) =>
            if @allDicts.find (d1) -> d1.dictName == d.dictName 
                return  # ignore existing ones 

            d.sequence = oi
            
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
        dictEnabled = @allDicts.filter (d) -> not d.disabled
        i = dictEnabled.findIndex (d) -> d.dictName == dictName
        if i >= 0 and i < dictEnabled.length - 1
            return dictEnabled[i + 1]
        else
            return dictEnabled[0]

    getPreviousDict: (dictName) ->
        dictEnabled = @allDicts.filter (d) -> not d.disabled
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
        @allDicts.find (d) ->
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
        if dict.fixSpaceInWords
            word = word.replace(/\s+/g, dict.fixSpaceInWords)
        return dfd.resolve {windowUrl: dict.windowUrl.replace('<word>', word)}
}