import "../vendor/needsharebutton.js";
import "../vendor/needsharebutton.css";
import "../vendor/github-badge.js";
import { getCurrentCoupon } from "../option/user-profile.js";
import QRCode from "qrcode";

document.title = `Share - ${process.env.PRODUCT}`;
const { version } = chrome.runtime.getManifest();

const setupAppDescription = () => {
    const $name = document.querySelectorAll(".productName");
    if ($name) {
        $name.forEach((el) => (el.innerText = process.env.PRODUCT));
    }
    const $version = document.querySelector("#app-version");
    if ($version) {
        $version.innerText = `v${version}`;
    }
};
setupAppDescription();

const setupDealOfferBanner = async () => {
    if (!document.querySelector("#launch-deal-banner")) return;
    document.querySelector("#launch-deal-banner").style.display = "none";
    const currentCoupon = await getCurrentCoupon().catch(() => null);
    if (currentCoupon) {
        document.querySelector("#launch-deal-banner").style.display = "block";
        document.querySelector(".coupon-name").innerText = currentCoupon.name;
        document.querySelector(".percent-off").innerText = currentCoupon.percent_off;
    }
};
setupDealOfferBanner();

// QR codes for the Puffins download links, rendered locally.
document.querySelectorAll("canvas[data-qr]").forEach((canvas) => {
    QRCode.toCanvas(canvas, canvas.dataset.qr, { width: 140, margin: 1 }).catch(() => {
        canvas.closest(".qr").style.display = "none";
    });
});
