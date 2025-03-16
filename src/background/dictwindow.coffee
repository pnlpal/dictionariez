import setting from "./setting.js"
import storage from  "./storage.js"
import dict from "./dict.coffee"
import message from "./message.js"
import readClipboard from "./clipboard.coffee"
import utils from "utils"
import contextMenu from "./contextMenu.js"

screenWidth = 1080
screenHeight = 1000
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
    isHelpMeRefine: false

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
        @isHelpMeRefine = false

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
        width = 600 if !width or width < 300 
        height = 800 if !height or height < 300
        
        defaultLeft = Math.round(((screenWidth || 1080) / 2) - (width / 2))
        defaultTop = Math.round(((screenHeight || 1000) / 2) - (height / 2))
        left = (defaultLeft || 600) if isNaN left
        top = (defaultTop || 300) if isNaN top 

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
            width = screenWidth if width > screenWidth
            height = screenHeight if height > screenHeight
            left = Math.round(((screenWidth || 1080) / 2) - (width / 2))
            top = Math.round(((screenHeight || 1000) / 2) - (height / 2))

        if !@wid
            try     
                createFn = if (await utils.isFirefox()) then browser.windows.create else chrome.windows.create
                win = await createFn({
                    url: url or @defaultUrl,
                    type: 'popup',
                    width: width,
                    height: height,
                    top: top, 
                    left: left, 
                    state: 'normal',
                })

                @wid = win.id
                @tid = win.tabs[win.tabs.length-1].id
                @url = url or @defaultUrl

            catch err
                console.error("[dictWindow] create popup window error: ", err)
                return @open(url, true) if not useDefaultPosition
                throw new Error("Failed to create the popup lookup window!")
            
        else
            try 
                await @focus()
                if url and url != @url
                    chrome.tabs.update(@tid, {
                        url: url
                    })
                    @url = url
        
                else 
                    return ({noUpdate: true})
            catch err
                console.error("[dictWindow] open error: ", err)
                throw err
                    
    focus: () ->
        chrome.windows.update(@wid, {
            focused: true
        })

    sendMessage: (msg)->
        chrome.tabs.sendMessage(@tid, msg) if @tid

    lookup: (text, sentence, languagePrompt, dictName)->
        url = @url

        sentence = @sentence if not sentence and not text 
        text = @word if not text
        dictName = @dictName if not dictName

        @isHelpMeRefine = false

        if text
            if @word != text || @sentence != sentence || @dictName != dictName
                @word = text.trim()
                @sentence = sentence
                @dictName = dictName
                result = dict.query(text, @dictName || setting.getValue('dictionary')) 
                url = result?.windowUrl
                @sendMessage({type: 'querying', text, sentence, languagePrompt})
        else 
            @dictName = dictName

        if process.env.PRODUCT == 'SidePal'
            setting.setValue 'dictionary', dictName
            utils.send 'look up result', {
                dictName: dictName,
                word: text,
                sentence: sentence,
                languagePrompt: languagePrompt,
                ...result 
            }
            return true
        else 
            return @open(url)

    refineTextWithAI: (text, dictName = null) ->
        return if not text
        @dictName = dictName if dictName
        return if not @dictName 
        return if not dict.isAI(@dictName)
        @word = text 
        @isHelpMeRefine = true
        result = dict.query(text, @dictName)
        @sendMessage({type: 'querying', text, isHelpMeRefine: true})
        return @open(result.windowUrl)
            
