// This file is auto-copied. Do not edit directly.

// English language dictionaries
export default [
  {
    dictName: "Longman English",
    entry: "LongmanEnglish",
    windowUrl: "https://www.ldoceonline.com/dictionary/<word>",
    fixSpaceInWords: "-",
    css: "body .header, body .topslot-container, body #ad_topslot { display: none !important; } body .content { margin-top: 50px; }",
  },
  {
    dictName: "vocabulary.com",
    windowUrl: "https://www.vocabulary.com/dictionary/<word>",
    css: "header, .fixed-tray, #dictionaryNav, .top-notes { display: none; } body { margin-top: 30px; }",
  },
  {
    dictName: "Urban Dictionary",
    windowUrl: "https://www.urbandictionary.com/define.php?term=<word>",
    ttsHelperSelector: ".definition .example.italic",
    css: "body { margin-top: -95px !important; } body #urban-top-bar { display: none !important; }",
  },
  {
    dictName: "Collins English Dictionary",
    windowUrl: "https://www.collinsdictionary.com/dictionary/english/<word>",
    fixSpaceInWords: "+",
    css: "body > header { display: none !important; } body > main { padding-top: 45px !important; } body .padding-pub { display: none !important; }",
  },
  {
    dictName: "Oxford Learner",
    entry: "OxfordLearner",
    fixSpaceInWords: "-",
    windowUrl:
      "https://www.oxfordlearnersdictionaries.com/search/english/?q=<word>",
    ttsHelperSelector: "ul.examples>li",
    css: "body .mainsearch, #ox-header { display: none; }",
  },
  {
    dictName: "Cambridge English",
    windowUrl: "https://dictionary.cambridge.org/dictionary/english/<word>",
    css: "#header, #ad_topslot_a {display: none;} div.cc { margin-top: -125px !important; }",
    ttsHelperSelector: ".def-body .examp",
  },
].filter(Boolean); // Filter out null entries if a variant doesn't support the language
