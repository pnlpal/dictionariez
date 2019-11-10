import 'bootstrap/dist/css/bootstrap.min.css'
import '../vendor/font-awesome.css'
import './options.less'
# import '../needsharebutton.min.css'

import angular from 'angular'
import utils from "utils"
import $ from 'jquery'
import moment from 'moment'

import 'angular-route'
import 'angular-sanitize'
import 'angular-ui-bootstrap'

# import '../needsharebutton.min.js'
import 'bootstrap/js/scrollspy.js'

import 'datatables.net-dt'

initHistory = () ->
    history = await utils.send('history')

    $('#history').DataTable({
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
                render: (data, type) ->
                    data || 0
            },
            {
                name: 's',
                title: 'Source',
                data: 's',
                render: (data, type, row) ->
                    return '' unless data
                    return "<a class='column-s' target='_blank' href='#{data}'> #{row.sc || data} </a>"

            },
            {
                name: 't',
                title: 'Added Time',
                data: 't',
                render: (data, type) ->
                    moment(data).format('YYYY-MM-DD HH:mm:ss')
            },
        ],
        data: history
    })

initHistory()

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

