// Express Router instance
var express = require('express');
var routerLogin = express.Router();

// Customer Model
var UserModel = require('../../models/users');

// Validation
var validate = require('express-validation');
var validation = require('./validation');

// Get a User by Username and Password
routerLogin.get('/', validate(validation.login), function (req, res) {

	var username = req.query.username;
	var password = req.query.password;

	var query = {
		username: username,
		password: password
	};

	var select = {
		"username"    : 1,
		"email" 	  : 1,
		"phone" 	  : 1,
		"permissions" : 1,
		"company" 	  : 1
	};

	UserModel.findOne(query, select, function (error, customer) {
		if (error) {
			res.send(error);
		} else {
			if (customer) {
				// To create the Session
				req.session.user = customer;
				// Return the result
				res.json(customer);
			} else {
				req.session.destroy();

				res.status(404);
				res.json({
					status: 404,
					statusText: 'Not Found'
				});
			}
		}
	});

});

module.exports = routerLogin;