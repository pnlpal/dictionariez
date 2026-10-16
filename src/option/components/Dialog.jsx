import { useEffect } from "preact/hooks";
import { signal } from "@preact/signals";

// Opened with Beer CSS's .active instead of showModal(): a modal dialog sits in the browser's top layer,
// above the lookup tooltip and card, so word lookups inside it would be hidden.
// overlay: extra Beer CSS overlay classes (e.g. "large-blur") for the backdrop behind the dialog
export function Dialog({ open, onClose, className = "", overlay = "", children }) {
    useEffect(() => {
        if (!open) return;
        const onKeyDown = (e) => {
            // Escape key: let the owner decide what closing means
            if (e.key === "Escape") onClose?.();
        };
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [open, onClose]);

    return (
        <>
            <div class={`overlay ${overlay}${open ? " active" : ""}`}></div>
            <dialog class={`${className}${open ? " active" : ""}`}>{open && children}</dialog>
        </>
    );
}

const confirmState = signal(null);

export function confirm(message, { twice = false, title = "Caution", confirmLabel = "Confirm" } = {}) {
    return new Promise((resolve) => {
        confirmState.value = { message, twice, title, confirmLabel, resolve };
    });
}

export function ConfirmHost() {
    const state = confirmState.value;

    const close = (ok) => {
        confirmState.value = null;
        if (ok && state.twice) {
            confirm("Are you really sure?").then(state.resolve);
        } else {
            state.resolve(ok);
        }
    };

    return (
        <Dialog open={!!state} onClose={() => close(false)}>
            {state && (
                <>
                    <h5>{state.title}</h5>
                    <p>{state.message}</p>
                    <nav class="right-align">
                        <button class="border" onClick={() => close(false)}>
                            Cancel
                        </button>
                        <button class="error" onClick={() => close(true)}>
                            {state.confirmLabel}
                        </button>
                    </nav>
                </>
            )}
        </Dialog>
    );
}
