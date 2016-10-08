helperFn = (window, $)->
    gConfig = window.gConfig

    window.helper = {
        getRandomInt: (min, max)->
            min ?= 1
            max ?= 10
            min = Math.ceil(min)
            max = Math.floor(max)
            return Math.floor(Math.random() * (max - min)) + min

        sendMessage: (config)->
            dfd = $.Deferred()
            chrome.runtime.sendMessage(config, (response)->
                dfd.resolve(response)
            )
            return dfd

        getJson: (url, data)->
            return this.sendMessage({url, data, type: 'getJson'})

        postJson: (url, data)->
            return this.sendMessage({url, data, type: 'postJson'})

    }

helperFn(this, $)
