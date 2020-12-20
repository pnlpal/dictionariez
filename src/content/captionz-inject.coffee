import $ from 'jquery'
import utils from "utils"

setYtb = () => 
    sbtn = '<button id="captionz-ytb-btn">Watch on Captionz</button>'

    await utils.checkInTime () ->
        $('ytd-video-primary-info-renderer #container').length > 0
    $('ytd-video-primary-info-renderer #container').first().prepend(sbtn);

    $(document).on('click', '#captionz-ytb-btn', () => 
        utils.send 'open ytb video on captionz', {
            link: location.href
        }
    )

setCaptionz = () =>
    link = await utils.send 'get ytb link on captionz'
    if link 
        await utils.checkInTime () ->
            $('input.video-url').length > 0
        
        $('input.video-url').val(link)
        $('input.video-url')[0].dispatchEvent(new CustomEvent('input', { bubbles: true }))

$(document).ready () ->
    if location.origin == "https://www.youtube.com" and location.pathname == "/watch"
        setYtb().catch(console.warn)

    if location.origin == 'https://pnlpal.dev' and location.pathname == '/captionz-ii/'
        setCaptionz().catch(console.warn)