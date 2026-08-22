import { AD_BLOCK_CSS, AD_BLOCK_SELECTORS } from "../shared-readonly/adBlockCss.js";

function startAdBlocker() {
    const selector = AD_BLOCK_SELECTORS.join(",");

    function cleanupEmptyAncestor(parent, depth) {
        if (!parent || depth <= 0 || parent.nodeType !== 1) return;
        if (parent === document.body || parent === document.documentElement) return;
        if (parent.childElementCount > 0 || parent.textContent.trim()) return;
        const grandparent = parent.parentNode;
        parent.remove();
        cleanupEmptyAncestor(grandparent, depth - 1);
    }

    function sweep() {
        const matches = document.querySelectorAll(selector);
        for (const el of matches) {
            const parent = el.parentNode;
            el.remove();
            cleanupEmptyAncestor(parent, 3);
        }
    }

    let sweepScheduled = false;
    function scheduleSweep() {
        if (sweepScheduled) return;
        sweepScheduled = true;
        requestAnimationFrame(() => {
            sweepScheduled = false;
            sweep();
        });
    }

    // Initial sweep
    sweep();

    // Watch for new ad elements
    new MutationObserver(scheduleSweep).observe(document.documentElement, {
        childList: true,
        subtree: true,
    });
}

function cssAdBlocker() {
    // CSS for immediate hiding
    const adBlockStyle = document.createElement("style");
    adBlockStyle.id = "dictionariez-ad-blocker-css";
    adBlockStyle.innerHTML = AD_BLOCK_CSS;
    document.head.appendChild(adBlockStyle);
}

export default function injectAdBlocker() {
    cssAdBlocker();
    startAdBlocker();
}
