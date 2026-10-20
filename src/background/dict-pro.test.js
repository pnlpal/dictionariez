import setting from "./setting.js"; // Import the setting module
import message from "./message.js";
import { expect } from "chai";
import Dict from "./dict.js";
import storage from "./storage.js";
import cloudStorage from "./storage-on-cloud.js";
import contextMenu from "./contextMenu.js";

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
        // test-only fields, reset so a test never passes on what the previous one left behind
        Dict._shouldUpdateClientSide = undefined;
        Dict._lastTimeSyncDicts = undefined;
    });
    afterEach(() => {
        sinon.restore();
    });

    // The test account on the server always has dicts from earlier runs, so the first sync on this "device"
    // would stop at the conflict check (Edge Case 6). Skip the check, so init gets the server's dicts
    // (shouldUpdateClientSide = true) and a server sync time to continue from.
    const initWithoutServerConflict = async () => {
        sinon.stub(Dict, "hasSelectedLanguages").returns(true);
        sinon.stub(Dict, "checkServerForExistingDicts").resolves(null);
        await Dict.init();
    };

    it("init and restore all default dicts for new user and sync to cloud", async () => {
        setting.getValue.withArgs("lastTimeSyncDicts").returns(null);
        await initWithoutServerConflict();
        expect(Dict.allDicts.length).to.be.greaterThan(1);
        expect(Dict._lastTimeSyncDicts).to.be.a("string").that.is.not.empty;
        expect(Dict._shouldUpdateClientSide).to.be.true;
    });
    it("never overwrite either side on the first sync when the server already has dicts", async () => {
        const serverDicts = [testDict("server-dict")];
        const serverTime = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
        sinon.stub(cloudStorage, "syncAllDicts").resolves({
            allDicts: serverDicts,
            shouldUpdateClientSide: true,
            lastTimeSyncDicts: serverTime,
        });
        sinon.stub(Dict, "hasSelectedLanguages").returns(true);
        await Dict.init();

        // only the check-only call (timestamp 0) is made, nothing is written on either side
        expect(cloudStorage.syncAllDicts.calledOnce).to.be.true;
        expect(cloudStorage.syncAllDicts.firstCall.args[1]).to.equal(0);
        expect(Dict.serverDictsConflict).to.deep.equal({ serverDicts, lastTimeSyncDicts: serverTime });
        expect(Dict.allDicts.length).to.be.greaterThan(1);
        expect(Dict.allDicts.find((d) => d.dictName === "server-dict")).to.be.undefined;
        expect(setting.getValue("lastTimeSyncDicts")).to.not.exist;
        expect(Dict._lastTimeSyncDicts).to.be.undefined;
    });
    it("add a new dict then remove it", async () => {
        await initWithoutServerConflict();
        expect(Dict._lastTimeSyncDicts).to.be.a("string").that.is.not.empty;
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
        // init stays local (no languages selected), then add the dict on a device that synced before,
        // so the server takes the client's dicts instead of answering with its own
        await Dict.init();
        setting.setValue("lastTimeSyncDicts", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());
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

        // now pull from the cloud, without an action the server's newer version wins
        await Dict.syncAllDictsWithCloud();
        expect(Dict._lastTimeSyncDicts).to.be.a("string").that.is.not.empty;
        expect(Dict.allDicts.length).to.be.greaterThan(1);

        // the removed dict is back
        expect(Dict.allDicts.find((d) => d.dictName === removedDictName)).to.not.be.undefined;
        const cloudChatgptDict = Dict.allDicts.find((d) => d.dictName === defaultChatgptDict.dictName);
        expect(cloudChatgptDict).to.not.be.undefined;
        expect(cloudChatgptDict.windowUrl).to.equal("https://chatgpt.com");
        expect(cloudChatgptDict.windowUrl).to.not.equal("https://modified-chatgpt.com");
        expect(Dict._shouldUpdateClientSide).to.be.true;
    });

    it("client side dicts still works when cloud sync failed", async () => {
        await initWithoutServerConflict();
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

    describe("check server for conflicts on the first sync (Edge Case 6)", () => {
        const serverDicts = [testDict("server-dict-1"), testDict("server-dict-2")];
        const serverTime = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
        const newServerTime = new Date().toISOString();

        // Fake server: timestamp 0 is the check-only call, any other call is a normal sync that takes the client's dicts
        const stubServer = ({ hasDicts }) => {
            sinon.stub(cloudStorage, "syncAllDicts").callsFake(async (allDicts, lastTimeSyncDicts) => {
                if (lastTimeSyncDicts === 0) {
                    return hasDicts
                        ? { allDicts: serverDicts, shouldUpdateClientSide: true, lastTimeSyncDicts: serverTime }
                        : { allDicts: [], shouldUpdateClientSide: false, lastTimeSyncDicts: null };
                }
                return { allDicts, shouldUpdateClientSide: false, lastTimeSyncDicts: newServerTime };
            });
        };
        const getHandler = (name) => message.on.getCalls().find((call) => call.args[0] === name).args[1];

        beforeEach(() => {
            sinon.stub(contextMenu, "rebuildContextMenu");
        });

        it("checkServerForExistingDicts returns the server's dicts and sync time when it has dicts", async () => {
            stubServer({ hasDicts: true });
            await Dict.init();

            const conflict = await Dict.checkServerForExistingDicts();
            expect(conflict).to.deep.equal({ serverDicts, lastTimeSyncDicts: serverTime });
            expect(cloudStorage.syncAllDicts.firstCall.args[1]).to.equal(0);
        });

        it("checkServerForExistingDicts returns null when the server has no dicts", async () => {
            stubServer({ hasDicts: false });
            await Dict.init();

            expect(await Dict.checkServerForExistingDicts()).to.be.null;
        });

        it("checkServerForExistingDicts returns null when the server answers with an empty list", async () => {
            sinon.stub(cloudStorage, "syncAllDicts").resolves({
                allDicts: [],
                shouldUpdateClientSide: true,
                lastTimeSyncDicts: serverTime,
            });
            await Dict.init();

            expect(await Dict.checkServerForExistingDicts()).to.be.null;
        });

        it("first sync goes on to a normal sync when the server has no dicts", async () => {
            stubServer({ hasDicts: false });
            await Dict.init();
            const localCount = Dict.allDicts.length;

            await Dict.syncAllDictsWithCloud();
            expect(cloudStorage.syncAllDicts.calledTwice).to.be.true;
            expect(cloudStorage.syncAllDicts.firstCall.args[1]).to.equal(0);
            expect(cloudStorage.syncAllDicts.secondCall.args[1]).to.not.exist;
            expect(Dict.serverDictsConflict).to.be.null;
            expect(Dict.allDicts.length).to.equal(localCount);
            expect(setting.getValue("lastTimeSyncDicts")).to.equal(newServerTime);
        });

        it("a local change on a never synced device stays local when the server has dicts", async () => {
            stubServer({ hasDicts: true });
            await Dict.init();

            await Dict.addToDictionariez(testDict("local-dict"));
            // the dict is added locally, but only the check-only call reaches the server
            expect(Dict.allDicts.find((d) => d.dictName === "local-dict")).to.not.be.undefined;
            expect(cloudStorage.syncAllDicts.calledOnce).to.be.true;
            expect(cloudStorage.syncAllDicts.firstCall.args[1]).to.equal(0);
            expect(Dict.serverDictsConflict).to.deep.equal({ serverDicts, lastTimeSyncDicts: serverTime });
            expect(setting.getValue("lastTimeSyncDicts")).to.not.exist;
        });

        it("a device that synced before never checks for conflicts", async () => {
            stubServer({ hasDicts: true });
            await Dict.init();
            setting.setValue("lastTimeSyncDicts", serverTime);

            await Dict.addToDictionariez(testDict("local-dict"));
            expect(cloudStorage.syncAllDicts.calledOnce).to.be.true;
            expect(cloudStorage.syncAllDicts.firstCall.args.slice(1)).to.deep.equal([serverTime, "add"]);
            expect(Dict.serverDictsConflict).to.be.null;
            expect(setting.getValue("lastTimeSyncDicts")).to.equal(newServerTime);
        });

        it("get-all-dicts reports the conflict to the options page", async () => {
            stubServer({ hasDicts: true });
            await Dict.init();

            const res = await getHandler("get-all-dicts")({});
            expect(res.serverDictsConflict).to.deep.equal({ serverDicts, lastTimeSyncDicts: serverTime });
            expect(res.lastTimeSyncDicts).to.not.exist;
            expect(res.allDicts.find((d) => d.dictName === "server-dict-1")).to.be.undefined;
        });

        it("check-server-for-existing-dicts handler reports the server's dicts", async () => {
            stubServer({ hasDicts: true });
            await Dict.init();

            const res = await getHandler("check-server-for-existing-dicts")({});
            expect(res).to.deep.equal({ hasServerDicts: true, serverDicts, lastTimeSyncDicts: serverTime });
        });

        it("check-server-for-existing-dicts handler reports no dicts when the server is empty", async () => {
            stubServer({ hasDicts: false });
            await Dict.init();

            const res = await getHandler("check-server-for-existing-dicts")({});
            expect(res.hasServerDicts).to.be.false;
        });

        it("check-server-for-existing-dicts handler skips the server for non-pro users", async () => {
            stubServer({ hasDicts: true });
            Dict.isProUser.returns(false);
            await Dict.init();

            const res = await getHandler("check-server-for-existing-dicts")({});
            expect(res).to.deep.equal({ hasServerDicts: false, serverDicts: null });
            expect(cloudStorage.syncAllDicts.called).to.be.false;
        });

        it("check-server-for-existing-dicts handler returns the error when the server fails", async () => {
            sinon.stub(cloudStorage, "syncAllDicts").rejects(new Error("network-error"));
            await Dict.init();

            const res = await getHandler("check-server-for-existing-dicts")({});
            expect(res).to.deep.equal({ hasServerDicts: false, serverDicts: null, error: "network-error" });
        });

        it("accept-server-dicts replaces local dicts and continues from the server's sync time", async () => {
            stubServer({ hasDicts: true });
            await Dict.init();
            await Dict.syncAllDictsWithCloud();
            expect(Dict.serverDictsConflict).to.not.be.null;
            storage.removeAllByK.resetHistory();
            storage.setAllByK.resetHistory();
            cloudStorage.syncAllDicts.resetHistory();

            const res = await getHandler("accept-server-dicts")({ serverDicts, lastTimeSyncDicts: serverTime });
            expect(res).to.deep.equal({ success: true });
            expect(Dict.allDicts).to.deep.equal(serverDicts);
            expect(storage.removeAllByK.calledOnceWith("dict-")).to.be.true;
            expect(storage.setAllByK.calledOnceWith("dict-", "dictName", serverDicts)).to.be.true;
            expect(setting.getValue("lastTimeSyncDicts")).to.equal(serverTime);
            expect(Dict.serverDictsConflict).to.be.null;
            expect(contextMenu.rebuildContextMenu.calledWith(serverDicts)).to.be.true;
            // nothing is sent back to the server
            expect(cloudStorage.syncAllDicts.called).to.be.false;

            // the next sync starts from the server's time and doesn't check again
            await Dict.syncAllDictsWithCloud();
            expect(cloudStorage.syncAllDicts.calledOnce).to.be.true;
            expect(cloudStorage.syncAllDicts.firstCall.args[1]).to.equal(serverTime);
        });

        it("sync-local-dicts-to-server overwrites the server with local dicts from the server's sync time", async () => {
            stubServer({ hasDicts: true });
            await Dict.init();
            await Dict.syncAllDictsWithCloud();
            expect(Dict.serverDictsConflict).to.not.be.null;
            cloudStorage.syncAllDicts.resetHistory();
            const localDicts = Dict.allDicts;

            const res = await getHandler("sync-local-dicts-to-server")({ lastTimeSyncDicts: serverTime });
            expect(res).to.deep.equal({ success: true });
            // no second check: the user already decided
            expect(cloudStorage.syncAllDicts.calledOnce).to.be.true;
            expect(cloudStorage.syncAllDicts.firstCall.args).to.deep.equal([localDicts, serverTime, "keep-local-dicts"]);
            expect(Dict.allDicts).to.deep.equal(localDicts);
            expect(Dict.serverDictsConflict).to.be.null;
            expect(setting.getValue("lastTimeSyncDicts")).to.equal(newServerTime);
        });

        it("sync-local-dicts-to-server throws when the sync fails, so the options page can show it", async () => {
            sinon.stub(cloudStorage, "syncAllDicts").rejects(new Error("network-error"));
            await Dict.init();

            let error;
            try {
                await getHandler("sync-local-dicts-to-server")({ lastTimeSyncDicts: serverTime });
            } catch (err) {
                error = err;
            }
            expect(error?.message).to.equal("network-error");
            expect(setting.getValue("lastTimeSyncDicts")).to.not.exist;
        });
    });
});
