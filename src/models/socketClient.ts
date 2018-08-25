import {define, singleton, inject, EventDispatcher} from 'appolo';
import  sio = require('socket.io');

import    _ = require('lodash');
import    Q = require('bluebird');
import {QuotesManager} from "../managers/quotesManager";
import {IQuote} from "./IQuote";

@define()
export class SocketClient extends EventDispatcher {

    private _socket: SocketIO.Socket;
    private _symbols: IQuote[];

    @inject() quotesManager:QuotesManager

    public initialize(socket: SocketIO.Socket) {

        this._socket = socket;
        this._symbols = [];

        this._socket.on('subscribe', this._onSubscribe.bind(this));
        this._socket.on('unsubscribe', this._onUnSubscribe.bind(this));
        this._socket.on('disconnect', this._onSocketDisconnect.bind(this));
    }

    private _getSymbolsFromParam(data: string[] | string): string[] {
        return _.isArray(data) ? data : (_.isString(data) ? data.split(',') : []);
    }


    private _onSubscribe(data:any, callback:Function) {

        let symbols = this._getSymbolsFromParam(data);

        if (symbols) {

            _.forEach(symbols, (symbol) => {
                this._socket.join(symbol);
            });

            let quotes = this.quotesManager.getQuotes(symbols);

            _.forEach(quotes, (quote) => {
                this._socket.emit(quote.symbol, quote)
            });

            if (callback && _.isFunction(callback)) {
                (callback as Function)(quotes);
            }
        }
    }


    public getId() {
        return this._socket.id
    }

    private _onUnSubscribe(data:any) {

        let symbols = this._getSymbolsFromParam(data);

        _.forEach(symbols, (symbol) => {

            this._socket.leave(symbol);

        });
    }

    private _onSocketDisconnect() {
        this.fireEvent('disconnect', this);
    }
}
