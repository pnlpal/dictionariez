import $ from "jquery";
import moment from "moment";
import utils from "utils";

import "../starrr.js";

import "bootstrap/js/scrollspy.js";
import "bootstrap/js/modal.js";

import "bootoast/dist/bootoast.min.css";
import bootoast from "bootoast/dist/bootoast.min.js";

import "datatables.net-dt";
import "datatables.net-bs";
import "datatables.net-bs/css/dataTables.bootstrap.css";

import "datatables.net-select";

import "datatables.net-buttons";
import "datatables.net-buttons/js/buttons.html5.js";

import "datatables.net-rowreorder-bs4";
import "datatables.net-rowreorder-bs4/css/rowReorder.bootstrap4.css";

const isSidePal = process.env.PRODUCT === "SidePal";

const confirmDelete = (content, twice) =>
    new Promise(function (resolve) {
        $("#confirm-delete-modal")
            .off("show.bs.modal")
            .on("show.bs.modal", () => $("#confirm-delete-modal .modal-body p").text(content));

        $("#confirm-delete-modal .modal-footer .button-confirm")
            .off("click")
            .on("click", function (e) {
                if (twice) {
                    e.stopPropagation(); // prevent closing the modal
                    confirmDelete("Are you really sure?").then(resolve);
                } else {
                    resolve();
                }
            });

        $("#confirm-delete-modal").modal("show");
    });

const buildActionIcon = function (name) {
    let cls, faIcon;
    switch (name) {
        case "remove":
            faIcon = "fa-remove";
            cls = "text-danger";
            break;
        case "export to Anki":
            faIcon = "fa-share-square-o";
            cls = "text-warning";
            break;
        case "saved in Anki":
            faIcon = "fa-retweet";
            cls = "text-muted";
            break;
        case "comment":
            faIcon = "fa-comment-o";
            cls = "text-muted";
            break;
    }

    const iEl = `<i class='fa ${faIcon}' aria-hidden='true' data-action='${name}' title='${name}'></i>`;
    return `<a href='' class='action-button ${cls}' data-action='${name}' title='${name}'> ${iEl} </a>`;
};

const buildActionButton = ({ name, cls = "" }) =>
    `<a href='' class='action-button btn btn-xs ${cls}' data-action='${name}'> ${name} </a>`;

const bravo = () =>
    bootoast.toast({
        message: "Bravo!",
        type: "success",
        position: "top",
        timeout: 1,
        dismissible: false,
    });

const initHistory = async function () {
    if (!$("#table-history").length) {
        return;
    }
    const data = await utils.send("history");
    var table = $("#table-history").DataTable({
        responsive: true,
        dom: '<"pull-left"f><"pull-left"i><"pull-right"B>tp',
        paging: false,
        autoWidth: false,
        select: {
            style: "os",
            className: "active",
        },
        buttons: [
            {
                text: "Delete",
                className: "btn btn-danger",
                action() {
                    let twice = false;
                    let rows = table.rows({ selected: true, filter: "applied" });
                    let rowsData = rows.data().toArray();
                    if (!rowsData.length) {
                        rows = table.rows({ filter: "applied" });
                        rowsData = rows.data().toArray();
                        if (rowsData.length > 10) {
                            twice = true;
                        }
                    }

                    if (!rowsData.length) {
                        return;
                    }

                    confirmDelete(`Are you sure to delete all ${rowsData.length} records?`, twice).then(function () {
                        utils.send("remove history", { w: rowsData.map((item) => item.w) });
                        rows.remove().draw();
                    });
                },
            },
            {
                extend: "csv",
                extension: ".csv",
                bom: true,
                text: "Download",
                filename: "dictionaries-history",
                className: "btn btn-info",
                exportOptions: {
                    columns: ["w:name", "r:name", "sentence:name", "s:name", "t:name"],
                    orthogonal: "download",
                },
            },
            !isSidePal
                ? {
                      text: "Start Anki Study",
                      className: "btn btn-success",
                      action() {
                          const href = "https://ankiweb.net/study/";
                          window.open(href, "_blank");
                      },
                  }
                : null,
        ].filter(Boolean),
        order: [[4, "desc"]],
        columns: [
            {
                name: "w",
                title: "Word",
                data: "w",
                render(data, type) {
                    if (type === "display") {
                        return `<a href='', class='dictionaries-history-word dictionariez-w ellipsis' data-w='${data}'> ${data} </a>`;
                    }
                    return data;
                },
            },
            {
                name: "r",
                title: "Rate",
                data: "r",
                width: "60px",
                render(data, type) {
                    if (type === "display") {
                        return `<div class='starrr' title='Change rating' data-rating='${data || 0}'></div>`;
                    }

                    return data || 0;
                },
            },
            {
                name: "sentence",
                title: "Sentence",
                className: "column-sentence",
                data: "sentence",
                render(data, type, row) {
                    if (!data) {
                        return "";
                    }
                    if (type === "download") {
                        return data;
                    }

                    const text = utils.sanitizeHTML(data);
                    return `<span class='ellipsis w-sentence' title='${text}'> ${text} </span>`;
                },
            },
            {
                name: "s",
                title: "Source",
                className: "column-s",
                data: "s",
                render(data, type, row) {
                    if (!data) {
                        return "";
                    }
                    if (type === "download") {
                        return data;
                    }
                    return `<a class='link-s ellipsis' target='_blank' href='${data}' title='${row.sc || data}'> ${
                        row.sc || data
                    } </a>`;
                },
            },
            {
                name: "t",
                title: "Time",
                data: "t",
                width: "150px",
                render(data, type) {
                    return moment(data).format("YYYY-MM-DD HH:mm:ss");
                },
            },
            {
                name: "action",
                title: "Action",
                render(data, type, row) {
                    if (type === "display") {
                        if (isSidePal) {
                            return buildActionIcon("remove");
                        }
                        if (row.ankiSaved) {
                            return buildActionIcon("saved in Anki") + buildActionIcon("remove");
                        }
                        return buildActionIcon("export to Anki") + buildActionIcon("remove");
                    }
                    return "";
                },
            },
        ],
        data,
    });

    $("#table-history .starrr")
        .starrr({ numStars: 3 })
        .on("starrr:change", async function (e, value) {
            const row = table.row($(e.currentTarget).closest("tr"));
            const rowData = row.data();
            await utils.send("rating", {
                value,
                text: rowData.w,
            });
            bravo();
        });

    return $("#table-history tbody").on("click", "td", async function (e) {
        let row, rowData;
        if ($(e.currentTarget).has(".action-button").length) {
            e.preventDefault();
            e.stopPropagation();

            row = table.row($(e.currentTarget).closest("tr"));
            rowData = row.data();

            switch ($(e.target).data("action")) {
                case "remove":
                    await utils.send("remove history", rowData);
                    row.remove().draw();
                    bravo();
                    break;
                case "export to Anki":
                    await utils.send("open anki", rowData);
                    break;
            }
        }

        if ($(e.target).hasClass("dictionaries-history-word")) {
            e.preventDefault();
            e.stopPropagation();

            row = table.row($(e.target).closest("tr"));
            rowData = row.data();

            utils.send("look up", {
                w: $(e.target).data("w").trim(),
                sentence: rowData.sentence,
            });
        }
    });
};

