const connection = require('mongoose').connection;
const { dbURI } = require('../configs/db');
let gracefulShutdown;

connection.on('connected', function() {
    console.log('Mongoose connected to ' + dbURI);
});
connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});
connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

process.on('SIGINT', function() {
    gracefulShutdown('app termination', function() {
        process.exit(0);
    });
});