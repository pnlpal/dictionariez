define ["jquery",
    "utils"], ($, utils)->

    setting =
        configCache: {
            enableMinidict: true,
            specialKeys: 'ctrl,shift',
            normalKey: 'X',
            dictionary: ''
        }

        init: ()->
            dfd = $.Deferred()
            chrome.storage.sync.get @configCache, (obj)=>
                @configCache = obj
                chrome.storage.sync.set(obj)
                dfd.resolve(obj)

            return dfd

        setValue: (key, value)->
            if @configCache[key] != value
                @configCache[key] = value
                chrome.storage.sync.set(@configCache);
            return value

        getValue: (key, defaultValue)->
            v = @configCache[key]
            v ?= defaultValue
            return v

    return setting
