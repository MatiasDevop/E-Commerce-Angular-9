const express = require('express');
const path = require('path');
const config = require('./config');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('../routes');

//init app

const app = express();

//Logger

if(config.env === 'development'){
    app.use(logger('dev'));

}
// get dist folder
const distDir = path.join(__dirname, '../../dist');

// use dist dolfer as hosting folder by express
app.use(express.static(distDir));
//parsing from api
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// secure apps http

app.use(helmet());
// allow cors
app.use(cors());

//ap router localhost:4050/api
app.use('/api/', routes);

//serve the index.html
app.get('*', (req, res)=> res.sendFile(path.join(distDir,
    'index.html')));
module.exports = app;