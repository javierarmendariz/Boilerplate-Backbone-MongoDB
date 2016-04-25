"use strict";
define([
	'backbone'
	], function (Backbone) {

	var Router = Backbone.Router.extend({
		routes: {
			// Login/Logout
			'login'	   : 'login',
			'logout'   : 'logout',

			// Customers
			'customers': 'customers',
			'customers/:customer_id': 'customerDetails'
		},

		login: function () {

			require(['views/login'], function (View) {
				var view = new View({router: routerInstance});
				$('body').html(view.render().el);
			});

		},

		customers: function () {

			require(['views/customers'], function (View) {
				// var view = new View({router: routerInstance});
				var view = new View();
				$('body').html(view.render().el);
			});

		},

		customerDetails: function (customerId) {

			require(['views/customerDetails'], function (View) {
				var view = new View({
						customerId: customerId
				});
				$('body').html(view.render().el);
			});

		},

		logout: function () {
			amplify.store.sessionStorage('user', null);
			routerInstance.navigate('/login', {trigger: true});
		}
	});

	var routerInstance = null;

	var init = function () {
		routerInstance = new Router();
		Backbone.history.start();
	}

	var getInstance = function () {
		return routerInstance;
	}

	return {
		initialize: init,
		getInstance: getInstance
	};

});
