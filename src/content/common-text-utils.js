import { getSentenceFromSelection } from "get-selection-more";

export var getWordAtPoint = function (elem, x, y) {
    let range;
    if (elem.nodeType === elem.TEXT_NODE) {
        range = elem.ownerDocument.createRange();
        range.selectNodeContents(elem);
        let currentPos = 0;
        const endPos = range.endOffset;
        while (currentPos < endPos) {
            range.setStart(elem, currentPos);
            range.setEnd(elem, currentPos + 1);
            if (
                range.getBoundingClientRect().left <= x &&
                range.getBoundingClientRect().right >= x &&
                range.getBoundingClientRect().top <= y &&
                range.getBoundingClientRect().bottom >= y
            ) {
                range.detach();
                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
                sel.modify("move", "backward", "word");
                sel.collapseToStart();
                sel.modify("extend", "forward", "word");
                return sel.toString().trim();
            }

            currentPos += 1;
        }
    } else {
        for (var el of elem.childNodes) {
            range = el.ownerDocument.createRange();
            range.selectNodeContents(el);
            var react = range.getBoundingClientRect();
            if (react.left <= x && react.right >= x && react.top <= y && react.bottom >= y) {
                range.detach();
                return getWordAtPoint(el, x, y);
            } else {
                range.detach();
            }
        }
    }
};

export var getWordFromSelection = function (fromAllFrames = false) {
    let word = window.getSelection().toString().trim();
    if (!word && fromAllFrames) {
        for (var frame of window.frames) {
            try {
                word = frame.getSelection().toString().trim();
                if (word) {
                    break;
                }
            } catch (error) {}
        }
    }
    return word;
};

export var getSentenceOfSelection = function (window_ = window) {
    const selection = window_.getSelection();

    try {
        if (navigator.userAgent.includes("Gecko")) {
            return getSentenceFromSelection(selection);
        } else {
            const range = selection.getRangeAt(0);

            const range1 = range.cloneRange();
            range1.detach();

            selection.modify("move", "backward", "sentence");
            selection.modify("extend", "forward", "sentence");

            const text = selection.toString().trim();

            selection.removeAllRanges();
            selection.addRange(range1);

            return text;
        }
    } catch (error) {
        try {
            // Fallback for browsers that don't support modify
            return getSentenceFromSelection(selection);
        } catch (error1) {
            return;
        }
    }
};

export var getSentenceFromAllFrames = function () {
    let sentence = getSentenceOfSelection();
    if (sentence) {
        return sentence;
    }

    for (var frame of window.frames) {
        try {
            sentence = getSentenceOfSelection(frame);
            if (sentence) {
                return sentence;
            }
        } catch (error) {}
    }

    return null;
};

export var checkEditable = function (element) {
    let curNode = element;
    while (curNode) {
        if (curNode.isContentEditable || ["input", "textarea"].includes(curNode.nodeName.toLowerCase())) {
            return true;
        }
        curNode = curNode.parentElement;
    }
    // check the direct children of the node, sometimes the editor could be wrapped by a div.
    for (var node of element?.children || []) {
        if (node.isContentEditable || ["input", "textarea"].includes(node.nodeName.toLowerCase())) {
            return true;
        }
    }
};
