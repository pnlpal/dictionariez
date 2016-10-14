define ["jquery",
    "utils",
    "background/setting",
    "background/ext",
    "background/storage",
    "background/dict.js",
    "background/dictwindow.js"], ($, utils, setting, ext, storage, dict, dictWindow)->
    console.log "[message] init"

    chrome.runtime.onMessage.addListener (request, sender, sendResponse)->
        if request.type == 'getJson'
            utils.getJson(request.url, request.data).then ((res)->
                sendResponse(res)), sendResponse
        else if request.type == 'postJson'
            utils.postJson(request.url, request.data).then ((res)->
                sendResponse(res)), sendResponse
        else if request.type == 'look up'
            if request.means == 'mouse'
                if not setting.getValue('enableMinidict')
                    return
            dictWindow.lookup(request.text)

        else if request.type == 'query'
            setting.setValue('dictionary', request.dictionary) if request.dictionary
            dictWindow.queryDict(request.text, request.dictionary, request.inHistory)

        else if request.type == 'dictionary'
            dictionary = setting.getValue('dictionary')
            history = storage.history
            sendResponse {allDicts: dict.allDicts, dictionary, history}
            dictWindow.onDictInited()

        else if request.type == 'setting'
            sendResponse setting.configCache

        else if request.type == 'save setting'
            setting.setValue(request.key, request.value)
            if request.key == 'enableMinidict'
                ext.setBrowserIcon request.value

        else if request.type == 'rating'
            storage.addRating request.text, request.value

        else if request.type == 'deleteHistory'
            storage.deleteHistory(request.text)

        else if request.type == 'injected'
            dictWindow.onContentInjected(request.url, sender.tab.id)

        # sendResponse becomes invalid when the event listener returns,
        # unless you return true from the event listener to indicate you wish to send a response asynchronously
        return true
