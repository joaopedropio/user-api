const mongoose = require('mongoose');
const { dbURI } = require('../configs/db');

mongoose.Promise = global.Promise;

let connectWithRetry = () =>  {
    mongoose.connect(dbURI,{ useMongoClient: true })
        .catch(() => {
            console.log('Retrying to connect in 5 sec');
            setTimeout(connectWithRetry, 5000);
        });
};
connectWithRetry();

require('../app/models/users');
require('./events');