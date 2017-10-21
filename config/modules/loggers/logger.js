"use strict";
const winston = require("winston");
module.exports = function () {
    return function (inject) {
        let transports = [];
        transports.push(new (winston.transports.Console)({
            json: true,
            timestamp: true,
            handleExceptions: true
        }));
        let logger = new (winston.Logger)({
            transports: transports,
            exitOnError: false
        });
        inject.addObject('logger', logger);
    };
};
//# sourceMappingURL=logger.js.map