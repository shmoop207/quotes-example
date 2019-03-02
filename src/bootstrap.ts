"use strict";
import {define, singleton, bootstrap, inject, IBootstrap} from 'appolo';
import {ILogger} from '@appolo/logger';
import    _ = require('lodash');
import    Q = require('bluebird');
import {IQuotesProvider} from "./providers/IQuotesProvider";

@define()
@singleton()
@bootstrap()
export class Bootstrap implements IBootstrap {
    @inject() quotesProvider:IQuotesProvider;
    @inject() logger:ILogger;


    public async run() {

        this.quotesProvider.initialize();

        this.logger.info("app started");
    }


}