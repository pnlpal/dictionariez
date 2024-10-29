import '../vendor/needsharebutton.js'
import '../vendor/needsharebutton.css'
import '../vendor/github-badge.js'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootoast/dist/bootoast.min.css'
import bootoast from 'bootoast/dist/bootoast.min.js'


version = chrome.runtime.getManifest().version
document.getElementById('version').innerText = "V" + version

bootoast.toast({
    message: 'Bravo! You have successfully upgraded Dictionariez to v' + version,
    type: 'info',
    position: 'top',
    timeout: 5,
    dismissible: false
})