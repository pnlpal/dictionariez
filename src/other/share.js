import "../vendor/needsharebutton.js";
import "../vendor/needsharebutton.css";
import "../vendor/github-badge.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootoast/dist/bootoast.min.css";
import bootoast from "bootoast/dist/bootoast.min.js";

document.title = `Share - ${process.env.PRODUCT}`;
const { version } = chrome.runtime.getManifest();

const toast = () => {
    const prevVersion = localStorage.getItem("dictionariez-version");
    localStorage.setItem("dictionariez-version", version);
    if (prevVersion && prevVersion !== version) {
        bootoast.toast({
            message: `Bravo! You have successfully upgraded Dictionariez to v${version}`,
            type: "info",
            position: "top",
            timeout: 5,
            dismissible: false,
        });
    }
};
toast();

const setupAsciiTitle = () => {
    const asciiTitle =
        process.env.PRODUCT === "Dictionariez"
            ? require("../ascii-title.html").default
            : require(`../ascii-title.${process.env.PRODUCT.toLowerCase()}.html`).default;

    document.querySelector("#ascii-title").innerHTML = asciiTitle;
};
setupAsciiTitle();

const setupAppDescription = () => {
    const appDescription =
        process.env.PRODUCT === "Dictionariez"
            ? require("../description-and-badge.html").default
            : require(`../description-and-badge.${process.env.PRODUCT.toLowerCase()}.html`).default;

    document.querySelector("#app-description").innerHTML = appDescription;
    document.querySelector("#app-description .badge").innerText = `V${version}`;
};
setupAppDescription();

const setupProductName = () => {
    const productName = process.env.PRODUCT;
    document.querySelectorAll(".productName").forEach((el) => (el.innerText = productName));
};
setupProductName();
