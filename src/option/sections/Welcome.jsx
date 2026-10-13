import { useState } from "preact/hooks";
import { signal } from "@preact/signals";
import utils from "utils";
import { setting, updateSetting, toast } from "../state.js";
import { Dialog } from "../components/Dialog.jsx";
import LanguagePicker from "../components/LanguagePicker.jsx";
import enableLanguages from "../enableLanguages.js";
import checkServerForDictsConflict from "../checkServerForDictsConflict.js";

const product = process.env.PRODUCT;

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

    const save = async () => {
        if (!langs.length) {
            toast("Please select at least one language to look up.", { type: "error" });
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
            <h5>👋 Welcome to {product}!</h5>
            <p>Thank you for installing {product}, your new language companion!</p>
            <p>
                {product} is open-source, see its progress on{" "}
                <a class="link" href="https://github.com/pnlpal/dictionariez" target="_blank">
                    GitHub
                </a>
                .
            </p>
            <p>
                Worried about <strong>privacy</strong>? By default, {product} doesn't collect any of your data.{" "}
                <a class="link" href="https://github.com/pnlpal/dictionariez/blob/master/privacy.md" target="_blank">
                    Read more about the privacy policy here
                </a>
                .
            </p>
            <p>
                To get started, select the languages you want to look up words in.{" "}
                {product !== "SidePal" && "You can always update your choices later in the extension options. "}
                <span class="primary-text">Happy exploring and language learning!</span>
            </p>
            <LanguagePicker value={langs} onChange={setLangs} label="Languages you want to look up" />
            <nav class="right-align">
                <button class="primary" onClick={save} disabled={saving}>
                    {saving && <progress class="circle small"></progress>}
                    <span>Save</span>
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
            <h5>🔄 Found synced dictionaries</h5>
            <p>
                We found <strong>{serverDicts.length} dictionaries</strong> synced from another device. Would you like to use your
                synced dictionaries or keep the ones we just created for your selected languages?
            </p>
            <div class="grid">
                <article class="s12 m6 primary-container round">
                    <h6>Use synced dicts</h6>
                    <p>Replace local dicts with your {serverDicts.length} synced dictionaries.</p>
                    <button class="primary" onClick={() => choose(true)}>
                        Use Synced Dicts
                    </button>
                </article>
                <article class="s12 m6 tertiary-container round">
                    <h6>Keep local</h6>
                    <p>Keep the dictionaries created for your selected languages.</p>
                    <button class="tertiary" onClick={() => choose(false)}>
                        Keep Local
                    </button>
                </article>
            </div>
        </>
    );
}

const communities = [
    ["https://pnl.dev/category/4/dictionariez-trove", "📚 Dictionariez Trove", `Enhance your ${product}, add more dictionaries to your collection.`],
    ["https://pnl.dev/category/7/language-exchange", "🌍 Language Exchange", "Ready to meet a language pal? Practice, teach, and learn together in Language Exchange!"],
    ["https://pnl.dev/category/6/crafting", "💻 Crafting", "Are you a developer, designer, or entrepreneur? Share your projects, code, and creative work here."],
    ["https://pnl.dev/category/3/feedback", "🐞 Feedback", "Found a bug or have ideas to improve PNL? Share suggestions and help shape our community."],
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
            <h5>🎉 Settings saved! You're ready to explore {product}.</h5>
            <p>Check out our Programming N' Language Community:</p>
            <ul class="list border">
                {communities.map(([href, title, text]) => (
                    <li>
                        <a href={href} target="_blank" class="max">
                            <div class="bold primary-text">{title}</div>
                            <div class="small-text">{text}</div>
                        </a>
                    </li>
                ))}
            </ul>
            <p class="center-align">
                Want to connect beyond the forum? <strong>Join our community chats and stay in the loop!</strong>
            </p>
            <nav class="center-align wrap">
                {socialLinks.map(([href, name]) => (
                    <a class="chip round" href={href} target="_blank">
                        {name}
                    </a>
                ))}
            </nav>
            <nav class="right-align">
                <button class="primary" onClick={close}>
                    Start Exploring!
                </button>
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
        <Dialog open={!!state} onClose={onClose} className="welcome-dialog">
            {state?.step === "languages" && <LanguagesStep />}
            {state?.step === "conflict" && <ConflictStep />}
            {state?.step === "success" && <SuccessStep />}
        </Dialog>
    );
}
