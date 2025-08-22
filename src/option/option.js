import angular from "angular";
import utils from "utils";
import debounce from "lodash/debounce";

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

import "./promote.js";

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
        }, 500);

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
        };

        chrome.runtime.sendMessage(
            {
                type: "setting",
            },
            (config) => {
                // window.setting = config
                $scope.setting = config;
                $scope.$apply();
            }
        );

        import(/* webpackChunkName: "tables" */ "./tables.js");

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
