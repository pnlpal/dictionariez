/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
import utils from "utils";

export var initClipboardReader = () => utils.listenToBackground('read clipboard text', async function() {
    try { 
        const text = await navigator.clipboard.readText();
        return chrome.runtime.sendMessage({
            text: text || '', 
            type: 'clipboard text'
        });
    } catch (err) {
        return chrome.runtime.sendMessage({
            error: err?.message || "not supported on this browser.",
            type: 'read clipboard text error'
        });
    }
});