import setting from "./setting.coffee";
import storage from "./storage.coffee";
import dict from "./dict.coffee";
import dw from "./dictwindow.coffee";
import "./auto-complete.coffee";
import lookup from "./plain-lookup.coffee";
import speak from "./speak.coffee";
import ankiWindow from "./ankiwindow.coffee";
import pnlpal from "./pnlpal.coffee";

const initPromises = (async function () {
  await setting.init();
  await storage.init();
  await dict.init();
  await dw.init();
  lookup.init();
  speak.init();
  ankiWindow.init();
  pnlpal.init();
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
});

chrome.windows.onRemoved.addListener(async function (wid) {
  await initPromises;
  dw.destroyWin({ wid });
});
chrome.tabs.onRemoved.addListener(async function (tid) {
  await initPromises;
  dw.destroyWin({ tid });
});

chrome.action.onClicked.addListener(async function (tab) {
  await initPromises;
  dw.triggerByActionClicked(tab);
});
