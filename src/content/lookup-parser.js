let virtualDom;

const $clean = (html) => {
  // To let jQuery parse HTML without loading resources.
  // see: https://stackoverflow.com/questions/15113910/jquery-parse-html-without-loading-images
  virtualDom =
    virtualDom ||
    document.implementation.createHTMLDocument("virtual-for-dictionariez");
  return $(html, virtualDom);
};

const trimWordPos = (pos) => {
  pos = pos.toLowerCase();
  const specials = [
    "adjective",
    "adverb",
    "interjection",
    "numeral",
    "article",
    "determiner",
  ];

  if (specials.includes(pos)) {
    return pos.slice(0, 3);
  }

  if (pos.length > 4) {
    return pos.slice(0, 4);
  }
  return pos;
};

const parseHTML = (htmlString, parserDesc) => {
  let result = {};
  const $html =
    typeof htmlString === "string" ? $clean(htmlString) : htmlString;

  for (let key in parserDesc) {
    let desc = parserDesc[key];
    if (Array.isArray(desc)) {
      result[key] = [];
      for (let subObj of desc) {
        result[key].push(parseHTML($html, subObj));
      }
    } else {
      let $container = $html;
      if (desc.container) {
        $container = $($html.find(desc.container).get(0));
      }

      if (desc.groups) {
        result[key] = [];
        let $nodes = $container.find(desc.groups);
        if (desc.extendPrev) {
          $nodes = $nodes.map(function (i, n) {
            let _ctnr = $("<div></div>");
            _ctnr.append($(n).clone());

            let _p = $(n);
            for (let i = 1; i <= 20; i++) {
              _p = _p.prev();
              if (_p.is(desc.extendPrev)) {
                _ctnr.append(_p.clone());
                return _ctnr;
              }
            }
            return _ctnr;
          });
        }

        if (desc.extendNextTo) {
          $nodes = $nodes.map(function (i, n) {
            let _ctnr = $("<div></div>");
            _ctnr.append($(n).clone());

            let _p = $(n);
            for (let i = 1; i <= 20; i++) {
              _p = _p.next();
              if (!_p.is(desc.extendNextTo)) {
                _ctnr.append(_p.clone());
              } else {
                return _ctnr;
              }
            }
            return _ctnr;
          });
        }

        if (desc.filterRelatedWord) {
          let firstWord = $nodes.find(desc.filterRelatedWord).get(0)?.innerText;
          $nodes = $nodes.filter(function (i, el) {
            return $(el).find(desc.filterRelatedWord).text() == firstWord;
          });
        }

        $nodes.each(function (i, el) {
          if (!$(el).parents(desc.groups).length) {
            result[key].push(parseHTML($(el), desc.result));
          } else {
            console.log(
              "Find the group inside another group, ignore: ",
              $(el).parents(desc.groups).length
            );
          }
        });
      } else {
        let value = getValueFromNode($container, desc);

        if (value && key == "pos") {
          value = trimWordPos(value);
        }

        result[key] = value;
      }
    }
  }
  return result;
};

const getValueFromNode = ($node, desc) => {
  let value = null;
  let $el = $node;

  if (desc.selector || desc.selector1) {
    if (desc.selector1) {
      $el = $node.find(desc.selector1);
      if (!$el.length) {
        $el = $node.find(desc.selector);
      }
    } else {
      $el = $node.find(desc.selector);
    }

    if (desc.singleParents) {
      $el = $el.filter(function (idx, item) {
        return $(item).parents(desc.singleParents).length === 1;
      });
    }

    if (desc.excludeChild) {
      $el.find(desc.excludeChild).detach();
    }

    if (desc.parents) {
      $el = $el.filter(function (idx, item) {
        return $(item).parents(desc.parents).length >= 1;
      });
    }
  }

  if (typeof desc === "string") {
    value = desc;
  } else if (desc.toArray) {
    value = $el
      .toArray()
      .map(function (item) {
        return item.innerText ? item.innerText.trim() : null;
      })
      .filter(function (x) {
        return x;
      });

    if (desc.max && value.length > desc.max) {
      value = value.filter(function (item, i) {
        return i < 2;
      });
    }
  } else if (desc.data) {
    value = $el.data(desc.data);
  } else if (desc.attr) {
    value = $el.attr(desc.attr);
  } else if (desc.attrOrText) {
    value =
      $el.attr(desc.attrOrText) ||
      ($el.get(0) ? $el.get(0).innerText.trim() : null);
  } else if (desc.htmlRegex) {
    value = $el.html()
      ? $el.html().match(new RegExp(desc.htmlRegex))[desc.regexIndex || 0]
      : null;
  } else {
    value = $el.get(0) ? $el.get(0).innerText.trim() : null;
  }

  if (desc.strFilter && value) {
    value = value.replace(new RegExp(desc.strFilter, "g"), "");
  }

  return value;
};

export { parseHTML };

export default () => {
  chrome.runtime.onMessage.addListener(
    ({ type, html, parserDesc }, sender, sendResponse) => {
      if (type == "parse lookup result") {
        const parsedResult = parseHTML(html, parserDesc);
        console.log("parsedResult", parsedResult);
        sendResponse(parsedResult);
      }
    }
  );
};
