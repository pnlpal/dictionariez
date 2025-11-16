class ErrorWithMoreInfo extends Error {
  constructor(msg, moreInfo) {
    super(msg);
    Object.assign(this, moreInfo);
  }
}

export default {
  getRandomInt(min, max) {
    min ??= 1;
    max ??= 10;
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  },

  extraKeyMap: {
    Enter: 13,
    Space: 32,
    Tab: 9,
    End: 35,
    Home: 36,
    PageDown: 34,
    PageUp: 33,
    ArrowDown: 40,
    ArrowLeft: 37,
    ArrowRight: 39,
    ArrowUp: 38,
    Escape: 27,
  },
  checkEventKey(event, sk1, sk2, key) {
    if (key === "Disabled") {
      return false;
    }
    if (sk1 && !event[sk1.toLowerCase() + "Key"]) {
      return false;
    }
    if (sk2 && !event[sk2.toLowerCase() + "Key"]) {
      return false;
    }
    if (this.extraKeyMap[key]) {
      if (event.keyCode !== this.extraKeyMap[key]) {
        return false;
      }
    } else if (key && event.keyCode !== key.charCodeAt(0)) {
      return false;
    }

    return true;
  },

  promisify(cb) {
    return new Promise((resolve) => cb(resolve));
  },

  promisifiedTimeout(t) {
    return new Promise((resolve) => setTimeout(resolve, t));
  },

  async checkInTime(func, t = 5000) {
    let timeIsUp = false;
    this.promisifiedTimeout(t).then(() => (timeIsUp = true));

    const _check = () => {
      return new Promise(async (resolve, reject) => {
        await this.promisifiedTimeout(200);
        if (func()) {
          resolve();
        } else if (timeIsUp) {
          reject();
        } else {
          _check().then(resolve, reject);
        }
      });
    };

    return await _check();
  },

  promiseInTime(promise, t = 3000) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error("timeout")), t);

      promise
        .then((value) => {
          clearTimeout(timer);
          return resolve(value);
        })
        .catch((reason) => {
          clearTimeout(timer);
          return reject(reason);
        });
    });
  },

  send(type, data = {}, callback) {
    if (typeof data === "function") {
      callback = data;
      data = {};
    }

    const p = new Promise((resolve, reject) => {
      data.type = type;
      chrome.runtime.sendMessage(data, (ret) => {
        if (ret?.error) {
          reject(
            typeof ret.error === "string"
              ? new ErrorWithMoreInfo(ret.error, ret)
              : ret.error
          );
        } else {
          resolve(ret);
        }
      });
    });

    if (callback) {
      return p.then(callback);
    }
    return p;
  },

  sendToDict(action, data = {}, callback) {
    if (typeof data === "function") {
      callback = data;
      data = {};
    }
    data.action = action;

    return this.send("sendToDict", data, callback);
  },

  sendToTab(tabId, data = {}, callback = null) {
    if (typeof data === "function") {
      callback = data;
      data = {};
    } else if (typeof data === "string") {
      data = { type: data };
    }

    const p = new Promise((resolve, reject) =>
      chrome.tabs.sendMessage(tabId, data, (ret) => {
        if (ret?.error) {
          reject(
            typeof ret.error === "string" ? new Error(ret.error) : ret.error
          );
        } else {
          resolve(ret);
        }
      })
    );
    if (callback) {
      return p.then(callback);
    }
    return p;
  },

  listenToBackground(type, callback) {
    if (window.self === window.top) {
      if (!window.dictionariezBackgroundListeners) {
        window.dictionariezBackgroundListeners = {};
        window.dictionariezBackgroundListeners[type] = callback;

        chrome.runtime.onMessage.addListener((request, sender, sendResponse) =>
          window.dictionariezBackgroundListeners[request.type]?.(
            request,
            sender,
            sendResponse
          )
        );
      } else {
        window.dictionariezBackgroundListeners[type] = callback;
      }
    }
  },

  hasJapanese(str) {
    const REGEX_JAPANESE =
      /[\u3000-\u303f]|[\u3040-\u309f]|[\u30a0-\u30ff]|[\uff00-\uff9f]|[\u4e00-\u9faf]|[\u3400-\u4dbf]/;
    return REGEX_JAPANESE.test(str);
  },
  isJapanese(str) {
    const jregex =
      /[\u3000-\u303f]|[\u3040-\u309f]|[\u30a0-\u30ff]|[\uff00-\uff9f]|[\u4e00-\u9faf]|[\u3400-\u4dbf]/g;
    return str.match(jregex)?.length === str.length;
  },

  hasChinese(str) {
    const REGEX_CHINESE =
      /[\u4e00-\u9fff]|[\u3400-\u4dbf]|[\u{20000}-\u{2a6df}]|[\u{2a700}-\u{2b73f}]|[\u{2b740}-\u{2b81f}]|[\u{2b820}-\u{2ceaf}]|[\uf900-\ufaff]|[\u3300-\u33ff]|[\ufe30-\ufe4f]|[\uf900-\ufaff]|[\u{2f800}-\u{2fa1f}]/u;
    return REGEX_CHINESE.test(str);
  },
  isChinese(str) {
    const cregex =
      /[\u4e00-\u9fff]|[\u3400-\u4dbf]|[\u{20000}-\u{2a6df}]|[\u{2a700}-\u{2b73f}]|[\u{2b740}-\u{2b81f}]|[\u{2b820}-\u{2ceaf}]|[\uf900-\ufaff]|[\u3300-\u33ff]|[\ufe30-\ufe4f]|[\uf900-\ufaff]|[\u{2f800}-\u{2fa1f}]/gu;
    return str.match(cregex)?.length === str.length;
  },
  hasKorean(str) {
    const REGEX_KOREAN = /\p{sc=Hangul}/u;
    return REGEX_KOREAN.test(str);
  },

  isValidWordOrPhrase(text = "") {
    if (!this.isSentence(text) && text) {
      if (text.split(/\s/).length > 1) {
        const allValid = text
          .split(/\s/)
          .map((word) => this.isValidWordOrPhrase(word));
        return allValid.every((v) => v);
      }
      let w = text.trim();
      // Remove up to two trailing punctuation marks
      w = w.replace(/[,:;“”'"-?!.]{1,2}$/, "");
      // Remove up to two leading punctuation marks
      w = w.replace(/^[,:;“”'"-?!.]{1,2}/, "");
      // Ignore single English letters (likely not a word)
      if (this.hasEnglish(w) && w.length === 1) {
        return false;
      }

      // Only allow one hyphen in the middle, no other punctuation
      // (e.g., "co-operate" is OK, "co--operate" or "co,operate" is not)
      const hyphenSplit = w.split("-");
      if (hyphenSplit.length > 2) return false; // More than one hyphen

      // Only allow letters (any language) and at most one hyphen
      // \p{L}: any kind of letter from any language
      // \p{M}: any kind of combining mark (accents, diacritics, etc.)
      if (!/^[\p{L}\p{M}]+(-[\p{L}\p{M}]+)?$/u.test(w)) return false;
      return true;
    }
  },

  isSentence(str = "") {
    if (this.hasChinese(str) || this.hasJapanese(str) || this.hasKorean(str)) {
      return str.length > 4;
    } else {
      const simpleStopWords = [
        "a",
        "an",
        "en",
        "ett",
        "the",
        "to",
        "in",
        "on",
        "at",
        "of",
        "for",
        "with",
        "by",
        "and",
        "or",
        "but",
        "nor",
        "so",
        "yet",
        "as",
        "if",
      ];
      return (
        str
          .split(/\s/)
          .filter(
            (w) => w.length > 1 && !simpleStopWords.includes(w.toLowerCase())
          ).length > 3
      );
    }
  },

  hasEnglish(str) {
    return /\w/.test(str);
  },

  isEnglish(str) {
    // not match: I'll  don't  Mr.Jackson
    const REGEX_ENG = /[a-zA-Z\s-]+/;
    return str.match(REGEX_ENG)?.[0] === str;
  },

  isLinux() {
    return navigator.platform.includes("Linux");
  },

  isMac() {
    return navigator.platform.includes("Mac");
  },

  isWindows() {
    return navigator.platform.includes("Win");
  },

  sanitizeHTML(s) {
    return s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  },

  imageToDataUrl(src) {
    return new Promise((resolve, reject) => {
      if (src.startsWith("data:")) {
        resolve(src);
      } else {
        fetch(src)
          .then((response) => response.blob())
          .then((blob) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
      }
    });
  },

  imageSize(src) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = function () {
        resolve({ width: this.width, height: this.height });
      };

      img.src = src;
    });
  },

  toUpperFirst(text) {
    return text[0].toUpperCase() + text.slice(1);
  },

  isMobile() {
    return /Mobi|Android/i.test(navigator.userAgent);
  },
  async isFirefox() {
    // Check if browser API exists (Firefox) or use userAgent as fallback
    if (typeof browser !== "undefined" && browser?.runtime?.getBrowserInfo) {
      try {
        const ret = await browser.runtime.getBrowserInfo();
        return ret?.name === "Firefox";
      } catch (e) {
        // Fallback to userAgent if browser API fails
        return navigator.userAgent.includes("Firefox");
      }
    }
    return false;
  },

  loadHTML(url, credentials = "omit") {
    return this.promiseInTime(
      fetch(url, {
        method: "GET",
        credentials,
      }),
      5000
    ).then((resp) => {
      if (!resp.ok) {
        const err = new Error(resp.statusText);
        err.status = resp.status;
        throw err;
      }

      return resp.text();
    });
  },

  loadJson(url, credentials) {
    return this.promiseInTime(
      fetch(url, {
        method: "GET",
        credentials,
      }),
      5000
    ).then((resp) => {
      if (!resp.ok) {
        const err = new Error(resp.statusText);
        err.status = resp.status;
        throw err;
      }

      return resp.json();
    });
  },
};
