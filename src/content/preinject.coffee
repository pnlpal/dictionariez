chrome.runtime.sendMessage {
	type: 'injected',
	preinject: true,
	origin: location.origin,
	url: location.href
}, (res) ->
	if res?.dictUrl
		if res.dict?.resources?.styles?
			for style in res.dict.resources.styles
				require("./css/#{style}")
		if res.dict?.css
			style = document.createElement('style')
			style.innerHTML = res.dict.css
			document.head.appendChild(style)

		require('./scrollbar.less')