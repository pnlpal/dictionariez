import message from "./message.coffee"
import setting from "./setting.coffee"

class Item
	constructor: ({ @w, @s, @sc, @r, @t = Date.now(), @sentence, @ankiSaved}) ->
	save: () ->
		new Promise (resolve) =>
			chrome.storage.sync.set({
				"w-#{@w}": { @w, @s, @sc, @r, @t, @sentence, @ankiSaved }
			}, resolve)
	update: ({w, s, sc, r, t, sentence, ankiSaved}) ->
		@w = w if w?
		@s = s if s?
		@s = sc if sc?
		@r = r if r?
		@t = t if t?
		@sentence = sentence if sentence?
		@ankiSaved = ankiSaved if ankiSaved?
		@save()

	remove: () ->
		new Promise (resolve) =>
			chrome.storage.sync.remove "w-#{@w}", resolve

	@getAll: () ->
		new Promise (resolve) ->
			chrome.storage.sync.get null, (data) ->
				resolve Object.keys(data).filter((item) -> item.startsWith('w-')).
				map((k) -> new Item(data[k])).
				sort((x, y) -> x.t - y.t)


	@remove: (w) ->
		new Promise (resolve) ->
			k = if Array.isArray(w) then w.map((x) -> "w-#{x}") else "w-#{w}"
			chrome.storage.sync.remove k, resolve

export default {
	maxLength: 500,
	history: [],
	init: ()->
		@history = await Item.getAll()

		message.on 'history', () =>
			@history

		message.on 'remove history', ({ w }) =>
			@removeHistory w

		message.on 'rating', ({ text, value }) =>
			@addRating text, value

	getInHistory: (word) ->
		return @history.find (item) ->
			return item.w == word

	getPrevious: (w) ->
		return if setting.getValue "disableWordHistory"
		idx = @history.findIndex (item) ->
			return item.w == w
		return @history[idx - 1] if idx > 0
		return @history[@history.length - 1]

	getHistory: (w, length) ->
		end = @history.length

		if length
			begin = end - length 
			if begin < 0
				begin = 0
		
		return @history.slice(begin, end)


	getNext: (w, circle = false) ->
		idx = @history.findIndex (item) ->
			return item.w == w
		return @history[idx + 1] if idx < @history.length - 1
		return @history[0] if circle or !w

	getRating: (word) ->
		@getInHistory(word)?.r

	addRating: (word, rating)->
		item = @getInHistory(word)
		if item
			await item.update {r: rating}
	savedAnki: (word, saved = true)->
		item = @getInHistory(word)
		if item
			await item.update {ankiSaved: saved}
	getPreviousAnkiUnsaved: (w) ->
		return if setting.getValue "disableWordHistory"
		idx = @history.findIndex (item) ->
			return item.w == w
		idx ?= [@history.length - 1] 

		while idx > 0
			idx -= 1 
			item = @history[idx]
			if not item.ankiSaved
				return item 

	addHistory: ({w, s, sc, r, t, sentence})->
		return if setting.getValue "disableWordHistory"
		item = @getInHistory(w)
		if not item
			if @history.length >= @maxLength
				@history.shift()

			item = new Item({w, s, sc, r, t, sentence})
			@history.push(item)
			await item.save()
		return item

	removeHistory: (words)->
		unless Array.isArray(words)
			words = [words]

		valids = []
		words.forEach (w) =>
			idx = @history.findIndex (item) -> item.w == w
			if idx >= 0
				@history.splice(idx, 1)
				valids.push(w)

		await Item.remove(valids) if valids.length

	clearAll: () ->
		new Promise (resolve) ->
			chrome.storage.sync.clear resolve

	set: (data) ->
		new Promise (resolve) ->
			chrome.storage.sync.set(data, resolve)
	get: (k, defaultValue) ->
		new Promise (resolve) ->
			chrome.storage.sync.get k, (data) ->
				resolve(if data[k]? then data[k] else defaultValue)
	remove: (k) ->
		new Promise (resolve) ->
			chrome.storage.sync.remove k, resolve

	cget: (k, defaultValue) ->
		res = await @get(k, defaultValue)
		# console.log res

	getAllByK: (k) ->
		new Promise (resolve) ->
			chrome.storage.sync.get null, (data) ->
				resolve Object.keys(data).filter((item) -> item.startsWith(k)).
				map((n) -> data[n])

	setAllByK: (k, key, list) ->
		Promise.all list.map (n)=> 
			v = n[key]
			if v 
				res = {}
				res[k + v] = n 
				return @set res 

}