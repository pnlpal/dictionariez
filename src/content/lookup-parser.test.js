import { parseHTML } from "./lookup-parser.js";
import utils from "../utils.coffee";
import parserDesc from "../resources/dict-parsers.json";
import { expect } from "chai";

describe("lookup-parser", () => {
  it("should return an empty object for empty input", () => {
    const result = parseHTML("", {});
    chai.expect(result).to.deep.equal({});
  });

  it("should parse HTML and extract the headword", () => {
    const htmlString = `
      <div>
        <div class="hd_area">
          <div id="headword">Test Word</div>
        </div>
      </div>
    `;
    const parserDesc = {
      w: {
        selector: ".hd_area #headword",
      },
    };
    const $html = $(htmlString);
    const result = parseHTML($html, parserDesc);
    expect(result).to.deep.equal({ w: "Test Word" });
  });

  it("should parse HTML and extract the pronunciations", () => {
    const htmlString = `
    <div>
      <div class="hd_area">
        <div class="hd_prUS">/test/</div>
        <div class="hd_tf"><a href="https://testaudio1.mp3"></a></div>
        <div class="hd_pr">/testUK/</div>
        <div class="hd_tf"><a href="https://testaudio2.mp3"></a></div>
        <div class="hd_p1_1">tést</div>
      </div>
    </div>
  `;
    const parserDesc = {
      prons: [
        {
          symbol: {
            selector: ".hd_area .hd_prUS",
          },
          audio: {
            selector: ".hd_area .hd_prUS + .hd_tf",
            htmlRegex: "https:.*?\\.mp3",
          },
          type: "ame",
        },
        {
          symbol: {
            selector: ".hd_area .hd_pr",
          },
          audio: {
            selector: ".hd_area .hd_pr + .hd_tf",
            htmlRegex: "https:.*?\\.mp3",
          },
          type: "bre",
        },
        {
          symbol: {
            selector: ".hd_area .hd_p1_1",
          },
          type: "pinyin",
        },
      ],
    };
    const $html = $(htmlString);
    const result = parseHTML($html, parserDesc);
    expect(result).to.deep.equal({
      prons: [
        {
          symbol: "/test/",
          audio: "https://testaudio1.mp3",
          type: "ame",
        },
        {
          symbol: "/testUK/",
          audio: "https://testaudio2.mp3",
          type: "bre",
        },
        {
          symbol: "tést",
          type: "pinyin",
        },
      ],
    });
  });

  it("should parse HTML and extract the definitions", () => {
    const htmlString = `
    <div>
    <table id="homoid">
      <tr class="def_row">
        <td class="pos">noun</td>
        <td class="def_fl">
          <div class="de_li1">Definition 1</div>
          <div class="de_li1">Definition 2</div>
        </td>
      </tr>
      <tr class="def_row">
        <td class="pos">verb</td>
        <td class="def_fl">
          <div class="de_li1">Definition 3</div>
        </td>
      </tr>
    </table>
    </div>
  `;
    const parserDesc = {
      defs: {
        groups: "#homoid tr.def_row",
        result: {
          pos: {
            selector: ".pos",
          },
          def: {
            selector: ".def_fl>.de_li1",
            toArray: true,
          },
        },
      },
    };
    const $html = $(htmlString);
    const result = parseHTML($html, parserDesc);
    expect(result).to.deep.equal({
      defs: [
        {
          pos: "noun",
          def: ["Definition 1", "Definition 2"],
        },
        {
          pos: "verb",
          def: ["Definition 3"],
        },
      ],
    });
  });

  it("should parse HTML and extract the pronunciations using htmlRegex", () => {
    const htmlString = `
    <div>
      <div class="vmod" data-topic="test" data-hveid="testid">
        <span>Test Pronunciation</span>
      </div>
    </div>
  `;
    const parserDesc = {
      prons: [
        {
          symbol: {
            selector: ".vmod[data-topic][data-hveid]",
            htmlRegex: "<span>([^<>]*)</span>",
            regexIndex: 1,
          },
          type: "unknow",
        },
      ],
    };
    const $html = $(htmlString);
    const result = parseHTML($html, parserDesc);
    expect(result).to.deep.equal({
      prons: [
        {
          symbol: "Test Pronunciation",
          type: "unknow",
        },
      ],
    });
  });

  it("should parse HTML and extract the definitions with array", () => {
    const htmlString = `
    <div>
      <div class="vmod">
        <div class="vmod" data-topic="test">
          <i>noun</i>
          <div data-dobid="dfn">Definition 1</div>
          <div data-dobid="dfn">Definition 2</div>
        </div>
      </div>
    </div>
  `;
    const parserDesc = {
      defs: {
        groups: ".vmod>.vmod[data-topic]",
        result: {
          pos: {
            selector: "i",
          },
          def: {
            selector: "[data-dobid='dfn']",
            toArray: true,
          },
        },
      },
    };
    const $html = $(htmlString);
    const result = parseHTML($html, parserDesc);
    expect(result).to.deep.equal({
      defs: [
        {
          pos: "noun",
          def: ["Definition 1", "Definition 2"],
        },
      ],
    });
  });

  it("should parse HTML and extract the definitions with max array", () => {
    const htmlString = `
    <div>
      <div data-tae>
        <div data-mh='-1'>
          <div>verb</div>
          <ol>
            <li>Definition 1</li>
            <li>Definition 2</li>
            <li>Definition 3</li>
          </ol>
        </div>
      </div>
    </div>
  `;
    const parserDesc = {
      defs2: {
        groups: "[data-tae]>[data-mh='-1']",
        result: {
          pos: {
            selector: "div",
          },
          def: {
            selector: "ol>li",
            max: 2,
            toArray: true,
          },
        },
      },
    };
    const $html = $(htmlString);
    const result = parseHTML($html, parserDesc);
    expect(result).to.deep.equal({
      defs2: [
        {
          pos: "verb",
          def: ["Definition 1", "Definition 2"],
        },
      ],
    });
  });

  it("should get and parse the word lecture from Bing", async () => {
    const html = await utils.loadHTML(
      "https://www.bing.com/search?q=define%20lecture"
    );
    const result = await parseHTML(html, parserDesc.bing.result);
    console.log(JSON.stringify(result, null, 2));
    expect(JSON.stringify(result, null, 2)).to.equal(
      `{
  "w": "lec·ture",
  "prons": [
    {
      "symbol": "[ˈlɛktʃə]",
      "type": "bre",
      "audio": "https://www.bing.com/th?id=ODT.135401A448B8B91B5A0CF3DB78E0386E&pid=Dictionary"
    }
  ],
  "defs": [
    {
      "pos": "noun",
      "def": [
        "an educational talk to an audience, especially one of students in a university:",
        "a long serious speech, especially one given as a scolding or reprimand:"
      ]
    },
    {
      "pos": "verb",
      "def": [
        "deliver an educational lecture or lectures:",
        "talk seriously or reprovingly to (someone):"
      ]
    }
  ]
}`
    );
  });
  it.only("should get and parse the word dynasty from Bing CN Dict", async () => {
    const html = await utils.loadHTML(
      "https://cn.bing.com/dict/search?mkt=zh-cn&q=dynasty"
    );
    const result = await parseHTML(html, parserDesc.bingCN.result);
    console.log(JSON.stringify(result, null, 2));
    expect(JSON.stringify(result, null, 2)).to.equal(
      `{
  "w": "dynasty",
  "prons": [
    {
      "symbol": "US [ˈdaɪnəsti]",
      "audio": "https://cn.bing.com/dict/mediamp3?blob=audio%2Ftom%2Ffe%2F8c%2FFE8C4738352470D5F2099A7A016F934C.mp3",
      "type": "ame"
    },
    {
      "symbol": "UK [ˈdɪnəsti]",
      "audio": "https://cn.bing.com/dict/mediamp3?blob=audio%2Fgeorge%2Ffe%2F8c%2FFE8C4738352470D5F2099A7A016F934C.mp3",
      "type": "bre"
    },
    {
      "symbol": "US [ˈdaɪnəsti] UK [ˈdɪnəsti]",
      "type": "pinyin"
    }
  ],
  "defs": [
    {
      "pos": "n.",
      "def": [
        "1.a family whose members rule a country or region for a long period of time; a period of time during which members of the same family rule a country or region",
        "2.a family whose members are very successful in business or politics for a long period of time"
      ]
    }
  ],
  "defs2": [
    {
      "pos": "n.",
      "def": "代；王朝；朝代"
    },
    {
      "pos": "web",
      "def": "豪门恩怨；皇朝；大内群英"
    }
  ]
}`
    );
  });
});
