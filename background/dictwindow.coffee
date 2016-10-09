define ["jquery",
    "utils",
    "background/setting",
    "background/dict.js",
    "background/storage"], ($, utils, setting, dict, storage)->
    console.log "[dictwindow] init"

    dictWindowManager =
        w: null
        defaultWidth: 700
        defaultHeight: 800
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
                if text
                    @sendMessage({type: 'querying', text, queryId})
                    @queryDict(text, dictName, queryId)
                else
                    @sendMessage({type: 'history', history: storage.history})

        queryDict: (text, dictName, queryId, inHistory)->
            if not inHistory
                @sendMessage({type: 'history', history: storage.history})

            dict.query(text, dictName).then (res)=>
                # if text is a long sentence, don't keep in history
                if text.split(/\s+/).length <= 5 and not inHistory
                    storage.addHistory(text)

                console.log "[dictwindow] query #{text} from #{dictName}"
                item = storage.isInHistory(text)
                @sendMessage({
                    type: 'queryResult',
                    result: res,
                    queryId: queryId,
                    rating: item?[text]})

    chrome.windows.onRemoved.addListener (wid)->
        if dictWindowManager.w?.id == wid
            dictWindowManager.w = null

    return dictWindowManager
