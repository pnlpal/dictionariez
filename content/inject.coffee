jQuery(document).mouseup (event)->
    if event.which == 1 and window.getSelection().toString()
        chrome.runtime.sendMessage({
            type: 'look up',
            means: 'mouse',
            text: window.getSelection().toString()
        })


chrome.runtime.sendMessage {
    type: 'keySettings',
}, (datas)->
    jQuery(document).bind 'keydown', (event)->
        b = true
        jQuery.each datas.specialKeys.split(','), (i, v)->
            if !event[v + 'Key']
                b = false

        if event.keyCode != datas.normalKey.charCodeAt(0)
            b = false
        if b
            chrome.runtime.sendMessage({
                type: 'look up',
                means: 'keyboard',
                text: window.getSelection().toString()
            })

