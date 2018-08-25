import {App} from 'appolo';
import    logger = require('./loggers/logger');
import    socketIo = require('./io/socket.io');


export = async function (app:App) {
    await app.module(logger());
    await app.module(socketIo());
}
