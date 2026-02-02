import "../vendor/needsharebutton.js";
import "../vendor/needsharebutton.css";
import "../vendor/github-badge.js";
import { getCurrentCoupon } from "../option/user-profile.js";

document.title = `Share - ${process.env.PRODUCT}`;
const { version } = chrome.runtime.getManifest();

const setupAppDescription = () => {
    document.querySelector("#app-version").innerText = `v${version}`;
    document.querySelectorAll(".productName").forEach((el) => (el.innerText = process.env.PRODUCT));
};
setupAppDescription();

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
