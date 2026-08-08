// This file is auto-copied. Do not edit directly.

#!/usr/bin/env node

/**
 * Verification script for dictionary variant language pairs (Mac version)
 * Opens each link in default browser for 3 seconds, logs results for manual verification
 *
 * Run with: node dictionary-variants-verify-links.js
 * Mac only: uses 'open' command to launch links in default browser
 */

import { DICTIONARY_VARIANTS } from "./dictionary-variants.js";
import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";

const execAsync = promisify(exec);

// Language-specific test words (comprehensive)
const TEST_WORDS_BY_LANGUAGE = {
  English: "water",
  Spanish: "agua",
  French: "eau",
  German: "wasser",
  Italian: "acqua",
  Dutch: "water",
  Swedish: "vatten",
  Norwegian: "vann",
  Danish: "vand",
  Polish: "woda",
  Portuguese: "água",
  Turkish: "su",
  "Chinese (Mandarin)": "水",
  "Chinese (Cantonese)": "水",
  Chinese: "水",
  Japanese: "水",
  Korean: "물",
  Arabic: "ماء",
  Hindi: "पानी",
  Russian: "вода",
  Greek: "νερό",
  Hebrew: "מים",
  Romanian: "apă",
  Vietnamese: "nước",
  Ukrainian: "вода",
  Persian: "آب",
  Slovak: "voda",
  Hungarian: "víz",
  Catalan: "aigua",
  Czech: "voda",
  Finnish: "vesi",
  Malay: "air",
  Swahili: "maji",
  Thai: "น้ำ",
  Tamil: "நீர்",
  Tajik: "об",
};

// Parse command-line arguments
const args = process.argv.slice(2);
let filterDict = null;
let showHelp = false;

for (let i = 0; i < args.length; i++) {
  if (args[i] === "--dict" && i + 1 < args.length) {
    filterDict = args[i + 1];
  }
  if (args[i] === "--help" || args[i] === "-h") {
    showHelp = true;
  }
}

const BROWSER_TIMEOUT_MS = 3000; // 3 seconds per page
const LOG_FILE = "dictionary-verification-log.txt";

const results = {
  passed: [],
  failed: [],
};

/**
 * Sleep helper
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Build test URL for a variant
 */
function buildTestUrl(variantKey, language) {
  const variant = DICTIONARY_VARIANTS[variantKey];
  if (!variant || !variant.languages[language]) {
    return null;
  }

  const langConfig = variant.languages[language];
  let url = variant.urlTemplate;

  // Replace template variables with language config
  Object.entries(langConfig).forEach(([key, value]) => {
    url = url.replace(`{${key}}`, value);
  });

  // Replace word placeholder with language-specific test word
  const testWord = TEST_WORDS_BY_LANGUAGE[language] || "water";
  url = url.replace("<word>", encodeURIComponent(testWord));

  return url;
}

/**
 * Open URL in default browser and wait
 */
async function testUrl(variantKey, language, testWord, url, index, total) {
  console.log(`\n[${index}/${total}] Opening: ${variantKey} (${language})`);
  console.log(`   Word: ${testWord}`);
  console.log(`   URL: ${url}`);

  try {
    // Open URL in default browser
    await execAsync(`open "${url}"`);

    // Wait 3 seconds for user to visually inspect
    console.log(`   ⏳ Open for 3 seconds... Look at your browser!`);
    await sleep(BROWSER_TIMEOUT_MS);

    // Ask user if it worked (or assume success after 3 seconds)
    results.passed.push({
      variantKey,
      language,
      testWord,
      url,
    });

    console.log(`   ✅ Logged as working (you can verify)`);
  } catch (error) {
    results.failed.push({
      variantKey,
      language,
      testWord,
      url,
      error: error.message,
    });

    console.log(`   ❌ Error: ${error.message}`);
  }
}

function help() {
  console.log(`
    Usage:
  node dictionary-variants-verify-links.js [--dict <dictionaryName>] [--help]
  
  Options:
    --dict <dictionaryName>  Test only a specific dictionary variant (e.g., GoogleTranslate)
    --help, -h               Show this help message

  Example:
    node src/constants/dictionaries/dictionary-variants-verify-links.js --dict GoogleTranslate
    node src/constants/dictionaries/dictionary-variants-verify-links.js --dict Reverso
    node src/constants/dictionaries/dictionary-variants-verify-links.js --dict Bab.la
    node src/constants/dictionaries/dictionary-variants-verify-links.js --dict Glosbe
    node src/constants/dictionaries/dictionary-variants-verify-links.js --dict Dict.com
  `);
}

/**
 * Main verification function
 */
