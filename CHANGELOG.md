# v7.2.0 Jan 17, 2026 
- Removed Captionz from Dictionariez/Ordböcker; now available as the standalone Captionz-ext.
- Fixed the Microsoft Edge extension link.
- Fixed lookup tooltip width on sites like ESPN.

# v7.1.1 Jan 08, 2026 
- Added toast messages when settings are changed in the options page
- Added a go-to-settings icon in the selection bubble for easier configuration
- Added feedback request in the options page
- Fixed lookup result styles on some sites like lbr.co.uk
- Fixed repositioning the lookup bubble when clicking words inside the bubble itself
- Fixed handling of multiple selections, especially on Firefox
 
# v7.1.0 Jan 03, 2026 
- Added support for Dutch, Greek, Hindi, and Persian languages
- Fixed lookup of accented English words (e.g., détente)
- Enhanced English definitions to prioritize Wiktionary for German, Spanish, Italian, Japanese, and French, with Google as fallback
- Improved robustness with additional unit tests

# v7.0.0 Dec 30, 2025
- **AI Lookup**: Get contextual definitions, synonyms, examples, and pronunciations powered by AI.
- Added a setting to customize the response language for AI lookups.
- Enhanced the lookup bubble with quick actions: Switch between dictionary and AI lookup, Open App, Export to Anki, and Go to Settings.
- Added direct Anki export functionality from the main app window.
- Optimized TTS player and translator UI for smaller screens and fixed volume button sensitivity.
- Added support for closing the TTS player with the ESC key.
- Improved the responsive positioning of the lookup bubble on mobile and small screens.
- Added "Help Me Refine" button for selected text in editable fields.
- Implemented caching for recent lookup results to improve performance.
- Enabled lookup on text selection by default.
- Enabled word highlighting with the Meta key by default.
- Improved phrase lookup support (allowing spaces and hyphens).
- Fixed speech synthesis voice loading issues on Chrome.

# v6.4.4 Dec 21, 2025
- Disabled the Captionz button on YouTube by default.
- Fixed sentence searching on Captionz.
- Improved lookup accuracy by detecting sentence language.
- Enabled TTS and translations for shorter sentences (minimum 3 words).

# v6.4.3 Dec 08, 2025
- Fixed the translator's font size on websites with low `rem` unit settings.
- Fixed the translator's `z-index` to prevent overlapping issues on some websites.
- Removed the upfront privacy consent dialog.
- Added the ability to close the translator by pressing the `ESC` key.

# v6.4.2 Dec 01, 2025 
- Added more fallback voices for speech synthesis on different operating systems.
- Fixed speech synthesis voice selection on macOS.

# v6.4.1 Nov 29, 2025 
- Added option to show text selection bubble only when a modifier key is pressed.
- Added survey prompt on extension uninstall.

# v6.4.0 Nov 24, 2025
- Introduced PNL Translator: select any text on any website to translate. 
- Improved some minor UI regarding the bubble position and styles.

# v6.3.1 Nov 22, 2025 
- Improved TTS player by implementing lazy loading, ensuring compatibility with all websites (e.g., Epic Games login page).

# v6.3.0 Nov 19, 2025 
- Introduced TTS Pro: select any text on any website to read aloud.
- Added TTS helper speaker to select dictionaries (e.g., Cambridge English) for reading example sentences.

# v6.2.0 Nov 09, 2025 
- Added support for Turkish and Arabic languages lookup.
- Improved pronunciation by enhancing synthesis-based speech.
- Fixed header display issue in Cambridge Pronunciation Dictionary.
- Resolved fallback to synthesis speech for invalidated old pronunciations.
- Fixed horizontal scrolling issue in Bing Dictionary.

# v6.1.0 Oct 10, 2025
- Enabled cloud sync for dictionary collections (Pro users).
- Fixed parsing of accent/diacritic marks for languages like Thai during lookups.

# v6.0.0 Oct 05, 2025 
- Introduced PNL Pro.
- Enabled cloud sync for local history (Pro users).
- Automatically remove oldest history items when exceeding chrome storage quota.
- Added `dblclick` option: trigger lookup only on double-click if enabled.
- Improved word validation checks.
- Expanded unit test coverage.

