dictApp = angular.module('fairyDictApp', ['ui.bootstrap', 'ngSanitize'])
dictApp.run ($rootScope)->
    $rootScope._ = _

loader.loadTemplate().then ()->
    angular.bootstrap(document.getElementById('fairy-dict'), ['fairyDictApp'])

dictApp.controller 'dictCtrl', ($scope, $sce) ->
    console.log "[dictCtrl] init"
    baseNode = '#fairy-dict'
    $scope.initial = true
    $scope.querying = false
    $scope.queryResult = null
    $scope.historyIndex = -1

    chrome.runtime.sendMessage {
        type: 'dictionary'
    }, ({dictionary, allDicts, history})->
        console.log "[dict] all dicts: ", allDicts
        $scope.allDicts = allDicts
        $scope.currentDictionary = allDicts.find (d)->
            d.dictName == dictionary
        $scope.currentDictionary ?= allDicts[0]
        $scope.history = history.reverse()
        $scope.lastHistoryWord = $scope.history[0]
        $scope.$apply()

    chrome.runtime.sendMessage {
        type: 'setting'
    }, (setting)->
        $scope.setting = setting

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

    applyHistory = (index)->
        $scope.historyIndex = index
        if index > -1
            $scope.word = _.keys($scope.history[index])[0]
        else
            $scope.word = $scope.lastQueryWord

        if index == $scope.history.length-1
            $scope.lastHistoryWord = $scope.history[0]
        else
            $scope.lastHistoryWord = $scope.history[index+1]

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

        applyHistory(index)

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

        chrome.runtime.sendMessage({
            type: 'query',
            text: $scope.word,
            dictionary: $scope.currentDictionary.dictName,
            inHistory: inHistory
        })

    chrome.runtime.onMessage?.addListener (request, sender, sendResponse)->
        if request.type == 'querying'
            $scope.initial = false
            $scope.querying = true
            $scope.queryResult = null
            $scope.word = request.text

        else if request.type == 'queryResult'
            console.log "[dictCtrl] got query result for word: #{request.text}"
            if $scope.word == request.text or !$scope.word
                $scope.initial = false
                $scope.word = request.text
                $scope.querying = false
                if request.result?.html?
                    $scope.queryResult = $sce.trustAsHtml(request.result.html)
                $scope.rating = request.rating
                updateRating(request.rating)
                if not request.inHistory
                    $scope.lastQueryWord = $scope.word
                else
                    $scope.history.forEach (item, idx)->
                        itemText = _.keys(item)[0]
                        if itemText == $scope.word
                            applyHistory(idx)

        else if request.type == 'history'
            console.log "history", request.history
            $scope.history = request.history.reverse()
            $scope.lastHistoryWord = $scope.history[0]
            $scope.historyIndex = -1

        $scope.$apply()

    $('#stars', baseNode).on 'starrr:change', (e, value)->
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

    $('.starrr', baseNode).starrr({numStars: 3})

    updateRating = (value)->
        obj = $(".starrr", baseNode).data('star-rating')
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
            $('input.dict_input', baseNode)[0].select()

    $(document).keydown (evt)->
        code = evt.charCode or evt.keyCode
        prevSK = $scope.setting.prevDictSK1
        nextSK = $scope.setting.nextDictSK1
        prevKey = $scope.setting.prevDictKey
        nextKey = $scope.setting.nextDictKey
        stop = false

        if window.utils.checkEventKey evt, prevSK, null, prevKey
            $scope.changeDict('prev')
            stop = true
        if window.utils.checkEventKey evt, nextSK, null, nextKey
            $scope.changeDict('next')
            stop = true
        if window.utils.checkEventKey evt, $scope.setting.prevHistorySK1, null, $scope.setting.prevHistoryKey
            $scope.selectHistory('prev')
            stop = true
        if window.utils.checkEventKey evt, $scope.setting.nextHistorySK1, null, $scope.setting.nextHistoryKey
            $scope.selectHistory('next')
            stop = true
        if stop
            evt.preventDefault()
            evt.stopPropagation()
    return

