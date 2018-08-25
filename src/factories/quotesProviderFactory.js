"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const appolo_1 = require("appolo");
const mockQuotesProvider_1 = require("../providers/mockQuotesProvider");
const yahooQuotesProvider_1 = require("../providers/yahooQuotesProvider");
let QuotesProvider = class QuotesProvider {
    get() {
        switch (this.env.quotesProvider) {
            case "mock":
                return this.injector.get(mockQuotesProvider_1.MockQuotesProvider);
            case "yahoo":
                return this.injector.get(yahooQuotesProvider_1.YahooQuotesProvider);
        }
    }
};
tslib_1.__decorate([
    appolo_1.inject()
], QuotesProvider.prototype, "env", void 0);
tslib_1.__decorate([
    appolo_1.inject()
], QuotesProvider.prototype, "injector", void 0);
QuotesProvider = tslib_1.__decorate([
    appolo_1.define(),
    appolo_1.singleton(),
    appolo_1.factory()
], QuotesProvider);
exports.QuotesProvider = QuotesProvider;
//# sourceMappingURL=quotesProviderFactory.js.map