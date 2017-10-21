"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const appolo_http_1 = require("appolo-http");
let QuotesController = class QuotesController extends appolo_http_1.Controller {
    getQuote() {
        let symbol = this.req.model.symbol;
        let quote = this.quotesManager.getQuote(symbol);
        this.sendOk(quote);
    }
    getQuotes() {
        let symbols = this.req.model.symbol.split(',');
        let quotes = this.quotesManager.getQuotes(symbols);
        this.sendOk(quotes);
    }
    getAllQuotes() {
        let quotes = this.quotesManager.getAllQuotes();
        this.sendOk(quotes);
    }
};
tslib_1.__decorate([
    appolo_http_1.inject()
], QuotesController.prototype, "quotesManager", void 0);
tslib_1.__decorate([
    appolo_http_1.pathGet("/getQuote"),
    appolo_http_1.validation("symbol", appolo_http_1.validator.string().required())
], QuotesController.prototype, "getQuote", null);
tslib_1.__decorate([
    appolo_http_1.pathGet("/getQuotes"),
    appolo_http_1.validation("symbols", appolo_http_1.validator.array().items(appolo_http_1.validator.string()).required())
], QuotesController.prototype, "getQuotes", null);
tslib_1.__decorate([
    appolo_http_1.pathGet("/getAllQuotes")
], QuotesController.prototype, "getAllQuotes", null);
QuotesController = tslib_1.__decorate([
    appolo_http_1.define()
], QuotesController);
exports.QuotesController = QuotesController;
//# sourceMappingURL=quotesController.js.map