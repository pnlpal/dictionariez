import message from "./message.coffee"
import setting from "./setting.coffee"


readClipboardText = () -> 
    try 
        text = await navigator.clipboard.readText()
        chrome.runtime.sendMessage {
            text, 
            type: 'clipboard text'
        }
    catch err
        chrome.runtime.sendMessage {
            error: err.message,
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
                return resolve(request.text)
            
            message.on 'read clipboard text error', (request) -> 
                setting.setValue('enableReadClipboard', false)
                setting.setValue('readClipboardError', "Read clipboard failed: " + request.error);
                return reject()