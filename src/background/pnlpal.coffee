import message from "./message.js"
import setting from "./setting.js"


openYtbOnCaptionz = (link) ->
    url = "https://pnlpal.dev/captionz?link="+encodeURIComponent(link)

    chrome.tabs.create {
        url
    }


export default {
    openYtbOnCaptionz,
    init: () ->
        message.on 'setting of ytb captionz', () ->
            return { disableYtbCaptionz: setting.getValue("disableYtbCaptionz") }
        message.on 'open ytb video on captionz', ({ link })->
            if link.startsWith "https://www.youtube.com/watch"
                openYtbOnCaptionz link 
}