# v5.8.0 Aug 28, 2025
- Added Ukrainian language support.
- Introduced a warm welcome message and initial setup dialog for new users.
- Improved German, French, and Italian dictionary lookups for broader word coverage.
- Migrated all CoffeeScript files to JavaScript for better maintainability.
- Expanded and improved unit test coverage.
- Bring Exporting to Anki Integration to SidePal.
- Ordböcker supports Norwegian & Danish.

# v5.7.2 July 07, 2025
- Expanded integration tests.
- Retrieve definitions from other languages if a word has multiple possible languages.
- Sort Wiktionary results to show other languages first, then English.
- Limit Wiktionary results to a maximum of 2 definitions.
- Fixed the Bluesky account link.
- Added a link to the Telegram channel.

# v5.7.1 Jun 30, 2025
- Update Captionz to allow searching for words in specific languages.
- Restored the Captionz option in settings.
- Improved Google results filtering to exclude result without definitions.
- Always put Swedish definition first for Ordböcker.

# v5.7.0 Jun 08, 2025
- Introduced Ordböcker: Swedish Learning Dictionaries.
- Added language symbols for English words.
- Enhanced prevention mechanisms for infinite loops.
- Resolved flickering issue when repeatedly looking up the same word.

# v5.6.1 Jun 01, 2025 
- Prioritized user settings for language preferences (e.g., Japanese over Chinese) ([#158](https://github.com/pnlpal/dictionariez/issues/158)).
- Filtered out results for disabled languages in user settings.
- Fixed issues with looking up new words from the popup bubble ([#155](https://github.com/pnlpal/dictionariez/issues/155)).
- Resolved multi-line selection issues on Firefox ([#156](https://github.com/pnlpal/dictionariez/issues/156)).
- Fixed extracting sentence on Firefox.
- Fixed retrieving sentence when switching dict or from the history. 
- Addressed ChatGPT posting issue when pressing the Enter key.

# v5.6.0 May 06, 2025
- Fixed Google lookup as Bing no longer supports dictionary functionality.
- Added fallback to Wiktionary if Google lookup fails.
- Corrected synthesis symbols for languages like German.
- Reduced waiting time for resolving issues (#151).
- Added a link to PNL PDF Reader.
- Updated references from `pnlpal` to `pnl.dev`.

# v5.5.2 Apr 21, 2025 
- Added a delay to handle the `mouseup` event, preventing unnecessary queries if canceled.
- Suppressed query results when the action is canceled.
- Increased the font size of query results for better readability.

# v5.5.1.1 Mar 27, 2025 
- Fix the product name on Firefox.

# v5.5.1 Mar 26, 2025 
- Automatically close the popup dictionary window when focus changes to another window (configurable).
- Added Bluesky as a sharing option.
- Fixed merging plain lookup results from Wiktionary.
- Fixed issues with adding words to AnkiWeb.

# v5.5.0 Mar 16, 2025 
- Introduced "Help Me Refine with AI" feature in SidePal.
- Enabled highlight selected text in SidePal.
- Fixed cookie setting dialog in DeepL.

# v5.4.0 Mar 10, 2025 
- Added configuration options to convert Simplified Chinese to Traditional Chinese.
- Removed redundant index for Chinese lookup results.
- Implemented fallback to Wiktionary if BingCN lookup fails.
- Provided more optional words for non-English languages, especially for conjugated words.
- Introduced "Help Me Refine with AI" feature accessible via keyboard shortcut.
- Fixed issue with multiple pronunciations for the same word.
- Fixed infinite loop issue when looking up German words.

# v5.3.1 Feb 19, 2025
- Google word lookup for the floating definitions is no longer available; use Bing instead.
- English floating definitions now include dots for pronunciation.
- Naver is no longer available for Korean; use Wiktionary instead.
- Improved word conjugation tracking, especially for Swedish.
- Ignore selected words with punctuation in the middle, except for hyphens.
- Faster dropdown list opening in the popup dictionary.
- Fixed real person pronunciation issue (#148).
- Fixed floating definitions for German, Tajik, Thai, Japanese, Indonesian, etc.
- Fixed ChatGPT dictionary lookup when a previous word is still processing.
- Fixed word auto-completions in the popup dictionary.


# v5.3.0 Dec 15, 2024
- Inject the lookup popover to customized container so that it's able to look up word on Captionz even in fullscreen. 
- Add/remove the lookup item from contextmenu without needing to restart, fix issue#145.
- Ignore stopwords when checking sentence to support phrase like "get it in the bag".
- Remove info about dictionariez pro.
- Ignore single letter and words contain special characters in the middle when selected.
- Promote Captionz.

# v5.2.5 Nov 03, 2024
- Not showing the share page after every update.
- Add back the excludedSites setting so that it won't run on some websites.
- Update the privacy notice regarding tab url.

# v5.2.4 Oct 29, 2024
- CatsLoveYouTube has changed to Captionz.
- Add a delay to toggle the dropdown lists so that it's less sensitive. 
- No autocomplete after the word is searched.
- Fix getting the word and it's context from iframe embeded page.

# v5.2.3 Oct 20, 2024
- Increase the default dict window size.
- Close the dropdown list when ESC is pressed.
- No open the share page when update.
- Add Captionz to the default dicts.
- Update TextPixie in the defualt dicts.
- Fix opening dict window when somehow the screenWith can be undefined. 

# v5.2.2 Oct 13, 2024
- Fix styles on the privacy notice page.

# v5.2.1 Oct 13, 2024
- Support more dynamic dicts like textpixie.
- Rewrite the privacy notice according to Firefox's review.
- Try to use wiktionary when google dict is unavailable. 
- Remove the window move for Firefox as Firefox has fixed the issue of setting window's position.
- Close the dropdown list when query word from suggestions.

# v5.2.0 Sep 29, 2024
* Address the privacy policy and require user consent at the beging of INSTALL or UPDATE this plugin as Firefox required. 
* Removed the functionality of CatsLoveYoutube as it might violate user privacy. 
* Removed the functionality of ShareWithPals as it might violate user privacy. 
* Fix the dict of ChatGPT.
* Fix the dict of Claude.   

# v5.1.5 Aug 28, 2024
* Auto close the dropdown menu when mouse moved out. issues#137
* Open share page when update.

# v5.1.4 Aug 11, 2024
* Inject css for dict sooner.
* Use ChatGPT, Gemini and Claude for translation too.
* Auto fill word for websites not accepting word query in their url, such as Aryanpour.com. issue#135
* Auto open the dropdown list when mouse hovered on it. issue#134
* Fix sentence checking for CJK languages.
* Fix duplicate lookups on ChatGPT and other AIs.

# v5.1.3 Aug 07, 2024 
- No save translation sentence(> 3 words) esp on Google translate.
- Refresh(focus) all opened dicts even when open a new dict.
- Fix looping the previous property when there is only one word in history.
- Fix the options page on small screens like macbook air.
- Fix some styles for thefreedictionary, urban, and merriamwebster.
- Fix chatgpt button selector so that it could stop responding.
- Fix looking up through context menu in pdf, issue#136.

# v5.1.2 Aug 01, 2024
- Auto focus on the search input on the dict 

# v5.1.1 Aug 01, 2024
- Fix rating the word.
- Fix exporting to Anki on Firefox.
- Fix pasting images that got duplicated on Firefox when exporting to Anki.

# v5.1.0 Jul 28, 2024
- Change to Manifest V2 for Firefox, as Firefox Manifest V3 uses opt-in for site permissions which makes Dictionariez not work at all.
- Remove Scripting and all host permissions, use activeTab permission instead, which is more restricted but much safer. 
- excludedSites option is removed now as the content-scripts injection is specified in manifest, couldn't be filtered anymore. 
- Fix the submit button selector for the ChatGPT dict.
- Quicker pronounciation of word. 
- Some minor style changes in the anki editor. 
- Change the default key shortcut to open options to H instead of D as D on browsers is for bookmarks by default. 
- Add the notice for Dictionariez Pro.

# v5.0.2 Jun 15, 2024
- Rename to Dictionariez: Your Dictionary, Your Language.
- Fix not querying word again when click on the dict but word is not changed.
- Fix dict name changing when querying.

# v5.0.1 Jun 12, 2024
- Fix opening dict window when a second screen is removed while the dict was open on it before. 
- Fix using Enter to submit on ChatGPT.

# v5.0.0 Jun 09, 2024
- Upgrade to Google's new manifest v3 standard, which involves a lot of hassle.
- Be able to parse dict from any code block on pnlpal.dev.
- Fix dict positions on multiple screens.
- Fix chatgpt dict.
- Fix getting definitions from wiktionary.
- Better positioning images on Anki editor.

# v4.2.1 Mar 25, 2024
- Fix flickering dark theme at the opening of the dict.
- Dark theme for the options page as well.

# v4.2.0 Mar 24, 2024
- Fix close-image icon on Anki.
- Remove the volume icon when showing Thai definitions.
- Dark theme for the dict according to system preference.

# v4.1.0 Dec 31, 2023
- Fix adding words on Anki.
- Fix adding images on Anki.
- Fix using the default dict set by user when querying.
- Fix parsing some words with accent mark esp for Russian, see issue#116.
- Be able to get video info for cats-love-youtube.

# v4.0.0 Sep 22, 2023

- Add integration with Cats Love YouTube.
- Fix looking up words in iframes.
- Fix querying a word always using lowercase.
- Fix speaking voice for some languages.

# v3.3.1 Apr 26, 2023

- Add pronunciations to ChatGPT examples and definitions.
- Setup dictionary when open ChatGPT on mobile.
- Setup dev functions and examples in the console of the options page.
- Fix closing dropdown menus when clicking on the area of the dict.

# v3.3.0 Apr 26, 2023

- Integrate with ChatGPT.
- Reduce the default dicts.
- Fix getting sentence when looking up with keyboard shortcut.

# v3.2.0 Jan 03, 2023

- Fix layout of the options page on mobile.
- More concise view on mobile.
- Fix the refresh of the dict on open it again.
- Fix changing dict when opened multiple dict windows.
- Remove promotion of Twitter and Telegram channel.
- Remove the sharing btn to pnlpal in the word history.

# v3.2.0 Jan 03, 2023

- Support Finnish.
- Support Indonesian.
- Fix parsing words in multiple languages.
- Finnally get rid of invalid requests when parsing some words.
- Fix hiding the loading box when no result found.

# v3.1.0 Dec 12, 2022

- Auto adapt the image size when adding to Anki.
- Export the sentence column to csv.
- Can change the mark color of highlight.
- Support Polish.
- Fix getting the real person pronunciation of English words.
- Follow more conjugated words if possible.

# v3.0.4 Oct 23, 2022

- Won't show the share page anymore when update.
- Parse the Swedish wiktionary when the Swedish word couldn't be found on the English wiktionary site.
- Fix reordering the dicts when the sequence has a duplicate.

# v3.0.3 Oct 6, 2022

- Parse multiple languages if possible.
- Parse word conjugation if possible.
- Add a skip button on Anki when importing words.
- Fix dict position on multiple monitors.
- Fix installing dict from non-json code block.
- Fix thefreedictionry style on #issues/82.

# v3.0.2 Jul 11, 2022

- Add Naver dict for Korean language
- Fix sharing to pnlpal
- Fix styles esp for mobile phone
- Fix range object not exist error in inject.js

# v3.0.1 Apr 9, 2022

- fix recursively following words.
- fix looking up when English is disabled.

# v3.0.0 Mar 26, 2022

- Support mobile browsers like Kiwi and Flow.
- Follow transformed words in some languages such as Swedish.
- Set tts to the sentence when export to Anki.
- Auto select the word when focus on the input.

# v2.9.2 Feb 24, 2022

- Fix loading images when exporting word to Anki.

# v2.9.1 Feb 23, 2022

- Add hotkey to mark words.

# v2.9.0 Feb 13, 2022

- Support reading text from clipboard.
- Support to exclude running on specific websites.
- Fix refreshing page when click on pronunciation.
- Fix bab.la and oxford learner dicts.

# v2.8.1 Oct 25, 2021

- Support Ctrl/Meta + n to access correspondent dict.
- fix: add word to history when automactically pop up dict. #60
- fix: only show the share page on install or update the app. #64

# v2.8.0 May 24, 2021

- Add Swedish, Norwegian, Danish support when double-click on a word.
- Search dicts when input keywords in the search bar to show in auto-completion list.
- Enable Keyboard(Tab or Down key) to navigate the auto-completion list in the search bar.
- Add a setting to disable "share with pals" in the context menu.
- Remove the Spotify player.

# v2.7.4 Mar 14, 2021

- Add settings to show other lang definition alongside the English definition of some words.
- Don't inject code in editable frames, see issue #45.
- Fix getting selected words from some editors.
- Don't refresh the dict window on the same query.

# v2.7.3 Jan 23, 2021

- Support Vietnamese.
- Fix deleting the current using dict.

# v2.7.2 Jan 14, 2021

- Show all dicts on the header bar.
- Hide some UI elements on really small window.
- A donation button.

# v2.7.1 Jan 10, 2021

- Add settings of getting UK & US phonetic symbols and real person pronunciation.
- Add settings of changing English lookup sources

# v2.7.0 Jan 7, 2021

- Support captionz to watch YouTube videos with dual captions.
- Ignore highlight on Twitter due to #38.

# v2.6.1 Dec 24, 2020

- Fix dict window out of screen on Windows;
- Remove word's ending of punctuation signs;
- Restore the default dictionaries button;

# v2.6.0 Dec 21, 2020

- Launched helper of watching YouTube video on Captionz.
- Fix looking up words in frames.
- Settings of disable context menu items.

# v2.5.1 Dec 11, 2020

- fix dict window disappeared when its width & height is wrongly set to 0

# v2.5.0 Dec 7, 2020

- Simple way to add more dictionaries to your collection.

# v2.4.0 Nov 15, 2020

- Now support Portuguese and Russian.
- Improved result for German, French etc.

# v2.3.11 Nov 12, 2020

- Share on pnlpal using context menu

# v2.3.10 Nov 11, 2020

- Launched pnlpal community.

# v2.3.8 Nov 1, 2020

- Now French, German, Spanish, Italian are all supported with floating definition.

# v2.3.7 Nov 1, 2020

- Fix getting sentence of the word on Firefox.

# v2.3.6 Oct 31, 2020

- Automatically open the dict to look up when you export words to Anki.

# v2.3.5 Oct 30, 2020

- Not show wikipedia result on other dict windows(non-main windows)

# v2.3.4 Oct 30, 2020

- Open multiple dict window with Ctrl key pressed.
- Fix getting selected word when click on the icon and from the context menu.
- Fix too sensitive of pronunciation when hover on the speaker.

# v2.3.3 Oct 30, 2020

- Remove some background color when export to anki, compatible with night-mode of anki;
- Enlarge font-size when export to anki.

# v2.3.2 Oct 28, 2020

- Show wikipedia result on dict window

# v2.3.1 Oct 26, 2020

- Get images on some words when export to anki

# v2.3.0 Oct 25, 2020

- Export words to anki!
- Simplify english floating definition, use Google as source.

# v2.2.4 Oct 21, 2020

- For Chinese language, now supports Pinyin and definition in Chinese.

# v2.2.3 Oct 18, 2020

- Add synthesis speak for Chinese, Japanese, Korean and Thai languages.
- Floating definitions now support Thai language.

# v2.2.2 Oct 17, 2020

- Cancel default word highlight and pronunciations.
- Can disable word history now.
- Fix lookup in editable elements.

# v2.2.1 Oct 12, 2020

- Floating definition of Korean and Tajik languages support, will add more.

_For more history check on [Firefox version history page](https://addons.mozilla.org/en-US/firefox/addon/dictionaries/versions/)_
