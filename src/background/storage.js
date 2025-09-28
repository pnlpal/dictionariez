import message from "./message.js";
import setting from "./setting.js";
import cloudStorage from "./storage-on-cloud.js";

class Item {
    constructor({ w, s, sc, r, t = Date.now(), sentence, ankiSaved } = {}) {
        this.w = w;
        this.s = s;
        this.sc = sc;
        this.r = r;
        this.t = t;
        this.sentence = sentence;
        this.ankiSaved = ankiSaved;
    }

    save() {
        return chrome.storage.sync.set({
            [`w-${this.w}`]: {
                w: this.w,
                s: this.s,
                sc: this.sc,
                r: this.r,
                t: this.t,
                sentence: this.sentence,
                ankiSaved: this.ankiSaved,
            },
        });
    }

    update({ w, s, sc, r, t, sentence, ankiSaved }) {
        if (w) this.w = w;
        if (s) this.s = s;
        if (sc) this.sc = sc;
        if (r) this.r = r;
        if (t) this.t = t;
        if (sentence) this.sentence = sentence;
        if (ankiSaved) this.ankiSaved = ankiSaved;
        return this.save();
    }

    remove() {
        return chrome.storage.sync.remove(`w-${this.w}`);
    }

    static getAll() {
        return new Promise((resolve) => {
            chrome.storage.sync.get(null, (data) => {
                resolve(
                    Object.keys(data || {})
                        .filter((item) => item.startsWith("w-"))
                        .map((k) => new Item(data[k]))
                        .sort((x, y) => x.t - y.t)
                );
            });
        });
    }

    static remove(w) {
        return new Promise((resolve) => {
            const k = Array.isArray(w) ? w.map((x) => `w-${x}`) : `w-${w}`;
            chrome.storage.sync.remove(k, resolve);
        });
    }
}

function convertProItem(item) {
    if (!item?.word) return null;
    return {
        w: item.word,
        s: item.source,
        sc: item.sourceContent,
        r: item.rate,
        t: item.timestamp,
        sentence: item.sentence,
        ankiSaved: item.ankiSaved,
    };
}

