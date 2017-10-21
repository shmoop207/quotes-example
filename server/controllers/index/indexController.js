"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const appolo_http_1 = require("appolo-http");
let IndexController = class IndexController extends appolo_http_1.Controller {
    index() {
        this.res.render({ socketUrl: this.env.socketUrl });
    }
};
tslib_1.__decorate([
    appolo_http_1.inject()
], IndexController.prototype, "env", void 0);
tslib_1.__decorate([
    appolo_http_1.pathGet("/")
], IndexController.prototype, "index", null);
IndexController = tslib_1.__decorate([
    appolo_http_1.define()
], IndexController);
exports.IndexController = IndexController;
//# sourceMappingURL=indexController.js.map