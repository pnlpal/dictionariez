import { setting, saveSetting, toast } from "./state.js";

const product = process.env.PRODUCT;

function getFeedbackLink() {
    if (process.env.BROWSER === "Firefox") {
        const appId = product === "Ordböcker" ? "ordböcker" : product === "SidePal" ? "sidepal" : "dictionaries";
        return `https://addons.mozilla.org/firefox/addon/${appId}/reviews`;
    } else if (navigator.userAgent.includes("Edg/")) {
        return `https://microsoftedge.microsoft.com/addons/detail/${chrome.runtime.id}`;
    }
    return `https://chrome.google.com/webstore/detail/${chrome.runtime.id}/reviews`;
}

const saveStatus = (value) => saveSetting("feedbackStatus", value, { silent: true });

const later = { label: "Later", onClick: () => saveStatus("later") };
const rate = {
    label: "Rate Now",
    onClick: () => {
        window.open(getFeedbackLink(), "_blank");
        saveStatus("rated");
    },
};
const feedback = {
    label: "Give Feedback",
    onClick: () => {
        window.open("https://pnl.dev/category/3/feedback", "_blank");
        saveStatus("feedbacked");
    },
};

const askToRate = (message, timeout) => toast(message, { type: "primary", timeout, actions: [later, rate] });

function twoStepsFeedback() {
    const { feedbackStatus } = setting.value;
    if (feedbackStatus === "rated" || feedbackStatus === "feedbacked") return;

    setTimeout(() => {
        toast(`Are you happy with ${product}?`, {
            type: "secondary",
            timeout: 10,
            actions: [
                {
                    label: "No",
                    onClick: () =>
                        toast("Sorry to hear that. How can I improve?", { type: "tertiary", timeout: 20, actions: [later, feedback] }),
                },
                {
                    label: "Yes",
                    onClick: () => askToRate("Glad to hear that! Would you mind rating me? It really helps a lot for an indie tool!", 20),
                },
            ],
        });
    }, 2000);
}

export default function askForFeedback() {
    localStorage.visitOptionsCounter = parseInt(localStorage.visitOptionsCounter || "0") + 1;
    if (localStorage.visitOptionsCounter < 5) return;

    if (localStorage.visitOptionsCounter > 20 && setting.value.feedbackStatus !== "rated") {
        askToRate(`Hi, as an indie tool, would you mind rating ${product}? It really helps a lot, thank you!`, 5);
    } else {
        twoStepsFeedback();
    }
}
