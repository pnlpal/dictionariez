"use strict";

export default (cacheKey, maxCachedItems = 10) => {
    // Check if localStorage is available
    const isLocalStorageAvailable = (() => {
        try {
            return typeof localStorage === "object";
        } catch {
            return false;
        }
    })();

    async function getCache() {
        if (isLocalStorageAvailable) {
            try {
                const cached = localStorage.getItem(cacheKey);
                return cached ? JSON.parse(cached) : [];
            } catch (e) {
                console.warn("Failed to read cache from localStorage:", e);
                return [];
            }
        } else {
            // Use chrome.storage.local
            try {
                const result = await chrome.storage.local.get([cacheKey]);
                return result[cacheKey] || [];
            } catch (e) {
                console.warn("Failed to read cache from chrome.storage.local:", e);
                return [];
            }
        }
    }

    async function setCache(cacheArr) {
        if (isLocalStorageAvailable) {
            let arr = [...cacheArr];
            while (arr.length > 0) {
                try {
                    localStorage.setItem(cacheKey, JSON.stringify(arr));
                    return;
                } catch (e) {
                    if (
                        e instanceof DOMException &&
                        (e.name === "QuotaExceededError" || e.name === "NS_ERROR_DOM_QUOTA_REACHED")
                    ) {
                        console.warn("Storage quota exceeded when saving cache, removing oldest cache item.", e);
                        arr.shift();
                    } else {
                        console.error("Failed to save cache to localStorage:", e);
                        return;
                    }
                }
            }
            // If we get here, nothing could be saved
            console.warn("Unable to save any cache due to storage quota limits.");
        } else {
            // Use chrome.storage.local
            let arr = [...cacheArr];
            while (arr.length > 0) {
                try {
                    await chrome.storage.local.set({ [cacheKey]: arr });
                    return;
                } catch (e) {
                    if (e.message && e.message.includes("QUOTA_BYTES")) {
                        console.warn("Storage quota exceeded when saving cache, removing oldest cache item.", e);
                        arr.shift();
                    } else {
                        console.error("Failed to save cache to chrome.storage.local:", e);
                        return;
                    }
                }
            }
            console.warn("Unable to save any cache due to storage quota limits.");
        }
    }

    async function findInCache(predicate) {
        const cacheArr = await getCache();
        return cacheArr.find(predicate);
    }

    async function addToCache(item) {
        let cacheArr = await getCache();
        if (cacheArr.length >= maxCachedItems) {
            cacheArr.shift(); // Remove oldest item
        }
        cacheArr.push(item);
        await setCache(cacheArr);
    }

    function clearCache() {
        console.info("Clearing local storage cache:", cacheKey);
        if (isLocalStorageAvailable) {
            localStorage.removeItem(cacheKey);
        } else {
            chrome.storage.local.remove(cacheKey);
        }
    }

    return {
        getCache,
        setCache,
        findInCache,
        addToCache,
        clearCache,
    };
};
