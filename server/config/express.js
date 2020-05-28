const express = require('express');
const path = require('path');
const config = require('./config');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('../routes');
const passport = require('../middleware/passport');
//const compress = require('compression');
const HttpError = require('http-errors');
//init app

const app = express();

//Logger

if(config.env === 'development'){
    app.use(logger('dev'));

}
// get dist folder
const distDir = path.resolve(__dirname, '../../dist/proy-ng9');

// use dist dolfer as hosting folder by express
app.use(express.static(distDir));
//parsing from api
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// secure apps http

app.use(helmet());
// allow cors
app.use(cors());

//Authenticate
app.use(passport.initialize());


//ap router localhost:4050/api
app.use('/api/', routes);

//serve the index.html
app.get('*', (req, res)=> res.sendFile(path.join(distDir,
    'index.html')));

    // catch the 404 and forward to error handler
    app.use((req, res, next) => {
        const error = new HttpError(404);
        return next(error);
    });

    //error handler, stack trace
    app.use((err, req, res, next) => {
        res.status(err.status || 500).json({
            message: err.message
        });
        next(err);
    });

module.exports = app;