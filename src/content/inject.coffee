import $ from 'jquery'
import utils from "utils"

import "./inject.less"

# Interesting: font url is embedded, for some websites' security setting font-src,
# it might be forbidden to load the font url.
# but after webpack build, it not a problem any more.
import "./inject-fontello.css"

import debounce from 'lodash/debounce'

import highlight from './editable-highlight'

import './anki-inject.coffee'
import './card-iframe.coffee'
import './pnlpal-inject.coffee'
import './captionz-inject.coffee'
import { initOnLoadDynamicDict } from './dynamic-dict-inject.js'
import {
  getSentenceFromSelection
} from 'get-selection-more'

isInDict = false

chrome.runtime.sendMessage {
	type: 'injected',
	origin: location.origin,
	url: location.href
}, (res) ->
	if res?.dictUrl and window.self == window.top
		# append to html rather than body.
		# some websites such as naver dict, may clear body when reload to another page. 
		$("<iframe id='dictionaries-iframe' src='#{res.dictUrl}'> </iframe>").appendTo('html')
		isInDict = true
		initOnLoadDynamicDict({ word: res.word, sentence: res.sentence, dict: res.dict }, $)

	if res?.cardUrl and res.word and not location.host.includes('wikipedia.org')
		comparedLoc = decodeURI(location.href).toLowerCase()
		if res.word.split(/\s/).every (s) -> comparedLoc.includes(s.toLowerCase())
			$("<iframe class='dictionaries-card dictionaries-card-wiki' src='#{res.cardUrl}?sys=wiki' style='display: none;'> </iframe>").appendTo('body')

