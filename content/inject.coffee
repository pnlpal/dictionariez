console.log "[inject] init"

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

    jQuery(document).mouseup (event)->
        selObj = window.getSelection()
        return unless selObj.toString()

        # issue #4
        including = jQuery(event.target).has(selObj.focusNode).length or jQuery(event.target).is(selObj.focusNode)
        if event.which == 1 and including
            if !setting.enableMouseSK1 or (setting.mouseSK1 and utils.checkEventKey(event, setting.mouseSK1))
                chrome.runtime.sendMessage({
                    type: 'look up',
                    means: 'mouse',
                    text: window.getSelection().toString()
                })


chrome.runtime.sendMessage {
    type: 'injected',
    url: location.href
}
