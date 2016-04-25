var express = require('express');
var Router = express.Router();

// # Express Session
var Session = require('express-session');
Router.use(Session({
	secret: 'thesecret',
	resave: true,
	saveUninitialized: true
}));
console.log('Express Session initialized');

// # Main Application Middleware
Router.use(function (req, res, next){
	res.header('Access-Control-Allow-Origin', 'http://localhost');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
	// Read about Allow-Credentials!
	res.header('Access-Control-Allow-Credentials', 'true');

	var path = req._parsedOriginalUrl.path;
	var isLogin = path.indexOf('/api/login');

	if (-1 === isLogin) {
		// To validate here the if the Session exists
		if ('undefined' === typeof req.session.user) {
			res.status(401);
			res.json({
				status: '401',
				statusText: 'Unauthorized'
			});
		} else {
			next();
		}
	} else {
		next();
	}
});

// # Default API call
Router.get('/', function (req, res) {
	res.json({
		message: 'API v1.0'
	});
});

// # Routers

// ## Customers Routes
var routerCustomers = require('./customers/route');
Router.use('/customers', routerCustomers);

// ## Login Route
var routerLogin = require('./login/route');
Router.use('/login', routerLogin);

module.exports = Router;