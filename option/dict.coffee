dictApp = angular.module('fairyDictApp', ['ngRoute', 'ui.bootstrap', 'ngSanitize'])

dictApp.controller 'dictCtrl', ($scope) ->
    console.log "[dictCtrl] init"
    $scope.initial = true
    $scope.querying = false
    $scope.queryResult = null

    $scope.query = ()->
        console.log "[dictCtrl] query `#{$scope.word}` from #{$scope.dictionary}"
        $scope.initial = false
        $scope.querying = true

        chrome.runtime.sendMessage({
            type: 'query',
            text: $scope.word,
            dictionary: $scope.dictionary
        })

    chrome.runtime.onMessage?.addListener (request, sender, sendResponse)->
        if request.type == 'querying'
            $scope.initial = false
            $scope.querying = true

        else if request.type == 'queryResult'
            $scope.querying = false
            $scope.queryResult = request.data


    return

