import {IQuote} from "../models/IQuote";

export interface IQuotesProvider{
    initialize();
    on(name: "quoteReceived", fn: (quote: IQuote) => void, scope?: any)
}