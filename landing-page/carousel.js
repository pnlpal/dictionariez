document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".carousel");
    const track = document.querySelector(".carousel-track");
    const carouselItems = Array.from(track.querySelectorAll("img, .carousel-item.video"));
    const leftBtn = document.querySelector(".carousel-btn.left");
    const rightBtn = document.querySelector(".carousel-btn.right");
    const previewsBar = document.querySelector(".carousel-previews");

    const carouselItemWidth = (() => {
        let item = carouselItems[1];
        const itemWidth = item.clientWidth;
        const marginRight = parseFloat(getComputedStyle(item).marginRight) || 0;
        const totalWidth = itemWidth + marginRight * 2;
        // console.log(totalWidth, "carousel item width", item);
        return totalWidth;
    })();

    let current = 0;

    // --- PREVIEW THUMBS ---
    function renderPreviews(visibleCount) {
        previewsBar.innerHTML = "";
        carouselItems.forEach((item, i) => {
            let thumb;
            if (item.classList.contains("video")) {
                thumb = document.createElement("div");
                thumb.className = "carousel-preview-thumb video";
                thumb.innerHTML = "&#9654;"; // play icon
            } else {
                thumb = document.createElement("img");
                thumb.className = "carousel-preview-thumb";
                thumb.src = item.src;
                thumb.alt = item.alt || `Preview ${i + 1}`;
            }
            if (i >= current && i < current + visibleCount) thumb.classList.add("active");
            thumb.addEventListener("click", () => {
                current = i;
                updateCarousel();
            });
            previewsBar.appendChild(thumb);
        });
    }

    function getVisibleCount() {
        // Use the first item to measure width
        const maxAvailWidth = window.innerWidth - 200;
        const count = Math.max(1, Math.floor(maxAvailWidth / carouselItemWidth));
        return count;
    }

    function updateTrackWidth() {
        track.style.width = getVisibleCount() * carouselItemWidth + "px";
        track.style.margin = "0 auto";
    }

    function updateCarousel() {
        const visibleCount = getVisibleCount();
        carouselItems.forEach((item, i) => {
            if (i >= current && i < current + visibleCount) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
        leftBtn.disabled = current === 0;
        rightBtn.disabled = current + visibleCount >= carouselItems.length;
        updateTrackWidth();
        renderPreviews(visibleCount);
    }

    leftBtn.addEventListener("click", () => {
        if (current > 0) {
            current--;
            updateCarousel();
        }
    });
    rightBtn.addEventListener("click", () => {
        const visibleCount = getVisibleCount();
        if (current + visibleCount < carouselItems.length) {
            current++;
            updateCarousel();
        }
    });

    // Keyboard navigation
    carousel.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") leftBtn.click();
        if (e.key === "ArrowRight") rightBtn.click();
    });

    // Update on resize
    window.addEventListener("resize", () => {
        const visibleCount = getVisibleCount();
        if (current + visibleCount > carouselItems.length) {
            current = Math.max(0, carouselItems.length - visibleCount);
        }
        updateCarousel();
    });

    updateCarousel();
});
