// This file is auto-copied. Do not edit directly.

import { AD_BLOCK_DOMAINS } from "./adBlockDomains";

// Cosmetic ad hiding applied to every dictionary's WebView, on top of
// whatever site-specific overrides live in that dictionary's own `css`
// field in dictionaries.js. CSS alone can only hide elements after they've
// already loaded — adBlockJs.js is the counterpart that stops the network
// requests and cleans up leftover layout gaps.
const DOMAIN_IFRAME_SELECTORS = AD_BLOCK_DOMAINS.map(
  (domain) => `iframe[src*="${domain}"]`,
);

// Every selector below is also reused by adBlockJs.js's MutationObserver to
// *remove* (not just hide) matching nodes — keep this list, not the CSS
// text, as the thing to extend.
export const AD_BLOCK_SELECTORS = [
  ...DOMAIN_IFRAME_SELECTORS,

  // Google Publisher Tag's standard slot/iframe naming convention.
  '[id^="div-gpt-ad"]',
  'iframe[id^="google_ads_iframe"]',
  "ins.adsbygoogle",

  // Amazon Publisher Services-style slot ids (ad_topslot, ad_leftslot,
  // ad_contentslot_1, ...) — these reserve their own min-height via the ad
  // vendor's stylesheet regardless of whether an ad ever loads, so they
  // need to be hidden directly rather than relying on their (empty) content
  // to disappear. Seen across multiple HarperCollins-family dictionary
  // sites (Collins, Longman/LDOCE).
  '[id^="ad_"][id*="slot"]',

  // "Native ad" / content-recommendation widgets — common on news and
  // dictionary sites, often the most visually disruptive.
  ".taboola",
  '[id^="taboola-"]',
  ".OUTBRAIN",
  '[id^="outbrain_widget"]',
  ".mgid-widget",
  ".rc-widget",

  // Ad-tooling data/aria attributes — more reliable than class names since
  // they're added for accessibility or tooling, not styling.
  "[data-ad-slot]",
  "[data-ad-client]",
  "[data-google-query-id]",
  '[aria-label="Advertisement" i]',

  // Exact class-token matches (~= matches a whole space-separated class
  // token, not a substring) — avoids "header"/"gradient"/"load" style
  // false positives that a *= substring match would produce.
  '[class~="ad"]',
  '[class~="ads"]',
  '[class~="advert"]',
  '[class~="advertisement"]',
  '[class~="sponsored"]',

  // Sticky/anchor ad units — intrusive mobile format, fairly consistent
  // naming across sites.
  ".sticky-ad",
  ".anchor-ad",
  "#anchor_ad",
];

export const AD_BLOCK_CSS = `
${AD_BLOCK_SELECTORS.join(",\n")} {
  display: none !important;
}
`;
