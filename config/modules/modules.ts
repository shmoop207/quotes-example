import appolo = require('appolo-http');
import    logger = require('./loggers/logger');
import    socketIo = require('./io/socket.io');


export = function () {
    appolo.use(logger());
    appolo.use(socketIo());
}
