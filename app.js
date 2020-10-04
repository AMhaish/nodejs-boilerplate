const mongoose = require('mongoose');
const server = require('./server/helpers/server'); // server.js includes the creation of Express server
require('dotenv').config(); // For loading environment variables from .env file in development mode
const { MONGO_URL, MONGO_DB_NAME, PORT } = process.env;

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, dbName: MONGO_DB_NAME, replicaSet: 'rsNameHere' }).then(() => {
    console.log('Connection to MongoDB established.');
    server.start(PORT);
});


