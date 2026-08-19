import utils from "utils";

export default async function checkServerForDictsConflict() {
    try {
        const result = await utils.send("check-server-for-existing-dicts");
        return result;
    } catch (error) {
        console.error("Error checking server for existing dicts:", error);
        // Continue without server conflict check on error
    }
}
