const ignoredSites = [
  "https://twitter.com", // https://github.com/pnlpal/dictionariez/issues/38
];

export default function (colour) {
  if (ignoredSites.includes(location.origin)) return;

  var range,
    sel = window.getSelection();
  if (sel.rangeCount && sel.getRangeAt) {
    range = sel.getRangeAt(0);
  }
  document.designMode = "on";
  if (range) {
    sel.removeAllRanges();
    sel.addRange(range);
  }
  // Use HiliteColor since some browsers apply BackColor to the whole block
  if (!document.execCommand("HiliteColor", false, colour)) {
    document.execCommand("BackColor", false, colour);
  }
  document.designMode = "off";
}
