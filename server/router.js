const Authentication = require('./controllers/authentication');
const Profile = require('./controllers/profile');
require('./services/passport');
const passport = require('passport');
const fs = require("fs");
const User = require('./models/user');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

const mongoose = require("mongoose");
const conn = mongoose.connection;
const Grid = require('gridfs-stream');
const Multer = require('multer');
const multer = Multer({
	dest: './uploads/',
	limits: {
		fileSize: 20 * 1024 * 1024 // No larger than 20MB. Arbitrarily chosen cap.
	}
});

module.exports = function(app) {
	app.post('/signin', requireSignin, Authentication.signin);
	app.post('/signup', Authentication.signup);
	app.put('/putAbout/:userId', Profile.putAbout);
	app.get('/getAbout/:userId', Profile.getAbout);
	app.get('/getTracks/:userId', Profile.getTracks);
	app.post('/uploadTrack/:userId', Profile.uploadTrack);

	// Make sure there is a DB connection before setting up gridfs-stream
	// There's probably a better way to write this
	conn.once("open", () => {
		const gfs = Grid(mongoose.connection.db, mongoose.mongo);

		// TODO: Extract controller logic out of this and just keep the route
		app.post('/upload/:userId', multer.single('file'), (req, res, next) => {
			console.log('req.file', req.file)
			const { file } = req;
			if (!file) {
				res.status(400).send('No file uploaded.');
				return;
			}
			const { originalname } = file;

			var writestream = gfs.createWriteStream({
				filename: originalname
			});

			// TODO: Need a way to prevent filename collisions. Easiest way may be to just add timestamp.
			fs
				.createReadStream("./uploads/" + req.file.filename) // Read the file from disk that we just saved. Note: this is inefficient
				.on("end", () => fs.unlink("./uploads/"+ req.file.filename, err => res.send({ filename: req.file.originalname }))) // When completed, delete the file and send completion
				.on("err", () => res.send("Error uploading image"))
				.pipe(writestream); // Pipe file contents from file to GridFS
		});

		app.post('/uploadImage/:userId', multer.single('image'), (req, res, next) => {
			console.log('req.file', req.file)
			const { file } = req;
			if (!file) {
				res.status(400).send('No file uploaded.');
				return;
			}
			const { originalname } = file;

			var writestream = gfs.createWriteStream({
				filename: originalname
			});

			// TODO: Need a way to prevent filename collisions. Easiest way may be to just add timestamp.
			fs
				.createReadStream("./uploads/" + req.file.filename) // Read the file from disk that we just saved. Note: this is inefficient
				.on("end", () => fs.unlink("./uploads/"+ req.file.filename, err => res.send({ imagename: req.file.originalname }))) // When completed, delete the file and send completion
				.on("err", () => res.send("Error uploading image"))
				.pipe(writestream); // Pipe file contents from file to GridFS
		});

		// sends the image we saved by filename.
		app.get("/files/:filename", (req, res) => {
			var readstream = gfs.createReadStream({filename: req.params.filename});
			readstream.on("error", err => {
				res.send("No image found with that title");
			});
			readstream.pipe(res);
		});
	});
}
