var dictWindowManager = {};
dictWindowManager.dictIsReady = false;
dictWindowManager.defaultWidth = 640;
dictWindowManager.defaultHeight = 700;
dictWindowManager.getWindow = function(){
    if(dictWindowManager.dictWindow){
        return dictWindowManager.dictWindow;
    }
};
dictWindowManager.open = function(){
    var win = dictWindowManager.getWindow();
    if(!win){
        var left = (screen.width / 2) - (dictWindowManager.defaultWidth / 2);
        var top = (screen.height / 2) - (dictWindowManager.defaultHeight / 2);

        chrome.windows.create({
            url: chrome.extension.getURL('minidict.html'),
            type: 'popup',
            width: dictWindowManager.defaultWidth,
            height: dictWindowManager.defaultHeight,
            left: left,
            top: top
        }, function(win){
            dictWindowManager.dictWindow = win;
        });
    } else {
        chrome.windows.update(win.id, {focused: true});
    }
};