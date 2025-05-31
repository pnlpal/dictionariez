import $ from 'jquery'
import utils from "utils"
import debounce from 'lodash/debounce'
import highlight from './editable-highlight'

import './card-iframe.coffee'
import './pnlpal-inject.coffee'
import { initCaptionzInjection } from  './captionz-inject.coffee'
import { initYtbInjection } from './ytb-inject.js'
import { initOnLoadDynamicDict } from './dynamic-dict-inject.js'
import { initAnkiInjection } from './anki-inject.coffee'
import initLookupParser from './lookup-parser.js'
import { initClipboardReader } from './read-clipboard.coffee'
import plainLookupTooltip from './plain-lookup-tooltip.js'

import {
  getWordAtPoint,
  getWordFromSelection,
  getSentenceOfSelection,
  getSentenceFromAllFrames,
  checkEditable
} from './common-text-utils.coffee'

setupStyles = () -> 
	require('./inject.less')
	# Interesting: font url is embedded, for some websites' security setting font-src,
	# it might be forbidden to load the font url.
	# but after webpack build, it not a problem any more.
	require('./inject-fontello.css')

run = () =>
	if (process.env.PRODUCT == 'Dictionariez') 
		setupStyles()
		initYtbInjection()
		initCaptionzInjection()
		initLookupParser()

	initAnkiInjection()
	initClipboardReader()

	isInDict = false

	chrome.runtime.sendMessage {
		type: 'injected',
		origin: location.origin,
		url: location.href
	}, (res) ->
		if res?.dictUrl and window.self == window.top
			# append to html rather than body.
			# some websites such as naver dict, may clear body when reload to another page. 
			# But somehow for ChatGPT, it has to append to body.
			if location.href.includes('chatgpt.com')
				$("<iframe id='dictionaries-iframe' src='#{res.dictUrl}'> </iframe>").appendTo('body')
			else
				$("<iframe id='dictionaries-iframe' src='#{res.dictUrl}'> </iframe>").appendTo('html')
				
			isInDict = true
			initOnLoadDynamicDict({ word: res.word, sentence: res.sentence, dict: res.dict, isHelpMeRefine: res.isHelpMeRefine })

		if res?.isInSidePanelDict
			isInDict = true
			initOnLoadDynamicDict({ word: res.word, sentence: res.sentence, dict: res.dict, isHelpMeRefine: res.isHelpMeRefine })
			window.top.postMessage { type: 'injectedInDict' }, '*'

		if res?.cardUrl and res.word and not location.host.includes('wikipedia.org') and window.self == window.top
			comparedLoc = decodeURI(location.href).toLowerCase()
			if res.word.split(/\s/).every (s) -> comparedLoc.includes(s.toLowerCase())
				$("<iframe class='dictionaries-card dictionaries-card-wiki' src='#{res.cardUrl}?sys=wiki' style='display: none;'> </iframe>").appendTo('body')

	chrome.runtime.sendMessage {
		type: 'setting',
	}, (setting)->
		mouseMoveTimer = null
		plainQuerying = null
		lastAutoSelection = ''

		checkExcludedSites = () ->
			for sitePattern in setting.excludedSites.split('\n')
				if sitePattern and location.href.match(new RegExp(sitePattern))
					return true
			return false
		
		return if checkExcludedSites()
		await utils.promisify($(document).ready)

		if document.body?.isContentEditable
			# If the page is editable, such as blogger's editor, disable the injection.
			# See issue #45
			return

		if process.env.PRODUCT == 'Dictionariez'
			plainLookupTooltip.init()

		if setting.enableReadClipboard
			document.addEventListener('copy', (() -> 
				sentence = getSentenceOfSelection()
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
				return if not setting.enablePlainLookup

				plainLookupTooltip.showPlainContent(null, e)
				plainQuerying = w
				utils.send 'look up plain', {
					w
				}, (res) ->
					return if plainQuerying != w
					plainLookupTooltip.renderPlainResult(res)
					plainQuerying = null
				

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
				w = getWordFromSelection()
				isInEditable = utils.isSentence(w) && checkEditable(event.target)
				sentence = getSentenceOfSelection()
				chrome.runtime.sendMessage({
					type: 'look up',
					means: 'keyboard',
					w: w,
					s: location.href,
					sc: document.title,
					sentence,
					isInEditable: isInEditable
				})
			if event.key == "Escape"
				plainLookupTooltip.hide()
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

		

		handleMouseUp = (event)->
			if isInDict
				window.top.postMessage { type: 'toggleDropdown', open: false }, '*'

			selObj = window.getSelection()
			text = selObj.getRangeAt(0)?.toString().trim() if selObj.rangeCount > 0
			unless text
				# click inside the dict
				if $('.dictionaries-tooltip').has(event.target).length
					return
				if plainQuerying # if is querying, wait for the result.
					return

				plainLookupTooltip.hide()
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

		handleLookupByMouse = (event, text)->
			return unless text
			return if text == plainQuerying
			sentence = getSentenceOfSelection()

			markWordAfterward = (lookupResult) ->
				# highlight selected words is a special feature
				# even if the floating definition is turned off, still highlight can be working.
				if lookupResult and setting.markWords and !setting.enableMarkWordsSK1
					highlight(setting.markColor)

			# popup window
			if !setting.enableMouseSK1 or (setting.mouseSK1 and utils.checkEventKey(event, setting.mouseSK1))
				chrome.runtime.sendMessage({
					type: 'look up',
					means: 'mouse',
					sentence,
					w: text,
					s: location.href,
					sc: document.title,
					isInEditable: utils.isSentence(text) && checkEditable(event.target)
				}, markWordAfterward)

			# floating definition
			text = await utils.send 'check text supported', { w: text }
			return unless text

			if setting.enablePlainLookup
				if !setting.enablePlainSK1 or utils.checkEventKey(event, setting.plainSK1)
					plainLookupTooltip.showPlainContent(null, event)
					plainQuerying = text

					isOk = await utils.send 'look up plain', {
						means: 'mouse',
						sentence,
						w: text,
						s: location.href,
						sc: document.title
					},  (res) ->
						return if plainQuerying != text
						plainLookupTooltip.renderPlainResult(res)
						plainQuerying = null
						markWordAfterward(res)

		utils.listenToBackground 'get info before open dict', (request, sender, sendResponse) =>
			word = getWordFromSelection(true)
			isInEditable = utils.isSentence(word) && checkEditable(window.getSelection().focusNode)
			sentence = getSentenceFromAllFrames()

			sendResponse({
				w: word,
				s: location.href,
				sc: document.title,
				sentence: sentence,
				isInEditable: isInEditable,
				screen: {
					width: screen.width,
					height: screen.height,
					availLeft: screen.availLeft,
					availTop: screen.availTop
				}
			})

if !window.dictionariezInjected 
	run()
	window.dictionariezInjected = true

