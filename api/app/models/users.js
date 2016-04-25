var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CustomerSchema = new Schema({
	username   : String,
	password   : String,
	email 	   : String,
	phone 	   : Number,
	permissions: String,
	company    : Number
});

module.exports = mongoose.model('Users', CustomerSchema);