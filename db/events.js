const connection = require('mongoose').connection;
const { dbURI } = require('../configs/db');
let gracefulShutdown;

// CONNECTION EVENTS
connection.on('connected', function() {
    console.log('Mongoose connected to ' + dbURI);
});
connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});
connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = function(msg, callback) {
    connection.close(function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};
// For nodemon restarts
process.once('SIGUSR2', function() {
    gracefulShutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', function() {
    gracefulShutdown('app termination', function() {
        process.exit(0);
    });
});