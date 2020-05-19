export default {
    getRandomInt: (min, max)->
        min ?= 1
        max ?= 10
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min)) + min

    postJson: (url, data) ->
        return $.ajax {
            type: 'POST',
            url: url,
            data: JSON.stringify(data),
            contentType: 'application/json'
        }
    getJson: (url, data) ->
        return $.ajax {
            type: 'GET',
            url: url,
            data: data,
            contentType: 'application/json'
        }

    tryGet: (url, obj, message, times, timeout)->
        me = this
        dfd = $.Deferred()
        params = {url}
        params = $.extend params, obj if obj
        times = 3 unless times?
        timeout = 3*1000 unless timeout?
        t = 0
        _get = ()->
            t += 1
            $.ajax(params).then ((res)->
                dfd.resolve(res)
                ), (jqXHR, textStatus)->
                    msg = "ajax failed (#{t}/#{times})"
                    if t < times
                        console.warn msg, params, jqXHR
                        setTimeout _get, timeout
                    else
                        console.error msg, params, jqXHR
                        me.postJson(gConfig.logUrl, {message: message or msg, description: {params, jqXHR}}).always (res)->
                            dfd.reject(res)

        _get()
        return dfd

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

    send: (type, data = {}, callback) ->
        if typeof data == 'function'
            callback = data
            data = {}

        p = new Promise (resolve) ->
            data.type = type
            chrome.runtime.sendMessage data, resolve

        if callback
            return p.then callback
        return p

    sendToDict: (action, callback) ->
        return @send 'sendToDict', { action }, callback

    hasJapanese: (str) ->
        REGEX_JAPANESE = /[\u3000-\u303f]|[\u3040-\u309f]|[\u30a0-\u30ff]|[\uff00-\uff9f]|[\u4e00-\u9faf]|[\u3400-\u4dbf]/
        REGEX_JAPANESE.test(str)

    hasChinese: (str) ->
        REGEX_CHINESE = /[\u4e00-\u9fff]|[\u3400-\u4dbf]|[\u{20000}-\u{2a6df}]|[\u{2a700}-\u{2b73f}]|[\u{2b740}-\u{2b81f}]|[\u{2b820}-\u{2ceaf}]|[\uf900-\ufaff]|[\u3300-\u33ff]|[\ufe30-\ufe4f]|[\uf900-\ufaff]|[\u{2f800}-\u{2fa1f}]/u
        REGEX_CHINESE.test(str)

    hasEnglish: (str) ->
        /\w/.test(str)

    hasNonWord: (str) ->
        REGEX_JAPANESE = /[\u3000-\u303f]|[\u3040-\u309f]|[\u30a0-\u30ff]|[\uff00-\uff9f]|[\u4e00-\u9faf]|[\u3400-\u4dbf]/g
        REGEX_CHINESE = /[\u4e00-\u9fff]|[\u3400-\u4dbf]|[\u{20000}-\u{2a6df}]|[\u{2a700}-\u{2b73f}]|[\u{2b740}-\u{2b81f}]|[\u{2b820}-\u{2ceaf}]|[\uf900-\ufaff]|[\u3300-\u33ff]|[\ufe30-\ufe4f]|[\uf900-\ufaff]|[\u{2f800}-\u{2fa1f}]/ug
        REGEX_ENG = /[\w'.-\s]/g

        str = str.replace(REGEX_JAPANESE, '')
        str = str.replace(REGEX_CHINESE, '')
        str = str.replace(REGEX_ENG, '')

        /\W/.test(str)

    hasOnlyEnglish: (str)->
        REGEX_ENG = /[\w'.-\s]/g
        return str.replace(REGEX_ENG, '') == ''
}
