import {define, singleton, inject, EventDispatcher,initMethod} from 'appolo';
import {SocketProvider} from '@appolo/socket';
import    _ = require('lodash');
import    Q = require('bluebird');
import {IQuotesProvider} from "../providers/IQuotesProvider";
import {IQuote} from "../common/IQuote";

@define()
@singleton()
export class QuotesManager {

    private _quotes: { [index: string]: IQuote };

    @inject() private quotesProvider: IQuotesProvider;
    @inject() private socketProvider: SocketProvider;

    constructor() {
        this._quotes = {};
    }

    @initMethod()
    public initialize() {

        this.quotesProvider.on('quoteReceived', this._onQuoteReceived, this);
    }

    private _onQuoteReceived(newQuote: IQuote) {

            this._quotes[newQuote.symbol] = newQuote;

            this.socketProvider.sendToRoom(newQuote.symbol,'quoteReceived', newQuote);
    }

    public getQuote(symbol: string): IQuote {
        return this.getQuotes([symbol])[symbol];
    }


    public getQuotes(symbols: string[]): { [index: string]: IQuote } {

        let output = {};

        _.forEach(symbols, (symbol: string) => {
            let quote = this._quotes[symbol];

            quote && (output[symbol] = quote);
        });

        return output;
    }


    public getAllQuotes(): { [index: string]: IQuote } {
        return this._quotes;
    }

}

