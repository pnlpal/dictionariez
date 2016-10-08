define ["jquery",
    "utils",
    "background/setting",
    "background/dict.js"], ($, utils, setting, dict)->
    console.log "[dictwindow] init"

    dictWindowManager =
        w: null
        defaultWidth: 620
        defaultHeight: 700
        open: ()->
            dfd = $.Deferred()
            left = (screen.width / 2) - (dictWindowManager.defaultWidth / 2)
            top = (screen.height / 2) - (dictWindowManager.defaultHeight / 2)
            if !@w
                chrome.windows.create({
                    url: chrome.extension.getURL('dict.html'),
                    type: 'popup',
                    width: dictWindowManager.defaultWidth,
                    height: dictWindowManager.defaultHeight,
                    left: left,
                    top: top
                }, (win)->
                    dictWindowManager.w = win

                    # wait 500 miniseconds for windows ready.
                    setTimeout((()->
                        dfd.resolve()
                        ), 500)
                )
            else
                chrome.windows.update(dictWindowManager.w.id, {
                    focused: true
                })
                dfd.resolve()

            return dfd

        sendMessage: (msg)->
            if @w
                tid = @w.tabs[0].id
                chrome.tabs.sendMessage(tid, msg)

        lookup: (text)->
            dictName = setting.getValue('dictionary')
            queryId = Date.now()
            @open().done ()=>
                @sendMessage({type: 'querying', text, queryId})
                @queryDict(text, dictName, queryId)

        queryDict: (text, dictName, queryId)->
            dict.query(text, dictName).then (res)=>
                console.log "[dictwindow] query #{dictName} result: ", res
                @sendMessage({type: 'queryResult', result: res, queryId})

    chrome.windows.onRemoved.addListener (wid)->
        if dictWindowManager.w?.id == wid
            dictWindowManager.w = null

    return dictWindowManager
