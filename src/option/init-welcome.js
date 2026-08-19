"use strict";
import $ from "jquery";
import "select2";
import "select2/dist/css/select2.min.css";
import "./init-welcome.less";
import "bootstrap/js/modal.js";
import bootbox from "bootbox";
import allLangs from "../resources/langs.json";
import enableLanguages from "./enableLanguages.js";
import checkServerForDictsConflict from "./checkServerForDictsConflict.js";

const setupSelect2 = (selector, dropdownParent, setting, initialSetup) => {
    const $select = $(selector);
    if (!$select.length) return;

    // Populate options
    Object.keys(allLangs).forEach((lang) => {
        const option = new Option(lang, lang);
        if (allLangs[lang].otherNames) {
            option.setAttribute("data-keys", allLangs[lang].otherNames.join(" "));
        }
        $select.append(option);
    });

    // Calculate currently enabled languages
    const enabledLangs = [];
    if (!initialSetup) {
        enabledLangs.push(...(setting.enabledLanguages || []));
    }

    const matchCustom = (params, data) => {
        // If there are no search terms, return all of the data
        if ($.trim(params.term) === "") {
            return data;
        }

        // Do not display the item if there is no 'text' label
        if (typeof data.text === "undefined") {
            return null;
        }

        // Check if the text contains the term
        if (data.text.toLowerCase().indexOf(params.term.toLowerCase()) > -1) {
            return data;
        }

        // Check if data-keys contains the term
        const keys = $(data.element).data("keys");
        if (keys && keys.toLowerCase().indexOf(params.term.toLowerCase()) > -1) {
            return data;
        }

        // Return `null` if the term should not be displayed
        return null;
    };

    $select.val(enabledLangs);
    $select.select2({
        placeholder: "Select languages to look up",
        width: "100%",
        tags: false,
        matcher: matchCustom,
        dropdownParent: dropdownParent,
    });
};

