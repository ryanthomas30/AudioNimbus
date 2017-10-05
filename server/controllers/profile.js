const User = require('../models/user');

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
