import storage from "./storage.js";
import setting from "./setting.js"; // Import the setting module
import proHelper from "./pro-helper.js";
import message from "./message.js";

describe("storage", () => {
  let chrome;
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
  });

  it("should add the word to local history for non-pro users if history is not full", async function () {
    sinon.stub(setting, "getValue").returns(false);
    sinon.stub(proHelper, "isProUser").returns(false);
    chrome.storage.sync.set.resolves({});
    await storage.addHistory({
      w: "test",
      sentence: "example sentence",
    });
    expect(storage.history.length).to.equal(1);
    expect(chrome.storage.sync.set.calledOnce).to.be.true;

    expect(storage.history[0].w).to.equal("test");
    expect(storage.history[0].sentence).to.equal("example sentence");
  });
});
