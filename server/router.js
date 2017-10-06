const Authentication = require('./controllers/authentication');
const Profile = require('./controllers/profile');
require('./services/passport');
const passport = require('passport');
const fs = require("fs");

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

const mongoose = require("mongoose");
const conn = mongoose.connection;
const Grid = require('gridfs-stream');
const Multer = require('multer');
const multer = Multer({
	dest: './uploads/',
	limits: {
		fileSize: 10 * 1024 * 1024 // No larger than 10MB. Arbitrarily chosen cap.
	}
});

module.exports = function(app) {
	app.post('/signin', requireSignin, Authentication.signin);
	app.post('/signup', Authentication.signup);
	app.put('/putAbout/:userId', Profile.putAbout);
	app.get('/getAbout/:userId', Profile.getAbout);

	// Make sure there is a DB connection before setting up gridfs-stream
	// There's probably a better way to write this
	conn.once("open", () => {
		const gfs = Grid(mongoose.connection.db, mongoose.mongo);

		// TODO: Extract controller logic out of this and just keep the route
		app.post('/upload', multer.single('file'), (req, res, next) => {
			console.log('req.file', req.file)
			const { file } = req;
			if (!file) {
				res.status(400).send('No file uploaded.');
				return;
			}

			var writestream = gfs.createWriteStream({
				filename: file.originalname
			});

			// TODO: Need a way to prevent filename collisions. Easiest way may be to just add timestamp.
			fs
				.createReadStream("./uploads/" + req.file.filename) // Read the file from disk that we just saved. Note: this is inefficient
				.on("end", () => fs.unlink("./uploads/"+ req.file.filename, err => res.status(201).send("File uploaded"))) // When completed, delete the file and send completion
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
