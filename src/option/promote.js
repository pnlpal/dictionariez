/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */

const promote = function() {
    let width;
    if (!localStorage.hasPromotedPNLReader && (localStorage.visitOptionsCounter > 1)) {
        width = $(document.body).width() * 0.6;
        $('#pnl-reader-promo-modal').modal('show');

        $(".btn-not-intersted").on('click', function(e) {
            localStorage.hasPromotedPNLReader = true;
            return $('#pnl-reader-promo-modal').modal('hide');
        });

        return $('#pnl-reader-promo-modal').off('hide.bs.modal').on('hide.bs.modal', function(ev) {
            if (localStorage.visitOptionsCounter > 2) {
                return localStorage.hasPromotedPNLReader = true;
            }
        });

    } else if (!localStorage.hasPromotedCaptionz && (localStorage.visitOptionsCounter > 3)) {
        width = $(document.body).width() * 0.8;
        $('#captionz-promo-modal iframe').height((width / 2.67) + 10 );
        $('#captionz-promo-modal').modal('show');

        $(".btn-not-intersted").on('click', function(e) {
            localStorage.hasPromotedCaptionz = true;
            return $('#captionz-promo-modal').modal('hide');
        });

        return $('#captionz-promo-modal').off('hide.bs.modal').on('hide.bs.modal', function(ev) {
            $('#captionz-promo-modal iframe').remove();
            if (localStorage.visitOptionsCounter > 2) {
                return localStorage.hasPromotedCaptionz = true;
            }
        });
    }
};

setTimeout(promote, 3000);
localStorage.visitOptionsCounter = (parseInt(localStorage.visitOptionsCounter) || 0) + 1;