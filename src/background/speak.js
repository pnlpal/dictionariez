import utils from "utils";
import message from "./message.js";
import setting from "./setting.js";
import { playAudios, playSynthesis } from "../other/speak.js";

let creating = null; // A global promise to avoid concurrency issues

const setupOffscreenDocument = async function () {
    const path = "offscreen.html";
    const offscreenUrl = chrome.runtime.getURL(path);
    const existingContexts = await chrome.runtime.getContexts({
        contextTypes: ["OFFSCREEN_DOCUMENT"],
        documentUrls: [offscreenUrl],
    });

    if (existingContexts.length > 0) {
        return;
    }

    if (creating) {
        return await creating;
    } else {
        creating = chrome.offscreen.createDocument({
            url: path,
            reasons: ["AUDIO_PLAYBACK"],
            justification: "Play audio of the word",
        });
        await creating;
        creating = null;
    }
};

export default {
    init() {
        message.on("play audios", async ({ ameSrc, breSrc, otherSrc, checkSetting, synthesisObj }) => {
            if (!(await utils.isFirefox())) {
                await setupOffscreenDocument();
            }
            if (checkSetting) {
                if (!setting.getValue("enableAmeAudio")) {
                    ameSrc = null;
                }
                if (!setting.getValue("enableBreAudio")) {
                    breSrc = null;
                }
            }

            if (!(await utils.isFirefox())) {
                chrome.runtime.sendMessage({
                    type: "speak",
                    ameSrc,
                    breSrc,
                });
            } else {
                playAudios([ameSrc, breSrc]);
            }

            if (otherSrc) {
                if (!(await utils.isFirefox())) {
                    chrome.runtime.sendMessage({
                        type: "speak",
                        otherSrc,
                    });
                } else {
                    playAudios([otherSrc]);
                }
            }

            if (synthesisObj) {
                if (!(await utils.isFirefox())) {
                    chrome.runtime.sendMessage({
                        type: "speak",
                        synthesisObj,
                    });
                } else {
                    playSynthesis(synthesisObj);
                }
            }
        });
    },
};
