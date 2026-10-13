import { useEffect, useRef } from "preact/hooks";
import { signal } from "@preact/signals";

export function Dialog({ open, onClose, className = "", children }) {
    const ref = useRef();

    useEffect(() => {
        const dialog = ref.current;
        if (open && !dialog.open) dialog.showModal();
        else if (!open && dialog.open) dialog.close();
    }, [open]);

    const onCancel = (e) => {
        // Escape key: let the owner decide what closing means
        e.preventDefault();
        onClose?.();
    };

    return (
        <dialog ref={ref} class={className} onCancel={onCancel}>
            {open && children}
        </dialog>
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
