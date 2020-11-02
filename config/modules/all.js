"use strict";
const tslib_1 = require("tslib");
const view_1 = require("@appolo/view");
const socket_1 = require("@appolo/socket");
const logger_1 = require("@appolo/logger");
const validator_1 = require("@appolo/validator");
module.exports = function (app) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        app.module.use(logger_1.LoggerModule)
            .use(socket_1.SocketModule.for({ socket: { transports: ['polling', 'websocket'] } }))
            .use(validator_1.ValidationModule)
            .use(view_1.ViewModule.for({ viewEngine: view_1.ViewEngines.nunjucks }));
    });
};
//# sourceMappingURL=all.js.map