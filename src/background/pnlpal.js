/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
import message from "./message.js";
import setting from "./setting.js";


const openYtbOnCaptionz = function(link) {
    const url = "https://pnl.dev/captionz?link="+encodeURIComponent(link);

    return chrome.tabs.create({
        url
    });
};


export default ({
    openYtbOnCaptionz,
    init() {
        message.on('setting of ytb captionz', () => ({
            disableYtbCaptionz: setting.getValue("disableYtbCaptionz")
        }));
        return message.on('open ytb video on captionz', function({ link }){
            if (link.startsWith("https://www.youtube.com/watch")) {
                return openYtbOnCaptionz(link);
            }
        });
    } 
});