initHistory();

const initDictionary = async function () {
    const { currentDictName, allDicts } = await utils.send("dictionary", { optionsPage: true });

    window.allDicts = allDicts;

    const table = $("#table-dictionary").DataTable({
        responsive: true,
        dom: '<"pull-left"f><"pull-left"i><"pull-right"B>tp',
        paging: false,
        // ordering: false,
        rowReorder: {
            dataSrc: "sequence",
        },
        buttons: [
            {
                text: "Add more dicts",
                className: "btn btn-success",
                action() {
                    const href = "https://pnl.dev/category/4/dictionariez-trove";
                    window.open(href, "_blank");
                },
            },
            {
                text: "Restore default",
                className: "btn btn-default",
                action() {
                    bootoast.toast({
                        message:
                            '<span>Are you sure?</span><button type="button" class="restore-default-dicts btn btn-sm btn-success pull-right">Yes</button>',
                        type: "info",
                        timeout: 5000,
                        icon: "",
                        position: "top",
                        animationDuration: "300",
                        dismissable: true,
                    });
                },
            },
        ],
        columns: [
            {
                name: "sequence",
                title: "Sequence",
                data: "sequence",
                visible: false,
                orderable: true,
                // render: (data) -> data || 0
            },
            {
                name: "name",
                title: "Name",
                data: "dictName",
                className: "reorder",
                orderable: false,
                render(data, type, row) {
                    if (type === "display") {
                        return `<a class='link-dict-name' href='' data-name='${data}' title='${data}'> ${data} </a>`;
                    }
                    return data;
                },
            },
            {
                name: "action",
                title: "Action",
                orderable: false,
                render(data, type, row) {
                    if (type === "display") {
                        let el = "";
                        if (row.troveUrl) {
                            el += buildActionIcon("comment");
                        }
                        el += buildActionIcon("remove");
                        return el;
                    }

                    return "";
                },
            },
        ],
        data: allDicts,
    });

    table.on("row-reorder", function (e, diff) {
        const dictMap = {};
        diff.forEach(function (item) {
            const rowData = table.row(item.node).data();
            dictMap[rowData.dictName] = { sequence: item.newData };
        });

        utils.send("set-dictionary-reorder", { dictMap });
    });

    $("#table-dictionary tbody").on("click", "td", async function (e) {
        let row, rowData;
        if ($(e.currentTarget).has(".action-button").length) {
            e.preventDefault();
            e.stopPropagation();

            row = table.row($(e.currentTarget).closest("tr"));
            rowData = row.data();

            switch ($(e.target).data("action")) {
                case "remove":
                    await utils.send("dictionary-remove", rowData);
                    row.remove().draw();
                    bravo();
                    break;
                case "comment":
                    window.open(rowData.troveUrl, "_blank");
                    break;
            }
        }

        if ($(e.currentTarget).has(".link-dict-name").length) {
            e.preventDefault();
            e.stopPropagation();

            row = table.row($(e.currentTarget).closest("tr"));
            rowData = row.data();

            utils.send("look up", {
                dictName: rowData.dictName,
                newDictWindow: e.ctrlKey || e.metaKey,
            });
        }
    });

    $(document).on("click", ".restore-default-dicts", async () => {
        await utils.send("restore-default-dicts");
        location.reload();
    });
};

initDictionary();

utils.send("open options request to", function ({ to }) {
    if (to) {
        $(`.nav li a[href='#${to}']`)[0]?.click();
    }
});

// in order to display the page after css loaded.
$("body").show();
