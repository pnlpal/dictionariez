import { useEffect, useState } from "preact/hooks";
import utils from "utils";
import { setting, saveSetting, user, history, historyAlmostFull, allDicts, syncDictsError } from "./state.js";
import { applyTheme, themeModes } from "./theme.js";
import { Snackbar } from "./components/controls.jsx";
import { ConfirmHost } from "./components/Dialog.jsx";
import Home from "./sections/Home.jsx";
import HistoryTable from "./sections/HistoryTable.jsx";
import DictTable from "./sections/DictTable.jsx";
import { GeneralSettings, ProSettings, Hotkeys } from "./sections/Settings.jsx";
import { WelcomeDialog } from "./sections/Welcome.jsx";
import { WhatsNewDialog } from "./sections/WhatsNew.jsx";
import SynthesisDialog from "./sections/SynthesisDialog.jsx";
import MobileHome from "./sections/MobileHome.jsx";
import About from "./sections/About.jsx";
import { sections, isMobile, route, goToHub } from "./nav.js";

const productIcon = chrome.runtime.getURL(chrome.runtime.getManifest().icons["128"]);

function useActiveSection() {
    const [active, setActive] = useState(sections[0].id);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
            { rootMargin: "-30% 0px -60% 0px" },
        );
        sections.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);
    return active;
}

function NavLinks({ active }) {
    return sections.map(({ id, icon, label }) => (
        <a href={`#${id}`} class={active === id ? "active" : ""} title={label}>
            <i>{icon}</i>
            <span>{label}</span>
        </a>
    ));
}

const modeInfo = {
    auto: ["brightness_auto", "Auto"],
    light: ["light_mode", "Light"],
    dark: ["dark_mode", "Dark"],
};

const setThemeMode = (mode) => {
    saveSetting("themeMode", mode, { silent: true });
    applyTheme(mode);
};

// Cycles the color mode: auto -> light -> dark
function ThemeToggle() {
    const mode = setting.value.themeMode || "auto";
    const next = themeModes[(themeModes.indexOf(mode) + 1) % themeModes.length];
    const [icon, label] = modeInfo[mode];

    const toggle = (e) => {
        e.preventDefault();
        setThemeMode(next);
    };

    return (
        <a href="" onClick={toggle} title={`Theme: ${label}, click to switch to ${modeInfo[next][1]}`}>
            <i>{icon}</i>
            <span>{label}</span>
        </a>
    );
}

// All modes side by side, for the mobile hub list where cycling on tap isn't discoverable
function ThemePicker() {
    const mode = setting.value.themeMode || "auto";
    return (
        <div class="row max">
            <i>palette</i>
            <div class="max">Theme</div>
            <nav class="group connected">
                {themeModes.map((m) => (
                    <button
                        class={`small ${m === mode ? "active" : "border"}`}
                        onClick={() => setThemeMode(m)}
                        title={modeInfo[m][1]}
                        aria-pressed={m === mode}
                    >
                        <i>{modeInfo[m][0]}</i>
                    </button>
                ))}
            </nav>
        </div>
    );
}

function Navigation() {
    const active = useActiveSection();
    return (
        <>
            <nav class="left max l">
                <header>
                    <nav>
                        <img class="circle" src={productIcon} alt="" />
                        <h6>{process.env.PRODUCT}</h6>
                    </nav>
                </header>
                <NavLinks active={active} />
                <div class="max"></div>
                <ThemeToggle />
            </nav>
            <nav class="left m">
                <header>
                    <img class="circle" src={productIcon} alt="" />
                </header>
                <NavLinks active={active} />
                <div class="max"></div>
                <ThemeToggle />
            </nav>
        </>
    );
}

function SyncStatus({ error }) {
    const u = user.value;
    if (setting.value.isPro && u.loggedIn) {
        return error ? (
            <i class="error-text" title={`Sync error: ${error}, please try again later or contact support at https://pnl.dev`}>
                cloud_off
            </i>
        ) : (
            <i class="primary-text fill" title="Synced to the cloud">
                cloud_done
            </i>
        );
    }
    return (
        <a href={u.subscriptionLink} target="_blank" title="Not synced to the cloud, upgrade to Pro to enable cloud sync">
            <i class="muted">cloud_off</i>
        </a>
    );
}

