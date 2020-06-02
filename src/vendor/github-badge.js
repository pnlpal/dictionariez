// ==UserScript==
// @name         Github Links to Star Badges
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Adds github stars badges after github links.
// @author       TrueFurby
// @match        https://awesome-go.com/
// @grant        none
// ==/UserScript==
import $ from "jquery";

(function() {
	"use strict";
	var gitLinks = $("a.link-github[href*='github.com']");

	gitLinks.each(function() {
		var a = $(this);
		var link = a.attr("href");
		var re = /github.com\/([^\/]+)\/([^\/]+)\/?/;
		var matches = link.match(re);
		if (!matches || matches.length < 3) {
			return;
		}
		var user = matches[1] || "stars";
		var repo = matches[2] || "badges";
		var shield =
			"https://img.shields.io/github/stars/" + user + "/" + repo + ".svg";

		var b = document.createElement("img");
		b.style.margin = "0 0 0 5px";
		b.style.padding = "0";
		b.src = shield;
		b.height = 20;
		a.append(b);
	});
})();
