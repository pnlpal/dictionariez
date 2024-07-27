import message from "./message.js"
import setting from "./setting.js"
import plainLookup from "./plain-lookup.coffee"
import utils from "utils"


export default (currentTab) ->
    return new Promise (resolve, reject) ->
        if not setting.getValue 'enableReadClipboard'
            return resolve()
        if not currentTab.url?.startsWith('http')
            return resolve()

        chrome.tabs.sendMessage(currentTab.id, { type: 'read clipboard text' })
        
        message.on 'clipboard text', (request) ->
            setting.setValue('readClipboardError', undefined)
            return resolve(plainLookup.checkTypeOfSupport(request.text))
        
        message.on 'read clipboard text error', (request) -> 
            setting.setValue('enableReadClipboard', false)
            setting.setValue('readClipboardError', "Read clipboard failed: " + request.error);
            return resolve()

        setTimeout resolve, 5000