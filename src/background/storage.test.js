import storage from "./storage.js";
import setting from "./setting.js"; // Import the setting module
import utils from "utils";
import message from "./message.js";
import { expect } from "chai";

const wordDetail = {
    w: "test",
    sentence: "this is a test sentence.",
    s: "http://test.com",
    sc: "test source content",
    r: 0,
};

describe("background/storage", () => {
    let chrome;
    let originalChrome = window.chrome;
    beforeEach(() => {
        chrome = {
            storage: {
                sync: {
                    get: sinon.stub(),
                    set: sinon.stub(),
                    remove: sinon.stub(),
                },
            },
        };
        window.chrome = chrome;
        sinon.stub(message, "on");
        sinon.stub(setting, "getValue").returns(false);
        sinon.stub(storage, "isProUser").returns(false);
    });
    afterEach(() => {
        sinon.restore();
        window.chrome = originalChrome;
    });

    it("should add the word to local history for non-pro users", async function () {
        chrome.storage.sync.set.resolves({});
        await storage.addHistory(wordDetail);
        expect(storage.localHistory.length).to.equal(1);
        // expect(chrome.storage.sync.set.calledOnce).to.be.true;

        expect(storage.localHistory[0].w).to.equal(wordDetail.w);
        expect(storage.localHistory[0].sentence).to.equal(wordDetail.sentence);
        expect(storage.localHistory[0].s).to.equal(wordDetail.s);
        expect(storage.localHistory[0].sc).to.equal(wordDetail.sc);
        expect(storage.localHistory[0].r).to.equal(wordDetail.r);
        expect(storage.localHistory[0].t).to.is.a("number");
    });

    it("should update the existing word in local history for non-pro users", async function () {
        chrome.storage.sync.set.resolves({});
        storage.localHistory = [];
        await storage.addHistory(wordDetail);
        expect(storage.localHistory.length).to.equal(1);
        const firstTime = storage.localHistory[0].t;
        await utils.promisifiedTimeout(10);
        // now update it
        const wordDetail2 = {
            ...wordDetail,
            sentence: "this is a new sentence.",
            s: "http://test2.com",
        };
        await storage.addHistory(wordDetail2);
        console.log(storage.localHistory[0].t, firstTime);
        expect(storage.localHistory.length).to.equal(1);
        expect(storage.localHistory[0].w).to.equal(wordDetail2.w);
        expect(storage.localHistory[0].sentence).to.equal(wordDetail2.sentence);
        expect(storage.localHistory[0].s).to.equal(wordDetail2.s);
        expect(storage.localHistory[0].sc).to.equal(wordDetail2.sc);
        expect(storage.localHistory[0].r).to.equal(wordDetail2.r);
        expect(storage.localHistory[0].t).to.is.a("number");
        expect(storage.localHistory[0].t).to.be.greaterThan(firstTime);
    });

    it("should remove the oldest item when maxLength exceeded", async function () {
        storage.maxLength = 3;
        storage.localHistory = [
            {
                w: "w1",
            },
            {
                w: "w2",
            },
            {
                w: "w3",
            },
        ];
        await storage.addHistory({
            w: "w4",
        });
        expect(storage.localHistory.length).to.equal(3);
        expect(storage.localHistory[0].w).to.equal("w2");
        expect(storage.localHistory[1].w).to.equal("w3");
        expect(storage.localHistory[2].w).to.equal("w4");
    });
});
