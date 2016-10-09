define ["jquery",
    "utils"], ($, utils)->

    storage = {
        maxLength: 100,
        history: [],
        init: ()->
            dfd = $.Deferred()
            chrome.storage.sync.get 'history', (data)=>
                @history = data.history or []
                dfd.resolve(data)
            return dfd

        appendHistory: (word)->
            if @history.length >= @maxLength
                @history.shift()
            @history.push(word)
            chrome.storage.sync.set({history: @history})

    }

    return storage
