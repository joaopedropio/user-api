const app = require('express')();
const mongoose = require('mongoose');
require('./app/models/users');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const routes = require('./app/routes');

app.use(swaggerUi.serve);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes)

const { port, url } = require('./configs/app');
const { dbURL } = require('./configs/db');
mongoose.connect(dbURL).then(
    () => {
        app.listen(port, console.log(`Listening on ${url}...`));
    },
    err => {
        console.log(err);
        process.exit();
    }
);