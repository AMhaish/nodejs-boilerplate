const statusCodes = require('../../config/statusCodes');
module.exports = class InvalidParametersException extends require('../baseException') {
    constructor(message) {
        // Providing default message and overriding status code.
        super(message || 'Invalid request parameters', statusCodes.BusinessError);
        this.exceptionType = require('../types').PARAMETER_VALIDATION;
    }
};