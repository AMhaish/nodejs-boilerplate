const { logger } = require('../helpers/logger');


module.exports = class LoggingService {
    constructor() { }

    setTraceId(traceId) {
        this.traceId = traceId;
    }

    setSpanId(spanId) {
        this.spanId = spanId;
    }

    getTraceId() {
        return this.traceId;
    }

    logInfo(message, className) {
        logger.log('info', message, { 'TraceId': this.traceId, 'SpanId': this.spanId, 'Exportable': "export-span", 'ClassName': className });
    }

    logError(message, className) {
        logger.log('error', message, { 'TraceId': this.traceId, 'SpanId': this.spanId, 'Exportable': "export-span", 'ClassName': className });
    }

    logWarning(message, className) {
        logger.log('warn', message, { 'TraceId': this.traceId, 'SpanId': this.spanId, 'Exportable': "export-span", 'ClassName': className });
    }

    logFatal(message, className) {
        logger.log('fatal', message, { 'TraceId': this.traceId, 'SpanId': this.spanId, 'Exportable': "export-span", 'ClassName': className });
    }

    logDebug(message, className) {
        logger.log('debug', message, { 'TraceId': this.traceId, 'SpanId': this.spanId, 'Exportable': "export-span", 'ClassName': className });
    }
}