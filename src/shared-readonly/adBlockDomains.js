// This file is auto-copied. Do not edit directly.

// Single source of truth for ad-serving domains: used both to build
// iframe[src*="..."] CSS selectors (adBlockCss.js) and to block matching
// script/iframe/img src's from ever loading (adBlockJs.js). Kept
// deliberately small and high-confidence — domains that only ever serve
// ads/trackers, never legitimate dictionary content — to keep false
// positives rare.
export const AD_BLOCK_DOMAINS = [
  // Google ad stack
  "doubleclick.net",
  "2mdn.net",
  "googlesyndication.com",
  "googleadservices.com",
  "googletagservices.com",
  // Major demand-side / exchange / header-bidding networks
  "amazon-adsystem.com",
  "adnxs.com",
  "criteo.com",
  "criteo.net",
  "pubmatic.com",
  "rubiconproject.com",
  "openx.net",
  "casalemedia.com",
  "media.net",
  "smartadserver.com",
  // Native/content-recommendation widgets
  "taboola.com",
  "outbrain.com",
  // Ad verification/tracking pixels
  "adsafeprotected.com",
];
