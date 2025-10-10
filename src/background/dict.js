import message from "./message.js";
import setting from "./setting.js";
import storage from "./storage.js";
import cloudStorage from "./storage-on-cloud.js";

const defaultDicts =
    process.env.PRODUCT === "Dictionariez"
        ? require("./default-dicts.js").default
        : require(`./default-dicts.${process.env.PRODUCT.toLowerCase()}.js`).default;

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
    if (dict.chatgptPrompt && (!dict.windowUrl || !dict.inputSelector || !dict.submitButtonSelector)) {
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
}

export default {
    allDicts: [],
    syncPromise: null,

    isProUser() {
        return setting.getValue("isPro");
    },
    async init() {
        await this.initLocalDicts();

        if (!setting.getValue("lastTimeSyncDicts")) {
            this.syncPromise = this.syncAllDictsWithCloud(); // no await, let it run in background.
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

        message.on("get-all-dicts", async () => {
            await this.syncAllDictsWithCloud();
            return {
                allDicts: this.allDicts,
                lastTimeSyncDicts: setting.getValue("lastTimeSyncDicts"),
                syncDictsError: this.syncDictsError,
            };
        });
    },

    async initLocalDicts() {
        const allDicts = await storage.getAllByK("dict-");

        if (!allDicts.length) {
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
    async syncAllDictsWithCloud(actionable = {}) {
        this.syncDictsError = null;
        if (this.isProUser()) {
            try {
                const lastTimeSyncDicts = setting.getValue("lastTimeSyncDicts");
                const res = await cloudStorage.syncAllDicts(this.allDicts, actionable, lastTimeSyncDicts);
                if (res && res.allDicts) {
                    this.allDicts = res.allDicts;
                    if (res.shouldUpdateClientSide) {
                        await storage.setAllByK("dict-", "dictName", this.allDicts);
                    }
                    await setting.setValue("lastTimeSyncDicts", res.lastTimeSyncDicts);
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
        this.syncPromise = this.syncAllDictsWithCloud({
            action: "add",
            dicts: [dict],
        }); // no await, let it run in background.

        return dict;
    },
    async removeDict(dictName) {
        const index = this.allDicts.findIndex((dict) => dict.dictName === dictName);
        if (index >= 0) {
            this.allDicts.splice(index, 1);
        }

        await storage.remove(`dict-${dictName}`);
        this.syncPromise = this.syncAllDictsWithCloud({
            action: "remove",
            dictName,
        }); // no await, let it run in background.
    },
    async restoreDefaultDicts() {
        const added = [];

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

            this.syncPromise = this.syncAllDictsWithCloud({
                action: "add",
                dicts: added,
            }); // no await, let it run in background.
        }
        return added;
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
        this.syncPromise = this.syncAllDictsWithCloud(); // no await, let it run in background.
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
            windowUrl = dict.windowUrl.replace("<word>", word.toLowerCase());
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
