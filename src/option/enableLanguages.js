import utils from "utils";

export default async function enableLanguages(enabledLanguages = ["English"]) {
    await utils.send("save setting", {
        key: "enabledLanguages",
        value: enabledLanguages,
    });
    await utils.send("clear plain lookup cache"); // Clear cache to apply language changes immediately
    await utils.send("add-dicts-for-languages", { languages: enabledLanguages }); // Add new dicts for selected languages
    return { enabledLanguages };
}
