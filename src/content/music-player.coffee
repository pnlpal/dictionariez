import $ from 'jquery'
import angular from 'angular'
import utils from "utils"
import debounce from 'lodash/debounce'

# import '../needsharebutton.min.js'
# import 'angular-ui-bootstrap'

# import('bootstrap/dist/css/bootstrap.min.css')
import('../vendor/font-awesome.css')
import('./music-player.less') 

sys = 'music'

# some ui need bootstrap, like dropdown.
musicPlayer = angular.module('musicPlayer', [])

musicPlayer.controller 'musicPlayerCtrl', ['$scope', ($scope) ->
    console.log "[musicPlayerCtrl] init"

    authorize = () ->
        clientId = '68dca18a0bd3456588afe7e746c67e77'
        scope = encodeURIComponent ["streaming", "user-read-email", "user-read-private"].join(" ")
        redirectUri = encodeURIComponent(window.top.location.href + '?spotifyCallback')
        state = Date.now()
        uri = "https://accounts.spotify.com/authorize?client_id=#{clientId}&redirect_uri=#{redirectUri}&scope=#{scope}&response_type=token&state=#{state}"
        window.top.location.href = uri

    onAuthorized = () ->
        token = window.top.location.hash.match(/access_token=([^&]+)/)[1]
        utils.send 'spotify authorized', { token }

    $scope.play = () -> 
        # utils.send 'music togglePlay'

        # window.top.location.href = ""
        authorize()

    if window.top.location.search.includes('spotifyCallback')
        onAuthorized()
    
    else 
        utils.send 'spotify init'
]


import('../music-player.html').then ({ default: dom }) ->
    $(document.body).append(dom)

    angular.bootstrap(document.getElementById('dictionariez-music-player'), ['musicPlayer'])
    window.top.postMessage { type: 'show-card', sys }, '*'