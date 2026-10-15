import { useState } from "preact/hooks";
import {
    tableFeatures,
    useTable,
    createColumnHelper,
    rowSortingFeature,
    createSortedRowModel,
    sortFn_alphanumeric,
    sortFn_basic,
    columnFilteringFeature,
    globalFilteringFeature,
    createFilteredRowModel,
    filterFn_includesString,
    rowSelectionFeature,
} from "@tanstack/preact-table";
import utils from "utils";
import { history, bravo } from "../state.js";
import { confirm } from "../components/Dialog.jsx";
import { Stars } from "../components/controls.jsx";

const PAGE_SIZE = 200;

const features = tableFeatures({
    rowSortingFeature,
    sortedRowModel: createSortedRowModel(),
    sortFns: { alphanumeric: sortFn_alphanumeric, basic: sortFn_basic },
    columnFilteringFeature,
    globalFilteringFeature,
    filteredRowModel: createFilteredRowModel(),
    filterFns: { includesString: filterFn_includesString },
    rowSelectionFeature,
});

const helper = createColumnHelper();
const columns = helper.columns([
    helper.accessor("w", { header: "Word", sortFn: "alphanumeric" }),
    helper.accessor((row) => row.r || 0, { id: "r", header: "Rate", sortFn: "basic" }),
    helper.accessor((row) => row.sentence || "", { id: "sentence", header: "Sentence", sortFn: "alphanumeric" }),
    helper.accessor((row) => row.sc || row.s || "", { id: "s", header: "Source", sortFn: "alphanumeric" }),
    helper.accessor("t", { header: "Time", sortFn: "basic" }),
    helper.display({ id: "action", header: "Action", enableSorting: false }),
]);
const searchableColumns = ["w", "sentence", "s"];

