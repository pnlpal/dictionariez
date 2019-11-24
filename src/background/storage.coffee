import utils from "utils"
import message from "./message.coffee"

class Item
	constructor: ({ @i, @w, @s, @sc, @r, @t = Date.now() }) ->
	save: () ->
		new Promise (resolve) =>
			chrome.storage.sync.set({
				"w-#{@i}": { @i, @w, @s, @sc, @r, @t }
			}, resolve)
	update: ({w, s, sc, r, t}) ->
		@w = w if w?
		@s = s if s?
		@s = sc if sc?
		@r = r if r?
		@t = t if t?
		@save()

	@getAll: () ->
		new Promise (resolve) ->
			chrome.storage.sync.get null, (data) ->
				resolve Object.keys(data).filter((item) -> item.startsWith('w-')).map((k) -> new Item(data[k]))

	@remove: (i) ->
		new Promise (resolve) ->
			k = if Array.isArray(i) then i.map((x) -> "w-#{x}") else "w-#{i}"
			chrome.storage.sync.remove k, resolve

manager = {
	maxLength: 500,
	history: [],
	inext: 0,
	init: ()->
		@history = await Item.getAll()
		@inext = @history[@history.length - 1].i + 1 if @history.length

	getInHistory: (word) ->
		return @history.find (item) ->
			return item.w == word

	getPrevious: (w) ->
		return @history[@history.length - 1] if not w
		idx = @history.findIndex (item) ->
			return item.w == w
		return @history[idx - 1] if idx > 0


	addRating: (word, rating)->
		item = @getInHistory(word)
		if item
			await item.update {r: rating}

	addHistory: ({w, s, sc, r, t})->
		item = @getInHistory(w)
		if not item
			if @history.length >= @maxLength
				@history.shift()

			i = @inext
			item = new Item({i, w, s, sc, r, t})
			@history.push(item)
			await item.save()
			@inext += 1
		return item

	removeHistory: (ids)->
		unless Array.isArray(ids)
			ids = [ids]

		valids = []
		ids.forEach (i) =>
			idx = @history.findIndex (item) -> item.i == i
			if idx >= 0
				@history.splice(idx, 1)
				valids.push(i)

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
		console.log res
}

message.on 'history', () ->
	manager.history

message.on 'remove history', ({ i }) ->
	manager.removeHistory i

message.on 'rating', ({ text, value }) ->
	manager.addRating text, value

window.storage = manager
export default manager