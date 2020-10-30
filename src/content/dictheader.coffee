import $ from 'jquery'
import angular from 'angular'
import utils from "utils"
import debounce from 'lodash/debounce'

# import '../needsharebutton.min.js'
import 'angular-ui-bootstrap'

import('bootstrap/dist/css/bootstrap.min.css')
import('../vendor/font-awesome.css')
import('./dictheader.less')

# some ui need bootstrap, like dropdown.
dictApp = angular.module('fairyDictApp', ['ui.bootstrap'])

dictApp.controller 'dictCtrl', ['$scope', ($scope) ->
    console.log "[dictCtrl] init"

    # change Bing dictionary's title
    document.title = 'Fairy Dict'
    baseNode = '#fairy-dict'
    $scope.initial = true
    $scope.inFrame = window.self != window.top
    $scope.querying = false
    $scope.previous = null

    if not $scope.inFrame
        import(### webpackChunkName: "github-badge"  ###'../vendor/github-badge.js')
        import(### webpackChunkName: "needsharebutton-js"  ###'../vendor/needsharebutton.min.js')
        import(### webpackChunkName: "needsharebutton-css"  ###'../vendor/needsharebutton.min.css')

    initDict = () ->
        chrome.runtime.sendMessage {
            type: 'dictionary',
            # origin: window.top?.location?.origin,
            # url: window.top?.location?.href
        }, ({currentDictName, nextDictName, previousDictName, allDicts, previous, history, w, r})->
            $scope.manageDicts = allDicts.reduce(((prev, next) -> 
                if prev.length < 8 and not next.disabled  # only shows at most 8 items in the list.
                    prev.push(next)
                return prev
            ), [])
            $scope.currentDictName = currentDictName
            $scope.nextDictName = nextDictName
            $scope.previousDictName = previousDictName
            $scope.previous = previous
            $scope.word = w
            $scope.history = history.reverse()
            $scope.$apply()

            if !$scope.setting?.disableWordHistory
                await import('../starrr.js')
                if $('.starrr', baseNode).data("star-rating")
                    $('.starrr', baseNode).data("star-rating").setRating(r)
                else
                    $('.starrr', baseNode).starrr({numStars: 3, rating: r})

    initDict()
    chrome.runtime.sendMessage {
        type: 'setting'
    }, (setting)->
        $scope.setting = setting
        $scope.$apply()

    $scope.openOptions = (to) ->
        utils.send 'open options', { to }
    
    $scope.deleteHistory = (item, i) ->
        await utils.send 'remove history', item
        {history} = await utils.send 'dictionary history', { word: $scope.word }
        $scope.history = history.reverse()
        $scope.$apply()

    $scope.query = ({ nextDict, previousDict, nextWord, previousWord, dictName, w, newDictWindow } = {}) ->
        # if not $scope.word
        #     $scope.initial = true
        #     return

        $scope.initial = false
        $scope.querying = true
        $scope.word = w if w

        chrome.runtime.sendMessage({
            type: 'query',
            w: $scope.word,
            dictName: dictName or $scope.currentDictName,
            nextDict,
            previousDict,
            nextWord,
            previousWord,
            newDictWindow 
        }, (data) ->
            if data?.windowUrl
                window.top.location.href = data.windowUrl

                # some website may not reload window, like naver dict.
                setTimeout (() ->
                    $scope.querying = false
                    initDict()
                ), 2000
                
            else
                # current dict might be changed
                $scope.querying = false
                initDict()
        )

    $scope.toggleDropdown = (open) ->
        if $scope.inFrame
            window.top.postMessage { type: 'toggleDropdown', open }, '*'

    $scope.autocomplete = debounce (() ->
        text = $scope.word.trim()
        if text
            $scope.autocompletes = await utils.send 'autocomplete', { text }
        else
            $scope.autocompletes = []
        $scope.hasAutocompletes = $scope.autocompletes.length > 0
        $scope.$apply()
        $scope.toggleDropdown($scope.hasAutocompletes)

        # get phonetic of word in autocompletes
        $scope.autocompleteCounter ?= 0
        $scope.autocompleteCounter += 1
        $dropdown = $('.search-wrapper[uib-dropdown]')

        _counter = $scope.autocompleteCounter
        for item in $scope.autocompletes or []
            if _counter == $scope.autocompleteCounter and item.w.match(/\w+/g)[0] == item.w and $dropdown.hasClass('open')
                { ame } = await utils.send 'look up phonetic', { w: item.w, _counter }
                item.ame = ame
                $scope.$apply()
                # console.log "[#{_counter}]", item.w, ame 
                await utils.promisifiedTimeout 300

    ), 500

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

    $(baseNode).on 'starrr:change', (e, value)->
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

    $(window).on 'resize', debounce ((evt) ->
        utils.send 'window resize'
    ), 300