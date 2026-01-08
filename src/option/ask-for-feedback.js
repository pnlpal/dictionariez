import $ from "jquery";
import bootoast from "bootoast/dist/bootoast.min.js";
import utils from "utils";

async function getFeedbackLink() {
    if (await utils.isFirefox()) {
        const appId =
            process.env.PRODUCT === "Ordböcker"
                ? "ordböcker"
                : process.env.PRODUCT === "SidePal"
                ? "sidepal"
                : "dictionaries";
        return `https://addons.mozilla.org/firefox/addon/${appId}/reviews`;
    } else if (navigator.userAgent.includes("Edg/")) {
        const extId = chrome.runtime.id;
        return `https://microsoftedge.microsoft.com/addons/detail/${extId}/reviews`;
    } else {
        const extId = chrome.runtime.id;
        return `https://chrome.google.com/webstore/detail/${extId}/reviews`;
    }
}

function askForFeedback($scope) {
    localStorage.visitOptionsCounter = parseInt(localStorage.visitOptionsCounter || "0") + 1;
    if (localStorage.visitOptionsCounter < 3) {
        return;
    }

    if ($scope.setting.feedbackStatus !== "rated" && $scope.setting.feedbackStatus !== "feedbacked") {
        setTimeout(() => {
            bootoast.toast({
                message: `Are you happy with ${process.env.PRODUCT}? 
                                <div class="clearfix" style="margin-top: 10px;">
                                    <button class="btn btn-xs btn-default feedback-answer" data-answer="no">No</button>
                                    <button class="btn btn-xs btn-success pull-right feedback-answer" data-answer="yes">Yes</button>
                                </div>`,
                type: "info",
                position: "bottom-right",
                timeout: 10,
            });
        }, 2000);
    }

    $(document)
        .off("click", ".feedback-answer")
        .on("click", ".feedback-answer", function () {
            const isHappy = $(this).data("answer") === "yes";
            $(".bootoast").remove();

            if (isHappy) {
                bootoast.toast({
                    message: `Glad to hear that! Would you mind rating me? 
                                <br><small>It really helps a lot for an indie tool!</small>
                                <div class="clearfix" style="margin-top: 10px;">
                                    <button class="btn btn-xs btn-default feedback-action" data-answer="skip">Later</button>
                                    <button class="btn btn-xs btn-primary pull-right feedback-action" data-action="rate">Rate Now</button>
                                </div>`,
                    type: "success",
                    position: "bottom-right",
                    timeout: 20,
                });
            } else {
                bootoast.toast({
                    message: `Sorry to hear that. How can I improve?
                                <div class="clearfix" style="margin-top: 10px;">
                                    <button class="btn btn-xs btn-default feedback-action" data-action="skip">Later</button>
                                    <button class="btn btn-xs btn-primary pull-right feedback-action" data-action="feedback">Give Feedback</button>
                                </div>`,
                    type: "warning",
                    position: "bottom-right",
                    timeout: 20,
                });
            }
        });

    $(document)
        .off("click", ".feedback-action")
        .on("click", ".feedback-action", function () {
            const action = $(this).data("action");
            $(".bootoast").remove();

            if (action === "rate") {
                getFeedbackLink().then((link) => {
                    window.open(link, "_blank");
                });
                chrome.runtime.sendMessage({
                    type: "save setting",
                    key: "feedbackStatus",
                    value: "rated",
                });
            } else if (action === "feedback") {
                window.open("https://pnl.dev/category/3/feedback", "_blank");
                chrome.runtime.sendMessage({
                    type: "save setting",
                    key: "feedbackStatus",
                    value: "feedbacked",
                });
            } else {
                chrome.runtime.sendMessage({
                    type: "save setting",
                    key: "feedbackStatus",
                    value: "later",
                });
            }
        });
}

export default askForFeedback;
