# Contributing Dictionaries to Dictionariez Trove

Dictionariez is a language learning browser extension that helps you look up words on any webpage using various online dictionaries. Our community at [pnl.dev] has contributed hundreds of dictionaries covering many languages, making them available for all users.

**We need your help!** If you know of useful dictionary websites or language learning resources that aren't yet available in Dictionariez, please contribute them to the community.

## What You Can Contribute

We welcome any web-based resources that enhance language learning:
- **Online dictionaries** (bilingual or monolingual)
- **Translation services**
- **AI Tools** (like ChatGPT, Claude, etc.)
- **Example sentence databases**
- **Image search engines** (e.g., [Bing Image Search])
- **Encyclopedia sites** (e.g., [Wikipedia])
- **Pronunciation guides**
- And more!

---

## How to Contribute a Dictionary

There are two ways to add dictionaries: contributing to the community (recommended) or testing locally first.

### Option 1: Contribute to the Community (Recommended)

**This is the best way to share dictionaries with all Dictionariez users.**

1. Go to the [Dictionariez Trove] section on [pnl.dev]
2. Create a new topic with:
   - **Title**: The dictionary name (e.g., "Merriam-Webster Dictionary")
   - **Content**: Include the JSON code in a markdown code block (see formats below)
   - **Tags**: Add relevant tags to help categorization (e.g., "English", "dictionary", "learner", "AI")

#### Standard Dictionary Format
Use this for most dictionaries that use a URL search parameter.

```json
{
    "dictName": "Merriam-Webster",
    "windowUrl": "https://www.merriam-webster.com/dictionary/<word>",
    "css": "#nav-container { display: none; }"
}
```

**Fields:**
- `dictName`: (Required) The display name of the dictionary.
- `windowUrl`: (Required) The dictionary's URL. Use `<word>` as the placeholder for the search term.
- `css`: (Optional) Custom CSS to hide unnecessary elements (headers, ads) for a cleaner view.
- `fixSpaceInWords`: (Optional) Character to replace spaces (e.g., `"-"` converts "New York" to "New-York").

#### Dynamic / AI Dictionary Format 
Use this for AI tools or sites where you need to fill a form (like ChatGPT, Translation sites) instead of using a simple URL.

```json
{
    "dictName": "ChatGPT Definition",
    "windowUrl": "https://chatgpt.com",
    "inputSelector": "#prompt-textarea",
    "submitButtonSelector": "button[data-testid='send-button']",
    "prompt": "Define the word \"<word>\" and provide examples."
}
```

**Extra Fields for Dynamic Dicts:**
- `inputSelector`: (Required) CSS selector for the input text area where the word/prompt should be typed.
- `submitButtonSelector`: (Optional) CSS selector for the submit/send button.
- `prompt`: (Optional) The template text to type into the input. 
  - `<word>`: Replaced by the selected word.
  - `<language>`: Replaced by the target language.
- `promptWithContext`: (Optional) Use this to provide context to the AI (requires selecting a sentence or enabled features).
  - `<sentence>`: Replaced by the sentence containing the word.
- `isRichEditor`: (Optional) Set to `true` if the input is a content-editable div rather than a standard textarea.

#### Example Screenshot

Here's how to create a new dictionary topic for "Merriam Webster":

![Screenshot 2024-10-02 202918.png](https://pnl.dev/assets/uploads/files/1727893812593-screenshot-2024-10-02-202918.png)

Once submitted, your contribution will be available to all Dictionariez users through the [Dictionariez Trove]!

---

### Option 2: Test Locally First

**Use this method to test a dictionary before contributing it to the community.**

1. Open Dictionariez and go to the settings/options page
2. Press `F12` to open the browser's Developer Tools
3. In the Console tab, run the `addDict` command with your JSON object:

```javascript
addDict({
    dictName: 'Google Search', 
    windowUrl: 'https://www.google.com/search?q=<word>', 
    css: '#searchform,#top_nav {display: none;}'
})
```

The dictionary will appear at the end of your dictionaries list. Click on it to test it out.

**Note:** This method only adds the dictionary to your local installation. To share it with the community, follow Option 1 above.

---

## Finding Dictionaries

Browse existing dictionaries and get inspired by what the community has already contributed:
- Visit [Dictionariez Trove] to see all available dictionaries
- Look for dictionaries in your target languages
- Check out creative uses beyond traditional dictionaries

Your contributions help make Dictionariez better for language learners worldwide. Thank you!

[Dictionariez Trove]: https://pnl.dev/category/4/dictionariez-trove
[pnl.dev]: https://pnl.dev/
[Wikipedia]: https://pnl.dev/topic/508/wikipedia
[Bing Image Search]: https://pnl.dev/topic/35/bing-image
