import { useEffect, useState } from "preact/hooks";
import { user, setting } from "../state.js";
import { socialLinks } from "./Welcome.jsx";

const product = process.env.PRODUCT;
const productFile = product === "Dictionariez" ? "" : `.${product.toLowerCase()}`;
const asciiTitle = require(`../../ascii-title${productFile}.html`).default;
const description = require(`../../description-and-badge${productFile}.html`)
    .default.replace("VERSION", `V${chrome.runtime.getManifest().version}`)
    // Beer's .badge is a notification dot, use a chip for the version link
    .replace('class="badge"', 'class="chip small round"');

const shareUrl = "https://dictionariez.pnl.dev";
const shareText =
    "Dictionariez: a customizable browser extension for instant word lookup, sentence translation, realistic text-to-speech, and vocabulary building.";
const q = encodeURIComponent;
const shareTargets = [
    ["X / Twitter", `https://twitter.com/intent/tweet?url=${q(shareUrl)}&text=${q(shareText)}`],
    ["Facebook", `https://www.facebook.com/sharer/sharer.php?u=${q(shareUrl)}`],
    ["Reddit", `https://www.reddit.com/submit?url=${q(shareUrl)}&title=${q(shareText)}`],
    ["LinkedIn", `https://www.linkedin.com/sharing/share-offsite/?url=${q(shareUrl)}`],
    ["Bluesky", `https://bsky.app/intent/compose?text=${q(`${shareText} ${shareUrl}`)}`],
    ["Telegram", `https://t.me/share/url?url=${q(shareUrl)}&text=${q(shareText)}`],
    ["Email", `mailto:?subject=${q("Dictionariez")}&body=${q(`${shareText} ${shareUrl}`)}`],
];

const decodeHtmlEntities = (str) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = str;
    return txt.value;
};

// Rotates through the pinned topics of the pnl.dev Crafting category.
function CraftingTopic() {
    const [topics, setTopics] = useState([]);
    const [index, setIndex] = useState(() => parseInt(localStorage.getItem("next-crafting-topic-index")) || 0);

    useEffect(() => {
        fetch("https://pnl.dev/api/category/6/crafting")
            .then((res) => res.json())
            .then((data) => setTopics(data.topics.filter((t) => (t.showInExtension || t.pinned) && !t.deleted)))
            .catch(() => {});
    }, []);

    useEffect(() => {
        if (!topics.length) return;
        try {
            localStorage.setItem("next-crafting-topic-index", (index + 1) % topics.length);
        } catch {
            // localStorage may be disabled or full
        }
        const timer = setTimeout(() => setIndex((index + 1) % topics.length), 5000);
        return () => clearTimeout(timer);
    }, [topics, index]);

    if (!topics.length) return null;
    const topic = topics[index % topics.length];
    return (
        <a class="chip round fill crafting-topic" href={`https://pnl.dev/topic/${topic.slug}`} target="_blank">
            <i>auto_awesome</i>
            <span key={topic.slug} class="truncate slide-in">
                {decodeHtmlEntities(topic.title)}
            </span>
        </a>
    );
}

function Profile() {
    const u = user.value;
    const isPro = setting.value.isPro;
    return (
        <nav class="profile">
            <a class="chip round large" href={u.link} target="_blank">
                {u.pictureUrl && <img class="circle" src={u.pictureUrl} alt="" />}
                <span>{u.username}</span>
            </a>
            <a
                class={`chip round ${isPro ? "primary" : "border"}`}
                href={u.subscriptionLink}
                target="_blank"
                title={isPro ? "You are a Pro user!" : "Get Pro to support the development and get more features!"}
            >
                {isPro && <i class="fill">star</i>}
                <span>{isPro ? "Pro" : "Free"}</span>
            </a>
        </nav>
    );
}

export default function Home() {
    return (
        <section id="home" class="section">
            <div class="row top-align wrap">
                <div class="max">
                    <div class="ascii-title primary-text" dangerouslySetInnerHTML={{ __html: asciiTitle }} />
                    <div dangerouslySetInnerHTML={{ __html: description }} />
                </div>
                <Profile />
            </div>

            <nav class="wrap">
                <a class="button border" href="https://github.com/pnlpal/dictionariez" target="_blank" title="It's open source">
                    <i>star</i>
                    <span>Star on GitHub</span>
                </a>
                <img src="https://img.shields.io/github/stars/pnlpal/dictionariez.svg?style=social" alt="GitHub stars" height="20" />
                <button class="border">
                    <i>share</i>
                    <span>Share</span>
                    <menu class="no-wrap">
                        {shareTargets.map(([name, href]) => (
                            <li>
                                <a href={href} target="_blank">
                                    {name}
                                </a>
                            </li>
                        ))}
                    </menu>
                </button>
                <span class="muted">it really helps!</span>
            </nav>

            <p>
                Your privacy is valued. Please read the{" "}
                <a class="link" target="_blank" href="https://github.com/pnlpal/dictionariez/blob/master/privacy.md">
                    privacy policy
                </a>
                .
            </p>
            <p>
                Let's learn programming and languages together, join the discussion in the{" "}
                <a class="link" target="_blank" href="https://pnl.dev/topic/2/">
                    Programming N' Language Community
                </a>
                , or say hi on{" "}
                {socialLinks.map(([href, name], i) => (
                    <>
                        <a class="link" target="_blank" href={href}>
                            {name}
                        </a>
                        {i < socialLinks.length - 2 ? ", " : i === socialLinks.length - 2 ? " or " : "."}
                    </>
                ))}
            </p>
            <CraftingTopic />
        </section>
    );
}
