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
            const i = this.allDicts.findIndex((d) => d.dictName === dictName);
            if (i >= 0) {
                this.allDicts.splice(i, 1);
            }

            storage.remove("dict-" + dictName);
        });

        message.on("dictionary-add", ({ dict }) => {
            this.addToDictionariez(dict);
        });

        message.on("restore-default-dicts", () => {
            this.restoreDefaultDicts();
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

            defaultDicts.forEach((d, oi) => {
                const s = dictSettings[d.dictName];
                d.sequence = oi;
                if (s) {
                    Object.assign(d, s);
                }

                if (d.chatgptPrompt) {
                    d = Object.assign({}, chatgptDefault, d);
                }
                allDicts.push(d);
            });

            extraDicts.forEach((d) => {
                const locDict = allDicts.find((d1) => d1.dictName === d.dictName);

                if (locDict) {
                    Object.assign(locDict, d);
                } else {
                    d.sequence = allDicts.length;
                    allDicts.push(d);
                }
            });

            storage.setAllByK("dict-", "dictName", allDicts);
        }

        allDicts.sort((a, b) => a.sequence - b.sequence);

        allDicts.forEach((d, oi) => {
            d.sequence = oi;

            // fix old settings
            if (d.windowUrl === "https://chat.openai.com" || d.submitButtonSelector === "main form button.mb-1") {
                Object.assign(d, chatgptDefault);
            }
            if (d.windowUrl === "https://chatgpt.com" && d.inputSelector === "main form textarea") {
                Object.assign(d, chatgptDefault);
            }
        });

        this.allDicts = allDicts;
    },

    addToDictionariez(d) {
        if (d.name) {
            d.dictName = d.name;
            delete d.name;
        }
        if (d.url) {
            d.windowUrl = d.url;
            delete d.url;
        }

        if (!d.dictName) {
            return { error: "the name of the dict is required" };
        }

        if (!d.windowUrl && !d.chatgptPrompt) {
            return { error: "the url of the dict is required" };
        }

        const locDict = this.allDicts.find((d1) => d1.dictName === d.dictName);

        if (locDict) {
            Object.assign(locDict, d);
            d = locDict;
        } else {
            d.sequence = this.allDicts.length;
            if (d.chatgptPrompt) {
                d = Object.assign({}, chatgptDefault, d);
            }
            this.allDicts.push(d);
        }

        return storage.setAllByK("dict-", "dictName", [d]);
    },

    restoreDefaultDicts() {
        const added = [];

        defaultDicts.forEach((d, oi) => {
            const currentDict = this.allDicts.find((d1) => d1.dictName === d.dictName);
            if (currentDict) {
                Object.assign(currentDict, d, d.chatgptPrompt ? chatgptDefault : null);
                return; // ignore existing ones
            }

            d.sequence = oi;
            if (d.chatgptPrompt) {
                d = Object.assign({}, chatgptDefault, d);
            }
            this.allDicts.push(d);
            added.push(d);
        });

        if (added.length) {
            this.allDicts.sort((a, b) => a.sequence - b.sequence);
            return storage.setAllByK("dict-", "dictName", added);
        }
    },

    getDict(dictName) {
        const dict = this.allDicts.find((d) => d.dictName === dictName);
        return dict || this.allDicts[0];
    },

    getNextDict(dictName) {
        const i = this.allDicts.findIndex((d) => d.dictName === dictName);
        if (i >= 0 && i < this.allDicts.length - 1) {
            return this.allDicts[i + 1];
        } else {
            return this.allDicts[0];
        }
    },

    getPreviousDict(dictName) {
        const i = this.allDicts.findIndex((d) => d.dictName === dictName);
        if (i > 0 && i <= this.allDicts.length - 1) {
            return this.allDicts[i - 1];
        } else {
            return this.allDicts[this.allDicts.length - 1];
        }
    },

    getDictByNumber(n) {
        if (n === 9) {
            return this.allDicts[this.allDicts.length - 1];
        }
        return this.allDicts[n - 1];
    },

    isAI(dictName) {
        const dict = this.getDict(dictName);
        return dict.chatgptPrompt || dict.prompt;
    },
    getFirstAIDict() {
        const dict = this.allDicts.find((d) => d.chatgptPrompt || d.prompt);
        return dict || chatgptDefault;
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
        for (var dict of this.allDicts) {
            if (dict.dictName.toLowerCase().startsWith(key)) {
                results.push(dict);
            } else if (dict.windowUrl) {
                var domain = dict.windowUrl.match(/:\/\/([^\/\?]+)/)[1];
                domain = domain.replace(/^www\.|^dict\.|^dictionary\.|^m\.|\.m\./, "");
                var domains = domain.split(".");
                domains.pop();

                domains.forEach((s) => {
                    if (s.toLowerCase().startsWith(key)) {
                        results.push(dict);
                    }
                });
            }

            if (results.length >= 3) {
                break;
            }
        }

        return results;
    },
};
