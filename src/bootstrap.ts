"use strict";
import { bootstrap, IBootstrap} from '@appolo/engine';
import {define, singleton, inject} from '@appolo/inject';
import {ILogger} from '@appolo/logger';

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
