import setting from "./setting.coffee"
import storage from  "./storage.coffee"
import dict from "./dict.coffee"
import message from "./message.coffee"
import readClipboard from "./clipboard.coffee"
import utils from "utils"
import $ from "jquery"

defaultWindowUrl = chrome.runtime.getURL('dict.html')

getInfoOfSelectionCode = '''
var getSentence = function() {
    try {
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
    } catch (err) {
        // On firefox, unable to get sentence.
    }
};

[window.getSelection().toString().trim(), getSentence()]
'''

class DictWindow
    w: null
    tid: null
    url: null
    word: null
    sentence: null
    dictName: null
    savePosInterval: null
    windex: 0

    constructor: ({ @w, @tid, @url, @word, @sentence, dictName } = {}) ->
        @dictName = dictName || setting.getValue('dictionary') || dict.allDicts[0].dictName

    reset: ()->
        @w = null
        @tid = null
        @url = null
        @word = null
        @sentence = null
        @dictName = null
        window.clearInterval(@savePosInterval) if @savePosInterval
        @savePosInterval = null

    open: (url, useDefaultPosition)->
        # bugfix: dont know how why, windowWidth and windowHeight are saved as number, need integer here.
        width = parseInt(setting.getValue('windowWidth'))
        height = parseInt(setting.getValue('windowHeight'))

        # fix too small value
        width = 580 if !width or width < 300
        height = 600 if !height or height < 300
        
        defaultLeft = Math.round((screen.width / 2) - (width / 2))
        defaultTop = Math.round((screen.height / 2) - (height / 2))
        left = setting.getValue('windowLeft', defaultLeft)
        top = setting.getValue('windowTop', defaultTop)

        # setup the other cloned window 
        if @windex > 0
            top += 50 * @windex
            left += 50 * @windex 
        
        # fix on windows, if window is out of the screen. But On Mac, it's OK.
        if not utils.isMac() 
            if left < 0 or left > screen.width 
                left = defaultLeft
            if top < 0 or top > screen.height
                top = defaultTop

        # fix top value on Linux, may be chrome's bug.
        if utils.isLinux()
            if top > screen.availTop
                top = defaultTop 
            if left > screen.availLeft
                left = defaultLeft

        if useDefaultPosition
            top = defaultTop
            left = defaultLeft

        return new Promise (resolve, reject) =>
            if !@w
                chrome.windows.create({
                    url: url or defaultWindowUrl,
                    type: 'popup',
                    width: width,
                    height: height,
                    top: top, 
                    left: left, 
                    state: 'normal',
                }, (win)=>
                    if not win
                        return @open(url, true) if not useDefaultPosition
                        return reject(new Error("Failed to create the popup lookup window!")) 

                    @w = win
                    @tid = @w.tabs[@w.tabs.length-1].id
                    @url = url or defaultWindowUrl
                    resolve()

                    if @windex == 0  # only save the main window position
                        @savePosInterval = window.setInterval @saveWindowPosition.bind(this), 3000

                    # Firefox can't remember top and left, opera can't remember at all.
                    if navigator.userAgent.toLowerCase().indexOf('firefox') > -1 or navigator.userAgent.toLowerCase().indexOf('opr') > -1
                        chrome.windows.update @w.id, {
                            width: width,
                            height: height,
                            top: if utils.isLinux() then top - screen.availTop else top, # fix top value on Linux, may be chrome's bug.
                            left: if utils.isLinux() then left - screen.availLeft else left, # fix left value on Linux, may be chrome's bug.
                        }
                )
            else
                if url and url != @url
                    chrome.tabs.update(@tid, {
                        url: url
                    })
                    @url = url
               
                    resolve()
                else 
                    resolve({noUpdate: true})
                    
    focus: () ->
        chrome.windows.update(@w.id, {
            focused: true
        }) if @w
        chrome.tabs.update(@tid, {
            highlighted: true
        }) if @tid

    sendMessage: (msg)->
        chrome.tabs.sendMessage(@tid, msg) if @tid

    lookup: (text, sentence, languagePrompt)->
        url = ''
        text = @word if not text

        if text
            if @word != text || @sentence != sentence
                @word = text
                @sentence = sentence || null
                result = await dict.query(text, @dictName) 
                url = result?.windowUrl
                @sendMessage({type: 'querying', text, sentence, languagePrompt})
            else 
                url = @url 

        @open(url)

    saveWindowPosition: ()->
        if @w
            chrome.windows.get @w.id, null, (w)=>
                if w?.width and w?.height
                    setting.setValue 'windowWidth', w.width
                    setting.setValue 'windowHeight', w.height
                if w?.top? and w?.left?
                    setting.setValue 'windowLeft', w.left
                    setting.setValue 'windowTop', w.top


    updateDict: (dictName) ->
        if @dictName != dictName
            @dictName = dictName
            setting.setValue 'dictionary', dictName

