import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/font-awesome.css'
import '../css/options.css'
# import '../needsharebutton.min.css'

import angular from 'angular'
import utils from "utils"

import 'angular-route'
import 'angular-sanitize'
import 'angular-ui-bootstrap'
# import '../needsharebutton.min.js'


dictApp = angular.module('fairyDictApp', ['ngRoute', 'ui.bootstrap', 'ngSanitize'])

dictApp.controller 'optionCtrl', ($scope, $sce) ->
    console.log "[optionCtrl] init"

    $scope.allSK = ['', 'Ctrl', 'Shift', 'Alt', 'Meta']
    $scope.allLetters = (String.fromCharCode(code) for code in ['A'.charCodeAt(0)..'Z'.charCodeAt(0)])

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

    chrome.runtime.sendMessage {
        type: 'setting'
    }, (config)->
        $scope.setting = config
        $scope.$apply()

