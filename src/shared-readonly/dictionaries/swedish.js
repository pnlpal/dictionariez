// This file is auto-copied. Do not edit directly.

// Swedish language dictionaries (from dictionariez ordböcker)
export default [
  {
    dictName: "svenska.se",
    windowUrl: "https://svenska.se/tre/?sok=<word>",
    css: "header, .flex.items-baseline, .w-full>h1, .w-full>.mt-4, .overflow-visible.p-4 {display: none !important;} body {margin-top: 50px !important;}",
  },
  {
    dictName: "Folkets Lexikon",
    windowUrl: "https://folkets-lexikon.csc.kth.se/folkets/#lookup&<word>",
    css: ".header { display: none !important; } body { margin-top: -50px !important; }",
    metaTag: { name: "viewport", content: "width=device-width, initial-scale=1" },
  },
  {
    dictName: "tyda.se",
    windowUrl: "https://tyda.se/search/<word>?lang%5B0%5D=en&lang%5B1%5D=sv",
    css: "#header, header, .ad, .menu, .menu_mobile {display: none !important;} #search-box {margin-left: 0 !important; z-index: 2 !important;} .page-searchresult .image-wrapper {text-align: start !important;} body {margin-top: 40px !important;}",
    ttsHelperSelector: ".sample ul>li",
  },
].filter(Boolean); // Filter out null entries if a variant doesn't support the language
