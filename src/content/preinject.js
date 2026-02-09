chrome.runtime.sendMessage(
    {
        type: "injected",
        preinject: true,
        origin: location.origin,
        url: location.href,
    },
    (res) => {
        if (res?.dictUrl || res?.isInSidePanelDict) {
            if (res.dict?.css) {
                const styleElement = document.createElement("style");
                styleElement.innerHTML = res.dict.css;
                document.head.appendChild(styleElement);
            }

            require("./scrollbar.less");
        }
    },
);
