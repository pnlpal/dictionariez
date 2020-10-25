import $ from "jquery"
import dict from "./dict.coffee"
import message from "./message.coffee"
import storage from "./storage.coffee"
import setting from "./setting.coffee"
import utils from "utils"
import parsers from '../resources/dict-parsers.json'

trimWordPos = (pos) ->
    specials = ["adjective", "adverb", "interjection", "numeral", "article", "determiner"]
    
    if specials.includes(pos) 
        return pos.slice(0, 3)

    if pos.length > 4
        return pos.slice(0, 4)
    return pos 

class LookupParser 
    constructor: (@data) ->
        @typeCount = Object.keys(@data).length

        @otherSupportedLanguages = []
        for dictDesc in Object.values(@data)
            @otherSupportedLanguages.push dictDesc.language if dictDesc.language
        
        setting.configCache.otherSupportedLanguages = @otherSupportedLanguages
        
    checkType: (w) ->
        for name, dictDesc of @data
            if dictDesc.supportEnglish
                return name if utils.isEnglish(w) and setting.getValue "enableLookupEnglish"
            if dictDesc.supportChinese
                return name if utils.isChinese(w) and setting.getValue "enableLookupChinese"
            if dictDesc.regex
                if w.match(new RegExp(dictDesc.regex, 'ug'))?.length == w.length \
                    and dictDesc.language not in setting.getValue("otherDisabledLanguages")
                    return name

    parse: (w) ->
        tname = @checkType(w)
        return unless tname 

        dictDesc = @data[tname]
        url = dictDesc.url.replace('<word>', w)

        html = $(await $.get url)

        result = @parseResult html, dictDesc.result

        # special handle of bing when look up Chinese
        if tname == "bing"
            if utils.isChinese(w) 
                result.prons.push({'synthesis': 'zh-CN'})
            else # English 
                result.prons = result.prons.filter (n) -> n.type != 'pinyin'
                if not setting.getValue 'showChineseDefinition'
                    delete result.defs2

        return result

    parseByType: (w, type="ldoce") ->
        dictDesc = @data[type]
        url = dictDesc.url.replace('<word>', w)

        html = $(await $.get url)
        return @parseResult html, dictDesc.result

    parseResult: ($el, obj) ->
        result = {}
        for key, desc of obj
            if Array.isArray desc 
                result[key] = []
                result[key].push @parseResult($el, subObj) for subObj in desc
            else 
                $container = $el 
                if desc.container 
                    $container = $($el.find(desc.container).get(0))

                if desc.groups 
                    result[key] = []
                    $nodes = $container.find desc.groups 

                    # Thai of Bab.la need to filter some related words
                    if desc.filterRelatedWord
                        firstWord = $nodes.find(desc.filterRelatedWord).get(0)?.innerText
                        $nodes = $nodes.filter (i, el) =>
                            $(el).find(desc.filterRelatedWord).text() == firstWord

                    $nodes.each (i, el) =>
                        if not $(el).parents(desc.groups).length  # hack: ignore groups inside another group
                            result[key].push @parseResult($(el), desc.result)
                        else 
                            console.log "Find the group inside another group, ignore: ", $(el).parents(desc.groups).length
                        
                else
                    value = @parseResultItem $container, desc

                    if value and key == 'pos'
                        value = trimWordPos value 

                    result[key] = value 

        return result 

    parseResultItem: ($node, desc) ->
        value = null

        $el = $node 
        if desc.selector
            $el = $node.find(desc.selector)
            if desc.singleParents 
                $el = $el.filter (idx, item)->
                    return $(item).parents(desc.singleParents).length == 1

        if typeof desc == 'string'
            value = desc 
        else if desc.toArray 
            value = $el.toArray().map (item, idx) -> 
                text = item.innerText?.trim()
                if desc.includeArrayIndex and text
                    "#{idx+1}. " + item.innerText?.trim()
                else 
                    text

        else if desc.data
            value = $el.data(desc.data)
        else if desc.attr
            value = $el.attr(desc.attr)
        else if desc.htmlRegex
            value = $el.html()?.match(new RegExp(desc.htmlRegex))?[0]
        else
            value = $el.get(0)?.innerText?.trim()
        
        if desc.strFilter and value 
            value = value.replace new RegExp(desc.strFilter, 'g'), ''
        
        return value

test = () ->
    parser = new LookupParser(parsers)
    # parser.parse('most').then console.log 
    # parser.parse('自由').then console.log 
    # parser.parse('請').then console.log 
    # parser.parse('請う').then console.log 
    # parser.parse('あなた').then console.log 
    # parser.parse('장소').then console.log 
    # parser.parse('бештар').then console.log 
    # parser.parse('бо').then console.log 
    # parser.parse('ไทย').then console.log 
    parser.parse('beauty').then console.log 

# test()

export default {
    parser: new LookupParser(parsers),

    init: () ->
        # await @syncDictParsers()

        message.on 'check text supported', ({ w }) =>
            w = w.trim()
            return unless w

            return @parser.checkType(w)
        
        message.on 'look up plain', ({w, s, sc, sentence}) =>
            w = w.trim()
            return unless w

            storage.addHistory({
                w, s, sc, sentence
            }) if s  # ignore lookup from options page

            return @parser.parse(w) 

        message.on 'get real person voice', ({ w }) =>
            return @parser.parseByType(w) if w.split(' ').length == 1  # ignore phrase
        message.on 'get english pron symbol', ({ w }) =>
            return @parser.parseByType(w, 'bing') if w.split(' ').length == 1 # ignore phrase

        message.on 'look up phonetic', ({ w, _counter }) =>
            { prons } = await @parser.parseByType(w, 'bing')
            for n in prons 
                if n.type == 'ame' and n.symbol
                    ame = n.symbol.replace('US', '').trim()
                    return { ame } 

    syncDictParsers: () ->
        errorResult = null 

        src = 'http://localhost:8000/dict-parsers.json'
        data = await $.getJSON(extraSrc).catch (err)->
                console.error "Get parsers remotely failed: ", err.status, err.statusText
                errorResult = { message: err.statusText, error: true }

        @parser = new LookupParser(data)
}
