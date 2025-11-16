function removeEmojisAndSymbols(text) {
  return (
    text
      // Remove specific symbols first
      .replace(/[⚡⭐✨💫🎨👩‍💻★☆🌐🔇🔈🔉🔊]/g, "")
      // Remove more arrow and geometric symbols
      .replace(/[↑↓←→↖↗↘↙⇧⇩⇦⇨]/g, "")
      // Remove triangular symbols
      .replace(/[▲▼►◄◀▶◆◇]/g, "")
      // Remove emoji ranges
      .replace(/[\u{1F600}-\u{1F64F}]/gu, "") // Emoticons
      .replace(/[\u{1F300}-\u{1F5FF}]/gu, "") // Misc Symbols and Pictographs (includes 🔊)
      .replace(/[\u{1F680}-\u{1F6FF}]/gu, "") // Transport and Map
      .replace(/[\u{1F1E0}-\u{1F1FF}]/gu, "") // Regional indicator symbols (flags)
      .replace(/[\u{2600}-\u{26FF}]/gu, "") // Misc symbols
      .replace(/[\u{2700}-\u{27BF}]/gu, "") // Dingbats
      .replace(/[\u{1F900}-\u{1F9FF}]/gu, "") // Supplemental Symbols and Pictographs
      // Clean up extra whitespace
      .replace(/\s+/g, " ")
      .trim()
  );
}

export default (node) => {
  const textNodes = Array.from(node.childNodes).filter(
    (child) =>
      child.nodeType === Node.TEXT_NODE ||
      (child.nodeType === Node.ELEMENT_NODE &&
        !child.classList.contains("tts-speaker-icon") &&
        !child.classList.contains("pnl-reader-translate-icon") &&
        !child.classList.contains("paragraph-translator-container") &&
        child.offsetParent !== null) // Only visible elements
  );

  return removeEmojisAndSymbols(
    textNodes
      .map((n) => n.textContent.trim())
      .filter((t) => t.length > 2)
      .join(" ")
  );
};
