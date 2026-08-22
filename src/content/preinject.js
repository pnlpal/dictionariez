import { DARK_MODE_CSS } from "../shared-readonly/darkModeCss.js";

let attempts = 0;

function hasDarkClass(element) {
    if (element.className?.toLowerCase().includes("dark")) {
        return true;
    }
    return false;
}

// Check if site already has dark mode enabled
function siteHasDarkMode() {
    // Check if color-scheme is set to dark on html or body
    const html = document.documentElement;
    const body = document.body;

    if (html) {
        const htmlStyle = window.getComputedStyle(html);
        const colorScheme = htmlStyle.colorScheme || htmlStyle.getPropertyValue("color-scheme");
        if (colorScheme && colorScheme.includes("dark") && !colorScheme.includes("light")) {
            return true;
        }
    }

    if (hasDarkClass(html) || hasDarkClass(body)) {
        return true;
    }

    // Check background color luminance
    const element = body || html;
    if (!element) return false;

    const style = window.getComputedStyle(element);
    const bgColor = style.backgroundColor;

    // Parse rgb/rgba color
    const match = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (!match) return false;

    // Check alpha channel - if transparent (alpha = 0), it's not a dark background
    const alpha = match[4] !== undefined ? parseFloat(match[4]) : 1;
    if (alpha < 0.5) return false;

    const r = parseInt(match[1]) / 255;
    const g = parseInt(match[2]) / 255;
    const b = parseInt(match[3]) / 255;

    // Calculate relative luminance (WCAG formula)
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    // If luminance < 0.5, it's a dark background
    return luminance < 0.5;
}

function isDynamicDict(dict) {
    return !!dict?.prompt || !!dict?.inputSelector;
}

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

        // Only inject dark mode CSS if the site doesn't already have dark mode and the dictionary is not dynamic (like Mistral, Gemini, ChatGPT, Cpationz, etc.)
        if (!siteHasDarkMode() && !isDynamicDict(res.dict)) {
            const darkModeStyle = document.createElement("style");
            darkModeStyle.id = "dictionariez-dark-mode";
            darkModeStyle.innerHTML = `@media (prefers-color-scheme: dark) { ${DARK_MODE_CSS} }`;
            document.head.appendChild(darkModeStyle);
        }
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
