"use strict";
define([
	'backbone',
	'router',
	'text!/templates/views/customers.html',
	'../app_components/list-report/list-report-view'
	], function (Backbone, Router, Template, ListReport_component) {

	var View = Backbone.View.extend({

		router: null,

		events: {},

		id: 'customers',

		initialize: function () {
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

			// List Report
			var listReport = new ListReport_component();
			this.$el.html(listReport.render().el);

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