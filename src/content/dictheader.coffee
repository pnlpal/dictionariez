import $ from 'jquery'
import angular from 'angular'
import utils from "utils"
import debounce from 'lodash/debounce'

# import '../needsharebutton.min.js'
import 'angular-ui-bootstrap'

import('bootstrap/dist/css/bootstrap.min.css')
import('../vendor/font-awesome.css')
import('./dictheader.less')

import('./card-iframe.coffee')

inFrame = window.self != window.top
# some ui need bootstrap, like dropdown.
dictApp = angular.module('fairyDictApp', ['ui.bootstrap'])

dictApp.controller 'dictCtrl', ['$scope', ($scope) ->
    # change Bing dictionary's title
    document.title = 'Dictionariez'
    baseNode = '#fairy-dict'
    $scope.initial = true
    $scope.inFrame = inFrame
    $scope.querying = false
    $scope.previous = null

    $scope.version = chrome.runtime.getManifest().version

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
            $scope.allDicts = allDicts
            $scope.currentDictName = currentDictName
            $scope.nextDictName = nextDictName
            $scope.previousDictName = previousDictName
            $scope.previous = previous
            $scope.word = w
            $scope._lastQueryWord = $scope.word
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

    $scope.query = ({ nextDict, previousDict, dictNumber, nextWord, previousWord, queryText, dictName, w, newDictWindow } = {}) ->
        # if not $scope.word
        #     $scope.initial = true
        #     return

        $scope.initial = false
        $scope.querying = true

        $scope.word = w if w
    
        if dictName and queryText?
            $scope.word = queryText || $scope._lastQueryWord

        chrome.runtime.sendMessage({
            type: 'query',
            w: $scope.word,
            dictName: dictName or $scope.currentDictName,
            nextDict,
            previousDict,
            dictNumber,
            nextWord,
            previousWord,
            newDictWindow 
        }, (data) ->
            $scope.querying = false
            if data.noUpdate
                # current dict might be changed
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
        $scope.$apply()
        $scope.toggleDropdown($scope.autocompletes.length > 0)

        # get phonetic of word in autocompletes
        $scope.autocompleteCounter ?= 0
        $scope.autocompleteCounter += 1
        $dropdown = $('.search-wrapper[uib-dropdown]')

        _counter = $scope.autocompleteCounter
        for item in $scope.autocompletes or []
            if item.w and _counter == $scope.autocompleteCounter and item.w.match(/\w+/g)[0] == item.w and $dropdown.hasClass('open')
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
            setTimeout (() -> 
                $scope.querying = false
                $scope.$apply()
            ), 2000

        if request.type == 'sendToDict'
            if request.action == 'keypress focus'
                $('input.dict-input', baseNode)[0].select()

        $scope.$apply()

    $(baseNode).on 'starrr:change', (e, value)->
        if $scope.word
            value ?= 0
            # console.log "[dictCtrl] rating word: #{$scope.word} #{value}"
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

    $(document).on 'touchend focus', 'input.dict-input', () ->
        this.select() 

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
        if (evt.ctrlKey or evt.metaKey) and evt.key.match(/\d/)
            $scope.query({ dictNumber: parseInt(event.key.match(/\d/)[0]) })
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