import {define, singleton, inject, EventDispatcher} from 'appolo';
import {socket,SocketController,action} from '@appolo/socket';

import    _ = require('lodash');
import    Q = require('bluebird');
import {QuotesManager} from "../managers/quotesManager";

@socket()
export class QuotesSocketController extends SocketController {

    @inject() quotesManager:QuotesManager;


    private _getSymbolsFromParam(data: string[] | string): string[] {
        return _.isArray(data) ? data : (_.isString(data) ? data.split(',') : []);
    }

    @action("subscribe")
    private _onSubscribe(data:any, callback:Function) {

        let symbols = this._getSymbolsFromParam(data);

        if (symbols) {

            _.forEach(symbols, (symbol) => {
                this.socket.join(symbol);
            });

            let quotes = this.quotesManager.getQuotes(symbols);

            _.forEach(quotes, (quote) => {
                this.socket.emit(quote.symbol, quote)
            });

            if (callback && _.isFunction(callback)) {
                (callback as Function)(quotes);
            }
        }
    }

    @action("unsubscribe")
    private _onUnSubscribe(data:any) {

        let symbols = this._getSymbolsFromParam(data);

        _.forEach(symbols, (symbol) => {

            this.socket.leave(symbol);

        });
    }

}
