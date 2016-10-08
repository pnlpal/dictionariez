dictApp = angular.module('fairyDictApp', ['ngRoute', 'ui.bootstrap', 'ngSanitize'])

dictApp.controller 'dictCtrl', ($scope, $sce) ->
    console.log "[dictCtrl] init"
    $scope.initial = true
    $scope.querying = false
    $scope.queryResult = null
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
        $scope.query()

    $scope.query = ()->
        if not $scope.word or not $scope.currentDictionary
            return

        console.log "[dictCtrl] query `#{$scope.word}` from #{$scope.currentDictionary.dictName}"
        $scope.initial = false
        $scope.querying = true
        queryId = Date.now()

        chrome.runtime.sendMessage({
            type: 'query',
            text: $scope.word,
            dictionary: $scope.currentDictionary.dictName,
            queryId: queryId
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

        $scope.$apply()

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
        if evt.ctrlKey && evt.keyCode == 37
            $scope.changeDict('prev')

        if evt.ctrlKey && evt.keyCode == 39
            $scope.changeDict('next')

    return

