define(["jquery", "background/dictwindow.js"], function($, dictWindow) {
  var parseBing;
  // most: 这个单词的 E-E 词典有 gl_none 这个 class；
  // 词组: 查询词组时没有音标，只有发音；
  // 网络词汇可能只有 web 释义，没有发音，如： https://cn.bing.com/dict/search?q=wantonly
  // 中文词： 查询结果上部是英文翻译，E-E 的地方却是 cn-cn, 如： https://cn.bing.com/dict/search?q=%E5%A4%A7%E5%8D%8A
  parseBing = async function(url) {
    var cnDefs, defsNodes, eeNodes, enDefs, nodes, prons, ref, ref1, res;
    res = (await $.get(url));
    nodes = $(res);
    prons = {
      ame: nodes.find('.hd_area .hd_prUS').text(),
      ameAudio: (ref = nodes.find('.hd_area .hd_prUS').next('.hd_tf').html()) != null ? ref.match(/https:.*?\.mp3/)[0] : void 0,
      bre: nodes.find('.hd_area .hd_pr').text(),
      breAudio: (ref1 = nodes.find('.hd_area .hd_pr').next('.hd_tf').html()) != null ? ref1.match(/https:.*?\.mp3/)[0] : void 0
    };
    enDefs = [];
    eeNodes = nodes.find('#homoid tr.def_row');
    eeNodes.each(function(i, el) {
      return enDefs.push({
        pos: $(el).find('.pos').text(),
        // https://cn.bing.com/dict/search?q=most 这个单词有 gl_none 的特例;
        def: $(el).find('.def_fl .de_li1').filter(function() {
          return !$(this).parent().hasClass('gl_none');
        }).toArray().map(function(item) {
          return item.innerText;
        })
      });
    });
    cnDefs = [];
    defsNodes = nodes.find('.qdef ul');
    defsNodes.find('.pos').each(function(i, el) {
      return cnDefs.push({
        pos: $(el).text(),
        def: $(el).next().text()
      });
    });
    return {
      // console.log prons, enDefs, cnDefs
      en: enDefs,
      cn: cnDefs,
      prons
    };
  };
  // message.on 'look up plain', ({text})->
  //     res = await dictWindow.queryDict(text, '必应词典', false)
  //     parseBing(res.windowUrl)
  return {parseBing};
});

// parseBing('https://cn.bing.com/dict/search?q=most')


//# sourceMappingURL=plain-lookup.js.map
//# sourceURL=coffeescript