export default {
    dictWindows: [],

    lookup: ({ w, s, sc, sentence } = {}) ->
        storage.addHistory { w, s, sc, sentence } if w and s  # ignore lookup from options page
        @dictWindows.forEach (win)-> win.lookup(w, sentence)
    
    focus: () ->
        i = @dictWindows.length 
        while i  
            i -= 1 
            @dictWindows[i].focus()

    create: (options) ->
        if (@dictWindows[0] && !@dictWindows[0].w) 
            win = @dictWindows[0]
            if options
                win.w = options.w
                win.tid = options.tid
                win.url = options.url
                win.word = options.word
                win.sentence = options.sentence 
                win.dictName = options.dictName
            return win

        else 
            win = new DictWindow(options)
            win.windex = @dictWindows.length
            @dictWindows.push win 
            return win 
    
    getByTab: (tid) ->
        for win in @dictWindows 
            if win.tid == tid 
                return win 

    init: () ->
        @create()

        chrome.windows.onRemoved.addListener (wid)=>
            @dictWindows.forEach (win)->
                if win.w?.id == wid
                    win.reset()
        chrome.tabs.onRemoved.addListener (tid)=>
            @dictWindows.forEach (win)->
                if win.tid == tid
                    win.reset()
            
            # clear closed window
            @dictWindows = @dictWindows.filter (win, i)-> i == 0 or win.w 

        chrome.browserAction.onClicked.addListener (tab) =>
            chrome.tabs.executeScript {
                code: getInfoOfSelectionCode 
            }, (res) =>
                [w, sentence] = res?[0] or []

                if not w
                    w = await readClipboard() 

                @lookup({ w, sentence, s: tab.url, sc: tab.title })
                @focus()

        if not setting.getValue "disableContextMenu"
            chrome.contextMenus.create {
                title: "Look up '%s' in dictionaries",
                contexts: ["selection"],
                onclick: (info, tab) =>
                    w = info.selectionText?.trim()
                    if w 
                        chrome.tabs.executeScript {
                            code: getInfoOfSelectionCode 
                        }, (res) =>
                            if res?[0]?.length
                                w = res[0][0] or w 
                                sentence = res[0][1]
                            @lookup({ w, sentence, s: tab.url, sc: tab.title })
                            @focus()
            }

        message.on "copy event triggered", ({s, sc, sentence}) => 
            w = await readClipboard()
            if w
                @lookup({ w, s, sc, sentence })
                @focus()

        message.on 'look up', ({ dictName, w, s, sc, sentence, means, newDictWindow }) =>
            if means == 'mouse'
                if not setting.getValue('enableMinidict')
                    return

            if !w 
                w = await readClipboard()

            if newDictWindow 
                targetWin = @create()
                targetWin.updateDict(dictName || @dictWindows[0].dictName)
                targetWin.lookup(w || @dictWindows[0].word, sentence)

            else if dictName # only change the main window or in new window.
                @dictWindows[0].updateDict dictName 
                @dictWindows[0].lookup(w?.trim(), sentence)
                @focus()

            else  # This is more likely to happen.
                @lookup({ w: w?.trim(), s, sc, sentence })
                @focus()

        message.on 'query', (request, sender) =>
            senderWin = @getByTab(sender.tab.id)
            dictName = request.dictName || senderWin.dictName
            w = request.w || senderWin.word
            languagePrompt = w?.split(" /")[1]
            w = w?.split(" /")[0]
            sentence = request.sentence
            
            if request.nextDict
                dictName = dict.getNextDict(dictName).dictName
            else if request.previousDict
                dictName = dict.getPreviousDict(dictName).dictName
            else if request.dictNumber 
                d = dict.getDictByNumber(request.dictNumber)
                return if not d 
                dictName = d.dictName
            
            if request.previousWord
                prev = storage.getPrevious(w)
                w = prev?.w
                sentence = prev?.sentence
            else if request.nextWord
                next = storage.getNext(w, true)
                w = next?.w 
                sentence = next?.sentence
            else if w
                storage.addHistory { w, sentence }

            if request.newDictWindow
                targetWin = @create()
                targetWin.updateDict(dictName)
                return targetWin.lookup(w, sentence, languagePrompt)
            else 
                senderWin.updateDict(dictName)

                result = null
                @dictWindows.forEach (win)->
                    res = win.lookup(w, sentence, languagePrompt)
                    if win.tid == senderWin.tid 
                        result = res 
                return result
                
        message.on 'dictionary', (request, sender) =>
            win = @getByTab(sender.tab.id)

            currentDictName = win?.dictName || setting.getValue('dictionary')
            currentDictName = dict.getDict(currentDictName).dictName

            if win 
                w = win.word
                r = storage.getRating(w)
            else if !win && !request.optionsPage 
                win = @create()
                win.tid = sender.tab.id
                win.dictName = currentDictName

            previous = storage.getPrevious(w)
            history = storage.getHistory(w, 10) # at most show 10 words in the history list on dictionary header.

            nextDictName = dict.getNextDict(currentDictName).dictName
            previousDictName = dict.getPreviousDict(currentDictName).dictName
            
            return { allDicts: dict.allDicts, history, currentDictName, nextDictName, previousDictName, previous, w, r }
        
        message.on 'dictionary history', (request, sender) =>
            history = storage.getHistory(request.word, 10) # at most show 8 words in the history list on dictionary header.
            return { history }

        message.on 'injected', (request, sender) =>
            return unless sender.tab 

            if request.preinject and sender.tab.url
                if not setting.getValue('excludedSites')
                .split('\n')
                .filter((x) => x.trim())
                .find((x) => sender.tab.url.match(new RegExp(x)))
                    chrome.tabs.executeScript sender.tab.id, {
                        allFrames: true,
                        file: 'inject.bundle.js'
                    }

            win = @getByTab sender.tab.id 
            if win 
                d = dict.getDict(win.dictName)
                if d.css
                    chrome.tabs.insertCSS win.tid, {
                        runAt: "document_start",
                        code: d.css
                    }
                
                return {
                    dictUrl: chrome.runtime.getURL('dict.html'),
                    cardUrl: chrome.runtime.getURL('card.html'),
                    dict: d,
                    word: win.word,
                    sentence: win.sentence 
                }
            else if utils.isMobile()
                chatgptDict = dict.getDict("chatgpt definition")
                if chatgptDict && sender.tab.url.startsWith(chatgptDict.windowUrl)
                    @create({ w: {id: sender.tab.windowId}, tid: sender.tab.id, url: sender.tab.url, dictName: chatgptDict.dictName })
                    if chatgptDict.css
                        chrome.tabs.insertCSS sender.tab.id, {
                            runAt: "document_start",
                            code: chatgptDict.css
                        }
                    
                    return {
                        dictUrl: chrome.runtime.getURL('dict.html'),
                        cardUrl: chrome.runtime.getURL('carchatgptDicthtml'),
                        dict: chatgptDict
                    }

           
        message.on 'window resize', (request, sender) =>
            @getByTab(sender.tab.id)?.saveWindowPosition()

        message.on 'sendToDict', ( request, sender ) =>
            @getByTab(sender.tab.id)?.sendMessage request

        message.on 'get wikipedia', ( request, sender ) =>
            win = @getByTab(sender.tab.id)

            return if win.windex != 0  # only show at the main window.
            return if not win?.word 
            
            if utils.isEnglish win.word 
                return $.get "https://en.m.wikipedia.org/api/rest_v1/page/summary/" + win.word
            else if utils.isChinese(win.word) and setting.getValue "enableLookupChinese"
                return $.get "https://zh.wikipedia.org/api/rest_v1/page/summary/" + win.word
            else if utils.isJapanese win.word
                return $.get "https://ja.wikipedia.org/api/rest_v1/page/summary/" + win.word

        message.on 'card setting', ( { sys, origin } ) =>
            if sys == 'wiki' 
                disabled = setting.getValue 'disableWikipediaCard'
            
            s = setting.getValue 'minimalCards'
            minimal = s.includes(sys)

            return { disabled, minimal }

        message.on 'card minimal', ( { sys, minimal } ) =>
            s = setting.getValue 'minimalCards'
            arr = s.split(',').filter (n) -> n != sys 
            if minimal
                arr.push sys 
            setting.setValue 'minimalCards', arr.join(',')


}