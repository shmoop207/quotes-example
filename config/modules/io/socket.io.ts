import  sio = require('socket.io');
import  http = require('http');
import    {Injector} from 'appolo';

export = function () {

    return function (injector: Injector, httpServer: http.Server) {

        let io = sio.listen(httpServer);

        injector.addObject('io', io);
    }
}














