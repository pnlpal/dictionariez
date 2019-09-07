define ["jquery",
    "utils",
    "background/setting"], ($, utils, setting)->
    console.log "[ext] init"

    return {
        setBrowserIcon: (enable)->
            title = '已打开鼠标取词功能'
            imgPath = 'images/fd-40.png'
            if !enable
                title = '已关闭鼠标取词功能'
                imgPath = 'images/fd-40-grey.png'

            chrome.browserAction.setTitle({
                title: title
            })
            chrome.browserAction.setIcon({
                path: imgPath
            })
    }
