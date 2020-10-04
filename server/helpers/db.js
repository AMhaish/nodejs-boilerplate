const mongoose = require('mongoose');
const MongoServerException = require('../exceptions/server-error/mongoServerException');
const { MONGO_URL, MONGO_DB_NAME } = process.env;

module.exports = {
    connect(callback) {
        mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, dbName: MONGO_DB_NAME, replicaSet: 'rsNameHere' }).then(() => {
            console.log('Connection to MongoDB established.');
            if (callback) callback();
        }).catch((error) => {
            throw new MongoServerException(error.message);
        });
    }
}