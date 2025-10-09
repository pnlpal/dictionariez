import storage from "./storage.js";
import message from "./message.js";

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

export default {
    setting: undefined,
    allDicts: [],

    async init() {
        await this.initAllDicts();

        message.on("set-dictionary-reorder", ({ dictMap }) => {
            const changed = [];

            this.allDicts.forEach((d) => {
                const s = dictMap[d.dictName];
                if (s) {
                    Object.assign(d, s);
                    changed.push(d);
                }
            });

            this.allDicts.sort((a, b) => a.sequence - b.sequence);

            return storage.setAllByK("dict-", "dictName", changed);
        });

        message.on("dictionary-remove", ({ dictName }) => {
            const index = this.allDicts.findIndex((dict) => dict.dictName === dictName);
            if (index >= 0) {
                this.allDicts.splice(index, 1);
            }

            storage.remove(`dict-${dictName}`);
        });

        message.on("dictionary-add", ({ dict }) => {
            this.addToDictionariez(dict);
        });

        message.on("restore-default-dicts", () => {
            this.restoreDefaultDicts();
        });

        message.on("get-all-dicts", () => {
            return this.allDicts;
        });
    },

    async initAllDicts() {
        const allDicts = await storage.getAllByK("dict-");

        if (!allDicts.length) {
            // get dicts from default and old settings
            const dictSettings = await storage.get("dictionary-setting", {});
            storage.remove("dictionary-setting");

            const extraDicts = await storage.get("extra-dicts", []);
            storage.remove("extra-dicts");

            defaultDicts.forEach((dict, originalIndex) => {
                const settings = dictSettings[dict.dictName];
                dict.sequence = originalIndex;
                if (settings) {
                    Object.assign(dict, settings);
                }

                if (dict.chatgptPrompt) {
                    dict = Object.assign({}, chatgptDefault, dict);
                }
                allDicts.push(dict);
            });

            extraDicts.forEach((extraDict) => {
                const localDict = allDicts.find((dict) => dict.dictName === extraDict.dictName);

                if (localDict) {
                    Object.assign(localDict, extraDict);
                } else {
                    extraDict.sequence = allDicts.length;
                    allDicts.push(extraDict);
                }
            });

            storage.setAllByK("dict-", "dictName", allDicts);
        }

        allDicts.sort((a, b) => a.sequence - b.sequence);

        allDicts.forEach((dict, originalIndex) => {
            dict.sequence = originalIndex;

            // fix old settings
            if (dict.windowUrl === "https://chat.openai.com" || dict.submitButtonSelector === "main form button.mb-1") {
                Object.assign(dict, chatgptDefault);
            }
            if (dict.windowUrl === "https://chatgpt.com" && dict.inputSelector === "main form textarea") {
                Object.assign(dict, chatgptDefault);
            }
        });

        this.allDicts = allDicts;
    },

    addToDictionariez(dict) {
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
            if (dict.chatgptPrompt) {
                dict = Object.assign({}, chatgptDefault, dict);
            }
            this.allDicts.push(dict);
        }

        return storage.setAllByK("dict-", "dictName", [dict]);
    },

    restoreDefaultDicts() {
        const added = [];

        defaultDicts.forEach((defaultDict, originalIndex) => {
            const currentDict = this.allDicts.find((dict) => dict.dictName === defaultDict.dictName);
            if (currentDict) {
                Object.assign(currentDict, defaultDict, defaultDict.chatgptPrompt ? chatgptDefault : null);
                return; // ignore existing ones
            }

            defaultDict.sequence = originalIndex;
            if (defaultDict.chatgptPrompt) {
                defaultDict = Object.assign({}, chatgptDefault, defaultDict);
            }
            this.allDicts.push(defaultDict);
            added.push(defaultDict);
        });

        if (added.length > 0) {
            this.allDicts.sort((a, b) => a.sequence - b.sequence);
            return storage.setAllByK("dict-", "dictName", added);
        }
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
