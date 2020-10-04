const bodyParser = require('body-parser')
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');

module.exports = class DefaultMiddleware {
    constructor() {
    }

    initialize(app) {
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(mongoSanitize());
        app.use(cors());
    }
}