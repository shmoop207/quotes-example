"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const appolo_http_1 = require("appolo-http");
const _ = require("lodash");
const yahooFinance = require("yahoo-finance");
const moment = require("moment");
let YahooQuotesProvider = class YahooQuotesProvider extends appolo_http_1.EventDispatcher {
    constructor() {
        super();
        this._quotes = {};
    }
    initialize() {
        this.getQuotes();
    }
    getQuotes() {
        yahooFinance.snapshot({
            symbols: this.env.symbols,
            fields: ['b2', 'b3', 'g', 'h', 'l1', 't1', 'd1', 'c1', 'm', 'v', 'a2', 'c6', 'k2', 'p2']
        }, this._onSnapshotResult.bind(this));
    }
    _onSnapshotResult(err, data, url, symbol) {
        if (err) {
            this.logger.error("failed to get yahoo snapshot ", { error: err });
            return;
        }
        let quotes = this._marshal(data);
        _.forEach(quotes, (quote) => {
            this._quotes[quote.symbol] = quote;
            this.fireEvent('quoteReceived', quote);
        });
        setTimeout(this.getQuotes.bind(this), 1000);
    }
    _marshal(data) {
        let output = _.map(data, (quote) => {
            let dto = {
                lastDate: moment(quote.lastTradeDate + " " + quote.lastTradeTime, "MM/DD/YYYY hh:mm").valueOf(),
                lastPrice: parseFloat(quote.lastTradePriceOnly),
                dailyChange: parseFloat(quote.change),
                dailyChangePercent: parseFloat(quote.changeInPercent),
                volume: quote.averageDailyVolume,
                symbol: quote.symbol
            };
            return dto;
        });
        return output;
    }
};
tslib_1.__decorate([
    appolo_http_1.inject()
], YahooQuotesProvider.prototype, "env", void 0);
tslib_1.__decorate([
    appolo_http_1.inject()
], YahooQuotesProvider.prototype, "logger", void 0);
YahooQuotesProvider = tslib_1.__decorate([
    appolo_http_1.define(),
    appolo_http_1.singleton(),
    appolo_http_1.lazy()
], YahooQuotesProvider);
exports.YahooQuotesProvider = YahooQuotesProvider;
//# sourceMappingURL=yahooQuotesProvider.js.map