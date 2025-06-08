
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

setTimeout(promote, 3000)
localStorage.visitOptionsCounter = (parseInt(localStorage.visitOptionsCounter) || 0) + 1