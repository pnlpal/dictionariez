import utils from "utils";
import debounce from "lodash/debounce";

export default (container) => {
    // Audio click/mouseover handler with event delegation
    const debouncedAudioPlay = debounce(
        (audioBtn) => {
            let synthesisObj = null;

            if (audioBtn.dataset.mp3) {
                utils.send("play audios", {
                    w: audioBtn.dataset.w,
                    otherSrc: audioBtn.dataset.mp3,
                    synthesis:
                        audioBtn.dataset.synthesis ||
                        (audioBtn.classList.contains("fairydict-pron-audio-bre")
                            ? "en-GB"
                            : audioBtn.classList.contains("fairydict-pron-audio-ame")
                              ? "en-US"
                              : ""),
                });
            } else if (audioBtn.dataset.synthesis) {
                synthesisObj = {
                    text: audioBtn.dataset.w,
                    name: audioBtn.dataset.lang,
                    lang: audioBtn.dataset.synthesis,
                };
                utils.send("play audios", { synthesisObj });
            } else if (audioBtn.classList.contains("for-chatgpt-audio")) {
                synthesisObj = {
                    text: audioBtn.parentElement.textContent,
                    lang: "en-US",
                };
                utils.send("play audios", { synthesisObj });
            }
        },
        500,
        { leading: true, trailing: false },
    );

    const audioHandler = (e) => {
        const audioBtn = e.target.closest(".fairydict-pron-audio");
        if (!audioBtn) return;

        e.stopPropagation();
        debouncedAudioPlay(audioBtn);
        return false;
    };

    container.addEventListener("click", audioHandler);
    if (!utils.isMobile()) {
        container.addEventListener("mouseover", audioHandler);
    }
};
