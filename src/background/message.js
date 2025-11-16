let listeners = {};
let openOptionsTo = "";

export default {
    handle: function (request, sender, sendResponse) {
        if (request.type == "open options") {
            chrome.runtime.openOptionsPage();
            openOptionsTo = request.to;
        } else if (request.type == "open options request to") {
            sendResponse({ to: openOptionsTo });
            openOptionsTo = "";
        } else if (request.type in listeners) {
            let ret = listeners[request.type](request, sender);
            if (ret?.then) {
                ret.then(sendResponse).catch((err) => {
                    console.error(`[message] ${request.type} failed: ${err.message}`, err, request);
                    sendResponse({ error: err.message, ...err.details });
                });
            } else {
                sendResponse(ret);
            }
        }
    },

    on: function (type, callback) {
        listeners[type] = callback;
    },
};
