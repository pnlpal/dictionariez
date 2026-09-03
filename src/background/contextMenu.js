import dw from "./dictwindow.js";
import readClipboard from "./clipboard.js";
import setting from "./setting.js";

export default {
    dictModule: null, // Will be set after dict is initialized to avoid circular dependency

    handler: (info, tab) => {
        const word = info.selectionText?.trim();
        let dictName = null;

        // Check if it's a dictionary submenu item (format: "dict-<dictName>")
        if (info.menuItemId?.startsWith("dict-")) {
            const extracted = info.menuItemId.substring(5); // Remove "dict-" prefix
            // Keep dictName as null for "default", otherwise use the extracted dict name
            if (extracted !== "default") {
                dictName = extracted;
            }
        } else if (info.menuItemId !== "lookup") {
            return;
        }

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
                        dictName: dictName, // Pass dictionary name if selected from submenu
                    });
            },
        );
    },
    createLookupItem: () => {
        chrome.contextMenus.create({
            id: "lookup",
            title: `Look up '%s' in ${process.env.PRODUCT}`,
            contexts: ["selection"],
        });
    },
    removeLookupItem: () => {
        chrome.contextMenus.remove("lookup");
    },
    createMultiDictMenu(allDicts) {
        // Create lookup item as a parent menu with dictionaries as children
        chrome.contextMenus.create({
            id: "lookup",
            title: `Look up '%s' in ${process.env.PRODUCT}...`,
            contexts: ["selection"],
        });

        // Add default dictionary option
        chrome.contextMenus.create({
            id: "dict-default",
            parentId: "lookup",
            title: "Default",
            contexts: ["selection"],
        });

        // Create submenu items for each dictionary
        allDicts.forEach((dict) => {
            chrome.contextMenus.create({
                id: `dict-${dict.dictName}`,
                parentId: "lookup",
                title: dict.dictName,
                contexts: ["selection"],
            });
        });
    },
    removeMultiDictMenu() {
        chrome.contextMenus.remove("lookup");
    },

    rebuildContextMenu(allDicts = null) {
        const disableContextMenu = setting.getValue("disableContextMenu", false);
        const enableMultiDictContextMenu = setting.getValue("enableMultiDictContextMenu", false);

        chrome.contextMenus.removeAll(() => {
            if (!disableContextMenu) {
                if (enableMultiDictContextMenu) {
                    // Create multi-dict hierarchical menu
                    const dicts = allDicts || (this.dictModule ? this.dictModule.allDicts : []);
                    if (dicts && dicts.length > 0) {
                        this.createMultiDictMenu(dicts);
                    }
                } else {
                    // Create simple lookup item
                    this.createLookupItem();
                }
            }
        });
    },
};
