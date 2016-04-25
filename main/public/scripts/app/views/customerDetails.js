"use strict";
define([
	'backbone',
	'router',
	'text!/templates/views/customers.html',
	'../app_components/customer-details/customer-details-view'
	], function (Backbone, Router, Template, CustomerDetails_component) {

	var View = Backbone.View.extend({

		router: null,

		events: {},

		id: 'customerdetails',

		initialize: function (attrs) {
			this.router = Router.getInstance();

			// Validate Session
			var isValid = this.validateSession();
			if(!isValid) {
				this.router.navigate('/login', {trigger: true});
			} else {
				this.setView();
			}
		},

		setView: function () {
			this.$el.html(Template);

			return this;
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