import $ from "jquery"
import utils from "utils"
import setting from "./setting.coffee"
import storage from  "./storage.coffee"
import dict from "./dict.coffee"


console.log "[dictwindow] init"
defaultWindowUrl = chrome.extension.getURL('dict.html')

dictWindowManager =
    w: null
    tid: null
    url: null
    word: null
    dictName: null
    reset: ()->
        @w = null
        @tid = null
        @url = null
        @word = null
        @dictName = null

    open: ()->
        dfd = $.Deferred()

        # bugfix: dont know how why, windowWidth and windowHeight are saved as number, need integer here.
        width = parseInt(setting.getValue('windowWidth'))
        height = parseInt(setting.getValue('windowHeight'))
        left = Math.round((screen.width / 2) - (width / 2))
        top = Math.round((screen.height / 2) - (height / 2))
        if !@w
            chrome.windows.create({
                url: defaultWindowUrl,
                # url: 'http://cn.bing.com/dict/search?q=elephant',
                type: 'popup',
                width: width,
                height: height,
                left: left,
                top: top
            }, (win)=>
                @w = win
                @tid = @w.tabs[0].id
                @url = defaultWindowUrl
                @dictName = setting.getValue('dictionary')
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

    queryDict: (text, dictName)->
        @word = text
        console.log "[dictwindow] query #{@word} from #{dictName}"
        return dict.query(text, dictName)

    saveWindowSize: ()->
        chrome.windows.get @w.id, null, (w)=>
            if w?.width and w?.height
                if Math.abs(w.width-setting.getValue('windowWidth')) > 10 or Math.abs(w.height-setting.getValue('windowHeight')) > 10
                    console.log "[dictwindow] update window size: #{w.width} * #{w.height}"
                    setting.setValue 'windowWidth', w.width
                    setting.setValue 'windowHeight', w.height

chrome.windows.onRemoved.addListener (wid)->
    if dictWindowManager.w?.id == wid
        dictWindowManager.reset()

# chrome.tabs.onUpdated.addListener (tabId, info)->
#     if dictWindowManager.tid == tabId
#         dictWindowManager.onReload(info.url)

export default dictWindowManager
