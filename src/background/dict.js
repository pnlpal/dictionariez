import message from "./message.js";
import setting from "./setting.js";
import storage from "./storage.js";
import cloudStorage from "./storage-on-cloud.js";
import contextMenu from "./contextMenu.js";
import { getDictionariesForLanguages } from "../shared-readonly/dictionaries.js";

function getDefaultDicts() {
    const languages = setting.getValue("enabledLanguages", []);
    return getDictionariesForLanguages(languages.length > 0 ? languages : ["English"]);
}

const chatgptDefault = {
    windowUrl: "https://chatgpt.com",
    css: "body {margin-top: 50px !important;}",
    inputSelector: "main form div[contenteditable]",
    submitButtonSelector: "main form button[data-testid='send-button'], main form button[data-testid='stop-button']",
};

function fixChatgptDict(dict) {
    // fix old settings
    if (dict.windowUrl === "https://chat.openai.com" || dict.submitButtonSelector === "main form button.mb-1") {
        Object.assign(dict, chatgptDefault);
    }
    if (dict.windowUrl === "https://chatgpt.com" && dict.inputSelector === "main form textarea") {
        Object.assign(dict, chatgptDefault);
    }
    // migrate chatgptPrompt setting
    if (!dict.prompt && dict.chatgptPrompt) {
        dict.prompt = dict.chatgptPrompt;
        delete dict.chatgptPrompt;
    }
    if (!dict.promptWithContext && dict.chatgptPromptWithContext) {
        dict.promptWithContext = dict.chatgptPromptWithContext;
        delete dict.chatgptPromptWithContext;
    }

    if (dict.prompt && (!dict.windowUrl || !dict.inputSelector || !dict.submitButtonSelector)) {
        Object.assign(dict, chatgptDefault);
    }
}

