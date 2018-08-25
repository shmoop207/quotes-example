"use strict";
import {define, factory, IFactory, inject, Injector, singleton} from 'appolo';
import {IQuotesProvider} from "../providers/IQuotesProvider";
import {IEnv} from "../../config/env/IEnv";
import {MockQuotesProvider} from "../providers/mockQuotesProvider";
import {YahooQuotesProvider} from "../providers/yahooQuotesProvider";

@define()
@singleton()
@factory()
export class QuotesProvider implements IFactory<IQuotesProvider> {

    @inject() env: IEnv;
    @inject() injector: Injector

    public get(): IQuotesProvider {

        switch (this.env.quotesProvider) {
            case "mock":
                return this.injector.get(MockQuotesProvider);

            case "yahoo":
                return this.injector.get(YahooQuotesProvider);

        }
    }


}
