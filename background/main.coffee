dictWindowManager =
    defaultWidth: 620
    defaultHeight: 70
    open: ()->
        var left = (screen.width / 2) - (dictWindowManager.defaultWidth / 2)
        var top = (screen.height / 2) - (dictWindowManager.defaultHeight / 2)

        chrome.windows.create({
            url: chrome.extension.getURL('dict.html'),
            type: 'popup',
            width: dictWindowManager.defaultWidth,
            height: dictWindowManager.defaultHeight,
            left: left,
            top: top
        }, function(win) {
            dictWindowManager.dictWindow = win;
        })

    sendMessage: (type, data)->


query = (text, dictionary)->
    dictWindowManager.open()
    dictionary = dictionary || dictManager.defaultDict
    dictManager.defaultDict = dictionary
    dictWindowManager.sendMessage('waitResult')
    dictManager.queryDict(text, dictionary, _onSuccess, _onFail)

chrome.runtime.onMessage.addListener (request, sender, sendResponse)->
    if request.type == 'query'
        query()
