import getTextFromNode from "./getTextFromNode.js";

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
  if (node.getAttribute?.("data-tts-lang")) {
    return node.getAttribute("data-tts-lang");
  }

  const text = getTextFromNode(node);
  if (!text || (text.length < 20 && depth > 1)) {
    // Require more text from nodes for reliability
    return detectLanguageFromNode(node.parentNode, depth - 1);
  }

  const result = await chrome.i18n.detectLanguage(text);

  if (result && result.isReliable && result.languages.length > 0) {
    return result.languages[0].language;
  } else {
    // If still not reliable, go one level up
    return detectLanguageFromNode(node.parentNode, depth - 1);
  }
}

export async function detectLanguage(text, node = null) {
  if (!text || text.trim().length === 0) {
    return;
  }
  // On the extension's options page, chrome.i18n.detectLanguage not work properly.
  // So we skip the detection there.
  if (location.origin.includes("extension://")) {
    return "en";
  }

  // Check for explicit language attribute on the node, esp for translated text.
  if (node?.getAttribute?.("data-tts-lang")) {
    return node.getAttribute("data-tts-lang");
  }

  try {
    const result = await chrome.i18n.detectLanguage(text);

    if (result && result.isReliable && result.languages.length > 0) {
      return result.languages[0].language;
    }

    if (node) {
      // --- FALLBACK LOGIC ---
      // If not reliable, try again with more context from parent nodes.
      console.log(
        "Initial detection not reliable. Trying parent node for more context..."
      );
      return await detectLanguageFromNode(node.parentNode, 3); // Check up to 3 levels up
    }
  } catch (error) {
    console.error("Language detection failed:", error);
    return null;
  }
}
