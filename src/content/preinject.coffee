chrome.runtime.sendMessage {
	type: 'injected',
	origin: location.origin,
	url: location.href
}, (res) ->
	if res?.dictUrl
		if res.dict?.resources?.styles?
			for style in res.dict.resources.styles
				require("./css/#{style}")
		
		require('./scrollbar.less')