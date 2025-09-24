const pnlBase = process.env.NODE_ENV === "development" ? "http://localhost:4567" : "https://pnl.dev";

export default {
    config: {},
    async post(url, data) {
        return new Promise((resolve, reject) => {
            fetch(pnlBase + url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                credentials: "include",
            })
                .then((response) => response.json())
                .then((data) => resolve(data))
                .catch((error) => reject(error));
        });
    },
    async delete(url, data) {
        return new Promise((resolve, reject) => {
            fetch(pnlBase + url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                credentials: "include",
            })
                .then((response) => response.json())
                .then((data) => resolve(data))
                .catch((error) => reject(error));
        });
    },

    get(url) {
        return new Promise((resolve, reject) => {
            fetch(pnlBase + url, { credentials: "include" })
                .then((response) => response.json())
                .then((data) => resolve(data))
                .catch((error) => reject(error));
        });
    },
};
