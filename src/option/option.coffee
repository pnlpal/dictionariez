import 'bootstrap/dist/css/bootstrap.min.css'
import '../vendor/font-awesome.css'
import './options.less'
# import '../needsharebutton.min.css'

import angular from 'angular'
import utils from "utils"
import $ from 'jquery'

import 'angular-route'
import 'angular-sanitize'
import 'angular-ui-bootstrap'

# import '../needsharebutton.min.js'
import 'bootstrap/js/scrollspy.js'

dt = require( 'datatables.net-dt')

window.t = $('#history').DataTable({
    dom: 't',
    columns: [
        {
            name: 'w',
            title: 'Word',
            data: 'w'
        },
        {
            name: 'r',
            title: 'Rate',
            data: 'r'
        },
        {
            name: 's',
            title: 'Source',
            data: 's'
        },
        {
            name: 't',
            title: 'Time',
            data: 't'
        },
    ],
    data: [
        {w: 'test1', r: 1, s: 'baidu.com', t: 123123}
    ]
})

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

