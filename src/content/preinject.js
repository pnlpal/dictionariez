chrome.runtime.sendMessage(
    {
        type: "injected",
        preinject: true,
        origin: location.origin,
        url: location.href,
    },
    function (res) {
        if (res?.dictUrl || res?.isInSidePanelDict) {
            if (res.dict?.resources?.styles) {
                for (const style of res.dict.resources.styles) {
                    require(`./css/${style}`);
                }
            }
            if (res.dict?.css) {
                const style = document.createElement("style");
                style.innerHTML = res.dict.css;
                document.head.appendChild(style);
            }

            require("./scrollbar.less");
        }
    }
);
