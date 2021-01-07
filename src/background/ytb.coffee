import message from "./message.coffee"
import utils from "utils"
import $ from "jquery"
import { find } from 'lodash'

getCaptionTracks = (videoId) -> 
    data = await $.get "https://www.youtube.com/get_video_info?video_id=#{videoId}"

    decodedData = decodeURIComponent(data)
    regex = /({"captionTracks":.*isTranslatable":(true|false)}])/
    [ match ] = regex.exec(decodedData);
    { captionTracks } = JSON.parse("#{match}}")
    return { captionTracks }

getCaption = (url) ->
    transcript = await $.get url 
    $(transcript).find('text').toArray().map (item, idx)->
        start = Number.parseFloat item.getAttribute 'start'
        dur = Number.parseFloat item.getAttribute 'dur'
        text = item.innerHTML
        return { start, dur, text }

export default {
    init: () ->
        message.on 'get tracks', ({ videoId }) ->
            return getCaptionTracks videoId
        message.on 'get caption', ({ url }) ->
            return getCaption url

}