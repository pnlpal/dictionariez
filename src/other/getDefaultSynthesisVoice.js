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

function checkSameLang(lang1, lang2) {
    if (!lang1 || !lang2) return false;
    const base1 = lang1.split("-")[0];
    const base2 = lang2.split("-")[0];
    return base1 === base2;
}

export default async (lang, voiceName = "", languageName = "") => {
    if (voiceName === "__SYSTEM_DEFAULT__") {
        return null;
    }
    const voices = await getVoices();
    if (lang) {
        if (utils.isWindows()) {
            return (
                voices.find((x) => voiceName && x.name === voiceName) || // Check if voice object was passed or name matches
                voices.find((x) => x.name.startsWith("Google") && checkSameLang(x.lang, lang)) || // Google first
                voices.find((x) => x.name.includes("Natural") && checkSameLang(x.lang, lang)) || // Windows Neural voices
                voices.find((x) => x.name.startsWith("Microsoft Zira") && checkSameLang(x.lang, lang)) || // Windows 10+ female
                voices.find((x) => x.name.startsWith("Microsoft David") && checkSameLang(x.lang, lang)) || // Windows male
                voices.find((x) => x.name.startsWith("Microsoft Hazel") && checkSameLang(x.lang, lang)) || // Windows UK
                voices.find((x) => checkSameLang(x.lang, lang))
            );
        } else if (utils.isMac()) {
            return (
                voices.find((x) => voiceName && x.name === voiceName) ||
                voices.find((x) => x.name.startsWith("Google") && checkSameLang(x.lang, lang)) || // Google first
                voices.find((x) => x.name.includes("Premium") && checkSameLang(x.lang, lang)) || // Premium
                voices.find((x) => x.name.includes("Enhanced") && checkSameLang(x.lang, lang)) || // Enhanced
                voices.find((x) => x.name.startsWith("Alex") && checkSameLang(x.lang, lang)) || // Alex is great for English
                voices.find((x) => x.name.startsWith("Ava") && checkSameLang(x.lang, lang)) || // Ava is also high quality
                voices.find((x) => x.name.startsWith("Allison") && checkSameLang(x.lang, lang)) || // Good US English
                voices.find((x) => x.name.startsWith("Tom") && checkSameLang(x.lang, lang)) || // Good US English male
                voices.find((x) => x.name.startsWith("Alva") && checkSameLang(x.lang, lang)) || // Good Swedish
                voices.find((x) => x.name.startsWith("Oskar") && checkSameLang(x.lang, lang)) || // Good Swedish
                voices.find((x) => x.name.startsWith("Daniel") && checkSameLang(x.lang, lang)) || // Decent UK English
                voices.find((x) => x.name.startsWith("Samantha") && checkSameLang(x.lang, lang)) || // macOS default
                voices.find((x) => checkSameLang(x.lang, lang))
            );
        } else {
            return (
                voices.find((x) => voiceName && x.name === voiceName) ||
                voices.find((x) => x.name.startsWith("Google") && checkSameLang(x.lang, lang)) ||
                voices.find((x) => x.name.includes("Enhanced") && checkSameLang(x.lang, lang)) || // Enhanced voices
                voices.find((x) => x.name.includes("Natural") && checkSameLang(x.lang, lang)) || // Neural/Natural voices
                voices.find((x) => checkSameLang(x.lang, lang))
            );
        }
    } else if (languageName) {
        const filteredVoices = voices.filter((x) => x.name.toLowerCase().includes(languageName.toLowerCase()));
        return filteredVoices.find((x) => voiceName && x.name === voiceName) || filteredVoices[0];
    }
};
