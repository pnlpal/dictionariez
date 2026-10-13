import js from "@eslint/js";
import globals from "globals";
import json from "@eslint/json";
import css from "@eslint/css";
import react from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
    {
        files: ["**/*.{js,mjs,cjs,jsx}"],
        plugins: { js },
        extends: ["js/recommended"],
        languageOptions: {
            parserOptions: { ecmaFeatures: { jsx: true } },
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
        // Preact components: only teach no-unused-vars about JSX usage
        files: ["**/*.jsx"],
        plugins: { react },
        rules: { "react/jsx-uses-vars": "error" },
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
    {
        files: ["**/*.css"],
        plugins: { css },
        language: "css/css",
        extends: ["css/recommended"],
        // theme variables like --primary come from Beer CSS
        rules: { "css/no-invalid-properties": ["error", { allowUnknownVariables: true }] },
    },
    {
        files: ["landing-page/**"],
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
    },
]);