export default {
    maxLength: 500,
    localHistory: [],
    isProUser() {
        return setting.getValue("isPro");
    },
    async init() {
        this.localHistory = await Item.getAll();

        message.on("history", () => {
            return this.getHistory();
        });

        message.on("remove history", ({ w }) => {
            return this.removeHistory(w);
        });

        message.on("rating", ({ text, value }) => {
            return this.addRating(text, value);
        });
    },

    async invokeWrapper(localFunc, cloudFunc, ...args) {
        if (this.isProUser()) {
            try {
                return await cloudFunc.apply(cloudStorage, args);
            } catch (error) {
                console.error("Cloud function failed, falling back to local function:", error);
                if (error.message === "not-pro-user") {
                    setting.setValue("isPro", false);
                }
                return await localFunc.apply(this, args);
            }
        } else {
            return await localFunc.apply(this, args);
        }
    },

    async getWordDetail(word) {
        async function getFromLocal() {
            const detail = this.localHistory.find((item) => item.w === word);
            if (detail) {
                detail.previous = await this.getPrevious(word);
            }
            return detail;
        }

        return this.invokeWrapper(getFromLocal, cloudStorage.getWordDetail, word, convertProItem);
    },

    async getPrevious(w) {
        if (setting.getValue("disableWordHistory")) return;
        async function getFromLocal() {
            const idx = this.localHistory.findIndex((item) => item.w === w);
            const previous =
                idx > 0
                    ? this.localHistory[idx - 1]
                    : idx === -1
                    ? this.localHistory[this.localHistory.length - 1]
                    : undefined;
            if (previous) delete previous.previous;
            return previous;
        }
        return this.invokeWrapper(getFromLocal, cloudStorage.getPreviousWord, w, convertProItem);
    },

    async getHistory(length) {
        function getFromLocal() {
            let begin = 0;
            let end = this.localHistory.length;

            if (length) {
                begin = end - length;
                if (begin < 0) {
                    begin = 0;
                }
            }

            return this.localHistory.slice(begin, end).toReversed();
        }
        return this.invokeWrapper(getFromLocal, cloudStorage.getHistory, convertProItem);
    },

    async getNext(w, circle = false) {
        if (setting.getValue("disableWordHistory")) return;

        function getFromLocal() {
            const idx = this.localHistory.findIndex((item) => item.w === w);
            if (idx < this.localHistory.length - 1) {
                return this.localHistory[idx + 1];
            } else if (circle || !w) {
                return this.localHistory[0];
            }
        }
        return this.invokeWrapper(getFromLocal, cloudStorage.getNextWord, w, convertProItem);
    },

    async addRating(word, rating) {
        async function updateLocal() {
            const item = await this.getWordDetail(word);
            if (item) {
                await item.update({ r: rating });
            }
        }
        return this.invokeWrapper(updateLocal, cloudStorage.addRating, word, rating);
    },

    async savedAnki(word, saved = true) {
        async function updateLocal() {
            const item = await this.getWordDetail(word);
            if (item) {
                await item.update({ ankiSaved: saved });
            }
        }
        return this.invokeWrapper(updateLocal, cloudStorage.savedAnki, word, saved);
    },

    getPreviousAnkiUnsaved(w) {
        if (setting.getValue("disableWordHistory")) return;
        let idx = this.localHistory.findIndex((item) => item.w === w);
        idx ??= this.localHistory.length - 1;

        while (idx > 0) {
            idx -= 1;
            const item = this.localHistory[idx];
            if (!item.ankiSaved) {
                return item;
            }
        }
    },

    async addHistory({ w, s, sc, r, sentence }) {
        if (setting.getValue("disableWordHistory")) return;

        async function addToLocal() {
            const item = await this.getWordDetail(w);
            if (item) {
                // Update the existing item
                await item.update({ s, sc, r, t: Date.now(), sentence });
            } else {
                if (this.localHistory.length >= this.maxLength) {
                    this.localHistory.shift();
                }
                const newItem = new Item({ w, s, sc, r, sentence });
                this.localHistory.push(newItem);
                await newItem.save();
            }
        }

        return this.invokeWrapper(addToLocal, cloudStorage.addHistory, { w, s, sc, r, sentence });
    },

    async removeHistory(words) {
        if (!Array.isArray(words)) {
            words = [words];
        }
        async function removeFromLocal() {
            const valids = [];
            words.forEach((w) => {
                const idx = this.localHistory.findIndex((item) => item.w === w);
                if (idx >= 0) {
                    this.localHistory.splice(idx, 1);
                    valids.push(w);
                }
            });

            if (valids.length) {
                await Item.remove(valids);
            }
        }

        return this.invokeWrapper(removeFromLocal, cloudStorage.removeHistory, words);
    },

    clearAll() {
        return new Promise((resolve) => {
            chrome.storage.sync.clear(resolve);
        });
    },

    set(data) {
        return new Promise((resolve) => {
            chrome.storage.sync.set(data, resolve);
        });
    },

    get(k, defaultValue) {
        return new Promise((resolve) => {
            chrome.storage.sync.get(k, (data) => {
                resolve(data?.[k] !== undefined ? data[k] : defaultValue);
            });
        });
    },

    remove(k) {
        return new Promise((resolve) => {
            chrome.storage.sync.remove(k, resolve);
        });
    },

    getAllByK(k) {
        return new Promise((resolve) => {
            chrome.storage.sync.get(null, (data) => {
                resolve(
                    Object.keys(data || {})
                        .filter((item) => item.startsWith(k))
                        .map((n) => data[n])
                );
            });
        });
    },

    setAllByK(k, key, list) {
        return Promise.all(
            list.map((n) => {
                const v = n[key];
                if (v) {
                    const res = {};
                    res[k + v] = n;
                    return this.set(res);
                }
            })
        );
    },
};
