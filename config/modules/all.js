"use strict";
const tslib_1 = require("tslib");
const view_1 = require("@appolo/view");
const socket_1 = require("@appolo/socket");
const logger_1 = require("@appolo/logger");
module.exports = function (app) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        yield app.module(logger_1.LoggerModule);
        yield app.module(new socket_1.SocketModule());
        yield app.module(new view_1.ViewModule({ viewEngine: view_1.ViewEngines.nunjucks }));
    });
};
//# sourceMappingURL=all.js.map