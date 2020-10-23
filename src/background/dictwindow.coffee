import setting from "./setting.coffee"
import storage from  "./storage.coffee"
import dict from "./dict.coffee"
import message from "./message.coffee"
import utils from "utils"

defaultWindowUrl = chrome.extension.getURL('dict.html')

getInfoOfSelectionCode = '''
var getSentence = function() {
	var selection = window.getSelection();
    var range = selection.getRangeAt(0);
    if (!selection.toString()) return;

    var range1 = range.cloneRange();
    range1.detach();

    selection.modify('move', 'backward', 'sentence');
    selection.modify('extend', 'forward', 'sentence');

    var text = selection.toString().trim();

    selection.removeAllRanges();
    selection.addRange(range1);

    return text;
};

[window.getSelection().toString().trim(), getSentence()]
'''

class DictWindow
    w: null
    tid: null
    url: null
    word: null
    dictName: null
    savePosInterval: null

    constructor: ({ @w, @tid, @url, @word, dictName } = {}) ->
        @dictName = dictName || setting.getValue('dictionary') || dict.allDicts[0].dictName

    reset: ()->
        @w = null
        @tid = null
        @url = null
        @word = null
        window.clearInterval(@savePosInterval) if @savePosInterval
        @savePosInterval = null

    open: (url)->
        # bugfix: dont know how why, windowWidth and windowHeight are saved as number, need integer here.
        width = parseInt(setting.getValue('windowWidth'))
        height = parseInt(setting.getValue('windowHeight'))
        left = setting.getValue('windowLeft', Math.round((screen.width / 2) - (width / 2)))
        top = setting.getValue('windowTop', Math.round((screen.height / 2) - (height / 2)))

        return new Promise (resolve) =>
            if !@w
                # console.log "[dictWindow] create window position: top: #{top}, left: #{left}, width: #{width}, height: #{height}"
                chrome.windows.create({
                    url: url or defaultWindowUrl,
                    type: 'popup',
                    width: width,
                    height: height,
                    top: if utils.isLinux() then top - screen.availTop else top, # fix top value on Linux, may be chrome's bug.
                    left: if utils.isLinux() then left - screen.availLeft else left, # fix left value on Linux, may be chrome's bug.
                    state: 'normal',
                }, (win)=>
                    @w = win
                    @tid = @w.tabs[0].id
                    @url = url or defaultWindowUrl
                    resolve()

                    @savePosInterval = window.setInterval @saveWindowPosition.bind(this), 3000
                )
            else
                chrome.tabs.update(@tid, {
                    url: url
                }) if url
                chrome.windows.update(dictWindow.w.id, {
                    focused: true
                })
                resolve()

    sendMessage: (msg)->
        chrome.tabs.sendMessage(@tid, msg) if @tid

    lookup: (text)->
        url = ''
        text = @word if not text

        if text
            console.log('lookup...')
            @sendMessage({type: 'querying', text})
            result = await @queryDict(text, @dictName)
            url = result?.windowUrl

        @open(url)

    queryDict: (text, dictName)->
        return unless text

        @word = text
        console.log "[dictWindow] query #{@word} from #{dictName}"
        return dict.query(text, dictName)

    saveWindowPosition: ()->
        # console.log 'saveWindowPosition...'
        if @w
            chrome.windows.get @w.id, null, (w)=>
                if w?.width and w?.height
                    # console.log "[dictWindow] update window position: top: #{w.top}, left: #{w.left}, width: #{w.width}, height: #{w.height}"
                    setting.setValue 'windowWidth', w.width
                    setting.setValue 'windowHeight', w.height
                if w?.top? and w?.left?
                    setting.setValue 'windowLeft', w.left
                    setting.setValue 'windowTop', w.top


    updateDict: (dictName) ->
        if @dictName != dictName
            @dictName = dictName
            setting.setValue 'dictionary', dictName

dictWindowMap = {}

export default {
    lookup: ({ w, s, sc, sentence } = {}) ->
        storage.addHistory { w, s, sc, sentence } if w
        window.dictWindow?.lookup(w)

    init: () ->
        dictWindow = new DictWindow()
        window.dictWindow = dictWindow
        window.dictWindowMap = dictWindowMap

        chrome.windows.onRemoved.addListener (wid)->
            if dictWindow.w?.id == wid
                dictWindow.reset()

        chrome.browserAction.onClicked.addListener (tab) =>
            chrome.tabs.executeScript {
                code: getInfoOfSelectionCode 
            }, (res) =>
                [w, sentence] = res?[0]
                @lookup({ w, sentence, s: tab.url, sc: tab.title })

        chrome.contextMenus.create {
            title: "Look up '%s' in dictionaries",
            contexts: ["selection"],
            onclick: (info, tab) =>
                w = info.selectionText?.trim()
                if w 
                    chrome.tabs.executeScript {
                        code: getInfoOfSelectionCode 
                    }, (res) =>
                        [w, sentence] = res?[0]
                        @lookup({ w, sentence, s: tab.url, sc: tab.title })
        }

        message.on 'look up', ({ dictName, w, s, sc, sentence, means }) ->
            if means == 'mouse'
                if not setting.getValue('enableMinidict')
                    return

            w = w.trim() if w
            dictWindow.updateDict dictName if dictName

            storage.addHistory { w, s, sc, sentence } if w and s # ignore lookup from options page
            dictWindow.lookup(w)

        message.on 'query', (request) ->
            dictName = request.dictName
            w = request.w
            
            if request.nextDict
                dictName = dict.getNextDict(dictName).dictName
            if request.previousDict
                dictName = dict.getPreviousDict(dictName).dictName

            dictWindow.updateDict(dictName)

            if request.previousWord
                w = storage.getPrevious(w, true)?.w
            else if request.nextWord
                w = storage.getNext(w, true)?.w
            else if w
                storage.addHistory { w }

            dictWindow.queryDict(w, dictName)

        message.on 'dictionary', (request, sender) ->
            w = dictWindow.word

            if sender.tab.id == dictWindow.tid or request.optionsPage
                currentDictName = dictWindow.dictName
            else
                currentDictName = dictWindowMap[sender.tab.id].dictName
                w = dictWindowMap[sender.tab.id].word

            r = storage.getRating(w)
            previous = storage.getPrevious(w)
            nextDictName = dict.getNextDict(currentDictName).dictName
            previousDictName = dict.getPreviousDict(currentDictName).dictName
            history = storage.getHistory(w, 8) # at most show 8 words in the history list on dictionary header.
            return { allDicts: dict.allDicts, history, currentDictName, nextDictName, previousDictName, previous, w, r }
        
        message.on 'dictionary history', (request, sender) ->
            history = storage.getHistory(request.word, 8) # at most show 8 words in the history list on dictionary header.
            return { history }

        message.on 'injected', (request, sender) ->
            if dictWindow.tid == sender.tab.id
                d = dict.getDict(dictWindow.dictName)
                if d.css
                    chrome.tabs.insertCSS dictWindow.tid, {
                        runAt: "document_start",
                        code: d.css
                    }

                return {
                    dictUrl: chrome.extension.getURL('dict.html'),
                    dict: d
                }
           

        message.on 'window resize', (request, sender) ->
            if sender.tab.id == dictWindow.tid
                dictWindow.saveWindowPosition()

        message.on 'sendToDict', ( request ) ->
            dictWindow.sendMessage request

}