const Container = require('addict-ioc').Container;
// Services
const Services = require('../services');
const RecordsService = require('../services/recordsService');
const LoggingService = require('../services/loggingService');
// Middlewares
const Middlewares = require('../middlewares');
const LoggerMiddleware = require('../middlewares/loggerMiddleware');
const PostLoggerMiddleware = require('../middlewares/postLoggerMiddleware');
const DefaultMiddleware = require('../middlewares/defaultMiddleware');
// Repos
const Repos = require('../repositories');
const RecordsRepo = require('../repositories/recordsRepo');
// Controllers
const Controllers = require('../controllers');
const RecordsController = require('../controllers/recordsController');

const settings = {
    isSingleton: false,
}
var container;
module.exports = () => {
    if (!container) {
        container = new Container(settings);
        // Registering Repos
        container.register(Repos.RecordsRepo, RecordsRepo);
        // Registering Services
        container.register(Services.LoggingService, LoggingService);
        container.register(Services.RecordsService, RecordsService).dependencies(Repos.RecordsRepo, Repos.RecordsRepo).singleton();
        // Registering Middlewares
        container.register(Middlewares.DefaultMiddleware, DefaultMiddleware).singleton();
        container.register(Middlewares.LoggerMiddleware, LoggerMiddleware).dependencies(Services.LoggingService).singleton();
        container.register(Middlewares.PostLoggerMiddleware, PostLoggerMiddleware).dependencies(Services.LoggingService).singleton();
        // Registering Controllers
        container.register(Controllers.RecordsController, RecordsController).dependencies(Services.RecordsService).singleton();
    }
    return container;
}