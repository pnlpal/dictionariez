import utils from "utils";
import allLangs from "../resources/langs.json";

export default async function enableLanguages(enabledLanguages = ["Swedish"], withEnglish = true, withChinese = true) {
    const allLanguages = Object.keys(allLangs);
    const allOtherSupportedLanguages = allLanguages.filter((l) => l !== "English" && l !== "Chinese");
    const otherDisabledLanguages = allOtherSupportedLanguages.filter((l) => !enabledLanguages.includes(l));
    await utils.send("save setting", {
        key: "enableLookupEnglish",
        value: withEnglish,
    });
    await utils.send("save setting", {
        key: "enableLookupChinese",
        value: withChinese,
    });
    await utils.send("save setting", {
        key: "otherDisabledLanguages",
        value: otherDisabledLanguages,
    });
    await utils.send("clear plain lookup cache"); // Clear cache to apply language changes immediately
    return {
        enableLookupEnglish: withEnglish,
        enableLookupChinese: withChinese,
        otherDisabledLanguages: otherDisabledLanguages,
    };
}
