
require('dotenv').config(); // For loading environment variables from .env file in development mode
const server = require('./server/helpers/server'); // server.js includes the creation of Express server
const db = require('./server/helpers/db'); // db.js includes the connection to database


db.connect(function () {
    server.start();
});