function SessionExpired({ what }) {
    if (!setting.value.isPro || user.value.loggedIn !== false) return null;
    return (
        <article class="error-container round row wrap">
            <i>warning</i>
            <div class="max">
                <strong>Your session has expired.</strong> Please log in again to sync your {what}.
            </div>
            <a class="button error" href={user.value.link} target="_blank">
                Log in
            </a>
        </article>
    );
}

function Section({ id, title, extra, children }) {
    if (isMobile.value) {
        return (
            <section id={id} class="section">
                <header class="fixed">
                    <nav>
                        <a class="button circle transparent" href="" onClick={goToHub} title="Back">
                            <i>arrow_back</i>
                        </a>
                        <h6 class="max">{title}</h6>
                        {extra}
                    </nav>
                </header>
                {children}
            </section>
        );
    }
    return (
        <section id={id} class="section">
            <h4 class="row small-space">
                <span>{title}</span>
                {extra}
            </h4>
            {children}
        </section>
    );
}

const loading = (text) => (
    <div class="row padding">
        <progress class="circle small"></progress>
        <span>{text}</span>
    </div>
);

function HistorySection() {
    let content;
    if (setting.value.disableWordHistory) content = <p>Word history is disabled!</p>;
    else if (!history.value) content = loading("Loading your history...");
    else content = <HistoryTable />;

    return (
        <Section id="history" title="History" extra={<SyncStatus />}>
            {!setting.value.isPro && historyAlmostFull.value && (
                <article class="tertiary-container round row wrap">
                    <i>warning</i>
                    <div class="max">
                        <strong>Your local storage is almost full.</strong> Please consider upgrading to Pro to enable cloud
                        sync and get unlimited history. Otherwise, the oldest word in history will be removed when the storage
                        is full.
                    </div>
                    <a class="button tertiary" href={user.value.subscriptionLink} target="_blank">
                        Upgrade to Pro
                    </a>
                </article>
            )}
            <SessionExpired what="history" />
            {content}
        </Section>
    );
}

function DictSection() {
    return (
        <Section id="dictionary" title="Dictionaries" extra={<SyncStatus error={syncDictsError.value} />}>
            <SessionExpired what="dictionaries" />
            <p class="muted m l">
                Tip 1: Ctrl/Cmd + click a dictionary name to open several dictionaries simultaneously. <br />
                Tip 2: Drag the <i class="small">drag_indicator</i> handle to reorder the dictionaries.
            </p>
            {allDicts.value ? <DictTable /> : loading("Loading your dictionaries...")}
        </Section>
    );
}

const sectionViews = {
    history: () => <HistorySection />,
    dictionary: () => <DictSection />,
    "function-setting": () => (
        <Section id="function-setting" title="Settings">
            <GeneralSettings />
        </Section>
    ),
    "pro-setting": () => (
        <Section
            id="pro-setting"
            title="Pro Settings"
            extra={
                <a href="https://pnl.dev/pro" target="_blank" title="What is this?">
                    <i>help</i>
                </a>
            }
        >
            <ProSettings />
        </Section>
    ),
    "shortcut-setting": () => (
        <Section id="shortcut-setting" title="Hotkeys">
            <Hotkeys />
        </Section>
    ),
    about: () => (
        <Section id="about" title="About">
            <About />
        </Section>
    ),
};

// Phones: a hub page, or the single section named in the hash
function MobileMain() {
    const view = sectionViews[route.value];
    useEffect(() => scrollTo(0, 0), [route.value]);
    return <main class="responsive">{view ? view() : <MobileHome themePicker={<ThemePicker />} />}</main>;
}

function DesktopMain() {
    return (
        <>
            <Navigation />
            <main class="responsive">
                <Home />
                {sections.map(({ id }) => sectionViews[id]())}
            </main>
        </>
    );
}

export default function App() {
    const [voicesOpen, setVoicesOpen] = useState(/synthesis|voice/.test(location.search));

    useEffect(() => {
        utils.send("open options request to", ({ to }) => {
            if (!to) return;
            if (isMobile.value) location.hash = to;
            else document.getElementById(to)?.scrollIntoView();
        });
    }, []);

    return (
        <>
            {isMobile.value ? <MobileMain /> : <DesktopMain />}
            <Snackbar />
            <ConfirmHost />
            <WelcomeDialog />
            <WhatsNewDialog />
            <SynthesisDialog open={voicesOpen} onClose={() => setVoicesOpen(false)} />
        </>
    );
}
