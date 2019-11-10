import utils from "utils"
import setting from "./setting.coffee"
import ext from "./ext.coffee"
import storage from  "./storage.coffee"
import dict from "./dict.coffee"
import dictWindow from "./dictwindow.coffee"


console.log "[message] init"

listeners = {}

chrome.runtime.onMessage.addListener (request, sender, sendResponse)->
    if request.type == 'getJson'
        utils.getJson(request.url, request.data).then ((res)->
            sendResponse(res)), sendResponse
    else if request.type == 'postJson'
        utils.postJson(request.url, request.data).then ((res)->
            sendResponse(res)), sendResponse
    else if request.type == 'look up'
        if request.means == 'mouse'
            if not setting.getValue('enableMinidict')
                return true

        dictWindow.lookup(request.text)

    # else if request.type == 'look up pain'
        # dict.queryWordPain(request.text).then sendResponse, sendResponse

    else if request.type == 'query'
        setting.setValue('dictionary', request.dictionary) if request.dictionary
        dictWindow.queryDict(request.w, request.dictionary).then (result) ->
            storage.addHistory {w: request.w, s: request.s, sc: request.sc}
            previous = storage.getPrevious(request.w)
            sendResponse { result, previous }

    else if request.type == 'dictionary'
        dictionary = dictWindow.dictName
        w = dictWindow.word
        previous = storage.getPrevious(w)
        sendResponse { allDicts: dict.allDicts, dictionary, previous, w }

    else if request.type == 'setting'
        sendResponse setting.configCache

    else if request.type == 'save setting'
        setting.setValue(request.key, request.value)
        if request.key == 'enableMinidict'
            ext.setBrowserIcon request.value

    else if request.type == 'rating'
        storage.addRating request.text, request.value

    else if request.type == 'deleteHistory'
        storage.deleteHistory(request.text)

    else if request.type == 'injected'
        if dictWindow.tid == sender.tab.id or request.url.includes('bing.com/dict')
            dictName = dict.getDictFromOrigin(request.origin)?.dictName
            if dictName
                dictWindow.dictName = dictName
                word = dict.getWordFromUrl request.url, dictName
                if word
                    dictWindow.word = word
                    console.log "Injected in #{word} of #{dictName}"

            sendResponse {
                isDict: dictWindow.tid == sender.tab.id,
                dictUrl: chrome.extension.getURL('dict.html'),
                dict: dict.getDict(setting.getValue('dictionary'))
            }

    else if request.type == 'dict init'
        # dictWindow.onContentInjected(request.url, sender.tab.id)
        sendResponse {
            word: dictWindow.word
        }

    else if request.type == 'open options'
        chrome.tabs.create({url: chrome.extension.getURL('options.html')})

    else if request.type in Object.keys(listeners)
        ret = listeners[request.type](request, sendResponse)
        if ret?.then
            ret.then sendResponse
        else
            sendResponse ret

    # sendResponse becomes invalid when the event listener returns,
    # unless you return true from the event listener to indicate you wish to send a response asynchronously
    return true


export default {
    on: (type, callback) ->
        listeners[type] = callback
}