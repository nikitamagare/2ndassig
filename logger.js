const winston = require('winston');

// To log incoming requests using Winston
const logger = winston.createLogger({
	transports: [
		new winston.transports.Console({
			level: 'info',
			format : winston.format.combine(winston.format.timestamp(), winston.format.simple())
		}),
		new winston.transports.File({ filename: 'error.log', level: 'error' }),
		 new winston.transports.File({ filename: 'combined.log' })
		]
});

module.exports = logger;