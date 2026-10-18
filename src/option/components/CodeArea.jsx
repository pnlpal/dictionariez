import { useId } from "preact/hooks";
import { formatCss, highlightCss, formatJson, highlightJson } from "../code.js";

const languages = {
    css: { highlight: highlightCss, format: formatCss },
    json: { highlight: highlightJson, format: formatJson },
};

// A code textarea with syntax highlighting: the text is typed into a transparent textarea laid over its highlighted copy.
// Both share one grid cell, so the copy grows the box with the text and no scrolling needs syncing.
// It's formatted when leaving the field; looks like Beer's bordered field with a label.
export default function CodeArea({ value = "", onChange, language = "css", label, helper, error, className = "" }) {
    const id = useId();
    const { highlight, format } = languages[language];
    const formatOnBlur = (e) => {
        const formatted = format(e.currentTarget.value);
        if (formatted !== e.currentTarget.value) onChange(formatted);
    };

    return (
        <div class={`code-field ${className}${error ? " invalid" : ""}`}>
            <div class="code-area">
                {/* the trailing space keeps an empty last line as tall as the textarea's */}
                <pre aria-hidden="true" dangerouslySetInnerHTML={{ __html: highlight(value) + "\n " }}></pre>
                <textarea
                    id={id}
                    value={value}
                    spellcheck={false}
                    aria-label={label ? undefined : language.toUpperCase()}
                    onInput={(e) => onChange(e.currentTarget.value)}
                    onBlur={formatOnBlur}
                ></textarea>
            </div>
            {label && <label for={id}>{label}</label>}
            <div class="code-helper">{error || helper}</div>
        </div>
    );
}
