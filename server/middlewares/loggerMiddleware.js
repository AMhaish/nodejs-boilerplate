
module.exports = class LoggerMiddleware {
    constructor(logger) {
        this.logger = logger;
        this.middlewareFunction = this.middlewareFunction.bind(this);
    }

    initialize(app) {
        app.use(this.middlewareFunction);

    }

    middlewareFunction(req, res, next) {
        if (req) {
            this.logger.setTraceId((req && req._trace_id ? req._trace_id.traceId : 'No Trace id'));
            this.logger.setSpanId((req && req._trace_id ? req._trace_id.spanId : 'No Span id'));
            //this.logger.logInfo('The call to ' + req.path + ' started.', 'POST Actions'); // Not important
            req.logger = this.logger;
            req.startTime = new Date();
        }
        next();
    }
}