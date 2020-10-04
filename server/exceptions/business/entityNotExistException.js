const statusCodes = require('../../config/statusCodes');
module.exports = class EntityNotExistException extends require('../baseException') {
  constructor(message) {
    // Providing default message and overriding status code.
    super(message || 'Entity Not Exist', statusCodes.NotFound);
    this.exceptionType = require('../types').BUSINESS;
  }
};