const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('./db/db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', require('./app/routes'));

const { port, domain } = require('./configs/app');
app.listen(port, () => console.log(`Listening on http://${domain}:${port}`));