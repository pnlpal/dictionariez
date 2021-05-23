import $ from 'jquery'
# import angular from 'angular'
import utils from "utils"
import debounce from 'lodash/debounce'

import('bootstrap/dist/css/bootstrap.min.css')
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

                # wiki's bug?
                if res.extract?.endsWith("may refer to:")
                    return

            $('.dictionaries-wikipedia .dictionaries-wiki-extract').html(res.extract_html)
            $('.dictionaries-wikipedia .dictionaries-card-link').attr('href', res.content_urls.mobile.page)

            window.showCard(window.cardSetting.minimal)

    $('''
    <a class="dictionaries-card-minimal-icon" href="" title="Open wikipedia" style="display: none;">
        <img src="https://en.m.wikipedia.org/static/favicon/wikipedia.ico" alt="Wiki"></img>
    </a>
    <div class="dictionaries-wikipedia dictionaries-card-max">
        <div class="dictionaries-card-toolbar navbar-fixed-top">
            <a class="dictionaries-card-link" href="" title="Open wikipedia">
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
    
(() ->
    setting = await utils.send 'card setting', { 
        sys, 
        origin: location.origin,
        url: location.href
    }
    window.cardSetting = setting 

    initWiki() if sys == 'wiki' and !setting.disabled
)()

$(document).on('click', 'a.dictionaries-card-link', (ev) -> 
    window.top.location.href = ev.currentTarget.href
    return false
)

window.showCard = (minimal) ->
    window.top.postMessage { type: 'show-card', sys, minimal }, '*'
    if minimal
        $('.dictionaries-card-minimal-icon').show()
        $('.dictionaries-card-max').hide()
    else 
        $('.dictionaries-card-minimal-icon').hide()
        $('.dictionaries-card-max').show()

$(document).on('click', 'a.dictionaries-card-close', (ev) -> 
    showCard(true)

    utils.send 'card minimal', { sys, minimal: true }
    return false 
)

$(document).on('click', 'a.dictionaries-card-minimal-icon', (ev) -> 
    showCard()

    utils.send 'card minimal', { sys, minimal: false }
    return false 
)

$(document).on('click', 'a.dictionaries-setting', (ev) -> 
    utils.send 'open options', { to: 'function-setting', sys }
    return false 
)