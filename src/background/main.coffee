
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
    dict.syncExtraDicts()

    { default: dw } = await import(### webpackChunkName: "dictwindow"  ###"./dictwindow.coffee")
    await dw.init()
    window.dw = dw

    await import(### webpackChunkName: "auto-complete"  ###"./auto-complete.coffee")
    
    { default: lookupParser } = await import(### webpackChunkName: "lookup-parser"  ###"./lookup-parser.coffee")
    lookupParser.init()

    { default: speak } = await import(### webpackChunkName: "speak"  ###"./speak.coffee")
    speak.init()

    { default: ankiWindow } = await import(### webpackChunkName: "ankiwindow"  ###"./ankiwindow.coffee")
    ankiWindow.init()

    { default: pnlpal } = await import(### webpackChunkName: "pnlpal"  ###"./pnlpal.coffee")
    pnlpal.init()
)()
