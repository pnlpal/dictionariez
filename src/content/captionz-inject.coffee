import $ from 'jquery'
import utils from "utils"

setYtb = () => 
    return if $('#captionz-ytb-btn').length > 0
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

observePathnameChange = (callback) ->
    lastPathname = location.pathname
    observer = new MutationObserver (mutations) ->
        mutations.forEach (mutation) ->
            if location.pathname != lastPathname
                lastPathname = location.pathname
                callback()
    observer.observe document, { subtree: true, childList: true }


export initCaptionzInjection = () => 
    $(document).ready () ->
        { disableYtbCaptionz } = await utils.send 'setting of ytb captionz'
        if not disableYtbCaptionz
            if (location.href.startsWith "https://www.youtube.com/watch") and location.search.includes('v=') and window.self == window.top
                setYtb().catch(console.warn)

            observePathnameChange ->
                if (location.href.startsWith "https://www.youtube.com/watch") and location.search.includes('v=') and window.self == window.top
                    setYtb().catch(console.warn)