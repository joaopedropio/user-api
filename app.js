require('./db/db');

const app = require('express')();
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const routes = require('./app/routes');

app.use(swaggerUi.serve);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes)

const { port, domain } = require('./configs/app');
app.listen(port, () => console.log(`Listening on http://${domain}:${port}`));