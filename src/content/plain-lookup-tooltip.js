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
};
