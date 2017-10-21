"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const appolo_http_1 = require("appolo-http");
let Bootstrap = class Bootstrap {
    run() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.quotesProvider.initialize();
            this.logger.info("app started");
        });
    }
};
tslib_1.__decorate([
    appolo_http_1.inject()
], Bootstrap.prototype, "quotesProvider", void 0);
tslib_1.__decorate([
    appolo_http_1.inject()
], Bootstrap.prototype, "logger", void 0);
Bootstrap = tslib_1.__decorate([
    appolo_http_1.define(),
    appolo_http_1.singleton(),
    appolo_http_1.bootstrap()
], Bootstrap);
exports.Bootstrap = Bootstrap;
//# sourceMappingURL=bootstrap.js.map