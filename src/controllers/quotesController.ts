"use strict";
import {controller, Controller, get, IRequest, IResponse,query} from '@appolo/route';
import { inject} from '@appolo/inject';
import { validate,string,array} from '@appolo/validator';
import {QuotesManager} from "../managers/quotesManager";

@controller()
export class QuotesController extends Controller {

    @inject() quotesManager: QuotesManager;

    @get("/getQuote")
    @validate({"symbol":string().required()})
    public getQuote(@query() model: { symbol: string }) {

        let quote = this.quotesManager.getQuote(model.symbol);

        return quote;
    }

    @get("/getQuotes")
    @validate({"symbols":array().items(string().required())})
    public getQuotes(@query() model: { symbols: string[] }) {

        let quotes = this.quotesManager.getQuotes(model.symbols);

        this.sendOk(quotes);
    }

    @get("/getAllQuotes")
    public getAllQuotes() {

        let quotes = this.quotesManager.getAllQuotes();

        this.sendOk(quotes);
    }
}
