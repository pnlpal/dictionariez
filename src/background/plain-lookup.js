import message from "./message.js";
import storage from "./storage.js";
import setting from "./setting.js";
import utils from "utils";
import parserDescs from "../resources/dict-parsers.json";
import langs from "../resources/langs.json";
import stringSimilarity from "string-similarity";
import * as OpenCC from "opencc-js/cn2t";

import localStorageCacheFactory from "./localStorageCache.js";
const { findInCache, addToCache } = localStorageCacheFactory("plain-lookup-cache", 5);

let cnConverter = null;
const convertCn2T = (result) => {
    if (!cnConverter) {
        cnConverter = OpenCC.Converter({ from: "cn", to: "tw" });
    }
    result.defs?.forEach(({ def }) => def?.forEach((text, i) => (def[i] = cnConverter(text))));
    result.w = cnConverter(result.w);
};

const setEnglishProns = (result) => {
    if (!result.prons) {
        result.prons = [];
    }
    if (!result.prons.find((n) => n.type === "ame")) {
        result.prons.push({ type: "ame", symbol: "US", synthesis: "en-US" });
    }
    if (!result.prons.find((n) => n.type === "bre")) {
        result.prons.push({ type: "bre", symbol: "UK", synthesis: "en-GB" });
    }
};

export default {
    checkTypeOfSupport(w, detectedLangInContext = "") {
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

        // Only allow letters (any language), hyphens, and spaces
        // \p{L}: any kind of letter from any language
        // \p{M}: any kind of combining mark (accents, diacritics, etc.)
        if (!/^[\p{L}\p{M}]+([ -][\p{L}\p{M}]+)*$/u.test(w)) return;

        const possibleLangs = this.checkLangs(w, detectedLangInContext);
        if (this.checkType(w, possibleLangs)) {
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

    checkLangs(w, detectedLangInContext = "") {
        const results = [];
        if (detectedLangInContext) {
            for (const lang in langs) {
                const langConfig = langs[lang];
                if (
                    detectedLangInContext == langConfig.symbol ||
                    langConfig.synthesis?.startsWith(detectedLangInContext)
                ) {
                    let regex = langConfig.regex;
                    if (lang === "English") {
                        // Allow accented characters for borrowed words in English context
                        regex = langConfig.accentedRegex;
                    }
                    if (w.match(new RegExp(regex, "ug"))?.length === w.length) {
                        if (this.isLangDisabled(lang)) {
                            return [];
                        }
                        results.push(lang);
                    }
                }
            }
            if (results.length > 0) {
                return results;
            }
        }

        for (const lang in langs) {
            const langConfig = langs[lang];
            if (w.match(new RegExp(langConfig.regex, "ug"))?.length === w.length && !this.isLangDisabled(lang)) {
                results.push(lang);
            }
        }
        return results;
    },

    checkType(w, possibleLangs = []) {
        if (setting.getValue("enableLookupEnglish") && possibleLangs.includes("English")) {
            return setting.getValue("englishLookupSource"); // google, bingCN, wiktionary
        }

        for (const name in parserDescs) {
            const dictDesc = parserDescs[name];
            if (dictDesc.supportChinese) {
                if (
                    utils.isChinese(w) &&
                    setting.getValue("enableLookupChinese") &&
                    possibleLangs.includes("Chinese")
                ) {
                    return name;
                }
            }

            if (dictDesc.languages) {
                for (const lang of dictDesc.languages) {
                    if (possibleLangs.includes(lang) && !this.isLangDisabled(lang)) {
                        return name;
                    }
                }
            }
        }
    },

    fallbackDict(w, current = "google") {
        // fallback to other dict if Google failed
        for (const name in parserDescs) {
            const dictDesc = parserDescs[name];
            if (name === current) {
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
                        if (!setting.configCache.otherDisabledLanguages.includes(language) && language !== "English") {
                            setting.configCache.otherDisabledLanguages.push(language);
                        }
                    }
                } else {
                    if (
                        !this.otherSupportedLanguages.includes(language) &&
                        language !== "English" &&
                        language !== "Chinese"
                    ) {
                        // Exclude English and Chinese, as they are handled separately
                        this.otherSupportedLanguages.push(language);
                    }
                }
            });
        }

        setting.configCache.otherSupportedLanguages = this.otherSupportedLanguages;

        message.on("check text supported", ({ w, detectedLangInContext }) => {
            return this.checkTypeOfSupport(w, detectedLangInContext);
        });

        message.on("look up plain", async ({ w, s, sc, sentence, detectedLangInContext }, sender) => {
            w = w.trim();
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

            const cachedResult = await findInCache((item) => item.key === `${w} - ${detectedLangInContext}`);
            if (cachedResult) {
                return cachedResult.result;
            }
            const result = await this.parse({ tabId: sender.tab.id, w, detectedLangInContext });
            if (result && (result?.length ? result[0]?.defs?.length : result?.defs?.length)) {
                await addToCache({ key: `${w} - ${detectedLangInContext}`, result });
            }
            return result;
        });
    }, // ignore phrase

    tryGoogleWithOtherHl({ tabId, w, url, detectedLangInContext, _requests }) {
        if (url.includes("hl=en")) {
            const possibleLangs = this.checkLangs(w, detectedLangInContext);
            const parserDesc = parserDescs.google;
            for (const lang of possibleLangs) {
                if (lang !== "English" && parserDesc.languages.includes(lang)) {
                    const langDesc = langs[lang];
                    if (langDesc.synthesis) {
                        const newGoogleUrl = url.replace("hl=en", `hl=${langDesc.synthesis}`);
                        return this.parse({
                            tabId,
                            w,
                            tname: "google",
                            prevResult: null,
                            url: newGoogleUrl,
                            detectedLangInContext,
                            _requests,
                        });
                    }
                }
            }
        }
        return null;
    },

    async parse({ tabId, w, tname, prevResult, url, detectedLangInContext, _requests = [] }) {
        const possibleLangs = this.checkLangs(w, detectedLangInContext);

        tname ??= this.checkType(w, possibleLangs);
        if (!tname) {
            return;
        }
        if (_requests.length > 3) {
            console.warn("Too many fallback requests:", _requests, "for word:", w);
            return prevResult;
        }

        const dictDesc = parserDescs[tname];
        const requestWord = possibleLangs.includes("Ukrainian") ? w.replace(/\u0301/g, "") : w;
        url = (url || dictDesc.url).replace("<word>", requestWord);

        if (tname === "google" && possibleLangs.length > 0 && possibleLangs[0] !== "English" && url.includes("hl=en")) {
            // prioritize other languages over English
            const promise_ = this.tryGoogleWithOtherHl({ tabId, w, url, detectedLangInContext, _requests });
            if (promise_) {
                return promise_;
            }
        }

        const fallbackDictName = this.fallbackDict(w, tname);

        let html;
        try {
            _requests.push({ tname, url });
            html = await utils.loadHTML(url, dictDesc.credentials);
        } catch (err) {
            console.error("Failed to parse: ", url, err.message, err);

            if (fallbackDictName && !prevResult && _requests.length <= 2) {
                console.log("Fallback to ", fallbackDictName, " for word:", w);
                return this.parse({
                    tabId,
                    w,
                    tname: fallbackDictName,
                    detectedLangInContext,
                    _requests,
                });
            } else if (err.status === 404 && tname === "wiktionary") {
                if (url.includes("en.wiktionary.org") && possibleLangs.includes("Swedish")) {
                    console.log("Fallback to sv.wiktionary for word:", w);
                    return this.parse({
                        tabId,
                        w,
                        tname: "wiktionary",
                        prevResult,
                        url: url.replace(/\w+.wiktionary.org/, "sv.wiktionary.org"),
                        _requests,
                    });
                } else if (!url.includes("uk.wiktionary.org") && possibleLangs.includes("Ukrainian")) {
                    console.log("Fallback to uk.wiktionary for word:", w);
                    return this.parse({
                        tabId,
                        w,
                        tname: "wiktionary",
                        prevResult,
                        url: url.replace(/\w+.wiktionary.org/, "uk.wiktionary.org"),
                        _requests,
                    });
                } else if (possibleLangs.includes("Tajik")) {
                    console.log("Fallback to Tajik specific parser for word:", w);
                    return this.parseOtherLang(tabId, w, "Tajik", null, prevResult, _requests);
                } else if (possibleLangs.includes("Indonesian")) {
                    console.log("Fallback to Indonesian specific parser for word:", w);
                    return this.parseOtherLang(tabId, w, "Indonesian", null, prevResult, _requests);
                } else if (possibleLangs.includes("Ukrainian")) {
                    console.log("Fallback to Ukrainian specific parser for word:", w);
                    return this.parseOtherLang(tabId, w, "Ukrainian", null, prevResult, _requests);
                }
            }

            return prevResult;
        }

        const result = await utils.sendToTab(tabId, { type: "parse lookup result", html, parserDesc: dictDesc.result });
        if (result) {
            result._source = tname;
            result._url = url;
            result._requests = _requests;
        }
        // console.log "parse:", w, "from:", tname, "result:", result
        // fallback to wiktionary if google failed
        if (tname === "google" && (!result?.w || !result?.defs?.length)) {
            if (prevResult) {
                return prevResult;
            }
            const promise_ = this.tryGoogleWithOtherHl({ tabId, w, url, detectedLangInContext, _requests });
            if (promise_) {
                return promise_;
            }
            if (fallbackDictName) {
                return this.parse({ tabId, w, tname: fallbackDictName, prevResult, detectedLangInContext, _requests });
            }
        }

        // fix prons and lang for google result
        if (tname === "google" && result?.langSymbol) {
            for (const lang in langs) {
                const langConfig = langs[lang];
                if (langConfig.symbol === result.langSymbol || langConfig.aternative === result.langSymbol) {
                    result.lang = lang;
                    const detectedPron = result.prons[0];
                    detectedPron.synthesis = langConfig.synthesis;

                    if (!detectedPron.audio) {
                        detectedPron.type = langConfig.symbol;
                        detectedPron.symbol = langConfig.symbol.toUpperCase();
                    } else if (detectedPron.type === "bre") {
                        detectedPron.symbol = `${detectedPron.symbol || ""} UK`;
                        detectedPron.synthesis = "en-GB";
                        setEnglishProns(result);
                    }
                }
            }
        }

        // check other possible languages in fallback dict like wiktionary
        if (tname === "google" && possibleLangs.length > 1 && fallbackDictName && !prevResult) {
            console.log("Check other possible languages in fallback dict for word:", w, possibleLangs);
            return this.parse({
                tabId,
                w,
                tname: fallbackDictName,
                prevResult: result,
                detectedLangInContext,
                _requests,
            });
        }

        // special handle of bing when look up Chinese
        if (tname === "bingCN") {
            if (utils.isChinese(w)) {
                if (setting.getValue("enableConvertCn2T")) {
                    convertCn2T(result);
                    result.prons?.push({
                        symbol: "粤",
                        type: "zh-hk",
                        synthesis: "zh-HK",
                    });
                } else {
                    result.prons?.push({
                        symbol: "普",
                        type: "zh-cn",
                        synthesis: "zh-CN",
                    });
                }
            } else {
                result.prons = result.prons?.filter((n) => n.type !== "pinyin");
                result.lang ??= "English";
                // parse the second language if possible.
                const otherPossibleLangs = possibleLangs.filter((l) => l !== result?.lang);
                if (otherPossibleLangs.length && !prevResult && fallbackDictName) {
                    return this.parse({
                        tabId,
                        w,
                        tname: fallbackDictName,
                        prevResult: result.w ? result : null,
                        detectedLangInContext,
                        _requests,
                    });
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
                    targetLang._source = tname;
                    targetLang._url = url;
                    targetLang._requests = _requests;

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
                            return this.parseOtherLang(tabId, w, "Tajik", targetLang, prevResult, _requests);
                        }

                        if (targetLang.lang === "Indonesian") {
                            return this.parseOtherLang(tabId, w, "Indonesian", targetLang, prevResult, _requests);
                        }

                        multipleResult.push(targetLang);
                        await this.parseFollowWordsOnWiktionary(
                            tabId,
                            w,
                            targetLang,
                            multipleResult,
                            detectedLangInContext,
                            _requests,
                        );
                    }
                }
            }

            if (prevResult?.w) {
                multipleResult.push(prevResult);
            }

            if (multipleResult.length === 0) {
                // merge Tajik
                if (possibleLangs.includes("Tajik")) {
                    return this.parseOtherLang(tabId, w, "Tajik", null, prevResult, _requests);
                }
            }

            return multipleResult;
        }

        return result;
    },

    async parseFollowWordsOnWiktionary(tabId, w, targetLang, multipleResult, detectedLangInContext, _requests) {
        // use followWord fist, then try optionalFollowWord
        let followWords = targetLang.defs?.map((n) => n.followWord).filter((n) => n);
        followWords = [...new Set(followWords)]; // remove duplicate
        const optionalFollowWord = targetLang.defs?.[0]?.optionalFollowWord;
        const isUniqueWord = (word) =>
            word &&
            w !== word &&
            multipleResult.every((n) => n.w?.replaceAll("·", "") !== word) &&
            word.split(" ").length === 1;

        if (followWords?.length && multipleResult.length < 5) {
            if (isUniqueWord(followWords[0]) && followWords[0][0] === w[0]) {
                await this.parse({
                    tabId,
                    w: followWords[0],
                    tname: "wiktionary",
                    prevResult: multipleResult,
                    detectedLangInContext,
                    _requests,
                });
            }
            if (isUniqueWord(followWords[1]) && followWords[1][0] === w[0]) {
                await this.parse({
                    tabId,
                    w: followWords[1],
                    tname: "wiktionary",
                    prevResult: multipleResult,
                    detectedLangInContext,
                    _requests,
                });
            }
        }

        if (optionalFollowWord && multipleResult.length < 5) {
            if (isUniqueWord(optionalFollowWord) && stringSimilarity.compareTwoStrings(w, optionalFollowWord) > 0.7) {
                return await this.parse({
                    tabId,
                    w: optionalFollowWord,
                    tname: "wiktionary",
                    prevResult: multipleResult,
                    detectedLangInContext,
                    _requests,
                });
            }
        }
    },

    async parseOtherLang(tabId, w, tname, wiktionaryResult, prevResult, _requests) {
        const result = await this.parse({ tabId, w, tname, _requests });

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