chrome.runtime.sendMessage {
	type: 'setting',
}, (setting)->
	mouseMoveTimer = null
	plainQuerying = null
	lastAutoSelection = ''

	await utils.promisify($(document).ready)

	if document.body.isContentEditable
		# If the page is editable, such as blogger's editor, disable the injection.
		# See issue #45
		return

	$('''
		<div class="dictionaries-tooltip">
			<div class="fairydict-spinner">
			<div class="fairydict-bounce1"></div>
			<div class="fairydict-bounce2"></div>
			<div class="fairydict-bounce3"></div>
			</div>
			<div class="dictionaries-tooltip-content">
			</div>
		</div>
			''').appendTo('body')

	setupPlainContentPosition = (e) ->
		$el = $('.dictionaries-tooltip')
		if e.pageX && e.pageY
			pageX = e.pageX
			pageY = e.pageY
		else 
			pageX = e.changedTouches?[0].pageX
			pageY = e.changedTouches?[0].pageY

		if $el.length and pageY
			mousex = pageX + 20
			mousey = pageY + 10
			top = mousey
			left = mousex

			# console.log e
			# console.log top, left, window.innerHeight, window.innerWidth

			# bugfix: here we can't use document.body.getBoundingClientRect()
			# because some websites are not using body to scroll, thus there body rect is 0.
			# for example: https://www.wired.com/story/russias-disinformation-war-is-just-getting-started/
			rect = window.document.scrollingElement.getBoundingClientRect()
			domW = window.innerWidth - rect.left
			domH = window.innerHeight - rect.top

			if domW - left < 300
				left = domW - 300
			if domH - top < 200
				top = domH - 200

			$el.css({ top, left })
	
	if setting.enableReadClipboard
		document.addEventListener('copy', (() -> 
			try 
				sentence = getSentenceOfSelection()
			catch
				sentence = null

			utils.send('copy event triggered', {
				sentence,
				s: location.href,
				sc: document.title
			})
		), true) 

	$(document).mousemove debounce ((e) ->
		if $(e.target).hasClass('dictionariez-w')
			w = $(e.target).data('w') || $(e.target).text()
			w = w.trim()
			return if w == plainQuerying

			$('.dictionaries-tooltip').fadeIn('slow')
			$('.dictionaries-tooltip .fairydict-spinner').show()
			$('.dictionaries-tooltip .dictionaries-tooltip-content').empty()

			setupPlainContentPosition(e)

			plainQuerying = w

			utils.send 'look up plain', {
				w
			}, (res) ->
				handlePlainResult(res)

		else
			if setting.enableSelectionOnMouseMove
				if !setting.enableSelectionSK1 or utils.checkEventKey(e, setting.selectionSK1)
					handleSelectionWord(e)

		), 200

	# 对 mouseup 事件做一个延时处理，
	# 	# 以避免取消选中后getSelection依然能获得文字。
	$(document).on 'mouseup', debounce(((e) -> handleMouseUp(e)), 100)
	$(document).on 'touchstart', debounce(((e) -> 
		try 
			await utils.checkInTime (() -> window.getSelection()?.getRangeAt(0)?.toString()), 3000
			handleMouseUp(e)
		catch
	), 800)
	
	$(document).bind 'keydown', (event)->
		if utils.checkEventKey event, setting.openSK1, setting.openSK2, setting.openKey
			try 
				sentence = getSentenceOfSelection()
			catch
				sentence = null
			chrome.runtime.sendMessage({
				type: 'look up',
				means: 'keyboard',
				w: window.getSelection().toString().trim(),
				s: location.href,
				sc: document.title,
				sentence,
			})
		if event.key == "Escape"
			$('.dictionaries-tooltip').fadeOut().hide()
			plainQuerying = null

			if isInDict
				utils.sendToDict 'keypress focus'

		if utils.checkEventKey event, setting.openOptionSK1, setting.openOptionSK2, setting.openOptionKey
			utils.send 'open options'
			return false
		
		if setting.markWords 
			if setting.enableMarkWordsSK1 and utils.checkEventKey(event, setting.markWordsSK1, null, setting.markWordsKey)
				highlight(setting.markColor) 

		if isInDict
			if utils.checkEventKey event, setting.prevHistorySK1, null, setting.prevHistoryKey
				chrome.runtime.sendMessage({
					type: 'query',
					previousWord: true
				})
				return false

			if utils.checkEventKey event, setting.nextHistorySK1, null, setting.nextHistoryKey
				chrome.runtime.sendMessage({
					type: 'query',
					nextWord: true
				})
				return false
			if utils.checkEventKey event, setting.prevDictSK1, null, setting.prevDictKey
				chrome.runtime.sendMessage({
					type: 'query',
					previousDict: true
				})
				return false
			if utils.checkEventKey event, setting.nextDictSK1, null, setting.nextDictKey
				chrome.runtime.sendMessage({
					type: 'query',
					nextDict: true
				})
				return false
			if (event.ctrlKey or event.metaKey) and event.key.match(/\d/)
				chrome.runtime.sendMessage({
					type: 'query',
					dictNumber: parseInt(event.key.match(/\d/)[0])
				})
				return false 


	$(document).on 'click mouseover', '.fairydict-pron-audio', debounce(((e) ->
		e.stopPropagation()

		return if utils.isMobile() and e.type == 'mouseover'  # on mobile mouseover will be triggered when click.

		synthesisObj = null

		if $(this).data('mp3')
			utils.send 'play audios', { otherSrc: $(this).data('mp3') }

		else if $(this).data('synthesis') 
			synthesisObj = {
				text: $(this).data('w'),
				lang: $(this).data('synthesis')
			}
			utils.send 'play audios', { synthesisObj }
		
		else if $(this).hasClass('for-chatgpt-audio')
			synthesisObj = {
				text: $(this).parent().text(),
				lang: 'en-US'
			}
			utils.send 'play audios', { synthesisObj }

		return false
	), 1000, {leading: true})

	handleSelectionWord = (e)->
		selObj = window.getSelection()
		return if checkEditable(selObj.focusNode)

		word = selObj.toString().trim()
		
		# filter last auto selection word, let choose another word.
		if word == lastAutoSelection
			word = getWordAtPoint(e.target, e.clientX, e.clientY)
			lastAutoSelection = word
		else
			lastAutoSelection = ''

		if word
			handleLookupByMouse(e, word)

	getWordAtPoint = (elem, x, y)->
		if elem.nodeType == elem.TEXT_NODE
			range = elem.ownerDocument.createRange()
			range.selectNodeContents(elem)
			currentPos = 0
			endPos = range.endOffset
			while currentPos < endPos
				range.setStart(elem, currentPos)
				range.setEnd(elem, currentPos+1)
				if range.getBoundingClientRect().left <= x && range.getBoundingClientRect().right >= x &&
				range.getBoundingClientRect().top <= y && range.getBoundingClientRect().bottom >= y
					range.detach()
					sel = window.getSelection()
					sel.removeAllRanges()
					sel.addRange(range)
					sel.modify("move", "backward", "word")
					sel.collapseToStart()
					sel.modify("extend", "forward", "word")
					return sel.toString().trim()

				currentPos += 1
		else
			for el in elem.childNodes
				range = el.ownerDocument.createRange()
				range.selectNodeContents(el)
				react = range.getBoundingClientRect()
				if react.left <= x && react.right >= x && react.top <= y && react.bottom >= y
					range.detach()
					return getWordAtPoint el, x, y
				else
					range.detach()
		return
	
	getSentenceOfSelection = () ->
		selection = window.getSelection()
		try
			range = selection.getRangeAt(0)

			range1 = range.cloneRange()
			range1.detach()

			selection.modify('move', 'backward', 'sentence')
			selection.modify('extend', 'forward', 'sentence')

			text = selection.toString().trim()

			selection.removeAllRanges()
			selection.addRange(range1)

			return text
		catch  # Gecko does not implement "sentence" yet
			return getSentenceFromSelection(selection)

	checkEditable = (curNode) ->
		while curNode 
			if curNode.isContentEditable or ["input", "textarea"].includes(curNode.nodeName.toLowerCase())
				return true
			curNode = curNode.parentElement

	handleMouseUp = (event)->
		if isInDict
			window.top.postMessage { type: 'toggleDropdown', open: false }, '*'

		selObj = window.getSelection()
		text = selObj.getRangeAt(0)?.toString().trim() if selObj.rangeCount > 0
		unless text
			# click inside the dict
			if $('.dictionaries-tooltip').has(event.target).length
				return

			$('.dictionaries-tooltip').fadeOut().hide()
			plainQuerying = null
			return

		# issue #4
		# check if mouse is at the same position of the selected text
		including = $(event.target).has(selObj.focusNode).length or $(event.target).is(selObj.focusNode)
		# on Firefox, the focusNode might be exactly adjoining the click target.
		if not including 
			including = $(event.target).has(selObj.focusNode.previousElementSibling).length or $(event.target).is(selObj.focusNode.previousElementSibling)
		return if not including
		
		# check if click in editable element
		return if checkEditable(selObj.focusNode)

		if event.which == 0 or event.which == 1 # left mouse or touchend
			handleLookupByMouse(event, text)

	renderQueryResult = (res) ->
		wTpl = (w) -> "<strong class='fairydict-w'> #{w} </strong>"
		defTpl = (def) -> "<span class='fairydict-def'> #{def} </span>"
		defsTpl = (defs) -> "<span class='fairydict-defs'> #{defs} </span>"
		labelsTpl = (labels) -> "<div class='fairydict-labels'> #{labels} </div>"
		labelTpl = (label) -> "<span class='fairydict-label'> #{label} </span>"
		posTpl = (pos) -> "<span class='fairydict-pos'> #{pos} </span>"
		contentTpl = (content) -> "<div class='fairydict-content'> #{content} </div>"
		pronSymbolTpl = (symbol='', type='') -> "<span class='fairydict-symbol fairydict-symbol-#{type}'> <em> #{symbol} </em> </span>"
		pronAudioTpl = (w, src='', type='', synthesis='') -> "<a class='fairydict-pron-audio fairydict-pron-audio-#{type}' href='javascript:void(0)' data-mp3='#{src}' data-synthesis='#{synthesis}' data-w='#{w}'><i class='icon-fairydict-volume'></i></a>"
		pronsTpl = (w, prons) -> "<div class='fairydict-prons'> #{w} #{prons} </div>"

		# console.log res 

		html = ''

		wHtml = ''
		pronHtml = ''
		if res?.w
			wHtml = wTpl res.w

			if res?.prons
				pronHtml = res.prons.reduce ((prev, cur)->
					if cur.synthesis or cur.audio or cur.symbol
						prev += pronSymbolTpl(cur.symbol, cur.type)
						prev += pronAudioTpl(res.w, cur.audio, cur.type, cur.synthesis) if cur.synthesis or cur.audio
					return prev
				), ''
		
		html += pronsTpl wHtml, pronHtml if pronHtml or wHtml
		
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
			defsCon = defs.map((def, i) -> 
				if def
					if defs.length == 1
						return defTpl def 
					else 
						return defTpl("#{i+1}. #{def}")
				return ""
			).reduce (prev, next) ->
				return prev + '<br>' + next if next 
				return prev 
			defsHtml = defsTpl defsCon if defsCon

			html += contentTpl posHtml + defsHtml if defsHtml

		res.defs.forEach renderItem if res?.defs
		res.defs2.forEach renderItem if res?.defs2
		return html

	getEnglishPronSymbol = (w) ->
		res = await utils.send 'get english pron symbol', { w }
		if res?.prons
			for item in res.prons 
				if item.type == 'ame' and item.symbol 
					$('.dictionaries-tooltip .fairydict-symbol-ame em').text(item.symbol)
				if item.type == 'bre' and item.symbol
					$('.dictionaries-tooltip .fairydict-symbol-bre em').text(item.symbol)
				$('.dictionaries-tooltip .fairydict-symbol-unknow').hide()

	getEnglishPronAudio = (w) ->
		res = await utils.send 'get real person voice', { w }
		if res?.prons
			ameSrc = ''
			breSrc = ''
			for item in res.prons 
				if item.type == 'ame' and item.audio 
					ameSrc = item.audio 
					$('.dictionaries-tooltip .fairydict-pron-audio-ame').attr('data-mp3', ameSrc)
				if item.type == 'bre' and item.audio
					breSrc = item.audio
					$('.dictionaries-tooltip .fairydict-pron-audio-bre').attr('data-mp3', breSrc)

			utils.send 'play audios', { ameSrc, breSrc, checkSetting: true}
	
	handlePlainResult = (res) ->
		html = ''
		res = if Array.isArray(res) then res else [res]
		for item in res 
			html += renderQueryResult item
	
			if item?.prons?.length and item.w

				if item.prons.some (v)->['US', 'UK'].includes(v.symbol)
					getEnglishPronSymbol item.w 

				if item.prons.some (v)->['bre', 'ame'].includes(v.type) 
					getEnglishPronAudio item.w 
		
		if html 
			$('.dictionaries-tooltip').fadeIn('slow')
			$('.dictionaries-tooltip .fairydict-spinner').hide()
			$('.dictionaries-tooltip .dictionaries-tooltip-content').append(html)
		else 
			plainQuerying = null
			$('.dictionaries-tooltip').fadeOut().hide()

		return html

	handleLookupByMouse = (event, text)->
		return unless text
		return if text.split(/\s/).length > 3

		try 
			sentence = getSentenceOfSelection()
		catch
			sentence = null

		# popup window
		if !setting.enableMouseSK1 or (setting.mouseSK1 and utils.checkEventKey(event, setting.mouseSK1))
			chrome.runtime.sendMessage({
				type: 'look up',
				means: 'mouse',
				sentence,
				w: text,
				s: location.href,
				sc: document.title
			})

		# floating definition
		text = await utils.send 'check text supported', { w: text }
		return unless text

		# highlight selected words is a special feature
		# even if the floating definition is turned off, still highlight can be working.
		if setting.markWords and !setting.enableMarkWordsSK1
				highlight(setting.markColor) 

		if setting.enablePlainLookup && text != plainQuerying
			if !setting.enablePlainSK1 or utils.checkEventKey(event, setting.plainSK1)
				clickInside = $('.dictionaries-tooltip').has(event.target).length

				$('.dictionaries-tooltip').fadeIn('slow')
				$('.dictionaries-tooltip .fairydict-spinner').show()
				$('.dictionaries-tooltip .dictionaries-tooltip-content').empty()

				unless clickInside
					setupPlainContentPosition(event)

				plainQuerying = text

				isOk = await utils.send 'look up plain', {
					means: 'mouse',
					sentence,
					w: text,
					s: location.href,
					sc: document.title
				},  handlePlainResult

		
