import { useEffect, useState } from "preact/hooks";
import allLangs from "../../resources/langs.json";
import getDefaultSynthesisVoice from "../../other/getDefaultSynthesisVoice";
import { setting, saveSetting, toast } from "../state.js";
import { Dialog } from "../components/Dialog.jsx";
import { Select } from "../components/controls.jsx";

const synthesisLangs = Object.keys(allLangs).filter((lang) => allLangs[lang].synthesis);

const voicesFor = (voices, code) => voices.filter((v) => v.lang?.replace("_", "-").startsWith(code.split("-")[0]));

function useVoices() {
    const [voices, setVoices] = useState([]);
    const [recommended, setRecommended] = useState({});

    useEffect(() => {
        const load = async () => {
            setVoices(speechSynthesis.getVoices());
            const next = {};
            for (const lang of synthesisLangs) {
                const code = allLangs[lang].synthesis;
                const v = await getDefaultSynthesisVoice(code, null, lang);
                next[code] = v ? v.name : "System Default";
            }
            setRecommended(next);
        };
        speechSynthesis.onvoiceschanged = load;
        load();
        return () => (speechSynthesis.onvoiceschanged = null);
    }, []);

    return { voices, recommended };
}

export default function SynthesisDialog({ open, onClose }) {
    const { voices, recommended } = useVoices();
    const [showAll, setShowAll] = useState(false);
    const enabled = setting.value.enabledLanguages || ["English"];
    const chosen = setting.value.synthesisVoices || {};

    const change = async (code, name) => {
        await saveSetting("synthesisVoices", { ...chosen, [code]: name }, { silent: true });
        toast("Voice setting saved.", { timeout: 2 });
    };

    return (
        <Dialog open={open} onClose={onClose} className="large">
            <h5>Synthesis voice options</h5>
            <p class="muted">Customize the voice used for each language.</p>
            {synthesisLangs
                .filter((lang) => showAll || enabled.includes(lang))
                .map((lang) => {
                    const code = allLangs[lang].synthesis;
                    return (
                        <Select
                            label={lang}
                            value={chosen[code] || ""}
                            onChange={(name) => change(code, name)}
                            options={[
                                ["", `Recommended (${recommended[code] || "Auto"})`],
                                ["__SYSTEM_DEFAULT__", "System Default"],
                                ...voicesFor(voices, code).map((v) => v.name),
                            ]}
                        />
                    );
                })}
            <nav class="right-align">
                <button class="border" onClick={() => setShowAll(!showAll)}>
                    {showAll ? "Hide Disabled Languages" : "Show All Languages"}
                </button>
                <button class="primary" onClick={onClose}>
                    Done
                </button>
            </nav>
        </Dialog>
    );
}
