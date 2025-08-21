/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
let setupAppDescription, setupAsciiTitle, setupProductName, toast;
import '../vendor/needsharebutton.js';
import '../vendor/needsharebutton.css';
import '../vendor/github-badge.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootoast/dist/bootoast.min.css';
import bootoast from 'bootoast/dist/bootoast.min.js';

document.title = `Share - ${process.env.PRODUCT}`;
const {
  version
} = chrome.runtime.getManifest();

(toast = function() {
    const prevVersion = localStorage.getItem('dictionariez-version');
    localStorage.setItem('dictionariez-version', version);
    if (prevVersion && (prevVersion !== version)) {
        return bootoast.toast({
            message: 'Bravo! You have successfully upgraded Dictionariez to v' + version,
            type: 'info',
            position: 'top',
            timeout: 5,
            dismissible: false
        });
      }
  }
)();

(setupAsciiTitle = function() {
  const asciiTitle = process.env.PRODUCT === "Dictionariez" ?
    require("../ascii-title.html").default
  : 
    require(`../ascii-title.${process.env.PRODUCT.toLowerCase()}.html`).default;

  return document.querySelector("#ascii-title").innerHTML = asciiTitle;
}
)();

(setupAppDescription = function() {
  const appDescription = process.env.PRODUCT === "Dictionariez" ?
    require("../description-and-badge.html").default
  : 
    require(`../description-and-badge.${process.env.PRODUCT.toLowerCase()}.html`).default;

  document.querySelector("#app-description").innerHTML = appDescription; 
  
  return document.querySelector('#app-description .badge').innerText = "V" + version;
}
)();

(setupProductName = function() {
  const productName = process.env.PRODUCT;
  return document.querySelectorAll(".productName").forEach(el => el.innerText = productName);
}
)();