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

    open: ()->
        # bugfix: dont know how why, windowWidth and windowHeight are saved as number, need integer here.
        width = parseInt(setting.getValue('ankiWidth'))
        height = parseInt(setting.getValue('ankiHeight'))
        left = setting.getValue('ankiLeft', Math.round((screen.width / 2) - (width / 2)))
        top = setting.getValue('ankiTop', Math.round((screen.height / 2) - (height / 2)))

        return new Promise (resolve) =>
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
                    item = storage.getPreviousAnkiUnsaved request.ankiSavedWord 
                    if item?.w 
                        @anki.wordItem = item 
                        console.info "Anki to save next word: #{item.w}"

                if @anki.wordItem?.w 
                    lookupInfo = await plainLookup.parser.parse(@anki.wordItem.w)
                    return {wordItem: @anki.wordItem, lookupInfo}

}       
