var dictManager = {};
dictManager.loadingHtml = '<i class="icon-spinner icon-spin icon-2x pull-left"></i>正在查询...';
dictManager.allDicts = [{
    'dictName': 'dict.cn',
    'entry': 'DictCN'
}, {
    'dictName': 'WordNet (r) 2.0',
    'entry': 'Aonaware',
    'baseUrl': 'http://services.aonaware.com/DictService/DictService.asmx/DefineInDict',
    'queryType': 'post',
    'params': {
        'dictId': 'wn'
    },
    'queryKey': 'word'
}, {
    'dictName': 'iciba.com',
    'entry': 'Iciba',
    'baseUrl': 'http://dict-co.iciba.com/api/dictionary.php',
    'queryType': 'get',
    'params': {
        'key': '0AAE477DB66EC58D12E1451877045CA5'
    },
    'queryKey': 'w'
}];

dictManager.defaultDict = dictManager.allDicts[0];

dictManager.parseAonaware = function(text) {
    var xmlobject = new DOMParser().parseFromString(text, "text/xml");
    var meaning = '';
    jQuery('Definition', xmlobject).each(function() {
        meaning = jQuery('WordDefinition', this).text();
        return false;
    });
    return meaning;
};

dictManager.parseIciba = function(text) {
    var d = $(document.createElement('div'));
    var xml = jQuery.parseXML(text);
    d.append('<h4></h4>');
    jQuery('ps', xml).each(function(index, el) {
        var t = jQuery(el).text();
        var audio = jQuery(el).next('pron').text();
        var n = '<span class="pron">' + t + '&nbsp<i class="icon-volume-up icon-middle sound"></i>' + '<audio src="' + audio + '"></audio>&nbsp&nbsp&nbsp&nbsp' + '</span>';
        jQuery('h4', d).append(n);
    });

    jQuery('pos', xml).each(function(i, el) {
        var m = $(el).next('acceptation').text();
        var s = '<p>' + $(el).text() + '<b>' + m + '</b>' + '</p>';
        d.append(s);
    });
    jQuery('orig, fy', xml).each(function(i, el) {
        var m = $(el).next('trans').text();
        var s = '<p class="example"><i class="icon-coffee"></i>' + $(el).text() + '</p>';
        var s2 = '<p>' + m + '</p>';
        d.append(s);
        d.append(s2);
    });
    return d.html();
};

dictManager.parseDictCN = function(word) {
    var src = "http://dict.cn/mini.php?q=" + word;
    var frameStr = '<iframe src="' + src + '"></iframe>';
    return frameStr;
};

dictManager.queryDict = function(word, dictionary, succeedCB, failedCB) {
    if (!word)
    //TODO： display sth
        return;
    if (!dictionary.queryType) {
        succeedCB(dictManager['parse' + dictionary.entry](word));
    } else {
        var onSuccess = function(data) {
            var ret = dictManager['parse' + dictionary.entry](data);
            succeedCB(ret);
        };
        var params = $.extend(true, {}, dictionary.params);
        params[dictionary.queryKey] = word;
        $[dictionary.queryType](dictionary.baseUrl, params, onSuccess, 'text').fail(failedCB).error(failedCB);
    }
};
