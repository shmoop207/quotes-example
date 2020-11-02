"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockQuotesProvider = void 0;
const tslib_1 = require("tslib");
const inject_1 = require("@appolo/inject");
const events_1 = require("@appolo/events");
const _ = require("lodash");
const util_1 = require("../util/util");
let MockQuotesProvider = class MockQuotesProvider extends events_1.EventDispatcher {
    constructor() {
        super();
        this.UPDATE_RATE = 1000;
        this.VOLATILITY = 1;
        this._quotes = {};
        this._originQuotes = {};
    }
    initialize() {
        this._interval = this.UPDATE_RATE / this.env.symbols.length;
        _.forEach(this.env.symbols, (symbol) => {
            let lastPrice = util_1.Util.toFixed(_.random(100, 500, true));
            this._originQuotes[symbol] = {
                lastPrice: lastPrice,
                symbol: symbol,
                dailyChange: 0,
                dailyChangePercent: 0
            };
            this._quotes[symbol] = _.clone(this._originQuotes[symbol]);
        });
        this._randomizeQuotes();
    }
    _randomizeQuotes() {
        let randomIndex = _.random(this.env.symbols.length - 1), randomSymbol = this.env.symbols[randomIndex], quote = this._quotes[randomSymbol];
        let change = Math.round(_.random(-this.VOLATILITY, this.VOLATILITY, true) * 100) / 100, originLastPrice = this._originQuotes[quote.symbol].lastPrice;
        quote.lastDate = Date.now();
        quote.volume = _.random(100, 1000) * 10;
        quote.lastPrice = util_1.Util.toFixed(quote.lastPrice + change, 2);
        quote.dailyChange = util_1.Util.toFixed(quote.lastPrice - originLastPrice, 2);
        quote.dailyChangePercent = util_1.Util.toFixed((1 - (originLastPrice / quote.lastPrice)) * 100, 2);
        this.fireEvent('quoteReceived', _.clone(quote));
        setTimeout(() => this._randomizeQuotes(), this._interval);
    }
};
tslib_1.__decorate([
    inject_1.inject()
], MockQuotesProvider.prototype, "env", void 0);
tslib_1.__decorate([
    inject_1.inject()
], MockQuotesProvider.prototype, "logger", void 0);
MockQuotesProvider = tslib_1.__decorate([
    inject_1.define(),
    inject_1.singleton(),
    inject_1.lazy()
], MockQuotesProvider);
exports.MockQuotesProvider = MockQuotesProvider;
//# sourceMappingURL=mockQuotesProvider.js.map