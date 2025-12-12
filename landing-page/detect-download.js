document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("download-btn");
    let browser = "Chrome";
    let url = "https://chrome.google.com/webstore/detail/dictionaries/diojcfpekhhnndfmggknljpnfpcccbhc";

    const ua = navigator.userAgent;

    if (
        ua.includes("Firefox") ||
        ua.includes("Waterfox") ||
        ua.includes("LibreWolf") ||
        ua.includes("PaleMoon") ||
        ua.includes("IceCat") ||
        ua.includes("Basilisk")
    ) {
        browser = ua.includes("Waterfox")
            ? "Waterfox"
            : ua.includes("LibreWolf")
            ? "LibreWolf"
            : ua.includes("PaleMoon")
            ? "Pale Moon"
            : ua.includes("IceCat")
            ? "IceCat"
            : ua.includes("Basilisk")
            ? "Basilisk"
            : "Firefox";
        url = "https://addons.mozilla.org/en-US/firefox/addon/dictionaries/";
    } else if (ua.includes("Edg")) {
        browser = "Edge";
        url =
            "https://microsoftedge.microsoft.com/addons/detail/dictionaries-one-to-rule/jdgglojanbnghagoeffacmjodigadoof";
    } else if (ua.includes("Brave")) {
        browser = "Brave";
    } else if (ua.includes("Vivaldi")) {
        browser = "Vivaldi";
    } else if (ua.includes("Chromium")) {
        browser = "Chromium";
    } else if (ua.includes("SamsungBrowser")) {
        browser = "Samsung Internet";
    } else if (ua.includes("YaBrowser")) {
        browser = "Yandex";
    } else if (ua.includes("Kiwi")) {
        browser = "Kiwi";
    } else if (ua.includes("Flow")) {
        browser = "Flow";
    } else if (ua.includes("Arc")) {
        browser = "Arc";
    } else if (ua.includes("coc_coc_browser")) {
        browser = "Coc Coc";
    }

    btn.textContent = `Download for ${browser}`;
    btn.href = url;

    const otherBtn = document.getElementById("other-browsers-btn");
    const otherList = document.getElementById("other-browsers-list");
    otherBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        const expanded = otherBtn.getAttribute("aria-expanded") === "true";
        otherBtn.setAttribute("aria-expanded", !expanded);
        otherList.hidden = expanded;
    });
    document.addEventListener("click", function () {
        otherBtn.setAttribute("aria-expanded", "false");
        otherList.hidden = true;
    });
    otherBtn.addEventListener("keydown", function (e) {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            otherList.hidden = false;
            otherBtn.setAttribute("aria-expanded", "true");
            otherList.querySelector("a").focus();
        }
    });
});
