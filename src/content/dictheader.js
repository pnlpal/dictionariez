import $ from "jquery";
import angular from "angular";
import utils from "utils";
import debounce from "lodash/debounce";

// import '../needsharebutton.js'
import "angular-ui-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "../vendor/font-awesome.css";
import "./dictheader.less";

import "./card-iframe.js";

const inFrame = window.self !== window.top;
// some ui need bootstrap, like dropdown.
const dictApp = angular.module("fairyDictApp", ["ui.bootstrap"]);

dictApp.controller("dictCtrl", [
    "$scope",
    "$sce",
    function ($scope, $sce) {
        // change Bing dictionary's title
        document.title = process.env.PRODUCT;
        const baseNode = "#fairy-dict";
        $scope.initial = true;
        $scope.inFrame = inFrame;
        $scope.querying = false;
        $scope.previous = null;
        $scope.isSidePal = process.env.PRODUCT === "SidePal";
        $scope.version = chrome.runtime.getManifest().version;
        $scope.asciiTitle =
            process.env.PRODUCT === "Dictionariez"
                ? require("../ascii-title.html").default
                : require(`../ascii-title.${process.env.PRODUCT.toLowerCase()}.html`).default;
        $scope.asciiTitleHtml = $sce.trustAsHtml($scope.asciiTitle);

        if (!$scope.inFrame) {
            import(/* webpackChunkName: "github-badge" */ "../vendor/github-badge.js");
            import(/* webpackChunkName: "needsharebutton-js" */ "../vendor/needsharebutton.js");
            import(/* webpackChunkName: "needsharebutton-css" */ "../vendor/needsharebutton.css");
        }

        const initDict = () =>
            chrome.runtime.sendMessage(
                {
                    type: "dictionary",
                    // origin: window.top?.location?.origin,
                    // url: window.top?.location?.href
                },
                async ({
                    currentDictName,
                    nextDictName,
                    previousDictName,
                    allDicts,
                    previous,
                    history,
                    w,
                    r,
                    sentence,
                    windowUrl,
                }) => {
                    $scope.allDicts = allDicts;
                    $scope.currentDictName = currentDictName;
                    $scope.nextDictName = nextDictName;
                    $scope.previousDictName = previousDictName;
                    $scope.previous = previous;
                    $scope.word = w;
                    $scope.sentence = sentence;
                    $scope._lastQueryWord = $scope.word;
                    $scope.history = history;

                    if (windowUrl) {
                        $scope.windowUrl = windowUrl;
                        $scope.trustedWindowUrl = $sce.trustAsResourceUrl(windowUrl);
                    }

                    $scope.$apply();
                    $("#fairy-dict input.dict-input").focus();

                    if (!$scope.setting?.disableWordHistory) {
                        await import("../starrr.js");
                        const starrrElement = $(".starrr", baseNode);
                        if (starrrElement.data("star-rating")) {
                            starrrElement.data("star-rating").setRating(r);
                        } else {
                            starrrElement.starrr({ numStars: 3, rating: r });
                        }
                    }

                    if ($scope.querying) {
                        return $scope.checkIfFrameIsLoaded();
                    }
                }
            );

        initDict();
        chrome.runtime.sendMessage(
            {
                type: "setting",
            },
            (setting) => {
                $scope.setting = setting;
                $scope.$apply();
            }
        );

        $scope.openOptions = (to) => utils.send("open options", { to });

        $scope.deleteHistory = async (item, i) => {
            await utils.send("remove history", item);
            const { history } = await utils.send("dictionary history", {
                word: $scope.word,
            });
            $scope.history = history;
            $scope.$apply();
        };

        $scope.query = ({
            nextDict,
            previousDict,
            dictNumber,
            nextWord,
            previousWord,
            queryText,
            dictName,
            w,
            newDictWindow,
        } = {}) => {
            // if not $scope.word
            //     $scope.initial = true
            //     return

            $scope.initial = false;

            if (w) {
                $scope.querying = true;
                $scope.word = w;
                $scope.sentence = null;
            }

            if (dictName && !newDictWindow) {
                $scope.currentDictName = dictName;
            }

            if (dictName && queryText != null) {
                $scope.word = queryText || $scope._lastQueryWord;
            }

            window.top.postMessage({ type: "toggleDropdown", open: false }, "*");
            if (!$scope.word) {
                return;
            }

            return chrome.runtime.sendMessage(
                {
                    type: "query",
                    w: $scope.word,
                    sentence: $scope.sentence,
                    dictName: dictName || $scope.currentDictName,
                    nextDict,
                    previousDict,
                    dictNumber,
                    nextWord,
                    previousWord,
                    newDictWindow,
                },
                (data) => {
                    $scope.querying = false;
                    $scope._lastQueryWord = $scope.word;
                    if (data?.noUpdate) {
                        // current dict might be changed
                        return initDict();
                    }
                }
            );
        };

        const sendMessageToDictPage = (message) =>
            document.getElementById("dict-result")?.contentWindow.postMessage(message, "*");

        $scope.toggleDropdown = (open) => {
            if ($scope.inFrame) {
                window.top.postMessage({ type: "toggleDropdown", open }, "*");
            }
        };

        $scope.scheduleDropdown = (dropdownType, open) => {
            clearTimeout($scope.openDropdownTimer);
            clearTimeout($scope.closeDropdownTimer);

            $scope.openDropdownTimer = setTimeout(() => {
                if (dropdownType === "history") {
                    $scope.isHistoryDropdownOpen = open;
                } else if (dropdownType === "dict") {
                    $scope.isDictDropdownOpen = open;
                }
                window.top.postMessage({ type: "toggleDropdown", open }, "*");
                $scope.$apply();
            }, 100);
        };

        $scope.scheduleCloseDropdown = () => {
            clearTimeout($scope.closeDropdownTimer);
            clearTimeout($scope.openDropdownTimer);
            $scope.closeDropdownTimer = setTimeout(() => {
                $scope.isHistoryDropdownOpen = false;
                $scope.isDictDropdownOpen = false;
                window.top.postMessage({ type: "toggleDropdown", open: false }, "*");
                $scope.$apply();
            }, 100);
        };

        const parseAutocomplete = (html) => {
            if (!html) {
                return [];
            }
            const nodes = $(html);
            const list = [];
            nodes.find(".word-result-entry").each((i, item) => {
                const w = $(item).find(".word").text();
                const def = $(item).find(".definition").text();
                const ipa = $(item).find(".word").attr("data-ipa");

                if (i <= 11) {
                    list.push({ w, def, ipa });
                }
            }); // at most 12 items

            return list;
        };

        $scope.autocomplete = debounce(async () => {
            const cancelAutoCompleteIfQuerying = () => {
                if ($scope.querying || $scope.word === $scope._lastQueryWord) {
                    $scope.autocompletes = [];
                    $scope.toggleDropdown(false);
                    $scope.$apply();
                    return true;
                }
                return false;
            };

            if (cancelAutoCompleteIfQuerying()) {
                return;
            }

            const text = $scope.word.trim();
            if (text) {
                const { results, html } = await utils.send("autocomplete", { text });
                if (cancelAutoCompleteIfQuerying()) {
                    return;
                }
                $scope.autocompletes = results.concat(parseAutocomplete(html));
            } else {
                $scope.autocompletes = [];
            }

            $scope.toggleDropdown($scope.autocompletes.length > 0);
            $scope.$apply();
        }, 500);

        chrome.runtime.onMessage?.addListener((request) => {
            // console.log(request)
            if (request.type === "querying") {
                $scope.initial = false;
                $scope.querying = true;
                $scope.word = request.text;
                setTimeout(() => {
                    $scope.querying = false;
                    $scope._lastQueryWord = $scope.word;
                    $("#fairy-dict input.dict-input").focus();
                    $scope.$apply();
                }, 1000);
            }

            if (request.type === "sendToDict") {
                if (request.action === "keypress focus") {
                    $("input.dict-input", baseNode)[0].select();
                }
            }

            if (request.type === "look up result") {
                $scope.querying = false;
                $scope._lastQueryWord = $scope.word;
                if (request.windowUrl && $scope.windowUrl !== request.windowUrl) {
                    $scope.windowUrl = request.windowUrl;
                    $scope.trustedWindowUrl = $sce.trustAsResourceUrl(request.windowUrl);
                    $scope.querying = true;
                }

                initDict();
                sendMessageToDictPage({ ...request, type: "look up in dynamic dict" });
            }

            $scope.$apply();
        });

        window.addEventListener("message", (event) => {
            if (event.data?.type === "injectedInDict") {
                $scope.dictFrameIsLoaded = true;
                $scope.dictFrameIsNotLoaded = false;
                $scope.querying = false;
                $scope.$apply();
            }
        });

        $scope.checkIfFrameIsLoaded = () => {
            $scope.dictFrameIsLoaded = false;
            clearTimeout($scope._checkFrameTimer);

            $scope._checkFrameTimer = setTimeout(() => {
                $scope.dictFrameIsNotLoaded = !$scope.dictFrameIsLoaded;
                $scope.$apply();
            }, 2000);
        };

        $(baseNode).on("starrr:change", (e, value) => {
            if ($scope.word) {
                value ??= 0;
                // console.log "[dictCtrl] rating word: #{$scope.word} #{value}"
                chrome.runtime.sendMessage({
                    type: "rating",
                    value,
                    text: $scope.word,
                });
                if ($scope.historyIndex >= 0) {
                    const item = $scope.history[$scope.historyIndex];
                    if (item && item[$scope.word] != null) {
                        item[$scope.word] = value;
                    }
                }
            }
        });

        const _handler = (evt) => {
            const node = $(evt.target);
            if (node.is(".sound")) {
                const a = node.next("audio");
                if (a.length) {
                    a[0].play();
                }
            }
        };

        $(document).mouseover(_handler);
        $(document).click(_handler);

        $(document).on("touchend focus", "input.dict-input", function () {
            this.select();
        });

        $(document).keyup((evt) => {
            const code = evt.charCode || evt.keyCode;
            if (code === 27) {
                $("input.dict-input", baseNode)[0].select();
            }
        });

        $(document).keydown((evt) => {
            const code = evt.charCode || evt.keyCode;
            const prevSK = $scope.setting.prevDictSK1;
            const nextSK = $scope.setting.nextDictSK1;
            const prevKey = $scope.setting.prevDictKey;
            const nextKey = $scope.setting.nextDictKey;
            let stop = false;

            if (utils.checkEventKey(evt, prevSK, null, prevKey)) {
                $scope.query({ previousDict: true });
                stop = true;
            }
            if (utils.checkEventKey(evt, nextSK, null, nextKey)) {
                $scope.query({ nextDict: true });
                stop = true;
            }
            if (utils.checkEventKey(evt, $scope.setting.prevHistorySK1, null, $scope.setting.prevHistoryKey)) {
                $scope.query({ previousWord: true });
                stop = true;
            }
            if (utils.checkEventKey(evt, $scope.setting.nextHistorySK1, null, $scope.setting.nextHistoryKey)) {
                $scope.query({ nextWord: true });
                stop = true;
            }
            if ((evt.ctrlKey || evt.metaKey) && evt.key.match(/\d/)) {
                $scope.query({ dictNumber: parseInt(evt.key.match(/\d/)[0]) });
                stop = true;
            }

            if (evt.key === "Escape") {
                $scope.toggleDropdown(false);
            }

            if (stop) {
                evt.preventDefault();
                evt.stopPropagation();
                $scope.$apply();
            }
        });

        window.addEventListener("beforeunload", () =>
            utils.send("beforeunload dict window", {
                left: window.screenX,
                top: window.screenY,
                width: window.outerWidth,
                height: window.outerHeight,
                dictName: $scope.currentDictName,
            })
        );
    },
]);

import("../header.html").then(({ default: headerDom }) => {
    $(document.body).append(headerDom);
    angular.bootstrap(document.getElementById("fairy-dict"), ["fairyDictApp"]);

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
});
