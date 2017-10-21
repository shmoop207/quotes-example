"use strict";
import {define, singleton, inject, EventDispatcher,Controller,pathGet,validation,validator,IFactory,injector} from 'appolo-http';
import {IQuotesProvider} from "../providers/IQuotesProvider";
import {IEnv} from "../../config/environments/IEnv";

@define()
@singleton()
export class QuotesProviderFactory implements IFactory<IQuotesProvider>{

@inject() env:IEnv;

    public get():IQuotesProvider{

        switch(this.env.quotesProvider){
            case "mock":
                return injector.get('mockQuotesProvider')

            case "yahoo":
                return injector.get('yahooQuotesProvider');

        }
    }


}
