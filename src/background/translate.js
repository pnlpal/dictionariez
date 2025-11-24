// This file is auto-copied. Do not edit directly.

import message from "./message.js";
import cloud from "./pnl-cloud.js";

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
  const { key, text, fromLang, targetLang, resolve, reject } = pending.shift();
  try {
    // Check cache
    if (key === lastKey && lastResult) {
      resolve(lastResult);
      processNext();
      return;
    }
    const result = await cloud.translate({ text, fromLang, targetLang });
    lastKey = key;
    lastResult = result;
    resolve(result);
    processNext();
  } catch (e) {
    reject(e);
    processNext();
  }
}

message.on("translate text", async ({ text, fromLang, targetLang }) => {
  const key = `${text}||${fromLang}||${targetLang}`;

  // If the last result matches, return it
  if (key === lastKey && lastResult) {
    return lastResult;
  }

  // If a task is running, queue this request and wait
  if (isBusy) {
    return new Promise((resolve, reject) => {
      pending.push({ key, text, fromLang, targetLang, resolve, reject });
    });
  }

  // Otherwise, process this request immediately
  isBusy = true;
  try {
    const result = await cloud.translate({ text, fromLang, targetLang });
    lastKey = key;
    lastResult = result;

    // After finishing, process the next pending request
    processNext();

    return result;
  } catch (e) {
    processNext();
    throw e;
  }
});
