"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuotesController = void 0;
const tslib_1 = require("tslib");
const route_1 = require("@appolo/route");
const inject_1 = require("@appolo/inject");
const validator_1 = require("@appolo/validator");
let QuotesController = class QuotesController extends route_1.Controller {
    getQuote(model) {
        let quote = this.quotesManager.getQuote(model.symbol);
        return quote;
    }
    getQuotes(model) {
        let quotes = this.quotesManager.getQuotes(model.symbols);
        this.sendOk(quotes);
    }
    getAllQuotes() {
        let quotes = this.quotesManager.getAllQuotes();
        this.sendOk(quotes);
    }
};
tslib_1.__decorate([
    inject_1.inject()
], QuotesController.prototype, "quotesManager", void 0);
tslib_1.__decorate([
    route_1.get("/getQuote"),
    validator_1.validate({ "symbol": validator_1.string().required() }),
    tslib_1.__param(0, route_1.query())
], QuotesController.prototype, "getQuote", null);
tslib_1.__decorate([
    route_1.get("/getQuotes"),
    validator_1.validate({ "symbols": validator_1.array().items(validator_1.string().required()) }),
    tslib_1.__param(0, route_1.query())
], QuotesController.prototype, "getQuotes", null);
tslib_1.__decorate([
    route_1.get("/getAllQuotes")
], QuotesController.prototype, "getAllQuotes", null);
QuotesController = tslib_1.__decorate([
    route_1.controller()
], QuotesController);
exports.QuotesController = QuotesController;
//# sourceMappingURL=quotesController.js.map