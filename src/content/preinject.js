async function waitForElement(selector, timeout = 10000) {
    const startTime = Date.now();
    return new Promise((resolve, reject) => {
        const checkExist = setInterval(() => {
            const element = document.querySelector(selector);
            if (element) {
                clearInterval(checkExist);
                resolve(element);
            }
            if (Date.now() - startTime > timeout) {
                clearInterval(checkExist);
                reject(new Error(`Element ${selector} not found within ${timeout}ms`));
            }
        }, 10);
    });
}
async function appendElementTo(selector, element) {
    try {
        const parent = await waitForElement(selector);
        parent.appendChild(element);
    } catch (error) {
        console.error(`Failed to append element to ${selector}:`, error);
    }
}

chrome.runtime.sendMessage(
    {
        type: "injected",
        origin: location.origin,
        url: location.href,
    },
    (res) => {
        if (res?.dictUrl || res?.isInSidePanelDict) {
            if (res.dict?.css) {
                const styleElement = document.createElement("style");
                styleElement.innerHTML = res.dict.css;
                appendElementTo("head", styleElement);
            }
        }

        require("./inject-in-dicts.js").default(res);
    },
);
