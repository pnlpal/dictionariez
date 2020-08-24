
# import '../needsharebutton.min.css'

import angular from 'angular'
import utils from "utils"

import 'angular-ui-bootstrap'

import '../vendor/needsharebutton.min.js'
import '../vendor/needsharebutton.min.css'
import(### webpackChunkName: "tables"  ###'./tables.coffee')
import(### webpackChunkName: "github-badge"  ###'../vendor/github-badge.js')
import(### webpackChunkName: "inject-options"  ###'../content/inject.coffee')

import('bootstrap/dist/css/bootstrap.min.css')
import('../vendor/font-awesome.css')
import('./options.less')

import bootoast from 'bootoast/dist/bootoast.min.js'

dictApp = angular.module('fairyDictApp', ['ui.bootstrap'])

dictApp.controller 'optionCtrl', ['$scope', ($scope) ->
    console.log "[optionCtrl] init"

    $scope.allSK = ['', 'Ctrl', 'Shift', 'Alt', 'Meta']
    $scope.allLetters = (String.fromCharCode(code) for code in ['A'.charCodeAt(0)..'Z'.charCodeAt(0)])
    $scope.allLetters.unshift('Disabled')

    $scope.extraKeys = Object.keys(utils.extraKeyMap)

    $scope.allKeys = $scope.allLetters.concat($scope.extraKeys)

    $scope.allPositions = ['topLeft', 'topCenter', 'topRight',
                           'middleLeft', 'middleCenter', 'middleRight',
                           'bottomLeft', 'bottomCenter', 'bottomRight']

    $scope.changeKey = (value, key)->
        $scope.setting[key] = value
        chrome.runtime.sendMessage {
            type: 'save setting'
            key: key,
            value: value
        }
    $scope.syncDicts = ()->
        $scope.syncing = true
        err = await utils.send 'sync dicts'
        $scope.syncing = false 
        $scope.$apply()

        if err
            bootoast.toast({
                message: 'Sync failed:<br>' + err.message,
                type: 'error',
                position: 'top',
                timeout: 5,
                dismissible: false
            }) 
        else 
            location.reload()

    chrome.runtime.sendMessage {
        type: 'setting'
    }, (config)->
        $scope.setting = config
        $scope.$apply()

]