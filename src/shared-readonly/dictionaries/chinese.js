// This file is auto-copied. Do not edit directly.

// These dicts support both Simplified and Traditional Chinese, so we don't need to separate them by language variant

export default [
  {
    dictName: "MDBG Chinese English Dictionary",
    windowUrl:
      "https://www.mdbg.net/chinese/dictionary?page=worddict&wdqb=<word>",
    css: "#section_word_simple {display: none !important;} body {margin-top: -50px !important}",
  },
  {
    dictName: "Bing Dict (必应词典)",
    windowUrl: "https://cn.bing.com/dict/search?mkt=zh-cn&q=<word>", // must has mkt
    css: "body { margin-top: 50px !important; width: auto !important; min-width: auto !important; } header { display: none !important; } .contentPadding {padding-left: 10px !important;}",
  },
  {
    dictName: "Eudic 欧路",
    windowUrl: "https://dict.eudic.net/dicts/en/<word>",
    css: ".nabar, #head-bk, #head-bar {display: none !important;} body {overflow-x: hidden !important; margin-top: -40px !important;}",
  },
];
