import getDefaultSynthesisVoice from "./getDefaultSynthesisVoice.js";

function promisifiedTimeout(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function playAudios(urls) {
    if (!urls || !urls.length) {
        return;
    }

    const _checkEnd = async (audio, n = 0) => {
        if (audio.ended) {
            return true;
        }
        if (n >= 100) {
            console.warn("Audio playback timeout!");
            return true;
        }
        await promisifiedTimeout(100);
        return _checkEnd(audio, n + 1);
    };

    const _play = (url) => {
        return new Promise((resolve, reject) => {
            if (!url) {
                resolve();
            }

            let audio = new Audio(url);
            audio.oncanplay = () => {
                audio.play();
            };
            audio.onerror = (error) => {
                console.error("Audio playback error:", url, error);
                reject(error);
            };
            audio.onabort = () => {
                console.warn("Audio playback aborted!");
                resolve();
            };
            _checkEnd(audio).then(resolve);
        });
    };

    for (let url of urls) {
        if (url) {
            await _play(url);
        }
    }
}

async function playSynthesis({ text, lang, name, voice } = {}) {
    if (!text) {
        return;
    }

    let msg = new SpeechSynthesisUtterance();
    msg.text = text;
    if (lang) {
        msg.lang = lang;
    }
    const voiceName = voice?.name || voice; // voice can be either a string or an object with a name property
    const v = await getDefaultSynthesisVoice(lang, voiceName, name);
    if (v) {
        msg.voice = v;
    }

    console.log("speak", lang || name, " - ", text, ", voice: ", v?.name, " - ", v?.lang);
    window.speechSynthesis.speak(msg);
}

if (!navigator.userAgent.includes("Gecko/")) {
    // not Firefox, Firefox doesn't support offscreen.
    chrome.runtime.onMessage.addListener(({ type, w, ameSrc, breSrc, otherSrc, synthesis, synthesisObj }) => {
        if (type === "speak") {
            playAudios([ameSrc, breSrc, otherSrc]).catch(() => {
                // fallback to synthesis if audio playback fails
                if (w) {
                    console.warn("Audio playback failed, falling back to synthesis.", w, synthesis);
                    playSynthesis({ text: w, lang: synthesis });
                }
            });
            playSynthesis(synthesisObj);
        }
    });
}

export { playAudios, playSynthesis };