const pad = (n) => String(n).padStart(2, "0");
const formatTime = (t) => {
    const d = new Date(t);
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

const langOf = (row) => row.lang || row.detectedLangInContext;

const downloadCsv = (items) => {
    const cell = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const lines = [
        ["Word", "Rate", "Sentence", "Source", "Time"],
        ...items.map((x) => [x.w, x.r || 0, x.sentence, x.s, formatTime(x.t)]),
    ].map((line) => line.map(cell).join(","));
    const blob = new Blob(["﻿" + lines.join("\n")], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "dictionaries-history.csv";
    a.click();
    URL.revokeObjectURL(a.href);
};

const removeLocally = (items) => {
    const removed = new Set(items);
    history.value = history.value.filter((x) => !removed.has(x));
};

function EmptyHistory() {
    return (
        <article class="round center-align">
            <i class="extra">menu_book</i>
            <h6>No words yet, let's look one up!</h6>
            <p>Every word you look up is saved here, so you can review it, rate it and send it to Anki.</p>
        </article>
    );
}

export default function HistoryTable() {
    const [limit, setLimit] = useState(PAGE_SIZE);
    const table = useTable({
        features,
        columns,
        data: history.value,
        getRowId: (row) => String(row.wordId ?? row.w),
        initialState: { sorting: [{ id: "t", desc: true }] },
        enableSortingRemoval: false,
        globalFilterFn: "includesString",
        getColumnCanGlobalFilter: (column) => searchableColumns.includes(column.id),
    });

    const rows = table.getRowModel().rows;
    const selectedRows = rows.filter((row) => row.getIsSelected());
    const allSelected = rows.length > 0 && selectedRows.length === rows.length;
    const total = history.value.length;

    if (!total) return <EmptyHistory />;

    const toggleAll = () =>
        table.setRowSelection(allSelected ? {} : Object.fromEntries(rows.map((row) => [row.id, true])));

    const deleteRows = async () => {
        let targets = selectedRows;
        let twice = false;
        if (!targets.length) {
            targets = rows;
            twice = targets.length > 10;
        }
        if (!targets.length) return;

        if (!(await confirm(`Are you sure to delete all ${targets.length} records?`, { twice }))) return;

        const items = targets.map((row) => row.original);
        utils.send("remove history", { words: items.map(({ w, wordId }) => ({ w, wordId })) });
        removeLocally(items);
        table.resetRowSelection(true);
    };

    const exportRows = () => downloadCsv((selectedRows.length ? selectedRows : rows).map((row) => row.original));

    const rate = async (item, value) => {
        await utils.send("rating", { value, text: item.w });
        history.value = history.value.map((x) => (x === item ? { ...x, r: value } : x));
        bravo();
    };

    const removeOne = async (item) => {
        await utils.send("remove history", item);
        removeLocally([item]);
        bravo();
    };

    const lookUp = (e, item) => {
        e.preventDefault();
        utils.send("look up", { w: item.w.trim(), sentence: item.sentence, detectedLangInContext: langOf(item) });
    };

    const renderCell = (cell) => {
        const item = cell.row.original;
        switch (cell.column.id) {
            case "w":
                return (
                    <a
                        href=""
                        class="link bold dictionariez-w"
                        data-w={item.w}
                        data-sentence={utils.sanitizeHTML(item.sentence || "")}
                        data-lang={langOf(item)}
                        onClick={(e) => lookUp(e, item)}
                        title={`Look up "${item.w}"`}
                    >
                        {item.w}
                    </a>
                );
            case "r":
                return <Stars value={item.r || 0} onChange={(v) => rate(item, v)} />;
            case "sentence":
                return (
                    item.sentence && (
                        <span class="truncate" title={item.sentence}>
                            {item.sentence}
                        </span>
                    )
                );
            case "s":
                return (
                    item.s && (
                        <a class="link truncate" href={item.s} target="_blank" title={item.sc || item.s}>
                            {item.sc || item.s}
                        </a>
                    )
                );
            case "t":
                return <span class="no-wrap">{formatTime(item.t)}</span>;
            case "action":
                return (
                    <nav class="no-space">
                        {item.ankiSaved ? (
                            <button class="transparent circle small" disabled title="Saved in Anki">
                                <i>task_alt</i>
                            </button>
                        ) : (
                            <button
                                class="transparent circle small"
                                title="Export to Anki"
                                onClick={() =>
                                    utils.send("open anki", { ...item, detectedLangInContext: langOf(item) })
                                }
                            >
                                <i class="tertiary-text">share_windows</i>
                            </button>
                        )}
                        <button class="transparent circle small" title="Remove" onClick={() => removeOne(item)}>
                            <i class="error-text">delete</i>
                        </button>
                    </nav>
                );
        }
    };

    return (
        <div>
            <nav class="wrap">
                <div class="field border round small prefix no-margin search-field">
                    <i>search</i>
                    <input
                        type="search"
                        placeholder="Search words, sentences, sources"
                        value={table.state.globalFilter ?? ""}
                        onInput={(e) => table.setGlobalFilter(e.currentTarget.value)}
                    />
                </div>
                <span class="muted">
                    {rows.length === total ? `${total} words` : `${rows.length} of ${total} words`}
                    {selectedRows.length > 0 && `, ${selectedRows.length} selected`}
                </span>
                <div class="max"></div>
                <button class="error-container delete-button" onClick={deleteRows}>
                    <i>delete</i>
                    <span>{selectedRows.length ? "Delete selected" : "Delete"}</span>
                </button>
                <button class="secondary-container m l" onClick={exportRows}>
                    <i>download</i>
                    <span>Download</span>
                </button>
                <a class="button tertiary m l" href="https://ankiweb.net/study/" target="_blank">
                    <i>school</i>
                    <span>Start Anki Study</span>
                </a>
            </nav>

            <div class="scroll table-wrap">
                <table class="border history-table">
                    <thead>
                        <tr>
                            <th class="min">
                                <label class="checkbox">
                                    <input type="checkbox" checked={allSelected} onChange={toggleAll} />
                                    <span></span>
                                </label>
                            </th>
                            {table.getHeaderGroups()[0].headers.map((header) => {
                                const sorted = header.column.getIsSorted();
                                const canSort = header.column.getCanSort();
                                return (
                                    <th
                                        class={`col-${header.column.id} ${canSort ? "sortable" : ""}`}
                                        onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                                    >
                                        <span class="no-wrap">
                                            {header.column.columnDef.header}
                                            {sorted && (
                                                <i class="small">
                                                    {sorted === "desc" ? "arrow_downward" : "arrow_upward"}
                                                </i>
                                            )}
                                        </span>
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.slice(0, limit).map((row) => (
                            <tr key={row.id} class={row.getIsSelected() ? "selected" : ""}>
                                <td class="min">
                                    <label class="checkbox">
                                        <input
                                            type="checkbox"
                                            checked={row.getIsSelected()}
                                            onClick={row.getToggleSelectedHandler()}
                                        />
                                        <span></span>
                                    </label>
                                </td>
                                {row.getAllCells().map((cell) => (
                                    <td class={`col-${cell.column.id}`}>{renderCell(cell)}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                {!rows.length && <p class="center-align muted padding">No words match "{table.state.globalFilter}".</p>}
            </div>

            {rows.length > limit && (
                <nav class="center-align">
                    <button class="border" onClick={() => setLimit(limit + PAGE_SIZE)}>
                        <i>expand_more</i>
                        <span>Show more ({rows.length - limit} left)</span>
                    </button>
                </nav>
            )}
        </div>
    );
}
