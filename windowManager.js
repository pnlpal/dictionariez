var dictWindowManager = {};
dictWindowManager.dictIsReady = false;
dictWindowManager.defaultWidth = 620;
dictWindowManager.defaultHeight = 700;
dictWindowManager.sendMessage = function(type, data) {
    if (dictWindowManager.dictWindow && dictWindowManager.dictIsReady) {
        data = data || {};
        var tid = dictWindowManager.dictWindow.tabs[0].id;
        var obj = $.extend(true, {type: type}, data);
        chrome.tabs.sendMessage(tid, obj);
        return true;
    } else
        return false;
};
dictWindowManager.open = function() {
    if (!dictWindowManager.dictWindow) {
        var left = (screen.width / 2) - (dictWindowManager.defaultWidth / 2);
        var top = (screen.height / 2) - (dictWindowManager.defaultHeight / 2);

        chrome.windows.create({
            url: chrome.extension.getURL('minidict.html'),
            type: 'popup',
            width: dictWindowManager.defaultWidth,
            height: dictWindowManager.defaultHeight,
            left: left,
            top: top
        }, function(win) {
            dictWindowManager.dictWindow = win;
        });
    } else {
        chrome.windows.update(dictWindowManager.dictWindow.id, {
            focused: true
        });
    }
};