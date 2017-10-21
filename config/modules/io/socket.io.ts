import  sio = require('socket.io');
import  http = require('http');
import    appolo = require('appolo-http');

export = function () {

    return function (injector: appolo.Injector, httpServer: http.Server) {

        let io = sio.listen(httpServer);

        injector.addObject('io', io);
    }
}














