import setting from "./setting.js"; // Import the setting module
import message from "./message.js";
import { expect } from "chai";
import Dict from "./dict.js";
import storage from "./storage.js";

const dictData = {
    dictName: "test-dict",
    windowUrl: "http://test-dict.com",
    css: "body {background: red;}",
};

describe("dicts management for pro user", () => {
    beforeEach(() => {
        sinon.stub(message, "on");
        sinon.stub(setting, "getValue").returns(null);
        sinon.stub(setting, "setValue").returns(null);
        sinon.stub(Dict, "isProUser").returns(true);
        sinon.stub(storage, "getAllByK").resolves([]);
        sinon.stub(storage, "setAllByK").resolves();
        sinon.stub(storage, "remove").resolves();
        sinon.stub(Dict, "allDicts").value([]);
    });
    afterEach(() => {
        sinon.restore();
    });

    it("init all default dicts for new user and sync to cloud", async () => {
        await Dict.init();
        expect(Dict.allDicts.length).to.be.greaterThan(1);
        expect(Dict.syncPromise).to.not.be.null;
        const { allDicts, lastTimeSyncDicts } = await Dict.syncPromise;
        expect(allDicts.length).to.be.greaterThan(1);
        expect(lastTimeSyncDicts).to.be.a("string").that.is.not.empty;
    });
    it("add a new dict then remove it", async () => {
        await Dict.init();
        const newDict = await Dict.addToDictionariez(dictData);
        expect(newDict).to.include(dictData);
        const lastDict = Dict.allDicts[Dict.allDicts.length - 1];
        expect(lastDict).to.deep.equal(newDict);
        expect(Dict.syncPromise).to.not.be.null;
        const { allDicts, lastTimeSyncDicts } = await Dict.syncPromise;
        expect(lastTimeSyncDicts).to.be.a("string").that.is.not.empty;
        expect(allDicts[allDicts.length - 1].dictName).to.equal("test-dict");
        expect(allDicts[allDicts.length - 1].windowUrl).to.equal("http://test-dict.com");

        await Dict.removeDict("test-dict");
        expect(Dict.allDicts.find((d) => d.dictName === "test-dict")).to.be.undefined;
        expect(Dict.syncPromise).to.not.be.null;
        const res = await Dict.syncPromise;
        expect(res.lastTimeSyncDicts).to.be.a("string").that.is.not.empty;
        expect(res.allDicts.find((d) => d.dictName === "test-dict")).to.be.undefined;
    });
});
