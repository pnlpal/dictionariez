loaderFn = (window, $) ->
    injectHtml = (file) ->
        url = chrome.extension.getURL(file)
        return $.get(url).then (data)->
            console.log "[loader] inject #{file} to body."
            $(data).appendTo('body')

    window.loader = {
        loadTemplate: ()->
            return injectHtml('template/header.html')
    }

loaderFn(this, $)
