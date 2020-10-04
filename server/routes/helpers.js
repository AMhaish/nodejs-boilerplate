module.exports = {
    async handleException(req, res, next, callback) {
        try {
            res.header('traceId', req.logger.traceId);
            if (callback) await callback(req, res, next);
        } catch (ex) {
            req.logger.logError(ex.message, ex.source);
            if (ex.toJson) {
                ex.setTraceId(req.logger.getTraceId());
                res.status(ex.status).json(ex.toJson());
            } else
                res.status(500).send(ex.message);
        }
        next();
    },
};