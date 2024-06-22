const pnlpalBaseUrl = "http://localhost:4567";

export default {
  config: {},
  isProUser: () => true,
  async post(url, data) {
    if (!this.config.csrf_token) await this.getConfig();

    return new Promise((resolve, reject) => {
      fetch(pnlpalBaseUrl + url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": this.config.csrf_token,
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  },

  get(url) {
    return new Promise((resolve, reject) => {
      fetch(pnlpalBaseUrl + url)
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  },

  getConfig() {
    return this.get("/config").then((data) => {
      this.config = data;
    });
  },
};
