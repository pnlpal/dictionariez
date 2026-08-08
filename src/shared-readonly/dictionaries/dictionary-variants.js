// This file is auto-copied. Do not edit directly.

// Multi-language dictionaries with language-specific variants
// Used by language-specific files to generate their dictionary lists

export const DICTIONARY_VARIANTS = {
  GoogleTranslate: {
    css: ".navbar {display: none !important;}",
    urlTemplate:
      "https://translate.google.com/?sl={code}&tl=en&text=<word>&op=translate",
    languages: {
      Spanish: { code: "es", displayName: "ES → EN" },
      French: { code: "fr", displayName: "FR → EN" },
      German: { code: "de", displayName: "DE → EN" },
      Italian: { code: "it", displayName: "IT → EN" },
      Dutch: { code: "nl", displayName: "NL → EN" },
      Swedish: { code: "sv", displayName: "SE → EN" },
      Norwegian: { code: "no", displayName: "NO → EN" },
      Danish: { code: "da", displayName: "DA → EN" },
      Polish: { code: "pl", displayName: "PL → EN" },
      Portuguese: { code: "pt", displayName: "PT → EN" },
      Turkish: { code: "tr", displayName: "TR → EN" },
      "Chinese (Mandarin)": { code: "zh-CN", displayName: "ZH → EN" },
      "Chinese (Cantonese)": { code: "zh-TW", displayName: "ZH → EN" },
      Japanese: { code: "ja", displayName: "JA → EN" },
      Korean: { code: "ko", displayName: "KO → EN" },
      Arabic: { code: "ar", displayName: "AR → EN" },
      Hindi: { code: "hi", displayName: "HI → EN" },
    },
  },
  Glosbe: {
    css: ".navbar, #topBannerContainer, #topTrufleContainer {display: none !important;}",
    ttsHelperSelector: ".translation__example p[lang='{langCode}']",
    urlTemplate: "https://glosbe.com/{code1}/{code2}/<word>",
    languages: {
      Spanish: { code1: "es", code2: "en", langCode: "es" },
      French: { code1: "fr", code2: "en", langCode: "fr" },
      German: { code1: "de", code2: "en", langCode: "de" },
      Italian: { code1: "it", code2: "en", langCode: "it" },
      Dutch: { code1: "nl", code2: "en", langCode: "nl" },
      Swedish: { code1: "sv", code2: "en", langCode: "sv" },
      Norwegian: { code1: "no", code2: "en", langCode: "no" },
      Danish: { code1: "da", code2: "en", langCode: "da" },
      Polish: { code1: "pl", code2: "en", langCode: "pl" },
      Portuguese: { code1: "pt", code2: "en", langCode: "pt" },
      Turkish: { code1: "tr", code2: "en", langCode: "tr" },
      "Chinese (Mandarin)": { code1: "zh", code2: "en", langCode: "zh" },
      "Chinese (Cantonese)": { code1: "yue", code2: "en", langCode: "yue" },
      Japanese: { code1: "ja", code2: "en", langCode: "ja" },
      Korean: { code1: "ko", code2: "en", langCode: "ko" },
      Arabic: { code1: "ar", code2: "en", langCode: "ar" },
      Hindi: { code1: "hi", code2: "en", langCode: "hi" },
      Russian: { code1: "ru", code2: "en", langCode: "ru" },
      Greek: { code1: "el", code2: "en", langCode: "el" },
      Hebrew: { code1: "he", code2: "en", langCode: "he" },
      Romanian: { code1: "ro", code2: "en", langCode: "ro" },
      Vietnamese: { code1: "vi", code2: "en", langCode: "vi" },
      Ukrainian: { code1: "uk", code2: "en", langCode: "uk" },
      Persian: { code1: "fa", code2: "en", langCode: "fa" },
      Slovak: { code1: "sk", code2: "en", langCode: "sk" },
      Hungarian: { code1: "hu", code2: "en", langCode: "hu" },
      Catalan: { code1: "ca", code2: "en", langCode: "ca" },
      Czech: { code1: "cs", code2: "en", langCode: "cs" },
      Finnish: { code1: "fi", code2: "en", langCode: "fi" },
      Malay: { code1: "ms", code2: "en", langCode: "ms" },
      Swahili: { code1: "sw", code2: "en", langCode: "sw" },
      Dutch: { code1: "nl", code2: "en", langCode: "nl" },
      Thai: { code1: "th", code2: "en", langCode: "th" },
      Tamil: { code1: "ta", code2: "en", langCode: "ta" },
      Tajik: { code1: "tg", code2: "en", langCode: "tg" },
    },
  },
  "Dict.com": {
    css: ".navbar, .menu { display: none; } body { margin-top: 50px !important; }",
    urlTemplate: "https://www.dict.com/{pair}/<word>",
    languages: {
      Spanish: { pair: "spanish-english" },
      German: { pair: "german-english" },
      French: { pair: "french-english" },
      Italian: { pair: "italian-english" },
      Portuguese: { pair: "portuguese-english" },
      Dutch: { pair: "dutch-english" },
      Swedish: { pair: "swedish-english" },
      Norwegian: { pair: "norwegian-english" },
      Danish: { pair: "danish-english" },
      Russian: { pair: "russian-english" },
      Japanese: { pair: "japanese-english" },
      Korean: { pair: "korean-english" },
      Polish: { pair: "polish-english" },
      Turkish: { pair: "turkish-english" },
      Greek: { pair: "greek-english" },
      Romanian: { pair: "romanian-english" },
      Hungarian: { pair: "hungarian-english" },
      Czech: { pair: "czech-english" },
      Finnish: { pair: "finnish-english" },
      Thai: { pair: "thai-english" },
      Vietnamese: { pair: "vietnamese-english" },
      Hindi: { pair: "hindi-english" },
      Hebrew: { pair: "hebrew-english" },
      Catalan: { pair: "catalan-english" },
      Ukrainian: { pair: "ukrainian-english" },
      Slovak: { pair: "slovak-english" },
      Bulgarian: { pair: "bulgarian-english" },
      Estonian: { pair: "estonian-english" },
      Latvian: { pair: "latvian-english" },
      Lithuanian: { pair: "lithuanian-english" },
      Serbian: { pair: "serbian-english" },
      Croatian: { pair: "croatian-english" },
    },
  },
  "The Free Dictionary": {
    css: ".trans { font-size:16px; } form.search-form, header#header { display: none !important; }",
    urlTemplate: "https://{code}.thefreedictionary.com/<word>",
    languages: {
      Spanish: { code: "es" },
      German: { code: "de" },
      Italian: { code: "it" },
      Dutch: { code: "nl" },
      French: { code: "fr" },
      Arabic: { code: "ar" },
      Russian: { code: "ru" },
      Portuguese: { code: "pt" },
      Chinese: { code: "zh" },
      Polish: { code: "pl" },
      Norwegian: { code: "no" },
      Greek: { code: "el" },
      Turkish: { code: "tr" },
    },
  },
  Reverso: {
    css: "header, app-translation-input, #top-content {display: none !important;} body {margin-top: -30px !important;}",
    urlTemplate: "https://context.reverso.net/translation/{pair}/<word>",
    languages: {
      Spanish: { pair: "spanish-english" },
      French: { pair: "french-english" },
      German: { pair: "german-english" },
      Italian: { pair: "italian-english" },
      Dutch: { pair: "dutch-english" },
      Swedish: { pair: "swedish-english" },
      Polish: { pair: "polish-english" },
      Portuguese: { pair: "portuguese-english" },
      Turkish: { pair: "turkish-english" },
      Arabic: { pair: "arabic-english" },
      Japanese: { pair: "japanese-english" },
      Korean: { pair: "korean-english" },
      Romanian: { pair: "romanian-english" },
      Ukrainian: { pair: "ukrainian-english" },
      Russian: { pair: "russian-english" },
      Hebrew: { pair: "hebrew-english" },
    },
  },
  "Bab.la": {
    fixSpaceInWords: "-",
    css: "aside, nav { display: none; }",
    urlTemplate: "https://en.bab.la/dictionary/{pair}/<word>",
    languages: {
      Spanish: { pair: "spanish-english" },
      French: { pair: "french-english" },
      German: { pair: "german-english" },
      Italian: { pair: "italian-english" },
      Dutch: { pair: "dutch-english" },
      Swedish: { pair: "swedish-english" },
      Norwegian: { pair: "norwegian-english" },
      Danish: { pair: "danish-english" },
      Finnish: { pair: "finnish-english" },
      Polish: { pair: "polish-english" },
      Portuguese: { pair: "portuguese-english" },
      Turkish: { pair: "turkish-english" },
      Arabic: { pair: "arabic-english" },
      Japanese: { pair: "japanese-english" },
      Korean: { pair: "korean-english" },
      Russian: { pair: "russian-english" },
      Greek: { pair: "greek-english" },
      Hindi: { pair: "hindi-english" },
      Czech: { pair: "czech-english" },
      Hungarian: { pair: "hungarian-english" },
      Romanian: { pair: "romanian-english" },
      Swahili: { pair: "swahili-english" },
      Vietnamese: { pair: "vietnamese-english" },
      Malay: { pair: "malay-english" },
    },
  },
};

// Helper to build a dictionary variant for a specific language
export const buildVariant = (variantKey, language) => {
  const variant = DICTIONARY_VARIANTS[variantKey];
  if (!variant || !variant.languages[language]) {
    return null;
  }

  const langConfig = variant.languages[language];
  let windowUrl = variant.urlTemplate;
  let ttsHelperSelector = variant.ttsHelperSelector;

  // Replace template variables
  Object.entries(langConfig).forEach(([key, value]) => {
    windowUrl = windowUrl.replace(`{${key}}`, value);
    if (ttsHelperSelector) {
      ttsHelperSelector = ttsHelperSelector.replace(`{${key}}`, value);
    }
  });

  const dict = {
    dictName: `${variantKey}${langConfig.displayName ? ` (${langConfig.displayName})` : ` (${language})`}`,
    windowUrl,
  };

  if (variant.css) dict.css = variant.css;
  if (variant.fixSpaceInWords) dict.fixSpaceInWords = variant.fixSpaceInWords;
  if (ttsHelperSelector) dict.ttsHelperSelector = ttsHelperSelector;

  return dict;
};
