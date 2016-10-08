define ["jquery",
    "utils",
    "background/setting",
    "background/ext",
    "background/dict.js",
    "background/dictwindow.js"], ($, utils, setting, ext, dict, dictWindow)->
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
            dictWindow.queryDict(request.text, request.dictionary, request.queryId)

        else if request.type == 'dictionary'
            dictionary = setting.getValue('dictionary')
            sendResponse {allDicts: dict.allDicts, dictionary}

        else if request.type == 'setting'
            sendResponse setting.configCache

        else if request.type == 'save setting'
            setting.setValue(request.key, request.value)
            if request.key == 'enableMinidict'
                ext.setBrowserIcon request.value

        # sendResponse becomes invalid when the event listener returns,
        # unless you return true from the event listener to indicate you wish to send a response asynchronously
        return true
