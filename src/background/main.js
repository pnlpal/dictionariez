import setting from "./setting.js";
import storage from "./storage.js";
import dict from "./dict.coffee";
import dw from "./dictwindow.coffee";
import "./auto-complete.coffee";
import lookup from "./plain-lookup.coffee";
import speak from "./speak.coffee";
import ankiWindow from "./ankiwindow.coffee";
import pnlpal from "./pnlpal.coffee";
import message from "./message.js";
import readClipboard from "./clipboard.coffee";

const initPromises = (async function () {
  await setting.init();
  await storage.init();
  await dict.init();
  await dw.init();
  await ankiWindow.init();
  await lookup.init();
  await speak.init();
  await pnlpal.init();

  global.dw = dw;
  global.storage = storage;
  global.dict = dict;
  global.setting = setting;
})();

chrome.runtime.onInstalled.addListener(function (details) {
  const manifestData = chrome.runtime.getManifest();
  if (
    [chrome.runtime.OnInstalledReason.INSTALL].includes(details.reason) &&
    details.previousVersion != manifestData.version
  ) {
    chrome.tabs.create({
      url: chrome.runtime.getURL("share.html"),
    });
  }
  if (process.env.UNIT_TEST === "true")
    chrome.tabs.create({
      url: chrome.runtime.getURL("test.html"),
    });
});

chrome.runtime.onMessage.addListener(function (...args) {
  initPromises.then(() => {
    message.handle(...args);
  });
  // sendResponse becomes invalid when the event listener returns,
  // unless you return true from the event listener to indicate you wish to send a response asynchronously
  return true;
});
chrome.windows.onRemoved.addListener(async function (wid) {
  await initPromises;
  dw.destroyWin({ wid });
  ankiWindow.destroyWin({ wid });
});
chrome.tabs.onRemoved.addListener(async function (tid) {
  await initPromises;
  dw.destroyWin({ tid });
});

(chrome.action || chrome.browserAction).onClicked.addListener(async function (
  tab
) {
  await initPromises;
  ankiWindow.focus();

  if (tab.url.startsWith("http")) {
    chrome.tabs.sendMessage(
      tab.id,
      {
        type: "get info before open dict",
      },
      async (res) => {
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
  await initPromises;
  if (info.menuItemId === "lookup") {
    const word = info.selectionText?.trim();
    chrome.tabs.sendMessage(
      tab.id >= 0 ? tab.id : 0, // tab.id is -1 when the context menu is clicked in a local pdf file
      {
        type: "get info before open dict",
      },
      async (res) => {
        dw.lookup({
          w: word || res?.w || (await readClipboard(tab)),
          s: info.frameUrl || tab.url,
          sc: tab.title,
          ...res,
        });
      }
    );
  }
  if (info.menuItemId === "share-with-pals") {
    pnlpal.shareOnPnlpal(tab.title, tab.url);
  }
  if (info.menuItemId === "open-ytb-video-on-captionz") {
    pnlpal.openYtbOnCaptionz(info.linkUrl);
  }
});
