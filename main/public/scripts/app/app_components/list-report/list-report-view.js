"use strict";
define([
	'backbone',
	'router',
	'./list-report-model',
	'text!./list-report-table.html',
	'text!./list-report-body.html'
	], function (Backbone, Router, Model, Template_table, Template_body) {

	var View = Backbone.View.extend({

		router: null,

		model: null,

		template: Template_table,

		className: 'list',

		initialize: function () {
			this.router = Router;

			console.log('Initializing List-Report');

			this.model = new Model();

			this.listenTo(this.model, 'change', this.setView);

			this.model.fetch();
		},

		setView: function () {
			this.$el.html(this.template);
			var customers = this.model.attributes;
			var customersLength = _.keys(customers).length;

			var body = '';
			for (var customerIndex in customers) {
				var customer = customers[customerIndex];
				var id = customer._id;
				var name = customer.name;
				var address = customer.address;

				var data = {
					ID: id,
					NAME: name,
					ADDRESS: address
				};

				body += _.template(Template_body)(data);
			}
			this.$el.find('tbody').html(body);

			return this;
		}
	});

	return View;

});