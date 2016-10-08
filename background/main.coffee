require.config({
    baseUrl: ""
    paths:
        "jquery": "bower_components/jquery/dist/jquery",
        "utils": "utils"
    shim:
        utils:
            "exports": "utils"

})

require ["jquery",
    "utils",
    "background/setting",
    "background/dictwindow.js",
    "background/message.js"], ($, utils, setting, dictWindow, message)->
        setBrowserIcon = (enable)->
            title = '已打开鼠标取词功能'
            imgPath = 'images/dict-on24.png'
            if !enable
                title = '已关闭鼠标取词功能'
                imgPath = 'images/dict-off24.png'

            chrome.browserAction.setTitle({
                title: title
            })
            chrome.browserAction.setIcon({
                path: imgPath
            })

        onClickedContextMenu = (info, tab)->
            if info.selectionText
                dictWindow.lookup(info.selectionText)

        chrome.browserAction.onClicked.addListener (tab)->
            b = !setting.getValue('enableMinidict')
            setting.setValue('enableMinidict', b)
            setBrowserIcon(b)

        setting.init().done (c)->
            setBrowserIcon(c.enableMinidict)

        chrome.contextMenus.create {
            title: "使用 FairyDict 查询 '%s'",
            contexts: ["selection"],
            onclick: onClickedContextMenu
        }

