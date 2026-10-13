import { useEffect, useRef, useState } from "preact/hooks";
import Sortable from "sortablejs";
import utils from "utils";
import { allDicts, bravo } from "../state.js";
import { confirm } from "../components/Dialog.jsx";

const bySequence = (a, b) => (a.sequence ?? 0) - (b.sequence ?? 0);

// Reorder like DataTables rowReorder: the existing sequence values are redistributed in the new order.
const reorder = (dicts, oldIndex, newIndex) => {
    const sorted = [...dicts].sort(bySequence);
    const sequences = sorted.map((d) => d.sequence);
    const [moved] = sorted.splice(oldIndex, 1);
    sorted.splice(newIndex, 0, moved);

    const dictMap = {};
    const next = sorted.map((d, i) => {
        if (d.sequence === sequences[i]) return d;
        dictMap[d.dictName] = { sequence: sequences[i] };
        return { ...d, sequence: sequences[i] };
    });
    return { next, dictMap };
};

export default function DictTable() {
    const [term, setTerm] = useState("");
    const tbody = useRef();

    const filtering = !!term.trim();
    const dicts = [...allDicts.value].sort(bySequence);
    const shown = filtering ? dicts.filter((d) => d.dictName.toLowerCase().includes(term.trim().toLowerCase())) : dicts;

    useEffect(() => {
        const sortable = Sortable.create(tbody.current, {
            handle: ".drag-handle",
            animation: 150,
            ghostClass: "primary-container",
            onEnd({ item, from, oldIndex, newIndex }) {
                // Undo Sortable's DOM move and let Preact re-render from the new state
                from.insertBefore(item, from.children[oldIndex + (oldIndex > newIndex ? 1 : 0)] || null);
                if (oldIndex === newIndex) return;

                const { next, dictMap } = reorder(allDicts.value, oldIndex, newIndex);
                allDicts.value = next;
                utils.send("set-dictionary-reorder", { dictMap });
            },
        });
        return () => sortable.destroy();
    }, []);

    const lookUp = (e, dict) => {
        e.preventDefault();
        utils.send("look up", { dictName: dict.dictName, newDictWindow: e.ctrlKey || e.metaKey });
    };

    const remove = async (dict) => {
        await utils.send("dictionary-remove", dict);
        allDicts.value = allDicts.value.filter((d) => d !== dict);
        bravo();
    };

    const restoreDefault = async () => {
        if (await confirm("Restore the default dictionaries? Your changes to the list will be lost.", { confirmLabel: "Restore" })) {
            await utils.send("restore-default-dicts");
            location.reload();
        }
    };

    return (
        <div>
            <nav class="wrap">
                <div class="field border round small prefix no-margin search-field">
                    <i>search</i>
                    <input
                        type="search"
                        placeholder="Search dictionaries"
                        value={term}
                        onInput={(e) => setTerm(e.currentTarget.value)}
                    />
                </div>
                <span class="muted">{filtering ? `${shown.length} of ${dicts.length}` : dicts.length} dictionaries</span>
                <div class="max"></div>
                <a class="button primary" href="https://pnl.dev/category/4/dictionariez-trove" target="_blank">
                    <i>add</i>
                    <span>Add more dicts</span>
                </a>
                <button class="border" onClick={restoreDefault}>
                    <i>restart_alt</i>
                    <span>Restore default</span>
                </button>
            </nav>

            <table class="border dict-table">
                <tbody ref={tbody}>
                    {shown.map((dict) => (
                        <tr key={dict.dictName}>
                            <td class="min">
                                {/* reordering a filtered list would be ambiguous */}
                                {!filtering && (
                                    <i class="drag-handle" title="Drag to reorder">
                                        drag_indicator
                                    </i>
                                )}
                            </td>
                            <td>
                                <a href="" class="link" onClick={(e) => lookUp(e, dict)} title={dict.dictName}>
                                    {dict.dictName}
                                </a>
                            </td>
                            <td class="min">
                                <nav class="no-space">
                                    {dict.troveUrl && (
                                        <a class="button transparent circle small" href={dict.troveUrl} target="_blank" title="Comment">
                                            <i>forum</i>
                                        </a>
                                    )}
                                    <button class="transparent circle small" title="Remove" onClick={() => remove(dict)}>
                                        <i class="error-text">delete</i>
                                    </button>
                                </nav>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
