"use strict";
// Server
var express = require("express");
var App = express();
var bodyParser = require("body-parser");
var port = 8080;

// App configuration
App.use(bodyParser.urlencoded({
	extended: true
}));
App.use(bodyParser.json());

// Session
var Session = require('express-session');
App.use(Session({
	secret: 'thesecret',
	resave: true,
	saveUninitialized: true
}));

// Router
var Router = require('./app/routes/router');
App.use('/api', Router);

//Express Validation: error handler, required as of 0.3.0
App.use(function(err, req, res, next){
  res.status(400).json(err);
});

// MongoDB
var Mongoose = require('mongoose');
Mongoose.connect('mongodb://localhost/creditdb');
console.log('Connected to the DB');

App.listen(port);
console.log('Listening at 8080');

