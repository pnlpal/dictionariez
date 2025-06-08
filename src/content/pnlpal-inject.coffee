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

	pid = $(contentNode).closest('[component="post"]').data('pid')
	dict.troveUrl = "#{location.origin}/post/#{pid}" if pid

	await utils.send 'dictionary-add', { dict }
	await utils.send 'look up', dict

if location.host == 'pnlpal.dev' or location.host == 'pnl.dev' or location.host == "localhost:4567"
	if (process.env.PRODUCT != 'Dictionariez')
		$('body').attr("data-#{process.env.PRODUCT.toLowerCase()}-version", chrome.runtime.getManifest().version)
		$('.add-to-dictionariez').text("Add to #{process.env.PRODUCT}")
	else
		$('body').attr('data-dictionariez-version', chrome.runtime.getManifest().version)

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
			addDictByParseContent($(this).closest('.content, .preview')).then (() => 
				$(this).text('Added!')
				$(this).removeClass('disabled')), ((err) => 
					alert("Your content has error: " + err.message);
					console.error("Your content has error: ");
					console.error(err);
				)

		return false
