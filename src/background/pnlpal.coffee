import message from "./message.coffee"

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

export default {
    init: () ->
        chrome.contextMenus.create {
            title: "Share your reading with pals",
            contexts: ["page"],
            onclick: (info, tab) =>
                shareOnPnlpal tab.title, tab.url
        }

        message.on 'share with pals', ({ title, link })->
            shareOnPnlpal title, link
}