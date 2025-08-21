/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS206: Consider reworking classes to avoid initClass
 * DS208: Avoid top-level this
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
import setting from "./setting.js";
import storage from  "./storage.js";
import dict from "./dict.coffee";
import message from "./message.js";
import readClipboard from "./clipboard.coffee";
import utils from "utils";
import contextMenu from "./contextMenu.js";

let screenWidth = 1080;
let screenHeight = 1000;
let screenAvailLeft = 0;
let screenAvailTop = 0;


const getInfoOfSelectionCode = function() {
    const getSentence = function() {
        try {
            const selection = window.getSelection();
            const range = selection.getRangeAt(0);
            if (!selection.toString()) { return; }

            const range1 = range.cloneRange();
            range1.detach();

            selection.modify('move', 'backward', 'sentence');
            selection.modify('extend', 'forward', 'sentence');

            const text = selection.toString().trim();

            selection.removeAllRanges();
            selection.addRange(range1);

            return text;
        } catch (err) {
            // On firefox, unable to get sentence.
            return;
        }
    };

    return [window.getSelection().toString().trim(), getSentence(), screen.width, screen.height, screen.availLeft, screen.availTop];
};
    


class DictWindow {
    static initClass() {
        this.prototype.wid = null;
        this.prototype.tid = null;
        this.prototype.url = null;
        this.prototype.word = null;
        this.prototype.sentence = null;
        this.prototype.dictName = null;
        this.prototype.windex = 0;
        this.prototype.isHelpMeRefine = false;
    
        this.prototype.defaultUrl = chrome.runtime.getURL('dict.html');
    }

    constructor({ wid, tid, url, word, sentence, dictName, windex } = {}) {
        this.wid = wid;
        this.tid = tid;
        this.url = url;
        this.word = word;
        this.sentence = sentence;
        this.dictName = dictName || setting.getValue('dictionary') || dict.allDicts[0].dictName;
        this.windex = windex || 0;
    }

    reset(){
        this.wid = null;
        this.tid = null;
        this.url = null;
        this.word = null;
        this.sentence = null;
        this.dictName = null;
        return this.isHelpMeRefine = false;
    }

    getStoredPosition(){
        // bugfix: dont know how why, windowWidth and windowHeight are saved as number, need integer here.
        return {
            width: parseInt(setting.getValue('windowWidth')),
            height: parseInt(setting.getValue('windowHeight')),
            left: parseInt(setting.getValue('windowLeft')),
            top: parseInt(setting.getValue('windowTop'))
        };
    }

    async open(url, useDefaultPosition){
        let err;
        let { width, height, left, top } = this.getStoredPosition();

        // fix too small value
        if (!width || (width < 300)) { width = 700; } 
        if (!height || (height < 300)) { height = 820; }
        
        const defaultLeft = this.isAnki ? Math.round(((screenWidth || 1080) / 2) + 400) : Math.round(((screenWidth || 1080) / 2) - (width / 2));
        const defaultTop = Math.round(((screenHeight || 1000) / 2) - (height / 2));
        if (isNaN(left)) { left = (defaultLeft || 600); }
        if (isNaN(top)) { top = (defaultTop || 300); } 

        // setup the other cloned window 
        if (this.windex > 0) {
            top += 50 * this.windex;
            left += 50 * this.windex; 
        }
     
        // fix top value on Linux, may be chrome's bug.
        if (utils.isLinux()) {
            if (top > screenAvailTop) {
                top = defaultTop; 
            }
            if (left > screenAvailLeft) {
                left = defaultLeft;
            }
        }

        if (useDefaultPosition) {
            if (width > screenWidth) { width = screenWidth; }
            if (height > screenHeight) { height = screenHeight; }
            left = Math.round(((screenWidth || 1080) / 2) - (width / 2));
            top = Math.round(((screenHeight || 1000) / 2) - (height / 2));
        }

        if (!this.wid) {
            try {     
                const createFn = (await utils.isFirefox()) ? browser.windows.create : chrome.windows.create;
                const win = await createFn({
                    url: url || this.defaultUrl,
                    type: 'popup',
                    width,
                    height,
                    top, 
                    left, 
                    state: 'normal',
                });

                this.wid = win.id;
                this.tid = win.tabs[win.tabs.length-1].id;
                return this.url = url || this.defaultUrl;

            } catch (error) {
                err = error;
                console.error("[dictWindow] create popup window error: ", err);
                if (!useDefaultPosition) { return this.open(url, true); }
                throw new Error("Failed to create the popup lookup window!");
            }
            
        } else {
            try { 
                await this.focus();
                if (url && (url !== this.url)) {
                    chrome.tabs.update(this.tid, {
                        url
                    });
                    return this.url = url;
        
                } else { 
                    return ({noUpdate: true});
                }
            } catch (error1) {
                err = error1;
                console.error("[dictWindow] open error: ", err);
                throw err;
            }
        }
    }
                    
