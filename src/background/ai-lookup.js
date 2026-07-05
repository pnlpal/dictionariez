// This file is auto-copied. Do not edit directly.

import message from "./message.js";
import cloud from "./pnl-cloud.js";
import storage from "./storage.js";
import localStorageCacheFactory from "./localStorageCache.js";
import setting from "./setting.js";

const { findInCache, addToCache, clearCache } = localStorageCacheFactory("ai-lookup-cache", 20);

// Simple in-memory cache for the last request
let lastKey = null;
let lastResult = null;
let isBusy = false;
let pending = [];

async function processNext() {
    if (pending.length === 0) {
        isBusy = false;
        return;
    }
    isBusy = true;
    const { key, word, sentence, detectedLangInContext, resolve, reject } = pending.shift();
    try {
        // Check in-memory cache
        if (key === lastKey && lastResult) {
            resolve(lastResult);
            processNext();
            return;
        }

        // Check persistent cache
        const cached = await findInCache((item) => item.key === key);
        if (cached) {
            lastKey = key;
            lastResult = cached.result;
            resolve(cached.result);
            processNext();
            return;
        }

        // Make API call
        const result = await cloud.lookupInAI({
            word,
            sentence,
            detectedLangInContext,
            userLanguage: setting.getValue("aiResponseLanguage"),
        });
        if (result?.lookup) {
            lastKey = key;
            lastResult = result;

            // Add to persistent cache
            await addToCache({ key, result });
        }

        resolve(result);
        processNext();
    } catch (e) {
        reject(e);
        processNext();
    }
}

message.on("look up in AI", async ({ word, sentence, s, sc, detectedLangInContext }) => {
    if (s) {
        storage.addHistory({
            w: word,
            s,
            sc,
            sentence,
            lang: detectedLangInContext,
        });
    } // ignore lookup from options page

    const key = `${word}||${sentence}||${detectedLangInContext}`;

    // Check in-memory cache first
    if (key === lastKey && lastResult) {
        return lastResult;
    }

    // Check persistent cache
    const cached = await findInCache((item) => item.key === key);
    if (cached) {
        lastKey = key;
        lastResult = cached.result;
        return cached.result;
    }

    // If a task is running, queue this request and wait
    if (isBusy) {
        return new Promise((resolve, reject) => {
            pending.push({ key, word, sentence, detectedLangInContext, resolve, reject });
        });
    }

    // Otherwise, process this request immediately
    isBusy = true;
    try {
        const result = await cloud.lookupInAI({
            word,
            sentence,
            detectedLangInContext,
            userLanguage: setting.getValue("aiResponseLanguage"),
        });
        if (result?.lookup) {
            lastKey = key;
            lastResult = result;

            // Add to persistent cache
            await addToCache({ key, result });
        }

        // After finishing, process the next pending request
        processNext();

        return result;
    } catch (e) {
        processNext();
        throw e;
    }
});

message.on(
    "ai follow up",
    async ({
        word,
        sentence,
        detectedLangInContext,
        previousAssistantAnswer,
        followUpQuestion,
        actionKey,
        pageTitle,
        pageUrl,
    }) => {
        const response = await cloud.aiFollowUp({
            word,
            sentence,
            detectedLangInContext,
            userLanguage: setting.getValue("aiResponseLanguage"),
            previousAssistantAnswer,
            followUpQuestion,
            actionKey,
            pageTitle,
            pageUrl,
        });

        // Cache follow-up answers in memory for replay on subsequent lookups
        const key = `${word}||${sentence}||${detectedLangInContext}`;
        if (key === lastKey && response?.answer) {
            if (!Array.isArray(lastResult.followUpAnswers)) {
                lastResult.followUpAnswers = [];
            }
            lastResult.followUpAnswers.push({
                actionKey: actionKey,
                followUpQuestion: followUpQuestion,
                answer: response.answer,
            });
        }
        return response;
    },
);

export default { clearCache };
