"use strict";
import {controller, Controller, get, inject, IRequest, IResponse, validation, validator} from 'appolo';
import {QuotesManager} from "../managers/quotesManager";

@controller()
export class QuotesController extends Controller {

    @inject() quotesManager: QuotesManager;

    @get("/getQuote")
    @validation("symbol", validator.string().required())
    public getQuote(req: IRequest, res: IResponse, model: { symbol: string }) {

        let quote = this.quotesManager.getQuote(model.symbol);

        return quote;
    }

    @get("/getQuotes")
    @validation("symbols", validator.array().items(validator.string()).required())
    public getQuotes(req: IRequest, res: IResponse, model: { symbols: string[] }) {

        let quotes = this.quotesManager.getQuotes(model.symbols);

        this.sendOk(quotes);
    }

    @get("/getAllQuotes")
    public getAllQuotes() {

        let quotes = this.quotesManager.getAllQuotes();

        this.sendOk(quotes);
    }
}