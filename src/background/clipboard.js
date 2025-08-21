/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
import message from "./message.js";
import setting from "./setting.js";
import plainLookup from "./plain-lookup.js";
import utils from "utils";

export default (currentTab) =>
    new Promise(function (resolve, reject) {
        if (!setting.getValue("enableReadClipboard")) {
            return resolve();
        }
        if (!currentTab?.url?.startsWith("http")) {
            return resolve();
        }

        chrome.tabs.sendMessage(currentTab.id, { type: "read clipboard text" });

        message.on("clipboard text", function (request) {
            setting.setValue("readClipboardError", undefined);
            return resolve(plainLookup.checkTypeOfSupport(request.text));
        });

        message.on("read clipboard text error", function (request) {
            setting.setValue("enableReadClipboard", false);
            setting.setValue("readClipboardError", "Read clipboard failed: " + request.error);
            return resolve();
        });

        return setTimeout(resolve, 5000);
    });
