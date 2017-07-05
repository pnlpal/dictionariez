*7月5日更新：增强快速查词体验，增加了一个设置项，点击图标可以打开查词典的窗口了。*

*6月28日更新：新增快速查词功能，选中单词后在鼠标附近显示词义。可设置开关。*

*5月5日更新： 重新排好了Toolbar上的元素，布局更整洁了。金山词霸替换成了网页版。*

*5月2日更新: 已添加大量常见的在线词典，包括欧陆词典, Longman, Oxford, Cambridge, Merriam-webster, Collins, Macmilland 等等。还增加了一个设置： 鼠标取词时可以选择必须按住一个按键(Ctrl, Shift, Alt 等)。*


# Fairy Dict

查词典的 chrome extension, 方便中国人阅读英文网站，我自己每天都依赖它，功能和使用体验上我尽量做得更好， 欢迎大家提供反馈。

# 安装地址

* [chrome web store](https://chrome.google.com/webstore/detail/fairydict/gpdpcfgfmgkmljmhhnedefdaadgehaah)
* [本地下载](https://github.com/revir/FairyDict/raw/master/build/fairy-dict.crx)

# Feature

* 支持多种词典，金山词霸、海词、必应，Urban, Dictionary.com, Longman, Oxford, Cambridge, Merriam-webster, Collins, Macmilland 等几乎所有的在线词典；理论上可以支持所有在线词典；
* 支持鼠标取词、键盘快捷键查词、鼠标右键查词等查询方式；
* 支持快速查词功能，选中单词后在鼠标附近显示词义；
* 历史记录保存，自动同步；
* 窗口大小可自动记忆；

# TODO

* 支持更多词典，目前通过请求网页的方式可以支持几乎所有在线词典，还可以添加 Google，Bing 等翻译；
* 目前的历史记录最多仅保存200个，受限于 chrome storage 的容量限制，如需保存更多，需要搭建服务器，或者保存至有道等网站的生词本里；
* 卡片式单词记忆；

# FAQ

1. 怎样鼠标取词？
在 Chrome 浏览器上，用鼠标双击选中单词，或按住左键拖动选择一段，等你鼠标松开后(触发了 mouseup event)才会查询。

2. 安装后怎么没有反应？
安装后必须刷新一下页面才可以取词，一般来说 Chrome extension 都这样。但无需重启浏览器。
有极少数网站可能无法用鼠标或快捷键取词，可以试试鼠标右键。
更改了快捷键设置后页面也需要刷新一下才会生效。

3. 弹窗太烦了，可以关闭吗？
点击 FairyDict 的图标（一般在浏览器右上角处）即可 打开/关闭 鼠标取词， 还可以在选项里设置必须按住一个功能键才能鼠标取词。默认安装后鼠标取词是开的。

4. 窗口太大了，可以小一点吗？
窗口大小可以拖动，改变大小后，只要你再查一个单词，这个设置就记住了，请不要问为什么还要“再查一个单词”哦 ~

5. 360，腾讯，搜狗浏览器可以安装吗？
只要是 Chromium 内核的浏览器，通过[本地下载](https://github.com/revir/FairyDict/raw/master/build/fairy-dict.crx) CRX 文件，拖到浏览器的扩展页面里，应该是可以用的，如果不能用，请向我反馈。

6. 能支持我喜欢的**词典吗？
告诉我词典名字，只要网上有 Web 版就能加进来。


# Screenshot
![Alt text](https://github.com/revir/FairyDict/raw/master/readme_images/5.png)
![Alt text](https://github.com/revir/FairyDict/raw/master/readme_images/4.png)
![Alt text](https://github.com/revir/FairyDict/raw/master/readme_images/3.png)
![Alt text](https://github.com/revir/FairyDict/raw/master/readme_images/2.png)
