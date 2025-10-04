import storage from "./storage.js";
import setting from "./setting.js"; // Import the setting module
import message from "./message.js";
import { expect } from "chai";
import cloudStorage from "./storage-on-cloud.js";

const wordDetail = {
    w: "test",
    sentence: "this is a test sentence.",
    s: "http://test.com",
    sc: "test source title",
};

describe("storage for pro user", () => {
    beforeEach(() => {
        sinon.stub(message, "on");
        sinon.stub(setting, "getValue").returns(false);
        sinon.stub(storage, "isProUser").returns(true);
        storage.localHistory = [];
    });
    afterEach(() => {
        sinon.restore();
    });

    it("should add the word to pnlpal", async function () {
        await storage.addHistory(wordDetail);
        expect(storage.localHistory.length).to.equal(0);

        const createdWord = await storage.getWordDetail(wordDetail.w);
        expect(createdWord.w).to.equal(wordDetail.w);
        expect(createdWord.sentence).to.equal(wordDetail.sentence);
        expect(createdWord.s).to.equal(wordDetail.s);
        expect(createdWord.sc).to.equal(wordDetail.sc);
        expect(createdWord.t).to.is.a("number");
        await storage.removeHistory(wordDetail.w);
    });

    it("should update the existing word", async function () {
        await storage.addHistory(wordDetail);
        expect(storage.localHistory.length).to.equal(0);
        const createdWord = await storage.getWordDetail(wordDetail.w);

        const wordDetail2 = {
            ...wordDetail,
            sentence: "this is a new sentence.",
            s: "http://test2.com",
        };
        await storage.addHistory(wordDetail2);
        const updatedWord = await storage.getWordDetail(wordDetail2.w);

        expect(storage.localHistory.length).to.equal(0);
        expect(updatedWord.w).to.equal(wordDetail2.w);
        expect(updatedWord.sentence).to.equal(wordDetail2.sentence);
        expect(updatedWord.s).to.equal(wordDetail2.s);
        expect(updatedWord.sc).to.equal(wordDetail2.sc);
        expect(updatedWord.t).to.is.a("number");
        expect(createdWord.t).to.be.lessThan(updatedWord.t);
        await storage.removeHistory([wordDetail.w, wordDetail2.w]);
    });
    it("should not update the existing word if the new word is the same", async function () {
        await storage.addHistory(wordDetail);
        expect(storage.localHistory.length).to.equal(0);
        const createdWord = await storage.getWordDetail(wordDetail.w);

        const wordDetail2 = {
            ...wordDetail,
        };
        await storage.addHistory(wordDetail2);
        const updatedWord = await storage.getWordDetail(wordDetail2.w);
        expect(storage.localHistory.length).to.equal(0);
        expect(updatedWord.t).to.equal(createdWord.t);
        await storage.removeHistory(wordDetail.w);
    });
    it("should not update the existing word if the new word is the same but only sentence or source is null", async function () {
        await storage.addHistory(wordDetail);
        expect(storage.localHistory.length).to.equal(0);
        const createdWord = await storage.getWordDetail(wordDetail.w);

        const wordDetail2 = {
            ...wordDetail,
            sentence: null,
        };
        await storage.addHistory(wordDetail2);
        const updatedWord = await storage.getWordDetail(wordDetail2.w);
        expect(storage.localHistory.length).to.equal(0);
        expect(updatedWord.t).to.equal(createdWord.t);

        const wordDetail3 = {
            ...wordDetail,
            s: null,
            sc: null,
        };
        await storage.addHistory(wordDetail3);
        const updatedWord3 = await storage.getWordDetail(wordDetail3.w);
        expect(storage.localHistory.length).to.equal(0);
        expect(updatedWord3.t).to.equal(createdWord.t);

        await storage.removeHistory(wordDetail.w);
    });

    it("remove the word from pnlpal", async function () {
        await storage.addHistory(wordDetail);
        expect(storage.localHistory.length).to.equal(0);
        await storage.getWordDetail(wordDetail.w);
        await storage.removeHistory(wordDetail.w);
        const removedWord = await storage.getWordDetail(wordDetail.w);
        expect(removedWord).to.be.undefined;
    });

    it("remove multiple words from pnlpal", async function () {
        await storage.addHistory(wordDetail);
        const wordDetail2 = {
            ...wordDetail,
            w: "test2",
        };
        await storage.addHistory(wordDetail2);
        expect(storage.localHistory.length).to.equal(0);
        const createdWord = await storage.getWordDetail(wordDetail.w);
        const createdWord2 = await storage.getWordDetail(wordDetail2.w);
        expect(createdWord.w).to.equal(wordDetail.w);
        expect(createdWord2.w).to.equal(wordDetail2.w);
        await storage.removeHistory([wordDetail.w, wordDetail2.w]);
        const removedWord = await storage.getWordDetail(wordDetail.w);
        expect(removedWord).to.be.undefined;
        const removedWord2 = await storage.getWordDetail(wordDetail2.w);
        expect(removedWord2).to.be.undefined;
    });
    it("should get the previous word", async function () {
        await storage.addHistory(wordDetail);
        const wordDetail2 = {
            ...wordDetail,
            w: "test2",
        };
        await storage.addHistory(wordDetail2);

        const previous = await storage.getPrevious(wordDetail2.w);
        expect(previous.w).to.equal(wordDetail.w);
        await storage.removeHistory([wordDetail.w, wordDetail2.w]);
    });
    it("should get the latest word", async function () {
        await storage.addHistory(wordDetail);
        const wordDetail2 = {
            ...wordDetail,
            w: "test2",
        };
        await storage.addHistory(wordDetail2);

        const latest = await storage.getPrevious();
        expect(latest.w).to.equal(wordDetail2.w);
        await storage.removeHistory([wordDetail.w, wordDetail2.w]);
    });
    it("should get the next word", async function () {
        await storage.addHistory(wordDetail);
        const wordDetail2 = {
            ...wordDetail,
            w: "test2",
        };
        await storage.addHistory(wordDetail2);

        const next = await storage.getNext(wordDetail.w);
        expect(next.w).to.equal(wordDetail2.w);
        await storage.removeHistory([wordDetail.w, wordDetail2.w]);
    });
    it("should add rating to the word", async function () {
        await storage.addHistory(wordDetail);
        await storage.addRating(wordDetail.w, 3);
        const updatedWord = await storage.getWordDetail(wordDetail.w);
        expect(updatedWord.r).to.equal(3);
        await storage.removeHistory(wordDetail.w);
    });
    it("should not change rating when updating the word", async function () {
        await storage.addHistory(wordDetail);
        await storage.addRating(wordDetail.w, 3);
        const updatedWord = await storage.getWordDetail(wordDetail.w);
        expect(updatedWord.r).to.equal(3);
        await storage.addHistory({
            ...wordDetail,
            r: undefined,
            sentence: "new sentence",
        });
        const updatedWord2 = await storage.getWordDetail(wordDetail.w);
        expect(updatedWord2.sentence).to.equal("new sentence");
        expect(updatedWord2.r).to.equal(3);
        await storage.removeHistory(wordDetail.w);
    });

    it("should mark the word as ankiSaved", async function () {
        await storage.addHistory(wordDetail);
        const createdWord = await storage.getWordDetail(wordDetail.w);
        expect(!!createdWord.ankiSaved).to.be.false;

        await storage.savedAnki(wordDetail.w);
        const updatedWord = await storage.getWordDetail(wordDetail.w);
        expect(updatedWord.ankiSaved).to.be.true;

        await storage.removeHistory(wordDetail.w);
    });
    it("should fall back to local storage when cloud storage fails", async function () {
        sinon.stub(cloudStorage, "addHistory").throws(new Error("Cloud storage error"));
        sinon.stub(cloudStorage, "getWordDetail").throws(new Error("Cloud storage error"));
        await storage.addHistory(wordDetail);
        expect(storage.localHistory.length).to.equal(1);
        const createdWord = await storage.getWordDetail(wordDetail.w);
        expect(createdWord.w).to.equal(wordDetail.w);
        expect(createdWord.sentence).to.equal(wordDetail.sentence);
        expect(createdWord.s).to.equal(wordDetail.s);
        expect(createdWord.sc).to.equal(wordDetail.sc);
        expect(createdWord.t).to.is.a("number");
        await storage.removeHistory(wordDetail.w);
    });
    it("should fall back to local storage when cloud storage returns not-pro-user error", async function () {
        // stub fetch using sinon
        sinon.stub(window, "fetch").resolves({
            json: async () => ({ error: "not-pro-user" }),
            ok: false,
            status: 403,
        });

        sinon.stub(cloudStorage, "getWordDetail").throws(new Error("Cloud storage error"));
        await storage.addHistory(wordDetail);
        expect(storage.localHistory.length).to.equal(1);
        const createdWord = await storage.getWordDetail(wordDetail.w);
        expect(createdWord.w).to.equal(wordDetail.w);
        expect(createdWord.sentence).to.equal(wordDetail.sentence);
        expect(createdWord.s).to.equal(wordDetail.s);
        expect(createdWord.sc).to.equal(wordDetail.sc);
        expect(createdWord.t).to.is.a("number");
        expect(setting.getValue("isPro")).to.be.false;
    });

    it("should get limited history from cloud storage", async function () {
        const words = [
            { ...wordDetail, w: "test1" },
            { ...wordDetail, w: "test2" },
            { ...wordDetail, w: "test3" },
        ];

        for (const word of words) {
            await storage.addHistory(word);
        }
        expect(storage.localHistory.length).to.equal(0);
        const history = await storage.getHistory(2, (item) => {
            return { w: item.word };
        });
        expect(history.length).to.equal(2);
        expect(history[0].w).to.equal("test3");
        expect(history[1].w).to.equal("test2");
        const { deleted } = await storage.removeHistory(words.map((w) => w.w));
        expect(deleted).to.equal(3);
    });

    it("should remove history from cloud storage", async function () {
        const words = [
            { ...wordDetail, w: "test4" },
            { ...wordDetail, w: "test5" },
            { ...wordDetail, w: "test6" },
        ];

        for (const word of words) {
            await storage.addHistory(word);
        }
        expect(storage.localHistory.length).to.equal(0);

        const { deleted } = await storage.removeHistory(["test4", "test6"]);
        expect(deleted).to.equal(2);
        const word5 = await storage.getWordDetail("test5");
        expect(word5.w).to.equal("test5");
        const word4 = await storage.getWordDetail("test4");
        expect(word4).to.be.undefined;
        const word6 = await storage.getWordDetail("test6");
        expect(word6).to.be.undefined;
        const delResponse2 = await storage.removeHistory("test5");
        expect(delResponse2.deleted).to.equal(1);
    });
    it("should sync local history to cloud when getting history", async function () {
        storage.localHistory = [
            { ...wordDetail, w: "local1", r: 1, ankiSaved: true, t: Date.now() - 2000 },
            { ...wordDetail, w: "local2", t: Date.now() - 1000 },
        ];
        const history = await storage.syncThenGetHistory();
        expect(history.find((item) => item.w === "local1")).to.exist;
        expect(history.find((item) => item.w === "local1").r).to.equal(1);
        expect(history.find((item) => item.w === "local1").ankiSaved).to.be.true;
        expect(history.find((item) => item.w === "local2")).to.exist;
        expect(history.find((item) => item.w === "local2").ankiSaved).to.be.false;

        const createdWord = await storage.getWordDetail("local1");
        expect(createdWord.w).to.equal("local1");
        expect(createdWord.t).to.equal(history.find((item) => item.w === "local1").t);

        expect(storage.localHistory.length).to.equal(0);
        const { deleted } = await storage.removeHistory(["local1", "local2"]);
        expect(deleted).to.equal(2);
    });

    it("should fall back to local if cloud storage is not available when sync local history", async function () {
        // stub fetch using sinon
        sinon.stub(window, "fetch").resolves({
            json: async () => ({ error: "not-pro-user" }),
            ok: false,
            status: 403,
        });

        sinon.stub(cloudStorage, "getWordDetail").throws(new Error("Cloud storage error"));
        storage.localHistory = [
            { ...wordDetail, w: "local1", t: Date.now() - 2000 },
            { ...wordDetail, w: "local2", t: Date.now() - 1000 },
        ];
        const history = await storage.syncThenGetHistory();
        expect(history.find((item) => item.w === "local1")).to.exist;
        expect(history.find((item) => item.w === "local2")).to.exist;

        expect(storage.localHistory.length).to.equal(2);
        expect(setting.getValue("isPro")).to.be.false;
        const { deleted } = await storage.removeHistory(["local1", "local2"]);
        expect(deleted).to.equal(2);
    });
    it("should get the previous anki unsaved word", async function () {
        storage.localHistory = [
            { ...wordDetail, w: "anki1", ankiSaved: true, t: Date.now() - 4000 },
            { ...wordDetail, w: "anki2", ankiSaved: false, t: Date.now() - 3000 },
            { ...wordDetail, w: "anki3", ankiSaved: false, t: Date.now() - 2000 },
            { ...wordDetail, w: "anki4", ankiSaved: true, t: Date.now() - 1000 },
        ];
        await storage.syncThenGetHistory();

        const previousUnsaved = await storage.getPreviousAnkiUnsaved("anki4");
        expect(previousUnsaved).to.exist;
        expect(previousUnsaved.w).to.equal("anki3");

        const previousUnsaved2 = await storage.getPreviousAnkiUnsaved("anki3");
        expect(previousUnsaved2).to.exist;
        expect(previousUnsaved2.w).to.equal("anki2");

        const previousUnsaved3 = await storage.getPreviousAnkiUnsaved("anki99");
        expect(previousUnsaved3).to.not.exist;

        await storage.removeHistory(["anki1", "anki2", "anki3", "anki4"]);
    });
});
