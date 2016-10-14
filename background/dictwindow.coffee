define ["jquery",
    "utils",
    "background/setting",
    "background/dict.js",
    "background/storage"], ($, utils, setting, dict, storage)->
    console.log "[dictwindow] init"
    defaultWindowUrl = 'http://blog.riverrun.xyz/fairydict.html'
    updateWindowDfd = null
    injectContentDfd = null
    dictInitedDfd = null

    dictWindowManager =
        w: null
        tid: null
        url: null
        word: null
        defaultWidth: 630
        defaultHeight: 700
        open: ()->
            dfd = $.Deferred()
            left = (screen.width / 2) - (dictWindowManager.defaultWidth / 2)
            top = (screen.height / 2) - (dictWindowManager.defaultHeight / 2)
            url = 'http://blog.riverrun.xyz/fairydict.html'
            if !@w
                @beforeUpdateUrl()
                chrome.windows.create({
                    url: defaultWindowUrl,
                    # url: 'http://cn.bing.com/dict/search?q=elephant',
                    type: 'popup',
                    width: dictWindowManager.defaultWidth,
                    height: dictWindowManager.defaultHeight,
                    left: left,
                    top: top
                }, (win)=>
                    @w = win
                    @tid = @w.tabs[0].id
                    @url = defaultWindowUrl
                    dfd.resolve()
                    # # wait 500 miniseconds for windows ready.
                    # setTimeout((()->
                    #     dfd.resolve()
                    #     ), 500)
                )
            else
                chrome.windows.update(dictWindowManager.w.id, {
                    focused: true
                })
                dfd.resolve()

            return dfd

        sendMessage: (msg)->
            chrome.tabs.sendMessage(@tid, msg) if @tid

        lookup: (text)->
            dictName = setting.getValue('dictionary')
            @open().done ()=>
                if text
                    @sendMessage({type: 'querying', text})
                    @queryDict(text, dictName)

        queryDict: (text, dictName, inHistory)->
            @word = text
            if not inHistory
                @sendMessage({type: 'history', history: storage.history})

            console.log "[dictwindow] query #{@word} from #{dictName}"
            dict.query(text, dictName).then @sendQueryResult.bind(this)

        sendQueryResult: (result)->
            item = storage.isInHistory(@word)
            if result
                udfd = @updateUrl(result.windowUrl or defaultWindowUrl)

            $.when(updateWindowDfd, dictInitedDfd, udfd).then ()=>
                console.log "[dictwindow] send query result"
                @sendMessage({
                    type: 'queryResult',
                    result: result,
                    text: @word,
                    inHistory: item?,
                    rating: item?[@word]})

                # if @word is a long sentence, don't keep in history
                if not item and @word.split(/\s+/).length <= 5
                    storage.addHistory(@word)

        injectResources: ()->
            styles = [
                "css/bootstrap.css",
                "bower_components/angular-ui/build/angular-ui.css",
                "bower_components/angular-bootstrap/ui-bootstrap-csp.css",
                "css/font-awesome.css",
                "css/dictheader.css"
            ]
            scripts = [
                'bower_components/jquery/dist/jquery.js',
                'bower_components/underscore/underscore.js',
                "bower_components/angular/angular.js",
                "bower_components/angular-ui/build/angular-ui.js",
                "bower_components/angular-sanitize/angular-sanitize.js",
                "bower_components/angular-bootstrap/ui-bootstrap.js",
                "utils.js",
                "js/starrr.js",
                "loader.js",
                "dict.js"
            ]

            inject = (t, files, index)=>
                files ?= []
                index ?= 0
                dfd = $.Deferred()
                file = files[index]
                if file
                    console.log "[dictwindow] inject #{file}"
                    chrome.tabs[t] @tid, {file: file}, ()=>
                        inject(t, files, index+1).then ()=>
                            dfd.resolve()
                else
                    dfd.resolve()
                return dfd

            res = dict.getDictResources(setting.getValue('dictionary'))
            return inject('insertCSS', res?.styles).then ()=>
                return inject('insertCSS', styles).then ()=>
                    return inject('executeScript', scripts).then ()=>
                        return inject('executeScript', res?.scripts)

        updateUrl: (url)->
            outDfd = $.Deferred()
            if url and @url != url
                console.log "[dictwindow] update url: #{url}"
                @url = url
                @beforeUpdateUrl().then ()=>
                    console.log "[dictwindow] updated url: #{url}"
                    outDfd.resolve(true)
                chrome.tabs.update @tid, {url, active: true}
                return outDfd
            else
                return outDfd.resolve(false)

        beforeUpdateUrl: ()->
            injectContentDfd = $.Deferred((dfd)=>
                dfd.then ()=>
                    return @injectResources().then ()=>
                        updateWindowDfd.resolve()
                )
            dictInitedDfd = $.Deferred()
            updateWindowDfd = $.Deferred()
            return updateWindowDfd

        onContentInjected: (url, tabId)->
            console.log "[dictwindow] manifest's content scripts injected from url: #{url}"
            if injectContentDfd?.state() == 'pending'
                injectContentDfd.resolve()

            # page was reloaded.
            else if url and tabId == @tid
                d = setting.getValue('dictionary')
                w = dict.getWordFromUrl(url, d)
                @url = url
                if w
                    @word = w
                else
                    w = @word

                updateWindowDfd = $.Deferred()
                console.log "[dictwindow] reload #{w} url #{url}"

                @injectResources().then ()=>
                    @sendQueryResult()
                    updateWindowDfd.resolve()

        onDictInited: ()->
            console.log "[dictwindow] dict inited"
            dictInitedDfd?.resolve()
            @sendMessage({type: 'history', history: storage.history})


    chrome.windows.onRemoved.addListener (wid)->
        if dictWindowManager.w?.id == wid
            dictWindowManager.w = null
            dictWindowManager.tid = null
            updateWindowDfd = null
            injectContentDfd = null
            dictInitedDfd = null

    # chrome.tabs.onUpdated.addListener (tabId, info)->
    #     if dictWindowManager.tid == tabId
    #         dictWindowManager.onReload(info.url)


    return dictWindowManager
