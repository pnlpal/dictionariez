import $ from "jquery";
import utils from "utils";

const addDictByTopic = async (tid) => {
    const topic = await $.get(`${location.origin}/api/topic/${tid}`).catch(console.error);
    let json = $(topic.posts[0].content).find("code.language-json").text();
    if (!json) {
        json = $(topic.posts[0].content).find("code").text();
    }

    const dict = JSON.parse(json);
    dict.dictName ??= topic.title;
    dict.homepageUrl = topic.externalLink;
    dict.troveUrl = `${location.origin}${topic.url}`;
    await utils.send("dictionary-add", { dict });
    await utils.send("look up", dict);
};

const addDictByParseContent = async (contentNode) => {
    let json = $(contentNode).find("code.language-json").text();
    if (!json) {
        json = $(contentNode).find("code").text();
    }

    const dict = JSON.parse(json);

    const pid = $(contentNode).closest('[component="post"]').data("pid");
    if (pid) {
        dict.troveUrl = `${location.origin}/post/${pid}`;
    }

    await utils.send("dictionary-add", { dict });
    await utils.send("look up", dict);
};

// Fills the composer with the dict shared from the dict editor on the options page
const fillComposerWithSharedDict = async () => {
    if (!location.pathname.includes("/compose")) return;
    const shared = await utils.send("get dict share data");
    // ignore a stale share, e.g. the composer opened by hand later
    if (!shared || Date.now() - shared.timestamp > 5 * 60 * 1000) return;

    const { dict } = shared;
    // the "Add to Dictionariez" button reads the dict back from this json code block
    const body = `\`\`\`json\n${JSON.stringify(dict, null, 4)}\n\`\`\`\n`;

    const find = (selector) =>
        utils.checkInTime(() => document.querySelector(selector), 10000).then(() => document.querySelector(selector));
    try {
        const title = await find(".composer input.title");
        const textarea = await find(".composer textarea.write");
        title.value = dict.dictName;
        title.dispatchEvent(new Event("input", { bubbles: true }));
        textarea.value = body;
        textarea.dispatchEvent(new Event("input", { bubbles: true }));
    } catch {
        console.warn("[Dictionariez] Could not find the composer to fill in the shared dict");
    }
};

const allowedHosts = ["pnlpal.dev", "pnl.dev", "localhost:4567"];

if (allowedHosts.includes(location.host)) {
    if (process.env.PRODUCT !== "Dictionariez") {
        $("body").attr(`data-${process.env.PRODUCT.toLowerCase()}-version`, chrome.runtime.getManifest().version);
        $(".add-to-dictionariez").text(`Add to ${process.env.PRODUCT}`);
    } else {
        $("body").attr("data-dictionariez-version", chrome.runtime.getManifest().version);
    }

    $(document).on("click", ".add-to-dictionariez", function () {
        const $this = $(this);
        $this.text("waiting...");
        $this.addClass("disabled");

        const handleSuccess = () => {
            $this.text("Added!");
            $this.removeClass("disabled");
        };

        const handleError = (err, context) => {
            alert(`Your ${context} has error: ${err.message}`);
            console.error(`Your ${context} has error:`, err);
        };

        if ($this.data("tid")) {
            addDictByTopic($this.data("tid")).then(handleSuccess, (err) => handleError(err, "json format"));
        } else {
            addDictByParseContent($this.closest(".content, .preview")).then(handleSuccess, (err) =>
                handleError(err, "content"),
            );
        }

        return false;
    });

    if (window.self === window.top) {
        const userLoggedIn = !!document.querySelector("#logged-in-menu");
        const userSubscribed = location.pathname === "/pro" && location.search.includes("success=true");
        utils.send("user logged in status", { userLoggedIn, origin: location.origin, userSubscribed });
        fillComposerWithSharedDict();

        // If user is on /words page, redirect to home page.
        if (location.pathname === "/words") {
            location.href = "/";
        }
    }
}
