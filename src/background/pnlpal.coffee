import message from "./message.js"
import setting from "./setting.js"

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
        
        if link.includes('youtube.com') and link.includes('v=')
            cid = 5
            title = title.replace ' - YouTube', ''
        else 
            cid = 1
        url = "https://pnlpal.dev/compose?cid=#{cid}&title=#{encodeURIComponent(title)}&link=#{encodeURIComponent(link)}"

        chrome.windows.create {
            url,
            type: 'popup',
            width: popupWidth,
            height: popupHeight,
            top: Math.round(popupTop),
            left: Math.round(popupLeft)
        }

export default {
    shareOnPnlpal,
    init: () ->
        if not setting.getValue "disableSharePnlpal"
            chrome.contextMenus.create {
                id: "share-with-pals", 
                title: "Share with pals",
                contexts: ["page"],
            }
            
        message.on 'share with pals', ({ title, link })->
            shareOnPnlpal title, link

}