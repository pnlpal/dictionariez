chrome.runtime.sendMessage {
    type: 'setting',
}, (setting)->
    # $('.masterTooltip').hover (()->
    #     title = $(this).attr('title')
    #     $(this).data('tipText', title).removeAttr('title')

    # ), ()->
    #     $('.tooltip').remove()
    jQuery(document).ready ()->
        jQuery('<div class="fairydict-tooltip"></div>').appendTo('body')

    jQuery(document).mousemove (e)->
        mousex = e.pageX + 20
        mousey = e.pageY + 10
        jQuery('.fairydict-tooltip').css({ top: mousey, left: mousex })

    jQuery(document).bind 'keyup', (event)->
        if utils.checkEventKey event, setting.openSK1, setting.openSK2, setting.openKey
            chrome.runtime.sendMessage({
                type: 'look up',
                means: 'keyboard',
                text: window.getSelection().toString()
            })

    jQuery(document).mouseup (event)->
        selObj = window.getSelection()
        unless selObj.toString()
            jQuery('.fairydict-tooltip').fadeOut()
            return

        # issue #4
        including = jQuery(event.target).has(selObj.focusNode).length or jQuery(event.target).is(selObj.focusNode)

        if event.which == 1 and including

            if setting.enablePlainLookup
                chrome.runtime.sendMessage({
                    type: 'look up pain',
                    means: 'mouse',
                    text: window.getSelection().toString()
                }, (res)->
                    if res.defs
                        definition = res.defs.reduce ((n, m)->
                            n += '<br/>' if n
                            n += m.pos + ' ' + m.def
                            return n
                        ), ''
                        console.log "[FairyDict] plain definition: ", definition
                        # jQuery(event.target).attr('title', definition)
                        jQuery('.fairydict-tooltip').html(definition).fadeIn('slow')

            )

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
