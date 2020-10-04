const statusCodes = require('../config/statusCodes');
module.exports = class BaseException extends Error {
    constructor(message, status, ex) {
        // Calling parent constructor of base Error class.
        super(message);
        // Saving class name in the property of our custom error as a shortcut.
        this.name = this.constructor.name;
        // Capturing stack trace, excluding constructor call from it.
        Error.captureStackTrace(this, this.constructor);
        // Defining the properties
        this.status = status || statusCodes.BusinessError;
        if (ex) {
            if (ex.message && ex.stack) {
                this.message = ex.message + '\n' + ex.stack;
                this.source = (ex.stack != undefined && ex.stack.length > 0 ? ex.stack[0] : 'Unknown');
            } else {
                this.message = ex;
            }
        } else {
            this.message = message;
        }
        this.userMessage = message;
        this.type = '';
        this.traceId = '';
    }

    setTraceId(traceId) {
        this.traceId = traceId;
    }
    /**
     * Converting the error to JSON to be returned to the caller
     */
    toJson() {
        return {
            code: this.status,
            exceptionType: this.exceptionType,
            message: this.message,
            userMessage: this.userMessage,
            traceId: this.traceId
        };
    }
}