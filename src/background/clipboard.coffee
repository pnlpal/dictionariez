import message from "./message.coffee"
import setting from "./setting.coffee"
import lookupParser from "./lookup-parser.coffee"


readClipboardText = () -> 
    if navigator.userAgent.toLowerCase().indexOf('firefox') == -1
        brw = chrome
    else 
        brw = browser
    try 
        text = await navigator.clipboard.readText()
        brw.runtime.sendMessage {
            text: text or '', 
            type: 'clipboard text'
        }
    catch err
        brw.runtime.sendMessage {
            error: err?.message or "not supported on this browser.",
            type: 'read clipboard text error'
        }

export default () ->
    return new Promise (resolve, reject) ->
        if not setting.getValue 'enableReadClipboard'
            return resolve()
        
        chrome.tabs.executeScript {
            code: "(#{readClipboardText.toString()})()"
        }, (res) =>
            if not res and navigator.userAgent.toLowerCase().indexOf('firefox') == -1
                return resolve()

            message.on 'clipboard text', (request) ->
                setting.setValue('readClipboardError', undefined)
                return resolve(lookupParser.checkTypeOfSupport(request.text))
            
            message.on 'read clipboard text error', (request) -> 
                setting.setValue('enableReadClipboard', false)
                setting.setValue('readClipboardError', "Read clipboard failed: " + request.error);
                return resolve()