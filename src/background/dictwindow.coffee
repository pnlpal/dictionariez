import setting from "./setting.coffee"
import storage from  "./storage.coffee"
import dict from "./dict.coffee"
import message from "./message.coffee"
import readClipboard from "./clipboard.coffee"
import utils from "utils"

screenWidth = 1280
screenHeight = 800
screenAvailLeft = 0
screenAvailTop = 0


getInfoOfSelectionCode = () ->
    getSentence = () ->
        try
            selection = window.getSelection()
            range = selection.getRangeAt(0)
            return unless selection.toString()

            range1 = range.cloneRange()
            range1.detach()

            selection.modify('move', 'backward', 'sentence')
            selection.modify('extend', 'forward', 'sentence')

            text = selection.toString().trim()

            selection.removeAllRanges()
            selection.addRange(range1)

            return text
        catch err
            # On firefox, unable to get sentence.
            return

    return [window.getSelection().toString().trim(), getSentence(), screen.width, screen.height, screen.availLeft, screen.availTop]
    


class DictWindow
    wid: null
    tid: null
    url: null
    word: null
    sentence: null
    dictName: null
    windex: 0

    defaultUrl: chrome.runtime.getURL('dict.html')

    constructor: ({ @wid, @tid, @url, @word, @sentence, dictName, windex } = {}) ->
        @dictName = dictName || setting.getValue('dictionary') || dict.allDicts[0].dictName
        @windex = windex || 0

    reset: ()->
        @wid = null
        @tid = null
        @url = null
        @word = null
        @sentence = null
        @dictName = null

    getStoredPosition: ()->
        # bugfix: dont know how why, windowWidth and windowHeight are saved as number, need integer here.
        return {
            width: parseInt setting.getValue('windowWidth')
            height: parseInt setting.getValue('windowHeight')
            left: parseInt setting.getValue('windowLeft')
            top: parseInt setting.getValue('windowTop')
        }

    open: (url, useDefaultPosition)->
        { width, height, left, top } = @getStoredPosition()

        # fix too small value
        width = 580 if !width or width < 300
        height = 600 if !height or height < 300
        
        defaultLeft = Math.round((screenWidth / 2) - (width / 2))
        defaultTop = Math.round((screenHeight / 2) - (height / 2))
        left = defaultLeft if isNaN left
        top = defaultTop if isNaN top 

        # setup the other cloned window 
        if @windex > 0
            top += 50 * @windex
            left += 50 * @windex 
        
        # fix top value on Linux, may be chrome's bug.
        if utils.isLinux()
            if top > screenAvailTop
                top = defaultTop 
            if left > screenAvailLeft
                left = defaultLeft

        if useDefaultPosition
            top = defaultTop
            left = defaultLeft
            width = screenWidth if width > screenWidth
            height = screenHeight if height > screenHeight

        return new Promise (resolve, reject) =>
            if !@wid
                chrome.windows.create({
                    url: url or @defaultUrl,
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

                    @wid = win.id
                    @tid = win.tabs[win.tabs.length-1].id
                    @url = url or @defaultUrl
                    resolve()

                    # Firefox can't remember top and left, opera can't remember at all.
                    if navigator.userAgent.toLowerCase().indexOf('firefox') > -1 or navigator.userAgent.toLowerCase().indexOf('opr') > -1
                        chrome.windows.update @wid, {
                            width: width,
                            height: height,
                            top: if utils.isLinux() then top - screenAvailTop else top, # fix top value on Linux, may be chrome's bug.
                            left: if utils.isLinux() then left - screenAvailLeft else left, # fix left value on Linux, may be chrome's bug.
                        }
                )
            else
                try 
                    await @focus()
                    if url and url != @url
                        chrome.tabs.update(@tid, {
                            url: url
                        })
                        @url = url
                
                        resolve()
                    else 
                        resolve({noUpdate: true})
                catch err
                    console.error("[dictWindow] open error: ", err)
                    reject(err)
                    
    focus: () ->
        chrome.windows.update(@wid, {
            focused: true
        })

    sendMessage: (msg)->
        chrome.tabs.sendMessage(@tid, msg) if @tid

    lookup: (text, sentence, languagePrompt)->
        url = ''
        text = @word if not text

        if text
            if @word != text || @sentence != sentence
                @word = text
                @sentence = sentence || null
                result = await dict.query(text, @dictName || setting.getValue('dictionary')) 
                url = result?.windowUrl
                @sendMessage({type: 'querying', text, sentence, languagePrompt})
            else 
                url = @url 

        return @open(url)
            

export default {
    DictWindow,
    dictWindows: [],

    lookup: ({ w, s, sc, sentence, languagePrompt } = {}) ->
        storage.addHistory { w, s, sc, sentence } if w and s  # ignore lookup from options page
        
        if @dictWindows.length
            result = null
            for win in @dictWindows
                result = await win.lookup(w, sentence, languagePrompt)
                    
            @saveInStorage()
            return result
        else 
            result = await @create().lookup(w, sentence, languagePrompt)
            @saveInStorage()
            return result

    create: (options = {}) ->
        win = @dictWindows.find (win) -> win.wid == options.wid
        if (win) 
            win.url = options.url
            win.word = options.word
            win.sentence = options.sentence 
            win.dictName = options.dictName
        else 
            win = new DictWindow(options)
            win.windex = @dictWindows.length
            @dictWindows.push win
        
        @saveInStorage()
        return win 

    destroyWin: ({ wid, tid } = {}) ->
        @dictWindows.forEach (win)->
                if win.wid == wid or win.tid == tid
                    win.reset()
        @dictWindows = @dictWindows.filter (win) -> win.wid
        @saveInStorage()

    saveInStorage: () ->
        await chrome.storage.local.set { dictWindows: @dictWindows.map((win) -> { 
            wid: win.wid, 
            tid: win.tid, 
            url: win.url, 
            word: win.word, 
            dictName: win.dictName 
        }) }

        # chrome.storage.local.get 'dictWindows', (data) =>
        #     if data.dictWindows
        #         console.log "[dictWindow] saved to storage: ", data.dictWindows

    restoreFromStorage: () ->
        if @dictWindows.length
            return

        data = await chrome.storage.local.get 'dictWindows'

        i = 0
        for options in data.dictWindows or []
            if options.wid and options.tid
                try 
                    await chrome.windows.get(options.wid)
                    win = new DictWindow({ ...options, windex: i })
                    @dictWindows.push win
                    i += 1
                catch err 
                    console.warn("[dictWindow] restore error: ", err.message, 'Ignored.')


    mainDictWindow: ({ dictName }) ->
        win = @dictWindows[0] or @create({ dictName })
        win.dictName = dictName if dictName
        return win
    
    getByTab: (tid) ->
        for win in @dictWindows 
            if win.tid == tid 
                return win 

    triggerByAction: (tab, word) ->
        # console.log("[dictWindow] some action triggered to lookup", word)
        chrome.scripting.executeScript {
            target : { tabId : tab.id },
            func: getInfoOfSelectionCode 
        }, (res) =>
            # [word2, sentence, screenWidth, screenHeight, screenAvailLeft, screenAvailTop] = 
            result = res?[0].result or []
            w = word || result[0]
            if not w
                w = await readClipboard() 
            
            sentence = result[1]
            screenWidth = result[2] || screenWidth
            screenHeight = result[3] || screenHeight 
            screenAvailLeft = result[4] || screenAvailLeft 
            screenAvailTop = result[5] || screenAvailTop
            @lookup({ w, sentence, s: tab.url, sc: tab.title })

    init: () ->
        # console.log("[dictWindow] init")
        await @restoreFromStorage()

        if not setting.getValue "disableContextMenu"
            chrome.contextMenus.create {
                id: "lookup",
                title: "Look up '%s' in dictionaries",
                contexts: ["selection"],
            }
            

        message.on "copy event triggered", ({s, sc, sentence}) => 
            w = await readClipboard()
            if w
                @lookup({ w, s, sc, sentence })

        message.on 'look up', ({ dictName, w, s, sc, sentence, means, newDictWindow }) =>
            # 'look up' can be triggered by the context menu or the hotkey or any webpages
            if means == 'mouse'
                if not setting.getValue('enableMinidict')
                    return

            if !w 
                w = await readClipboard()

            if newDictWindow 
                targetWin = @create({ dictName })
                result = await targetWin.lookup(w || @dictWindows[0].word, sentence)

            else if dictName # only change the main window or in new window.
                result = await @mainDictWindow({ dictName }).lookup(w?.trim(), sentence)

            else  # This is more likely to happen.
                result = await @lookup({ w: w?.trim(), s, sc, sentence })

            @saveInStorage()
            return result

        message.on 'query', (request, sender) =>
            # query message only comes from the dict window.
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
                targetWin = @create({ dictName })
                result = await targetWin.lookup(w, sentence, languagePrompt)
            else 
                senderWin.dictName = dictName if dictName
                result = await @lookup({ w, sentence, languagePrompt })
            
            @saveInStorage()
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
                    chrome.scripting.executeScript {
                        target: { tabId: sender.tab.id, allFrames: true},
                        files: ['inject.bundle.js']
                    }

            win = @getByTab sender.tab.id 
            if win 
                d = dict.getDict(win.dictName)
                if d.css
                    chrome.scripting.insertCSS {
                        target: { tabId: sender.tab.id },
                        css: d.css
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
                    @create({ wid: sender.tab.windowId, tid: sender.tab.id, url: sender.tab.url, dictName: chatgptDict.dictName })
                    if chatgptDict.css
                        chrome.scripting.insertCSS {
                            target: { tabId: sender.tab.id },
                            css: chatgptDict.css
                        }
                    
                    return {
                        dictUrl: chrome.runtime.getURL('dict.html'),
                        cardUrl: chrome.runtime.getURL('card.html'),
                        dict: chatgptDict
                    }

        
        message.on 'beforeunload dict window', (request, sender) =>
            setting.setValue 'windowWidth', request.width
            setting.setValue 'windowHeight', request.height
            setting.setValue 'windowLeft', request.left
            setting.setValue 'windowTop', request.top
            setting.setValue 'dictionary', request.dictName

        message.on 'sendToDict', ( request, sender ) =>
            @getByTab(sender.tab.id)?.sendMessage request

        message.on 'get wikipedia', ( request, sender ) =>
            win = @getByTab(sender.tab.id)

            return if win.windex != 0  # only show at the main window.
            return if not win?.word 
            
            if utils.isEnglish win.word 
                return utils.loadJson "https://en.m.wikipedia.org/api/rest_v1/page/summary/" + win.word
            else if utils.isChinese(win.word) and setting.getValue "enableLookupChinese"
                return utils.loadJson "https://zh.wikipedia.org/api/rest_v1/page/summary/" + win.word
            else if utils.isJapanese win.word
                return utils.loadJson "https://ja.wikipedia.org/api/rest_v1/page/summary/" + win.word

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