    focus() {
        return chrome.windows.update(this.wid, {
            focused: true
        });
    }

    sendMessage(msg){
        if (this.tid) { return chrome.tabs.sendMessage(this.tid, msg); }
    }

    lookup(text, sentence, languagePrompt, dictName){
        let result;
        let {
            url
        } = this;

        if (!sentence && !text) { ({
            sentence
        } = this); } 
        if (!text) { text = this.word; }
        if (!dictName) { ({
            dictName
        } = this); }

        this.isHelpMeRefine = false;

        if (text) {
            if ((this.word !== text) || (this.sentence !== sentence) || (this.dictName !== dictName)) {
                this.word = text.trim();
                this.sentence = sentence;
                this.dictName = dictName;
                result = dict.query(text, this.dictName || setting.getValue('dictionary')); 
                url = result?.windowUrl;
                this.sendMessage({type: 'querying', text, sentence, languagePrompt});
            }
        } else { 
            this.dictName = dictName;
        }

        if (process.env.PRODUCT === 'SidePal') {
            setting.setValue('dictionary', dictName);
            utils.send('look up result', {
                dictName,
                word: text,
                sentence,
                languagePrompt,
                ...result 
            });
            return true;
        } else { 
            return this.open(url);
        }
    }

    refineTextWithAI(text, dictName = null) {
        if (!text) { return; }
        if (dictName) { this.dictName = dictName; }
        if (!this.dictName) { return; } 
        if (!dict.isAI(this.dictName)) { return; }
        this.word = text; 
        this.isHelpMeRefine = true;
        const result = dict.query(text, this.dictName);
        this.sendMessage({type: 'querying', text, isHelpMeRefine: true});

        if (process.env.PRODUCT === 'SidePal') {
            if (dictName) { setting.setValue('dictionary', dictName); }
            utils.send('look up result', {
                dictName: this.dictName,
                word: this.word,
                isHelpMeRefine: true,
                ...result 
            });
            return true;
        } else { 
            return this.open(result.windowUrl);
        }
    }
}
DictWindow.initClass();
            