async function verifyAll() {
  console.log("🔍 Dictionary Variant Verification (Mac Browser)\n");

  if (filterDict) {
    console.log(`Testing only: ${filterDict}\n`);
  }

  console.log("Instructions:");
  console.log("  1. Each link will open in your default browser for 3 seconds");
  console.log(
    "  2. Look at the page - does it show the dictionary for that word/language?",
  );
  console.log("  3. Script automatically logs as 'working' if page opens");
  console.log("  4. At the end, review the log file and mark false positives");

  if (showHelp) {
    help();
    return process.exit(0);
  }

  const tests = [];

  // Build all test URLs
  for (const variantKey of Object.keys(DICTIONARY_VARIANTS)) {
    // Skip if filtering by dictionary and this isn't it
    if (filterDict && variantKey !== filterDict) {
      continue;
    }

    const variant = DICTIONARY_VARIANTS[variantKey];

    for (const language of Object.keys(variant.languages)) {
      const url = buildTestUrl(variantKey, language);
      const testWord = TEST_WORDS_BY_LANGUAGE[language] || "water";
      if (url) {
        tests.push({ variantKey, language, testWord, url });
      }
    }
  }

  if (tests.length === 0) {
    console.log(
      `❌ No tests found${filterDict ? ` for dictionary: ${filterDict}` : ""}`,
    );
    console.log(
      `\nAvailable dictionaries: ${Object.keys(DICTIONARY_VARIANTS).join(", ")}`,
    );
    process.exit(1);
  }

  console.log(`Found ${tests.length} language pairs to test\n`);
  console.log("Starting verification...");
  console.log("=".repeat(80));

  // Test all URLs sequentially
  for (let i = 0; i < tests.length; i++) {
    const { variantKey, language, testWord, url } = tests[i];
    await testUrl(variantKey, language, testWord, url, i + 1, tests.length);
  }

  console.log("\n" + "=".repeat(80));
  console.log("✅ All links tested!\n");

  // Generate report
  generateReport();
}

/**
 * Generate verification report
 */
function generateReport() {
  const lines = [];

  lines.push("=".repeat(120));
  lines.push("DICTIONARY VERIFICATION REPORT");
  lines.push("=".repeat(120));
  lines.push("");
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push(`Total tested: ${results.passed.length + results.failed.length}`);
  lines.push(`Passed: ${results.passed.length}`);
  lines.push(`Failed: ${results.failed.length}`);
  lines.push("");
  lines.push("INSTRUCTIONS:");
  lines.push("  1. Review the lists below");
  lines.push(
    "  2. Edit this file and move any false positives from PASSED to FAILED",
  );
  lines.push(
    "  3. Once verified, copy the code at the end into dictionary-variants.js",
  );
  lines.push("");

  // Results by service
  lines.push("=".repeat(120));
  lines.push("PASSED (Looked OK - verify these)");
  lines.push("=".repeat(120));
  lines.push("");

  const passedByService = {};
  results.passed.forEach((r) => {
    if (!passedByService[r.variantKey]) {
      passedByService[r.variantKey] = [];
    }
    passedByService[r.variantKey].push(r);
  });

  for (const [service, items] of Object.entries(passedByService)) {
    lines.push(`\n${service} (${items.length} languages):`);
    items.forEach((r) => {
      lines.push(
        `  ${r.language.padEnd(20)} | word: ${r.testWord.padEnd(10)} | ${r.url}`,
      );
    });
  }

  lines.push("\n" + "=".repeat(120));
  lines.push("FAILED");
  lines.push("=".repeat(120));
  lines.push("");

  if (results.failed.length === 0) {
    lines.push("None - all links worked!");
  } else {
    results.failed.forEach((r) => {
      lines.push(
        `${r.variantKey.padEnd(15)} | ${r.language.padEnd(20)} | ${r.url}`,
      );
      if (r.error) {
        lines.push(`  Error: ${r.error}`);
      }
    });
  }

  // JavaScript for verified languages
  lines.push("\n" + "=".repeat(120));
  lines.push("VERIFIED LANGUAGES (Copy to dictionary-variants.js)");
  lines.push("=".repeat(120));
  lines.push("");

  for (const variantKey of Object.keys(DICTIONARY_VARIANTS)) {
    const variant = DICTIONARY_VARIANTS[variantKey];
    const verifiedLanguages = results.passed
      .filter((r) => r.variantKey === variantKey)
      .map((r) => r.language);

    if (verifiedLanguages.length > 0) {
      lines.push(`"${variantKey}": {`);
      verifiedLanguages.forEach((lang, i) => {
        const config = variant.languages[lang];
        const comma = i < verifiedLanguages.length - 1 ? "," : "";
        lines.push(`  "${lang}": ${JSON.stringify(config)}${comma}`);
      });
      lines.push("},");
      lines.push("");
    }
  }

  const report = lines.join("\n");

  // Print summary to console
  console.log("\n📊 SUMMARY:");
  console.log(`✅ Passed:  ${results.passed.length}`);
  console.log(`❌ Failed:  ${results.failed.length}`);
  console.log(`\n💾 Full report saved to: ${LOG_FILE}`);

  // Save to file
  fs.writeFileSync(LOG_FILE, report, "utf-8");

  // Print passed services summary
  console.log("\n📈 By Service:");
  for (const [service, items] of Object.entries(passedByService)) {
    console.log(`   ${service}: ${items.length} languages`);
  }
}

// Run verification
verifyAll().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
