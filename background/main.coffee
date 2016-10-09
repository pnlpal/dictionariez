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
    "background/ext",
    "background/storage",
    "background/dictwindow.js",
    "background/message.js"], ($, utils, setting, ext, storage, dictWindow, message)->

        onClickedContextMenu = (info, tab)->
            if info.selectionText
                dictWindow.lookup(info.selectionText)

        chrome.browserAction.onClicked.addListener (tab)->
            b = !setting.getValue('enableMinidict')
            setting.setValue('enableMinidict', b)
            ext.setBrowserIcon(b)

        setting.init().done (c)->
            ext.setBrowserIcon(c.enableMinidict)

        storage.init()

        chrome.contextMenus.create {
            title: "使用 FairyDict 查询 '%s'",
            contexts: ["selection"],
            onclick: onClickedContextMenu
        }

