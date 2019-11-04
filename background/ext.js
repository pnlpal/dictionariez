define(["jquery", "utils", "background/setting"], function($, utils, setting) {
  console.log("[ext] init");
  return {
    setBrowserIcon: function(enable) {
      var imgPath, title;
      title = 'FairyDict: 已打开鼠标取词功能';
      imgPath = 'images/books-96.png';
      if (!enable) {
        title = 'FairyDict: 已关闭鼠标取词功能';
        imgPath = 'images/books-96.png';
      }
      chrome.browserAction.setTitle({
        title: title
      });
      return chrome.browserAction.setIcon({
        path: imgPath
      });
    }
  };
});
