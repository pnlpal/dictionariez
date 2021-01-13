import $ from 'jquery'
import utils from "utils"

setYtb = () => 
    sbtn = '<a href="" id="captionz-ytb-btn">Watch on Captionz</a>'

    await utils.checkInTime () ->
        $('#info #info-contents ytd-video-primary-info-renderer').length > 0

    $('#info #info-contents ytd-video-primary-info-renderer').first().prepend(sbtn);

    $(document).on('click', '#captionz-ytb-btn', () => 
        utils.send 'open ytb video on captionz', {
            link: location.href
        }
        return false;
    )

$(document).ready () ->
    { disableYtbCaptionz } = await utils.send 'setting of ytb captionz'
    if not disableYtbCaptionz
        if location.origin == "https://www.youtube.com" and window.self == window.top
            setYtb().catch(console.warn)
        
