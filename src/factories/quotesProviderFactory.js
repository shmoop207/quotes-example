"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuotesProvider = void 0;
const tslib_1 = require("tslib");
const inject_1 = require("@appolo/inject");
const mockQuotesProvider_1 = require("../providers/mockQuotesProvider");
let QuotesProvider = class QuotesProvider {
    get() {
        switch (this.env.quotesProvider) {
            case "mock":
                return this.injector.get(mockQuotesProvider_1.MockQuotesProvider);
        }
    }
};
tslib_1.__decorate([
    inject_1.inject()
], QuotesProvider.prototype, "env", void 0);
tslib_1.__decorate([
    inject_1.inject()
], QuotesProvider.prototype, "injector", void 0);
QuotesProvider = tslib_1.__decorate([
    inject_1.define(),
    inject_1.singleton(),
    inject_1.factory()
], QuotesProvider);
exports.QuotesProvider = QuotesProvider;
//# sourceMappingURL=quotesProviderFactory.js.map