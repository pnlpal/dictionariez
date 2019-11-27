import $ from "jquery"
import utils from "utils"
import setting from "./setting.coffee"
import storage from  "./storage.coffee"
import dict from "./dict.coffee"
import message from "./message.coffee"

console.log "[dictWindow] init"
defaultWindowUrl = chrome.extension.getURL('dict.html')

dictWindow =
    w: null
    tid: null
    url: null
    word: null
    dictName: null
    init: ()->
        @w = null
        @tid = null
        @url = null
        @word = null
        @dictName = setting.getValue('dictionary') || dict.allDicts[0].dictName

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
                dfd.resolve()
            )
        else
            chrome.windows.update(dictWindow.w.id, {
                focused: true
            })
            dfd.resolve()

        return dfd

    sendMessage: (msg)->
        chrome.tabs.sendMessage(@tid, msg) if @tid

    lookup: (text)->
        @open().done ()=>
            if text
                console.log('lookup...')
                @sendMessage({type: 'querying', text})
                @queryDict(text, @dictName)

    queryDict: (text, dictName)->
        @word = text
        console.log "[dictWindow] query #{@word} from #{dictName}"
        return dict.query(text, dictName)

    saveWindowSize: ()->
        chrome.windows.get @w.id, null, (w)=>
            if w?.width and w?.height
                if Math.abs(w.width-setting.getValue('windowWidth')) > 10 or Math.abs(w.height-setting.getValue('windowHeight')) > 10
                    console.log "[dictWindow] update window size: #{w.width} * #{w.height}"
                    setting.setValue 'windowWidth', w.width
                    setting.setValue 'windowHeight', w.height

    updateDict: (dictName) ->
        if @dictName != dictName
            @dictName = dictName
            setting.setValue 'dictionary', dictName


chrome.windows.onRemoved.addListener (wid)->
    if dictWindow.w?.id == wid
        dictWindow.init()

# chrome.tabs.onUpdated.addListener (tabId, info)->
#     if dictWindow.tid == tabId
#         dictWindow.onReload(info.url)

message.on 'look up', (request) ->
    if request.means == 'mouse'
        if not setting.getValue('enableMinidict')
            return true

    dictWindow.lookup(request.text)

message.on 'query', (request) ->
    dictName = request.dictName
    if request.next
        dictName = dict.getNextDict(dictName).dictName
        dictWindow.updateDict(dictName)
    if request.previous
        dictName = dict.getPreviousDict(dictName).dictName
        dictWindow.updateDict(dictName)

    dictWindow.queryDict(request.w, dictName).then (result) ->
        storage.addHistory {w: request.w, s: request.s, sc: request.sc}
        return result

message.on 'dictionary', (request) ->
    w = dictWindow.word
    previous = storage.getPrevious(w)
    currentDictName = dictWindow.dictName
    nextDictName = dict.getNextDict(currentDictName).dictName
    previousDictName = dict.getPreviousDict(currentDictName).dictName
    return { allDicts: dict.allDicts, currentDictName, nextDictName, previousDictName, previous, w }

message.on 'injected', (request, sender) ->
    dictName = dict.getDictFromOrigin(request.origin)?.dictName
    if dictWindow.tid == sender.tab.id or dictName
        if dictName
            word = dict.getWordFromUrl request.url, dictName
            if word
                dictWindow.word = word
                console.log "Injected in #{word} of #{dictName}"

        return {
            isDict: dictWindow.tid == sender.tab.id,
            dictUrl: chrome.extension.getURL('dict.html'),
            dict: dict.getDict(dictName)
        }

message.on 'set-dictionary-current', ({ dictName }) ->
    dictWindow.updateDict(dictName)

window.dictWindow = dictWindow
export default dictWindow
