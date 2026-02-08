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

export default async (lang, voiceName = "", languageName = "") => {
    if (voiceName === "__SYSTEM_DEFAULT__") {
        return null;
    }
    const voices = await getVoices();
    if (lang) {
        if (utils.isWindows()) {
            return (
                voices.find((x) => voiceName && x.name === voiceName) || // Check if voice object was passed or name matches
                voices.find((x) => x.name.startsWith("Google") && x.lang?.startsWith(lang)) || // Google first
                voices.find((x) => x.name.includes("Natural") && x.lang?.startsWith(lang)) || // Windows Neural voices
                voices.find((x) => x.name.startsWith("Microsoft Zira") && x.lang?.startsWith(lang)) || // Windows 10+ female
                voices.find((x) => x.name.startsWith("Microsoft David") && x.lang?.startsWith(lang)) || // Windows male
                voices.find((x) => x.name.startsWith("Microsoft Hazel") && x.lang?.startsWith(lang)) || // Windows UK
                voices.find((x) => x.lang?.startsWith(lang))
            );
        } else if (utils.isMac()) {
            return (
                voices.find((x) => voiceName && x.name === voiceName) ||
                voices.find((x) => x.name.startsWith("Google") && x.lang?.startsWith(lang)) || // Google first
                voices.find((x) => x.name.includes("Premium") && x.lang?.startsWith(lang)) || // Premium
                voices.find((x) => x.name.includes("Enhanced") && x.lang?.startsWith(lang)) || // Enhanced
                voices.find((x) => x.name.startsWith("Alex") && x.lang?.startsWith(lang)) || // Alex is great for English
                voices.find((x) => x.name.startsWith("Ava") && x.lang?.startsWith(lang)) || // Ava is also high quality
                voices.find((x) => x.name.startsWith("Allison") && x.lang?.startsWith(lang)) || // Good US English
                voices.find((x) => x.name.startsWith("Tom") && x.lang?.startsWith(lang)) || // Good US English male
                voices.find((x) => x.name.startsWith("Alva") && x.lang?.startsWith(lang)) || // Good Swedish
                voices.find((x) => x.name.startsWith("Oskar") && x.lang?.startsWith(lang)) || // Good Swedish
                voices.find((x) => x.name.startsWith("Daniel") && x.lang?.startsWith(lang)) || // Decent UK English
                voices.find((x) => x.name.startsWith("Samantha") && x.lang?.startsWith(lang)) || // macOS default
                voices.find((x) => x.lang?.startsWith(lang))
            );
        } else {
            return (
                voices.find((x) => voiceName && x.name === voiceName) ||
                voices.find((x) => x.name.startsWith("Google") && x.lang?.startsWith(lang)) ||
                voices.find((x) => x.name.includes("Enhanced") && x.lang?.startsWith(lang)) || // Enhanced voices
                voices.find((x) => x.name.includes("Natural") && x.lang?.startsWith(lang)) || // Neural/Natural voices
                voices.find((x) => x.lang?.startsWith(lang))
            );
        }
    } else if (languageName) {
        const filteredVoices = voices.filter((x) => x.name.toLowerCase().includes(languageName.toLowerCase()));
        return filteredVoices.find((x) => voiceName && x.name === voiceName) || filteredVoices[0];
    }
};
