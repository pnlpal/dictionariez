import dict from "./dict.js";
import message from "./message.js";
import storage from "./storage.js";
import setting from "./setting.js";
import utils from "utils";

message.on("autocomplete", async ({ text }) => {
    let results = [];

    const textParts = text.split(/\s/);
    const firstWord = textParts[0];
    const remainingText = textParts.slice(1).join(" ");

    const dicts = dict.searchDicts(firstWord);
    if (dicts.length > 0) {
        dicts.forEach((dict) => {
            dict.queryText = remainingText;
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
