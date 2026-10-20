// This file is auto-copied. Do not edit directly.

// Corrections of the detected source language, as { detected: corrected }.
// localStorage is scoped to the page origin, so these are remembered per site.
const LANG_CORRECTIONS_KEY = "PNLReader-translate-lang-corrections";

const getLangCorrections = () => {
  try {
    return JSON.parse(localStorage.getItem(LANG_CORRECTIONS_KEY)) || {};
  } catch {
    return {};
  }
};

export const getCorrectedLang = (detectedLang) =>
  getLangCorrections()[detectedLang] || detectedLang;

export const saveLangCorrection = (detectedLang, correctedLang) => {
  const corrections = getLangCorrections();
  if (correctedLang === detectedLang) {
    delete corrections[detectedLang];
    console.log(`Removed translation language correction for: ${detectedLang}`);
  } else {
    corrections[detectedLang] = correctedLang;
    console.log(
      `Saved translation language correction: ${detectedLang} -> ${correctedLang}`,
    );
  }
  try {
    localStorage.setItem(LANG_CORRECTIONS_KEY, JSON.stringify(corrections));
  } catch (e) {
    console.warn("Failed to save translation language correction:", e);
  }
};
