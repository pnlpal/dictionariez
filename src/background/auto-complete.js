/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
import dict from "./dict.js";
import message from "./message.js";
import storage from "./storage.js";
import setting from "./setting.js";
import utils from "utils";

message.on("autocomplete", async function ({ text }) {
    let results = [];

    const dicts = dict.searchDicts(text.split(/\s/)[0]);
    if (dicts.length) {
        dicts.forEach(function (d) {
            const ts = text.split(/\s/);
            ts.shift();
            return (d.queryText = ts.join(" ") || "");
        });
        results = results.concat(dicts);
    }

    let html = "";
    if (text.length > 1 && utils.isEnglish(text)) {
        const url = `https://www.vocabulary.com/dictionary/autocomplete-ss?search=${text}`;
        html = await utils.loadHTML(url);
    }

    return { results, html };
});
