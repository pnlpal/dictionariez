import $ from 'jquery'
import utils from "utils"
import debounce from 'lodash/debounce'

import './pnlpal-inject.coffee'
import { initOnLoadDynamicDict } from './dynamic-dict-inject.js'
import {
  getSentenceFromSelection
} from 'get-selection-more'
# import { initAnkiInjection } from './anki-inject.coffee'
import { initClipboardReader } from './read-clipboard.coffee'

run = () =>
	# initAnkiInjection()
	initClipboardReader()
	
	isInDict = false

	chrome.runtime.sendMessage {
		type: 'injected',
		origin: location.origin,
		url: location.href
	}, (res) ->
		# console.log "injected response", res
		if res?.isInDict
			isInDict = true
			initOnLoadDynamicDict({ word: res.word, sentence: res.sentence, dict: res.dict }, $)
			window.top.postMessage { type: 'injectedInDict' }, '*'

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
			if setting.enableSelectionOnMouseMove
				if !setting.enableSelectionSK1 or utils.checkEventKey(e, setting.selectionSK1)
					handleSelectionWord(e)

			), 200

		# 对 mouseup 事件做一个延时处理，
		# 	# 以避免取消选中后getSelection依然能获得文字。
		$(document).on 'mouseup', debounce(((e) -> handleMouseUp(e)), 100, {leading: true})
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


		handleLookupByMouse = (event, text)->
			return unless text

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


	utils.listenToBackground 'get info before open dict', (request, sender, sendResponse)->
		try 
			sentence = getSentenceOfSelection()
		catch
			sentence = null
		
		word = window.getSelection().toString().trim()
		word = '' if word.split(/\s/).length > 3

		console.log "get info before open dict", word, sentence, window

		sendResponse({
			w: word,
			s: location.href,
			sc: document.title,
			sentence: sentence,
			screen: {
				width: screen.width,
				height: screen.height,
				availLeft: screen.availLeft,
				availTop: screen.availTop
			}
		})

if !window.sidePalInjected 
	run()
	window.sidePalInjected = true

