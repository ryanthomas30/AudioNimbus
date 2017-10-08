const User = require('../models/user');

// Updates the about field of a user
exports.putAbout = function(req, res, next) {
	const { userId } = req.params;
	const update = req.body;
	console.log(update);
	User.findByIdAndUpdate(userId, { $set: { about: update }}, function(err, user) {
		if (err) {
			console.log(err);
		}
		res.send({ about: user.about });
	});
}

// Fetches the about field of a user
exports.getAbout = function(req, res, next) {
	const { userId } = req.params;
	User.findById(userId, function(err, user) {
		if (err) {
			console.log(err);
		}
		if (!user) {
			return res.status(422).send({ error: 'User not found' });
		}
		res.send({ about: user.about });
	});
}

// Fetches the tracks array of a user
exports.getTracks = function(req, res, next) {
	const { userId } = req.params;
	User.findById(userId, function(err, user) {
		if (err) {
			console.log(err);
		}
		if (!user) {
			return res.status(422).send({ error: 'User not found' });
		}
		res.send({ tracks: user.tracks });
	});
}

exports.uploadTrack = function(req, res, next) {
	const { userId } = req.params;
	const { name, imagename, filename } = req.body;
	const update = { name, imagename, filename }
	User.findByIdAndUpdate(userId, { $push: { tracks: update }}, function(err, user) {
		if (err) {
			console.log(err);
		}
	});
}
