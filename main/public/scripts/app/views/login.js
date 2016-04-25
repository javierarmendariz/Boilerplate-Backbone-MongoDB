"use strict";
define([
	'backbone',
	'text!/templates/views/login.html',
	'less!/css/styles.less',
	'../models/login',
	'router'
	], function (Backbone, Template, Less, Model, Router) {

	var View = Backbone.View.extend({

		router: null,

		events: {
			'click #cb-login-login': 'login'
		},

		id: 'login',

		initialize: function (attrs) {
			this.router = attrs.router;

			// Validate Session
			var isValid = this.validateSession();
			if(!isValid) {
				this.renderView();
			} else {
				this.router.navigate('/customers', {trigger: true});
			}
		},

		renderView: function () {
			var template = _.template(Template)({MESSAGE: 'Login'});
			this.$el.html(template);
			return this;
		},

		login: function () {
			var username = $('#cb-login-username').val();
			var password = $('#cb-login-password').val();

			var data = {
				username: username,
				password: password
			};

			var self = this;
 			var model = new Model(data);
			model.on('change', function (result) {
				var permissions = model.get('permissions');

				// Create the SessionStorage
				amplify.store.sessionStorage('user', result);

				switch (permissions) {
					case 'Admin':
						self.router.navigate('/customers', {trigger: true});
					break;
					case 'Dataentry-Reporter':
						console.log('dataentry-reporter entering');
					break;
				}
			});
			model.fetch();
		},

		validateSession: function () {
			var isValid = false;
			var session = amplify.store.sessionStorage('user');
			if ('undefined' !== typeof session) {
				isValid = true;
			}
			return isValid;
		}
	});

	return View;

});