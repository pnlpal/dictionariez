import $ from "jquery"
import utils from "utils"
import setting from "./setting.coffee"
import storage from  "./storage.coffee"
import dict from "./dict.coffee"


console.log "[dictwindow] init"
defaultWindowUrl = chrome.extension.getURL('dict.html')
updateWindowDfd = null
injectContentDfd = null
dictInitedDfd = null
windowType = 'popup'

dictWindowManager =
    w: null
    tid: null
    url: null
    word: null
    open: ()->
        dfd = $.Deferred()

        # bugfix: dont know how why, windowWidth and windowHeight are saved as number, need integer here.
        width = parseInt(setting.getValue('windowWidth'))
        height = parseInt(setting.getValue('windowHeight'))
        left = Math.round((screen.width / 2) - (width / 2))
        top = Math.round((screen.height / 2) - (height / 2))
        if !@w
            @beforeUpdateUrl()
            chrome.windows.create({
                url: defaultWindowUrl,
                # url: 'http://cn.bing.com/dict/search?q=elephant',
                type: windowType,
                width: width,
                height: height,
                left: left,
                top: top
            }, (win)=>
                @w = win
                @tid = @w.tabs[0].id
                @url = defaultWindowUrl
                dfd.resolve()
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
                console.log('lookup...')
                @sendMessage({type: 'querying', text})
                @queryDict(text, dictName)

    queryDict: (text, dictName, inHistory)->
        @word = text
        if not inHistory
            @sendMessage({type: 'history', history: storage.history})

        console.log "[dictwindow] query #{@word} from #{dictName}"
        return dict.query(text, dictName)

    saveWindowSize: ()->
        chrome.windows.get @w.id, null, (w)=>
            if w?.width and w?.height
                if Math.abs(w.width-setting.getValue('windowWidth')) > 10 or Math.abs(w.height-setting.getValue('windowHeight')) > 10
                    console.log "[dictwindow] update window size: #{w.width} * #{w.height}"
                    setting.setValue 'windowWidth', w.width
                    setting.setValue 'windowHeight', w.height

    sendQueryResult: (result)->
        @saveWindowSize()
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
        console.log('inject resources')
        return Promise.resolve()
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
            if file and t and @tid
                console.log "[dictwindow] inject #{file}"
                chrome.tabs[t] @tid, {file: file}, ()=>
                    inject(t, files, index+1).then ()=>
                        dfd.resolve()
            else
                dfd.resolve()
            return dfd

        res = dict.getDictResources(setting.getValue('dictionary'))

        # chrome-extension:// can't inject files, permission denied.
        if @url.indexOf('chrome-extension://') == 0
            return inject(null)

        return inject('insertCSS', res?.styles).then ()=>
            return inject('insertCSS', styles).then ()=>
                return inject('executeScript', scripts).then ()=>
                    return inject('executeScript', res?.scripts)

    updateUrl: (url)->
        outDfd = $.Deferred()
        if url and @url != url
            console.log "[dictwindow] update url: #{url}"
            @url = url
            # @beforeUpdateUrl().then ()=>
            #     console.log "[dictwindow] updated url: #{url}"
            #     outDfd.resolve(true)
            chrome.tabs.update @tid, {url, active: true}
            # return outDfd
        # else
            # return outDfd.resolve(false)

    beforeUpdateUrl: ()->
        injectContentDfd = $.Deferred((dfd)=>
            dfd.then ()=>
                return @injectResources().then ()=>
                    updateWindowDfd?.resolve()
            )
        dictInitedDfd = $.Deferred()
        updateWindowDfd = $.Deferred()
        return updateWindowDfd

    # onContentInjected: (url, tabId)->
    #     console.log "[dictwindow] manifest's content scripts injected from url: #{url}"
    #     if injectContentDfd?.state() == 'pending'
    #         injectContentDfd.resolve()

        # page was reloaded.
        # else if url and tabId == @tid
        #     d = setting.getValue('dictionary')
        #     w = dict.getWordFromUrl(url, d)
        #     @url = url
        #     if w
        #         @word = w
        #     else
        #         w = @word

        #     dictInitedDfd = $.Deferred()
        #     updateWindowDfd = $.Deferred()
        #     console.log "[dictwindow] reload #{w} url #{url}"

        #     @injectResources().then ()=>
        #         if @url == defaultWindowUrl
        #             dict.query(@word, d).then @sendQueryResult.bind(@)
        #         else
        #             @sendQueryResult()
        #         updateWindowDfd.resolve()

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


export default dictWindowManager
