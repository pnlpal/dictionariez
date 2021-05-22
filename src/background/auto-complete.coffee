import $ from "jquery"
import dict from "./dict.coffee"
import message from "./message.coffee"
import storage from "./storage.coffee"
import setting from "./setting.coffee"
import utils from "utils"

parseVocabulary = (text) ->
    return [] unless text and utils.isEnglish(text)

    url = "https://www.vocabulary.com/dictionary/autocomplete?search=#{text}"
    res = await $.get url
    nodes = $(res)
    list = []
    nodes.find('li>.entry').each (i, item) ->
        w = $(item).find('.word').text()
        def = $(item).find('.definition').text()

        list.push({ w, def }) unless i > 11  # at most 12 items
        
    return list

message.on 'autocomplete', ({ text })->
    results = []
    
    dicts = dict.searchDicts text.trim().split(/\s/)[0]
    if dicts.length 
        dicts.forEach (d) ->
            ts = text.trim().split(/\s/)
            ts.shift()
            d.queryText = ts.join(' ') or ''
        results = results.concat dicts

    if text.trim().length > 1
        results = results.concat await parseVocabulary(text.trim())
    return results
