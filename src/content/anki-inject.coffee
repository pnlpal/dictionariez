import $ from 'jquery'
import utils from "utils"

chrome.runtime.sendMessage {
	type: 'get anki info',
	origin: location.origin,
	url: location.href
}, (res) ->
	return unless res?.wordItem 

	if res.wordItem.sentence 
		$('.field#f0').append renderQuoteInfo res.wordItem 

	if res.lookupInfo 
		$('.field#f0').append renderLookupDefs res.lookupInfo

	$('.field#f0').append '<br><br>'

	if res.lookupInfo
		$('.field#f1').append renderLookupWords res.wordItem, res.lookupInfo
		$('.field#f1').append '<br><br>'

renderQuoteInfo = (res) ->
	sanitizedSentence = utils.sanitizeHTML res.sentence
	filteredSentence = sanitizedSentence.replaceAll res.w, "<span style='font-weight: bold'>[?]</span>"
	return '''
<blockquote style="font-style:italic;font-size: 13px; color: #555555;padding: 0.3em 5px 0.3em 20px;border-left:5px solid #78C0A8;background:#EDEDED;">
<span style="font-size: 13px;"> {sentence} </span>
<div style="margin-top: 5px;">-- <a href="{s}" style="font-size: 11px;"> {sc} </a></div>
</blockquote>
	'''.replace('{s}', res.s).replace('{sc}', res.sc).replace('{sentence}', filteredSentence)

renderLookupDefs = (res) ->
	defTpl = (def) -> "<span class='fairydict-def' style='display: inline-flex;margin-bottom: 3px;'> #{def} </span>"
	defsTpl = (defs) -> "<span class='fairydict-defs' style='display: table-cell;padding-top: 1px;'> #{defs} </span>"
	labelsTpl = (labels) -> "<div class='fairydict-labels'> #{labels} </div>"
	labelTpl = (label) -> "<span class='fairydict-label'> #{label} </span>"
	posTpl = (pos) -> "<span class='fairydict-pos' style='display: table-cell;width: 40px;padding-top: 1px;'> #{pos} </span>"
	contentTpl = (content) -> "<div class='fairydict-content' style='font-size: 14px;line-height: 14px;background: floralwhite;padding: 0 5px;'> #{content} </div>"
	pronTpl = (pron, type = '') -> "<span class='fairydict-pron' style='font-size: 13px;'> <em> #{pron} </em> </span>"
	pronAudioTpl = (src, type='') -> "<a class='fairydict-pron-audio fairydict-pron-audio-#{type}' style='font-size: 13px;' href='' data-mp3='#{src}'><i class='icon-fairydict-volume'></i></a>"
	pronSynthesisTpl = () -> "<a class='fairydict-pron-audio' href='' style='font-size: 13px;'><i class='icon-fairydict-volume'></i></a>"
	pronsTpl = (prons) -> "<div class='fairydict-prons'> #{prons} </div>"

	html = ''

	if res?.prons
		pronHtml = res.prons.reduce ((prev, cur)->
			prev += pronAudioTpl(cur.audio, cur.type) if cur.audio
			if cur.synthesis and res.w
				prev += pronSynthesisTpl()
				synthesisObj = { text: res.w, lang: cur.synthesis }

			return prev
		), ''
	html += pronsTpl pronHtml if pronHtml
	
	labelsCon = res?.labels?.map(({ name }) -> labelTpl name if name).reduce ((prev, cur) ->
		prev += cur if cur 
		return prev
	), ''

	html += labelsTpl labelsCon if labelsCon

	renderItem = (item) ->
		posHtml = ''
		defsHtml = ''

		posHtml = posTpl item.pos if item.pos 
		defs = if Array.isArray(item.def) then item.def else [item.def]
		defsCon = defs.map((def) -> defTpl def if def).reduce (prev, next) ->
			return prev + '<br>' + next if prev and next 
			return prev 
		defsHtml = defsTpl defsCon if defsCon

		html += contentTpl posHtml + defsHtml if defsHtml

	res.defs.forEach renderItem if res?.defs
	res.defs2.forEach renderItem if res?.defs2

	return html 

renderLookupWords = (wordItem, res) ->
	wTpl = (w, w2) -> "<strong class='fairydict-w'> #{w} </strong> &nbsp; <span style='font-size: 12px;'>#{w2}</span>"
	pronTpl = (pron, type = '') -> "<span class='fairydict-pron' style='font-size: 13px;'> <em> #{pron} </em> </span>"
	pronAudioTpl = (src, type='') -> "<a class='fairydict-pron-audio fairydict-pron-audio-#{type}' style='font-size: 13px;' href='' data-mp3='#{src}'><i class='icon-fairydict-volume'></i></a>"
	pronSynthesisTpl = () -> "<a class='fairydict-pron-audio' href='' style='font-size: 13px;'><i class='icon-fairydict-volume'></i></a>"
	pronsTpl = (w, prons) -> "<div class='fairydict-prons'> #{w} #{prons} </div>"

	# show w2 if the lookup word is different from the selected word.
	w2 = if wordItem.w == res.w then '' else "[#{wordItem.w}]"
	wHtml = ''
	wHtml = wTpl res.w, w2

	if res?.prons
		pronHtml = res.prons.reduce ((prev, cur)->
			prev += pronTpl(cur.symbol, cur.type) if cur.symbol 
			prev += pronAudioTpl(cur.audio, cur.type) if cur.audio
			if cur.synthesis and res.w
				prev += pronSynthesisTpl()
				synthesisObj = { text: res.w, lang: cur.synthesis }

			return prev
		), ''
		
	return pronsTpl wHtml, pronHtml if pronHtml or wHtml