import {IQuote} from "../common/IQuote";

export interface IQuotesProvider{
    initialize();
    on(name: "quoteReceived", fn: (quote: IQuote) => void, scope?: any)
}