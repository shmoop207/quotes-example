"use strict";
const sio = require("socket.io");
module.exports = function () {
    return function (injector, httpServer) {
        let io = sio.listen(httpServer);
        injector.addObject('io', io);
    };
};
//# sourceMappingURL=socket.io.js.map