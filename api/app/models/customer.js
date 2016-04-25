var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CustomerSchema = new Schema({
	name: 	 String,
	address: String,
	score:   Number,
	phone: {
		mobile: Number,
		home:   Number
	},
	companies: []
});

module.exports = mongoose.model('Customer', CustomerSchema);