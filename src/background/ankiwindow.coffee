import $ from "jquery"
import message from "./message.coffee"
import utils from "utils"
import setting from "./setting.coffee"
import plainLookup from "./lookup-parser.coffee"
import storage from "./storage.coffee"

class AnkiWindow 
    url: 'https://ankiuser.net/edit/'
    w: null,
    tid: null, 
    wordItem: null, 
    reset: ()->
        @w = null
        @tid = null
        @wordItem = null
        window.clearInterval(@savePosInterval) if @savePosInterval
        @savePosInterval = null

    open: (useDefaultPosition)->
        # bugfix: dont know how why, windowWidth and windowHeight are saved as number, need integer here.
        width = parseInt(setting.getValue('ankiWidth'))
        height = parseInt(setting.getValue('ankiHeight'))

        # fix too small value
        width = 580 if !width or width < 300
        height = 600 if !height or height < 300
        
        defaultLeft = Math.round((screen.width / 2) - (width / 2))
        defaultTop = Math.round((screen.height / 2) - (height / 2))
        left = setting.getValue('ankiLeft', defaultLeft)
        top = setting.getValue('ankiTop', defaultTop)
        
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
                # console.log "[dictWindow] create window position: top: #{top}, left: #{left}, width: #{width}, height: #{height}"
                chrome.windows.create({
                    url: @url,
                    type: 'popup',
                    width: width,
                    height: height,
                    top: if utils.isLinux() then top - screen.availTop else top, # fix top value on Linux, may be chrome's bug.
                    left: if utils.isLinux() then left - screen.availLeft else left, # fix left value on Linux, may be chrome's bug.
                    state: 'normal',
                }, (win)=>
                    if not win
                        return @open(true) if not useDefaultPosition
                        return reject(new Error("Failed to create the popup anki window!")) 

                    @w = win
                    @tid = @w.tabs[0].id
                    resolve()

                    @savePosInterval = window.setInterval @saveWindowPosition.bind(this), 3000
                )
            else
                chrome.windows.update(@w.id, {
                    focused: true
                })
                resolve()

    saveWindowPosition: ()->
        if @w
            chrome.windows.get @w.id, null, (w)=>
                if w?.width and w?.height
                    # console.log "[dictWindow] update window position: top: #{w.top}, left: #{w.left}, width: #{w.width}, height: #{w.height}"
                    setting.setValue 'ankiWidth', w.width
                    setting.setValue 'ankiHeight', w.height
                if w?.top? and w?.left?
                    setting.setValue 'ankiLeft', w.left
                    setting.setValue 'ankiTop', w.top
    sendMessage: (msg)->
        chrome.tabs.sendMessage(@tid, msg) if @tid


export default {
    anki: new AnkiWindow(),

    getNextWord: (prevWord) ->
        item = storage.getPreviousAnkiUnsaved prevWord
        if item?.w 
            @anki.wordItem = item 
            console.info "Anki to save next word: #{item.w}"

    init: () ->
        chrome.windows.onRemoved.addListener (wid) =>
            if @anki.w?.id == wid
                @anki.reset()

        message.on 'open anki', (request) =>
            @anki.open()
            @anki.wordItem = request
        
        message.on 'get anki info', (request, sender) =>
            if sender.tab.id == @anki.tid 
                if request.ankiSavedWord
                    console.info "Anki saved word: #{request.ankiSavedWord}"
                    @anki.wordItem = null 
                    await storage.savedAnki request.ankiSavedWord
                    @getNextWord(request.ankiSavedWord)

                if request.ankiSkippedWord 
                    @getNextWord(request.ankiSkippedWord)

                if @anki.wordItem?.w 
                    lookupInfo = await plainLookup.parser.parse(@anki.wordItem.w.toLowerCase())

                    if lookupInfo?.images?.length
                        await Promise.all lookupInfo.images.map (image) ->
                            dataUrl = await utils.imageToDataUrl(image.src)
                            image.dataUrl = dataUrl

                    return {wordItem: @anki.wordItem, lookupInfo, followedWords: lookupInfo?.map?((n) -> n.w)}

        message.on 'image to data url', (request, sender) => 
            dataUrl = await utils.imageToDataUrl(request.src)
            {width, height} =  await utils.imageSize(dataUrl)

            return {dataUrl, width, height}

}       
