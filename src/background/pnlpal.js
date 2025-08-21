import message from "./message.js";
import setting from "./setting.js";

const openYtbOnCaptionz = (link) => {
    const url = `https://pnl.dev/captionz?link=${encodeURIComponent(link)}`;

    chrome.tabs.create({ url });
};

export default {
    openYtbOnCaptionz,
    init() {
        message.on("setting of ytb captionz", () => ({
            disableYtbCaptionz: setting.getValue("disableYtbCaptionz"),
        }));
        message.on("open ytb video on captionz", ({ link }) => {
            if (link.startsWith("https://www.youtube.com/watch")) {
                openYtbOnCaptionz(link);
            }
        });
    },
};
