/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');

// Setup server
var app = express();
var server = require('http').createServer(app);

// Start server
server.listen(8080, 'localhost', function () {
  console.log('Express server listening on 8080, in %s mode',app.get('env'));
});

// Expose app
exports = module.exports = app;