
# import '../needsharebutton.min.css'
import angular from 'angular'
import utils from "utils"
import debounce from 'lodash/debounce'

import 'angular-ui-bootstrap'

import '../vendor/needsharebutton.min.js'
import '../vendor/needsharebutton.min.css'

import(### webpackChunkName: "github-badge"  ###'../vendor/github-badge.js')
import(### webpackChunkName: "inject-options"  ###'../content/inject.coffee')

import('bootstrap/dist/css/bootstrap.min.css')
import('../vendor/font-awesome.css')
import('./options.less')

import bootoast from 'bootoast/dist/bootoast.min.js'

import "angularjs-color-picker/dist/angularjs-color-picker.min.css"
import "angularjs-color-picker/dist/themes/angularjs-color-picker-bootstrap.min.css"
import 'angularjs-color-picker'

dictApp = angular.module('fairyDictApp', ['ui.bootstrap', 'color.picker'])

dictApp.controller 'optionCtrl', ['$scope', ($scope) ->
    $scope.version = chrome.runtime.getManifest().version
    $scope.allSK = ['', 'Ctrl', 'Shift', 'Alt', 'Meta']
    $scope.allLetters = (String.fromCharCode(code) for code in ['A'.charCodeAt(0)..'Z'.charCodeAt(0)])
    $scope.allLetters.unshift('Disabled')

    $scope.extraKeys = Object.keys(utils.extraKeyMap)

    $scope.allKeys = $scope.allLetters.concat($scope.extraKeys)

    $scope.allPositions = ['topLeft', 'topCenter', 'topRight',
                           'middleLeft', 'middleCenter', 'middleRight',
                           'bottomLeft', 'bottomCenter', 'bottomRight']
    $scope.englishLookupSources = {
        'google': 'Google Dict',
        'bing': 'Bing Dict',
        'wiktionary': 'Wiktionary'
    };
    $scope.koreanLookupSources = {
        'google': 'Google Dict',
        'wiktionary': 'Wiktionary',
        'naver': 'Naver Dict',
    }
    $scope.otherLangs = {
        'zh-CN': 'Chinese',
        "ja-JP": 'Japanese',
        'ko-KR': 'Korean',
        'es-ES': 'Spanish',
        'fr-FR': 'French',
        'de-DE': 'German'
    }

    $scope.changeKey = debounce ((value, key)->
        if key 
            $scope.setting[key] = value
        else 
            key = value 
            value = $scope.setting[key]
        
        chrome.runtime.sendMessage {
            type: 'save setting'
            key: key,
            value: value
        }
    ), 500

    $scope.toggleOtherDisabledLanguages = (lang) ->
        idx = $scope.setting.otherDisabledLanguages.indexOf lang 
        if idx >= 0
            $scope.setting.otherDisabledLanguages.splice idx, 1
        else 
            $scope.setting.otherDisabledLanguages.push lang 
        chrome.runtime.sendMessage {
            type: 'save setting'
            key: 'otherDisabledLanguages',
            value: $scope.setting.otherDisabledLanguages
        }
    
    chrome.runtime.sendMessage {
        type: 'setting'
    }, (config)->
        # window.setting = config
        $scope.setting = config
        $scope.$apply()

        import(### webpackChunkName: "tables"  ###'./tables.coffee')

    
    $scope.markColorEvent = { 
        onChange: (api, color, $event) -> 
            $scope.changeKey(color, 'markColor')
    }

    setupDevFunctions = () -> 
        console.log("""
.--.        .                                    
|   : o    _|_   o                    o          
|   | .  .-.|    .  .-. .--. .-.  .--..  .-. ---.
|   ; | (   |    | (   )|  |(   ) |   | (.-'  .' 
'--'-' `-`-'`-'-' `-`-' '  `-`-'`-' -' `-`--''---

Welcome to dictionariez! 
You can use the function "addDict" to add/change a dict to your dictionary list.
For example: 

addDict({
  "dictName": "Google Image",
  "windowUrl": "https://www.google.com/search?tbm=isch&q=<word>",
  "css": "c-wiz[jsdata='deferred-i3']>div:first-child {display: none;} body {margin-top: 50px !important;}"
})

And use "allDicts" to access all the dicts in your collection. 

Read more here: https://pnlpal.dev/topic/52/help-more-dictionaries-needed

        """)
        window.addDict = window.addExtraDict = (dict)->
            await utils.send 'dictionary-add', { dict } 
            location.reload()
    
    setupDevFunctions()
]