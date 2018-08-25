"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const appolo_1 = require("appolo");
let QuotesController = class QuotesController extends appolo_1.Controller {
    getQuote(req, res, model) {
        let quote = this.quotesManager.getQuote(model.symbol);
        return quote;
    }
    getQuotes(req, res, model) {
        let quotes = this.quotesManager.getQuotes(model.symbols);
        this.sendOk(quotes);
    }
    getAllQuotes() {
        let quotes = this.quotesManager.getAllQuotes();
        this.sendOk(quotes);
    }
};
tslib_1.__decorate([
    appolo_1.inject()
], QuotesController.prototype, "quotesManager", void 0);
tslib_1.__decorate([
    appolo_1.get("/getQuote"),
    appolo_1.validation("symbol", appolo_1.validator.string().required())
], QuotesController.prototype, "getQuote", null);
tslib_1.__decorate([
    appolo_1.get("/getQuotes"),
    appolo_1.validation("symbols", appolo_1.validator.array().items(appolo_1.validator.string()).required())
], QuotesController.prototype, "getQuotes", null);
tslib_1.__decorate([
    appolo_1.get("/getAllQuotes")
], QuotesController.prototype, "getAllQuotes", null);
QuotesController = tslib_1.__decorate([
    appolo_1.controller()
], QuotesController);
exports.QuotesController = QuotesController;
//# sourceMappingURL=quotesController.js.map