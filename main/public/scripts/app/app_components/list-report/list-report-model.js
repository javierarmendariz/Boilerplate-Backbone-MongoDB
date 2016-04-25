define([
	'backbone'
	], function (Backbone) {

	var Model = Backbone.Model.extend({

		urlRoot: 'http://localhost:8080/api/customers',

		initialize: function () {
		},

		validate: function () {
		}
	});

	return Model;

});