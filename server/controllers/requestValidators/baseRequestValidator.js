const validator = require('validator');
const InvalidParametersException = require('../../exceptions/parameter-validation/invalidParametersException');
module.exports = class BaseRequestValidator {

    constructor(request) {
        this.request = request;
        this.validationErrors = [];
    }

    finalizeValidate() {
        if (this.validationErrors.length > 0) {
            throw new InvalidParametersException(this.validationErrors.join(','));
        }
    }

    isEmpty(propName) {
        if (this.request.body[propName] == undefined || validator.isEmpty(this.request.body[propName])) {
            this.validationErrors.push(propName + " field is empty.");
        }
    }

    isArray(propName) {
        if (this.request.body[propName] == undefined || !Array.isArray(this.request.body[propName])) {
            this.validationErrors.push(propName + " is not an array");
        }
    }

    isSubEmpty(subObject, propName) {
        if (this.request.body[propName] == undefined || validator.isEmpty(this.request.body[subObject][propName])) {
            this.validationErrors.push(propName + " field is empty.");
        }
    }

    isNumeric(propName) {
        if (this.request.body[propName] == undefined || !validator.isNumeric(this.request.body[propName].toString())) {
            this.validationErrors.push(propName + " field is not numeric.");
        }
    }
}