const welcomeSetup = ({ setting, applySetting, initialSetup = true, onSuccess, onEscape }) => {
    const setLanguageSettings = async (langs = ["English"]) => {
        const enabledLanguages = await enableLanguages(langs, true);
        setting.enabledLanguages = enabledLanguages;

        if (setting.isPro) {
            const serverConflict = await checkServerForDictsConflict();
            return { serverConflict };
        }
        return {};
    };

    const success = () => {
        bootbox.dialog({
            size: "large",
            className: "modal-dialog-centered",
            title: `🎉Settings saved! You're ready to explore ${process.env.PRODUCT}.`,
            message: `
            <p>Check out our Programming N' Language Community:</p>
            <ul style="list-style:none; padding-left:0;">
                <li style="margin-bottom: 12px;">
                    <strong>
                        <a href="https://pnl.dev/category/4/dictionariez-trove" target="_blank" style="color: #fff; background: #007bff; padding: 4px 12px; border-radius: 20px; text-decoration: none; font-weight: bold; box-shadow: 0 2px 8px rgba(0,123,255,0.15); display:inline-block;">
                            📚 Dictionariez Trove
                        </a>
                    </strong>
                    <span style="display:block; margin-top:4px; color:#007bff; font-weight:500;">
                        Enhance your ${process.env.PRODUCT}, add more dictionaries to your collection.
                    </span>
                </li>
                <li style="margin-bottom: 12px;">
                    <strong>
                        <a href="https://pnl.dev/category/7/language-exchange" target="_blank"  style="color: inherit; background: none; padding: 4px 12px; border-radius: 20px; text-decoration: none; font-weight: bold; display:inline-block;">
                            🌍 Language Exchange
                        </a>
                    </strong>
                    <span  style="display:block; margin-top:4px;">
                        Ready to meet a language pal? Practice, teach, and learn together in Language Exchange!
                    </span>
                </li>
                <li style="margin-bottom: 12px;">
                    <strong>
                        <a href="https://pnl.dev/category/6/crafting" target="_blank" style="color: inherit; background: none; padding: 4px 12px; border-radius: 20px; text-decoration: none; font-weight: bold; display:inline-block;">
                            💻 Crafting
                        </a>
                    </strong>
                    <span style="display:block; margin-top:4px;">
                        Are you a developer, designer, or entrepreneur? Share your projects, code, and creative work here.
                    </span>
                </li>
                
                <li style="margin-bottom: 12px;">
                    <strong>
                        <a href="https://pnl.dev/category/3/feedback" target="_blank" style="color: inherit; background: none; padding: 4px 12px; border-radius: 20px; text-decoration: none; font-weight: bold; display:inline-block;">
                            🐞 Feedback
                        </a>
                    </strong>
                    <span style="display:block; margin-top:4px;">
                        Found a bug or have ideas to improve PNL? Share suggestions and help shape our community.
                    </span>
                </li>
            </ul>
			
			<hr style="margin: 2em 0 1em 0; border-top: 1px solid #e0e0e0;">
			<p style="text-align:center; font-weight:500; margin-bottom:1em;">
				Want to connect beyond the forum?<br>
				<strong>Join our community chats and stay in the loop!</strong>
			</p>
			<div style="display:flex; justify-content:center; gap:18px; margin-bottom:1.2em;">
                <a href="https://discord.gg/sazRac4kSa" target="_blank" rel="noopener" title="Join us on Discord" style="text-decoration:none;">
                    <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/discord.svg" alt="Discord" style="height:2em;vertical-align:middle;filter:invert(42%) sepia(98%) saturate(7492%) hue-rotate(221deg) brightness(99%) contrast(101%);margin-right:6px;">
                    <span style="font-weight:600; color:#5865F2;">Discord</span>
                </a>
                <a href="https://t.me/programmingandlanguage" target="_blank" rel="noopener" title="Join our Telegram channel" style="text-decoration:none;">
                    <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/telegram.svg" alt="Telegram" style="height:2em;vertical-align:middle;filter:invert(54%) sepia(97%) saturate(7492%) hue-rotate(176deg) brightness(99%) contrast(101%);margin-right:6px;">
                    <span style="font-weight:600; color:#229ED9;">Telegram</span>
                </a>
                <a href="https://bsky.app/profile/pnlcommunity.bsky.social" target="_blank" rel="noopener" title="Follow us on Bluesky" style="text-decoration:none;">
                    <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/bluesky.svg" alt="Bluesky" style="height:2em;vertical-align:middle;filter:invert(54%) sepia(97%) saturate(7492%) hue-rotate(176deg) brightness(99%) contrast(101%);margin-right:6px;">
                    <span style="font-weight:600; color:#229ED9;">Bluesky</span>
                </a>
				<a href="https://mastodon.social/@river_young" target="_blank" rel="noopener" title="Follow us on Mastodon" style="text-decoration:none;">
                    <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/mastodon.svg" alt="Mastodon" style="height:2em;vertical-align:middle;filter:invert(33%) sepia(99%) saturate(7492%) hue-rotate(220deg) brightness(99%) contrast(101%);margin-right:6px;">
                    <span style="font-weight:600; color:#5865F2;">Mastodon</span>
                </a>
            </div>
        `,
            buttons: {
                ok: {
                    label: "Start Exploring!",
                    className: "btn-success",
                    callback: function () {
                        applySetting();
                    },
                },
            },
        });
    };

    window.success = success;

    bootbox.dialog({
        size: "large",
        className: "ask-user-languages modal-dialog-centered",
        title: `👋 Welcome to ${process.env.PRODUCT}!`,
        message: `
        <div class="dictionariez-welcome-message">
            Thank you for installing ${process.env.PRODUCT}, your new language companion!
            <br>
            <span>
                ${process.env.PRODUCT} is open-source, see its progress on
                <a href="https://github.com/pnlpal/dictionariez" target="_blank" class="link-github">
                    <i class="fa fa-github fa-2x"
                        title="Bla Bla, it's Open Source."
                    ></i>
                </a>.
            </span>
            <br>
            <span>
                Worried about <strong>privacy</strong>? By default, ${process.env.PRODUCT} doesn't collect any of your data.
                <a href="https://github.com/pnlpal/dictionariez/blob/master/privacy.md" target="_blank" class="link-github">
                    Read more about the privacy policy here
                </a>.
            </span>
            <br><br>
            <span>
                To get started, select the languages you want to look up words in.<br>
                ${
                    process.env.PRODUCT !== "SidePal"
                        ? "You can always update your choices later in the extension options."
                        : ""
                }
                <span style="color:#1b7f3a;">Happy exploring and language learning!</span>
            </span>
        </div>
        <div class="dictionariez-mb-3">
            <label for="lookup-languages" class="dictionariez-select-label">Languages you want to look up</label>
            <select id="lookup-languages" multiple style="width:100%"></select>
        </div>
    `,
        buttons: {
            confirm: {
                label: "Save",
                className: "btn-primary",
                callback: function () {
                    const lookup = $("#lookup-languages").val();
                    if (!lookup.length) {
                        bootbox.alert("Please select at least one language to look up.");
                        return false;
                    }
                    setLanguageSettings(lookup).then(({ serverConflict }) => {
                        if (serverConflict && serverConflict.hasServerDicts) {
                            // Edge Case 6: Pro user has server dicts - ask which to keep
                            showServerDataConflict({
                                serverDicts: serverConflict.serverDicts,
                                onUseServerCopy: () => {
                                    success(lookup);
                                    if (onSuccess) onSuccess();
                                },
                                onKeepLocal: () => {
                                    success(lookup);
                                    if (onSuccess) onSuccess();
                                },
                            });
                        } else {
                            success(lookup);
                            if (onSuccess) onSuccess();
                        }
                    });
                },
            },
        },
        onShown: function () {
            const $modal = $(".bootbox.modal");
            setupSelect2("#lookup-languages", $modal, setting, initialSetup);
        },
        onEscape: function () {
            if (onEscape) {
                onEscape();
            }
        },
    });
};

