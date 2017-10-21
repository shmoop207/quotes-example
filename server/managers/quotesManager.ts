import {define, singleton, inject, EventDispatcher,initMethod} from 'appolo-http';
import    _ = require('lodash');
import    Q = require('bluebird');
import {IQuotesProvider} from "../providers/IQuotesProvider";
import {IQuote} from "../models/IQuote";

@define()
@singleton()
export class QuotesManager {

    private _quotes: { [index: string]: IQuote };

    @inject() private quotesProvider: IQuotesProvider;
    @inject() private io: SocketIO.Server;

    constructor() {
        this._quotes = {};
    }

    @initMethod()
    public initialize() {

        this.quotesProvider.on('quoteReceived', this._onQuoteReceived, this);
    }

    private _onQuoteReceived(newQuote: IQuote) {

            this._quotes[newQuote.symbol] = newQuote;

            this.io.sockets.in(newQuote.symbol).emit('quoteReceived', newQuote);

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

