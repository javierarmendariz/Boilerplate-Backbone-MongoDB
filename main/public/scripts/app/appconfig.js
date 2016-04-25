"use strict";
define([], function () {

	var appConfigurations = function (options) {

		// Underscore Template delimiters (Mustachejs style)
		_.templateSettings = {
		  interpolate: /\{\{(.+?)\}\}/g
		};

		// Ajax
		$.ajaxSetup({
			xhrFields: {
				withCredentials: true
			}
		});

		// Link
		$(document).on('click', 'a', function (event) {
			event.preventDefault();
			var router = options.router;
			var element = event.target || event.srcElement;
			var url = $(element).attr('href');
			router.navigate(url, {trigger: true});
		});

	};

	return appConfigurations;

});
