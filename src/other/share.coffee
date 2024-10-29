import '../vendor/needsharebutton.min.js'
import '../vendor/needsharebutton.min.css'
import '../vendor/github-badge.js'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootoast/dist/bootoast.min.css'
import bootoast from 'bootoast/dist/bootoast.min.js'


version = chrome.runtime.getManifest().version

bootoast.toast({
    message: 'Bravo! You have successfully upgraded Dictionariez to v' + version,
    type: 'info',
    position: 'top',
    timeout: 5,
    dismissible: false
})