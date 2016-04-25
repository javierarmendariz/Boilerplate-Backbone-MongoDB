"use strict";
define([
	'backbone',
	'router',
	], function (Backbone, Router) {

	var View = Backbone.View.extend({

		initialize: function () {
			console.log('Customer details View creating....');
		}

	});

	return View;

});