"use strict";
const winston = require("winston");
module.exports = function () {
    return function (inject) {
        const logger = winston.createLogger({
            level: 'info',
            format: winston.format.json(),
            transports: []
        });
        logger.add(new winston.transports.Console({
            format: winston.format.simple()
        }));
        inject.addObject('logger', logger);
    };
};
//# sourceMappingURL=logger.js.map