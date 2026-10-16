import { signal } from "@preact/signals";
import { saveSetting } from "../state.js";
import { Dialog } from "../components/Dialog.jsx";

const product = process.env.PRODUCT;
const { icons, version } = chrome.runtime.getManifest();
const productIcon = chrome.runtime.getURL(icons["128"]);
const feedbackLink = "https://pnl.dev/topic/1192/major-dictionariez-facelift-update-1";

const open = signal(false);

// Introduces the options page facelift to users updating from an older version, once
export function openWhatsNew() {
    open.value = true;
}

const close = () => {
    open.value = false;
    saveSetting("faceliftIntroShown", true, { silent: true });
};

const highlights = [
    ["auto_awesome", "A fresh look", "Rebuilt from the ground up, with light, dark and auto themes."],
    ["bolt", "Smoother tables", "Deleting words or reordering dictionaries no longer reloads the page."],
    ["smartphone", "Works on small screens", "A new home screen when the page is narrow, like on a phone."],
    ["shield", "Safer under the hood", "Old libraries like AngularJS and jQuery are gone from this page."],
];

export function WhatsNewDialog() {
    return (
        <Dialog open={open.value} onClose={close} className="welcome-dialog" overlay="large-blur">
            <div class="row">
                <img class="round large" src={productIcon} alt="" />
                <div class="max">
                    <h5 class="no-margin">{product} has a new look ✨</h5>
                    <div class="small-text muted">Version {version}</div>
                </div>
            </div>
            <p>
                Hi, it's River. I've rebuilt this page from scratch, the first step in modernizing {product}. Here's
                what's new:
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
            <p>Your words, dictionaries and settings are all where you left them.</p>
            <nav class="right-align wrap">
                <a class="button border" href={feedbackLink} target="_blank" onClick={close}>
                    Share feedback
                </a>
                <button onClick={close}>Take a look</button>
            </nav>
        </Dialog>
    );
}
