import { useState } from "preact/hooks";
import { signal } from "@preact/signals";
import utils from "utils";
import { setting, updateSetting, toast } from "../state.js";
import { Dialog } from "../components/Dialog.jsx";
import LanguagePicker from "../components/LanguagePicker.jsx";
import enableLanguages from "../enableLanguages.js";
import checkServerForDictsConflict from "../checkServerForDictsConflict.js";

const product = process.env.PRODUCT;
const productIcon = chrome.runtime.getManifest().icons["128"];

// { step: "languages" | "conflict" | "success", initialSetup, serverDicts, onDone }
const welcome = signal(null);

export function openWelcome({ initialSetup = true, onDone } = {}) {
    welcome.value = { step: "languages", initialSetup, onDone };
}

const goto = (step, extra) => (welcome.value = { ...welcome.value, step, ...extra });

const close = () => (welcome.value = null);

// The page can load its tables as soon as languages are settled, while the success message is still shown
const succeed = () => {
    goto("success");
    welcome.value.onDone?.();
};

function LanguagesStep() {
    const [langs, setLangs] = useState(welcome.value.initialSetup ? [] : setting.value.enabledLanguages || []);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    const pick = (next) => {
        setLangs(next);
        if (next.length) setError(null);
    };

    const save = async () => {
        if (!langs.length) {
            setError("Pick at least one language to get started.");
            return;
        }
        setSaving(true);
        updateSetting("enabledLanguages", await enableLanguages(langs, true));

        const serverConflict = setting.value.isPro ? await checkServerForDictsConflict() : null;
        if (serverConflict?.hasServerDicts) {
            goto("conflict", { serverDicts: serverConflict.serverDicts });
        } else {
            succeed();
        }
    };

    return (
        <>
            <div class="row">
                <img class="round large" src={"/" + productIcon} alt="" />
                <h5 class="max no-margin">Welcome to {product} 👋</h5>
            </div>
            <p>
                Hi, I'm River, the indie developer behind {product}. Thanks so much for giving it a try, I hope it becomes a
                good companion on your language journey.
            </p>
            <p>
                Let's set it up in a few seconds: pick the languages you want to look up words in.
                {product !== "SidePal" && " You can change them anytime in Settings."}
            </p>
            <LanguagePicker value={langs} onChange={pick} label="Languages you're learning or reading" error={error} />
            <article class="surface-container round">
                <div class="row top-align">
                    <i class="primary-text">verified_user</i>
                    <p class="max no-margin">
                        No ads, no tracking. Your settings stay in your browser.{" "}
                        <a class="link" href="https://github.com/pnlpal/dictionariez/blob/master/privacy.md" target="_blank">
                            Privacy policy
                        </a>
                    </p>
                </div>
                <div class="row top-align">
                    <i class="muted">code</i>
                    <p class="max no-margin">
                        Free and{" "}
                        <a class="link" href="https://github.com/pnlpal/dictionariez" target="_blank">
                            open source on GitHub
                        </a>
                        .
                    </p>
                </div>
            </article>
            <nav class="right-align">
                <button onClick={save} disabled={saving}>
                    {saving && <progress class="circle small"></progress>}
                    <span>Let's go</span>
                    {!saving && <i>arrow_forward</i>}
                </button>
            </nav>
        </>
    );
}

function ConflictStep() {
    const { serverDicts } = welcome.value;

    const choose = async (useServer) => {
        try {
            if (useServer) {
                await utils.send("accept-server-dicts", { serverDicts });
            } else {
                await utils.send("sync-local-dicts-to-server");
            }
        } catch (error) {
            console.error("Error syncing dictionaries:", error);
            if (useServer) {
                toast("Failed to sync dictionaries. Please try again.", { type: "error" });
                return;
            }
            // Local dicts are already saved, so still proceed
        }
        succeed();
    };

    return (
        <>
            <div class="row">
                <i class="large primary-text">sync</i>
                <h5 class="max no-margin">Welcome back!</h5>
            </div>
            <p>
                Looks like you've used {product} on another device. We found <strong>{serverDicts.length} dictionaries</strong>{" "}
                synced there. Which set would you like here?
            </p>
            <div class="grid">
                <article class="s12 m6 primary-container round">
                    <div class="row">
                        <i>cloud_download</i>
                        <h6 class="max no-margin">Use my synced dictionaries</h6>
                    </div>
                    <p>Bring over the {serverDicts.length} dictionaries from your other device.</p>
                    <button onClick={() => choose(true)}>Use synced</button>
                </article>
                <article class="s12 m6 surface-container round">
                    <div class="row">
                        <i>devices</i>
                        <h6 class="max no-margin">Start fresh here</h6>
                    </div>
                    <p>Keep the dictionaries just picked for your languages.</p>
                    <button class="border" onClick={() => choose(false)}>
                        Keep these
                    </button>
                </article>
            </div>
        </>
    );
}

const communities = [
    ["https://pnl.dev/category/4/dictionariez-trove", "library_books", "Dictionariez Trove", `Find more dictionaries to add to your ${product}.`],
    ["https://pnl.dev/category/7/language-exchange", "translate", "Language Exchange", "Meet language pals to practice, teach and learn together."],
    ["https://pnl.dev/category/6/crafting", "code", "Crafting", "Developers, designers and makers sharing what they build."],
    ["https://pnl.dev/category/3/feedback", "bug_report", "Feedback", "Found a bug or have an idea? I'd love to hear it."],
];

export const socialLinks = [
    ["https://discord.gg/sazRac4kSa", "Discord"],
    ["https://t.me/programmingandlanguage", "Telegram"],
    ["https://bsky.app/profile/pnlcommunity.bsky.social", "Bluesky"],
    ["https://mastodon.social/@river_young", "Mastodon"],
];

function SuccessStep() {
    return (
        <>
            <div class="row">
                <i class="large primary-text">celebration</i>
                <h5 class="max no-margin">You're all set!</h5>
            </div>
            <p>Select any word on a page to look it up. Happy reading and learning! 🎉</p>
            <p>Come say hi in the PNL community, a friendly place for language lovers and makers:</p>
            <ul class="list border">
                {communities.map(([href, icon, title, text]) => (
                    <li>
                        <a class="row max" href={href} target="_blank">
                            <i class="primary-text">{icon}</i>
                            <div class="max">
                                <div class="bold">{title}</div>
                                <div class="small-text muted">{text}</div>
                            </div>
                            <i class="muted">open_in_new</i>
                        </a>
                    </li>
                ))}
            </ul>
            <nav class="wrap">
                {socialLinks.map(([href, name]) => (
                    <a class="chip round" href={href} target="_blank">
                        <i>forum</i>
                        <span>{name}</span>
                    </a>
                ))}
            </nav>
            <nav class="right-align">
                <button onClick={close}>Start exploring</button>
            </nav>
        </>
    );
}

export function WelcomeDialog() {
    const state = welcome.value;
    // Escaping keeps local dicts for the conflict step, like the old dialogs did
    const onClose = () => {
        if (state?.step === "conflict") return succeed();
        const onDone = state?.step === "languages" && state.onDone;
        close();
        onDone?.();
    };

    return (
        <Dialog open={!!state} onClose={onClose} className="welcome-dialog" overlay="large-blur">
            {state?.step === "languages" && <LanguagesStep />}
            {state?.step === "conflict" && <ConflictStep />}
            {state?.step === "success" && <SuccessStep />}
        </Dialog>
    );
}
