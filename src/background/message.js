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
      if (ret && ret.then) {
        ret
          .catch(function (err) {
            console.error(
              "[message] " + request.type + " failed: ",
              err,
              request
            );
          })
          .then(sendResponse);
      } else {
        sendResponse(ret);
      }
    }
  },

  on: function (type, callback) {
    listeners[type] = callback;
  },
};
