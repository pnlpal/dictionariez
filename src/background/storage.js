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
    history: [],
    isProUser() {
        return setting.getValue("isPro");
    },
    async init() {
        this.history = await Item.getAll();

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

    async getWordDetail(word) {
        async function getFromLocal() {
            const detail = this.history.find((item) => item.w === word);
            if (detail) {
                detail.previous = await this.getPrevious(word);
            }
            return detail;
        }
        if (this.isProUser()) {
            try {
                return await cloudStorage.getWordDetail(word, convertProItem);
            } catch (error) {
                console.error("Failed to get word detail from pro service, falling back to local storage:", error);
                return await getFromLocal.call(this);
            }
        } else {
            return await getFromLocal.call(this);
        }
    },

    async getPrevious(w) {
        if (setting.getValue("disableWordHistory")) return;
        async function getFromLocal() {
            const idx = this.history.findIndex((item) => item.w === w);
            const previous =
                idx > 0 ? this.history[idx - 1] : idx === -1 ? this.history[this.history.length - 1] : undefined;
            if (previous) delete previous.previous;
            return previous;
        }

        if (this.isProUser()) {
            try {
                return await cloudStorage.getPreviousWord(w, convertProItem);
            } catch (error) {
                console.error("Failed to get previous word from pro service, falling back to local storage:", error);
                return getFromLocal.call(this);
            }
        } else {
            return getFromLocal.call(this);
        }
    },

    async getHistory(length) {
        if (this.isProUser()) {
            const res = await cloudStorage.get("/api/user/words");
            return res.data.map((item) => convertProItem(item));
        } else {
            let begin = 0;
            let end = this.history.length;

            if (length) {
                begin = end - length;
                if (begin < 0) {
                    begin = 0;
                }
            }

            return this.history.slice(begin, end).toReversed();
        }
    },

    async getNext(w, circle = false) {
        if (setting.getValue("disableWordHistory")) return;

        if (this.isProUser()) {
            const res = await cloudStorage.get(`/api/user/words/${encodeURIComponent(w)}/next`);
            return convertProItem(res);
        } else {
            const idx = this.history.findIndex((item) => item.w === w);
            if (idx < this.history.length - 1) {
                return this.history[idx + 1];
            } else if (circle || !w) {
                return this.history[0];
            }
        }
    },

    async addRating(word, rating) {
        if (this.isProUser()) {
            await cloudStorage.post(`/api/user/words/${encodeURIComponent(word)}/rate`, {
                word: word,
                rate: rating,
            });
        } else {
            const item = await this.getWordDetail(word);
            if (item) {
                await item.update({ r: rating });
            }
        }
    },

    async savedAnki(word, saved = true) {
        if (this.isProUser()) {
            await cloudStorage.post(`/api/user/words/${encodeURIComponent(word)}/saved-to-anki`, {
                word: word,
                ankiSaved: saved,
            });
        } else {
            const item = await this.getWordDetail(word);
            if (item) {
                await item.update({ ankiSaved: saved });
            }
        }
    },

    getPreviousAnkiUnsaved(w) {
        if (setting.getValue("disableWordHistory")) return;
        let idx = this.history.findIndex((item) => item.w === w);
        idx ??= this.history.length - 1;

        while (idx > 0) {
            idx -= 1;
            const item = this.history[idx];
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
                if (this.history.length >= this.maxLength) {
                    this.history.shift();
                }
                const newItem = new Item({ w, s, sc, r, sentence });
                this.history.push(newItem);
                await newItem.save();
            }
        }

        if (this.isProUser()) {
            try {
                await cloudStorage.addHistory({ w, s, sc, r, sentence });
            } catch (error) {
                console.error("Failed to add word to pro service, falling back to local storage:", error);
                await addToLocal.call(this);
            }
        } else {
            await addToLocal.call(this);
        }
    },

    async removeHistory(words) {
        if (!Array.isArray(words)) {
            words = [words];
        }

        if (this.isProUser()) {
            await cloudStorage.delete("/api/user/words", {
                words: words,
            });
        } else {
            const valids = [];
            words.forEach((w) => {
                const idx = this.history.findIndex((item) => item.w === w);
                if (idx >= 0) {
                    this.history.splice(idx, 1);
                    valids.push(w);
                }
            });

            if (valids.length) {
                await Item.remove(valids);
            }
        }
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
