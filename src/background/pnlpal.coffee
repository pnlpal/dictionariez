import message from "./message.coffee"
import setting from "./setting.coffee"

shareOnPnlpal = (title, link) ->
    popupWidth = 1024
    popupHeight = 700

    chrome.windows.getCurrent null, ({top, left, width, height}) ->
        if width < popupWidth
            popupLeft = (screen.width / 2) - (popupWidth / 2);
        else #calculate top and left position
            popupLeft = ((width / 2) - (popupWidth / 2)) + left
        
        if height < popupWidth
            popupTop = ((screen.height / 2) - (popupHeight / 2)) + top
        else
            popupTop = ((height / 2) - (popupHeight / 2)) + top
        
        url = "https://pnlpal.dev/compose?cid=1&title=#{encodeURIComponent(title)}&link=#{encodeURIComponent(link)}"

        chrome.windows.create {
            url,
            type: 'popup',
            width: popupWidth,
            height: popupHeight,
            top: popupTop,
            left: popupLeft
        }

openedYtbLink = ''
openedTabId = null 

openYtbOnCaptionz = (link) ->
    openedYtbLink = link
    url = "https://pnlpal.dev/captionz"

    chrome.tabs.create {
        url
    }, (tab) => 
        openedTabId = tab.id


export default {
    init: () ->
        if not setting.getValue "disableContextMenu"
            chrome.contextMenus.create {
                title: "Share with pals",
                contexts: ["page"],
                onclick: (info, tab) =>
                    shareOnPnlpal tab.title, tab.url
            }

        if not setting.getValue "disableYtbCaptionz"
            chrome.contextMenus.create {
                title: "Watch this video on Captionz",
                contexts: ["link"],
                targetUrlPatterns: [
                    "https://www.youtube.com/watch*"
                ],
                onclick: (info, tab) =>
                    if info.linkUrl?.startsWith "https://www.youtube.com/watch"
                        openYtbOnCaptionz info.linkUrl

            }

        message.on 'share with pals', ({ title, link })->
            shareOnPnlpal title, link

        message.on 'setting of ytb captionz', () ->
            return { disableYtbCaptionz: setting.getValue("disableYtbCaptionz") }

        message.on 'open ytb video on captionz', ({ link })->
            if link.startsWith "https://www.youtube.com/watch"
                openYtbOnCaptionz link 
        
        message.on 'get ytb link on captionz', (request, sender) ->
            if sender.tab.id == openedTabId
                link = openedYtbLink 

                openedYtbLink = ''
                openedTabId = null 
                return link
}