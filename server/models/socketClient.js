"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const appolo_http_1 = require("appolo-http");
const _ = require("lodash");
let SocketClient = class SocketClient extends appolo_http_1.EventDispatcher {
    initialize(socket) {
        this._socket = socket;
        this._symbols = [];
        this._socket.on('subscribe', this._onSubscribe.bind(this));
        this._socket.on('unsubscribe', this._onUnSubscribe.bind(this));
        this._socket.on('disconnect', this._onSocketDisconnect.bind(this));
    }
    _getSymbolsFromParam(data) {
        return _.isArray(data) ? data : (_.isString(data) ? data.split(',') : []);
    }
    _onSubscribe(data, callback) {
        let symbols = this._getSymbolsFromParam(data);
        if (symbols) {
            _.forEach(symbols, (symbol) => {
                this._socket.join(symbol);
            });
            let quotes = this.quotesManager.getQuotes(symbols);
            _.forEach(quotes, (quote) => {
                this._socket.emit(quote.symbol, quote);
            });
            if (callback && _.isFunction(callback)) {
                callback(quotes);
            }
        }
    }
    getId() {
        return this._socket.id;
    }
    _onUnSubscribe(data) {
        let symbols = this._getSymbolsFromParam(data);
        _.forEach(symbols, (symbol) => {
            this._socket.leave(symbol);
        });
    }
    _onSocketDisconnect() {
        this.fireEvent('disconnect', this);
    }
};
tslib_1.__decorate([
    appolo_http_1.inject()
], SocketClient.prototype, "quotesManager", void 0);
SocketClient = tslib_1.__decorate([
    appolo_http_1.define()
], SocketClient);
exports.SocketClient = SocketClient;
//# sourceMappingURL=socketClient.js.map