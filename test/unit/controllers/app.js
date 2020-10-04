const { PORT } = process.env;
var app = require('../../../server/helpers/server').start(PORT);
module.exports = app;