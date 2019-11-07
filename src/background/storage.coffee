import utils from "utils"

class Item
	constructor: ({ @w, @s, @r, @t = Date.now() }) ->
	save: () ->
		new Promise (resolve) =>
			chrome.storage.sync.set({
				"w-#{@w}": { @w, @s, @r, @t }
			}, resolve)
	update: ({w, s, r, t}) ->
		@w = w if w?
		@s = s if s?
		@r = r if r?
		@t = t if t?
		@save()

	@getByWord: (w) ->
		new Promise (resolve) ->
			chrome.storage.sync.get "w-#{w}", (data) ->
				resolve(new Item(data["w-#{w}"]))

	@getAll: () ->
		new Promise (resolve) ->
			chrome.storage.sync.get null, (data) ->
				resolve Object.keys(data).filter((item) -> item.startsWith('w-')).map((k) -> new Item(data[k]))

	@delete: (w) ->
		new Promise (resolve) ->
			chrome.storage.sync.remove "w-#{w}", resolve

export default {
	maxLength: 200,
	history: [],
	init: ()->
		@history = await Item.getAll()

	getInHistory: (word)->
		return @history.find (item)->
			return item.w == word

	addRating: (word, rating)->
		item = @getInHistory(word)
		if item
			await item.update {r: rating}

	addHistory: ({w, s, r, t})->
		if not @getInHistory(w)
			if @history.length >= @maxLength
				@history.shift()
			item = new Item({w, s, r, t})
			@history.push(item)
			item.save()

	deleteHistory: (word)->
		idx = @history.findIndex (item)->
			return item.w == word
		if idx >= 0
			@history.splice(idx, 1)
			await Item.delete(word)
}