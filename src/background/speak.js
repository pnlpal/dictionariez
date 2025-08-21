/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
import utils from "utils";
import message from "./message.js";
import setting from "./setting.js";
import { playAudios, playSynthesis } from "../other/speak.js";

let creating = null;  // A global promise to avoid concurrency issues

const setupOffscreenDocument = async function() {
    const path = 'offscreen.html';
    const offscreenUrl = chrome.runtime.getURL(path);
    const existingContexts = await chrome.runtime.getContexts({
        contextTypes: ['OFFSCREEN_DOCUMENT'],
        documentUrls: [offscreenUrl]
    });

    if (existingContexts.length > 0) {
        return;
    }
    
    if (creating) {
        return await creating;
    } else { 
        creating = chrome.offscreen.createDocument({
            url: path,
            reasons: ['AUDIO_PLAYBACK'],
            justification: 'Play audio of the word',
        });
        await creating;
        return creating = null;
    }
};
    
export default ({
    init() {
        return message.on('play audios', async function({ ameSrc, breSrc, otherSrc, checkSetting, synthesisObj}) {
            if (!await utils.isFirefox()) { 
                await setupOffscreenDocument();
            }
            if (checkSetting) { 
                if (!setting.getValue('enableAmeAudio')) {
                    ameSrc = null;
                }
                if (!setting.getValue('enableBreAudio')) {
                    breSrc = null;
                }
            }

            if (!await utils.isFirefox()) { 
                chrome.runtime.sendMessage({
                    type: 'speak',
                    ameSrc,
                    breSrc 
                });
            } else { 
                playAudios([ameSrc, breSrc]);
            }
            
            if (otherSrc) {
                if (!await utils.isFirefox()) { 
                    chrome.runtime.sendMessage({
                        type: 'speak',
                        otherSrc 
                    });
                } else { 
                    playAudios([otherSrc]);
                }
            }
            
            if (synthesisObj) {
                if (!await utils.isFirefox()) { 
                    return chrome.runtime.sendMessage({
                        type: 'speak',
                        synthesisObj
                    });
                } else { 
                    return playSynthesis(synthesisObj);
                }
            }
        });
    }
                
});