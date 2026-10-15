import { signal } from "@preact/signals";

export const sections = [
    { id: "history", icon: "history", label: "History", hint: "Words you have looked up" },
    { id: "dictionary", icon: "dictionary", label: "Dictionaries", hint: "Choose and reorder your dictionaries" },
    { id: "function-setting", icon: "tune", label: "Settings", hint: "Lookup, languages and appearance" },
    { id: "pro-setting", icon: "workspace_premium", label: "Pro Settings", hint: "AI, cloud sync and more" },
    { id: "shortcut-setting", icon: "keyboard", label: "Hotkeys", hint: "Keyboard shortcuts" },
];

// Phones get a hub page linking to one section per page; Beer's `s` breakpoint
const mobileQuery = matchMedia("(max-width: 600px)");
export const isMobile = signal(mobileQuery.matches);
mobileQuery.addEventListener("change", (e) => (isMobile.value = e.matches));

// The section id in the hash, "" for the mobile hub page
const readRoute = () => decodeURIComponent(location.hash.slice(1));
export const route = signal(readRoute());

// Whether the current section page was opened from the hub, so going back can pop history instead of pushing
let openedFromHub = false;
addEventListener("hashchange", () => {
    openedFromHub = route.value === "" && readRoute() !== "";
    route.value = readRoute();
});

export function goToHub(e) {
    e?.preventDefault();
    if (openedFromHub) {
        history.back();
    } else {
        history.replaceState(null, "", location.pathname + location.search);
        route.value = "";
    }
}
