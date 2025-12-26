import contextMenu from "./contextMenu.js";
import message from "./message.js";
import utils from "utils";

export default {
    configCache: {
        windowLeft: undefined,
        windowTop: undefined,
        windowWidth: 700,
        windowHeight: 820,
        ankiLeft: undefined,
        ankiTop: undefined,
        ankiWidth: 700,
        ankiHeight: 820,

        markWords: true,
        markColor: "yellow",
        enableMarkWordsSK1: true,
        markWordsSK1: utils.isMac() ? "Meta" : "Ctrl",
        markWordsKey: "B",

        disableWordHistory: false,

        disableWikipediaCard: false,
        minimalCards: "",
        disableContextMenu: false,
        disableYtbCaptionz: true,

        enableSelectionOnMouseMove: true,
        enableSelectionSK1: true,
        selectionSK1: "Shift",

        enableLookupEnglish: true,
        enableLookupChinese: process.env.PRODUCT === "Dictionariez" ? true : false,
        enableConvertCn2T: false,
        otherDisabledLanguages: [],

        enablePlainLookup: process.env.PRODUCT === "SidePal" ? false : true,
        englishLookupSource: "google", // google, bingCN, wiktionary
        enableAmeAudio: false,
        enableBreAudio: false,
        enableRealPron: false,

        needDblclick: false,
        enablePlainSK1: false,
        plainSK1: "Ctrl",

        defaultClickLookup: "plain", // plain, ai

        enableMinidict: process.env.PRODUCT === "SidePal" ? true : false,
        enableMouseSK1: false,
        mouseSK1: "Alt",

        enableAutoCloseMinidict: false,

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

        excludedSites: "freecodecamp.org/",
        enableReadClipboard: false,

        privacyConsent: "",

        sentenceBubbleSK: "",
        disableTTS: false,
        disableTranslator: false,
        translatorSettings: "",
        isPro: undefined,
    },

    init() {
        message.on("setting", () => {
            return this.configCache;
        });
        message.on("save setting", (request) => {
            if (request.key === "disableContextMenu") {
                if (request.value) {
                    contextMenu.removeLookupItem();
                } else {
                    contextMenu.createLookupItem();
                }
            }
            return this.setValue(request.key, request.value);
        });

        return new Promise((resolve) => {
            chrome.storage.sync.get("config", (obj) => {
                if (obj && obj.config) {
                    Object.assign(this.configCache, obj.config);
                }
                //migration:
                if (this.configCache.englishLookupSource === "bing") {
                    this.configCache.englishLookupSource = "google";
                }
                // migration done.
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
