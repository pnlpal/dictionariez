document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".carousel");
    const track = document.querySelector(".carousel-track");
    const carouselItems = Array.from(track.querySelectorAll("img, .carousel-item.video"));
    const leftBtn = document.querySelector(".carousel-btn.left");
    const rightBtn = document.querySelector(".carousel-btn.right");
    let current = 0;

    function getCarouselItemWidth() {
        let item = carouselItems[current];
        if (!item) return 1;
        const itemWidth = item.getBoundingClientRect().width;
        const marginRight = parseFloat(getComputedStyle(item).marginRight) || 0;
        return itemWidth + marginRight * 2;
    }

    function getVisibleCountAndWidth() {
        // Use the first item to measure width
        const maxAvailWidth = window.innerWidth - 200;
        const itemWidth = getCarouselItemWidth();
        if (!itemWidth) return { count: 1, itemWidth: 1 };
        const count = Math.max(1, Math.floor(maxAvailWidth / itemWidth));
        return { count, itemWidth };
    }

    function updateTrackWidth() {
        const { count, itemWidth } = getVisibleCountAndWidth();
        // Set track width to fit exactly N items
        track.style.width = count * itemWidth + "px";
        track.style.margin = "0 auto";
    }

    function updateCarousel() {
        const { count: visibleCount } = getVisibleCountAndWidth();
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
    }

    leftBtn.addEventListener("click", () => {
        if (current > 0) {
            current--;
            updateCarousel();
        }
    });
    rightBtn.addEventListener("click", () => {
        const { count: visibleCount } = getVisibleCountAndWidth();
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
        // Ensure current is in a valid range after resize
        const { count: visibleCount } = getVisibleCountAndWidth();
        if (current + visibleCount > carouselItems.length) {
            current = Math.max(0, carouselItems.length - visibleCount);
        }
        updateCarousel();
    });

    updateCarousel();
});
