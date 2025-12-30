"use strict";
import $ from "jquery";
import "./select2-dark-theme.less";
import "select2";
import allLangs from "../resources/langs.json";
import debounce from "lodash/debounce";

const initAILanguageSelect = ($scope) => {
    const $select = $("#ai-response-language");
    if (!$select.length) {
        return;
    }

    const allLangNames = Object.keys(allLangs);
    ["Chinese (Simplified)", "Chinese (Traditional)"].forEach((variant) => {
        const index = allLangNames.indexOf("Chinese");
        if (index !== -1) {
            allLangNames.splice(index, 1);
        }
        allLangNames.push(variant);
    });

    if ($scope.setting.aiResponseLanguage && !allLangNames.includes($scope.setting.aiResponseLanguage)) {
        allLangNames.push($scope.setting.aiResponseLanguage);
    }

    // Populate options from allLangs
    allLangNames.forEach((lang) => {
        $select.append(
            $("<option>", {
                value: lang,
                text: lang,
            })
        );
    });

    // Initialize select2
    $select.select2({
        tags: true,
        placeholder: "English (default)",
        allowClear: true,
        width: "230px",
    });

    // Set initial value
    if ($scope.setting.aiResponseLanguage) {
        $select.val($scope.setting.aiResponseLanguage).trigger("change");
    }

    // Handle changes
    $select.on(
        "change",
        debounce(() => {
            const value = $select.val() || "";
            $scope.changeKey(value, "aiResponseLanguage");
        }, 300)
    );
};

export default initAILanguageSelect;
