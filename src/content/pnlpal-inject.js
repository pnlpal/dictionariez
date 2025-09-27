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
                handleError(err, "content")
            );
        }

        return false;
    });

    if (window.self === window.top) {
        const userLoggedIn = !!document.querySelector("#logged-in-menu");
        utils.send("user logged in status", { userLoggedIn, origin: location.origin });
    }
}
