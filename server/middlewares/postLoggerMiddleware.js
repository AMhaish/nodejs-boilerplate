module.exports = class LoggerMiddleware {
    constructor(logger) {
        this.logger = logger;
        this.middlewareFunction = this.middlewareFunction.bind(this);
    }

    initialize(app) {
        app.use(this.middlewareFunction);
    }

    middlewareFunction(req) {
        if (req) {
            this.logger.setTraceId((req && req._trace_id ? req._trace_id.traceId : 'No Trace id'));
            this.logger.setSpanId((req && req._trace_id ? req._trace_id.spanId : 'No Span id'));
            let executionTime = new Date() - req.startTime;
            this.logger.logInfo('The call to ' + req.path + ' end with execution time ' + executionTime + ' ms', 'POST Actions');
        }
        /*if(!res.headerSent){
            res.status(resultCodes.NotFound).send();
        }*/
    }
}