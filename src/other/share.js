import "../vendor/needsharebutton.js";
import "../vendor/needsharebutton.css";
import "../vendor/github-badge.js";
import { getCurrentCoupon } from "../option/user-profile.js";

// import $ from "jquery";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootoast/dist/bootoast.min.css";
// import bootoast from "bootoast/dist/bootoast.min.js";

document.title = `Share - ${process.env.PRODUCT}`;
const { version } = chrome.runtime.getManifest();

// const toast = () => {
//     const prevVersion = localStorage.getItem("dictionariez-version");
//     localStorage.setItem("dictionariez-version", version);
//     if (prevVersion && prevVersion !== version) {
//         bootoast.toast({
//             message: `Bravo! You have successfully upgraded Dictionariez to v${version}`,
//             type: "info",
//             position: "top",
//             timeout: 5,
//             dismissible: false,
//         });
//     }
// };
// toast();

// const setupAsciiTitle = () => {
//     const asciiTitle =
//         process.env.PRODUCT === "Dictionariez"
//             ? require("../ascii-title.html").default
//             : require(`../ascii-title.${process.env.PRODUCT.toLowerCase()}.html`).default;

//     document.querySelector("#ascii-title").innerHTML = asciiTitle;
// };
// setupAsciiTitle();

const setupAppDescription = () => {
    // const appDescription =
    //     process.env.PRODUCT === "Dictionariez"
    //         ? require("../description-and-badge.html").default
    //         : require(`../description-and-badge.${process.env.PRODUCT.toLowerCase()}.html`).default;

    // document.querySelector("#app-description").innerHTML = appDescription;
    document.querySelector("#app-version").innerText = `v${version}`;
    document.querySelectorAll(".productName").forEach((el) => (el.innerText = process.env.PRODUCT));
};
setupAppDescription();

const setupProductName = () => {
    const productName = process.env.PRODUCT;
    document.querySelectorAll(".productName").forEach((el) => (el.innerText = productName));
};
setupProductName();

const setupDealOfferBanner = async () => {
    document.querySelector("#launch-deal-banner").style.display = "none";
    const currentCoupon = await getCurrentCoupon().catch(() => null);
    if (currentCoupon) {
        document.querySelector("#launch-deal-banner").style.display = "block";
        document.querySelector(".coupon-name").innerText = currentCoupon.name;
        document.querySelector(".percent-off").innerText = currentCoupon.percent_off;
    }
};
setupDealOfferBanner();
