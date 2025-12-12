// ==UserScript==
// @name         Github Links to Star Badges
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Adds github stars badges after github links.
// @author       TrueFurby
// @match        https://awesome-go.com/
// @grant        none
// ==/UserScript==

(function () {
    "use strict";
    const gitLinks = document.querySelectorAll("a.link-github[href*='github.com']");

    gitLinks.forEach((a) => {
        const link = a.href;
        const re = /github.com\/([^/]+)\/([^/]+)\/?/;
        const matches = link.match(re);
        if (!matches || matches.length < 3) {
            return;
        }
        const user = matches[1] || "stars";
        const repo = matches[2] || "badges";
        const shield = `https://img.shields.io/github/stars/${user}/${repo}.svg`;

        const img = document.createElement("img");
        img.style.margin = "0 0 0 5px";
        img.style.padding = "0";
        img.src = shield;
        img.height = 20;
        a.appendChild(img);
    });
})();
