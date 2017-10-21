"use strict";
import {define, singleton, bootstrap, inject, IBootstrap} from 'appolo-http';
import    _ = require('lodash');
import    Q = require('bluebird');
import {IQuotesProvider} from "./providers/IQuotesProvider";
import {LoggerInstance} from "winston";

@define()
@singleton()
@bootstrap()
export class Bootstrap implements IBootstrap {
    @inject() quotesProvider:IQuotesProvider;
    @inject() logger:LoggerInstance;


    public async run() {

        this.quotesProvider.initialize();

        this.logger.info("app started");
    }


}