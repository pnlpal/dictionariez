import message from "./message.js";
import storage from "./storage.js";
import setting from "./setting.js";
import utils from "utils";
import parserDescs from "../resources/dict-parsers.json";
import langs from "../resources/langs.json";
import stringSimilarity from "string-similarity";
import * as OpenCC from "opencc-js/cn2t";

let cnConverter = null;
const convertCn2T = (result) => {
    if (!cnConverter) {
        cnConverter = OpenCC.Converter({ from: "cn", to: "tw" });
    }
    result.defs?.forEach(({ def }) => def?.forEach((text, i) => (def[i] = cnConverter(text))));
    result.w = cnConverter(result.w);
};

const setEnglishProns = (result) =>
    (result.prons = result.prons.concat([
        {
            symbol: "UK",
            type: "bre",
            synthesis: "en-GB",
        },
        {
            symbol: "US",
            type: "ame",
            synthesis: "en-US",
        },
    ]));

export default {
    checkTypeOfSupport(w) {
        w = w.trim();
        if (!w) {
            return;
        }
        if (utils.isSentence(w)) {
            return;
        }

        // Remove up to two trailing punctuation marks
        w = w.replace(/[,:;'"-?!.]{1,2}$/, "");

        // Ignore single English letters (likely not a word)
        if (utils.hasEnglish(w) && w.length === 1) {
            return;
        }

        // Only allow one hyphen in the middle, no other punctuation
        // (e.g., "co-operate" is OK, "co--operate" or "co,operate" is not)
        const hyphenSplit = w.split("-");
        if (hyphenSplit.length > 2) return; // More than one hyphen

        // Only allow letters (any language) and at most one hyphen
        if (!/^[\p{L}]+(-[\p{L}]+)?$/u.test(w)) return;

        if (this.checkType(w)) {
            return w;
        }
    },

    isLangDisabled(lang) {
        if (lang === "English" && !setting.getValue("enableLookupEnglish")) {
            return true;
        }
        if (lang === "Chinese" && !setting.getValue("enableLookupChinese")) {
            return true;
        }
        return setting.getValue("otherDisabledLanguages", []).includes(lang);
    },

    checkLangs(w) {
        const results = [];
        for (const lang in langs) {
            const langConfig = langs[lang];
            if (w.match(new RegExp(langConfig.regex, "ug"))?.length === w.length && !this.isLangDisabled(lang)) {
                results.push(lang);
            }
        }
        return results;
    },

    checkType(w) {
        if (utils.isEnglish(w) && setting.getValue("enableLookupEnglish")) {
            return setting.getValue("englishLookupSource"); // google, bingCN, wiktionary
        }

        for (const name in parserDescs) {
            const dictDesc = parserDescs[name];
            if (dictDesc.supportChinese) {
                if (utils.isChinese(w) && setting.getValue("enableLookupChinese")) {
                    return name;
                }
            }

            if (dictDesc.languages) {
                for (const lang of dictDesc.languages) {
                    if (
                        w.match(new RegExp(langs[lang].regex, "ug"))?.length === w.length &&
                        !this.isLangDisabled(lang)
                    ) {
                        return name;
                    }
                }
            }
        }
    },

    fallbackDictFromGoogle(w) {
        // fallback to other dict if Google failed
        for (const name in parserDescs) {
            const dictDesc = parserDescs[name];
            if (name === "google") {
                continue;
            }
            if (dictDesc.supportChinese) {
                if (utils.isChinese(w) && setting.getValue("enableLookupChinese")) {
                    return name;
                }
            }

            if (dictDesc.languages) {
                for (const lang of dictDesc.languages) {
                    if (
                        w.match(new RegExp(langs[lang].regex, "ug"))?.length === w.length &&
                        !this.isLangDisabled(lang)
                    ) {
                        return name;
                    }
                }
            }
        }
        return "wiktionary";
    },

    init() {
        this.typeCount = Object.keys(parserDescs).length;
        this.otherSupportedLanguages = [];
        for (const dictDesc of Object.values(parserDescs)) {
            dictDesc.languages?.forEach((language) => {
                if (process.env.PRODUCT === "Ordböcker") {
                    if (["Swedish", "Norwegian", "Danish"].includes(language)) {
                        if (!this.otherSupportedLanguages.includes(language)) {
                            this.otherSupportedLanguages.push(language);
                        }
                    } else {
                        if (!setting.configCache.otherDisabledLanguages.includes(language)) {
                            setting.configCache.otherDisabledLanguages.push(language);
                        }
                    }
                } else {
                    if (!this.otherSupportedLanguages.includes(language)) {
                        this.otherSupportedLanguages.push(language);
                    }
                }
            });
        }

        setting.configCache.otherSupportedLanguages = this.otherSupportedLanguages;

        message.on("check text supported", ({ w }) => {
            return this.checkTypeOfSupport(w);
        });

        message.on("look up plain", ({ w, s, sc, sentence }, sender) => {
            w = w.trim().toLowerCase();
            if (!w) {
                return;
            }

            if (s) {
                storage.addHistory({
                    w,
                    s,
                    sc,
                    sentence,
                });
            } // ignore lookup from options page

            return this.parse(sender.tab.id, w);
        });

        message.on("get real person voice", ({ w }, sender) => {
            if (w && setting.getValue("enableRealPron")) {
                if (w.split(" ").length === 1) {
                    return this.parse(sender.tab.id, w.replaceAll("·", ""), "ldoce");
                }
            }
        });
    }, // ignore phrase

    tryGoogleWithOtherHl(tabId, w, url) {
        if (url.includes("hl=en")) {
            const possibleLangs = this.checkLangs(w);
            const parserDesc = parserDescs.google;
            for (const lang of possibleLangs) {
                if (lang !== "English" && parserDesc.languages.includes(lang)) {
                    const langDesc = langs[lang];
                    if (langDesc.synthesis) {
                        const newGoogleUrl = url.replace("hl=en", `hl=${langDesc.synthesis}`);
                        return this.parse(tabId, w, "google", null, newGoogleUrl);
                    }
                }
            }
        }
        return null;
    },

    async parse(tabId, w, tname, prevResult, url) {
        let html;
        tname ??= this.checkType(w);
        if (!tname) {
            return;
        }

        const dictDesc = parserDescs[tname];
        const possibleLangs = this.checkLangs(w);
        const requestWord = possibleLangs.includes("Ukrainian") ? w.replace(/\u0301/g, "") : w;
        url = (url || dictDesc.url).replace("<word>", requestWord);

        if (tname === "google" && possibleLangs.length > 0 && possibleLangs[0] !== "English") {
            // prioritize other languages over English
            const promise_ = this.tryGoogleWithOtherHl(tabId, w, url);
            if (promise_) {
                return promise_;
            }
        }

        try {
            html = await utils.loadHTML(url, dictDesc.credentials);
        } catch (err) {
            if (err.message === "timeout" && utils.isEnglish(w) && !prevResult) {
                return this.parse(tabId, w, tname === "wiktionary" ? "google" : "wiktionary");
            } else if (tname === "google" && !prevResult) {
                return this.parse(tabId, w, this.fallbackDictFromGoogle(w), prevResult);
            } else if (err.status === 404 && tname === "wiktionary") {
                if (url.includes("en.wiktionary.org") && possibleLangs.includes("Swedish")) {
                    return this.parse(
                        tabId,
                        w,
                        "wiktionary",
                        prevResult,
                        url.replace(/\w+.wiktionary.org/, "sv.wiktionary.org")
                    );
                } else if (!url.includes("de.wiktionary.org") && possibleLangs.includes("German")) {
                    return this.parse(
                        tabId,
                        w,
                        "wiktionary",
                        prevResult,
                        url.replace(/\w+.wiktionary.org/, "de.wiktionary.org")
                    );
                } else if (!url.includes("uk.wiktionary.org") && possibleLangs.includes("Ukrainian")) {
                    return this.parse(
                        tabId,
                        w,
                        "wiktionary",
                        prevResult,
                        url.replace(/\w+.wiktionary.org/, "uk.wiktionary.org")
                    );
                } else if (possibleLangs.includes("Tajik")) {
                    return this.parseOtherLang(tabId, w, "Tajik", null, prevResult);
                } else if (possibleLangs.includes("Indonesian")) {
                    return this.parseOtherLang(tabId, w, "Indonesian", null, prevResult);
                } else if (possibleLangs.includes("Ukrainian")) {
                    return this.parseOtherLang(tabId, w, "Ukrainian", null, prevResult);
                }
            }

            console.error("Failed to parse: ", url, err.message);
            return prevResult;
        }

        const result = await utils.sendToTab(tabId, { type: "parse lookup result", html, parserDesc: dictDesc.result });
        // console.log "parse:", w, "from:", tname, "result:", result
        // fallback to wiktionary if google failed
        if (tname === "google" && (!result?.w || !result?.defs?.length)) {
            if (prevResult) {
                return prevResult;
            }
            const promise_ = this.tryGoogleWithOtherHl(tabId, w, url);
            if (promise_) {
                return promise_;
            }
            return this.parse(tabId, w, this.fallbackDictFromGoogle(w), prevResult);
        }

        // fix prons and lang for google result
        if (tname === "google") {
            for (const lang in langs) {
                const langConfig = langs[lang];
                if (langConfig.symbol === result.langSymbol || langConfig.aternative === result.langSymbol) {
                    if (this.isLangDisabled(lang)) {
                        return this.parse(tabId, w, this.fallbackDictFromGoogle(w), prevResult);
                    }
                    result.lang = lang;
                    const detectedPron = result.prons[0];
                    if (!detectedPron.audio && result.langSymbol) {
                        detectedPron.type = langConfig.symbol;
                        detectedPron.synthesis = langConfig.synthesis;
                    } else if (detectedPron.type === "bre") {
                        detectedPron.symbol = `${detectedPron.symbol || ""} UK`;
                    }
                }
            }
        }

        // check other possible languages in fallback dict like wiktionary
        if (tname === "google" && possibleLangs.length > 1) {
            return this.parse(tabId, w, this.fallbackDictFromGoogle(w), result);
        }

        // special handle of bing when look up Chinese
        if (tname === "bingCN") {
            if (utils.isChinese(w)) {
                result.prons?.push({ synthesis: "zh-CN" });
                if (setting.getValue("enableConvertCn2T")) {
                    convertCn2T(result);
                }
            } else {
                result.prons = result.prons?.filter((n) => n.type !== "pinyin");
                result.lang ??= "English";
                // parse the second language if possible.
                const otherPossibleLangs = possibleLangs.filter((l) => l !== result?.lang);
                if (otherPossibleLangs.length && !prevResult) {
                    return this.parse(tabId, w, this.fallbackDictFromGoogle(w), result.w ? result : null);
                }
            }
        }

        if (tname === "wiktionary") {
            let multipleResult = [];
            if (Array.isArray(prevResult)) {
                multipleResult = prevResult;
            }

            if (result?.langTargets?.length > 1) {
                result.langTargets.sort(function (a, b) {
                    if (["english", "engelska"].includes(b.lang?.toLowerCase())) {
                        return -1;
                    } else if (["english", "engelska"].includes(a.lang?.toLowerCase())) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
            }

            for (let targetLang of result?.langTargets || []) {
                if (targetLang.lang) {
                    if (prevResult?.lang === targetLang.lang) {
                        continue;
                    }
                    if (prevResult?.length) {
                        // parse following words
                        if (targetLang.lang !== prevResult[0].lang) {
                            // ignore if lang is not the same.
                            continue;
                        }
                    }

                    // Special handle for Norwegian on Wiktionary
                    // see https://en.wiktionary.org/wiki/bl%C3%A5kval#Norwegian
                    if (targetLang.lang.includes("Norwegian")) {
                        if (
                            targetLang.lang.includes("Nynorsk") &&
                            result.langTargets.find((l) => l.lang.includes("Bokmål") || l.lang === "Norwegian")
                        ) {
                            continue;
                        } else {
                            targetLang.lang = "Norwegian";
                        }
                    }

                    if (targetLang.lang === "Svenska") {
                        targetLang.lang = "Swedish";
                    }

                    // Map Ukrainian heading on uk.wiktionary to English name
                    if (targetLang.lang === "Українська" || targetLang.lang === "українська") {
                        targetLang.lang = "Ukrainian";
                    }

                    if (this.isLangDisabled(targetLang.lang) || !langs[targetLang.lang]) {
                        targetLang = null;
                    } else if (targetLang.lang === "English" && !setting.getValue("enableLookupEnglish")) {
                        targetLang = null;
                    } else {
                        if (targetLang.lang === "English") {
                            setEnglishProns(targetLang);
                        } else {
                            const langConfig = langs[targetLang.lang];
                            const synthesis =
                                langConfig.synthesis != null
                                    ? langConfig.synthesis
                                    : `${langConfig.symbol}-${langConfig.symbol.toUpperCase()}`;
                            targetLang.prons[0].synthesis = synthesis;
                            if (langConfig.symbol) {
                                targetLang.prons[0].symbol = `${langConfig.symbol.toUpperCase()} ${
                                    targetLang.prons[0].symbol || ""
                                }`;
                            }
                        }

                        targetLang.w = result.w;

                        if (targetLang.lang === "Tajik") {
                            return this.parseOtherLang(tabId, w, "Tajik", targetLang, prevResult);
                        }

                        if (targetLang.lang === "Indonesian") {
                            return this.parseOtherLang(tabId, w, "Indonesian", targetLang, prevResult);
                        }

                        multipleResult.push(targetLang);
                        await this.parseFollowWordsOnWiktionary(tabId, w, targetLang, multipleResult);
                    }
                }
            }

            if (prevResult?.w) {
                multipleResult.push(prevResult);
            }

            if (multipleResult.length === 0) {
                // merge Tajik
                if (possibleLangs.includes("Tajik")) {
                    return this.parseOtherLang(tabId, w, "Tajik", null, prevResult);
                }

                const upperFirst = utils.toUpperFirst(w);
                if (!result && upperFirst !== w && html.find(`a[href='/wiki/${upperFirst}']`).get(0)) {
                    return this.parse(tabId, upperFirst, "wiktionary", prevResult);
                }
            }

            return multipleResult;
        }

        return result;
    },

    async parseFollowWordsOnWiktionary(tabId, w, targetLang, multipleResult) {
        // use followWord fist, then try optionalFollowWord
        let followWords = targetLang.defs?.map((n) => n.followWord).filter((n) => n);
        followWords = [...new Set(followWords)]; // remove duplicate
        const optionalFollowWord = targetLang.defs?.[0]?.optionalFollowWord;
        const isUniqueWord = (word) =>
            word && w !== word && multipleResult.every((n) => n.w?.replaceAll("·", "") !== word);

        if (followWords?.length && multipleResult.length < 5) {
            if (isUniqueWord(followWords[0]) && followWords[0][0] === w[0]) {
                await this.parse(tabId, followWords[0], "wiktionary", multipleResult);
            }
            if (isUniqueWord(followWords[1]) && followWords[1][0] === w[0]) {
                await this.parse(tabId, followWords[1], "wiktionary", multipleResult);
            }
        }

        if (optionalFollowWord && multipleResult.length < 5) {
            if (isUniqueWord(optionalFollowWord) && stringSimilarity.compareTwoStrings(w, optionalFollowWord) > 0.7) {
                return await this.parse(tabId, optionalFollowWord, "wiktionary", multipleResult);
            }
        }
    },

    async parseOtherLang(tabId, w, lang, wiktionaryResult, prevResult) {
        const result = await this.parse(tabId, w, lang);

        // wiktionary result is first.
        if (wiktionaryResult && result?.w !== wiktionaryResult.w) {
            return wiktionaryResult;
        }

        // merge
        if (!result?.defs?.length && wiktionaryResult?.defs) {
            result.defs = wiktionaryResult.defs;
        }

        if (!result?.prons?.[0]?.symbol && wiktionaryResult?.prons?.length) {
            result.prons = wiktionaryResult.prons;
        }

        if (prevResult) {
            return [prevResult, result];
        } else {
            return result;
        }
    },
};
