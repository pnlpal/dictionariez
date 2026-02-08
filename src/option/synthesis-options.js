import allLangs from "../resources/langs.json";
import bootoast from "bootoast/dist/bootoast.min.js";
import getDefaultSynthesisVoice from "../other/getDefaultSynthesisVoice";

const template = require("./synthesis-options.html").default;

export default function initSynthesisOptions($scope) {
    // 1. Filter languages that support synthesis
    const synthesisLangs = {};
    Object.keys(allLangs).forEach((key) => {
        if (allLangs[key].synthesis) {
            synthesisLangs[key] = allLangs[key];
        }
    });

    $scope.params = $scope.params || {};
    $scope.params.synthesisLangs = synthesisLangs;

    // Ensure the setting object exists
    if (!$scope.setting.synthesisVoices) {
        $scope.setting.synthesisVoices = {};
    }

    // 2. Get Voices
    let allVoices = [];
    $scope.recommendedVoices = {};

    const loadVoices = async () => {
        allVoices = window.speechSynthesis.getVoices();

        // Calculate recommended voices for each language
        for (const langKey of Object.keys(synthesisLangs)) {
            const langConfig = synthesisLangs[langKey];
            const code = langConfig.synthesis;
            const v = await getDefaultSynthesisVoice(code, null, langKey);
            $scope.recommendedVoices[code] = v ? v.name : "System Default";
        }

        // Force refresh of scope if needed
        if ($scope.$root && !$scope.$root.$$phase) {
            $scope.$apply();
        }
    };

    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();

    // 3. Helper to filter voices for a language code (e.g., 'en-US')
    $scope.params.getVoicesForLang = (langCode) => {
        if (!langCode || !allVoices.length) return [];
        // Match strictly by language code prefix to allow generic variants
        // e.g. en-US matches en-US, but we might want to be loose about region if needed.
        // For now, let's strict match the beginning.
        return allVoices.filter((v) => v.lang && v.lang.replace("_", "-").startsWith(langCode.split("-")[0]));
    };

    // 4. Save handler
    $scope.changeVoiceKey = (langKey) => {
        chrome.runtime.sendMessage({
            type: "save setting",
            key: "synthesisVoices",
            value: $scope.setting.synthesisVoices,
        });

        bootoast.toast({
            message: "Voice setting saved.",
            type: "success",
            position: "top",
            timeout: 2,
        });
    };

    // 5. Inject template
    // We'll assume there is a placeholder or we append it to the wrapper.
    // For now, let's append it to the #function-setting element or similar.
    // Ideally, the user modifies options.html to include <div id="synthesis-options"></div>
    // But since I can't easily rely on that without editing options.html, I'll use jQuery to append it.

    // Let's insert it after the "Pronunciation / TTS" related settings or at the bottom of settings.
    // In options.html, there isn't a clear TTS section, but there is "Auto-pronounce".
    // I'll append it to the end of #function-setting div
    const $target = $("#function-setting");
    if ($target.length) {
        // Compile the template with Angular
        const $injector = angular.element(document).injector();
        $injector.invoke([
            "$compile",
            ($compile) => {
                const $el = $compile(template)($scope);
                $target.append($el);
            },
        ]);
    }
}
