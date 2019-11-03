import $ from "jquery"
import dictWindow from "./dictwindow.coffee"
import message from "./message.coffee"

# most: 这个单词的 E-E 词典有 gl_none 这个 class；
# 词组: 查询词组时没有音标，只有发音；
# 网络词汇可能只有 web 释义，没有发音，如： https://cn.bing.com/dict/search?q=wantonly
# 中文词： 查询结果上部是英文翻译，E-E 的地方却是 cn-cn, 如： https://cn.bing.com/dict/search?q=%E5%A4%A7%E5%8D%8A
parseBing = (url) ->
    res = await $.get(url)
    nodes = $(res)
    # console.log(nodes.find('.hd_pr').text())
    # console.log(nodes.find('.hd_prUS').text())

    prons = {
        ame: nodes.find('.hd_area .hd_prUS').text(),
        ameAudio: nodes.find('.hd_area .hd_prUS').next('.hd_tf').html()?.match(/https:.*?\.mp3/)[0]
        bre: nodes.find('.hd_area .hd_pr').text(),
        breAudio: nodes.find('.hd_area .hd_pr').next('.hd_tf').html()?.match(/https:.*?\.mp3/)[0]
    }

    enDefs = []

    eeNodes = nodes.find('#homoid tr.def_row')
    eeNodes.each (i, el) ->
        enDefs.push({
            pos: $(el).find('.pos').text(),
            def: $(el).find('.def_fl .de_li1')
                # https://cn.bing.com/dict/search?q=most 这个单词有 gl_none 的特例;
                .filter(() -> !$(this).parent().hasClass('gl_none'))
                .toArray().map (item) -> item.innerText
        })

    cnDefs = []
    defsNodes = nodes.find('.qdef ul')
    defsNodes.find('.pos').each (i, el) ->
        cnDefs.push({
            pos: $(el).text(),
            def: $(el).next().text()
        })

    # console.log prons, enDefs, cnDefs
    return {en: enDefs, cn: cnDefs, prons}

message.on 'look up plain', ({text})->
    res = await dictWindow.queryDict(text, '必应词典', false)
    parseBing(res.windowUrl)


# parseBing('https://cn.bing.com/dict/search?q=most')