const promote = () => {
    const visitCounter = parseInt(localStorage.visitOptionsCounter) || 0;

    if (!localStorage.hasPromotedPNLReader && visitCounter > 1) {
        const width = $(document.body).width() * 0.6;
        $("#pnl-reader-promo-modal").modal("show");

        $(".btn-not-intersted").on("click", () => {
            localStorage.hasPromotedPNLReader = true;
            $("#pnl-reader-promo-modal").modal("hide");
        });

        $("#pnl-reader-promo-modal")
            .off("hide.bs.modal")
            .on("hide.bs.modal", () => {
                if (visitCounter > 2) {
                    localStorage.hasPromotedPNLReader = true;
                }
            });
    } else if (!localStorage.hasPromotedCaptionz && visitCounter > 3) {
        const width = $(document.body).width() * 0.8;
        $("#captionz-promo-modal iframe").height(width / 2.67 + 10);
        $("#captionz-promo-modal").modal("show");

        $(".btn-not-intersted").on("click", () => {
            localStorage.hasPromotedCaptionz = true;
            $("#captionz-promo-modal").modal("hide");
        });

        $("#captionz-promo-modal")
            .off("hide.bs.modal")
            .on("hide.bs.modal", () => {
                $("#captionz-promo-modal iframe").remove();
                if (visitCounter > 2) {
                    localStorage.hasPromotedCaptionz = true;
                }
            });
    }
};

setTimeout(promote, 3000);
localStorage.visitOptionsCounter = (parseInt(localStorage.visitOptionsCounter) || 0) + 1;
