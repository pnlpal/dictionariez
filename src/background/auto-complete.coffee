import dict from "./dict.coffee"
import message from "./message.js"
import storage from "./storage.js"
import setting from "./setting.js"
import utils from "utils"

message.on 'autocomplete', ({ text })->
    results = []
    
    dicts = dict.searchDicts text.split(/\s/)[0]
    if dicts.length 
        dicts.forEach (d) ->
            ts = text.split(/\s/)
            ts.shift()
            d.queryText = ts.join(' ') or ''
        results = results.concat dicts

    html = ''
    if text.length > 1 and utils.isEnglish(text)
        url = "https://www.vocabulary.com/dictionary/autocomplete?search=#{text}"
        html = await utils.loadHTML url 

    return {results, html}
