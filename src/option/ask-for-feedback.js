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

// out of the way, unlike the setting-saved toasts at the top
const position = "bottom-right";

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

// the options page has facelifted, ask the users who already rated for feedback on the new design, once
function askForDesignFeedback() {
    if (setting.value.designFeedbackStatus) return;

    const saveDesignStatus = (value) => saveSetting("designFeedbackStatus", value, { silent: true });
    setTimeout(() => {
        toast("The options page got a new look! What do you think of it?", {
            type: "secondary",
            timeout: 20,
            position,
            actions: [
                { label: "No Thanks", onClick: () => saveDesignStatus("dismissed") },
                {
                    label: "Give Feedback",
                    onClick: () => {
                        window.open("https://pnl.dev/category/3/feedback", "_blank");
                        saveDesignStatus("feedbacked");
                    },
                },
            ],
        });
    }, 2000);
}

const askToRate = (message, timeout) => toast(message, { type: "primary", timeout, actions: [later, rate], position });

function twoStepsFeedback() {
    const { feedbackStatus } = setting.value;
    if (feedbackStatus === "rated" || feedbackStatus === "feedbacked") return;

    setTimeout(() => {
        toast(`Are you happy with ${product}?`, {
            type: "secondary",
            timeout: 10,
            position,
            actions: [
                {
                    label: "No",
                    onClick: () =>
                        toast("Sorry to hear that. How can I improve?", {
                            type: "tertiary",
                            timeout: 20,
                            actions: [later, feedback],
                            position,
                        }),
                },
                {
                    label: "Yes",
                    onClick: () =>
                        askToRate(
                            "Glad to hear that! Would you mind rating me? It really helps a lot for an indie tool!",
                            20,
                        ),
                },
            ],
        });
    }, 2000);
}

export default function askForFeedback() {
    localStorage.visitOptionsCounter = parseInt(localStorage.visitOptionsCounter || "0") + 1;
    if (localStorage.visitOptionsCounter < 5) return;

    if (localStorage.visitOptionsCounter > 20 && setting.value.feedbackStatus !== "rated") {
        askToRate(`Hi, as an indie tool, would you mind rating ${product}? It really helps a lot, thank you!`, 10);
    } else if (setting.value.feedbackStatus === "rated") {
        askForDesignFeedback();
    } else {
        twoStepsFeedback();
    }
}
