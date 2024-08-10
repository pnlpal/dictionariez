export default {
    getRandomInt: (min, max)->
        min ?= 1
        max ?= 10
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min)) + min

    extraKeyMap: {
        Enter: 13,
        Space: 32,
        Tab: 9,
        End: 35,
        Home: 36,
        PageDown: 34,
        PageUp: 33,
        ArrowDown: 40,
        ArrowLeft: 37,
        ArrowRight: 39,
        ArrowUp: 38,
        Escape: 27,
    }
    checkEventKey: (event, sk1, sk2, key)->
        if key == 'Disabled'
            return false
        if sk1 and not event[sk1.toLowerCase() + 'Key']
            return false
        if sk2 and not event[sk2.toLowerCase() + 'Key']
            return false
        if @extraKeyMap[key]
            if event.keyCode != @extraKeyMap[key]
                return false

        else if key and event.keyCode != key.charCodeAt(0)
            return false

        return true

    promisify: (cb) ->
        new Promise (resolve) ->
            cb resolve
    
    promisifiedTimeout: (t) ->
        new Promise (resolve) ->
            setTimeout resolve, t
    
    checkInTime: (func, t=5000) ->
        timeIsUp = false 
        @promisifiedTimeout(t).then ()->
            timeIsUp = true 

        _check = () =>
            new Promise (resolve, reject) =>
                await @promisifiedTimeout(200)
                if func()
                    resolve()
                else if timeIsUp
                    reject() 
                else 
                    return _check().then(resolve, reject)
        
        return await _check()
    
    promiseInTime: (promise, t=3000) ->
        new Promise (resolve, reject) =>
            timer = setTimeout (()->
                reject(new Error('timeout'))), t

            promise.then((value) =>
                clearTimeout(timer)
                resolve(value)
            ).catch((reason) =>
                clearTimeout(timer)
                reject(reason)
            )
            
    send: (type, data = {}, callback) ->
        if typeof data == 'function'
            callback = data
            data = {}

        p = new Promise (resolve, reject) ->
            data.type = type
            chrome.runtime.sendMessage data, (ret) ->
                if ret?.error
                    reject (if typeof ret.error == 'string' then new Error(ret.error) else ret.error)
                else 
                    resolve ret

        if callback
            return p.then callback
        return p

    sendToDict: (action, data={}, callback) ->
        if typeof data == 'function'
            callback = data
            data = {}
        data.action = action
        
        return @send 'sendToDict', data, callback

    sendToTab: (tabId, data={}, callback = null) ->
        if typeof data == 'function'
            callback = data
            data = {}
        else if typeof data == 'string'
            data = { type: data }
        
        p = new Promise (resolve, reject) ->
            chrome.tabs.sendMessage tabId, data, (ret) ->
                if ret?.error
                    reject (if typeof ret.error == 'string' then new Error(ret.error) else ret.error)
                else 
                    resolve ret
        if callback
            return p.then callback
        return p

    listenToBackground: (type, callback) ->
        if window.self == window.top
            if (!window.dictionariezBackgroundListeners)
                window.dictionariezBackgroundListeners = {}
                window.dictionariezBackgroundListeners[type] = callback

                chrome.runtime.onMessage.addListener (request, sender, sendResponse) ->
                    window.dictionariezBackgroundListeners[request.type]?(request, sender, sendResponse)

            else 
                window.dictionariezBackgroundListeners[type] = callback

    hasJapanese: (str) ->
        REGEX_JAPANESE = /[\u3000-\u303f]|[\u3040-\u309f]|[\u30a0-\u30ff]|[\uff00-\uff9f]|[\u4e00-\u9faf]|[\u3400-\u4dbf]/
        REGEX_JAPANESE.test(str)
    isJapanese: (str) ->
        jregex = /[\u3000-\u303f]|[\u3040-\u309f]|[\u30a0-\u30ff]|[\uff00-\uff9f]|[\u4e00-\u9faf]|[\u3400-\u4dbf]/g
        str.match(jregex)?.length == str.length

    hasChinese: (str) ->
        REGEX_CHINESE = /[\u4e00-\u9fff]|[\u3400-\u4dbf]|[\u{20000}-\u{2a6df}]|[\u{2a700}-\u{2b73f}]|[\u{2b740}-\u{2b81f}]|[\u{2b820}-\u{2ceaf}]|[\uf900-\ufaff]|[\u3300-\u33ff]|[\ufe30-\ufe4f]|[\uf900-\ufaff]|[\u{2f800}-\u{2fa1f}]/u
        REGEX_CHINESE.test(str)
    isChinese: (str) ->
        cregex = /[\u4e00-\u9fff]|[\u3400-\u4dbf]|[\u{20000}-\u{2a6df}]|[\u{2a700}-\u{2b73f}]|[\u{2b740}-\u{2b81f}]|[\u{2b820}-\u{2ceaf}]|[\uf900-\ufaff]|[\u3300-\u33ff]|[\ufe30-\ufe4f]|[\uf900-\ufaff]|[\u{2f800}-\u{2fa1f}]/ug
        str.match(cregex)?.length == str.length
    hasKorean: (str) ->
        REGEX_KOREAN = /\p{sc=Hangul}/u
        REGEX_KOREAN.test(str)
    
    isSentence: (str = "") ->
        if @hasChinese(str) or @hasJapanese(str) or @hasKorean(str)
            return str.length > 4
        else 
            str.split(/\s/).length > 3

    hasEnglish: (str) ->
        /\w/.test(str)

    isEnglish: (str)->
        # match: I'll  don't  Mr.Jackson
        REGEX_ENG = /[a-zA-Z\s-]+[’'.]?[a-zA-Z\s-]+/
        return str.match(REGEX_ENG)?[0] == str

    hasKorean: (str)->
        REGEX_KOR = /[\uac00-\ud7af]|[\u1100-\u11ff]|[\u3130-\u318f]|[\ua960-\ua97f]|[\ud7b0-\ud7ff]/g
        REGEX_KOR.test(str)

    isLinux: () -> 
        return navigator.platform.includes('Linux')
    
    isMac: () -> 
        return navigator.platform.includes('Mac')

    sanitizeHTML: (s)->
        s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')

    imageToDataUrl: (src) ->
        new Promise (resolve, reject) -> 
            if src.startsWith('data:')
                resolve src 
            else 
                fetch(src)
                    .then (response) ->
                        response.blob()
                    .then (blob) ->
                        reader = new FileReader()
                        reader.onloadend = () ->
                            resolve reader.result
                        reader.onerror = reject
                        reader.readAsDataURL blob

    imageSize: (src) -> 
        new Promise (resolve) ->
            img = new Image()
            img.onload = () ->
                resolve {width: this.width, height: this.height}
            
            img.src = src

    toUpperFirst: (text)->
        text[0].toUpperCase() + text.slice(1)
    
    isMobile: () -> /Mobi|Android/i.test(navigator.userAgent)

    getBrowserName: () ->
        if navigator.userAgent.toLowerCase().indexOf('firefox') > -1
            return 'Firefox'
        if navigator.userAgent.toLowerCase().indexOf('edg') > -1
            return 'Edge'
        if navigator.userAgent.toLowerCase().indexOf('chromium') > -1
            return 'Chromium'
        if navigator.userAgent.toLowerCase().indexOf('safari') > -1 && navigator.userAgent.toLowerCase().indexOf('chrome') == -1
            return 'Safari'
        if navigator.userAgent.toLowerCase().indexOf('opera') > -1
            return 'Opera'
        if navigator.userAgent.toLowerCase().indexOf('chrome') > -1
            return 'Chrome'
        
        return 'Unkown Browser'

    loadHTML: (url, credentials='omit') ->
        @promiseInTime(fetch(url, {
            method: 'GET', 
            credentials,
        }), 5000)
        .then((resp) -> 
            if not resp.ok
                err = new Error(resp.statusText) 
                err.status = resp.status
                throw err

            return resp.text()
        )

    loadJson: (url, credentials) ->
        @promiseInTime(fetch(url, {
            method: 'GET', 
            credentials
        }), 5000)
        .then((resp) -> 
            if not resp.ok
                err = new Error(resp.statusText) 
                err.status = resp.status
                throw err

            return resp.json()
        )
}
