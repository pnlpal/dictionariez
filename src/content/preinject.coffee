chrome.runtime.sendMessage {
	type: 'injected',
	preinject: true,
	origin: location.origin,
	url: location.href
}, (res) ->
	# console.log "preinjected", res
	if res?.isInDict
		if res.dict?.resources?.styles?
			for style in res.dict.resources.styles
				require("./css/#{style}")
		
		require('./scrollbar.less')