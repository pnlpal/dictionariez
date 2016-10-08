window.utils = {
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
        if sk1 and not event[sk1.toLowerCase() + 'Key']
            return false
        if sk2 and not event[sk2.toLowerCase() + 'Key']
            return false
        if @extraKeyMap[key]
            if event.keyCode != @extraKeyMap[key]
                return false

        else if event.keyCode != key.charCodeAt(0)
            return false

        return true
}
