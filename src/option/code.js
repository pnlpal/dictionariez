// Tiny highlighters and formatters for the dict editor: enough for the short CSS and JSON of a dict; not parsers.

const TOKEN = /\/\*[\s\S]*?(?:\*\/|$)|"(?:\\.|[^"\\\n])*"?|'(?:\\.|[^'\\\n])*'?|[{};:]|\s+|[^{};:"'\s/]+|\//g;
// at-rules whose block holds rules instead of declarations
const NESTING_AT_RULE = /^@(media|supports|container|layer|document|scope|starting-style)\b/;

// Yields { text, kind }, kind: comment, space, string, open, close, semi, colon, selector, at, prop, value
function* scanCss(css) {
    const blocks = []; // "rules" or "decls" for each open block
    let prelude = "";
    let inValue = false;

    for (const [text] of css.matchAll(TOKEN)) {
        let kind;
        if (text.startsWith("/*")) kind = "comment";
        else if (/^\s/.test(text)) kind = "space";
        else if (text === "{") {
            blocks.push(NESTING_AT_RULE.test(prelude) ? "rules" : "decls");
            kind = "open";
        } else if (text === "}") {
            blocks.pop();
            kind = "close";
        } else if (text === ";") kind = "semi";
        else if (blocks.at(-1) === "decls") {
            if (text === ":" && !inValue) {
                inValue = true;
                kind = "colon";
            } else if (text[0] === '"' || text[0] === "'") kind = "string";
            else kind = inValue ? "value" : "prop";
        } else {
            prelude += text;
            if (text[0] === '"' || text[0] === "'") kind = "string";
            else kind = prelude.startsWith("@") ? "at" : "selector";
        }

        if (kind === "open" || kind === "close" || kind === "semi") {
            prelude = "";
            inValue = false;
        }
        yield { text, kind };
    }
}

const escapeHtml = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function highlightCss(css) {
    let html = "";
    for (const { text, kind } of scanCss(css)) {
        let t = escapeHtml(text);
        if (kind === "space") {
            html += t;
            continue;
        }
        if (kind === "value") t = t.replace(/!\s*important/g, (m) => `<span class="css-important">${m}</span>`);
        html += `<span class="css-${kind}">${t}</span>`;
    }
    return html;
}

// One declaration per line, only whitespace is changed so nothing is lost even when the CSS is broken
export function formatCss(css, indent = "    ") {
    let out = "";
    let depth = 0;
    let lineStart = true;
    let space = false;

    const write = (s) => {
        if (lineStart) out += indent.repeat(depth);
        else if (space) out += " ";
        out += s;
        lineStart = false;
        space = false;
    };
    const newline = () => {
        out = out.trimEnd() + "\n";
        lineStart = true;
    };

    for (const { text, kind } of scanCss(css)) {
        if (kind === "space") {
            space = !lineStart;
        } else if (kind === "open") {
            space = !lineStart;
            write("{");
            depth++;
            newline();
        } else if (kind === "close") {
            if (!lineStart) newline();
            depth = Math.max(0, depth - 1);
            write("}");
            newline();
            if (!depth) out += "\n";
        } else if (kind === "semi" || kind === "colon") {
            space = false;
            write(text);
            if (kind === "semi") newline();
            else space = true;
        } else {
            write(text);
        }
    }
    return out.trim();
}

// The stored form: a single line, like the CSS of the built-in dicts
export const compactCss = (css) => formatCss(css).replace(/\n\s*/g, " ").replace(/\{ /g, "{").replace(/ \}/g, "}");

const JSON_TOKEN = /("(?:\\.|[^"\\\n])*"?)(\s*:)?|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)|\b(true|false|null)\b|([{}[\],])/g;

export const highlightJson = (json) =>
    escapeHtml(json).replace(JSON_TOKEN, (m, str, colon, num, literal, punct) => {
        if (str) {
            return colon
                ? `<span class="json-key">${str}</span><span class="json-punct">${colon}</span>`
                : `<span class="json-string">${str}</span>`;
        }
        if (num) return `<span class="json-number">${num}</span>`;
        if (literal) return `<span class="json-literal">${literal}</span>`;
        return `<span class="json-punct">${punct}</span>`;
    });

// Left as is while it's not valid JSON
export function formatJson(json) {
    try {
        return JSON.stringify(JSON.parse(json), null, 4);
    } catch {
        return json;
    }
}
