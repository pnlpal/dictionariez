chrome.runtime.sendMessage {
    type: 'setting',
}, (setting)->
    mouseMoveTimer = null
    plainQuerying = null

    jQuery(document).ready ()->
        jQuery('''
            <div class="fairydict-tooltip">
                <div class="fairydict-spinner">
                  <div class="fairydict-bounce1"></div>
                  <div class="fairydict-bounce2"></div>
                  <div class="fairydict-bounce3"></div>
                </div>
                <p class="fairydict-tooltip-content">
                </p>
            </div>
                ''').appendTo('body')

    jQuery(document).mousemove (e)->
        mousex = e.pageX + 20
        mousey = e.pageY + 10
        jQuery('.fairydict-tooltip').css({ top: mousey, left: mousex })

        if setting.enableSelectionOnMouseMove
            if !setting.enableSelectionSK1 or (setting.enableSelectionSK1 and utils.checkEventKey(e, setting.selectionSK1))
                handleSelectionWord(e)

    jQuery(document).mouseup (e)->
        # 对 mouseup 事件做一个延时处理，
        # 以避免取消选中后getSelection依然能获得文字。
        setTimeout (()->handleMouseUp(e)), 1

    jQuery(document).bind 'keyup', (event)->
        if utils.checkEventKey event, setting.openSK1, setting.openSK2, setting.openKey
            chrome.runtime.sendMessage({
                type: 'look up',
                means: 'keyboard',
                text: window.getSelection().toString().trim()
            })

    handleSelectionWord = (e)->
        clearTimeout(mouseMoveTimer) if mouseMoveTimer
        mouseMoveTimer = setTimeout (()->
            word = getWordAtPoint(e.target, e.clientX, e.clientY)
            if word
                console.log(word)
                handleLookupByMouse(e)
        ), (setting.selectionTimeout or 500)

    playAudios = (urls) ->
        return unless urls?.length
        audios = urls.map (url)->
            return new Audio(url)

        _play = (audio, timeout)->
            timeout ?= 0
            return $.Deferred (dfd)->
                _func = ()->
                    setTimeout (()->
                        # console.log "play: ", audio.duration, timeout
                        audio.play()
                        dfd.resolve(audio.duration or 1)
                    ), timeout

                if audio.duration
                    _func()
                else
                    audio.addEventListener 'loadedmetadata', _func

        __play = (idx, timeout)->
            idx ?= 0
            if audios[idx]
                _play(audios[idx], timeout).then (duration)->
                    __play(idx+1, duration*1000)

        __play()

    getWordAtPoint = (elem, x, y)->
        if elem.nodeType == elem.TEXT_NODE
            range = elem.ownerDocument.createRange()
            range.selectNodeContents(elem)
            currentPos = 0
            endPos = range.endOffset
            while currentPos+1 < endPos
                range.setStart(elem, currentPos)
                range.setEnd(elem, currentPos+1)
                if range.getBoundingClientRect().left <= x && range.getBoundingClientRect().right  >= x &&
                range.getBoundingClientRect().top  <= y && range.getBoundingClientRect().bottom >= y
                    range.detach()
                    sel = window.getSelection()
                    sel.removeAllRanges()
                    sel.addRange(range)
                    sel.modify("move", "backward", "word")
                    sel.collapseToStart()
                    sel.modify("extend", "forward", "word")
                    return sel.toString().trim()

                currentPos += 1
        else
            for el in elem.childNodes
                range = el.ownerDocument.createRange()
                range.selectNodeContents(el)
                react = range.getBoundingClientRect()
                if react.left <= x && react.right  >= x && react.top  <= y && react.bottom >= y
                    range.detach()
                    return getWordAtPoint el, x, y
                else
                    range.detach()
        return

    handleMouseUp = (event)->
        selObj = window.getSelection()
        text = selObj.toString().trim()
        unless text
            jQuery('.fairydict-tooltip').fadeOut().hide()
            plainQuerying = null
            return

        # issue #4
        including = jQuery(event.target).has(selObj.focusNode).length or jQuery(event.target).is(selObj.focusNode)

        if event.which == 1 and including
            handleLookupByMouse(event)

    handleLookupByMouse = (event)->
        text = window.getSelection().toString().trim()
        return unless text

        if setting.enablePlainLookup && text != plainQuerying
            if !setting.enablePlainSK1 or (setting.plainSK1 and utils.checkEventKey(event, setting.plainSK1))
                jQuery('.fairydict-tooltip').fadeIn('slow')
                jQuery('.fairydict-tooltip .fairydict-spinner').show()
                jQuery('.fairydict-tooltip .fairydict-tooltip-content').empty()
                plainQuerying = text

                chrome.runtime.sendMessage {
                    type: 'look up pain',
                    means: 'mouse',
                    text: text
                }, (res)->
                    if res?.defs
                        content = ''
                        if res.pronunciation
                            audios = []
                            if res.pronunciation.AmE
                                content += res.pronunciation.AmE + '&nbsp;&nbsp;'

                            if res.pronunciation.AmEmp3 and setting.enableAmeAudio
                                audios.push res.pronunciation.AmEmp3

                            if res.pronunciation.BrE
                                content += res.pronunciation.BrE + '<br/>'

                            if res.pronunciation.BrEmp3 and setting.enableBreAudio
                                audios.push res.pronunciation.BrEmp3

                            playAudios audios

                        content = res.defs.reduce ((n, m)->
                            n += '<br/>' if n
                            n += m.pos + ' ' + m.def
                            return n
                        ), content

                        console.log "[FairyDict] plain definition: ", content
                        # jQuery(event.target).attr('title', definition)
                        jQuery('.fairydict-tooltip .fairydict-spinner').hide()
                        jQuery('.fairydict-tooltip .fairydict-tooltip-content').html(content)
                    else
                        jQuery('.fairydict-tooltip').fadeOut().hide()
                        plainQuerying = null

        if !setting.enableMouseSK1 or (setting.mouseSK1 and utils.checkEventKey(event, setting.mouseSK1))
            chrome.runtime.sendMessage({
                type: 'look up',
                means: 'mouse',
                text: text
            })


chrome.runtime.sendMessage {
    type: 'injected',
    url: location.href
}
