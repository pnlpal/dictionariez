import $ from "jquery"

export default {
        configCache: {
            windowWidth: 580,
            windowHeight: 700,

            enableSelectionOnMouseMove: false,
            enableSelectionSK1: true,
            selectionSK1: 'Meta',

            enablePlainLookup: true,
            enableAmeAudio: false,
            enableBreAudio: false,
            enablePlainSK1: false,
            plainSK1: 'Meta',

            enableMinidict: false,
            enableMouseSK1: false,
            mouseSK1: 'Ctrl',
            openSK1: 'Ctrl',
            openSK2: 'Shift'
            openKey: 'X',

            browserActionType: 'openDictWindow',

            prevDictSK1: 'Ctrl',
            prevDictKey: 'ArrowLeft',
            nextDictSK1: 'Ctrl',
            nextDictKey: 'ArrowRight',
            prevHistorySK1: 'Alt',
            prevHistoryKey: 'ArrowLeft',
            nextHistorySK1: 'Alt',
            nextHistoryKey: 'ArrowRight',
            dictionary: ''
        }

        init: ()->
            new Promise (resolve) =>
                chrome.storage.sync.get 'config', (obj)=>
                    if obj?.config
                        @configCache = obj.config
                    resolve(@configCache)

        setValue: (key, value)->
            if @configCache[key] != value
                @configCache[key] = value
                chrome.storage.sync.set({config: @configCache})
            return value

        getValue: (key, defaultValue)->
            v = @configCache[key]
            v ?= defaultValue
            return v

}
