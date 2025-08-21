import $ from 'jquery'

import './card-iframe.less'

setupCardsPosition = () ->
	hasMax = $('iframe.dictionaries-card:visible').length != $('iframe.dictionaries-card-minimal:visible').length 

	maxiCount = 0
	miniCount = 0
	$('iframe.dictionaries-card:visible').each (i, el) ->
		if ($(el).hasClass('dictionaries-card-minimal'))
			miniCount += 1
			el.style.right = '10px';

			bottom = 44*(miniCount - 1) + 20
			if hasMax
				bottom += 220
			
			el.style.bottom = "#{bottom}px"
		else 
			maxiCount += 1
			el.style.bottom = '1px'
			
			right = 201*(maxiCount - 1) + 1
			el.style.right = "#{right}px"

window.addEventListener "message", ((event) ->
	# chrome-extension or moz-extension
	if event?.data?.type 
		if event.data.type == 'toggleDropdown'
			if event.data.open
				$('#dictionaries-iframe').addClass('dropdown-open')
			else 
				$('#dictionaries-iframe').removeClass('dropdown-open')
		else if event.data.type == 'close-card'
			$('.dictionaries-card-'+event.data.sys).hide()
		else if event.data.type == 'show-card'
			$('.dictionaries-card-'+event.data.sys).show()
			if event.data.minimal
				$('.dictionaries-card-'+event.data.sys).addClass('dictionaries-card-minimal')
			else 
				$('.dictionaries-card-'+event.data.sys).removeClass('dictionaries-card-minimal')

			setupCardsPosition()

), false