const pnlBase = process.env.NODE_ENV === "development" ? "http://localhost:4567" : "https://pnl.dev";

export default {
    async handleResponse(response) {
        const responseData = await response.json();
        if (responseData?.error) {
            throw new Error(responseData.error);
        }
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        return responseData;
    },
    async post(url, data) {
        const response = await fetch(pnlBase + url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: "include",
        });
        return this.handleResponse(response);
    },
    async delete(url, data) {
        const response = await fetch(pnlBase + url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: "include",
        });
        return this.handleResponse(response);
    },

    async get(url, queryParams) {
        const response = await fetch(pnlBase + url + "?" + new URLSearchParams(queryParams), {
            method: "GET",
            credentials: "include",
        });
        return this.handleResponse(response);
    },
    async getHistory(limit, convertProItem) {
        const res = await this.get("/api/words", limit ? { limit: limit } : {});
        return res.data.map((item) => convertProItem(item));
    },
    async addHistory({ w, s, sc, r, sentence }) {
        return await this.post("/api/words", {
            word: w,
            sentence: sentence,
            rate: r,
            source: s,
            sourceTitle: sc,
        });
    },
    async batchAddHistory(words) {
        return await this.post("/api/words", {
            words: words,
        });
    },
    async getWordDetail(word, convertProItem) {
        const res = await this.get(`/api/words/${encodeURIComponent(word)}`);
        if (res?.word) {
            return {
                ...convertProItem(res),
                previous: convertProItem(res.previous),
            };
        }
    },
    async getPreviousWord(w, convertProItem) {
        if (w) {
            const wordDetail = await this.getWordDetail(w, convertProItem);
            return wordDetail?.previous;
        } else {
            const res = await this.get("/api/latest-word");
            return convertProItem(res);
        }
    },
    async getNextWord(w, convertProItem) {
        const res = await this.get(`/api/words/${encodeURIComponent(w)}/next`);
        return convertProItem(res);
    },
    async removeHistory(words) {
        return await this.delete("/api/words", {
            words: words,
        });
    },
    async addRating(word, rating) {
        return await this.post(`/api/words/${encodeURIComponent(word)}/rate`, {
            word: word,
            rate: rating,
        });
    },
    async savedAnki(word, saved = true) {
        await this.post(`/api/words/${encodeURIComponent(word)}/saved-to-anki`, {
            word: word,
            ankiSaved: saved,
        });
    },
    async getPreviousAnkiUnsaved(word, convertProItem) {
        const res = await this.get(`/api/words/${encodeURIComponent(word)}/previous-anki-unsaved`);
        return convertProItem(res);
    },

    async syncAllDicts(allDicts, actionable = {}, lastTimeSyncDicts = null) {
        return await this.post(`/api/dicts/sync`, { allDicts, actionable, lastTimeSyncDicts });
    },
};
