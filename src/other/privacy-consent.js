// Get the modal
const modal = document.getElementById("privacyModal");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// Get the buttons
const acceptBtn = document.getElementById("acceptBtn");
const declineBtn = document.getElementById("declineBtn");

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks on accept button, close the modal
acceptBtn.onclick = function () {
  chrome.runtime.sendMessage({
    type: "save setting",
    key: "privacyConsent",
    value: "v1",
  });
  location.pathname = "/share.html";
};

// When the user clicks on decline button, prompt the user for confirmation
declineBtn.onclick = function () {
  chrome.management.uninstallSelf({ showConfirmDialog: true });
};

// Display the modal when the page loads
window.onload = function () {
  modal.style.display = "block";
};

if (!navigator.userAgent.includes("Gecko/")) {
  // not Firefox
  const $link = document.querySelector("#link-to-mozilla");
  if ($link) $link.style.display = "none";
} else {
  const $link = document.querySelector("#link-to-mozilla");
  if ($link) {
    if (process.env.PRODUCT === "Dictionariez") {
      $link.href =
        "https://addons.mozilla.org/en-US/firefox/addon/dictionaries/privacy/";
    } else if (process.env.PRODUCT === "Ordböcker") {
      $link.href =
        "https://addons.mozilla.org/en-US/firefox/addon/ordb%C3%B6cker/privacy/";
    }
  }
}

(function setupAsciiTitle() {
  const asciiTitle =
    process.env.PRODUCT === "Dictionariez"
      ? require("../ascii-title.html").default
      : require(`../ascii-title.${process.env.PRODUCT.toLowerCase()}.html`)
          .default;

  document.querySelector("#ascii-title").innerHTML = asciiTitle;
})();
