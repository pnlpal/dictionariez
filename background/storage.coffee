define ["jquery",
    "utils"], ($, utils)->

    storage = {
        maxLength: 200,
        history: [],
        init: ()->
            dfd = $.Deferred()
            chrome.storage.sync.get 'historyRating', (data)=>
                @history = data.historyRating or []
                dfd.resolve(data)
            return dfd

        isInHistory: (word)->
            return @history.find (item)->
                return item[word]?

        addRating: (word, rating)->
            item = @isInHistory(word)
            if item and rating?
                item[word] = rating
                chrome.storage.sync.set({historyRating: @history})

        addHistory: (word)->
            if not @isInHistory(word)
                if @history.length >= @maxLength
                    @history.shift()
                item = {}
                item[word] = 0
                @history.push(item)
                chrome.storage.sync.set({historyRating: @history})

    }

    return storage
