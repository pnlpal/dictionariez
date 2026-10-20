import { signal } from "@preact/signals";
import { saveSetting } from "../state.js";
import { Dialog } from "../components/Dialog.jsx";
import { openDictEditor } from "./DictEditor.jsx";

const product = process.env.PRODUCT;
const { icons, version } = chrome.runtime.getManifest();
const productIcon = chrome.runtime.getURL(icons["128"]);
const postLink = "https://pnl.dev/topic/1202/dictionariez-facelift-update-2-make-your-own-dictionary";

// Bump it with new content, so users updating see the dialog once per release, not on every patch
export const WHATS_NEW_RELEASE = "9.1";

const open = signal(false);

// Introduces what's new to users updating from an older version, once per release
export function openWhatsNew() {
    open.value = true;
}

const close = () => {
    open.value = false;
    saveSetting("whatsNewShown", WHATS_NEW_RELEASE, { silent: true });
};

const tryIt = () => {
    close();
    openDictEditor();
};

const highlights = [
    ["edit_note", "Make your own dictionary", 'Add any website with "New dict" in Dictionaries, no console needed.'],
    ["smart_toy", "Search pages and AI chats", "Use a search URL, or type into an AI chat with your own prompts."],
    ["help", "Help as you go", "Every field explains itself, with an example from a real dictionary."],
    ["share", "Test it, then share it", "Try it right away, then share it at pnl.dev in one click."],
];

export function WhatsNewDialog() {
    return (
        <Dialog open={open.value} onClose={close} className="welcome-dialog" overlay="large-blur">
            <div class="row">
                <img class="round large" src={productIcon} alt="" />
                <div class="max">
                    <h5 class="no-margin">Make your own dictionary ✨</h5>
                    <div class="small-text muted">Version {version}</div>
                </div>
            </div>
            <p>
                Hi, it's River. The second step of the {product} facelift is here: a dictionary editor, so anyone can
                add the dictionaries they love. Here's what's new:
            </p>
            <ul class="list">
                {highlights.map(([icon, title, text]) => (
                    <li>
                        <i class="primary-text">{icon}</i>
                        <div class="max">
                            <div class="bold">{title}</div>
                            <div class="small-text muted">{text}</div>
                        </div>
                    </li>
                ))}
            </ul>
            <p>Plus a more compact history table on laptops, and a few fixes.</p>
            <nav class="right-align wrap">
                <a class="button border" href={postLink} target="_blank" onClick={close}>
                    Read the story
                </a>
                <button onClick={tryIt}>Make a dictionary</button>
            </nav>
        </Dialog>
    );
}
