"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bootstrap = void 0;
const tslib_1 = require("tslib");
const engine_1 = require("@appolo/engine");
const inject_1 = require("@appolo/inject");
let Bootstrap = class Bootstrap {
    run() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.quotesProvider.initialize();
            this.logger.info("app started");
        });
    }
};
tslib_1.__decorate([
    inject_1.inject()
], Bootstrap.prototype, "quotesProvider", void 0);
tslib_1.__decorate([
    inject_1.inject()
], Bootstrap.prototype, "logger", void 0);
Bootstrap = tslib_1.__decorate([
    inject_1.define(),
    inject_1.singleton(),
    engine_1.bootstrap()
], Bootstrap);
exports.Bootstrap = Bootstrap;
//# sourceMappingURL=bootstrap.js.map