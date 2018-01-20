const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('./db/db');
//require('./app/controllers/users');
const { port, domain } = require('./configs/app');
const userRoutes = require('./app/routes/users');
const statusRoutes = require('./app/routes/status');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', userRoutes);
app.use('/', statusRoutes);

app.listen(port, () => console.log(`Listening on http://${domain}:${port}`));
