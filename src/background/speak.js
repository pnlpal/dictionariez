import utils from "utils";
import message from "./message.js";
import setting from "./setting.js";
import { playAudios, playSynthesis } from "../other/speak.js";

let creating = null; // A global promise to avoid concurrency issues

const setupOffscreenDocument = async () => {
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
    }

    creating = chrome.offscreen.createDocument({
        url: path,
        reasons: ["AUDIO_PLAYBACK"],
        justification: "Play audio of the word",
    });
    await creating;
    creating = null;
};

const sendAudioMessage = async (messageData) => {
    const isFirefox = await utils.isFirefox();

    if (!isFirefox) {
        chrome.runtime.sendMessage({
            type: "speak",
            ...messageData,
        });
    } else {
        // Handle Firefox-specific audio playback
        if (messageData.ameSrc || messageData.breSrc) {
            playAudios([messageData.ameSrc, messageData.breSrc].filter(Boolean));
        }
        if (messageData.otherSrc) {
            playAudios([messageData.otherSrc]);
        }
        if (messageData.synthesisObj) {
            playSynthesis(messageData.synthesisObj);
        }
    }
};

export default {
    init() {
        message.on("play audios", async ({ w, ameSrc, breSrc, otherSrc, synthesis, checkSetting, synthesisObj }) => {
            const isFirefox = await utils.isFirefox();

            if (!isFirefox) {
                await setupOffscreenDocument();
            }

            // Apply audio settings if requested
            if (checkSetting) {
                if (!setting.getValue("enableAmeAudio")) {
                    ameSrc = null;
                }
                if (!setting.getValue("enableBreAudio")) {
                    breSrc = null;
                }
            }

            // Play main audio sources (American and British English)
            if (ameSrc || breSrc) {
                await sendAudioMessage({ w, ameSrc, breSrc, synthesis });
            }

            // Play other language audio
            if (otherSrc) {
                await sendAudioMessage({ w, otherSrc, synthesis });
            }

            // Play synthesized speech
            if (synthesisObj) {
                await sendAudioMessage({ synthesisObj });
            }
        });
    },
};
