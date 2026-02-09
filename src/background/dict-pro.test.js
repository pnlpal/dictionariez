import setting from "./setting.js"; // Import the setting module
import message from "./message.js";
import { expect } from "chai";
import Dict from "./dict.js";
import storage from "./storage.js";
import cloudStorage from "./storage-on-cloud.js";

const testDict = (name) => {
    return {
        dictName: name,
        windowUrl: `http://${name}.com`,
        css: "body {background: red;}",
    };
};

describe("dicts management for pro user", () => {
    beforeEach(() => {
        const settingForTest = {};

        sinon.stub(message, "on");
        sinon.stub(setting, "getValue").callsFake((key) => settingForTest[key]);
        sinon.stub(setting, "setValue").callsFake((key, value) => {
            settingForTest[key] = value;
        });
        sinon.stub(Dict, "isProUser").returns(true);
        sinon.stub(storage, "getAllByK").resolves([]);
        sinon.stub(storage, "setAllByK").resolves();
        sinon.stub(storage, "remove").resolves();
        sinon.stub(Dict, "allDicts").value([]);
    });
    afterEach(() => {
        sinon.restore();
    });

    it("init and restore all default dicts for new user and sync to cloud", async () => {
        await Dict.init();
        expect(Dict.allDicts.length).to.be.greaterThan(1);
        expect(Dict._lastTimeSyncDicts).to.not.be.null;
        expect(Dict._shouldUpdateClientSide).to.be.true;
    });
    it("add a new dict then remove it", async () => {
        await Dict.init();
        expect(Dict._lastTimeSyncDicts).to.not.be.null;
        expect(Dict._shouldUpdateClientSide).to.be.true;

        const initSyncDate = Dict._lastTimeSyncDicts;
        const newDict = await Dict.addToDictionariez(testDict("test-dict"));
        expect(newDict).to.include(testDict("test-dict"));
        expect(Dict._lastTimeSyncDicts).to.be.a("string").that.is.not.empty;
        const secondSyncDate = Dict._lastTimeSyncDicts;
        expect(secondSyncDate).to.not.equal(initSyncDate);
        expect(Dict.allDicts[Dict.allDicts.length - 1].dictName).to.equal("test-dict");
        expect(Dict.allDicts[Dict.allDicts.length - 1].windowUrl).to.equal("http://test-dict.com");
        expect(Dict._shouldUpdateClientSide).to.be.false;

        await Dict.removeDict("test-dict");
        expect(Dict.allDicts.find((d) => d.dictName === "test-dict")).to.be.undefined;
        expect(Dict._lastTimeSyncDicts).to.not.be.null;
        expect(Dict.allDicts.find((d) => d.dictName === "test-dict")).to.be.undefined;
        expect(Dict._shouldUpdateClientSide).to.be.false;
        const removeSyncDate = Dict._lastTimeSyncDicts;
        expect(removeSyncDate).to.not.equal(secondSyncDate);
    });
    it("auto fix chatgpt dict when init and add a new one", async () => {
        await Dict.init();
        const defaultChatgptDict = Dict.allDicts.find((d) => d.dictName.toLocaleLowerCase().includes("chatgpt"));
        expect(defaultChatgptDict).to.not.be.undefined;
        expect(defaultChatgptDict.windowUrl).to.equal("https://chatgpt.com");
        expect(defaultChatgptDict.inputSelector).to.not.be.empty;
        expect(defaultChatgptDict.submitButtonSelector).to.not.be.empty;
        expect(defaultChatgptDict.prompt).to.not.be.empty;
        expect(defaultChatgptDict.chatgptPrompt).to.be.undefined;

        await Dict.addToDictionariez({
            dictName: "ChatGPT Test",
            chatgptPrompt: "Explain <word> in simple terms.",
        });
        const chatgptDict = Dict.allDicts[Dict.allDicts.length - 1];
        expect(chatgptDict.windowUrl).to.equal("https://chatgpt.com");
        expect(chatgptDict.inputSelector).to.not.be.empty;
        expect(chatgptDict.submitButtonSelector).to.not.be.empty;
        expect(chatgptDict.prompt).to.not.be.empty;
        expect(chatgptDict.chatgptPrompt).to.be.undefined;

        expect(Dict._lastTimeSyncDicts).to.be.a("string").that.is.not.empty;
        const cloudChatgptDict = Dict.allDicts[Dict.allDicts.length - 1];
        expect(cloudChatgptDict).to.not.be.undefined;
        expect(cloudChatgptDict.windowUrl).to.equal("https://chatgpt.com");
        expect(cloudChatgptDict.inputSelector).to.not.be.empty;
        expect(cloudChatgptDict.submitButtonSelector).to.not.be.empty;
        expect(cloudChatgptDict.prompt).to.not.be.empty;
        expect(cloudChatgptDict.chatgptPrompt).to.be.undefined;
        expect(Dict._shouldUpdateClientSide).to.be.false;

        await Dict.removeDict("ChatGPT Test");
        expect(Dict.allDicts.find((d) => d.dictName === "ChatGPT Test")).to.be.undefined;
        expect(Dict._lastTimeSyncDicts).to.be.a("string").that.is.not.empty;
        expect(Dict.allDicts.find((d) => d.dictName === "ChatGPT Test")).to.be.undefined;
        expect(Dict._shouldUpdateClientSide).to.be.false;
    });

    it("override all client dicts when cloud has newer version", async () => {
        await Dict.init();

        // simulate cloud has newer version
        const oneMinuteAgo = new Date(Date.now() - 60000).toISOString();
        setting.getValue.withArgs("lastTimeSyncDicts").returns(oneMinuteAgo);

        // simulate client side has a dict removed and a dict changed
        const defaultChatgptDict = Dict.allDicts.find((d) => d.dictName.toLocaleLowerCase().includes("chatgpt"));
        expect(defaultChatgptDict).to.not.be.undefined;
        const removedDictName = Dict.allDicts[0].dictName;
        Dict.allDicts = Dict.allDicts.filter((d) => d.dictName !== removedDictName);
        defaultChatgptDict.windowUrl = "https://modified-chatgpt.com";

        // now add a new dict and sync
        await Dict.addToDictionariez(testDict("test-dict2"));
        expect(Dict._lastTimeSyncDicts).to.be.a("string").that.is.not.empty;
        expect(Dict.allDicts.length).to.be.greaterThan(1);

        // the removed dict is back
        expect(Dict.allDicts.find((d) => d.dictName === removedDictName)).to.not.be.undefined;
        const cloudChatgptDict = Dict.allDicts.find((d) => d.dictName === defaultChatgptDict.dictName);
        expect(cloudChatgptDict).to.not.be.undefined;
        expect(cloudChatgptDict.windowUrl).to.equal("https://chatgpt.com");
        expect(cloudChatgptDict.windowUrl).to.not.equal("https://modified-chatgpt.com");
        expect(Dict._shouldUpdateClientSide).to.be.true;

        const lastDict = Dict.allDicts[Dict.allDicts.length - 1];
        expect(lastDict.dictName).to.equal("test-dict2");
        expect(lastDict.windowUrl).to.equal("http://test-dict2.com");
        expect(Dict.allDicts).to.have.lengthOf(Dict.allDicts.length);
        await Dict.removeDict("test-dict2");
    });

    it("client side dicts still works when cloud sync failed", async () => {
        await Dict.init();
        await Dict.syncPromise;
        const initDictsCount = Dict.allDicts.length;
        // simulate cloud sync failed
        sinon.stub(cloudStorage, "syncAllDicts").throws(new Error("network-error"));

        // add a new dict
        const newDict = await Dict.addToDictionariez(testDict("test-dict3"));
        expect(newDict).to.include(testDict("test-dict3"));
        const lastDict = Dict.allDicts[Dict.allDicts.length - 1];
        expect(lastDict).to.deep.equal(newDict);
        expect(Dict._lastTimeSyncDicts).to.be.a("string").that.is.not.empty;

        expect(Dict.allDicts.length).to.equal(initDictsCount + 1);
        expect(Dict.syncDictsError).to.be.a("string").that.includes("network-error");

        // remove the dict
        await Dict.removeDict("test-dict3");
        expect(Dict.allDicts.find((d) => d.dictName === "test-dict3")).to.be.undefined;
        expect(Dict._lastTimeSyncDicts).to.be.a("string").that.is.not.empty;
        expect(Dict.allDicts.length).to.equal(initDictsCount);
        expect(Dict.syncDictsError).to.be.a("string").that.includes("network-error");
    });
});
