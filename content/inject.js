chrome.runtime.sendMessage({
  type: 'setting'
}, function(setting) {
  var getWordAtPoint, handleLookupByMouse, handleMouseUp, handleSelectionWord, mouseMoveTimer, plainQuerying, playAudios, renderQueryResult, setupPlainContentPosition;
  mouseMoveTimer = null;
  plainQuerying = null;
  jQuery(document).ready(function() {
    return jQuery('<div class="fairydict-tooltip">\n	<div class="fairydict-spinner">\n	  <div class="fairydict-bounce1"></div>\n	  <div class="fairydict-bounce2"></div>\n	  <div class="fairydict-bounce3"></div>\n	</div>\n	<p class="fairydict-tooltip-content">\n	</p>\n</div>').appendTo('body');
  });
  setupPlainContentPosition = function(e) {
    var $el, domH, domW, left, mousex, mousey, rect, top;
    $el = jQuery('.fairydict-tooltip');
    if ($el.length && e.pageX && e.pageY) {
      mousex = e.pageX + 20;
      mousey = e.pageY + 10;
      top = mousey;
      left = mousex;
      rect = window.document.body.getBoundingClientRect();
      domW = window.innerWidth - rect.left;
      domH = window.innerHeight - rect.top;
      if (domW - left < 300) {
        left = domW - 300;
      }
      if (domH - top < 200) {
        top = domH - 200;
      }
      return $el.css({top, left});
    }
  };
  jQuery(document).mousemove(function(e) {
    if (setting.enableSelectionOnMouseMove) {
      if (!setting.enableSelectionSK1 || (setting.enableSelectionSK1 && utils.checkEventKey(e, setting.selectionSK1))) {
        return handleSelectionWord(e);
      }
    }
  });
  jQuery(document).mouseup(function(e) {
    // 对 mouseup 事件做一个延时处理，
    // 以避免取消选中后getSelection依然能获得文字。
    return setTimeout((function() {
      return handleMouseUp(e);
    }), 1);
  });
  jQuery(document).bind('keyup', function(event) {
    if (utils.checkEventKey(event, setting.openSK1, setting.openSK2, setting.openKey)) {
      chrome.runtime.sendMessage({
        type: 'look up',
        means: 'keyboard',
        text: window.getSelection().toString().trim()
      });
    }
    if (event.key === "Escape") {
      jQuery('.fairydict-tooltip').fadeOut().hide();
      return plainQuerying = null;
    }
  });
  jQuery(document).on('click', '.fairydict-pron-audio', function(e) {
    e.stopPropagation();
    playAudios([jQuery(this).data('mp3')]);
    return false;
  });
  handleSelectionWord = function(e) {
    if (mouseMoveTimer) {
      clearTimeout(mouseMoveTimer);
    }
    return mouseMoveTimer = setTimeout((function() {
      var word;
      word = getWordAtPoint(e.target, e.clientX, e.clientY);
      if (word) {
        console.log(word);
        return handleLookupByMouse(e);
      }
    }), setting.selectionTimeout || 500);
  };
  playAudios = function(urls) {
    var __play, _play, audios;
    if (!(urls != null ? urls.length : void 0)) {
      return;
    }
    audios = urls.map(function(url) {
      return new Audio(url);
    });
    _play = function(audio, timeout) {
      if (timeout == null) {
        timeout = 0;
      }
      return jQuery.Deferred(function(dfd) {
        var _func;
        _func = function() {
          return setTimeout((function() {
            // console.log "play: ", audio.duration, timeout
            audio.play();
            return dfd.resolve(audio.duration || 1);
          }), timeout);
        };
        if (audio.duration) {
          return _func();
        } else {
          return audio.addEventListener('loadedmetadata', _func);
        }
      });
    };
    __play = function(idx, timeout) {
      if (idx == null) {
        idx = 0;
      }
      if (audios[idx]) {
        return _play(audios[idx], timeout).then(function(duration) {
          return __play(idx + 1, duration * 1000);
        });
      }
    };
    return __play();
  };
  getWordAtPoint = function(elem, x, y) {
    var currentPos, el, endPos, i, len, range, react, ref, sel;
    if (elem.nodeType === elem.TEXT_NODE) {
      range = elem.ownerDocument.createRange();
      range.selectNodeContents(elem);
      currentPos = 0;
      endPos = range.endOffset;
      while (currentPos + 1 < endPos) {
        range.setStart(elem, currentPos);
        range.setEnd(elem, currentPos + 1);
        if (range.getBoundingClientRect().left <= x && range.getBoundingClientRect().right >= x && range.getBoundingClientRect().top <= y && range.getBoundingClientRect().bottom >= y) {
          range.detach();
          sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
          sel.modify("move", "backward", "word");
          sel.collapseToStart();
          sel.modify("extend", "forward", "word");
          return sel.toString().trim();
        }
        currentPos += 1;
      }
    } else {
      ref = elem.childNodes;
      for (i = 0, len = ref.length; i < len; i++) {
        el = ref[i];
        range = el.ownerDocument.createRange();
        range.selectNodeContents(el);
        react = range.getBoundingClientRect();
        if (react.left <= x && react.right >= x && react.top <= y && react.bottom >= y) {
          range.detach();
          return getWordAtPoint(el, x, y);
        } else {
          range.detach();
        }
      }
    }
  };
  handleMouseUp = function(event) {
    var including, selObj, text;
    selObj = window.getSelection();
    text = selObj.toString().trim();
    if (!text) {
      // click inside the dict
      if (jQuery('.fairydict-tooltip').has(event.target).length) {
        return;
      }
      jQuery('.fairydict-tooltip').fadeOut().hide();
      plainQuerying = null;
      return;
    }
    // issue #4
    including = jQuery(event.target).has(selObj.focusNode).length || jQuery(event.target).is(selObj.focusNode);
    if (event.which === 1 && including) {
      return handleLookupByMouse(event);
    }
  };
  renderQueryResult = function(res) {
    var contentTpl, defTpl, defsTpl, html, posTpl, pronAudioTpl, pronHtml, pronTpl, pronsTpl, renderItem;
    defTpl = function(def) {
      return `<span class='fairydict-def'> ${def} </span>`;
    };
    defsTpl = function(defs) {
      return `<span class='fairydict-defs'> ${defs} </span>`;
    };
    posTpl = function(pos) {
      return `<span class='fairydict-pos'> ${pos} </span>`;
    };
    contentTpl = function(content) {
      return `<div class='fairydict-content'> ${content} </div>`;
    };
    pronTpl = function(pron) {
      return `<span class='fairydict-pron'> ${pron} </span>`;
    };
    pronAudioTpl = function(src) {
      return `<a class='fairydict-pron-audio' href='' data-mp3='${src}'><i class='icon-fairydict-volume'></i></a>`;
    };
    pronsTpl = function(prons) {
      return `<div class='fairydict-prons'> ${prons} </div>`;
    };
    html = '';
    if (res != null ? res.prons : void 0) {
      pronHtml = '';
      if (res.prons.ame) {
        pronHtml += pronTpl(res.prons.ame);
      }
      if (res.prons.ameAudio) {
        pronHtml += pronAudioTpl(res.prons.ameAudio);
      }
      if (res.prons.bre) {
        pronHtml += pronTpl(res.prons.bre);
      }
      if (res.prons.breAudio) {
        pronHtml += pronAudioTpl(res.prons.breAudio);
      }
      if (pronHtml) {
        html += pronsTpl(pronHtml);
      }
    }
    renderItem = function(item) {
      var defs, defsHtml, defsHtmls, posHtml;
      posHtml = posTpl(item.pos);
      defs = Array.isArray(item.def) ? item.def : [item.def];
      defsHtmls = defs.map(function(def) {
        return defTpl(def);
      });
      defsHtml = defsTpl(defsHtmls.join('<br>'));
      if (defsHtml) {
        return html += contentTpl(posHtml + defsHtml);
      }
    };
    if (res != null ? res.cn : void 0) {
      res.cn.forEach(renderItem);
    }
    if (res != null ? res.en : void 0) {
      res.en.forEach(renderItem);
    }
    if (html) {
      jQuery('.fairydict-tooltip .fairydict-spinner').hide();
      jQuery('.fairydict-tooltip .fairydict-tooltip-content').html(html);
    } else {
      jQuery('.fairydict-tooltip').fadeOut().hide();
    }
    return html;
  };
  return handleLookupByMouse = function(event) {
    var text;
    text = window.getSelection().toString().trim();
    if (!text) {
      return;
    }
    if (text.split(/\s/).length > 4) {
      return;
    }
    if (setting.enablePlainLookup && text !== plainQuerying) {
      if (!setting.enablePlainSK1 || (setting.plainSK1 && utils.checkEventKey(event, setting.plainSK1))) {
        jQuery('.fairydict-tooltip').fadeIn('slow');
        jQuery('.fairydict-tooltip .fairydict-spinner').show();
        jQuery('.fairydict-tooltip .fairydict-tooltip-content').empty();
        if (!plainQuerying) {
          setupPlainContentPosition(event);
        }
        plainQuerying = text;
        chrome.runtime.sendMessage({
          type: 'look up pain',
          means: 'mouse',
          text: text
        }, function(res) {
          var audios, html;
          html = renderQueryResult(res);
          if (!html) {
            plainQuerying = null;
          }
          if (res.prons) {
            audios = [];
            if (res.prons.ameAudio && setting.enableAmeAudio) {
              audios.push(res.prons.ameAudio);
            }
            if (res.prons.breAudio && setting.enableBreAudio) {
              audios.push(res.prons.breAudio);
            }
            if (audios.length) {
              return playAudios(audios);
            }
          }
        });
      }
    }
    if (!setting.enableMouseSK1 || (setting.mouseSK1 && utils.checkEventKey(event, setting.mouseSK1))) {
      return chrome.runtime.sendMessage({
        type: 'look up',
        means: 'mouse',
        text: text
      });
    }
  };
});

chrome.runtime.sendMessage({
  type: 'injected',
  url: location.href
});


//# sourceMappingURL=inject.js.map
//# sourceURL=coffeescript