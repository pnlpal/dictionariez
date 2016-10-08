utils = {
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
}
