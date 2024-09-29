import $ from 'jquery'
import utils from "utils"

setYtb = () => 
    sbtn = '<a href="" id="captionz-ytb-btn">Watch on CatsLoveYouTube</a>'

    await utils.checkInTime () ->
        $('#above-the-fold').length > 0

    $('#above-the-fold').prepend(sbtn);

    $(document).on('click', '#captionz-ytb-btn', () => 
        utils.send 'open ytb video on captionz', {
            link: location.href
        }
        return false;
    )

export initCaptionzInjection = () => 
    $(document).ready () ->
        { disableYtbCaptionz } = await utils.send 'setting of ytb captionz'
        if not disableYtbCaptionz
            if location.origin == "https://www.youtube.com" and location.search.includes('v=') and window.self == window.top
                setYtb().catch(console.warn)
