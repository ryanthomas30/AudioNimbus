// Main starting point of the application
const express = require('express');
const path = require('path')
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');
var enforce = require('express-sslify');

// Enforce HTTPS
// app.use(enforce.HTTPS({ trustProtoHeader: true }))

// DB Setup
mongoose.connect(process.env.MONGODB_URI);

// App Setup
app.use(morgan('combined'));
app.use(cors());
app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
router(app);

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
