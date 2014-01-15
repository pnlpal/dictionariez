// #######################################################################
//  Copyright (C) 2013 revir.qing@gmail.com
// 
//  This program is free software; you can redistribute it and/or modify
//  it under the terms of the GNU General Public License as published by
//  the Free Software Foundation; either version 2, or (at your option)
//  any later version.
// 
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.
// 
//  You should have received a copy of the GNU General Public License
//  along with this program; if not, write to the Free Software Foundation,
//  Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.  
//  
//  Author: Revir Qing (aguidetoshanghai.com)
//  URL: www.aguidetoshanghai.com

//wait for some ajax content on the page to finish loading, then run the process.
function waitForAjax(selector, context, process, time) {
	var interval = 1000; //ms
	var timeOut = time || 10000; //ms
	var id = 0,
		el = [];
	var doPage = function() {
		console.log('waitForAjax...');
		timeOut -= interval;
		el = jQuery(selector, context);
		if (el.length >= 1 || timeOut <= 0) {
			window.clearInterval(id);
			process(timeOut > 0);
		}
	};

	id = window.setInterval(doPage, interval);
}

function autoKeypress(element) {
	var e = new KeyboardEvent('KeyboardEvent');
	e.initKeyboardEvent('keypress');
	element.dispatchEvent(e);
}