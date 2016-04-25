'strict mode'
define(['backbone'], function (Backbone) {

	var Model = Backbone.Model.extend({

		urlRoot: 'http://localhost:8080/api/login',

		initialize: function (attrs) {
			var username = attrs.username;
			var password = attrs.password;
			this.urlRoot += '?username=' + username + '&password=' + password;
		},

		validate: function (attrs, options) {
			console.log('Validate in Model---------------');
		}

	});

	return Model;
});