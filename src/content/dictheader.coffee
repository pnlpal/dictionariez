import $ from 'jquery'
import angular from 'angular'
import utils from "utils"
import debounce from 'lodash/debounce'

# import '../needsharebutton.js'
import 'angular-ui-bootstrap'

import('bootstrap/dist/css/bootstrap.min.css')
import('../vendor/font-awesome.css')
import('./dictheader.less')

import('./card-iframe.coffee')

inFrame = window.self != window.top
# some ui need bootstrap, like dropdown.
dictApp = angular.module('fairyDictApp', ['ui.bootstrap'])

dictApp.controller 'dictCtrl', ['$scope', '$sce', ($scope, $sce) ->
    # change Bing dictionary's title
    document.title = process.env.PRODUCT
    baseNode = '#fairy-dict'
    $scope.initial = true
    $scope.inFrame = inFrame
    $scope.querying = false
    $scope.previous = null
    $scope.isSidePal = process.env.PRODUCT == 'SidePal'
    $scope.version = chrome.runtime.getManifest().version
    $scope.asciiTitle = if process.env.PRODUCT == 'SidePal' 
        require("../ascii-title.sidepal.html").default
    else 
        require("../ascii-title.html").default
    $scope.asciiTitleHtml = $sce.trustAsHtml($scope.asciiTitle)

    if not $scope.inFrame
        import(### webpackChunkName: "github-badge"  ###'../vendor/github-badge.js')
        import(### webpackChunkName: "needsharebutton-js"  ###'../vendor/needsharebutton.js')
        import(### webpackChunkName: "needsharebutton-css"  ###'../vendor/needsharebutton.css')

    initDict = () ->
        chrome.runtime.sendMessage {
            type: 'dictionary',
            # origin: window.top?.location?.origin,
            # url: window.top?.location?.href
        }, ({currentDictName, nextDictName, previousDictName, allDicts, previous, history, w, r, windowUrl})->
            $scope.allDicts = allDicts
            $scope.currentDictName = currentDictName
            $scope.nextDictName = nextDictName
            $scope.previousDictName = previousDictName
            $scope.previous = previous
            $scope.word = w
            $scope._lastQueryWord = $scope.word
            $scope.history = history
            $scope.windowUrl = windowUrl if windowUrl
            $scope.trustedWindowUrl = $sce.trustAsResourceUrl(windowUrl) if windowUrl
            $scope.$apply()
            $('#fairy-dict input.dict-input').focus()

            if !$scope.setting?.disableWordHistory
                await import('../starrr.js')
                if $('.starrr', baseNode).data("star-rating")
                    $('.starrr', baseNode).data("star-rating").setRating(r)
                else
                    $('.starrr', baseNode).starrr({numStars: 3, rating: r})

            if $scope.querying  
                $scope.checkIfFrameIsLoaded()

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
        $scope.history = history
        $scope.$apply()

    $scope.query = ({ nextDict, previousDict, dictNumber, nextWord, previousWord, queryText, dictName, w, newDictWindow } = {}) ->
        # if not $scope.word
        #     $scope.initial = true
        #     return

        $scope.initial = false
        $scope.querying = true if w
        $scope.word = w if w
        $scope.currentDictName = dictName if dictName and not newDictWindow
    
        if dictName and queryText?
            $scope.word = queryText || $scope._lastQueryWord

        window.top.postMessage { type: 'toggleDropdown', open: false }, '*'
        return if not $scope.word

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
            $scope._lastQueryWord = $scope.word
            if data?.noUpdate
                # current dict might be changed
                initDict()
        )
    
    sendMessageToDictPage = (message) ->
        document.getElementById('dict-result')?.contentWindow.postMessage(message, '*')

    $scope.toggleDropdown = (open) ->
        if $scope.inFrame
            window.top.postMessage { type: 'toggleDropdown', open }, '*'

    $scope.scheduleDropdown = (dropdownType, open) ->
        clearTimeout $scope.openDropdownTimer
        clearTimeout $scope.closeDropdownTimer 

        $scope.openDropdownTimer = setTimeout (() -> 
            if dropdownType == 'history'
                $scope.isHistoryDropdownOpen = open;
            else if dropdownType == 'dict'
                $scope.isDictDropdownOpen = open;
            window.top.postMessage { type: 'toggleDropdown', open: open }, '*'
            $scope.$apply()
        ), 100
    
    $scope.scheduleCloseDropdown = () ->
        clearTimeout $scope.closeDropdownTimer 
        clearTimeout $scope.openDropdownTimer
        $scope.closeDropdownTimer = setTimeout (() -> 
            $scope.isHistoryDropdownOpen = false
            $scope.isDictDropdownOpen = false
            window.top.postMessage { type: 'toggleDropdown', open: false }, '*'
            $scope.$apply()
        ), 100
    
    parseAutocomplete = (html) ->
        return [] unless html
        nodes = $(html)
        list = []
        nodes.find('.word-result-entry').each (i, item) ->
            w = $(item).find('.word').text()
            def = $(item).find('.definition').text()
            ipa = $(item).find('.word').attr('data-ipa')

            list.push({ w, def, ipa }) unless i > 11  # at most 12 items
            
        return list

    $scope.autocomplete = debounce (() ->
        cancelAutoCompleteIfQuerying = () ->
            if $scope.querying or $scope.word == $scope._lastQueryWord
                $scope.autocompletes = []
                $scope.toggleDropdown(false)
                $scope.$apply()
                return true
            return false

        return if cancelAutoCompleteIfQuerying()
        text = $scope.word.trim()
        if text
            {results, html} = await utils.send 'autocomplete', { text }
            if cancelAutoCompleteIfQuerying()
                return
            $scope.autocompletes = results.concat parseAutocomplete(html)
        else
            $scope.autocompletes = []

        $scope.toggleDropdown($scope.autocompletes.length > 0)
        $scope.$apply()
    ), 500

    chrome.runtime.onMessage?.addListener (request, sender, sendResponse)->
        # console.log(request)
        if request.type == 'querying'
            $scope.initial = false
            $scope.querying = true
            $scope.word = request.text
            setTimeout (() -> 
                $scope.querying = false
                $scope._lastQueryWord = $scope.word
                $('#fairy-dict input.dict-input').focus()
                $scope.$apply()
            ), 1000

        if request.type == 'sendToDict'
            if request.action == 'keypress focus'
                $('input.dict-input', baseNode)[0].select()
        
        if request.type == 'look up result'
            $scope.querying = false
            $scope._lastQueryWord = $scope.word
            if request.windowUrl and $scope.windowUrl != request.windowUrl
                $scope.windowUrl = request.windowUrl
                $scope.trustedWindowUrl = $sce.trustAsResourceUrl(request.windowUrl)
                $scope.querying = true

            initDict()
            sendMessageToDictPage({ ...request,  type: 'look up in dynamic dict' })

        $scope.$apply()
    
    window.addEventListener "message", (event) -> 
        if event.data?.type == 'injectedInDict'
            $scope.dictFrameIsLoaded = true
            $scope.dictFrameIsNotLoaded = false
            $scope.querying = false
            $scope.$apply()

    $scope.checkIfFrameIsLoaded = () ->
        $scope.dictFrameIsLoaded = false
        clearTimeout $scope._checkFrameTimer

        $scope._checkFrameTimer = setTimeout (() ->
            if $scope.dictFrameIsLoaded
                $scope.dictFrameIsNotLoaded = false
            else
                $scope.dictFrameIsNotLoaded = true

            $scope.$apply()
        ), 2000

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

        if (evt.key == 'Escape')
            $scope.toggleDropdown false

        if stop
            evt.preventDefault()
            evt.stopPropagation()
            $scope.$apply()

    window.addEventListener 'beforeunload', () ->
        utils.send 'beforeunload dict window', {
            left: window.screenX,
            top: window.screenY,
            width: window.outerWidth,
            height: window.outerHeight,
            dictName: $scope.currentDictName,
        }

    return
]

import('../header.html').then ({ default: headerDom }) ->
    $(document.body).append(headerDom)
    angular.bootstrap(document.getElementById('fairy-dict'), ['fairyDictApp'])

    (setupAppDescription = () ->
        appDescription = if process.env.PRODUCT == "SidePal"
            require("../description-and-badge.sidepal.html").default
        else 
            require("../description-and-badge.html").default

        document.querySelector("#app-description").innerHTML = appDescription 
        
        version = chrome.runtime.getManifest().version
        document.querySelector('#app-description .badge').innerText = "V" + version
    )()

    