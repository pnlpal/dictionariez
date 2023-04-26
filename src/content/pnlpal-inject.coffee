import $ from 'jquery'
import utils from "utils"

addDictByTopic = (tid) ->
	topic = await $.get("#{location.origin}/api/topic/#{tid}").catch(console.error)
	json = $(topic.posts[0].content).find('code.language-json').text()
	json = $(topic.posts[0].content).find('code').text() if not json

	dict = JSON.parse(json)
	dict.dictName ?= topic.title 
	dict.homepageUrl = topic.externalLink 
	dict.troveUrl = "#{location.origin}#{topic.url}"
	await utils.send 'dictionary-add', { dict }
	await utils.send 'look up', dict

addDictByParseContent = (contentNode) ->
	json = $(contentNode).find('code.language-json').text()
	json = $(contentNode).find('code').text() if not json

	dict = JSON.parse(json)
	dict.troveUrl = "#{location.origin}#{topic.url}"
	await utils.send 'dictionary-add', { dict }
	await utils.send 'look up', dict

if location.host == 'pnlpal.dev' or location.host == "localhost:4567"
	$(document).on 'click', '.add-to-dictionariez', () -> 
		$(this).text('waiting...')
		$(this).addClass('disabled')

		if $(this).data('tid')
			addDictByTopic($(this).data('tid')).then (() => 
				$(this).text('Added!')
				$(this).removeClass('disabled')), ((err) => 
					alert("Your json format has error: " + err.message);
					console.error("Your json format has error: ");
					console.error(err);
				)
		else 
			addDictByParseContent($(this).closest('.content')).then (() => 
				$(this).text('Added!')
				$(this).removeClass('disabled')), ((err) => 
					alert("Your content has error: " + err.message);
					console.error("Your content has error: ");
					console.error(err);
				)

		return false
