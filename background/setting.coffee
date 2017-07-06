define ["jquery",
    "utils"], ($, utils)->

    setting =
        configCache: {
            windowWidth: 630,
            windowHeight: 700,
            enablePlainLookup: true,
            enableAmeAudio: false,
            enableBreAudio: false,
            browserActionType: 'enableMinidict',
            enableMinidict: true,
            enableMouseSK1: false,
            mouseSK1: 'Ctrl',
            openSK1: 'Ctrl',
            openSK2: 'Shift'
            openKey: 'X',
            prevDictSK1: 'Ctrl',
            prevDictKey: 'ArrowLeft',
            nextDictSK1: 'Ctrl',
            nextDictKey: 'ArrowRight',
            prevHistorySK1: 'Alt',
            prevHistoryKey: 'ArrowLeft',
            nextHistorySK1: 'Alt',
            nextHistoryKey: 'ArrowRight'
            dictionary: ''
        }

        init: ()->
            dfd = $.Deferred()
            chrome.storage.sync.get @configCache, (obj)=>
                @configCache = obj
                chrome.storage.sync.set(obj)
                dfd.resolve(obj)

            return dfd

        setValue: (key, value)->
            if @configCache[key] != value
                @configCache[key] = value
                chrome.storage.sync.set(@configCache);
            return value

        getValue: (key, defaultValue)->
            v = @configCache[key]
            v ?= defaultValue
            return v

    return setting
