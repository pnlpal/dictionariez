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
        // Calculate the translateX value
        track.scrollTo({
            left: current * carouselItemWidth,
            behavior: "smooth",
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

    // Modal logic
    const modal = document.getElementById("carousel-modal");
    const modalBody = modal.querySelector(".carousel-modal-body");
    const modalBackdrop = modal.querySelector(".carousel-modal-backdrop");

    function showModalForItem(item) {
        modalBody.innerHTML = "";
        if (item.classList.contains("video")) {
            // Clone the iframe for modal
            const iframe = item.querySelector("iframe").cloneNode(true);
            iframe.removeAttribute("width");
            iframe.removeAttribute("height");
            iframe.style.width = "80vw";
            iframe.style.height = "45vw";
            iframe.style.maxWidth = "900px";
            iframe.style.maxHeight = "70vh";
            modalBody.appendChild(iframe);
        } else {
            const img = document.createElement("img");
            img.src = item.src;
            img.alt = item.alt || "";
            modalBody.appendChild(img);
        }
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        modal.style.display = "none";
        modalBody.innerHTML = "";
        document.body.style.overflow = "";
    }

    modalBackdrop.addEventListener("click", closeModal);
    window.addEventListener("keydown", (e) => {
        if (modal.style.display === "flex" && (e.key === "Escape" || e.key === "Esc")) {
            closeModal();
        }
    });

    // Listen for click on carousel items
    carouselItems.forEach((item) => {
        item.style.cursor = "pointer";
        if (item.classList.contains("video")) {
            const overlay = item.querySelector(".carousel-video-overlay");
            overlay.addEventListener("click", (e) => {
                e.stopPropagation();
                showModalForItem(item);
            });
        } else {
            item.addEventListener("click", () => showModalForItem(item));
        }
    });
});
