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

    async get(url) {
        const response = await fetch(pnlBase + url, {
            method: "GET",
            credentials: "include",
        });
        return this.handleResponse(response);
    },

    async addHistory({ w, s, sc, r, sentence }) {
        return await this.post("/api/user/words", {
            word: w,
            sentence: sentence,
            rate: r,
            source: s,
            sourceContent: sc,
        });
    },
    async getWordDetail(word, convertProItem) {
        const res = await this.get(`/api/user/words/${encodeURIComponent(word)}`);
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
            const res = await this.get("/api/user/latest-word");
            return convertProItem(res);
        }
    },
};
