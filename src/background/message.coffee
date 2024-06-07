listeners = {}
openOptionsTo = ''

export default {
    handleAll: (request, sender, sendResponse) ->
        if request.type == 'open options'
            chrome.runtime.openOptionsPage()
            openOptionsTo = request.to
        else if request.type == 'open options request to'
            sendResponse { to: openOptionsTo }
            openOptionsTo = ''

        else if request.type in Object.keys(listeners)
            ret = listeners[request.type](request, sender)
            if ret?.then
                ret.catch (err) ->
                    console.error "[message] #{request.type} failed: ", err, request
                .then sendResponse

            else
                sendResponse ret

        

    on: (type, callback) ->
        listeners[type] = callback
}