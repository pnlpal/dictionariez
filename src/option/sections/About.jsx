import { socialLinks } from "./Welcome.jsx";

const version = chrome.runtime.getManifest().version;

const puffins = {
    homepage: "https://puffins.pnl.dev/",
    android: "https://play.google.com/store/apps/details?id=dev.pnl.puffins",
    ios: "https://testflight.apple.com/join/swFXEk1z",
};

const pnlReaderStores = {
    Chrome: "https://chromewebstore.google.com/detail/pnl-reader/amdebfiljmlhfkenbhhpckmmpkonpdfh",
    Firefox: "https://addons.mozilla.org/en-US/firefox/addon/pnl-reader/",
    Edge: "https://microsoftedge.microsoft.com/addons/detail/pnl-reader/gdpndpkknkgkmoikgpldekejoabkplmd",
};
const pnlReaderStore = pnlReaderStores[process.env.BROWSER] || pnlReaderStores.Chrome;

const links = [
    ["explore", "Dictionariez homepage", "https://dictionariez.pnl.dev/"],
    ["code", "Dictionariez on GitHub", "https://github.com/pnlpal/dictionariez"],
    ["history_edu", "What's new", "https://github.com/pnlpal/dictionariez/blob/master/CHANGELOG.md"],
    ["groups", "Join the PNL community", "https://pnl.dev"],
    ...socialLinks.map(([href, name]) => ["forum", name, href]),
];

function PuffinsCard() {
    return (
        <article class="primary-container round">
            <div class="row top-align">
                <img class="round large" src="/images/puffins-180.png" alt="" />
                <div class="max">
                    <h6 class="no-margin">Puffins, Dictionariez for your phone</h6>
                    <p class="no-margin">
                        For months I've been working on something I've wanted to give you for a long time. Today I'm really
                        excited to say it's finally here, on both Android and iPhone.
                    </p>
                </div>
            </div>
            <nav class="wrap">
                <a class="button" href={puffins.android} target="_blank">
                    <i>android</i>
                    <span>Google Play</span>
                </a>
                <a class="button border" href={puffins.ios} target="_blank" title="Puffins is in beta on iOS, join via TestFlight">
                    <i>phone_iphone</i>
                    <span>iOS beta</span>
                </a>
                <a class="button transparent" href={puffins.homepage} target="_blank">
                    <span>Learn more</span>
                    <i>arrow_forward</i>
                </a>
            </nav>
        </article>
    );
}

function PnlReaderCard() {
    return (
        <article class="secondary-container round">
            <div class="row top-align">
                <img class="round large" src="/images/pnl-reader-128.png" alt="" />
                <div class="max">
                    <h6 class="no-margin">PNL Reader, read quietly or read aloud</h6>
                    <p class="no-margin">
                        Turn any article, web novel or PDF into a distraction-free page with paper-feel themes and dozens of
                        fonts, or let natural-sounding text-to-speech read it to you. Click any word to look it up with
                        Dictionariez.
                    </p>
                </div>
            </div>
            <nav class="wrap">
                <a class="button secondary" href={pnlReaderStore} target="_blank">
                    <i>extension</i>
                    <span>Add to {process.env.BROWSER || "Chrome"}</span>
                </a>
                <a class="button transparent" href="https://github.com/pnlpal/pnl-reader" target="_blank">
                    <span>Learn more</span>
                    <i>arrow_forward</i>
                </a>
            </nav>
        </article>
    );
}

export default function About() {
    return (
        <>
            <div class="row">
                <img class="circle large" src="/images/river.png" alt="" />
                <h5 class="max">Hi, I'm River 👋</h5>
            </div>
            <p>
                I'm the indie developer behind Dictionariez. For more than ten years I've been building it, mostly in my
                spare time, with a lot of help from people like you.
            </p>

            <PuffinsCard />

            <p>
                Since the very beginning I've promised the core would always be free, and Puffins keeps that promise: every
                dictionary, every lookup, free, with no ads and no tracking.
            </p>
            <p>
                The only paid part is AI Lookup. Each AI answer costs me real money in AI provider fees and cloud servers, so
                after a free trial it's part of Pro. That's what keeps everything else free for everyone.
            </p>
            <p>
                If you give it a try, I'd love to hear what you think. Your feedback shaped Dictionariez, and it will shape
                Puffins too.
            </p>
            <nav class="wrap">
                <a class="button border" href="https://pnl.dev/category/3/feedback" target="_blank">
                    <i>chat</i>
                    <span>Share your feedback</span>
                </a>
            </nav>

            <h6 class="small muted top-margin">More from PNL</h6>
            <PnlReaderCard />

            <h6 class="small muted top-margin">Privacy</h6>
            <article class="surface-container round">
                <div class="row top-align">
                    <i class="primary-text">verified_user</i>
                    <p class="max no-margin">
                        Your history and settings are stored in your browser and synced with the browser's own sync. No
                        analytics, no ads.
                    </p>
                </div>
                <hr class="small" />
                <div class="row top-align">
                    <i class="muted">cloud</i>
                    <p class="max no-margin">
                        Text you send to the AI lookup, translation or text-to-speech goes to pnl.dev to generate the result
                        and isn't kept afterwards. With Pro cloud sync, your history and dictionaries are stored on pnl.dev
                        so they follow you across devices.
                    </p>
                </div>
                <hr class="small" />
                <a class="link" href="https://github.com/pnlpal/dictionariez/blob/master/privacy.md" target="_blank">
                    Read the full privacy policy
                </a>
            </article>

            <h6 class="small muted">Version</h6>
            <p>V{version}</p>

            <h6 class="small muted">Links</h6>
            <ul class="list border">
                {links.map(([icon, label, href]) => (
                    <li>
                        <a class="row max" href={href} target="_blank">
                            <i class="muted">{icon}</i>
                            <span class="max">{label}</span>
                            <i class="muted">open_in_new</i>
                        </a>
                    </li>
                ))}
            </ul>
        </>
    );
}
