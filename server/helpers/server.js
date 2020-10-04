const express = require('express');
const app = express();
const ioc = require('./ioc')();
const Middlewares = require('../middlewares');
const Services = require('../services');
require('../helpers/logger'); // Initializing the logger

module.exports = {
  start(port) {
    // Order of middlewares is so important
    // Injecting default middleware (Should be first so others can read body)
    let defaultMiddleware = ioc.resolve(Middlewares.DefaultMiddleware);
    defaultMiddleware.initialize(app);
    // Inject logger as middleware (Should be the second one so others can log messages)
    let loggerMiddleware = ioc.resolve(Middlewares.LoggerMiddleware);
    loggerMiddleware.initialize(app);
    // Configure the routes
    require('../routes')(app, ioc, ioc.resolve(Services.LoggingService));
    let postLoggerMiddleware = ioc.resolve(Middlewares.PostLoggerMiddleware);
    postLoggerMiddleware.initialize(app);
    this.app = app;
    this.server = app.listen(port);
    return this.server;
  },
  stop() {
    this.server.close();
  },
}