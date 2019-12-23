import setting from "./setting.coffee"
import storage from  "./storage.coffee"
import dictWindow from "./dictwindow.coffee"
import dict from "./dict.coffee"
import message from "./message.coffee"
import "./hot-reload-content-scripts.js"

import './plain-lookup.coffee'

window.setting = setting

onClickedContextMenu = (info, tab)->
    if info.selectionText
        dictWindow.lookup({ w: info.selectionText, s: tab.url, sc: tab.title })

chrome.browserAction.onClicked.addListener (tab)->
    return dictWindow.lookup()

setting.init().then (c)->
    await storage.init()
    await dict.init()
    await dictWindow.init()

chrome.contextMenus.create {
    title: "使用 Dictionaries 查询 '%s'",
    contexts: ["selection"],
    onclick: onClickedContextMenu
}

