const Controllers = require('../controllers');
const helpers = require('./helpers');

module.exports = (app, ioc, logger) => {
    const recordsController = ioc.resolve(Controllers.RecordsController);
    app.post("/records/summary", async (req, res, next) => { await helpers.handleException(req, res, next, recordsController.getRecordsSummary) });
    app.get('*', function (req, res) {
        res.status(404).send({ error: 'Not found' });
    });
    logger.logInfo(`Running an Express API server at /records/*`, 'Express routes');
};