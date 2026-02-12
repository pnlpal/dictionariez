import utils from "utils";

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

function checkSameLang(lang1, lang2, strictRegion = true) {
    if (!lang1 || !lang2) return false;
    if (strictRegion) {
        return lang1.replace("_", "-").toLowerCase() === lang2.replace("_", "-").toLowerCase();
    } else {
        const base1 = lang1.split("-")[0];
        const base2 = lang2.split("-")[0];
        return base1 === base2;
    }
}

function findBestVoiceMatch(voices, lang, voiceName, suggestions = []) {
    const selectedVoice = voices.find((x) => voiceName && x.name === voiceName);
    if (selectedVoice) {
        return selectedVoice;
    }

    for (const suggestion of suggestions) {
        const match = voices.find((x) => x.name.includes(suggestion) && checkSameLang(x.lang, lang, true));
        if (match) {
            return match;
        }
    }
    const sameLangMatch = voices.find((x) => checkSameLang(x.lang, lang, true));
    if (sameLangMatch) {
        return sameLangMatch;
    }

    for (const suggestion of suggestions) {
        const match = voices.find((x) => x.name.includes(suggestion) && checkSameLang(x.lang, lang, false));
        if (match) {
            return match;
        }
    }

    const sameBaseLangMatch = voices.find((x) => checkSameLang(x.lang, lang, false));
    if (sameBaseLangMatch) {
        return sameBaseLangMatch;
    }

    return null;
}

export default async (lang, voiceName = "", languageName = "") => {
    if (voiceName === "__SYSTEM_DEFAULT__") {
        return null;
    }
    const voices = await getVoices();
    if (lang) {
        if (utils.isWindows()) {
            return findBestVoiceMatch(voices, lang, voiceName, ["Google", "Natural", "Microsoft Zira"]);
        } else if (utils.isMac()) {
            return findBestVoiceMatch(voices, lang, voiceName, [
                "Google",
                "Enhanced",
                "Premium",
                "Alex",
                "Ava",
                "Alva",
            ]);
        } else {
            return findBestVoiceMatch(voices, lang, voiceName, ["Google", "Enhanced", "Natural"]);
        }
    } else if (languageName) {
        const filteredVoices = voices.filter((x) => x.name.toLowerCase().includes(languageName.toLowerCase()));
        return filteredVoices.find((x) => voiceName && x.name === voiceName) || filteredVoices[0];
    }
};
