import message from "./message.js";
import setting from "./setting.js";
import plainLookup from "./plain-lookup.js";

const CLIPBOARD_TIMEOUT_MS = 5000;

export default (currentTab) =>
    new Promise((resolve) => {
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
            setting.setValue("readClipboardError", `Read clipboard failed: ${request.error}`);
            resolve();
        });

        // Timeout fallback
        setTimeout(resolve, CLIPBOARD_TIMEOUT_MS);
    });
