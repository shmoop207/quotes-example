"use strict";
import {define, singleton, inject, EventDispatcher,Controller,pathGet,validation,validator} from 'appolo-http';
import {QuotesManager} from "../managers/quotesManager";

@define()
export class QuotesController extends Controller{

    @inject() quotesManager:QuotesManager;

    @pathGet("/getQuote")
    @validation("symbol",validator.string().required())
    public getQuote () {
        let symbol = this.req.model.symbol;

        let quote = this.quotesManager.getQuote(symbol);

        this.sendOk(quote);
    }
    @pathGet("/getQuotes")
    @validation("symbols",validator.array().items(validator.string()).required())
    public getQuotes () {
        let symbols = this.req.model.symbol.split(',') ;

        let quotes = this.quotesManager.getQuotes(symbols);

        this.sendOk(quotes);
    }
    @pathGet("/getAllQuotes")
    public getAllQuotes () {

        let quotes = this.quotesManager.getAllQuotes();

        this.sendOk(quotes);
    }
}