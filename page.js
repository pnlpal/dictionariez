// #######################################################################
//  Copyright (C) 2013 revir.qing@gmail.com
// 
//  This program is free software; you can redistribute it and/or modify
//  it under the terms of the GNU General Public License as published by
//  the Free Software Foundation; either version 2, or (at your option)
//  any later version.
// 
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.
// 
//  You should have received a copy of the GNU General Public License
//  along with this program; if not, write to the Free Software Foundation,
//  Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.  
//  
//  Author: Revir Qing (aguidetoshanghai.com)
//  URL: www.aguidetoshanghai.com

function processContentPage() {
    
}

function processDict() {
    jQuery(document).keydown(function(event) {
        if(event.metaKey || event.keyCode === 27 || event.keyCode === 10){
            $('.littleDictWrapper .dict_input').focus();
            $('.littleDictWrapper .dict_input').select();
        }
    });

    jQuery(document).click(function(event) {
        var node = jQuery(event.target);
        if (node.is('.dict_item')) {
            updateDictList(node[0].dictionary, node.text());
            queryDict();
        }
        if (node.is('.dict_query')) {
            event.preventDefault();
            queryDict();
        }
        if (node.is('.sound')) {
            var a = node.next('audio');
            if (a.length)
                a[0].play();
        }
    });

    var updateDictList = function(obj, defaultName) {
        var dictionary = obj;
        if (obj && obj.length) {
            $('.littleDictWrapper .dict_list').html('');
            $.each(obj, function(index, dict) {
                var t = '<li><a class="dict_item">' + dict.dictName + '</a></li>';
                $('.littleDictWrapper .dict_list').append(t);
                $('.littleDictWrapper .dict_item').get(-1).dictionary = dict;
                if (dict.dictName === defaultName)
                    dictionary = dict;
            });
        }
        if (dictionary && dictionary.dictName) {
            var cld = $('.littleDictWrapper .dict_name').children().clone();
            $('.littleDictWrapper .dict_name').text(defaultName);
            $('.littleDictWrapper .dict_name').append(cld);
            $('.littleDictWrapper .dict_name').get(0).dictionary = dictionary;
        }
    };
    var queryDict = function() {
        chrome.runtime.sendMessage({
            type: 'queryDict',
            means: 'minidict',
            text: $('.littleDictWrapper .dict_input').val(),
            dictionary: $('.littleDictWrapper .dict_name').get(0).dictionary
        });
    };

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.type === 'queryResult' && request.data) {
            console.log(request.data);
            $('.littleDictWrapper .dict_result').html(request.data);
            $('.littleDictWrapper .dict_input').val(request.text);
            $('.littleDictWrapper .dict_input').focus();
            $('.littleDictWrapper .dict_input').select();
        }
        if (request.type === 'info') {
            if (!$('.littleDictWrapper .dict_item').length && request.dictList) {
                updateDictList(request.dictList, request.defaultDictName);
            }
        }
    });

    console.log('[temp]send dictReady...');
    chrome.runtime.sendMessage({
        type: 'dictReady'
    });
}

(function main() {
    console.log('page.js init...');
    if (jQuery('.littleDictWrapper').length) {
        processDict();
    } else {
        processContentPage();
    }
    jQuery(document).mouseup(function() {
        if (window.getSelection().toString()) {
            chrome.runtime.sendMessage({
                type: 'queryDict',
                means: 'mouse',
                text: window.getSelection().toString()
            });
        }
    });

    chrome.runtime.sendMessage({
        type: 'keySettings',
    }, function(datas) {
        if (datas) {
            console.log('getKeySettings...');
            jQuery(document).bind('keydown', function(event) {
                var b = true;
                jQuery.each(datas.specialKeys.split(','), function(i, v) {
                    if (!event[v + 'Key'])
                        b = false;
                });
                if (event.keyCode !== datas.normalKey.charCodeAt(0))
                    b = false;
                if (b) {
                    chrome.runtime.sendMessage({
                        type: 'queryDict',
                        means: 'keyboard',
                        text: window.getSelection().toString()
                    });
                }
            });
        }
    });
}());