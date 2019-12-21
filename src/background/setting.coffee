import $ from "jquery"
import _ from 'lodash'

export default {
        configCache: {
            windowWidth: 580,
            windowHeight: 700,

            enableSelectionOnMouseMove: true,
            enableSelectionSK1: true,
            selectionSK1: 'Shift'

            enableLookupEnglish: true,
            enableLookupChinese: true,
            enableLookupJapanese: false,

            enablePlainLookup: true,
            enableAmeAudio: true,
            enableBreAudio: true,
            enablePlainSK1: false,
            plainSK1: 'Ctrl',

            enableMinidict: false,
            enableMouseSK1: false,
            mouseSK1: 'Alt',

            openSK1: 'Ctrl',
            openSK2: 'Shift',
            openKey: 'X',

            openOptionSK1: 'Ctrl',
            openOptionSK2: 'Shift',
            openOptionKey: 'D',

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
                        @configCache = _.merge @configCache, obj.config
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

        clear: () ->
            new Promise (resolve) ->
                chrome.storage.sync.remove 'config', resolve

}
