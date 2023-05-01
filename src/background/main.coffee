
# import storage from  "./storage.coffee"
# import dictWindow from "./dictwindow.coffee"
# import dict from "./dict.coffee"
# import message from "./message.coffee"
import "./hot-reload-content-scripts.js"

# import './plain-lookup.coffee'
(() ->
    { default: setting } = await import(### webpackChunkName: "setting"  ###"./setting.coffee")
    await setting.init()
    window.setting = setting

    { default: storage } = await import(### webpackChunkName: "storage"  ###"./storage.coffee")
    await storage.init()
    window.storage = storage

    { default: dict } = await import(### webpackChunkName: "dict"  ###"./dict.coffee")
    await dict.init()
    window.dict = dict

    { default: dw } = await import(### webpackChunkName: "dictwindow"  ###"./dictwindow.coffee")
    await dw.init()
    window.dw = dw
    window.dictWindows = dw.dictWindows

    await import(### webpackChunkName: "auto-complete"  ###"./auto-complete.coffee")
    
    { default: lookupParser } = await import(### webpackChunkName: "lookup-parser"  ###"./lookup-parser.coffee")
    lookupParser.init()

    { default: speak } = await import(### webpackChunkName: "speak"  ###"./speak.coffee")
    speak.init()
    window.speak = speak;

    { default: ankiWindow } = await import(### webpackChunkName: "ankiwindow"  ###"./ankiwindow.coffee")
    ankiWindow.init()

    { default: pnlpal } = await import(### webpackChunkName: "pnlpal"  ###"./pnlpal.coffee")
    pnlpal.init()
)()

chrome.runtime.onInstalled.addListener (details) ->
    manifestData = chrome.runtime.getManifest()

    if [chrome.runtime.OnInstalledReason.INSTALL].includes(details.reason) \
        and details.previousVersion != manifestData.version
        chrome.tabs.create({
            url: chrome.runtime.getURL('share.html')
        })