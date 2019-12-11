import utils from "utils"
import setting from "./setting.coffee"

console.log "[message] init"

listeners = {}

chrome.runtime.onMessage.addListener (request, sender, sendResponse)->
    if request.type == 'getJson'
        utils.getJson(request.url, request.data).then ((res)->
            sendResponse(res)), sendResponse
    else if request.type == 'postJson'
        utils.postJson(request.url, request.data).then ((res)->
            sendResponse(res)), sendResponse

    else if request.type == 'setting'
        sendResponse setting.configCache

    else if request.type == 'save setting'
        setting.setValue(request.key, request.value)

    else if request.type == 'open options'
        url = chrome.extension.getURL('options.html')
        if request.to
            url += "##{request.to}"
        window.open url, 'dictionaries-options'

    else if request.type in Object.keys(listeners)
        ret = listeners[request.type](request, sender)
        if ret?.then
            ret.catch (err) ->
                console.error "[message] #{request.type} failed: ", err, request
            .then sendResponse

        else if ret?
            sendResponse ret

    # sendResponse becomes invalid when the event listener returns,
    # unless you return true from the event listener to indicate you wish to send a response asynchronously
    return true


export default {
    on: (type, callback) ->
        listeners[type] = callback
}