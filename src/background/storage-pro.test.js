import storage from "./storage.js";
import setting from "./setting.js"; // Import the setting module
import message from "./message.js";
import { expect } from "chai";
import cloudStorage from "./storage-on-cloud.js";

const wordDetail = {
    w: "test",
    sentence: "this is a test sentence.",
    s: "http://test.com",
    sc: "test source content",
};

describe("storage for pro user", () => {
    beforeEach(() => {
        sinon.stub(message, "on");
        sinon.stub(setting, "getValue").returns(false);
        sinon.stub(storage, "isProUser").returns(true);
        storage.history = [];
    });
    afterEach(() => {
        sinon.restore();
    });

    it("should add the word to pnlpal", async function () {
        await storage.addHistory(wordDetail);
        expect(storage.history.length).to.equal(0);

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
        expect(storage.history.length).to.equal(0);
        const createdWord = await storage.getWordDetail(wordDetail.w);

        const wordDetail2 = {
            ...wordDetail,
            sentence: "this is a new sentence.",
            s: "http://test2.com",
        };
        await storage.addHistory(wordDetail2);
        const updatedWord = await storage.getWordDetail(wordDetail2.w);

        expect(storage.history.length).to.equal(0);
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
        expect(storage.history.length).to.equal(0);
        const createdWord = await storage.getWordDetail(wordDetail.w);

        const wordDetail2 = {
            ...wordDetail,
        };
        await storage.addHistory(wordDetail2);
        const updatedWord = await storage.getWordDetail(wordDetail2.w);
        expect(storage.history.length).to.equal(0);
        expect(updatedWord.t).to.equal(createdWord.t);
        await storage.removeHistory(wordDetail.w);
    });
    it("should not update the existing word if the new word is the same but only sentence or source is null", async function () {
        await storage.addHistory(wordDetail);
        expect(storage.history.length).to.equal(0);
        const createdWord = await storage.getWordDetail(wordDetail.w);

        const wordDetail2 = {
            ...wordDetail,
            sentence: null,
        };
        await storage.addHistory(wordDetail2);
        const updatedWord = await storage.getWordDetail(wordDetail2.w);
        expect(storage.history.length).to.equal(0);
        expect(updatedWord.t).to.equal(createdWord.t);

        const wordDetail3 = {
            ...wordDetail,
            s: null,
            sc: null,
        };
        await storage.addHistory(wordDetail3);
        const updatedWord3 = await storage.getWordDetail(wordDetail3.w);
        expect(storage.history.length).to.equal(0);
        expect(updatedWord3.t).to.equal(createdWord.t);

        await storage.removeHistory(wordDetail.w);
    });

    it("remove the word from pnlpal", async function () {
        await storage.addHistory(wordDetail);
        expect(storage.history.length).to.equal(0);
        await storage.getWordDetail(wordDetail.w);
        await storage.removeHistory(wordDetail.w);
        const removedWord = await storage.getWordDetail(wordDetail.w);
        expect(removedWord).to.be.null;
    });

    it("remove multiple words from pnlpal", async function () {
        await storage.addHistory(wordDetail);
        const wordDetail2 = {
            ...wordDetail,
            w: "test2",
        };
        await storage.addHistory(wordDetail2);
        expect(storage.history.length).to.equal(0);
        const createdWord = await storage.getWordDetail(wordDetail.w);
        const createdWord2 = await storage.getWordDetail(wordDetail2.w);
        expect(createdWord.w).to.equal(wordDetail.w);
        expect(createdWord2.w).to.equal(wordDetail2.w);
        await storage.removeHistory([wordDetail.w, wordDetail2.w]);
        const removedWord = await storage.getWordDetail(wordDetail.w);
        expect(removedWord).to.be.null;
        const removedWord2 = await storage.getWordDetail(wordDetail2.w);
        expect(removedWord2).to.be.null;
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
        expect(storage.history.length).to.equal(1);
        const createdWord = await storage.getWordDetail(wordDetail.w);
        expect(createdWord.w).to.equal(wordDetail.w);
        expect(createdWord.sentence).to.equal(wordDetail.sentence);
        expect(createdWord.s).to.equal(wordDetail.s);
        expect(createdWord.sc).to.equal(wordDetail.sc);
        expect(createdWord.t).to.is.a("number");
        await storage.removeHistory(wordDetail.w);
    });
});
