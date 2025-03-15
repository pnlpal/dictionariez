import '../vendor/needsharebutton.js'
import '../vendor/needsharebutton.css'
import '../vendor/github-badge.js'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootoast/dist/bootoast.min.css'
import bootoast from 'bootoast/dist/bootoast.min.js'

version = chrome.runtime.getManifest().version

(toast = () ->
    prevVersion = localStorage.getItem('dictionariez-version')
    localStorage.setItem('dictionariez-version', version)
    if prevVersion and prevVersion != version
        bootoast.toast({
            message: 'Bravo! You have successfully upgraded Dictionariez to v' + version,
            type: 'info',
            position: 'top',
            timeout: 5,
            dismissible: false
        })
)()

(setupAsciiTitle = () ->
  asciiTitle = if process.env.PRODUCT == "SidePal"
    require("../ascii-title.sidepal.html").default
  else 
    require("../ascii-title.html").default

  document.querySelector("#ascii-title").innerHTML = asciiTitle
)()

(setupAppDescription = () ->
  appDescription = if process.env.PRODUCT == "SidePal"
    require("../description-and-badge.sidepal.html").default
  else 
    require("../description-and-badge.html").default

  document.querySelector("#app-description").innerHTML = appDescription 
  
  document.querySelector('#app-description .badge').innerText = "V" + version
)()