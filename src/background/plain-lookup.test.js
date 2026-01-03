import lookupParser from "../content/lookup-parser.js";
import utils from "utils";
import { expect } from "chai";
import enableLanguages from "../option/enableLanguages.js";

before(() => {
    lookupParser();
});
after(() => {
    enableLanguages(["Swedish"], true, true);
});

describe("background/plain-lookup", () => {
    it("should get definition of fart from both Swedish and English and Swedish comes first", async () => {
        await enableLanguages(["Swedish"]);
        const result = await utils.send("look up plain", {
            w: "fart",
        });
        expect(result.length).to.equal(2);
        expect(result[0].lang).to.equal("Swedish");
        expect(result[0].w).to.equal("fart");
        expect(result[0]._source).to.equal("wiktionary");
        expect(result[1].lang).to.equal("English");
        expect(result[1].w).to.equal("fart");
        expect(result[1]._source).to.equal("google");
    });
    it("should still get definition of fart when detected in sv from both Swedish and English and Swedish comes first", async () => {
        await enableLanguages(["Swedish"]);
        const result = await utils.send("look up plain", {
            w: "fart",
            detectedLangInContext: "sv",
        });
        expect(result.length).to.equal(2);
        expect(result[0].lang).to.equal("Swedish");
        expect(result[0].w).to.equal("fart");
        expect(result[0]._source).to.equal("wiktionary");
        expect(result[1].lang).to.equal("English");
        expect(result[1].w).to.equal("fart");
        expect(result[1]._source).to.equal("wiktionary");
    });

    it("should get definition of regeringen from Swedish and its original form", async () => {
        await enableLanguages(["Swedish"]);
        const result = await utils.send("look up plain", {
            w: "regeringen",
        });
        expect(result.length).to.equal(2);
        expect(result[0].lang).to.equal("Swedish");
        expect(result[0].w).to.equal("regeringen");
        expect(result[0].defs[0].followWord).to.equal("regering");
        expect(result[1].lang).to.equal("Swedish");
        expect(result[1].w).to.equal("regering");
    });

    it("should get definition of trots from Swedish and English (trot)", async () => {
        await enableLanguages(["Swedish"]);
        const result = await utils.send("look up plain", {
            w: "trots",
        });
        console.log(result);
        expect(result.length).to.equal(2);
        expect(result[0].lang).to.equal("Swedish");
        expect(result[0].w).to.equal("trots");
        expect(result[1].lang).to.equal("English");
        expect(result[1].w).to.equal("trot");
    });

    it("should get definition of födda from Swedish and its original form", async () => {
        await enableLanguages(["Swedish"]);
        const result = await utils.send("look up plain", {
            w: "födda",
        });
        expect(result.length).to.equal(3);
        expect(result[0].lang).to.equal("Swedish");
        expect(result[0].w).to.equal("födda");
        expect(result[0].defs[0].followWord).to.equal("född");
        expect(result[1].lang).to.equal("Swedish");
        expect(result[1].w).to.equal("född");
        expect(result[2].lang).to.equal("Swedish");
        expect(result[2].w).to.equal("föda");
    });

    it("should sort wiktionary result and put English at the end", async () => {
        await enableLanguages(["Swedish"], true, true);
        await utils.send("save setting", {
            key: "englishLookupSource",
            value: "wiktionary",
        });
        const result = await utils.send("look up plain", {
            w: "cancer",
        });
        expect(result.length).to.equal(3);
        expect(result[0].lang).to.equal("Chinese");
        expect(result[0].w).to.equal("cancer");
        expect(result[1].lang).to.equal("Swedish");
        expect(result[1].w).to.equal("cancer");
        expect(result[2].lang).to.equal("English");
        expect(result[2].w).to.equal("cancer");
        await utils.send("save setting", {
            key: "englishLookupSource",
            value: "google",
        });
    });

    it("should get definition of Lehrerin from German", async () => {
        // this word exists in both google and wiktionary but google comes first
        await enableLanguages(["German"], true);
        const result = await utils.send("look up plain", {
            w: "Lehrerin",
        });
        console.log(result);
        expect(result[0].defs.length).to.equal(1);
        expect(result[0].lang).to.equal("German");
        expect(result[0].w).to.equal("Leh·re·rin");
        expect(result[0]._source).to.equal("google");
    });
    it("should get definition of German word Vielleicht from wiktionary if detected lang is de", async () => {
        // this word exists in both google and wiktionary but wiktionary should come first if detected lang is de
        await enableLanguages(["German"], true);
        const result = await utils.send("look up plain", {
            w: "vielleicht",
            detectedLangInContext: "de",
        });
        // console.log(result);
        expect(result.length).to.equal(1);
        expect(result[0].lang).to.equal("German");
        expect(result[0].w).to.equal("vielleicht");
        expect(result[0]._source).to.equal("wiktionary");
    });
    it("shouldn't get definition of word Arabischlehrerin as it's not in dictionary", async () => {
        await enableLanguages(["German"], true);
        const result = await utils.send("look up plain", {
            w: "Arabischlehrerin",
        });
        // console.log(result);
        expect(result).to.not.exist;
    });
    it("should get definition of German Ägyptischlehrerin from wiktionary", async () => {
        await enableLanguages(["German"], true);
        const result = await utils.send("look up plain", {
            w: "Ägyptischlehrerin",
        });
        console.log(result);
        expect(result.length).to.equal(1);
        expect(result[0].lang).to.equal("German");
        expect(result[0].w).to.equal("Ägyptischlehrerin");
        expect(result[0]._source).to.equal("wiktionary");
    });
    it("should get definition of deux from French", async () => {
        // this word exists in both google and wiktionary but google comes first
        await enableLanguages(["French"], true);
        const result = await utils.send("look up plain", {
            w: "deux",
        });
        console.log(result);
        expect(result.length).to.equal(1);
        expect(result[0].defs.length).to.gte(1);
        expect(result[0].lang).to.equal("French");
        expect(result[0].w).to.equal("deux");
        expect(result[0]._source).to.equal("google");
    });
    it("should get definition of French word deux from wiktionary if detected lang is fr", async () => {
        // this word exists in both google and wiktionary but wiktionary should come first if detected lang is fr
        await enableLanguages(["French"], true);
        const result = await utils.send("look up plain", {
            w: "deux",
            detectedLangInContext: "fr",
        });
        // console.log(result);
        expect(result.length).to.equal(1);
        expect(result[0].defs.length).to.gte(1);
        expect(result[0].lang).to.equal("French");
        expect(result[0].w).to.equal("deux");
        expect(result[0]._source).to.equal("wiktionary");
    });
    it("should get definition of terzogenito from Italian", async () => {
        await enableLanguages(["Italian"], true);
        const result = await utils.send("look up plain", {
            w: "terzogenito",
        });
        // console.log(result);
        expect(result.length).to.equal(1);
        expect(result[0].defs.length).to.gte(1);
        expect(result[0].lang).to.equal("Italian");
        expect(result[0].w).to.equal("terzogenito");
    });

    it("should get definition of pie from both Spanish and English and Spanish comes first", async () => {
        await enableLanguages(["Spanish"]);
        const result = await utils.send("look up plain", {
            w: "pie",
        });
        // console.log(result);
        expect(result.length).to.gte(1);
        expect(result[0].lang).to.equal("Spanish");
        expect(result[0].w).to.equal("pie");
        expect(result[0]._source).to.equal("wiktionary");
        expect(result[1].lang).to.equal("English");
        expect(result[1].w).to.equal("pie");
        expect(result[1]._source).to.equal("google");
    });

    it("should get definition of pie from Spanish if Spanish is enabled but not English", async () => {
        await enableLanguages(["Spanish"], false);
        const result = await utils.send("look up plain", {
            w: "pie",
        });
        expect(result.length).to.gte(1);
        expect(result[0].lang).to.equal("Spanish");
        expect(result[0].w).to.equal("pie");
        expect(result[0]._source).to.equal("wiktionary");
    });

    it("should get definition of 大臣 from Japanese if Japanese is enabled but not Chinese", async () => {
        await enableLanguages(["Japanese"], false, false);
        const result = await utils.send("look up plain", {
            w: "大臣",
        });
        // console.log(result);
        expect(result.defs.length).to.be.greaterThan(0);
        expect(result.w).to.equal("大臣");
        expect(result._source).to.equal("japan");
    });
    it("should get definition of Jpananese て論 from Google as it doesn't exist in JapanDict", async () => {
        await enableLanguages(["Japanese"], false, false);
        const result = await utils.send("look up plain", {
            w: "て論",
        });
        console.log(result);
        expect(result.defs.length).to.be.greaterThan(0);
        expect(result.w).to.equal("ろん");
        expect(result._source).to.equal("google");
    });

    it("should get definition of дигар from Tajik if Tajik is enabled but not English", async () => {
        await enableLanguages(["Tajik"], false);
        const result = await utils.send("look up plain", {
            w: "дигар",
        });
        expect(result.w).to.equal("дигар");
        expect(result.prons[0].symbol).to.equal("دیگر");
    });

    // chinese 霸王
    it("should get definition of 霸王 from Chinese if Chinese is enabled", async () => {
        await enableLanguages([], true, true);
        const result = await utils.send("look up plain", {
            w: "霸王",
        });
        expect(result.w).to.equal("霸王");
    });

    // convert chinese cn to tw
    it("should get definition of 博 from Taiwan Chinese if Chinese is enabled and convertCn2T", async () => {
        await enableLanguages([], true, true);
        await utils.send("save setting", {
            key: "enableConvertCn2T",
            value: true,
        });
        const result = await utils.send("look up plain", {
            w: "博",
        });
        expect(result.w).to.equal("博");
        expect(result.defs[0].def[0].includes("豐富"));
    });

    it("should get definition of tissue from bingCN if source is from bingCN", async () => {
        await enableLanguages([], true, true);
        await utils.send("save setting", {
            key: "englishLookupSource",
            value: "bingCN",
        });
        const result = await utils.send("look up plain", {
            w: "tissue",
        });
        // console.log(result);
        expect(result.lang).to.equal("English");
        expect(result.w).to.equal("tissue");
        expect(result._source).to.equal("bingCN");

        await utils.send("save setting", {
            key: "englishLookupSource",
            value: "google",
        });
    });

    it("should shorten the definition of få to only 2 definitions", async () => {
        await enableLanguages(["Swedish"]);
        await utils.send("save setting", {
            key: "englishLookupSource",
            value: "wiktionary",
        });
        const result = await utils.send("look up plain", {
            w: "få",
        });
        expect(result[0].defs[0].pos).to.equal("adj");
        expect(result[0].defs[1].pos).to.equal("verb");
        expect(result[0].defs[1].def.length).to.equal(2);
        await utils.send("save setting", {
            key: "englishLookupSource",
            value: "google",
        });
    });

    it("should get definition of їжа from Ukrainian if Ukrainian is enabled", async () => {
        await enableLanguages(["Ukrainian"], false, false);
        const result = await utils.send("look up plain", {
            w: "їжа",
        });
        if (Array.isArray(result)) {
            expect(result.length).to.be.greaterThan(0);
            expect(result[0].lang).to.equal("Ukrainian");
            expect(result[0].w).to.equal("їжа");
        } else {
            expect(result.lang).to.equal("Ukrainian");
            expect(result.w).to.equal("їжа");
        }
    });

    it("should get definition of харчі from Ukrainian from slovnyk.ua if Ukrainian is enabled", async () => {
        await enableLanguages(["Ukrainian"], false, false);
        const result = await utils.send("look up plain", {
            w: "харчі",
        });

        expect(result.prons[0].synthesis).to.equal("uk-UA");
        expect(result.w).to.equal("харчі");
        expect(result.defs.length).to.be.greaterThan(0);
    });

    it("should get definition of Turkish word yemek if Turkish is enabled", async () => {
        await enableLanguages(["Turkish"], false, false);
        const result = await utils.send("look up plain", {
            w: "yemek",
        });
        if (Array.isArray(result)) {
            expect(result.length).to.be.greaterThan(0);
            expect(result[0].lang).to.equal("Turkish");
            expect(result[0].w).to.equal("yemek");
        } else {
            expect(result.lang).to.equal("Turkish");
            expect(result.w).to.equal("yemek");
        }
    });
    it("should get definition of Turkish word özgür if Turkish is enabled", async () => {
        await enableLanguages(["Turkish"], false, false);
        const result = await utils.send("look up plain", {
            w: "özgür",
        });
        if (Array.isArray(result)) {
            expect(result.length).to.be.greaterThan(0);
            expect(result[0].lang).to.equal("Turkish");
            expect(result[0].w).to.equal("özgür");
        } else {
            expect(result.lang).to.equal("Turkish");
            expect(result.w).to.equal("özgür");
        }
    });

    it("should get definition of Arabic word حر if Arabic is enabled", async () => {
        await enableLanguages(["Arabic"], false, false);
        const result = await utils.send("look up plain", {
            w: "حر",
        });
        if (Array.isArray(result)) {
            expect(result.length).to.be.greaterThan(0);
            expect(result[0].lang).to.equal("Arabic");
            expect(result[0].w).to.equal("حر");
        } else {
            expect(result.lang).to.equal("Arabic");
            expect(result.w).to.equal("حر");
        }
    });
});
describe("background/check words to ignore in plain lookup", () => {
    it("should ignore single letters and words with punctuation", async () => {
        await enableLanguages(["Swedish"], true, true);
        const wordsToIgnore = [
            "I",
            "co--operate",
            "co,operate",
            "won't",
            "great!!!",
            "co⊙perate",
            "привіт",
            "їжа",
            "我❤️你",
            "だいがく",
        ];
        for (const word of wordsToIgnore) {
            const result = await utils.send("check text supported", {
                w: word,
            });
            expect(result).to.not.exist;
        }
    });
    it("should accept words with at most one hyphen in the middle or strip punctuation at the end or phrase", async () => {
        await enableLanguages(["Swedish", "Japanese", "Ukrainian", "Thai"], true, true);
        const wordsToAccept = [
            { word: "co-operate", expected: "co-operate" },
            { word: "wrap up", expected: "wrap up" },
            { word: "come up with", expected: "come up with" },
            { word: "fart!!", expected: "fart" },
            { word: "fart.", expected: "fart" },
            { word: "  regeringen ", expected: "regeringen" },
            { word: "födda", expected: "födda" },
            { word: "我", expected: "我" },
            { word: "我爱你", expected: "我爱你" },
            { word: "大臣", expected: "大臣" },
            { word: "だいがく", expected: "だいがく" },
            { word: "привіт", expected: "привіт" },
            { word: "їжа", expected: "їжа" },
            { word: "ศาสตร์", expected: "ศาสตร์" },
        ];
        for (const { word, expected } of wordsToAccept) {
            const result = await utils.send("check text supported", {
                w: word,
            });
            if (expected === null) {
                expect(result).to.not.exist;
            } else {
                expect(result).to.equal(expected);
            }
        }
    });
});
