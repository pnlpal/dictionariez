import utils from "utils"
import message from "./message.coffee"
import setting from "./setting.coffee"

creating = null  # A global promise to avoid concurrency issues

setupOffscreenDocument = () ->
    path = 'offscreen.html'
    offscreenUrl = chrome.runtime.getURL(path)
    existingContexts = await chrome.runtime.getContexts({
        contextTypes: ['OFFSCREEN_DOCUMENT'],
        documentUrls: [offscreenUrl]
    })

    if (existingContexts.length > 0)
        return
    
    if creating
        await creating
    else 
        creating = chrome.offscreen.createDocument({
            url: path,
            reasons: ['AUDIO_PLAYBACK'],
            justification: 'Play audio of the word',
        })
        await creating
        creating = null
    
export default {
    init: () ->
        message.on 'play audios', ({ ameSrc, breSrc, otherSrc, checkSetting, synthesisObj}) ->
            await setupOffscreenDocument()
            if checkSetting 
                if not setting.getValue 'enableAmeAudio'
                    ameSrc = null
                if not setting.getValue 'enableBreAudio'
                    breSrc = null

                chrome.runtime.sendMessage({
                    type: 'speak',
                    ameSrc,
                    breSrc 
                })
            
            if otherSrc
                chrome.runtime.sendMessage({
                    type: 'speak',
                    otherSrc 
                })
            
            if synthesisObj
                chrome.runtime.sendMessage({
                    type: 'speak',
                    synthesisObj
                })
}