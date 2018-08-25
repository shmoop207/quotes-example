"use strict";
import {define, singleton, bootstrap, inject, IBootstrap} from 'appolo';
import    _ = require('lodash');
import    Q = require('bluebird');
import {IQuotesProvider} from "./providers/IQuotesProvider";
import {Logger} from "winston";

@define()
@singleton()
@bootstrap()
export class Bootstrap implements IBootstrap {
    @inject() quotesProvider:IQuotesProvider;
    @inject() logger:Logger;


    public async run() {

        this.quotesProvider.initialize();

        this.logger.info("app started");
    }


}