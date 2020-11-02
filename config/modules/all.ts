import {App} from '@appolo/core';
import {ViewEngines, ViewModule} from '@appolo/view';
import {SocketModule} from '@appolo/socket';
import {LoggerModule} from '@appolo/logger';
import {ValidationModule} from '@appolo/validator';


export = async function (app: App) {
    app.module.use(LoggerModule)
        .use(SocketModule.for({socket: {transports: ['polling', 'websocket']}}))
        .use(ValidationModule)
        .use(ViewModule.for({viewEngine: ViewEngines.nunjucks}));
}
