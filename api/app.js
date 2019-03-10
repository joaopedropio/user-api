const app = require('express')();
const mongoose = require('mongoose');
require('./app/models/users');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const routes = require('./app/routes');
const { jsonLimitSize, port, url, dbURL } = require('./configs/app');

app.use(swaggerUi.serve);
app.use(bodyParser.json({limit: jsonLimitSize, extended: true}));
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', routes);

mongoose.connect(dbURL, { useMongoClient: true }).then(
    () => {
        app.listen(port, console.log(`Listening on ${url}`));
    },
    err => {
        console.log(err);
        process.exit();
    }
);

module.exports = app;