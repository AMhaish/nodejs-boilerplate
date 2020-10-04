const statusCodes = require('../../config/statusCodes');
module.exports = class MongoServerException extends require('../baseException') {
    constructor(message) {
        // Providing default message and overriding status code.
        super(message || 'Connection to Mongo DB failed', statusCodes.ServiceUnavailable);
        this.exceptionType = require('../types').SERVER_ERROR;
    }
};