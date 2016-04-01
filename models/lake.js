var mongoose = require("mongoose");
var Schema = mongoose.Schema;

/*
 * a database to log runs around various lakes
 * modeled after Bird from birdwatcher exercize
 */

var lakeSchema = new Schema({
	lake: {	// each lake should be unique; let's convert to lowercase to make that easy
		type :String,
		required: true,
		unique: true,
		lowercase : true 
		},
	runs: [ {  // an array of run dates and run times
		date: { type: Date, default: Date.now },
		time: { type: Number, required: true }
		} ]
	});

var Lake = mongoose.model('Lake', lakeSchema);

module.exports = Lake;