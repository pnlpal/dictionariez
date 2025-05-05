import utils from "utils";
import debounce from "lodash/debounce";

const setupAudioListener = () => {
  $(document).on(
    "click mouseover",
    ".fairydict-pron-audio",
    debounce(
      (e) => {
        e.stopPropagation();

        if (utils.isMobile() && e.type === "mouseover") {
          return; // on mobile mouseover will be triggered when click.
        }

        let synthesisObj = null;

        if ($(e.currentTarget).data("mp3")) {
          utils.send("play audios", {
            otherSrc: $(e.currentTarget).data("mp3"),
          });
        } else if ($(e.currentTarget).data("synthesis")) {
          synthesisObj = {
            text: $(e.currentTarget).data("w"),
            name: $(e.currentTarget).data("lang"),
            lang: $(e.currentTarget).data("synthesis"),
          };
          utils.send("play audios", { synthesisObj });
        } else if ($(e.currentTarget).hasClass("for-chatgpt-audio")) {
          synthesisObj = {
            text: $(e.currentTarget).parent().text(),
            lang: "en-US",
          };
          utils.send("play audios", { synthesisObj });
        }

        return false;
      },
      1000,
      { leading: true, trailing: false }
    )
  );
};

const wTpl = (w) => `<strong class='fairydict-w'> ${w} </strong>`;
const defTpl = (def) => `<span class='fairydict-def'> ${def} </span>`;
const defsTpl = (defs) => `<span class='fairydict-defs'> ${defs} </span>`;
const labelsTpl = (labels) => `<div class='fairydict-labels'> ${labels} </div>`;
const labelTpl = (label) => `<span class='fairydict-label'> ${label} </span>`;
const posTpl = (pos) => `<span class='fairydict-pos'> ${pos} </span>`;
const contentTpl = (content) =>
  `<div class='fairydict-content'> ${content} </div>`;
const pronSymbolTpl = (symbol = "", type = "") =>
  `<span class='fairydict-symbol fairydict-symbol-${type}'> <em> ${symbol} </em> </span>`;
const pronAudioTpl = (w, src = "", type = "", synthesis = "", lang = "") =>
  `<a class='fairydict-pron-audio fairydict-pron-audio-${type}' data-mp3='${src}' data-synthesis='${synthesis}' data-lang='${lang}' data-w='${w}'><i class='icon-fairydict-volume'></i></a>`;
const pronsTpl = (w, prons) =>
  `<div class='fairydict-prons'> ${w} ${prons} </div>`;

const renderQueryResult = (res) => {
  let html = "";

  let wHtml = "";
  let pronHtml = "";
  if (res?.w) {
    wHtml = wTpl(res.w);

    if (res?.prons) {
      pronHtml = res.prons.reduce((prev, cur) => {
        if (cur.synthesis || cur.audio || cur.symbol) {
          if (cur.symbol) prev += pronSymbolTpl(cur.symbol, cur.type);
          if (cur.synthesis || cur.audio)
            prev += pronAudioTpl(
              res.w.replaceAll("·", ""),
              cur.audio,
              cur.type,
              cur.synthesis,
              res.lang
            );
        }
        return prev;
      }, "");
    }
  }

  if (pronHtml || wHtml) html += pronsTpl(wHtml, pronHtml);

  const renderItem = (item) => {
    let posHtml = "";
    let defsHtml = "";
    let labelsHtml = "";

    if (item.pos) posHtml = posTpl(item.pos);
    const labelsCon = (item.labels || [])
      .map((name) => (name ? labelTpl(name) : ""))
      .reduce((prev, cur) => (cur ? prev + cur : prev), "");
    if (labelsCon) labelsHtml = labelsTpl(labelsCon);
    const defs = Array.isArray(item.def) ? item.def : [item.def];
    const defsCon = defs
      .map((def, i) =>
        def
          ? defs.length === 1
            ? defTpl(def)
            : defTpl(`${i + 1}. ${def}`)
          : ""
      )
      .reduce((prev, next) => (next ? prev + "<br>" + next : prev));
    if (defsCon) defsHtml = defsTpl(defsCon);

    if (defsHtml) html += contentTpl(posHtml + labelsHtml + defsHtml);
  };

  if (res?.defs) res.defs.forEach(renderItem);
  if (res?.defs2) res.defs2.forEach(renderItem);
  return html;
};

