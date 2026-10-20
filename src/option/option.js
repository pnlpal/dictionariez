import "beercss/dist/cdn/beer.min.css";
import "./options.css";
import { h, render } from "preact";
import utils from "utils";
import { setting, user, loadSetting, loadHistory, loadDicts, bravo } from "./state.js";
import { applyTheme } from "./theme.js";
import { fetchUserProfile, reloadOnLoginStatusChange } from "./user-profile.js";
import { openWelcome, openDictsConflict } from "./sections/Welcome.jsx";
import { openWhatsNew, WHATS_NEW_RELEASE } from "./sections/WhatsNew.jsx";
import askForFeedback from "./ask-for-feedback.js";
import App from "./App.jsx";

import(/* webpackChunkName: "inject-options" */ "../content/inject.js");

document.title = `Options - ${process.env.PRODUCT}`;

const setupDevFunctions = () => {
    console.log(`\
.--.        .
|   : o    _|_   o                    o
|   | .  .-.|    .  .-. .--. .-.  .--..  .-. ---.
|   ; | (   |    | (   )|  |(   ) |   | (.-'  .'
'--'-' \`-\`-'\`-'-' \`-\`-' '  \`-\`-'\`-' -' \`-\`--''---

Welcome to dictionariez!
To make your own dictionary, click "New dict" in the Dictionaries section, or use the function "addDict" to add/change a dict to your dictionary list.
For example:

addDict({
  "dictName": "Google Image",
  "windowUrl": "https://www.google.com/search?tbm=isch&q=<word>",
  "css": "c-wiz[jsdata='deferred-i3']>div:first-child {display: none;} body {margin-top: 50px !important;}"
})

And use "allDicts" to access all the dicts in your collection.

Read more here: https://pnl.dev/topic/52/help-more-dictionaries-needed
\
`);
    window.addDict = window.addExtraDict = async (dict) => {
        await utils.send("dictionary-add", { dict });
        await loadDicts();
        bravo();
    };
    window.welcomeSetup = () => openWelcome({ initialSetup: false });
};

const loadTables = async () => {
    loadHistory();
    const { serverDictsConflict } = await loadDicts();
    if (serverDictsConflict) {
        openDictsConflict({ ...serverDictsConflict, onDone: loadDicts });
    }
};

const init = async () => {
    const config = await loadSetting();
    await applyTheme(config.themeMode);

    render(h(App), document.getElementById("app"));
    // in order to display the page after css loaded.
    document.body.classList.remove("loading");

    if (!config.enabledLanguages?.length) {
        // Fresh install - show language selection first
        // Server conflict check happens AFTER language selection completes
        openWelcome({ initialSetup: true, onDone: loadTables });
    } else {
        loadTables();
    }

    fetchUserProfile().then((u) => {
        user.value = u;
        if (u.loggedIn) setting.value = { ...setting.value, isPro: u.isPro };
        reloadOnLoginStatusChange(u.loggedIn);
    });

    // Opened by the background after an update: introduce what's new instead of asking for feedback
    const justUpdated = new URLSearchParams(location.search).has("updated");
    if (justUpdated && config.enabledLanguages?.length && config.whatsNewShown !== WHATS_NEW_RELEASE) {
        openWhatsNew();
    } else {
        askForFeedback();
    }
    setupDevFunctions();
};

init();
