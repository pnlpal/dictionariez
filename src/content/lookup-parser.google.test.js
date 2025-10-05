import { parseHTML } from "./lookup-parser.js";
import utils from "../utils.js";
import parserDesc from "../resources/dict-parsers.json";
import { expect } from "chai";

describe("lookup-parser-google", () => {
    it("should get and parse the word lecture from Google", async () => {
        const html = await utils.loadHTML("https://www.google.com/search?hl=en&q=define+lecture", "same-origin");
        const result = await parseHTML(html, parserDesc.google.result);
        // console.log(JSON.stringify(result, null, 2));
        expect(JSON.stringify(result, null, 2)).to.equal(
            `{
  "w": "lecture",
  "langSymbol": "en",
  "prons": [
    {
      "symbol": "/ˈlɛktʃə/",
      "audio": "https://ssl.gstatic.com/dictionary/static/sounds/20220808/lecture--_gb_1.mp3",
      "type": "bre"
    }
  ],
  "defs": [
    {
      "pos": "noun",
      "def": [
        "an educational talk to an audience, especially one of students in a university.",
        "a long serious speech, especially one given as a scolding or reprimand."
      ]
    },
    {
      "pos": "verb",
      "def": [
        "deliver an educational lecture or lectures.",
        "talk seriously or reprovingly to (someone)."
      ]
    }
  ],
  "defs2": [
    {
      "pos": "noun",
      "def": [
        "föreläsning",
        "föredrag"
      ]
    },
    {
      "pos": "verb",
      "def": [
        "föreläsa",
        "hålla föreläsning"
      ]
    }
  ],
  "images": []
}`
        );
    });

    it("should get and parse the German word Lehrerin from Google", async () => {
        const html = await utils.loadHTML("https://www.google.com/search?hl=de-DE&q=define+Lehrerin", "same-origin");
        const result = await parseHTML(html, parserDesc.google.result);
        console.log(JSON.stringify(result, null, 2));
        expect(result.w).to.equal("Leh·re·rin");
        expect(result.langSymbol).to.equal("de");
        expect(result.prons[0].symbol).to.equal("/ˈleːrərɪn,Léhrerin/");
        expect(result.defs[0].pos).to.equal("subs");
        expect(result.defs[0].def[0]).to.equal("weibliche Form zu Lehrer");
    });
    it("should get and parse the Spanish word ingeniera from Google", async () => {
        const html = await utils.loadHTML("https://www.google.com/search?hl=en&q=define+ingeniera", "same-origin");
        const result = await parseHTML(html, parserDesc.google.result);
        // console.log(JSON.stringify(result, null, 2));
        expect(JSON.stringify(result, null, 2)).to.equal(
            `{
  "w": "ingeniero",
  "langSymbol": "es",
  "prons": [
    {
      "type": "bre"
    }
  ],
  "defs": [
    {
      "pos": "nomb",
      "def": [
        "Persona con titulación universitaria superior que la capacita para ejercer la ingeniería en alguna de sus ramas.",
        "Persona que discurre con ingenio las trazas y modos de conseguir o ejecutar algo."
      ]
    }
  ],
  "defs2": [
    {
      "pos": "",
      "def": [
        "ingenjör"
      ]
    }
  ],
  "images": []
}`
        );
    });

    it("should get and parse the Japanese word 事実 from Google", async () => {
        const html = await utils.loadHTML("https://www.google.com/search?hl=en&q=define+事実", "same-origin");
        const result = await parseHTML(html, parserDesc.google.result);
        // console.log(JSON.stringify(result, null, 2));
        expect(JSON.stringify(result, null, 2)).to.equal(
            `{
  "w": "じじつ",
  "langSymbol": "ja",
  "prons": [
    {
      "type": "bre"
    }
  ],
  "defs": [
    {
      "pos": null,
      "def": [
        "実際に起こった、または存する事柄。",
        "本当に。"
      ]
    }
  ],
  "defs2": [
    {
      "pos": "",
      "def": [
        "faktum"
      ]
    }
  ],
  "images": []
}`
        );
    });
});
