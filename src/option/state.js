import { signal, computed } from "@preact/signals";
import utils from "utils";

export const isSidePal = process.env.PRODUCT === "SidePal";
export const pnlBase = process.env.NODE_ENV === "development" ? "http://localhost:4567" : "https://pnl.dev";

export const setting = signal({});
export const user = signal({
    username: "Login / Sign up",
    link: `${pnlBase}/login`,
    subscriptionLink: `${pnlBase}/pro`,
});

export const history = signal(null);
export const historyMaxLength = signal(0);
export const historyAlmostFull = computed(
    () => !!historyMaxLength.value && (history.value?.length || 0) > historyMaxLength.value - 30,
);

export const allDicts = signal(null);
export const syncDictsError = signal(null);

export const snackbar = signal(null);
let snackbarTimer;

// position: "top" (center) or "bottom-right" for less intrusive prompts
export function toast(message, { type = "primary", timeout = 3, actions, position = "top" } = {}) {
    clearTimeout(snackbarTimer);
    snackbar.value = { message, type, actions, position, id: Date.now() };
    if (timeout > 0) {
        snackbarTimer = setTimeout(() => (snackbar.value = null), timeout * 1000);
    }
}

export function closeToast() {
    clearTimeout(snackbarTimer);
    snackbar.value = null;
}

export const bravo = () => toast("Bravo!", { timeout: 1 });

export async function loadSetting() {
    setting.value = await utils.send("setting");
    window.setting = setting.value; // For debugging
    return setting.value;
}

export function updateSetting(key, value) {
    setting.value = { ...setting.value, [key]: value };
}

export async function saveSetting(key, value, { silent = false } = {}) {
    updateSetting(key, value);
    await utils.send("save setting", { key, value });
    if (!silent) {
        toast("Setting saved. You may need to reload open web pages for the new setting to take effect.", {
            timeout: 2,
        });
    }
}

export async function loadHistory() {
    const { data, maxLength } = await utils.send("history");
    window.historyData = data;
    historyMaxLength.value = maxLength || 0;
    history.value = data;
}

export async function loadDicts() {
    const res = await utils.send("get-all-dicts");
    window.allDicts = res.allDicts;
    syncDictsError.value = res.syncDictsError;
    allDicts.value = res.allDicts;
    return res;
}
