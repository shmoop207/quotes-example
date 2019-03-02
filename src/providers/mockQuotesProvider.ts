"use strict";

import {define, singleton, inject, EventDispatcher,lazy} from 'appolo';
import    _ = require('lodash');
import    Q = require('bluebird');
import    moment = require('moment');
import {Util} from "../util/util";
import {IQuote} from "../common/IQuote";
import {IEnv} from "../../config/env/IEnv";
import {IQuotesProvider} from "./IQuotesProvider";
import {ILogger} from "@appolo/logger";


@define()
@singleton()
@lazy()
export class MockQuotesProvider extends EventDispatcher implements IQuotesProvider{

    @inject() env :IEnv;
    @inject() logger :ILogger;

    private readonly UPDATE_RATE=  1000;
    private readonly VOLATILITY =  1;


    private _quotes: { [index: string]: IQuote };
    private _originQuotes: { [index: string]: IQuote };
    private _interval: number;

    constructor() {
        super();

        this._quotes = {};
        this._originQuotes = {}
    }

    public initialize() {

        this._interval = this.UPDATE_RATE / this.env.symbols.length;

        _.forEach(this.env.symbols, (symbol) => {

            let lastPrice = Util.toFixed(_.random(100, 500, true));

            this._originQuotes[symbol] = {
                lastPrice: lastPrice,
                symbol: symbol,
                dailyChange:0,
                dailyChangePercent:0
            };

            this._quotes[symbol] = _.clone(this._originQuotes[symbol]);

        });

        this._randomizeQuotes();
    }


    private _randomizeQuotes() {

        let randomIndex = _.random(this.env.symbols.length - 1),
            randomSymbol = this.env.symbols[randomIndex],
            quote = this._quotes[randomSymbol];

        let change = Math.round(_.random(-this.VOLATILITY, this.VOLATILITY, true) * 100) / 100,
            originLastPrice = this._originQuotes[quote.symbol].lastPrice;

        quote.lastDate = moment().utc().valueOf();
        quote.volume = _.random(100, 1000) * 10;
        quote.lastPrice = Util.toFixed(quote.lastPrice + change, 2);
        quote.dailyChange = Util.toFixed(quote.lastPrice - originLastPrice, 2);
        quote.dailyChangePercent = Util.toFixed((1 - (originLastPrice / quote.lastPrice )) * 100, 2);

        this.fireEvent('quoteReceived', _.clone(quote));

        setTimeout(() => this._randomizeQuotes(), this._interval)
    }


}
