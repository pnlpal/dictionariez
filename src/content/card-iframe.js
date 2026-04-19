import "./card-iframe.less";

const setupCardsPosition = () => {
    const visibleCards = Array.from(document.querySelectorAll("iframe.dictionaries-card")).filter(
        (el) => el.style.display !== "none" && getComputedStyle(el).display !== "none",
    );
    const visibleMinimalCards = visibleCards.filter((el) => el.classList.contains("dictionaries-card-minimal"));
    const hasMax = visibleCards.length !== visibleMinimalCards.length;

    let maxiCount = 0;
    let miniCount = 0;
    visibleCards.forEach((el) => {
        let bottom;
        if (el.classList.contains("dictionaries-card-minimal")) {
            miniCount += 1;
            el.style.right = "10px";

            bottom = 44 * (miniCount - 1) + 20;
            if (hasMax) {
                bottom += 220;
            }

            el.style.bottom = `${bottom}px`;
        } else {
            maxiCount += 1;
            el.style.bottom = "1px";

            const right = 201 * (maxiCount - 1) + 1;
            el.style.right = `${right}px`;
        }
    });
};

window.addEventListener(
    "message",
    (event) => {
        // chrome-extension or moz-extension
        if (event?.data?.type) {
            if (event.data.type === "toggleDropdown") {
                const iframes = document.querySelectorAll("#dictionaries-iframe, .dictionariez-iframe");
                if (event.data.open) {
                    iframes.forEach((el) => el.classList.add("dropdown-open"));
                } else {
                    iframes.forEach((el) => el.classList.remove("dropdown-open"));
                }
            } else if (event.data.type === "close-card") {
                const cards = document.querySelectorAll(".dictionaries-card-" + event.data.sys);
                cards.forEach((el) => (el.style.display = "none"));
            } else if (event.data.type === "show-card") {
                const cards = document.querySelectorAll(".dictionaries-card-" + event.data.sys);
                cards.forEach((el) => {
                    el.style.display = "";
                    if (event.data.minimal) {
                        el.classList.add("dictionaries-card-minimal");
                    } else {
                        el.classList.remove("dictionaries-card-minimal");
                    }
                });

                setupCardsPosition();
            }
        }
    },
    false,
);
