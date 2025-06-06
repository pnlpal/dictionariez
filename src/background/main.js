import setting from "./setting.js";
import storage from "./storage.js";
import dict from "./dict.coffee";
import dw from "./dictwindow.coffee";
import "./auto-complete.coffee";

import message from "./message.js";
import readClipboard from "./clipboard.coffee";
import contextMenu from "./contextMenu.js";
console.log("PRODUCT: ", process.env.PRODUCT);

const initPromises = (async function () {
  await setting.init();
  await storage.init();
  await dict.init();
  await dw.init();

  if (process.env.PRODUCT !== "SidePal") {
    const lookup = require("./plain-lookup.coffee").default;
    const speak = require("./speak.coffee").default;
    const ankiWindow = require("./ankiwindow.coffee").default;
    const pnlpal = require("./pnlpal.coffee").default;

    await ankiWindow.init();
    await lookup.init();
    await speak.init();
    await pnlpal.init();

    global.ankiWindow = ankiWindow;
  }
  if (process.env.PRODUCT === "SidePal") {
    const setupSidePanel = require("./setupSidePanel.js").default;
    setupSidePanel();
  }

  global.dw = dw;
  global.storage = storage;
  global.dict = dict;
  global.setting = setting;
})();

chrome.runtime.onInstalled.addListener(async function (details) {
  if (process.env.UNIT_TEST === "true")
    chrome.tabs.create({
      url: chrome.runtime.getURL("test.html"),
    });

  if (
    [
      chrome.runtime.OnInstalledReason.UPDATE,
      chrome.runtime.OnInstalledReason.INSTALL,
    ].includes(details.reason)
  ) {
    await initPromises;
    if (process.env.PRODUCT !== "SidePal") {
      if (!setting.getValue("privacyConsent")) {
        chrome.tabs.create({
          url: chrome.runtime.getURL("privacy-consent.html"),
        });
        return;
      }
    } else {
      chrome.tabs.create({
        url: chrome.runtime.getURL("share.html"),
      });
    }
  }
});

chrome.runtime.onMessage.addListener(function (...args) {
  initPromises.then(() => {
    message.handle(...args);
  });
  // sendResponse becomes invalid when the event listener returns,
  // unless you return true from the event listener to indicate you wish to send a response asynchronously
  return true;
});

if (process.env.PRODUCT !== "SidePal") {
  chrome.windows.onRemoved.addListener(async function (wid) {
    await initPromises;
    dw.destroyWin({ wid });
    global.ankiWindow?.destroyWin({ wid });
  });
  chrome.tabs.onRemoved.addListener(async function (tid) {
    await initPromises;
    dw.destroyWin({ tid });
  });
  chrome.windows.onFocusChanged.addListener(async function (wid) {
    await initPromises;
    if (wid > -1 && setting.getValue("enableAutoCloseMinidict")) {
      chrome.windows.get(wid, (win) => {
        if (win?.type === "normal") {
          dw.closeAllWindows();
        }
      });
    }
  });
}

function openSidePanel(tab) {
  if (chrome.sidePanel) {
    chrome.sidePanel.open({ tabId: tab.id });
  } else {
    browser.sidebarAction.open();
  }
}

(chrome.action || chrome.browserAction).onClicked.addListener(async function (
  tab
) {
  if (process.env.PRODUCT === "SidePal") {
    openSidePanel(tab);
  }

  await initPromises;
  global.ankiWindow?.focus();

  if (tab.url.startsWith("http")) {
    chrome.tabs.sendMessage(
      tab.id,
      {
        type: "get info before open dict",
      },
      async (res) => {
        if (res?.w && res.isInEditable) dw.refineTextWithAI(res.w);
        else
          dw.lookup({
            w: res?.w || (await readClipboard(tab)),
            ...res,
          });
      }
    );
  } else {
    dw.lookup({
      w: await readClipboard(tab),
    });
  }
});

chrome.contextMenus.onClicked.addListener(async function (info, tab) {
  if (process.env.PRODUCT === "SidePal") {
    openSidePanel(tab);
  }

  await initPromises;
  contextMenu.handler(info, tab);
});
