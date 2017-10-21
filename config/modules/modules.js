"use strict";
const appolo = require("appolo-http");
const logger = require("./loggers/logger");
const socketIo = require("./io/socket.io");
module.exports = function () {
    appolo.use(logger());
    appolo.use(socketIo());
};
//# sourceMappingURL=modules.js.map