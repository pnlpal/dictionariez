// This file is auto-copied. Do not edit directly.

import COMMON_DICTS from "./dictionaries/common.js";
import {
  DICTIONARY_VARIANTS,
  buildVariant,
} from "./dictionaries/dictionary-variants.js";
import ENGLISH_DICTS from "./dictionaries/english.js";
import SWEDISH_DICTS from "./dictionaries/swedish.js";
import CHINESE_DICTS from "./dictionaries/chinese.js";

export const DEFAULT_DICTIONARY_NAME = "Wiktionary";

// Global Wiktionary (easier for beginners)
const WIKTIONARY = {
  dictName: "Wiktionary",
  windowUrl: "https://en.m.wiktionary.org/wiki/<word>",
  css: "header {display: none !important;} main { margin-top: 35px; }",
};

// Static language-specific dictionaries map (must be static for bundler)
const LANGUAGE_ONLY_DICTS = {
  English: ENGLISH_DICTS,
  Swedish: SWEDISH_DICTS,
  Chinese: CHINESE_DICTS,
  // TODO: Add other languages as language files are created
};

const getLanguageOnlyDictionaries = (language) => {
  if (language.includes("Chinese")) {
    // Handle both Simplified and Traditional Chinese with the same dicts
    return CHINESE_DICTS;
  }
  return LANGUAGE_ONLY_DICTS[language] || [];
};

const getVariantDictionaries = (language) => {
  const variantDicts = Object.keys(DICTIONARY_VARIANTS)
    .map((variantKey) => buildVariant(variantKey, language))
    .filter(Boolean); // Filter out null entries if a variant doesn't support the language
  return variantDicts;
};

// Get dictionaries for user's selected languages
// Always returns Wiktionary first, then other dicts (deduplicated)
export const getDictionariesForLanguages = (languages) => {
  const result = [];
  const dicts = new Map(); // Use Map to deduplicate by dictName

  if (!languages || !Array.isArray(languages) || languages.length === 0) {
    return result;
  }

  // Always add global Wiktionary first
  result.push(WIKTIONARY);
  dicts.set(WIKTIONARY.dictName, WIKTIONARY);

  // Add language-specific dictionaries next
  languages.forEach((language) => {
    const langOnlyDicts = getLanguageOnlyDictionaries(language);
    if (langOnlyDicts) {
      langOnlyDicts.forEach((dict) => {
        if (!dicts.has(dict.dictName)) {
          result.push(dict);
          dicts.set(dict.dictName, dict);
        }
      });
    }

    const variantDicts = getVariantDictionaries(language);
    if (variantDicts) {
      variantDicts.forEach((dict) => {
        if (!dicts.has(dict.dictName)) {
          result.push(dict);
          dicts.set(dict.dictName, dict);
        }
      });
    }
  });

  // Add common dictionaries (universal) last
  COMMON_DICTS.forEach((dict) => {
    if (!dicts.has(dict.dictName)) {
      result.push(dict);
      dicts.set(dict.dictName, dict);
    }
  });

  return result;
};
