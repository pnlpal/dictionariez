/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
chrome.runtime.sendMessage({
	type: 'injected',
	preinject: true,
	origin: location.origin,
	url: location.href
}, function(res) {
	if (res?.dictUrl || res?.isInSidePanelDict) {
		let style;
		if (res.dict?.resources?.styles != null) {
			for (style of res.dict.resources.styles) {
				require(`./css/${style}`);
			}
		}
		if (res.dict?.css) {
			style = document.createElement('style');
			style.innerHTML = res.dict.css;
			document.head.appendChild(style);
		}

		return require('./scrollbar.less');
	}
});