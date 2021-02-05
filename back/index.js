'use strict'
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
require('./db');

// Settings
app.set('port', process.env.PORT || 3300);

// Middlewares
app.use(morgan('dev')); // console messages
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename(req, file, callback) {
        callback(null, new Date().getTime() + path.extname(file.originalname));
    }
});
app.use(multer({ storage }).single('photo'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Routers
app.use('/user', require('./controllers/user/user.router'));

// static files
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
