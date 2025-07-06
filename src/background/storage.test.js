import storage from "./storage.js";
import setting from "./setting.js"; // Import the setting module
import proHelper from "./pro-helper.js";
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
  });
  afterEach(() => {
    sinon.restore();
    window.chrome = originalChrome;
  });

  it("should add the word to local history for non-pro users", async function () {
    sinon.stub(setting, "getValue").returns(false);
    sinon.stub(proHelper, "isProUser").returns(false);
    chrome.storage.sync.set.resolves({});
    await storage.addHistory(wordDetail);
    expect(storage.history.length).to.equal(1);
    expect(chrome.storage.sync.set.calledOnce).to.be.true;

    expect(storage.history[0].w).to.equal(wordDetail.w);
    expect(storage.history[0].sentence).to.equal(wordDetail.sentence);
    expect(storage.history[0].s).to.equal(wordDetail.s);
    expect(storage.history[0].sc).to.equal(wordDetail.sc);
    expect(storage.history[0].r).to.equal(wordDetail.r);
    expect(storage.history[0].t).to.is.a("number");
  });
});
