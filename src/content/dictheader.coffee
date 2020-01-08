import $ from 'jquery'
import angular from 'angular'
import utils from "utils"

# import '../needsharebutton.min.js'

import('bootstrap/dist/css/bootstrap.min.css')
import('../vendor/font-awesome.css')
import('./dictheader.less')

dictApp = angular.module('fairyDictApp', [])

dictApp.controller 'dictCtrl', ['$scope', ($scope) ->
    console.log "[dictCtrl] init"

    # change Bing dictionary's title
    document.title = 'Fairy Dict'
    baseNode = '#fairy-dict'
    $scope.initial = true
    $scope.inFrame = window.self != window.top
    $scope.querying = false
    $scope.previous = null

    chrome.runtime.sendMessage {
        type: 'dictionary',
        # origin: window.top?.location?.origin,
        # url: window.top?.location?.href
    }, ({currentDictName, nextDictName, previousDictName, allDicts, previous, w, r})->
        $scope.allDicts = allDicts
        $scope.currentDictName = currentDictName
        $scope.nextDictName = nextDictName
        $scope.previousDictName = previousDictName
        $scope.previous = previous
        $scope.word = w
        $scope.$apply()

        await import('../starrr.js')
        $('.starrr', baseNode).starrr({numStars: 3, rating: r})

    chrome.runtime.sendMessage {
        type: 'setting'
    }, (setting)->
        $scope.setting = setting

    $scope.openOptions = (to) ->
        utils.send 'open options', { to }

    $scope.queryPreviousWord = ()->
        $scope.word = $scope.previous.w
        $scope.query()

    $scope.query = ({ nextDict, previousDict, nextWord, previousWord } = {}) ->
        # if not $scope.word
        #     $scope.initial = true
        #     return

        $scope.initial = false
        $scope.querying = true

        chrome.runtime.sendMessage({
            type: 'query',
            w: $scope.word,
            dictName: $scope.currentDictName,
            nextDict,
            previousDict,
            nextWord,
            previousWord,
        }, (data) ->
            if data?.windowUrl
                window.top.location.href = data.windowUrl
            else
                # current dict might be changed
                window.location.reload()
        )

    chrome.runtime.onMessage?.addListener (request, sender, sendResponse)->
        # console.log(request)
        if request.type == 'querying'
            $scope.initial = false
            $scope.querying = true
            $scope.word = request.text

        if request.type == 'sendToDict'
            if request.action == 'keypress focus'
                $('input.dict-input', baseNode)[0].select()

            if request.action == 'keypress history prev'
                $scope.query({ previousWord: true })
            if request.action == 'keypress history next'
                $scope.query({ nextWord: true })
            if request.action == 'keypress dict prev'
                $scope.query({ previousDict: true })
            if request.action == 'keypress dict next'
                $scope.query({ nextDict: true })

        $scope.$apply()

    $('#fairy-stars', baseNode).on 'starrr:change', (e, value)->
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
            $('input.dict-input', baseNode)[0].select()

    $(document).keydown (evt)->
        code = evt.charCode or evt.keyCode
        prevSK = $scope.setting.prevDictSK1
        nextSK = $scope.setting.nextDictSK1
        prevKey = $scope.setting.prevDictKey
        nextKey = $scope.setting.nextDictKey
        stop = false

        if utils.checkEventKey evt, prevSK, null, prevKey
            $scope.query({ previousDict: true })
            stop = true
        if utils.checkEventKey evt, nextSK, null, nextKey
            $scope.query({ nextDict: true })
            stop = true
        if utils.checkEventKey evt, $scope.setting.prevHistorySK1, null, $scope.setting.prevHistoryKey
            $scope.query({ previousWord: true })
            stop = true
        if utils.checkEventKey evt, $scope.setting.nextHistorySK1, null, $scope.setting.nextHistoryKey
            $scope.query({ nextWord: true })
            stop = true
        if stop
            evt.preventDefault()
            evt.stopPropagation()
            $scope.$apply()

    return
]

import('../header.html').then ({ default: headerDom }) ->
    $(document.body).append(headerDom)
    angular.bootstrap(document.getElementById('fairy-dict'), ['fairyDictApp'])

    { default: debounce } = await import('lodash/debounce')
    $(window).on 'resize', debounce ((evt) ->
        utils.send 'window resize'
    ), 300