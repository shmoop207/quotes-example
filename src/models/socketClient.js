"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const appolo_1 = require("appolo");
const socket_1 = require("@appolo/socket");
const _ = require("lodash");
let SocketClient = class SocketClient extends socket_1.SocketController {
    _getSymbolsFromParam(data) {
        return _.isArray(data) ? data : (_.isString(data) ? data.split(',') : []);
    }
    _onSubscribe(data, callback) {
        let symbols = this._getSymbolsFromParam(data);
        if (symbols) {
            _.forEach(symbols, (symbol) => {
                this.socket.join(symbol);
            });
            let quotes = this.quotesManager.getQuotes(symbols);
            _.forEach(quotes, (quote) => {
                this.socket.emit(quote.symbol, quote);
            });
            if (callback && _.isFunction(callback)) {
                callback(quotes);
            }
        }
    }
    _onUnSubscribe(data) {
        let symbols = this._getSymbolsFromParam(data);
        _.forEach(symbols, (symbol) => {
            this.socket.leave(symbol);
        });
    }
};
tslib_1.__decorate([
    appolo_1.inject()
], SocketClient.prototype, "quotesManager", void 0);
tslib_1.__decorate([
    socket_1.action("subscribe")
], SocketClient.prototype, "_onSubscribe", null);
tslib_1.__decorate([
    socket_1.action("unsubscribe")
], SocketClient.prototype, "_onUnSubscribe", null);
SocketClient = tslib_1.__decorate([
    socket_1.socket()
], SocketClient);
exports.SocketClient = SocketClient;
//# sourceMappingURL=socketClient.js.map