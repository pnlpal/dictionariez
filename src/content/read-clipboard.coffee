export initClipboardReader = () -> 
    chrome.runtime.onMessage.addListener (request, sender, sendResponse)->
        # console.log(request)
        if request.type == 'read clipboard text'
            try 
                text = await navigator.clipboard.readText()
                chrome.runtime.sendMessage {
                    text: text or '', 
                    type: 'clipboard text'
                }
            catch err
                chrome.runtime.sendMessage {
                    error: err?.message or "not supported on this browser.",
                    type: 'read clipboard text error'
                }