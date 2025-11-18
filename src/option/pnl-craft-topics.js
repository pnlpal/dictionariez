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
    function decodeHtmlEntities(str) {
        const txt = document.createElement("textarea");
        txt.innerHTML = str;
        return txt.value;
    }

    function showNextTopic(topics) {
        const titleSpan = topicElement.querySelector(".crafting-topic-title");
        const nextIndex = parseInt(localStorage.getItem("next-crafting-topic-index")) || 0;
        const topic = topics[nextIndex] || topics[0];

        // Start slide out
        titleSpan.classList.remove("slide-in");
        titleSpan.classList.add("slide-out");
        setTimeout(() => {
            topicElement.href = `https://pnl.dev/topic/${topic.slug}`;
            titleSpan.textContent = decodeHtmlEntities(topic.title);
            titleSpan.classList.remove("slide-out");
            titleSpan.classList.add("slide-in");
        }, 400);

        localStorage.setItem("next-crafting-topic-index", (nextIndex + 1) % topics.length);
    }

    fetch("https://pnl.dev/api/category/6/crafting")
        .then((response) => response.json())
        .then((data) => {
            const topics = data.topics.filter((topic) => (topic.showInExtension || topic.pinned) && !topic.deleted);
            if (!topics.length) {
                topicElement.style.display = "none";
                return;
            }

            let showInterval;
            clearInterval(showInterval);
            showInterval = setInterval(() => showNextTopic(topics), 5000);
            showNextTopic(topics);
        });
})();
