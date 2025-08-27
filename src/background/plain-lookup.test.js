import lookupParser from "../content/lookup-parser.js";
import utils from "../utils.js";
import { expect } from "chai";
import allLangs from "../resources/langs.json";

const enableLanguages = async (langs = ["Swedish"], withEnglish = true, withChinese = true) => {
    const allOtherSupportedLanguages = Object.keys(allLangs).filter((l) => l !== "English" && l !== "Chinese");
    const otherDisabledLanguages = allOtherSupportedLanguages.filter((l) => !langs.includes(l));
    await utils.send("save setting", {
        key: "enableLookupEnglish",
        value: withEnglish,
    });
    await utils.send("save setting", {
        key: "enableLookupChinese",
        value: withChinese,
    });
    await utils.send("save setting", {
        key: "otherDisabledLanguages",
        value: otherDisabledLanguages,
    });
};

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
        expect(result[1].lang).to.equal("English");
        expect(result[1].w).to.equal("fart");
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
        // console.log(result);
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
        await enableLanguages(["German"], true);
        const result = await utils.send("look up plain", {
            w: "Lehrerin",
        });
        // console.log(result);
        expect(result.defs.length).to.equal(1);
        expect(result.lang).to.equal("German");
        expect(result.w).to.equal("Leh·re·rin");
    });
    it("should get definition of deux from French", async () => {
        await enableLanguages(["French"], true);
        const result = await utils.send("look up plain", {
            w: "deux",
        });
        console.log(result);
        expect(result.length).to.equal(1);
        expect(result[0].defs.length).to.equal(2);
        expect(result[0].lang).to.equal("French");
        expect(result[0].w).to.equal("deux");
    });
    it("should get definition of terzogenito from Italian", async () => {
        await enableLanguages(["Italian"], true);
        const result = await utils.send("look up plain", {
            w: "terzogenito",
        });
        console.log(result);
        expect(result.length).to.equal(1);
        expect(result[0].defs.length).to.equal(1);
        expect(result[0].lang).to.equal("Italian");
        expect(result[0].w).to.equal("terzogenito");
    });

    it("should get definition of pie from both Spanish and English and Spanish comes first", async () => {
        await enableLanguages(["Spanish"]);
        const result = await utils.send("look up plain", {
            w: "pie",
        });
        expect(result.length).to.equal(2);
        expect(result[0].lang).to.equal("Spanish");
        expect(result[0].w).to.equal("pie");
        expect(result[1].lang).to.equal("English");
        expect(result[1].w).to.equal("pie");
    });

    it("should get definition of pie from Spanish if Spanish is enabled but not English", async () => {
        await enableLanguages(["Spanish"], false);
        const result = await utils.send("look up plain", {
            w: "pie",
        });
        expect(result.length).to.equal(1);
        expect(result[0].lang).to.equal("Spanish");
        expect(result[0].w).to.equal("pie");
    });

    it("should get definition of 大臣 from Japanese if Japanese is enabled but not Chinese", async () => {
        await enableLanguages(["Japanese"], false, false);
        const result = await utils.send("look up plain", {
            w: "大臣",
        });
        expect(result.lang).to.equal("Japanese");
        expect(result.w).to.equal("だいじん");
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
        expect(result.lang).to.equal("English");
        expect(result.w).to.equal("tissue");

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
});
