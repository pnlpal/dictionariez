// This file is auto-copied. Do not edit directly.

// A CSS-only "force dark" fallback, used on both platforms: iOS's WKWebView
// has no native dark-mode API exposed by react-native-webview at all, and
// Android's forceDarkOn relies on a legacy WebView API that current WebView
// versions (~105+) silently ignore. Inverts the whole page, then inverts
// media back so photos/video don't render as negatives.
export const DARK_MODE_CSS = `
html {
  background: #fff !important;
  filter: invert(1) hue-rotate(180deg);
}
img, video, picture, iframe, svg, canvas {
  filter: invert(1) hue-rotate(180deg);
}
`;
