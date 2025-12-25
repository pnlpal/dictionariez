import utils from "utils";

function promisifiedTimeout(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

function getVoices() {
    return new Promise((resolve) => {
        const voices = speechSynthesis.getVoices();
        if (voices.length > 0) {
            resolve(voices);
            return;
        }

        // Wait for voiceschanged event
        const handleVoicesChanged = () => {
            const voices = speechSynthesis.getVoices();
            if (voices.length > 0) {
                speechSynthesis.removeEventListener("voiceschanged", handleVoicesChanged);
                resolve(voices);
            }
        };

        speechSynthesis.addEventListener("voiceschanged", handleVoicesChanged);

        // Fallback timeout in case voiceschanged never fires
        setTimeout(() => {
            const voices = speechSynthesis.getVoices();
            speechSynthesis.removeEventListener("voiceschanged", handleVoicesChanged);
            resolve(voices);
        }, 1000);
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

    // Get voices each time since offscreen document gets recreated
    const voices = await getVoices();
    let v;

    if (lang) {
        if (utils.isWindows()) {
            v =
                voices.find((x) => x.name === voice) ||
                voices.find((x) => x.name.startsWith("Google") && x.lang?.startsWith(lang)) || // Google first
                voices.find((x) => x.name.includes("Natural") && x.lang?.startsWith(lang)) || // Windows Neural voices
                voices.find((x) => x.name.startsWith("Microsoft Zira") && x.lang?.startsWith(lang)) || // Windows 10+ female
                voices.find((x) => x.name.startsWith("Microsoft David") && x.lang?.startsWith(lang)) || // Windows male
                voices.find((x) => x.name.startsWith("Microsoft Hazel") && x.lang?.startsWith(lang)) || // Windows UK
                voices.find((x) => x.lang?.startsWith(lang));
        } else if (utils.isMac()) {
            v =
                voices.find((x) => x.name === voice) ||
                voices.find((x) => x.name.startsWith("Google") && x.lang?.startsWith(lang)) || // Google first
                voices.find((x) => x.name.includes("Premium") && x.lang?.startsWith(lang)) || // Premium
                voices.find((x) => x.name.includes("Enhanced") && x.lang?.startsWith(lang)) || // Enhanced
                voices.find((x) => x.name === "Alex" && x.lang?.startsWith(lang)) || // Alex is great for English
                voices.find((x) => x.name === "Ava" && x.lang?.startsWith(lang)) || // Ava is also high quality
                voices.find((x) => x.name === "Allison" && x.lang?.startsWith(lang)) || // Good US English
                voices.find((x) => x.name === "Tom" && x.lang?.startsWith(lang)) || // Good US English male
                voices.find((x) => x.name === "Alva" && x.lang?.startsWith(lang)) || // Good Swedish
                voices.find((x) => x.name === "Oskar" && x.lang?.startsWith(lang)) || // Good Swedish
                voices.find((x) => x.name === "Daniel" && x.lang?.startsWith(lang)) || // Decent UK English
                voices.find((x) => x.name === "Samantha" && x.lang?.startsWith(lang)) || // macOS default
                voices.find((x) => x.lang?.startsWith(lang));
        } else {
            v =
                voices.find((x) => x.name === voice) ||
                voices.find((x) => x.name.startsWith("Google") && x.lang?.startsWith(lang)) ||
                voices.find((x) => x.name.includes("Enhanced") && x.lang?.startsWith(lang)) || // Enhanced voices
                voices.find((x) => x.name.includes("Natural") && x.lang?.startsWith(lang)) || // Neural/Natural voices
                voices.find((x) => x.lang?.startsWith(lang));
        }
        if (v) {
            msg.voice = v;
        }
    } else if (name) {
        v = voices.find((x) => x.name.toLowerCase().includes(name.toLowerCase()));
        if (v) {
            msg.voice = v;
        }
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
