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
        sinon.stub(setting, "getValue").callsFake((key, defaultValue) => settingForTest[key] ?? defaultValue);
        sinon.stub(setting, "setValue").callsFake((key, value) => {
            settingForTest[key] = value;
        });
        sinon.stub(Dict, "isProUser").returns(true);
        sinon.stub(storage, "getAllByK").resolves([]);
        sinon.stub(storage, "setAllByK").resolves();
        sinon.stub(storage, "remove").resolves();
        sinon.stub(storage, "removeAllByK").resolves();
        sinon.stub(Dict, "allDicts").value([]);
    });
    afterEach(() => {
        sinon.restore();
    });

    it("init and restore all default dicts for new user and sync to cloud", async () => {
        setting.getValue.withArgs("lastTimeSyncDicts").returns(null);
        sinon.stub(Dict, "hasSelectedLanguages").returns(true);
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
        const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
        setting.getValue.withArgs("lastTimeSyncDicts").returns(oneMonthAgo);

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

        // the newly added dict is gone
        expect(Dict.allDicts.find((d) => d.dictName === "test-dict2")).to.be.undefined;
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

    it("syncDictsForLanguages adds and removes dicts based on language selection", async () => {
        await Dict.init();
        const initDictsCount = Dict.allDicts.length;

        // Change languages to include Chinese
        const result = await Dict.syncDictsForLanguages(["English", "Chinese"]);
        console.log(result);
        // Should have added Chinese dicts
        expect(result.added.length).to.be.greaterThan(0);
        expect(Dict.allDicts.length).to.be.greaterThan(initDictsCount);

        // Verify Chinese-specific dict was added
        const chineseDict = Dict.allDicts.find(
            (d) => d.dictName.toLowerCase().includes("zdic") || d.dictName.toLowerCase().includes("chinese"),
        );
        expect(chineseDict).to.not.be.undefined;
    });

    it("syncDictsForLanguages never removes custom dicts with troveUrl", async () => {
        await Dict.init();

        // Add a custom dict (simulating one installed from pnl.dev)
        const customDict = {
            dictName: "My Custom Dict",
            windowUrl: "http://custom.com/<word>",
            troveUrl: "https://pnl.dev/trove/123", // This marks it as a custom dict
        };
        await Dict.addToDictionariez(customDict);
        expect(Dict.allDicts.find((d) => d.dictName === "My Custom Dict")).to.not.be.undefined;

        // Change languages to something that doesn't include this dict
        await Dict.syncDictsForLanguages(["Swedish"]);

        // Custom dict should still exist (protected by troveUrl)
        const preservedDict = Dict.allDicts.find((d) => d.dictName === "My Custom Dict");
        expect(preservedDict).to.not.be.undefined;
        expect(preservedDict.troveUrl).to.equal("https://pnl.dev/trove/123");
    });

    it("syncDictsForLanguages uses batch storage operations", async () => {
        await Dict.init();
        storage.removeAllByK.resetHistory();
        storage.setAllByK.resetHistory();

        // Change languages to trigger sync
        const result = await Dict.syncDictsForLanguages(["English", "Swedish"]);

        // If there were changes, batch operations should have been used
        if (result.added.length > 0 || result.removed.length > 0) {
            expect(storage.removeAllByK.calledOnce).to.be.true;
            expect(storage.setAllByK.called).to.be.true;
        }
    });
});
