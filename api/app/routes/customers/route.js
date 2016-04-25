// Express Router instance
var express = require('express');
var routerCustomers = express.Router();

// Customer Model
var CustomerModel = require('../../models/customer');

// Get all customers
routerCustomers.get('/', function (req, res) {
	var customer = new CustomerModel();
	CustomerModel.find(function (error, customers) {
		if (error) {
			res.send(error);
		} else {
			res.json(customers);
		}
	});
});

// Add a new Customer
routerCustomers.post('/', function (req, res) {
	var customer  = new CustomerModel();

	var name 	  = req.body.name;
	var address   = req.body.address;
	var phone 	  = req.body.phone;
	var companies = req.body.companies;

	customer.name 	    = name;
	customer.address    = address;
	customer.phone.home = phone;
	customer.companies  = companies;

	customer.save(function (error) {
		if (error) {
			res.send(error);
		} else {
			res.json({
				message: 'Customer Created'
			});
		}
	});
});

// Get a customer by ID
routerCustomers.get('/:customer_id', function (req, res) {
	var customerId = req.params.customer_id;
	CustomerModel.findById(customerId, function (error, customer) {
		if (error) {
			res.send(error);
		} else {
			res.json(customer);
		}
	});
});

// Update a customer
routerCustomers.put('/:customer_id', function (req, res) {
	var customerId = req.params.customer_id;
	CustomerModel.findById(customerId, function (error, customer) {
		if (error) {
			res.send(error);
		} else if (customer) {
			var name = req.body.name;
			customer.name = name;
			customer.save(function (error) {
				if (error) {
					res.send(error);
				} else {
					res.json({
						message: 'Updated'
					});
				}
			});
		} else {
			res.json({
				message: 'No customer found'
			});
		}
	});
});

// Delete a customer
routerCustomers.delete('/:customer_id', function (req, res) {
	var customerId = req.params.customer_id;

	CustomerModel.remove({
		_id: customerId
	}, function (error, customer) {
		if (error) {
			res.send(error);
		} else {
			res.json({
				message: 'Deleted'
			});
		}
	});
});

module.exports = routerCustomers;