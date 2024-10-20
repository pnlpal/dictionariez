import message from "./message.js";

export default {
  configCache: {
    windowLeft: undefined,
    windowTop: undefined,
    windowWidth: 600,
    windowHeight: 800,
    ankiLeft: undefined,
    ankiTop: undefined,
    ankiWidth: 600,
    ankiHeight: 800,

    markWords: false,
    markColor: "yellow",
    enableMarkWordsSK1: true,
    markWordsSK1: "Meta",
    markWordsKey: "B",

    disableWordHistory: false,

    disableWikipediaCard: false,
    minimalCards: "",
    disableContextMenu: false,
    disableYtbCaptionz: false,

    enableSelectionOnMouseMove: true,
    enableSelectionSK1: true,
    selectionSK1: "Shift",

    enableLookupEnglish: true,
    enableLookupKorean: true,
    enableLookupChinese: true,
    otherDisabledLanguages: [],

    enablePlainLookup: true,
    englishLookupSource: "google", // google, bing, wiktionary
    koreanLookupSource: "google", // google, naver, wiktionary
    enableAmeAudio: false,
    enableBreAudio: false,
    enableUSUKPron: false,
    enableRealPron: false,

    showOtherLang: "",
    otherLang: "zh-CN",

    enablePlainSK1: false,
    plainSK1: "Ctrl",

    enableMinidict: false,
    enableMouseSK1: false,
    mouseSK1: "Alt",

    openSK1: "Ctrl",
    openSK2: "Shift",
    openKey: "X",

    openOptionSK1: "Ctrl",
    openOptionSK2: "Shift",
    openOptionKey: "H",

    prevDictSK1: "Ctrl",
    prevDictKey: "ArrowLeft",
    nextDictSK1: "Ctrl",
    nextDictKey: "ArrowRight",
    prevHistorySK1: "Alt",
    prevHistoryKey: "ArrowLeft",
    nextHistorySK1: "Alt",
    nextHistoryKey: "ArrowRight",
    dictionary: "",
    enableReadClipboard: false,

    privacyConsent: "",
  },

  init() {
    message.on("setting", () => {
      return this.configCache;
    });
    message.on("save setting", (request) => {
      return this.setValue(request.key, request.value);
    });

    return new Promise((resolve) => {
      chrome.storage.sync.get("config", (obj) => {
        if (obj && obj.config) {
          Object.assign(this.configCache, obj.config);
        }
        resolve(this.configCache);
      });
    });
  },

  async setValue(key, value) {
    if (this.configCache[key] !== value) {
      this.configCache[key] = value;
      await chrome.storage.sync.set({ config: this.configCache });
    }
    return value;
  },

  getValue(key, defaultValue) {
    var v = this.configCache[key];
    v = v !== undefined ? v : defaultValue;
    return v;
  },

  clear() {
    return new Promise((resolve) => {
      chrome.storage.sync.remove("config", resolve);
    });
  },
};
