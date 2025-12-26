// This file is auto-copied. Do not edit directly.

import getTextFromNode from "./getTextFromNode.js";

const getLangAttribute = (node) => {
  if (!node || !node.getAttribute) return null;
  return node.getAttribute("data-tts-lang") || node.getAttribute("data-lang");
};

const callDetectLanguageAPI = async (text) => {
  if (
    typeof browser !== "undefined" &&
    browser.i18n &&
    browser.i18n.detectLanguage
  ) {
    // Firefox
    return await browser.i18n.detectLanguage(text);
  } else {
    // Chrome
    return await chrome.i18n.detectLanguage(text);
  }
};

/**
 * A fallback function that attempts to detect language from a DOM node.
 * It recursively checks parent nodes if detection is not reliable.
 * @param {Node} node - The DOM node to check.
 * @param {number} depth - How many parent levels to check.
 * @returns {Promise<string|null>}
 */
async function detectLanguageFromNode(node, depth) {
  if (!node || depth <= 0) {
    return null;
  }

  // Check for explicit language attribute on the node, esp for translated text.
  if (getLangAttribute(node)) {
    return getLangAttribute(node);
  }

  const text = getTextFromNode(node);
  if (!text || (text.length < 20 && depth > 1)) {
    // Require more text from nodes for reliability
    // console.log(
    //   "Not enough text for reliable detection. Going up one level...",
    //   node.parentNode
    // );
    return detectLanguageFromNode(node.parentNode, depth - 1);
  }

  const result = await callDetectLanguageAPI(text);

  if (result && result.isReliable && result.languages.length > 0) {
    return result.languages[0].language;
  } else {
    // If still not reliable, go one level up
    // console.log(
    //   "Detection still not reliable. Going up one level...",
    //   node.parentNode
    // );
    return detectLanguageFromNode(node.parentNode, depth - 1);
  }
}

export async function detectLanguage(text, node = null) {
  if (!text || text.trim().length === 0) {
    return;
  }

  // Check for explicit language attribute on the node, esp for translated text.
  if (getLangAttribute(node)) {
    return getLangAttribute(node);
  }

  try {
    const result = await callDetectLanguageAPI(text);

    if (result && result.isReliable && result.languages.length > 0) {
      return result.languages[0].language;
    }

    if (node) {
      // --- FALLBACK LOGIC ---
      // If not reliable, try again with more context from parent nodes.
      // console.log(
      //   "Initial detection not reliable. Trying parent node for more context...",
      //   node.parentNode
      // );
      return await detectLanguageFromNode(node.parentNode, 3); // Check up to 3 levels up
    }
  } catch (error) {
    console.error("Language detection failed:", error);
    return null;
  }
}
