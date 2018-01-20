const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('./db/db');
//require('./app/controllers/users');
const { port, domain } = require('./configs/app');
const routes = require('./app/routes/users');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes);

app.listen(port, () => console.log(`Listening on http://${domain}:${port}`));
