export default {
        setBrowserIcon: (enable)->
            title = 'Dictionaries: 已打开鼠标取词功能'
            # imgPath = 'images/books-96.png'
            if !enable
                title = 'Dictionaries: 已关闭鼠标取词功能'
                # imgPath = 'images/books-96.png'

            chrome.browserAction.setTitle({
                title: title
            })
            # chrome.browserAction.setIcon({
            #     path: imgPath
            # })
    }
