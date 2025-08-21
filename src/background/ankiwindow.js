import $ from "jquery";
import message from "./message.js";
import utils from "utils";
import setting from "./setting.js";
import plainLookup from "./plain-lookup.js";
import storage from "./storage.js";
import dw from "./dictwindow.js";

class AnkiWindow extends dw.DictWindow {
    isAnki = true;
    defaultUrl = "https://ankiweb.net/add";
    wordItem = null;

    constructor() {
        super({ dictName: "none" });
    }

    reset() {
        super.reset();
        this.wordItem = null;
    }

    getStoredPosition() {
        // bugfix: dont know how why, ankiWidth and ankiHeight are saved as number, need integer here.
        return {
            width: parseInt(setting.getValue("ankiWidth")),
            height: parseInt(setting.getValue("ankiHeight")),
            left: parseInt(setting.getValue("ankiLeft")),
            top: parseInt(setting.getValue("ankiTop")),
        };
    }
}

export default {
    anki: new AnkiWindow(),

    destroyWin({ wid }) {
        if (this.anki.wid === wid) {
            this.anki.reset();
            this.saveInStorage();
        }
    },

    async saveInStorage() {
        return await chrome.storage.local.set({
            ankiWindow: {
                wid: this.anki.wid,
                tid: this.anki.tid,
                wordItem: this.anki.wordItem,
            },
        });
    },

    // chrome.storage.local.get 'ankiWindow', (data) =>
    //     if data.ankiWindow
    //         console.log "[ankiWindow] saved to storage: ", data.ankiWindow

    async restoreFromStorage() {
        if (this.anki.wid) {
            return;
        }

        const data = await chrome.storage.local.get("ankiWindow");

        const ankiWindow = data?.ankiWindow;
        if (ankiWindow?.wid && ankiWindow.tid) {
            try {
                await chrome.windows.get(ankiWindow.wid);
                this.anki.wid = ankiWindow.wid;
                this.anki.tid = ankiWindow.tid;
                this.anki.wordItem = ankiWindow.wordItem;
                // console.log "[ankiWindow] restored from storage: ", @anki.wid, @anki.wordItem
            } catch (err) {
                console.warn("[ankiWindow] restore error: ", err.message, "Ignored.");
            }
        }
    },

    getNextWord(prevWord) {
        const item = storage.getPreviousAnkiUnsaved(prevWord);
        if (item?.w) {
            this.anki.wordItem = item;
            console.info(`Anki to save next word: ${item.w}`);
        }
    },

    focus() {
        if (this.anki.wid) {
            this.anki.focus();
        }
    },

    lookupInDicts(wordItem, lookupInfo) {
        let w;
        if (!lookupInfo) {
            ({ w } = wordItem);
        } else if (lookupInfo.length) {
            w = lookupInfo.at(-1)?.w || wordItem.w;
        } else {
            w = lookupInfo.w || wordItem.w;
        }

        if (!w) {
            return;
        }
        w = w.replaceAll("·", "");
        return dw.lookup({ w });
    },

    async init() {
        await this.restoreFromStorage();

        message.on("open anki", async (request) => {
            this.anki.wordItem = request;
            await this.anki.open();
            return this.saveInStorage();
        });

        message.on("get anki info", async (request, sender) => {
            if (sender.tab.id === this.anki.tid) {
                if (request.ankiSavedWord) {
                    console.info(`Anki saved word: ${request.ankiSavedWord}`);
                    this.anki.wordItem = null;
                    await storage.savedAnki(request.ankiSavedWord);
                    this.getNextWord(request.ankiSavedWord);
                }

                if (request.ankiSkippedWord) {
                    console.info(`Anki skipped word: ${request.ankiSkippedWord}`);
                    this.getNextWord(request.ankiSkippedWord);
                }

                if (this.anki.wordItem?.w) {
                    const lookupInfo = await plainLookup.parse(sender.tab.id, this.anki.wordItem.w.toLowerCase());

                    const setDataToImages = async (images) =>
                        await Promise.all(
                            images.map(async (image) => {
                                const dataUrl = await utils.imageToDataUrl(image.src);
                                image.dataUrl = dataUrl;
                                return image;
                            })
                        );

                    if (lookupInfo?.length) {
                        await setDataToImages(lookupInfo[0]?.images || lookupInfo[1]?.images || []);
                    }

                    if (lookupInfo?.images?.length) {
                        await setDataToImages(lookupInfo.images);
                    }

                    this.lookupInDicts(this.anki.wordItem, lookupInfo);
                    return { wordItem: this.anki.wordItem, lookupInfo, followedWords: lookupInfo?.map?.((n) => n.w) };
                }
            }
        });

        message.on("image to data url", async (request, sender) => {
            const dataUrl = await utils.imageToDataUrl(request.src);
            return { dataUrl };
        });

        message.on("beforeunload anki window", (request, sender) => {
            setting.setValue("ankiWidth", request.width);
            setting.setValue("ankiHeight", request.height);
            setting.setValue("ankiLeft", request.left);
            setting.setValue("ankiTop", request.top);
        });
    },
};
