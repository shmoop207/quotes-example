import {App} from 'appolo';
import {ViewEngines, ViewModule} from '@appolo/view';
import {SocketModule} from '@appolo/socket';
import {LoggerModule} from '@appolo/logger';


export = async function (app: App) {
    await app.module(LoggerModule);
    await app.module(new SocketModule());
    await app.module(new ViewModule({viewEngine: ViewEngines.nunjucks}));
}
