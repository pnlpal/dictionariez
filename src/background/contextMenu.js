import dw from "./dictwindow.coffee";
import readClipboard from "./clipboard.coffee";

export default {
  handler: (info, tab) => {
    if (info.menuItemId === "lookup") {
      const word = info.selectionText?.trim();
      chrome.tabs.sendMessage(
        tab.id >= 0 ? tab.id : 0, // tab.id is -1 when the context menu is clicked in a local pdf file
        {
          type: "get info before open dict",
        },
        async (res) => {
          if (res?.w && res.isInEditable) dw.refineTextWithAI(res.w);
          else
            dw.lookup({
              ...res,
              w: word || res?.w || (await readClipboard(tab)),
              s: res?.s || info.frameUrl || tab.url,
              sc: res?.sc || tab.title,
            });
        }
      );
    }
  },
  createLookupItem: () => {
    chrome.contextMenus.create({
      id: "lookup",
      title: "Look up '%s' in Dictionariez",
      contexts: ["selection"],
    });
  },
  removeLookupItem: () => {
    chrome.contextMenus.remove("lookup");
  },
};
