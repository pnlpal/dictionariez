import $ from "jquery"
import message from "./message.js"
import utils from "utils"
import setting from "./setting.js"
import plainLookup from "./plain-lookup.coffee"
import storage from "./storage.js"
import dw from "./dictwindow.coffee";


class AnkiWindow extends dw.DictWindow
    defaultUrl: 'https://ankiuser.net/add'
    wordItem: null

    constructor: () ->
        super({ dictName: 'none'})

    reset: () ->
        super.reset()
        @wordItem = null

    getStoredPosition: ()->
        # bugfix: dont know how why, ankiWidth and ankiHeight are saved as number, need integer here.
        return {
            width: parseInt setting.getValue('ankiWidth')
            height: parseInt setting.getValue('ankiHeight')
            left: parseInt setting.getValue('ankiLeft')
            top: parseInt setting.getValue('ankiTop')
        }


export default {
    anki: new AnkiWindow(),

    destroyWin: ({wid}) ->
        if @anki.wid == wid
            @anki.reset()
            @saveInStorage()

    saveInStorage: () ->
        await chrome.storage.local.set { ankiWindow: { 
            wid: @anki.wid, 
            tid: @anki.tid, 
            wordItem: @anki.wordItem
        } }

        # chrome.storage.local.get 'ankiWindow', (data) =>
        #     if data.ankiWindow
        #         console.log "[ankiWindow] saved to storage: ", data.ankiWindow

    restoreFromStorage: () ->
        if @anki.wid
            return

        data = await chrome.storage.local.get 'ankiWindow'

        ankiWindow = data.ankiWindow
        if ankiWindow?.wid and ankiWindow.tid
            try 
                await chrome.windows.get(ankiWindow.wid)
                @anki.wid = ankiWindow.wid
                @anki.tid = ankiWindow.tid
                @anki.wordItem = ankiWindow.wordItem
                # console.log "[ankiWindow] restored from storage: ", @anki.wid, @anki.wordItem
            catch err 
                console.warn("[ankiWindow] restore error: ", err.message, 'Ignored.')


    getNextWord: (prevWord) ->
        item = storage.getPreviousAnkiUnsaved prevWord
        if item?.w 
            @anki.wordItem = item 
            console.info "Anki to save next word: #{item.w}"

    focus: () -> 
        if @anki.wid 
            @anki.focus()

    init: () ->
        await @restoreFromStorage()

        message.on 'open anki', (request) =>
            @anki.wordItem = request
            await @anki.open()
            @saveInStorage()
        
        message.on 'get anki info', (request, sender) =>
            if sender.tab.id == @anki.tid 
                if request.ankiSavedWord
                    console.info "Anki saved word: #{request.ankiSavedWord}"
                    @anki.wordItem = null 
                    await storage.savedAnki request.ankiSavedWord
                    @getNextWord(request.ankiSavedWord)

                if request.ankiSkippedWord 
                    console.info "Anki skipped word: #{request.ankiSkippedWord}"
                    @getNextWord(request.ankiSkippedWord)

                if @anki.wordItem?.w 
                    lookupInfo = await plainLookup.parse(sender.tab.id, @anki.wordItem.w.toLowerCase())

                    setDataToImages = (images) -> 
                        await Promise.all images.map (image) ->
                            dataUrl = await utils.imageToDataUrl(image.src)
                            image.dataUrl = dataUrl

                    if lookupInfo?.length 
                        await setDataToImages(lookupInfo[0]?.images || lookupInfo[1]?.images || [])

                    if lookupInfo?.images?.length
                        await setDataToImages(lookupInfo.images)

                    return {wordItem: @anki.wordItem, lookupInfo, followedWords: lookupInfo?.map?((n) -> n.w)}

        message.on 'image to data url', (request, sender) => 
            dataUrl = await utils.imageToDataUrl(request.src)
            return { dataUrl }

        message.on 'beforeunload anki window', (request, sender) =>
            setting.setValue 'ankiWidth', request.width
            setting.setValue 'ankiHeight', request.height
            setting.setValue 'ankiLeft', request.left
            setting.setValue 'ankiTop', request.top

}       
