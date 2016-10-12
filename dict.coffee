dictApp = angular.module('fairyDictApp', ['ngRoute', 'ui.bootstrap', 'ngSanitize'])
dictApp.run ($rootScope)->
    $rootScope._ = _

dictApp.controller 'dictCtrl', ($scope, $sce) ->
    console.log "[dictCtrl] init"
    $scope.initial = true
    $scope.querying = false
    $scope.queryResult = null
    $scope.historyIndex = -1
    queryId = null

    chrome.runtime.sendMessage {
        type: 'dictionary'
    }, ({dictionary, allDicts})->
        console.log "[dict] all dicts: ", allDicts
        $scope.allDicts = allDicts
        $scope.currentDictionary = allDicts.find (d)->
            d.dictName == dictionary
        $scope.currentDictionary ?= allDicts[0]
        $scope.$apply()

    chrome.runtime.sendMessage {
        type: 'setting'
    }, (setting)->
        $scope.setting = setting

    chrome.runtime.sendMessage {
        type: 'getHistory'
    }, (history)->
        $scope.history = history.reverse()
        $scope.lastHistoryWord = $scope.history[0]
        $scope.$apply()

    $scope.changeDict = (dict)->
        ci = $scope.allDicts.findIndex (d)->
            d.dictName == $scope.currentDictionary.dictName

        if dict == 'next'
            idx = (ci+1) % $scope.allDicts.length
            $scope.currentDictionary = $scope.allDicts[idx]
        else if dict == 'prev'
            idx = if ci > 0 then ci-1 else ($scope.allDicts.length-1)
            $scope.currentDictionary = $scope.allDicts[idx]
        else
            $scope.currentDictionary = dict
        $scope.query(true)

    $scope.selectHistory = (index)->
        if index == $scope.historyIndex
            return
        if index == 'prev'
            if $scope.historyIndex == $scope.history.length-1
                return
            index = $scope.historyIndex + 1
        else if index == 'next'
            if $scope.historyIndex < 0
                return
            index = $scope.historyIndex - 1

        if index >= $scope.history.length
            index = 0

        $scope.historyIndex = index
        if index > -1
            $scope.word = _.keys($scope.history[index])[0]
        else
            $scope.word = $scope.lastQueryWord

        if index == $scope.history.length-1
            $scope.lastHistoryWord = $scope.history[0]
        else
            $scope.lastHistoryWord = $scope.history[index+1]

        $scope.query(true)

    $scope.deleteHistory = (index)->
        item = $scope.history.splice(index, 1)
        chrome.runtime.sendMessage({
            type: 'deleteHistory',
            index: index,
            text: _.keys(item[0])[0]
        })
        return false

    $scope.query = (inHistory)->
        if not $scope.word or not $scope.currentDictionary
            $scope.initial = true
            return

        console.log "[dictCtrl] query `#{$scope.word}` from #{$scope.currentDictionary.dictName}"
        $scope.initial = false
        $scope.querying = true
        queryId = Date.now()

        chrome.runtime.sendMessage({
            type: 'query',
            text: $scope.word,
            dictionary: $scope.currentDictionary.dictName,
            queryId: queryId,
            inHistory: inHistory
        })

    chrome.runtime.onMessage?.addListener (request, sender, sendResponse)->
        if request.type == 'querying'
            $scope.initial = false
            $scope.querying = true
            $scope.queryResult = null
            $scope.word = request.text
            queryId = request.queryId

        else if request.type == 'queryResult'
            if queryId == request.queryId
                $scope.querying = false
                $scope.queryResult = $sce.trustAsHtml(request.result)
                $scope.rating = request.rating
                updateRating(request.rating)
                if not request.inHistory
                    $scope.lastQueryWord = $scope.word

        else if request.type == 'history'
            console.log "history", request.history
            $scope.history = request.history.reverse()
            $scope.lastHistoryWord = $scope.history[0]
            $scope.historyIndex = -1

        $scope.$apply()

    $('#stars').on 'starrr:change', (e, value)->
        if $scope.word
            value ?= 0
            console.log "[dictCtrl] rating word: #{$scope.word} #{value}"
            chrome.runtime.sendMessage {
                type: 'rating',
                value: value,
                text: $scope.word
            }
            if $scope.historyIndex >= 0
                item = $scope.history[$scope.historyIndex]
                if item and item[$scope.word]?
                    item[$scope.word] = value

    $('.starrr').starrr({numStars: 3})

    updateRating = (value)->
        obj = $(".starrr").data('star-rating')
        obj.options.rating = value
        obj.syncRating()

    _handler = (evt)->
        node = $(event.target)
        if node.is('.sound')
            a = node.next('audio')
            if a.length
                a[0].play()

    $(document).mouseover _handler
    $(document).click _handler

    $(document).keyup (evt)->
        code = evt.charCode or evt.keyCode
        if code == 27
            $('input.dict_input')[0].select()

    $(document).keydown (evt)->
        code = evt.charCode or evt.keyCode
        prevSK = $scope.setting.prevDictSK1
        nextSK = $scope.setting.nextDictSK1
        prevKey = $scope.setting.prevDictKey
        nextKey = $scope.setting.nextDictKey

        if window.utils.checkEventKey evt, prevSK, null, prevKey
            $scope.changeDict('prev')

        if window.utils.checkEventKey evt, nextSK, null, nextKey
            $scope.changeDict('next')

        if window.utils.checkEventKey evt, $scope.setting.prevHistorySK1, null, $scope.setting.prevHistoryKey
            $scope.selectHistory('prev')

        if window.utils.checkEventKey evt, $scope.setting.nextHistorySK1, null, $scope.setting.nextHistoryKey
            $scope.selectHistory('next')

    return

