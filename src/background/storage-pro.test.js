import storage from "./storage.js";
import setting from "./setting.js"; // Import the setting module
import proHelper from "./pro-helper.js";
import message from "./message.js";
import { expect } from "chai";
import { create } from "lodash";

const wordDetail = {
  w: "test",
  sentence: "this is a test sentence.",
  s: "http://test.com",
  sc: "test source content",
  r: 0,
};

describe("storage for pro user", () => {
  beforeEach(() => {
    sinon.stub(message, "on");
    sinon.stub(setting, "getValue").returns(false);
    sinon.stub(proHelper, "isProUser").returns(true);
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
    expect(createdWord.r).to.equal(wordDetail.r);
    expect(createdWord.t).to.is.a("number");
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
    expect(updatedWord.r).to.equal(wordDetail2.r);
    expect(updatedWord.t).to.is.a("number");
    expect(createdWord.t).to.be.lessThan(updatedWord.t);
  });

  it("remove the word from pnlpal", async function () {
    await storage.addHistory(wordDetail);
    expect(storage.history.length).to.equal(0);
    const createdWord = await storage.getWordDetail(wordDetail.w);
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
  });
});
