import js from "@eslint/js";
import globals from "globals";
import json from "@eslint/json";
import css from "@eslint/css";
import { defineConfig } from "eslint/config";

export default defineConfig([
    {
        files: ["**/*.{js,mjs,cjs}"],
        plugins: { js },
        extends: ["js/recommended"],
        languageOptions: {
            globals: {
                ...globals.browser,
                process: "readonly",
                chrome: "readonly",
                browser: "readonly",
                require: "readonly",
                global: "readonly",
            },
        },
    },
    {
        files: ["**/*.test.js"],
        languageOptions: {
            globals: {
                ...globals.mocha, // adds describe, it, before, after, etc.
                sinon: "readonly",
            },
        },
    },
    { files: ["**/*.json"], plugins: { json }, language: "json/json", extends: ["json/recommended"] },
    { files: ["**/*.css"], plugins: { css }, language: "css/css", extends: ["css/recommended"] },
]);
