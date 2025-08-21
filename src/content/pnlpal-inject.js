import $ from "jquery";
import utils from "utils";

const addDictByTopic = async function (tid) {
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

const addDictByParseContent = async function (contentNode) {
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

if (location.host === "pnlpal.dev" || location.host === "pnl.dev" || location.host === "localhost:4567") {
    if (process.env.PRODUCT !== "Dictionariez") {
        $("body").attr(`data-${process.env.PRODUCT.toLowerCase()}-version`, chrome.runtime.getManifest().version);
        $(".add-to-dictionariez").text(`Add to ${process.env.PRODUCT}`);
    } else {
        $("body").attr("data-dictionariez-version", chrome.runtime.getManifest().version);
    }

    $(document).on("click", ".add-to-dictionariez", function () {
        $(this).text("waiting...");
        $(this).addClass("disabled");

        if ($(this).data("tid")) {
            addDictByTopic($(this).data("tid")).then(
                () => {
                    $(this).text("Added!");
                    $(this).removeClass("disabled");
                },
                (err) => {
                    alert("Your json format has error: " + err.message);
                    console.error("Your json format has error: ");
                    console.error(err);
                }
            );
        } else {
            addDictByParseContent($(this).closest(".content, .preview")).then(
                () => {
                    $(this).text("Added!");
                    $(this).removeClass("disabled");
                },
                (err) => {
                    alert("Your content has error: " + err.message);
                    console.error("Your content has error: ");
                    console.error(err);
                }
            );
        }

        return false;
    });
}
