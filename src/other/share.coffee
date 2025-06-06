import '../vendor/needsharebutton.js'
import '../vendor/needsharebutton.css'
import '../vendor/github-badge.js'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootoast/dist/bootoast.min.css'
import bootoast from 'bootoast/dist/bootoast.min.js'

document.title = "Share - #{process.env.PRODUCT}"
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
  asciiTitle = if process.env.PRODUCT == "Dictionariez"
    require("../ascii-title.html").default
  else 
    require("../ascii-title.#{process.env.PRODUCT.toLowerCase()}.html").default

  document.querySelector("#ascii-title").innerHTML = asciiTitle
)()

(setupAppDescription = () ->
  appDescription = if process.env.PRODUCT == "Dictionariez"
    require("../description-and-badge.html").default
  else 
    require("../description-and-badge.#{process.env.PRODUCT.toLowerCase()}.html").default

  document.querySelector("#app-description").innerHTML = appDescription 
  
  document.querySelector('#app-description .badge').innerText = "V" + version
)()

(setupProductName = () ->
  productName = process.env.PRODUCT
  document.querySelectorAll(".productName").forEach (el) ->
    el.innerText = productName
)()