// Edge Case 6: Show dialog when Pro user on new device has existing server dicts
// This is shown AFTER language selection, asking user which dicts to keep
const showServerDataConflict = ({ serverDicts, onUseServerCopy, onKeepLocal }) => {
    const dictCount = serverDicts.length;

    bootbox.dialog({
        size: "large",
        className: "server-data-conflict modal-dialog-centered",
        title: `🔄 Found Synced Dictionaries`,
        message: `
        <div class="dictionariez-welcome-message">
            <p>We found <strong>${dictCount} dictionaries</strong> synced from another device.</p>
            <p>Would you like to use your synced dictionaries or keep the ones we just created for your selected languages?</p>
            <br>
            <div style="display: flex; gap: 20px; justify-content: center;">
                <div style="flex: 1; padding: 15px; border: 2px solid #007bff; border-radius: 8px; text-align: center;">
                    <strong style="color: #007bff;">Use Synced Dicts</strong>
                    <p style="margin: 10px 0 0 0; font-size: 0.9em; color: #666;">Replace local dicts with your ${dictCount} synced dictionaries</p>
                </div>
                <div style="flex: 1; padding: 15px; border: 2px solid #28a745; border-radius: 8px; text-align: center;">
                    <strong style="color: #28a745;">Keep Local</strong>
                    <p style="margin: 10px 0 0 0; font-size: 0.9em; color: #666;">Keep the dictionaries created for your selected languages</p>
                </div>
            </div>
        </div>
        `,
        buttons: {
            useServer: {
                label: "Use Synced Dicts",
                className: "btn-primary",
                callback: async function () {
                    try {
                        // Accept server dicts - this replaces local with server
                        const utils = await import("utils");
                        await utils.default.send("accept-server-dicts", { serverDicts });
                        if (onUseServerCopy) onUseServerCopy();
                    } catch (error) {
                        console.error("Error accepting server dicts:", error);
                        bootbox.alert("Failed to sync dictionaries. Please try again.");
                    }
                },
            },
            keepLocal: {
                label: "Keep Local",
                className: "btn-success",
                callback: async function () {
                    try {
                        // Sync local dicts to server (overwrite server)
                        const utils = await import("utils");
                        await utils.default.send("sync-local-dicts-to-server");
                        if (onKeepLocal) onKeepLocal();
                    } catch (error) {
                        console.error("Error syncing local dicts:", error);
                        // Still proceed - local dicts are already saved
                        if (onKeepLocal) onKeepLocal();
                    }
                },
            },
        },
        onEscape: function () {
            // If user escapes, keep local by default
            if (onKeepLocal) onKeepLocal();
        },
    });
};

export { welcomeSetup, setupSelect2, showServerDataConflict };
window.welcomeSetup = () => welcomeSetup({ setting: window.setting, applySetting: () => {}, initialSetup: false });
