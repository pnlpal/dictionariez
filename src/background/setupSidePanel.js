export default () => {
  if (chrome.sidePanel) {
    // Chrome
    chrome.sidePanel.setOptions({
      path: "dict.html",
    });
  }

  // // Allows users to open the side panel by clicking on the action toolbar icon
  // chrome.sidePanel
  //   .setPanelBehavior({ openPanelOnActionClick: false })
  //   .catch((error) => console.error(error));

  const RULE = {
    id: 1,
    condition: {
      initiatorDomains: [chrome.sidePanel ? chrome.runtime.id : location.host],
      requestDomains: [
        "chatgpt.com",
        "vocabulary.com",
        "deepl.com",
        "ldoceonline.com",
        "collinsdictionary.com",
        "cambridge.org",
        "youglish.com",
        "reverso.net",
        "glosbe.com",
      ],
      resourceTypes: ["sub_frame"],
    },
    action: {
      type: "modifyHeaders",
      responseHeaders: [
        { header: "X-Frame-Options", operation: "remove" },
        { header: "Frame-Options", operation: "remove" },
        { header: "Content-Security-Policy", operation: "remove" },
      ],
    },
  };
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [RULE.id],
    addRules: [RULE],
  });
};
