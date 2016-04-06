var express = require('express');
var router = express.Router();

// get our datamodel for our Lake object, which also subsumes our runs data
var Lake = require('../models/lake.js');

/* GET home page. */
router.get('/', function(req, res, next) {

	// just like in birdwatcher, we ask our schema to find all Lake documents and pass them to index.jade
	Lake.find(function(err,lakeDocs) {
		if (err) return next(err);  // handle errors
		res.render('index', { lakes : lakeDocs, error:req.flash('error') });  // render our page
	});
});

/* POST new lake */
router.post('/',function(req, res, next) {
	// all fields are required, but let's go ahead and be sure blank data is stripped out
	for (var att in req.body) {
		if (req.body[att] === '') {
			delete(req.body[att]);
		}
	}

	//console.log(req.body.lake);
	// build our run data
	var lakeInfo = req.body.lake;
	var runDate = req.body.date || date.now;
	var runInfo = [{ 'date': runDate, 'time': req.body.time }];  // remember - runs is an array!
	var lakeData = { 'lake': lakeInfo, 'runs': runInfo };

	//console.log(JSON.stringify(lakeData));

	// TODO: save the data to the database.
	// create new Lake object and send it to the database
	var newLake = Lake(lakeData);
	newLake.save(function(err){
		// body is copypasta from birdsightings lab
		if (err) {
			if (err.name == "ValidationError") {
				req.flash('error','Invalid data.  Please re-enter.');
				return res.redirect('/');
			}
			if (err.code == 11000) {
				req.flash('error','A lake with that name already exists!');
				return res.redirect('/');
			}
			else return next(err);  // some other error happened we haven't foreseen
		}
		res.status(201);  // 201 = created
		return res.redirect('/');
	});

});

// add a new time for the lake via POST
// why is it 404'ing when I try to add time?
router.post('/addTime', function(req, res, next) {
	var myLake = req.body.lake;
	var myDate = req.body.date;
	var myTime = req.body.time;
	var myRun = {date: myDate, time: myTime};
	console.log(myRun);

	// find the specific lake
	// then push myRun to the runs array of the lake.
	Lake.findOne({lake: myLake}, function(err,lake) {
		if (err) return next(err);  // handle errors
		
		lake.runs.push(myRun);
		lake.save(function(err){
			if (err) { return next(err); }
			res.redirect('/');
		});
	});

});

module.exports = router;
