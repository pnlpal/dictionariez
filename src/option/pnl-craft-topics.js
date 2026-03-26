"use strict";
import "./pnl-craft-topics.less";
// fetch topics from https://pnl.dev/api/category/6/crafting
// and display the topic in the element with id "crafting-topic"
// and change the topic every 3 seconds
(() => {
    const topicElement = document.getElementById("crafting-topic");
    if (!topicElement) {
        return;
    }

    let currentIndex = parseInt(localStorage.getItem("next-crafting-topic-index")) || 0;

    function decodeHtmlEntities(str) {
        const txt = document.createElement("textarea");
        txt.innerHTML = str;
        return txt.value;
    }

    function showNextTopic(topics) {
        const titleSpan = topicElement.querySelector(".crafting-topic-title");
        if (!titleSpan) return;

        // Ensure index is within bounds
        if (currentIndex >= topics.length) currentIndex = 0;
        const topic = topics[currentIndex];

        // Start slide out
        titleSpan.classList.remove("slide-in");
        titleSpan.classList.add("slide-out");
        setTimeout(() => {
            topicElement.href = `https://pnl.dev/topic/${topic.slug}`;
            titleSpan.textContent = decodeHtmlEntities(topic.title);
            titleSpan.classList.remove("slide-out");
            titleSpan.classList.add("slide-in");
        }, 400);

        // Advance index in memory (always works)
        currentIndex = (currentIndex + 1) % topics.length;
        // Persist for next page load (may fail silently in some environments)
        try {
            localStorage.setItem("next-crafting-topic-index", currentIndex);
        } catch {
            // localStorage may be disabled or full
        }
    }

    fetch("https://pnl.dev/api/category/6/crafting")
        .then((response) => response.json())
        .then((data) => {
            const topics = data.topics.filter((topic) => (topic.showInExtension || topic.pinned) && !topic.deleted);
            if (!topics.length) {
                topicElement.style.display = "none";
                return;
            }

            // Ensure starting index is valid for current topics
            if (currentIndex >= topics.length) currentIndex = 0;

            setInterval(() => showNextTopic(topics), 5000);
            showNextTopic(topics);
        });
})();
