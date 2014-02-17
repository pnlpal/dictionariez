var dictManager = {};
dictManager.loadingHtml = '<i class="icon-spinner icon-spin icon-2x pull-left"></i>正在查询...';
dictManager.allDicts = [{
    'dictName': 'iciba.com',
    'entry': 'Iciba',
    'baseUrl': 'http://dict-co.iciba.com/api/dictionary.php',
    'queryType': 'get',
    'params': {
        'key': '0AAE477DB66EC58D12E1451877045CA5'
    },
    'queryKey': 'w'
}, {
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
}, 
// {
//     'dictName': 'Merriam-Webster\'s Collegiate',
//     'entry': 'Webster',
//     'headerUrl': 'http://www.dictionaryapi.com/api/v1/references/collegiate/xml/',
//     'queryType': 'get',
//     'params': {
//         'key': 'f5f640de-e484-4a9e-a629-db38f0fa4995'
//     }
// }, 
{
    'dictName': 'The Collaborative International Dictionary of English',
    'entry': 'Aonaware',
    'baseUrl': 'http://services.aonaware.com/DictService/DictService.asmx/DefineInDict',
    'queryType': 'post',
    'params': {
        'dictId': 'gcide'
    },
    'queryKey': 'word'
}, {
    'dictName': 'Easton\'s 1897 Bible Dictionary',
    'entry': 'Aonaware',
    'baseUrl': 'http://services.aonaware.com/DictService/DictService.asmx/DefineInDict',
    'queryType': 'post',
    'params': {
        'dictId': 'easton'
    },
    'queryKey': 'word'
}];

dictManager.defaultDict = dictManager.allDicts[0];

dictManager.parseAonaware = function(text) {
    var xml = $.parseXML(text);
    return '<pre>' + $('Definitions WordDefinition', xml).text() + '</pre>';
};

dictManager.parseIciba = function(text) {
    var d = $(document.createElement('div'));
    var xml = jQuery.parseXML(text);
    d.append('<h4></h4>');
    jQuery('ps', xml).each(function(index, el) {
        var t = jQuery(el).text();
        var audio = jQuery(el).next('pron').text();
        var n = '<span class="pron">' + t + '&nbsp<i class="fa fa-volume-up sound"></i>' + '<audio src="' + audio + '"></audio>&nbsp&nbsp&nbsp&nbsp' + '</span>';
        jQuery('h4', d).append(n);
    });

    jQuery('pos', xml).each(function(i, el) {
        var m = $(el).next('acceptation').text();
        var s = '<p>' + $(el).text() + '<b>' + m + '</b>' + '</p>';
        d.append(s);
    });
    jQuery('orig, fy', xml).each(function(i, el) {
        var m = $(el).next('trans').text();
        var s = '<p class="example"><i class="fa fa-coffee"></i>' + $(el).text() + '</p>';
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

dictManager.parseWebster = function(text) {
    var wrapper = $(document.createElement('div'));
    wrapper.addClass('webster');
    var xml = jQuery.parseXML(text);
    jQuery('entry', xml).each(function(index, entry) {
        var entryId = jQuery(entry).attr('id');
        wrapper.append('<div entry="' + entryId + '"> </div>');
        var d = jQuery('div[entry]', wrapper).last();

        // var fl = jQuery('fl', entry).text();
        var pro = jQuery('pr', entry).text();
        // d.append('<h4></h4>');

        var soundEl = jQuery('sound', entry);
        var audio = jQuery('wav', soundEl).text();
        var wpr = jQuery('wpr', soundEl).text();

        //get the audio's url:
        var baseUrl = 'http://media.merriam-webster.com/soundc11/';
        var subp = audio[0];
        var ms = audio.match(/^bix|^gg|^\d+/);
        if (ms) {
            subp = ms[0];
        }
        var url = baseUrl + subp + '/' + audio;


        var n = '<h4><b>' +entryId+
            '</b>' +
            '<span class="pron">' + pro +
            '&nbsp<i class="fa fa-volume-up sound"></i>' +
            '<audio src="' + url + '"></audio>&nbsp' + wpr +
            '&nbsp&nbsp&nbsp&nbsp</span></h4>';
        d.append(n);

        var et = jQuery('et', entry).html();
        var n2 = '<p>'+et+'</p>';
        d.append(n2);

        jQuery(entry).children('def').each(function(j, defEl){
            var vt = jQuery('vt', defEl).text();
            var date = jQuery('date', defEl).text();
            d.append('<p>'+vt+', '+date + '</p>');
            jQuery('sn', defEl).each(function(k, snEl){
                var sntext = jQuery(snEl).nextUtil('sn').text();
                d.append('<p>'+sntext+'</p>');

            });

        });
    });
    return wrapper.htm();
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
        if (dictionary.queryKey)
            params[dictionary.queryKey] = word;
        var url = '';
        if (dictionary.baseUrl)
            url = dictionary.baseUrl;
        else //webster dictionary
            url = dictionary.headerUrl + encodeURI(word);
        $[dictionary.queryType](url, params, onSuccess, 'text').fail(failedCB).error(failedCB);
    }
};