import $ from 'jquery'
# import angular from 'angular'
import utils from "utils"
import debounce from 'lodash/debounce'

# import('bootstrap/dist/css/bootstrap.min.css')
import('../vendor/font-awesome.css')

import('./scrollbar.less')
import('./card.less')

sys = location.search.match(/sys=(\w+)/)[1]

initWiki = () ->
    getWikipedia = (w) ->
        res = await utils.send 'get wikipedia', { w }

        if res?.extract_html
            if res?.thumbnail
                $('.dictionaries-wikipedia .dictionaries-wiki-image').html "<img src='#{res.thumbnail.source}'></img>"
            else 
                $('.dictionaries-wikipedia .dictionaries-wiki-extract').addClass('dictionaries-wiki-margin-top')

            $('.dictionaries-wikipedia .dictionaries-wiki-extract').html(res.extract_html)
            $('.dictionaries-wikipedia .dictionaries-wiki-link').attr('href', res.content_urls.mobile.page)

            window.top.postMessage { type: 'show-card', sys }, '*'

    $('''
    <div class="dictionaries-wikipedia">
        <div class="dictionaries-card-toolbar navbar-fixed-top">
            <a class="dictionaries-wiki-link" href="" title="Open wikipedia">
                <img src="https://en.m.wikipedia.org/static/favicon/wikipedia.ico" alt="Wiki"></img>
            </a>

            <a class="dictionaries-card-close pull-right" href="" title="Close">
                <i class='fa fa-remove' aria-hidden='true'></i>
            </a>
            <a class="dictionaries-setting pull-right" href="" title="Go to settings">
                <i class='fa fa-cog' aria-hidden='true'></i>
            </a>
        </div>

        <div class="dictionaries-wiki-image"> </div>
        
        <div class="dictionaries-wiki-extract">
        </div>
    </div>
    ''').appendTo('body')

    getWikipedia()

initMusic = () -> 
    import('./music-player.coffee') 
    

initWiki() if sys == 'wiki'
initMusic() if sys == 'music'

$(document).on('click', 'a.dictionaries-wiki-link', (ev) -> 
    window.top.location.href = ev.currentTarget.href
    return false
)

$(document).on('click', 'a.dictionaries-card-close', (ev) -> 
    window.top.postMessage { type: 'close-card', sys }, '*'
    return false 
)

$(document).on('click', 'a.dictionaries-setting', (ev) -> 
    utils.send 'open options', { to: 'function-setting', sys }
    return false 
)