import utils from "utils";

export const initClipboardReader = () =>
    utils.listenToBackground("read clipboard text", async () => {
        try {
            const text = await navigator.clipboard.readText();
            chrome.runtime.sendMessage({
                text: text || "",
                type: "clipboard text",
            });
        } catch (err) {
            chrome.runtime.sendMessage({
                error: err?.message || "not supported on this browser.",
                type: "read clipboard text error",
            });
        }
    });
