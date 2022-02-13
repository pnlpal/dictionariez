import message from "./message.coffee"
import setting from "./setting.coffee"
import lookupParser from "./lookup-parser.coffee"


readClipboardText = () -> 
    try 
        text = await navigator.clipboard.readText()
        browser.runtime.sendMessage {
            text: text or '', 
            type: 'clipboard text'
        }
    catch err
        browser.runtime.sendMessage {
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
            message.on 'clipboard text', (request) ->
                setting.setValue('readClipboardError', undefined)
                return resolve(lookupParser.checkTypeOfSupport(request.text))
            
            message.on 'read clipboard text error', (request) -> 
                setting.setValue('enableReadClipboard', false)
                setting.setValue('readClipboardError', "Read clipboard failed: " + request.error);
                return reject()