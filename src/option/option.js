import angular from "angular";
import utils from "utils";
import debounce from "lodash/debounce";
import $ from "jquery";
import "select2";
import "select2/dist/css/select2.min.css";

import "angular-ui-bootstrap";

import "../vendor/needsharebutton.js";
import "../vendor/needsharebutton.css";

import(/* webpackChunkName: "github-badge" */ "../vendor/github-badge.js");
import(/* webpackChunkName: "inject-options" */ "../content/inject.js");

import "bootstrap/dist/css/bootstrap.min.css";
import "../vendor/font-awesome.css";
import "./options.less";

import "angularjs-color-picker/dist/angularjs-color-picker.min.css";
import "angularjs-color-picker/dist/themes/angularjs-color-picker-bootstrap.min.css";
import "angularjs-color-picker";

import "./pnl-craft-topics.js";
import initWelcome from "./init-welcome.js";
import initUserProfile from "./user-profile.js";
import initHistoryAndDicts from "./tables.js";
import initAILanguageSelect from "./ai-language-select.js";
import bootoast from "bootoast/dist/bootoast.min.js";
import askForFeedback from "./ask-for-feedback.js";
import allLangs from "../resources/langs.json";
import enableLanguages from "./enableLanguages.js";

document.title = `Options - ${process.env.PRODUCT}`;

const dictApp = angular.module("fairyDictApp", ["ui.bootstrap", "color.picker"]);

dictApp.controller("optionCtrl", [
    "$scope",
    "$sce",
    ($scope, $sce) => {
        $scope.isSidePal = process.env.PRODUCT === "SidePal";
        $scope.isDictionariez = process.env.PRODUCT === "Dictionariez";
        $scope.asciiTitle =
            process.env.PRODUCT === "Dictionariez"
                ? require("../ascii-title.html").default
                : require(`../ascii-title.${process.env.PRODUCT.toLowerCase()}.html`).default;
        $scope.asciiTitleHtml = $sce.trustAsHtml($scope.asciiTitle);

        $scope.version = chrome.runtime.getManifest().version;
        $scope.allSK = ["", "Ctrl", "Shift", "Alt", "Meta"];
        $scope.specialKeys = ["No", "Ctrl", "Shift", "Alt", "Meta"];
        $scope.allLetters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
        $scope.allLetters.unshift("Disabled");

        $scope.extraKeys = Object.keys(utils.extraKeyMap);

        $scope.allKeys = $scope.allLetters.concat($scope.extraKeys);

        $scope.allPositions = [
            "topLeft",
            "topCenter",
            "topRight",
            "middleLeft",
            "middleCenter",
            "middleRight",
            "bottomLeft",
            "bottomCenter",
            "bottomRight",
        ];
        $scope.englishLookupSources = {
            google: "Google",
            bingCN: "Bing Dict CN",
            wiktionary: "Wiktionary",
        };

        $scope.changeKey = debounce((value, key) => {
            if (key) {
                $scope.setting[key] = value;
            } else {
                key = value;
                value = $scope.setting[key];
            }

            chrome.runtime.sendMessage({
                type: "save setting",
                key,
                value,
            });
            bootoast.toast({
                message: `Setting saved. <br><br>
                You may need to reload open web pages for the new setting to take effect.`,
                position: "top",
                type: "success",
                timeout: 2,
            });
            $scope.$apply();
        }, 100);

        $scope.toggleOtherDisabledLanguages = (lang) => {
            const idx = $scope.setting.otherDisabledLanguages.indexOf(lang);
            if (idx >= 0) {
                $scope.setting.otherDisabledLanguages.splice(idx, 1);
            } else {
                $scope.setting.otherDisabledLanguages.push(lang);
            }
            chrome.runtime.sendMessage({
                type: "save setting",
                key: "otherDisabledLanguages",
                value: $scope.setting.otherDisabledLanguages,
            });
            bootoast.toast({
                message: `Language "${lang}" has been ${idx >= 0 ? "enabled" : "disabled"}.`,
                position: "top",
                type: "success",
                timeout: 2,
            });
        };

        const initLanguageSelector = async () => {
            await utils.promisifiedTimeout(1); // Wait for the DOM to be ready
            const $select = $("#lookup-languages-options");
            if (!$select.length) return;

            // Populate options
            Object.keys(allLangs).forEach((lang) => {
                const option = new Option(lang, lang);
                if (lang === "Chinese") {
                    option.setAttribute("data-keys", "Mandarin Cantonese");
                }
                $select.append(option);
            });

            // Calculate currently enabled languages
            const enabledLangs = [];
            if ($scope.setting.enableLookupEnglish) enabledLangs.push("English");
            if ($scope.setting.enableLookupChinese) enabledLangs.push("Chinese");

            Object.keys(allLangs).forEach((lang) => {
                if (lang === "English" || lang === "Chinese") return;
                if (!$scope.setting.otherDisabledLanguages.includes(lang)) {
                    enabledLangs.push(lang);
                }
            });

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
            });

            $select.on("change", async () => {
                const selected = $select.val() || [];
                const withEnglish = selected.includes("English");
                const withChinese = selected.includes("Chinese");

                await enableLanguages(selected, withEnglish, withChinese);

                // Update local scope settings to reflect changes immediately in UI
                $scope.setting.enableLookupEnglish = withEnglish;
                $scope.setting.enableLookupChinese = withChinese;

                // Update otherDisabledLanguages for the scope
                const allKeys = Object.keys(allLangs);
                const otherDisabled = allKeys
                    .filter((l) => l !== "English" && l !== "Chinese")
                    .filter((l) => !selected.includes(l));

                $scope.setting.otherDisabledLanguages = otherDisabled;

                $scope.$apply();

                bootoast.toast({
                    message: "Language settings saved.",
                    type: "success",
                    position: "top",
                    timeout: 2,
                });
            });
        };

        chrome.runtime.sendMessage(
            {
                type: "setting",
            },
            (config) => {
                // window.setting = config
                $scope.setting = config;
                window.setting = config; // For debugging
                if (!config.otherDisabledLanguages?.length) {
                    initWelcome({ setting: $scope.setting, applySetting: $scope.$apply.bind($scope) });
                }
                initHistoryAndDicts($scope);
                initUserProfile($scope);
                initAILanguageSelect($scope);
                askForFeedback($scope);
                initLanguageSelector(); // Initialize the selector
                $scope.$apply();
            },
        );

        $scope.markColorEvent = {
            onChange(api, color, $event) {
                $scope.changeKey(color, "markColor");
            },
        };

        const setupDevFunctions = () => {
            console.log(`\
.--.        .
|   : o    _|_   o                    o
|   | .  .-.|    .  .-. .--. .-.  .--..  .-. ---.
|   ; | (   |    | (   )|  |(   ) |   | (.-'  .'
'--'-' \`-\`-'\`-'-' \`-\`-' '  \`-\`-'\`-' -' \`-\`--''---

Welcome to dictionariez!
You can use the function "addDict" to add/change a dict to your dictionary list.
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
                location.reload();
            };
        };

        setupDevFunctions();
    },
]);

const setupAppDescription = () => {
    const appDescription =
        process.env.PRODUCT === "Dictionariez"
            ? require("../description-and-badge.html").default
            : require(`../description-and-badge.${process.env.PRODUCT.toLowerCase()}.html`).default;

    document.querySelector("#app-description").innerHTML = appDescription;

    const { version } = chrome.runtime.getManifest();
    document.querySelector("#app-description .badge").innerText = `V${version}`;
};
setupAppDescription();
