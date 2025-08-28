"use strict";
import $ from "jquery";
import "select2";
import "select2/dist/css/select2.min.css";
import "./init-welcome.less";
import "bootstrap/js/modal.js";
import bootbox from "bootbox";

import utils from "utils";
import allLangs from "../resources/langs.json";

const welcomeSetup = ({ setting, applySetting }) => {
    if (setting.otherDisabledLanguages?.length) {
        return;
    }
    const enableLanguages = async (langs = ["Swedish"]) => {
        const withEnglish = langs.includes("English");
        const withChinese = langs.includes("Chinese");
        const { enableLookupEnglish, enableLookupChinese, otherDisabledLanguages } = await utils.enableLanguages(
            Object.keys(allLangs),
            langs,
            withEnglish,
            withChinese
        );
        setting.enableLookupEnglish = enableLookupEnglish;
        setting.enableLookupChinese = enableLookupChinese;
        setting.otherDisabledLanguages = otherDisabledLanguages;
    };

    const success = () => {
        bootbox.dialog({
            size: "large",
            className: "modal-dialog-centered",
            title: "🎉Settings saved! You're ready to explore Dictionariez.",
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
                        Enhance your Dictionariez, add more dictionaries to your collection.
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

    const setupSelect2 = (selector, dropdownParent) => {
        const $select = $(selector);
        if (!$select.length) {
            return;
        }

        // Populate options from someLanguages array
        Object.keys(allLangs).forEach(function (lang) {
            $select.append(
                $("<option>", {
                    value: lang,
                    text: lang,
                })
            );
        });

        $select.select2({
            tags: false,
            placeholder: "Select languages...",
            width: "resolve",
            dropdownParent: dropdownParent,
        });
    };

    bootbox.dialog({
        size: "large",
        className: "ask-user-languages modal-dialog-centered",
        title: "👋 Welcome to Dictionariez!",
        message: `
        <div class="dictionariez-welcome-message">
            We're delighted to have you here! 
            <br>
            <span>
                Your all-in-one tool for looking up words and exploring languages with ease.<br>
                Dictionariez is open-source, see our progress on
                <a href="https://github.com/pnlpal/dictionariez" target="_blank" class="link-github">
                    <i class="fa fa-github fa-2x"
                        title="Bla Bla, it's Open Source."
                    ></i>
                </a>.
            </span>
            <br><br>
            <span>
                To get started, select the languages you want to look up words in.<br>
                You can always update your choices later in the extension options.<br>
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
                    enableLanguages(lookup).then(() => {
                        // Save the user's lookup languages here (e.g., via AJAX or local storage)
                        // $.ajax({ ... });
                        success(lookup);
                    });
                },
            },
        },
        onShown: function () {
            const $modal = $(".bootbox.modal");
            setupSelect2("#lookup-languages", $modal);
        },
    });
};

export default welcomeSetup;
window.welcomeSetup = () => welcomeSetup({ setting: {}, applySetting: () => {} });
