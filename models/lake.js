var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectID = Schema.ObjectId;

/*
 * a database to log runs around various lakes
 * modeled after Bird from birdwatcher exercize
 */
var runSchema = new Schema({
		//id: ObjectID,
		date: { type: Date, default: Date.now },
		time: { type: Number, required: true }
	});

var Run = mongoose.model('Run', runSchema);

var lakeSchema = new Schema({
	lake: {	// each lake should be unique; let's convert to lowercase to make that easy
		type :String,
		required: true,
		unique: true,
		lowercase : true 
		},
	runs: [ runSchema ]
	});

var Lake = mongoose.model('Lake', lakeSchema);

module.exports = Lake;