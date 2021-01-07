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

setCaptionz = () =>
    link = await utils.send 'get ytb link on captionz'
    if link 
        await utils.checkInTime () ->
            $('input.video-url').length > 0
        
        $('input.video-url').val(link)
        $('input.video-url')[0].dispatchEvent(new CustomEvent('input', { bubbles: true }))

$(document).ready () ->
    { disableYtbCaptionz } = await utils.send 'setting of ytb captionz'
    if not disableYtbCaptionz
        if location.origin == "https://www.youtube.com" and window.self == window.top
            setYtb().catch(console.warn)

        if location.origin == 'https://pnlpal.dev' and location.pathname == '/captionz-ii/'
            setCaptionz().catch(console.warn)
            setCaptionzMessages()
        
        if location.origin == 'http://river.com'   # development env 
            setCaptionzMessages()

setCaptionzMessages = () ->
    window.addEventListener "message", (event) ->
        if event.source == window and \
            event.data and \
            event.data.direction == "from-page-captionz"
            # console.log("Content script received message:", event.data)

            if event.data.get == 'tracks'
                result = await utils.send 'get tracks', event.data.params
            else if event.data.get == 'caption'
                result = await utils.send 'get caption', event.data.params

            window.postMessage({
                direction: "from-dictionariez-to-captionz",
                get: event.data.get,
                result
            }, "*")
  