export default {
    allDicts: [],

    isProUser() {
        return setting.getValue("isPro");
    },
    hasSelectedLanguages() {
        const languages = setting.getValue("enabledLanguages", []);
        return languages.length > 0;
    },
    async init() {
        await this.initLocalDicts();

        // Set reference in contextMenu to allow access to allDicts
        contextMenu.dictModule = this;

        if (!setting.getValue("lastTimeSyncDicts") && this.hasSelectedLanguages()) {
            await this.syncAllDictsWithCloud();
        }

        message.on("set-dictionary-reorder", async ({ dictMap }) => {
            await this.reorderDicts(dictMap);
        });

        message.on("dictionary-remove", async ({ dictName }) => {
            await this.removeDict(dictName);
        });

        message.on("dictionary-add", async ({ dict }) => {
            await this.addToDictionariez(dict);
        });

        message.on("restore-default-dicts", async () => {
            await this.restoreDefaultDicts();
        });

        message.on("sync-dicts-for-languages", async ({ languages, notSyncToCloud = false }) => {
            await this.syncDictsForLanguages(languages, notSyncToCloud);
        });

        message.on("get-all-dicts", async () => {
            await this.syncAllDictsWithCloud();
            return {
                allDicts: this.allDicts,
                lastTimeSyncDicts: setting.getValue("lastTimeSyncDicts"),
                syncDictsError: this.syncDictsError,
            };
        });

        // Check if server has existing dicts for Pro user on fresh install
        // Used for Edge Case 6: New device with existing server data
        message.on("check-server-for-existing-dicts", async () => {
            if (!this.isProUser()) {
                return { hasServerDicts: false, serverDicts: null };
            }
            try {
                // Send timestamp=0 to indicate "check only" mode - server always wins
                const res = await cloudStorage.syncAllDicts(this.allDicts, 0);
                if (res && res.shouldUpdateClientSide && res.allDicts && res.allDicts.length > 0) {
                    console.log("Server has existing dicts for Pro user:", res.allDicts);
                    return { hasServerDicts: true, serverDicts: res.allDicts };
                }
                console.log("No existing dicts found on server for Pro user.");
                return { hasServerDicts: false, serverDicts: null };
            } catch (error) {
                console.error("check-server-for-existing-dicts error", error);
                return { hasServerDicts: false, serverDicts: null, error: error.message };
            }
        });

        // Accept server dicts (user chose "Use server copy" in Edge Case 6)
        message.on("accept-server-dicts", async ({ serverDicts }) => {
            this.allDicts = serverDicts;
            await storage.removeAllByK("dict-");
            await storage.setAllByK("dict-", "dictName", this.allDicts);

            console.log("User choose to use server dicts: ", this.allDicts.length);
            // Now sync to update timestamp
            await this.syncAllDictsWithCloud();
            return { success: true };
        });

        // Sync local dicts to server (user chose "Keep local" in Edge Case 6)
        message.on("sync-local-dicts-to-server", async () => {
            console.log("User choose to keep local dicts", this.allDicts.length);
            await this.syncAllDictsWithCloud("keep-local-dicts");
            return { success: true };
        });
    },

    async initLocalDicts() {
        const allDicts = await storage.getAllByK("dict-");

        if (!allDicts.length) {
            // New user: generate dicts based on enabled languages
            const defaultDicts = getDefaultDicts();
            defaultDicts.forEach((dict, originalIndex) => {
                dict.sequence = originalIndex;
                fixChatgptDict(dict);
                allDicts.push(dict);
            });
            storage.setAllByK("dict-", "dictName", allDicts);
        }

        allDicts.sort((a, b) => a.sequence - b.sequence);

        allDicts.forEach((dict, originalIndex) => {
            dict.sequence = originalIndex;
            fixChatgptDict(dict);
        });

        this.allDicts = allDicts;
    },
    async syncAllDictsWithCloud(action = "") {
        this.syncDictsError = null;
        if (this.isProUser()) {
            try {
                if (action) {
                    setting.setValue("lastTimeSyncDicts", Date.now());
                }
                const lastTimeSyncDicts = setting.getValue("lastTimeSyncDicts");
                console.log(
                    "Syncing all dicts with cloud:",
                    lastTimeSyncDicts ? new Date(lastTimeSyncDicts).toISOString() : "[no last time]",
                    action ? `[${action}]` : "",
                );
                const res = await cloudStorage.syncAllDicts(this.allDicts, lastTimeSyncDicts);
                if (res && res.allDicts) {
                    this.allDicts = res.allDicts;
                    if (res.shouldUpdateClientSide) {
                        await storage.removeAllByK("dict-");
                        await storage.setAllByK("dict-", "dictName", this.allDicts);
                    }
                    this._shouldUpdateClientSide = res.shouldUpdateClientSide; // only for unit test;
                    await setting.setValue("lastTimeSyncDicts", res.lastTimeSyncDicts);
                    this._lastTimeSyncDicts = res.lastTimeSyncDicts; // only for unit test;
                }
                return res;
            } catch (error) {
                console.error("syncAllDictsWithCloud error", error);
                this.syncDictsError = error.message;
                // if not pro user anymore, disable pro features
                if (error.message === "not-pro-user") {
                    setting.setValue("isPro", false);
                }
            }
        }
    },

    async addToDictionariez(dict) {
        if (dict.name) {
            dict.dictName = dict.name;
            delete dict.name;
        }
        if (dict.url) {
            dict.windowUrl = dict.url;
            delete dict.url;
        }

        if (!dict.dictName) {
            return { error: "the name of the dict is required" };
        }

        if (!dict.windowUrl && !dict.chatgptPrompt) {
            return { error: "the url of the dict is required" };
        }

        const existingDict = this.allDicts.find((d) => d.dictName === dict.dictName);

        if (existingDict) {
            Object.assign(existingDict, dict);
            dict = existingDict;
        } else {
            dict.sequence = this.allDicts.length;
            fixChatgptDict(dict);
            this.allDicts.push(dict);
        }

        await storage.setAllByK("dict-", "dictName", [dict]);
        await this.syncAllDictsWithCloud("add");
        contextMenu.rebuildContextMenu(this.allDicts);

        return dict;
    },
    async removeDict(dictName) {
        const index = this.allDicts.findIndex((dict) => dict.dictName === dictName);
        if (index >= 0) {
            this.allDicts.splice(index, 1);
        }

        await storage.remove(`dict-${dictName}`);
        await this.syncAllDictsWithCloud("remove");
        contextMenu.rebuildContextMenu(this.allDicts);
    },
    async restoreDefaultDicts() {
        const added = [];
        const defaultDicts = getDefaultDicts();

        defaultDicts.forEach((defaultDict, originalIndex) => {
            const currentDict = this.allDicts.find((dict) => dict.dictName === defaultDict.dictName);
            if (currentDict) {
                Object.assign(currentDict, defaultDict);
                fixChatgptDict(currentDict);
                return; // ignore existing ones
            }

            defaultDict.sequence = originalIndex;
            fixChatgptDict(defaultDict);
            this.allDicts.push(defaultDict);
            added.push(defaultDict);
        });

        if (added.length > 0) {
            this.allDicts.sort((a, b) => a.sequence - b.sequence);
            await storage.setAllByK("dict-", "dictName", added);
            await this.syncAllDictsWithCloud("add");
        }
        contextMenu.rebuildContextMenu(this.allDicts);
        return added;
    },

    async syncDictsForLanguages(languages, notSyncToCloud) {
        const suggestedDicts = getDictionariesForLanguages(languages?.length > 0 ? languages : ["English"]);
        const suggestedDictNames = new Set(suggestedDicts.map((d) => d.dictName));
        const added = [];
        const removed = [];

        // Remove dicts that are no longer needed for enabled languages
        // Only keep if: it's in suggested dicts OR it's a custom dict (has troveUrl)
        for (let i = this.allDicts.length - 1; i >= 0; i--) {
            const dict = this.allDicts[i];
            if (!suggestedDictNames.has(dict.dictName) && !dict.troveUrl) {
                removed.push(dict.dictName);
                this.allDicts.splice(i, 1);
            }
        }

        // Add new dicts for enabled languages
        suggestedDicts.forEach((dict) => {
            const existingDict = this.allDicts.find((d) => d.dictName === dict.dictName);
            if (existingDict) {
                return;
            }

            dict.sequence = this.allDicts.length;
            fixChatgptDict(dict);
            this.allDicts.push(dict);
            added.push(dict);
        });

        if (added.length > 0 || removed.length > 0) {
            // Re-sequence all dicts after changes
            this.allDicts.forEach((d, i) => {
                d.sequence = i;
            });
            console.log(
                "Syncing dicts for languages. Added:",
                added.map((d) => d.dictName),
                "Removed:",
                removed,
            );

            // Batch persist: remove all and re-save entire list
            await storage.removeAllByK("dict-");
            await storage.setAllByK("dict-", "dictName", this.allDicts);

            if (!notSyncToCloud) {
                await this.syncAllDictsWithCloud("language-changed");
            }
        }

        contextMenu.rebuildContextMenu(this.allDicts);
        return { added, removed };
    },
    async reorderDicts(dictMap) {
        const changed = [];

        this.allDicts.forEach((d) => {
            const s = dictMap[d.dictName];
            if (s) {
                Object.assign(d, s);
                changed.push(d);
            }
        });

        this.allDicts.sort((a, b) => a.sequence - b.sequence);

        await storage.setAllByK("dict-", "dictName", changed);
        await this.syncAllDictsWithCloud("reorder");
        contextMenu.rebuildContextMenu(this.allDicts);
    },

    getDict(dictName) {
        const dict = this.allDicts.find((d) => d.dictName === dictName);
        return dict || this.allDicts[0];
    },

    getNextDict(dictName) {
        const currentIndex = this.allDicts.findIndex((d) => d.dictName === dictName);
        if (currentIndex >= 0 && currentIndex < this.allDicts.length - 1) {
            return this.allDicts[currentIndex + 1];
        }
        return this.allDicts[0];
    },

    getPreviousDict(dictName) {
        const currentIndex = this.allDicts.findIndex((d) => d.dictName === dictName);
        if (currentIndex > 0 && currentIndex <= this.allDicts.length - 1) {
            return this.allDicts[currentIndex - 1];
        }
        return this.allDicts[this.allDicts.length - 1];
    },

    getDictByNumber(n) {
        if (n === 9) {
            return this.allDicts[this.allDicts.length - 1];
        }
        return this.allDicts[n - 1];
    },

    isAI(dictName) {
        const dict = this.getDict(dictName);
        return !!(dict.chatgptPrompt || dict.prompt);
    },

    getFirstAIDict() {
        const aiDict = this.allDicts.find((dict) => dict.chatgptPrompt || dict.prompt);
        return aiDict || chatgptDefault;
    },

    query(word, dictName) {
        let windowUrl;
        const dict = this.getDict(dictName);
        if (dict.fixSpaceInWords) {
            word = word.replace(/\s+/g, dict.fixSpaceInWords);
        }

        if (dict.windowUrl) {
            windowUrl = dict.windowUrl.replace("<word>", word);
        } else if (dict.chatgptPrompt) {
            ({ windowUrl } = chatgptDefault);
        }

        return { windowUrl };
    },

    searchDicts(key) {
        const results = [];
        const maxResults = 3;

        for (const dict of this.allDicts) {
            if (dict.dictName.toLowerCase().startsWith(key)) {
                results.push(dict);
            } else if (dict.windowUrl) {
                const urlMatch = dict.windowUrl.match(/:\/\/([^/?]+)/);
                if (urlMatch) {
                    let domain = urlMatch[1];
                    domain = domain.replace(/^www\.|^dict\.|^dictionary\.|^m\.|\.m\./, "");
                    const domainParts = domain.split(".");
                    domainParts.pop(); // Remove TLD

                    const matchFound = domainParts.some((part) => part.toLowerCase().startsWith(key));

                    if (matchFound) {
                        results.push(dict);
                    }
                }
            }

            if (results.length >= maxResults) {
                break;
            }
        }

        return results;
    },
};
