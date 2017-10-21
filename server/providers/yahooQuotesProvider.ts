"use strict";

import {define, singleton, inject, EventDispatcher,lazy} from 'appolo-http';
import    _ = require('lodash');
import    Q = require('bluebird');
import    yahooFinance = require('yahoo-finance');
import    moment = require('moment');
import {Util} from "../util/util";
import {IQuote} from "../models/IQuote";
import {IEnv} from "../../config/environments/IEnv";
import {IQuotesProvider} from "./IQuotesProvider";
import {LoggerInstance} from "winston";



@define()
@singleton()
@lazy()
export class YahooQuotesProvider extends EventDispatcher implements IQuotesProvider{

    @inject() env :IEnv;
    @inject() logger :LoggerInstance;


    private _quotes: { [index: string]: IQuote };


    constructor  () {
        super();
        this._quotes = {}

    }

    public initialize  () {
        this.getQuotes();
    }

    public getQuotes  () {
        yahooFinance.snapshot({
            symbols: this.env.symbols,
            fields: ['b2', 'b3', 'g', 'h', 'l1', 't1', 'd1', 'c1', 'm', 'v', 'a2','c6','k2','p2']
        }, this._onSnapshotResult.bind(this));
    }

    private _onSnapshotResult (err, data, url, symbol) {

        if (err) {
            this.logger.error("failed to get yahoo snapshot ", {error: err});
            return;
        }
        let quotes = this._marshal(data);

        _.forEach(quotes,(quote)=>{
            this._quotes[quote.symbol] = quote;
            this.fireEvent('quoteReceived', quote);
        });

        setTimeout(this.getQuotes.bind(this), 1000);
    }

   private  _marshal (data) {


       let output  = _.map(data,  (quote:any)=> {

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


}