const getEnglishPronAudio = async (w) => {
  const res = await utils.send("get real person voice", { w });
  if (res?.prons) {
    let ameSrc = "";
    let breSrc = "";
    function addPronAudio(item) {
      if ($(`.fairydict-pron-audio-${item.type}`).length) {
        $(`.fairydict-pron-audio-${item.type}`).attr("data-mp3", item.audio);
      } else {
        const audioEl = pronAudioTpl(
          w.replaceAll("·", ""),
          item.audio,
          item.type,
          item.synthesis,
          "English"
        );
        const label_ =
          item.type === "ame" ? "US" : item.type === "bre" ? "UK" : item.type;
        const elWithLabel = `<em>${label_}</em>${audioEl}`;
        $(".fairydict-prons").append(elWithLabel);
      }
    }
    for (const item of res.prons) {
      addPronAudio(item);
    }
    utils.send("play audios", { ameSrc, breSrc, checkSetting: true });
  }
};

export default {
  $dictionariezTooltipContainer: null,
  init() {
    this.$dictionariezTooltipContainer = $("#dictionariez-tooltip-container")
      .length
      ? $("#dictionariez-tooltip-container")
      : $("html");

    $(`
<div class="dictionaries-tooltip">
    <div class="fairydict-spinner">
    <div class="fairydict-bounce1"></div>
    <div class="fairydict-bounce2"></div>
    <div class="fairydict-bounce3"></div>
    </div>
    <div class="dictionaries-tooltip-content">
    </div>
</div>
`).appendTo(this.$dictionariezTooltipContainer);

    setupAudioListener();
  },
  setupPlainContentPosition(e) {
    const $el = $(".dictionaries-tooltip");
    let pageX, pageY;

    if (e.pageX && e.pageY) {
      pageX = e.pageX;
      pageY = e.pageY;
    } else {
      pageX = e.changedTouches ? e.changedTouches[0].pageX : 0;
      pageY = e.changedTouches ? e.changedTouches[0].pageY : 0;
    }

    const containerOffset = this.$dictionariezTooltipContainer.offset();
    if ($el.length && pageY) {
      let mousex =
        pageX -
        containerOffset.left +
        25 +
        (this.$dictionariezTooltipContainer.data(
          "dictionariezTooltipOffsetLeft"
        ) || 0);
      let mousey =
        pageY -
        containerOffset.top +
        20 +
        (this.$dictionariezTooltipContainer.data(
          "dictionariezTooltipOffsetTop"
        ) || 0);
      let top = mousey;
      let left = mousex;

      const rect = $("#dictionariez-tooltip-container").length
        ? $("#dictionariez-tooltip-container")[0].getBoundingClientRect()
        : window.document.scrollingElement.getBoundingClientRect();
      const domW = window.innerWidth - rect.left;
      const domH = window.innerHeight - rect.top;

      if (domW - left < 300) {
        left = domW - 300;
      }
      if (domH - top < 200) {
        top = domH - 200;
      }

      $el.css({ top, left });
    }
  },
  showPlainContent(htmlContent, e) {
    $(".dictionaries-tooltip").fadeIn("slow");
    if (htmlContent) {
      $(".dictionaries-tooltip .fairydict-spinner").hide();
      $(".dictionaries-tooltip .dictionaries-tooltip-content").append(
        htmlContent
      );
    } else {
      $(".dictionaries-tooltip .fairydict-spinner").show();
      $(".dictionaries-tooltip .dictionaries-tooltip-content").empty();

      if (e) {
        const clickInside = $(".dictionaries-tooltip").has(e.target).length;
        if (!clickInside) {
          this.setupPlainContentPosition(e);
        }
      }
    }
  },
  hide() {
    $(".dictionaries-tooltip").fadeOut().hide();
  },
  renderPlainResult(res) {
    let html = "";
    res = Array.isArray(res) ? res : [res];
    for (const item of res) {
      html += renderQueryResult(item);

      if (item?.prons?.length && item.w) {
        if (item.prons.some((v) => ["bre", "ame"].includes(v.type))) {
          getEnglishPronAudio(item.w);
        }
      }
    }

    if (html) {
      this.showPlainContent(html);
    } else {
      this.hide();
    }
    return html;
  },
};
