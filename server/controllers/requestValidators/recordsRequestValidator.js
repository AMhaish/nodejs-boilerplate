const BaseRequestValidator = require('./baseRequestValidator');

module.exports = class RecordsRequestValidator extends BaseRequestValidator {
    constructor(request) {
        super(request);
    }

    validate() {
        this.isEmpty('startDate');
        this.isEmpty('endDate');
        this.isNumeric('minCount');
        this.isNumeric('maxCount');
        this.finalizeValidate(); //this method should call at the end of the all methods
    }
}