import { DARK_MODE_CSS } from "../shared-readonly/darkModeCss.js";

let attempts = 0;

function preinject(res) {
    if (!document.head || !document.body) {
        attempts += 1;
        if (attempts < 200) {
            setTimeout(() => preinject(res), 20);
        }
        return;
    }

    if (res?.dictUrl || res?.isInSidePanelDict) {
        if (res.dict?.css) {
            const styleElement = document.createElement("style");
            styleElement.innerHTML = res.dict.css;
            document.head.appendChild(styleElement);
        }
        // Inject dark mode CSS wrapped in prefers-color-scheme media query
        const darkModeStyle = document.createElement("style");
        darkModeStyle.id = "dictionariez-dark-mode";
        darkModeStyle.innerHTML = `@media (prefers-color-scheme: dark) { ${DARK_MODE_CSS} }`;
        document.head.appendChild(darkModeStyle);
    }

    require("./inject-in-dicts.js").default(res);
}

chrome.runtime.sendMessage(
    {
        type: "injected",
        origin: location.origin,
        url: location.href,
    },
    preinject,
);
