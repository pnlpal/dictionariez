import { user, setting } from "../state.js";
import { sections } from "../nav.js";
import { asciiTitle, GitHubStars, ShareButton } from "./Home.jsx";

const version = chrome.runtime.getManifest().version;

function ProfileBar() {
    const u = user.value;
    const isPro = setting.value.isPro;
    return (
        <nav class="mobile-profile">
            <a href={u.link} target="_blank" title={u.loggedIn ? "Your profile on pnl.dev" : "Log in to pnl.dev"}>
                <img class="circle" src={u.pictureUrl} alt="" />
            </a>
            <a class="max truncate bold" href={u.link} target="_blank">
                {u.username}
            </a>
            <a
                class={`chip small round ${isPro ? "primary" : "surface-container"}`}
                href={u.subscriptionLink}
                target="_blank"
                title={isPro ? "You are a Pro user!" : "Get Pro to support the development and get more features!"}
            >
                {isPro && <i class="fill small">star</i>}
                <span>{isPro ? "Pro" : "Get Pro"}</span>
            </a>
        </nav>
    );
}

export default function MobileHome({ themePicker }) {
    return (
        <section id="home" class="section">
            <ProfileBar />

            <div class="center-align large-padding">
                <div class="ascii-title mobile-ascii-title primary-text" dangerouslySetInnerHTML={{ __html: asciiTitle }} />
                <a
                    class="chip small round"
                    href="https://github.com/pnlpal/dictionariez/blob/master/CHANGELOG.md"
                    target="_blank"
                    title="What's new"
                >
                    V{version}
                </a>
            </div>

            <ul class="list border">
                {sections.map(({ id, icon, label, hint }) => (
                    <li>
                        <a class="row max" href={`#${id}`}>
                            <i>{icon}</i>
                            <div class="max">
                                <div>{label}</div>
                                <div class="small-text muted">{hint}</div>
                            </div>
                            <i class="muted">chevron_right</i>
                        </a>
                    </li>
                ))}
                <li>{themePicker}</li>
            </ul>

            <nav class="wrap center-align medium-margin">
                <GitHubStars />
                <ShareButton />
            </nav>
        </section>
    );
}
