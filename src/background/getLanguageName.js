import langs from "../resources/langs.json";

export default (langCode) => {
    const checkSynthesisMatch = (langConfig) => {
        if (langConfig.synthesis) {
            const synthesisLang = langConfig.synthesis.split("-")[0];
            const detectedSynthesisLang = langCode.split("-")[0];
            return synthesisLang === detectedSynthesisLang;
        }
    };
    if (!langCode) {
        return;
    }

    for (const lang in langs) {
        const langConfig = langs[lang];
        if (langCode == langConfig.symbol || checkSynthesisMatch(langConfig)) {
            return lang;
        }
    }
};
