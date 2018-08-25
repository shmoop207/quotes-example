"use strict";
const tslib_1 = require("tslib");
const logger = require("./loggers/logger");
const socketIo = require("./io/socket.io");
module.exports = function (app) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        yield app.module(logger());
        yield app.module(socketIo());
    });
};
//# sourceMappingURL=all.js.map