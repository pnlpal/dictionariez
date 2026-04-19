import utils from "utils";
import "bootstrap/dist/css/bootstrap.min.css";
import "../vendor/font-awesome.css";

import "./scrollbar.less";
import "./card.less";

const sys = location.search.match(/sys=(\w+)/)[1];

const initWiki = () => {
    const getWikipedia = async (w) => {
        const res = await utils.send("get wikipedia", { w });

        if (res?.extract_html) {
            const wikiImage = document.querySelector(".dictionaries-wikipedia .dictionaries-wiki-image");
            const wikiExtract = document.querySelector(".dictionaries-wikipedia .dictionaries-wiki-extract");
            const cardLink = document.querySelector(".dictionaries-wikipedia .dictionaries-card-link");

            if (res?.thumbnail) {
                wikiImage.innerHTML = `<img src='${res.thumbnail.source}'></img>`;
            } else {
                wikiExtract.classList.add("dictionaries-wiki-margin-top");

                // wiki's bug?
                if (res.extract?.endsWith("may refer to:")) {
                    return;
                }
            }

            wikiExtract.innerHTML = res.extract_html;
            cardLink.setAttribute("href", res.content_urls.mobile.page);

            window.showCard(window.cardSetting.minimal);
        }
    };

    const wikiHtml = `
<a class="dictionaries-card-minimal-icon" href="" title="Open wikipedia" style="display: none;">
    <img src="https://en.m.wikipedia.org/static/favicon/wikipedia.ico" alt="Wiki"></img>
</a>
<div class="dictionaries-wikipedia dictionaries-card-max">
    <div class="dictionaries-card-toolbar navbar-fixed-top">
        <a class="dictionaries-card-link" href="" title="Open wikipedia">
            <img src="https://en.m.wikipedia.org/static/favicon/wikipedia.ico" alt="Wiki"></img>
        </a>

        <a class="dictionaries-card-close pull-right" href="" title="Close">
            <i class='fa fa-remove' aria-hidden='true'></i>
        </a>
        <a class="dictionaries-setting pull-right" href="" title="Go to settings">
            <i class='fa fa-cog' aria-hidden='true'></i>
        </a>
    </div>

    <div class="dictionaries-wiki-image"> </div>

    <div class="dictionaries-wiki-extract">
    </div>
</div>
`;
    const container = document.createElement("div");
    container.innerHTML = wikiHtml;
    while (container.firstChild) {
        document.body.appendChild(container.firstChild);
    }

    getWikipedia();
};

(async () => {
    const setting = await utils.send("card setting", {
        sys,
        origin: location.origin,
        url: location.href,
    });
    window.cardSetting = setting;

    if (sys === "wiki" && !setting.disabled) {
        initWiki();
    }
})();

document.addEventListener("click", (ev) => {
    const cardLink = ev.target.closest("a.dictionaries-card-link");
    if (cardLink) {
        window.top.location.href = cardLink.href;
        ev.preventDefault();
        return;
    }

    const closeBtn = ev.target.closest("a.dictionaries-card-close");
    if (closeBtn) {
        window.showCard(true);
        utils.send("card minimal", { sys, minimal: true });
        ev.preventDefault();
        return;
    }

    const minimalIcon = ev.target.closest("a.dictionaries-card-minimal-icon");
    if (minimalIcon) {
        window.showCard();
        utils.send("card minimal", { sys, minimal: false });
        ev.preventDefault();
        return;
    }

    const settingBtn = ev.target.closest("a.dictionaries-setting");
    if (settingBtn) {
        utils.send("open options", { to: "function-setting", sys });
        ev.preventDefault();
        return;
    }
});

window.showCard = (minimal) => {
    window.top.postMessage({ type: "show-card", sys, minimal }, "*");
    const minimalIcon = document.querySelector(".dictionaries-card-minimal-icon");
    const cardMax = document.querySelector(".dictionaries-card-max");

    if (minimal) {
        if (minimalIcon) minimalIcon.style.display = "";
        if (cardMax) cardMax.style.display = "none";
    } else {
        if (minimalIcon) minimalIcon.style.display = "none";
        if (cardMax) cardMax.style.display = "";
    }
};
