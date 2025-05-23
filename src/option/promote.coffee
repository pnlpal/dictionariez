
promote = () ->
    if not localStorage.hasPromotedPNLReader and localStorage.visitOptionsCounter > 1
        width = $(document.body).width() * 0.6
        $('#pnl-reader-promo-modal').modal('show')

        $(".btn-not-intersted").on 'click', (e) ->
            localStorage.hasPromotedPNLReader = true
            $('#pnl-reader-promo-modal').modal('hide')

        $('#pnl-reader-promo-modal').off('hide.bs.modal').on 'hide.bs.modal', (ev) ->
            if (localStorage.visitOptionsCounter > 2)
                localStorage.hasPromotedPNLReader = true

    else if not localStorage.hasPromotedCaptionz and localStorage.visitOptionsCounter > 3
        width = $(document.body).width() * 0.8
        $('#captionz-promo-modal iframe').height(width / 2.67 + 10 )
        $('#captionz-promo-modal').modal('show')

        $(".btn-not-intersted").on 'click', (e) ->
            localStorage.hasPromotedCaptionz = true
            $('#captionz-promo-modal').modal('hide')

        $('#captionz-promo-modal').off('hide.bs.modal').on 'hide.bs.modal', (ev) ->
            $('#captionz-promo-modal iframe').remove()
            if (localStorage.visitOptionsCounter > 2)
                localStorage.hasPromotedCaptionz = true

setTimeout(promote, 3000)
localStorage.visitOptionsCounter = (parseInt(localStorage.visitOptionsCounter) || 0) + 1