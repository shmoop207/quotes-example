"use strict";
import {define, factory, IFactory, inject, Injector, singleton} from '@appolo/inject';
import {IQuotesProvider} from "../providers/IQuotesProvider";
import {IEnv} from "../../config/env/IEnv";
import {MockQuotesProvider} from "../providers/mockQuotesProvider";

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

        }
    }


}
