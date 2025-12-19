// Fetch and display comments from comments.json
fetch("comments.json")
    .then((response) => response.json())
    .then((comments) => {
        const container = document.querySelector(".comments-container");
        comments.forEach((comment, index) => {
            const commentElement = document.createElement("div");
            commentElement.classList.add("comment");
            commentElement.style = `
                            display: flex;
                            flex-direction: column;
                            align-items: flex-start;
                            background-color: ${index % 2 === 0 ? "#e3f2fd" : "#ede7f6"};
                            padding: 1em;
                            border-radius: 12px;
                            width: 100%;
                            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                            transition: transform 0.2s, box-shadow 0.2s;
                        `;
            commentElement.onmouseover = () => {
                commentElement.style.transform = "scale(1.05)";
                commentElement.style.boxShadow = "0 6px 10px rgba(0, 0, 0, 0.15)";
            };
            commentElement.onmouseout = () => {
                commentElement.style.transform = "scale(1)";
                commentElement.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
            };
            commentElement.innerHTML = `
                            <p style="margin: 0; font-weight: bold;">
                                <a href="${
                                    comment.link
                                }" target="_blank" style="color: #2196f3; text-decoration: none;">${
                comment.username
            }</a>
                                <span style="font-size: 0.8em; color: #666;">(<a href="${
                                    comment.link
                                }" target="_blank" style="color: #666; text-decoration: none;">${
                comment.date
            }</a>)</span>
                            </p>
                            <p style="margin: 0.5em 0;">${comment.comment}</p>
                            <p style="margin: 0; font-size: 0.9em; color: #ff9800; display: ${
                                comment.rating ? "block" : "none"
                            } ">Rating: ${"⭐".repeat(comment.rating)}</p>
                        `;
            container.appendChild(commentElement);
        });

        // Add a "See more comments" card
        const seeMoreCard = document.createElement("div");
        seeMoreCard.classList.add("comment");
        seeMoreCard.style = `
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        background-color: #fff3e0;
                        padding: 1em;
                        border-radius: 12px;
                        width: 100%;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                        text-align: center;
                        transition: transform 0.2s, box-shadow 0.2s;
                    `;
        seeMoreCard.onmouseover = () => {
            seeMoreCard.style.transform = "scale(1.05)";
            seeMoreCard.style.boxShadow = "0 6px 10px rgba(0, 0, 0, 0.15)";
        };
        seeMoreCard.onmouseout = () => {
            seeMoreCard.style.transform = "scale(1)";
            seeMoreCard.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
        };
        seeMoreCard.innerHTML = `
                        <p style="margin: 0; font-weight: bold; font-size: 1.2em; color: #ff9800;">Want to see more reviews?</p>
                        <a href="https://chromewebstore.google.com/detail/dictionariez-your-diction/diojcfpekhhnndfmggknljpnfpcccbhc/reviews" 
                           target="_blank" 
                           style="margin-top: 0.5em; color: #2196f3; text-decoration: none; font-size: 1em;">
                           Read more on the Chrome Web Store
                        </a>
                    `;
        container.appendChild(seeMoreCard);
    })
    .catch((error) => console.error("Error loading comments:", error));
