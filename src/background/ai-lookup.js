// This file is auto-copied. Do not edit directly.

import message from "./message.js";
import cloud from "./pnl-cloud.js";
import localStorageCacheFactory from "./localStorageCache.js";

const { findInCache, addToCache } = localStorageCacheFactory("ai-lookup-cache", 20);

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
        const result = await cloud.lookupInAI({ word, sentence, detectedLangInContext });
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

message.on("look up in AI", async ({ word, sentence, detectedLangInContext }) => {
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
        const result = await cloud.lookupInAI({ word, sentence, detectedLangInContext });
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
