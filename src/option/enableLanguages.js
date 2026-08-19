import utils from "utils";

export default async function enableLanguages(enabledLanguages = [], notSyncToCloud = false) {
    await utils.send("save setting", {
        key: "enabledLanguages",
        value: enabledLanguages,
    });
    await utils.send("clear plain lookup cache"); // Clear cache to apply language changes immediately
    await utils.send("sync-dicts-for-languages", { languages: enabledLanguages, notSyncToCloud }); // Sync dicts based on selected languages
    return enabledLanguages;
}
