const winston = require('winston');
const moment = require('moment');
const { combine, timestamp, printf } = winston.format;

const {
    LOGS
} = process.env;
var transports;
if (LOGS == 'Stackdriver') {
    transports = [new winston.transports.Console()];

} else {
    transports = [new winston.transports.Console({
        format: combine(
            timestamp(),
            printf(options => {
                let level = options.level.toUpperCase();
                return `${moment().toISOString()} ${level} [RecordsService,${options.TraceId},${options.SpanId},${options.Exportable}] ${process.pid} --- [nodeThread] --- ${options.ClassName} : ${options.message}`;
            })
        ),
    })];
}

const logger = winston.createLogger({
    format: winston.format.json(),
    defaultMeta: { service: 'RecordsService' },
    transports: transports
});

module.exports.logger = logger;