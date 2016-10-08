jQuery(document).mouseup (event)->
    if event.which == 1 and window.getSelection().toString()
        chrome.runtime.sendMessage({
            type: 'look up',
            means: 'mouse',
            text: window.getSelection().toString()
        })

chrome.runtime.sendMessage {
    type: 'setting',
}, (setting)->
    jQuery(document).bind 'keyup', (event)->
        if utils.checkEventKey event, setting.openSK1, setting.openSK2, setting.openKey
            chrome.runtime.sendMessage({
                type: 'look up',
                means: 'keyboard',
                text: window.getSelection().toString()
            })

