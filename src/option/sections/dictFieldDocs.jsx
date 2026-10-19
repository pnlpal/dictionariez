// The documentation of every dict field, shared by the editor's labels, helpers and help panel.
// label / helper can be { static, dynamic } when they differ by the dict type.

const selectorTip = (
    <p>
        To find a selector, open the site, right-click the element, choose <b>Inspect</b>, then right-click the
        highlighted node and choose <b>Copy › Copy selector</b>. Prefer short, stable selectors like{" "}
        <code>#search</code> or <code>[aria-label='Send']</code> over long auto-generated ones.
    </p>
);

export const FIELD_DOCS = {
    dictName: {
        label: "Name",
        helper: "Shown in the dictionary list",
        doc: (
            <p>
                The display name of the dict, also its unique key: saving a dict with the name of an existing one is not
                allowed. Renaming keeps its position in the list.
            </p>
        ),
        example: "Cambridge English",
    },
    windowUrl: {
        label: { static: "Search URL", dynamic: "Site URL" },
        helper: { static: "Put <word> where the word goes", dynamic: "The page with the input box" },
        doc: (
            <>
                <p>
                    <b>Static dict:</b> the URL of a search result page. Look up any word on the site, copy the URL from
                    the address bar, and replace the word with <code>&lt;word&gt;</code>.
                </p>
                <p>
                    <b>Dynamic dict:</b> the page to open, e.g. the chat page of an AI. The word is typed into its input
                    box instead of the URL.
                </p>
            </>
        ),
        example: "https://dictionary.cambridge.org/dictionary/english/<word>",
    },
    css: {
        label: "Custom CSS",
        helper: "Hide headers, ads and other clutter",
        doc: (
            <>
                <p>
                    Injected into the dict page, so the definition gets the most of the small window. Usually used to
                    hide navigation bars and ads, or to make room for the Dictionariez header at the top.
                </p>
                <p>
                    Add <code>!important</code> when the site's own styles win. The CSS is tidied up when you leave the
                    field, and saved on one line.
                </p>
            </>
        ),
        example: "#header, #ad_topslot_a {display: none;} body {margin-top: 50px !important;}",
    },
    fixSpaceInWords: {
        label: "Replace spaces with",
        helper: "For phrases, e.g. - or +",
        doc: (
            <p>
                Some sites don't accept spaces in the URL. The spaces in a looked-up phrase are replaced with this text,
                e.g. <code>-</code> turns "look up" into "look-up".
            </p>
        ),
        example: "-",
    },
    ttsHelperSelector: {
        label: "Read-aloud selector",
        helper: "Elements that can be read aloud",
        doc: (
            <>
                <p>
                    A CSS selector of the elements on the dict page that can be read aloud, usually the example
                    sentences.
                </p>
                {selectorTip}
            </>
        ),
        example: ".def-body .examp",
    },
    noAutoDarkMode: {
        label: "No automatic dark mode",
        helper: "Keep the site's own colors",
        doc: (
            <p>
                In dark mode, Dictionariez darkens static dict pages that don't have a dark theme of their own. Turn
                this on if it breaks the page.
            </p>
        ),
    },
    noAdBlocker: {
        label: "No ad blocker",
        helper: "Turn it off if the site breaks",
        doc: <p>Dictionariez blocks common ads on static dict pages. Turn this on if the page doesn't work with it.</p>,
    },
    inputSelector: {
        label: "Input selector",
        helper: "Where the text is typed",
        doc: (
            <>
                <p>
                    A CSS selector of the input box the word or prompt is typed into. A <code>textarea</code>,{" "}
                    <code>input</code> or editable <code>div</code>. Separate several selectors with commas, the first
                    one found is used.
                </p>
                {selectorTip}
            </>
        ),
        example: "form div[contenteditable], #mobile-composer-prompt",
    },
    isRichEditor: {
        label: "Rich text editor",
        helper: "For editable divs that ignore typed text",
        doc: (
            <p>
                Turn it on when the input box is a rich text editor (an editable <code>div</code> instead of a{" "}
                <code>textarea</code>) and the text doesn't appear in it. Gemini and Mistral need it.
            </p>
        ),
    },
    submitButtonSelector: {
        label: "Submit button selector",
        helper: "The button to click after typing",
        doc: (
            <>
                <p>
                    A CSS selector of the send or search button, clicked after the text is typed. Leave it empty for
                    sites that search as you type.
                </p>
                {selectorTip}
            </>
        ),
        example: "form button[type='submit'], form button[aria-label='Send']",
    },
    prompt: {
        label: "Prompt",
        helper: "What is typed for a word",
        doc: (
            <p>
                The text typed into the input box when looking up a word. Leave it empty to type the word as is. Setting
                a prompt makes the dict an AI dict, used by the AI features of Dictionariez.
            </p>
        ),
        example: 'Give me the full definitions of "<word>"<language>, with IPA and examples.',
        placeholders: true,
    },
    promptWithContext: {
        label: "Prompt with context",
        helper: "Used when the sentence is known",
        doc: (
            <p>
                Used instead of the prompt when the word is looked up from a sentence on a page, so the AI can explain
                its meaning in that context.
            </p>
        ),
        example: 'Explain "<word>"<language> as used in "<sentence>".',
        placeholders: true,
    },
    translationPrompt: {
        label: "Translation prompt",
        helper: "Used when a sentence is selected",
        doc: (
            <p>
                Used when the selected text is a whole sentence instead of a word. The sentence replaces{" "}
                <code>&lt;word&gt;</code>. Without it, AI dicts ask for a simple, natural translation, and other dynamic
                dicts type the sentence as is.
            </p>
        ),
        example: 'Translate this text, keep it simple, clear and natural: "<word>"',
        placeholders: true,
    },
    helpMeRefinePrompt: {
        label: "Refine prompt",
        helper: 'Used by "Help me refine"',
        doc: (
            <p>
                Used by the "Help me refine" action, which asks the AI to improve your own writing. The text replaces{" "}
                <code>&lt;word&gt;</code>. Without it, a default prompt asking for a clearer, correct version is used.
            </p>
        ),
        example: 'Please help me refine the text, correct any grammatical errors: "<word>"',
        placeholders: true,
    },
};

export const PLACEHOLDERS = [
    ["<word>", "the looked-up word, or the selected text"],
    ["<sentence>", "the sentence around the word"],
    ["<language>", 'its language, as " in French"; empty if unknown'],
    ["<aiResponseLanguage>", "the AI response language in Settings"],
];

export const pick = (v, type) => (typeof v === "object" ? v[type] : v);
