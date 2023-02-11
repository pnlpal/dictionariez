import setting from "./setting.coffee"
import dict from "./dict.coffee"
import utils from "utils"

xmlSuggestion = (w, dictName, url)->
    '''<dim>query </dim>
    <dim><match>{w} </match></dim>
    <dim>in </dim>
    <match>{dictName} </match>
    <url>  {url}</url>
    '''.replace('{w}', w)
    .replace('{dictName}', utils.sanitizeHTML(dictName))
    .replace('{url}', utils.sanitizeHTML(url))

chrome.omnibox.onInputChanged.addListener (text, suggest) ->
    w = text.trim()
    return if not w 
    s = "query #{w} in "
    result = []
    for d in dict.allDicts
        url = dict.query(w, d.dictName)
        result.push { 
            content: url, 
            description: xmlSuggestion(w, d.dictName, url), 
            deletable: true  
        }
        break if result.length == 9
    
    console.log(result)
    suggest(result)

chrome.omnibox.onInputEntered.addListener (text) ->
    console.log "entered:", text 
    chrome.tabs.create({url: text })

chrome.omnibox.onInputStarted.addListener () ->
    chrome.omnibox.setDefaultSuggestion { description: "wtf!"} 