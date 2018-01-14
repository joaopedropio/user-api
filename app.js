var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
require('./app/models/db');
var config = require('./configs/app');
var routes = require('./app/routes/users');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes);

app.listen(config.port, () => console.log('Listening on http://' + config.domain + ':' + config.port));