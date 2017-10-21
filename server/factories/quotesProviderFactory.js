"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const appolo_http_1 = require("appolo-http");
let QuotesProviderFactory = class QuotesProviderFactory {
    get() {
        switch (this.env.quotesProvider) {
            case "mock":
                return appolo_http_1.injector.get('mockQuotesProvider');
            case "yahoo":
                return appolo_http_1.injector.get('yahooQuotesProvider');
        }
    }
};
tslib_1.__decorate([
    appolo_http_1.inject()
], QuotesProviderFactory.prototype, "env", void 0);
QuotesProviderFactory = tslib_1.__decorate([
    appolo_http_1.define(),
    appolo_http_1.singleton()
], QuotesProviderFactory);
exports.QuotesProviderFactory = QuotesProviderFactory;
//# sourceMappingURL=quotesProviderFactory.js.map