export default ({
    DictWindow,
    dictWindows: [],

    async refineTextWithAI(text) { 
        let result;
        if (utils.isMobile()) { return; }

        const results = [];
        for (var win of this.dictWindows) {
            result = win.refineTextWithAI(text);
            if (result) { results.push(result); }
        } 
        
        if (!results.length) {
            const aiDict = dict.getFirstAIDict();
            if (aiDict) {
                result = this.create({ dictName: aiDict.dictName }).refineTextWithAI(text); 
            }
        }

        await Promise.all(results);
        this.saveInStorage();
        return result;
    }, 

    async lookup({ w, s, sc, sentence, languagePrompt, screen } = {}) {
        let result;
        if (w && s && (!utils.isSentence(w))) { storage.addHistory({ w, s, sc, sentence }); }  // ignore lookup from options page
        
        if (this.dictWindows.length) {
            result = null;
            for (var win of this.dictWindows) {
                result = await win.lookup(w, sentence, languagePrompt);
            }
                    
            this.saveInStorage();
            return result;
        } else { 
            if ((screen?.width > 1080) && (screen?.height > 800)) { 
                screenWidth = screen.with; 
                screenHeight = screen.height;
                screenAvailLeft = screen.availLeft;
                screenAvailTop = screen.availTop;
            }

            result = await this.create().lookup(w, sentence, languagePrompt);
            this.saveInStorage();
            return result;
        }
    },

    create(options = {}) {
        let win = this.dictWindows.find(win => win.wid === options.wid);
        if (win) { 
            win.url = options.url;
            win.word = options.word;
            win.sentence = options.sentence; 
            win.dictName = options.dictName;
        } else { 
            win = new DictWindow(options);
            win.windex = this.dictWindows.length;
            this.dictWindows.push(win);
        }
            
        this.saveInStorage();
        return win;
    }, 

    destroyWin({ wid, tid } = {}) {
        this.dictWindows.forEach(function(win){
                if ((win.wid === wid) || (win.tid === tid)) {
                    return win.reset();
                }
        });
        this.dictWindows = this.dictWindows.filter(win => win.wid);
        return this.saveInStorage();
    },
    
    closeAllWindows() {
        for (var win of this.dictWindows) {
            try { 
                chrome.windows.remove(win.wid);
            } catch (err) { 
                console.error("[dictWindow] closeAllWindows error: ", err);
            }
        }
        this.dictWindows = [];
        return this.saveInStorage();
    },

    async saveInStorage() {
        return await chrome.storage.local.set({ dictWindows: this.dictWindows.map(win => ({
            wid: win.wid,
            tid: win.tid,
            url: win.url,
            word: win.word,
            dictName: win.dictName,
            sentence: win.sentence,
            isHelpMeRefine: win.isHelpMeRefine
        })) });
    },

        // chrome.storage.local.get 'dictWindows', (data) =>
        //     if data.dictWindows
        //         console.log "[dictWindow] saved to storage: ", data.dictWindows

    async restoreFromStorage() {
        if (this.dictWindows.length) {
            return;
        }

        const data = await chrome.storage.local.get('dictWindows');

        let i = 0;
        return await (async () => {
            const result = [];
            for (var options of data?.dictWindows || []) {
                if (options.wid && options.tid) {
                    try { 
                        await chrome.windows.get(options.wid);
                        var win = new DictWindow({ ...options, windex: i });
                        this.dictWindows.push(win);
                        result.push(i += 1);
                    } catch (err) { 
                        result.push(console.warn("[dictWindow] restore error: ", err.message, 'Ignored.'));
                    }
                } else {
                    result.push(undefined);
                }
            }
            return result;
        })();
    },


    mainDictWindow() {
        return this.dictWindows[0] || this.create();
    },
    
    getByTab(tid) {
        for (var win of this.dictWindows) { 
            if (win.tid === tid) { 
                return win;
            }
        }
    }, 

    async init() {
        // console.log("[dictWindow] init")
        await this.restoreFromStorage();

        if (!setting.getValue("disableContextMenu")) {
            contextMenu.createLookupItem();
        }
        
        message.on("copy event triggered", async ({s, sc, sentence}, sender) => { 
            const w = await readClipboard(sender.tab);
            if (w) {
                return this.lookup({ w, s, sc, sentence });
            }
        });

        message.on('look up', async ({ dictName, w, s, sc, sentence, means, newDictWindow, isInEditable }, sender) => {
            // 'look up' can be triggered by the context menu or the hotkey or any webpages
            let result;
            const fromSidePanel = sender.id && !sender.tab;
            // console.log("[dictWindow] look up: ", { dictName, w, s, sc, sentence, means, isInEditable })
            if ((means === 'mouse') && (process.env.PRODUCT !== 'SidePal')) {
                if (!setting.getValue('enableMinidict')) {
                    return;
                }
            }

            if (!w) { 
                w = await readClipboard(sender.tab);
            }

            if (fromSidePanel && utils.isSentence(w)) { 
                return;
            }

            if (isInEditable) { 
                result = await this.refineTextWithAI(w);
            } else {
                result = await this.lookup({ w: w?.trim(), s, sc, sentence });

                if (newDictWindow && (process.env.PRODUCT !== 'SidePal')) {
                    const targetWin = this.create({ dictName });
                    result = await targetWin.lookup(w || this.dictWindows[0].word, sentence);

                } else if (dictName) { // only change the main window or in new window.
                    result = await this.mainDictWindow().lookup(w?.trim(), sentence, null, dictName);
                }
            }
                
            this.saveInStorage();
            return result;
        });

        message.on('query', async (request, sender) => {
            // query message only comes from the dict window.
            let result, targetWin;
            const senderWin = sender.tab ? 
                this.getByTab(sender.tab.id)
            : 
                this.mainDictWindow();

            let dictName = request.dictName || senderWin.dictName;
            let w = request.w || senderWin.word;
            const languagePrompt = w?.split(" /")[1];
            w = w?.split(" /")[0];
            let {
                sentence
            } = request;
            
            if (request.nextDict) {
                ({
                    dictName
                } = dict.getNextDict(dictName));
            } else if (request.previousDict) {
                ({
                    dictName
                } = dict.getPreviousDict(dictName));
            } else if (request.dictNumber) { 
                const d = dict.getDictByNumber(request.dictNumber);
                if (!d) { return; } 
                ({
                    dictName
                } = d);
            }
            
            if (request.previousWord) {
                const prev = await storage.getPrevious(w);
                w = prev?.w;
                sentence = prev?.sentence;
            } else if (request.nextWord) {
                const next = await storage.getNext(w, true);
                w = next?.w; 
                sentence = next?.sentence;
            } else if (w && (!utils.isSentence(w))) {
                storage.addHistory({ w, sentence });
            }

            if (senderWin.isHelpMeRefine && utils.isSentence(w) && (senderWin.dictName !== dictName)) { 
                if (request.newDictWindow && (process.env.PRODUCT !== 'SidePal')) {
                    targetWin = this.create({ dictName });
                    result = await targetWin.refineTextWithAI(w);
                } else { 
                    result = await senderWin.refineTextWithAI(w, dictName);
                }
                    
            } else { 
                if (request.newDictWindow && (process.env.PRODUCT !== 'SidePal')) {
                    targetWin = this.create({ dictName });
                    result = await targetWin.lookup(w, sentence, languagePrompt);
                } else { 
                    if (senderWin.dictName !== dictName) {
                        result = await senderWin.lookup(w, sentence, languagePrompt, dictName);
                    } else {
                        result = await this.lookup({ w, sentence, languagePrompt });
                    }
                }
            }
            
            this.saveInStorage();
            return result;
        });
                
        message.on('dictionary', async (request, sender) => {
            let previous, r, sentence, w, windowUrl;
            let win = sender.tab ? 
                this.getByTab(sender.tab.id)
            : // SidePal
                this.mainDictWindow();

            let currentDictName = win?.dictName || setting.getValue('dictionary');
            currentDictName = dict.getDict(currentDictName).dictName;

            if (win) { 
                w = win.word;
                ({
                    sentence
                } = win);
                if (w) { 
                    const wordDetail = await storage.getWordDetail(w);
                    r = wordDetail?.r;
                    previous = wordDetail?.previous;
                } else { 
                    previous = await storage.getPrevious();
                }
                    
            } else if (!win && !request.optionsPage) { 
                win = this.create();
                win.tid = sender.tab.id;
                win.dictName = currentDictName;
                previous = await storage.getPrevious();
            }

            const history = await storage.getHistory(10); // at most show 10 words in the history list on dictionary header.

            const nextDictName = dict.getNextDict(currentDictName).dictName;
            const previousDictName = dict.getPreviousDict(currentDictName).dictName;
            
            if ((process.env.PRODUCT === 'SidePal') && w) {
                ({ windowUrl } = await dict.query(w, currentDictName));
            }
            return { allDicts: dict.allDicts, history, currentDictName, nextDictName, previousDictName, previous, w, r, sentence, windowUrl };
    });
        
        message.on('dictionary history', async (request, sender) => {
            const history = await storage.getHistory(10); // at most show 8 words in the history list on dictionary header.
            return { history };
    });

        message.on('injected', (request, sender) => {
            const fromSidePanel = sender.id && !sender.tab;
            if (fromSidePanel) {
                return {
                    isInSidePanelDict: true,
                    dict: dict.getDict(this.mainDictWindow().dictName),
                    word: this.mainDictWindow().word,
                    sentence: this.mainDictWindow().sentence,
                    isHelpMeRefine: this.mainDictWindow().isHelpMeRefine
                };
            }

            if (!sender.tab) { return; } 

            const win = this.getByTab(sender.tab.id); 
            if (win) { 
                return {
                    dictUrl: chrome.runtime.getURL('dict.html'),
                    cardUrl: chrome.runtime.getURL('card.html'),
                    dict: dict.getDict(win.dictName),
                    word: win.word,
                    sentence: win.sentence,
                    isHelpMeRefine: win.isHelpMeRefine
                };
            } else if (utils.isMobile()) {
                const chatgptDict = dict.getDict("chatgpt definition");
                if (chatgptDict && sender.tab.url.startsWith(chatgptDict.windowUrl)) {
                    this.create({ wid: sender.tab.windowId, tid: sender.tab.id, url: sender.tab.url, dictName: chatgptDict.dictName });
                    return {
                        dictUrl: chrome.runtime.getURL('dict.html'),
                        cardUrl: chrome.runtime.getURL('card.html'),
                        dict: chatgptDict
                    };
                }
            }
    });

        
        message.on('beforeunload dict window', (request, sender) => {
            setting.setValue('windowWidth', request.width);
            setting.setValue('windowHeight', request.height);
            setting.setValue('windowLeft', request.left);
            setting.setValue('windowTop', request.top);
            return setting.setValue('dictionary', request.dictName);
        });

        message.on('sendToDict', ( request, sender ) => {
            let win;
            if (sender.tab) { 
                win = this.getByTab(sender.tab.id);
            } else { 
                win = this.mainDictWindow();
            }
            return win?.sendMessage(request);
        });

        message.on('get wikipedia', ( request, sender ) => {
            let win;
            if (sender.tab) { 
                win = this.getByTab(sender.tab.id);

                if (win.windex !== 0) { return; }  // only show at the main window.
                if (!win?.word) { return; } 
            } else { 
                win = this.mainDictWindow();
            }
            
            if (utils.isEnglish(win.word)) { 
                return utils.loadJson("https://en.m.wikipedia.org/api/rest_v1/page/summary/" + win.word);
            } else if (utils.isChinese(win.word) && setting.getValue("enableLookupChinese")) {
                return utils.loadJson("https://zh.wikipedia.org/api/rest_v1/page/summary/" + win.word);
            } else if (utils.isJapanese(win.word)) {
                return utils.loadJson("https://ja.wikipedia.org/api/rest_v1/page/summary/" + win.word);
            }
        });

        message.on('card setting', ( { sys, origin } ) => {
            let disabled;
            if (sys === 'wiki') { 
                disabled = setting.getValue('disableWikipediaCard');
            }
            
            const s = setting.getValue('minimalCards');
            const minimal = s.includes(sys);

            return { disabled, minimal };
    });

        return message.on('card minimal', ( { sys, minimal } ) => {
            const s = setting.getValue('minimalCards');
            const arr = s.split(',').filter(n => n !== sys); 
            if (minimal) {
                arr.push(sys); 
            }
            return setting.setValue('minimalCards', arr.join(','));
        });
    }

});
