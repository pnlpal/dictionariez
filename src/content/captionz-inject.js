
import $ from "jquery";
import utils from "utils";

const setYtb = async () => {
    if ($("#captionz-ytb-btn").length > 0) {
        return;
    }
    const sbtn = '<a href="" id="captionz-ytb-btn">Watch on Captionz</a>';

    await utils.checkInTime(() => $("#above-the-fold").length > 0);

    $("#above-the-fold").prepend(sbtn);

    $(document).on("click", "#captionz-ytb-btn", () => {
        utils.send("open ytb video on captionz", {
            link: location.href,
        });
        return false;
    });
};

const observePathnameChange = (callback) => {
    let lastPathname = location.pathname;
    const observer = new MutationObserver((mutations) =>
        mutations.forEach((mutation) => {
            if (location.pathname !== lastPathname) {
                lastPathname = location.pathname;
                callback();
            }
        })
    );
    observer.observe(document, { subtree: true, childList: true });
};

export const initCaptionzInjection = () => {
    $(document).ready(async () => {
        const { disableYtbCaptionz } = await utils.send("setting of ytb captionz");
        if (!disableYtbCaptionz) {
            if (
                location.href.startsWith("https://www.youtube.com/watch") &&
                location.search.includes("v=") &&
                window.self === window.top
            ) {
                setYtb().catch(console.warn);
            }

            observePathnameChange(() => {
                if (
                    location.href.startsWith("https://www.youtube.com/watch") &&
                    location.search.includes("v=") &&
                    window.self === window.top
                ) {
                    setYtb().catch(console.warn);
                }
            });
        }
    });
};
