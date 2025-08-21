import message from "./message.js";
import setting from "./setting.js";
import plainLookup from "./plain-lookup.js";
import utils from "utils";

export default (currentTab) =>
    new Promise((resolve, reject) => {
        if (!setting.getValue("enableReadClipboard")) {
            resolve();
            return;
        }
        if (!currentTab?.url?.startsWith("http")) {
            resolve();
            return;
        }

        chrome.tabs.sendMessage(currentTab.id, { type: "read clipboard text" });

        message.on("clipboard text", (request) => {
            setting.setValue("readClipboardError", undefined);
            resolve(plainLookup.checkTypeOfSupport(request.text));
        });

        message.on("read clipboard text error", (request) => {
            setting.setValue("enableReadClipboard", false);
            setting.setValue("readClipboardError", "Read clipboard failed: " + request.error);
            resolve();
        });

        setTimeout(resolve, 5000);
    });
