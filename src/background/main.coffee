
# import storage from  "./storage.coffee"
# import dictWindow from "./dictwindow.coffee"
# import dict from "./dict.coffee"
# import message from "./message.coffee"
# import "./hot-reload-content-scripts.js"

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

    { default: dictWindow } = await import(### webpackChunkName: "dictwindow"  ###"./dictwindow.coffee")
    await dictWindow.init()

    await import(### webpackChunkName: "plain-lookup"  ###"./plain-lookup.coffee")
)()
