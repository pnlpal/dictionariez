import {
  getSentenceFromSelection
} from 'get-selection-more'

export getWordAtPoint = (elem, x, y)->
    if elem.nodeType == elem.TEXT_NODE
        range = elem.ownerDocument.createRange()
        range.selectNodeContents(elem)
        currentPos = 0
        endPos = range.endOffset
        while currentPos < endPos
            range.setStart(elem, currentPos)
            range.setEnd(elem, currentPos+1)
            if range.getBoundingClientRect().left <= x && range.getBoundingClientRect().right >= x &&
            range.getBoundingClientRect().top <= y && range.getBoundingClientRect().bottom >= y
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
            if react.left <= x && react.right >= x && react.top <= y && react.bottom >= y
                range.detach()
                return getWordAtPoint el, x, y
            else
                range.detach()
    return

export getWordFromSelection = (fromAllFrames = false) -> 
    word = window.getSelection().toString().trim()
    if !word and fromAllFrames
        for frame in window.frames 
            try 
                word = frame.getSelection().toString().trim()
                break if word 
            catch
    return word

export getSentenceOfSelection = (window_ = window) ->
    selection = window_.getSelection()

    try
        if navigator.userAgent.includes("Gecko") 
            return getSentenceFromSelection(selection)
        else 
            range = selection.getRangeAt(0)

            range1 = range.cloneRange()
            range1.detach()

            selection.modify('move', 'backward', 'sentence')
            selection.modify('extend', 'forward', 'sentence')

            text = selection.toString().trim()

            selection.removeAllRanges()
            selection.addRange(range1)

            return text
    catch  
        try 
            # Fallback for browsers that don't support modify
            return getSentenceFromSelection(selection)
        catch
            return

export getSentenceFromAllFrames = () -> 
    sentence = getSentenceOfSelection()
    return sentence if sentence

    for frame in window.frames 
        try 
            sentence = getSentenceOfSelection(frame)
            break if sentence 
        catch


export checkEditable = (element) ->
    curNode = element
    while curNode 
        if curNode.isContentEditable or ["input", "textarea"].includes(curNode.nodeName.toLowerCase())
            return true
        curNode = curNode.parentElement
    # check the direct children of the node, sometimes the editor could be wrapped by a div. 
    for node in (element?.children || [])
        if node.isContentEditable or ["input", "textarea"].includes(node.nodeName.toLowerCase())
            return true


