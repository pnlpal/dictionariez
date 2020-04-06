dictApp = angular.module('fairyDictApp', ['ngRoute', 'ui.bootstrap', 'ngSanitize'])

dictApp.controller 'optionCtrl', ($scope, $sce) ->
    console.log "[optionCtrl] init"

    $scope.allSK = ['', 'Ctrl', 'Shift', 'Alt', 'Meta']
    $scope.allLetters = (String.fromCharCode(code) for code in ['A'.charCodeAt(0)..'Z'.charCodeAt(0)])

    $scope.extraKeys = Object.keys(window.utils.extraKeyMap)

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

        if not config.upgradeNotice
            setTimeout () ->
                alert("疫情期间在家重构了 FairyDict, 此扩展的升级版 Dictionaries 已发布， 添加了管理单词表和词典列表的功能， 甚至还支持日语查询， 欢迎去下载使用 Dictionaries. FairyDict 将不再更新!")
            , 100

            chrome.runtime.sendMessage {
                type: 'save setting'
                key: 'upgradeNotice',
                value: true
            }