export default {
    DictWindow,
    dictWindows: [],

    refineTextWithAI: (text) -> 
        return if utils.isMobile()

        results = []
        for win in @dictWindows
            result = win.refineTextWithAI(text)
            results.push result if result 
        
        if not results.length
            aiDict = dict.getFirstAIDict()
            if aiDict
                result = @create({ dictName: aiDict.dictName }).refineTextWithAI(text) 

        await Promise.all(results)
        @saveInStorage()
        return result 

    lookup: ({ w, s, sc, sentence, languagePrompt, screen } = {}) ->
        storage.addHistory { w, s, sc, sentence } if w and s and (not utils.isSentence(w))  # ignore lookup from options page
        
        if @dictWindows.length
            result = null
            for win in @dictWindows
                result = await win.lookup(w, sentence, languagePrompt)
                    
            @saveInStorage()
            return result
        else 
            if (screen?.width > 1080 and screen?.height > 800) 
                screenWidth = screen.with 
                screenHeight = screen.height
                screenAvailLeft = screen.availLeft
                screenAvailTop = screen.availTop

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
            dictName: win.dictName,
            sentence: win.sentence,
            isHelpMeRefine: win.isHelpMeRefine
        }) }

        # chrome.storage.local.get 'dictWindows', (data) =>
        #     if data.dictWindows
        #         console.log "[dictWindow] saved to storage: ", data.dictWindows

    restoreFromStorage: () ->
        if @dictWindows.length
            return

        data = await chrome.storage.local.get 'dictWindows'

        i = 0
        for options in data?.dictWindows or []
            if options.wid and options.tid
                try 
                    await chrome.windows.get(options.wid)
                    win = new DictWindow({ ...options, windex: i })
                    @dictWindows.push win
                    i += 1
                catch err 
                    console.warn("[dictWindow] restore error: ", err.message, 'Ignored.')


    mainDictWindow: () ->
        return @dictWindows[0] or @create()
    
    getByTab: (tid) ->
        for win in @dictWindows 
            if win.tid == tid 
                return win 

    init: () ->
        # console.log("[dictWindow] init")
        await @restoreFromStorage()

        if not setting.getValue "disableContextMenu"
            contextMenu.createLookupItem()

        message.on "copy event triggered", ({s, sc, sentence}, sender) => 
            w = await readClipboard(sender.tab)
            if w
                @lookup({ w, s, sc, sentence })

        message.on 'look up', ({ dictName, w, s, sc, sentence, means, newDictWindow, isInEditable }, sender) =>
            # 'look up' can be triggered by the context menu or the hotkey or any webpages

            console.log("[dictWindow] look up: ", { dictName, w, s, sc, sentence, means, isInEditable })
            if means == 'mouse'
                if not setting.getValue('enableMinidict')
                    return

            if !w 
                w = await readClipboard(sender.tab)

            if isInEditable 
                result = await @refineTextWithAI(w)
            else
                result = await @lookup({ w: w?.trim(), s, sc, sentence })

                if newDictWindow and process.env.PRODUCT == 'Dictionariez'
                    targetWin = @create({ dictName })
                    result = await targetWin.lookup(w || @dictWindows[0].word, sentence)

                else if dictName # only change the main window or in new window.
                    result = await @mainDictWindow().lookup(w?.trim(), sentence, null, dictName)
                
            @saveInStorage()
            return result

        message.on 'query', (request, sender) =>
            # query message only comes from the dict window.
            senderWin = if sender.tab 
                @getByTab(sender.tab.id)
            else 
                @mainDictWindow()

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
                prev = await storage.getPrevious(w)
                w = prev?.w
                sentence = prev?.sentence
            else if request.nextWord
                next = await storage.getNext(w, true)
                w = next?.w 
                sentence = next?.sentence
            else if w and (not utils.isSentence(w))
                storage.addHistory { w, sentence }

            if senderWin.isHelpMeRefine and utils.isSentence(w) and senderWin.dictName != dictName 
                if request.newDictWindow and process.env.PRODUCT == 'Dictionariez'
                    targetWin = @create({ dictName })
                    result = await targetWin.refineTextWithAI(w)
                else 
                    result = await senderWin.refineTextWithAI(w, dictName)
                    
            else 
                if request.newDictWindow and process.env.PRODUCT == 'Dictionariez'
                    targetWin = @create({ dictName })
                    result = await targetWin.lookup(w, sentence, languagePrompt)
                else 
                    if senderWin.dictName != dictName
                        result = await senderWin.lookup(w, sentence, languagePrompt, dictName)
                    else
                        result = await @lookup({ w, sentence, languagePrompt })
            
            @saveInStorage()
            return result
                
        message.on 'dictionary', (request, sender) =>
            win = if sender.tab 
                @getByTab(sender.tab.id)
            else # SidePal
                @mainDictWindow()

            currentDictName = win?.dictName || setting.getValue('dictionary')
            currentDictName = dict.getDict(currentDictName).dictName

            if win 
                w = win.word
                if w 
                    wordDetail = await storage.getWordDetail(w)
                    r = wordDetail?.r
                    previous = wordDetail?.previous
                else 
                    previous = await storage.getPrevious()
                    
            else if !win && !request.optionsPage 
                win = @create()
                win.tid = sender.tab.id
                win.dictName = currentDictName
                previous = await storage.getPrevious()

            history = await storage.getHistory(10) # at most show 10 words in the history list on dictionary header.

            nextDictName = dict.getNextDict(currentDictName).dictName
            previousDictName = dict.getPreviousDict(currentDictName).dictName
            
            if process.env.PRODUCT == 'SidePal' and w
                { windowUrl } = await dict.query(w, currentDictName)
            return { allDicts: dict.allDicts, history, currentDictName, nextDictName, previousDictName, previous, w, r, windowUrl }
        
        message.on 'dictionary history', (request, sender) =>
            history = await storage.getHistory(10) # at most show 8 words in the history list on dictionary header.
            return { history }

        message.on 'injected', (request, sender) =>
            fromSidePanel = sender.id and !sender.tab
            if fromSidePanel
                return {
                    isInSidePanelDict: true,
                    dict: dict.getDict(@mainDictWindow().dictName),
                    word: @mainDictWindow().word,
                    sentence: @mainDictWindow().sentence
                }

            return unless sender.tab 

            win = @getByTab sender.tab.id 
            if win 
                return {
                    dictUrl: chrome.runtime.getURL('dict.html'),
                    cardUrl: chrome.runtime.getURL('card.html'),
                    dict: dict.getDict(win.dictName),
                    word: win.word,
                    sentence: win.sentence,
                    isHelpMeRefine: win.isHelpMeRefine
                }
            else if utils.isMobile()
                chatgptDict = dict.getDict("chatgpt definition")
                if chatgptDict && sender.tab.url.startsWith(chatgptDict.windowUrl)
                    @create({ wid: sender.tab.windowId, tid: sender.tab.id, url: sender.tab.url, dictName: chatgptDict.dictName })
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
            if sender.tab 
                win = @getByTab(sender.tab.id)

                return if win.windex != 0  # only show at the main window.
                return if not win?.word 
            else 
                win = @mainDictWindow()
            
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