"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const appolo_1 = require("appolo");
let SocketClientsManager = class SocketClientsManager {
    constructor() {
        this._clients = {};
    }
    initialize() {
        this.io.sockets.on('connection', this._onSocketConnection.bind(this));
    }
    getClientById(id) {
        return this._clients[id];
    }
    _onSocketConnection(socket) {
        let socketClient = this.createSocketClient();
        socketClient.initialize(socket);
        socketClient.on('disconnect', this._onSocketDisconnected, this);
        this._clients[socketClient.getId()] = socketClient;
    }
    _onSocketDisconnected(socketClient) {
        socketClient.un('disconnect', this._onSocketDisconnected, this);
        let socketId = socketClient.getId();
        this._clients[socketId] = null;
        delete this._clients[socketId];
    }
};
tslib_1.__decorate([
    appolo_1.inject()
], SocketClientsManager.prototype, "io", void 0);
tslib_1.__decorate([
    appolo_1.injectFactoryMethod("socketClient")
], SocketClientsManager.prototype, "createSocketClient", void 0);
tslib_1.__decorate([
    appolo_1.initMethod()
], SocketClientsManager.prototype, "initialize", null);
SocketClientsManager = tslib_1.__decorate([
    appolo_1.define(),
    appolo_1.singleton()
], SocketClientsManager);
exports.SocketClientsManager = SocketClientsManager;
//# sourceMappingURL=socketClientsManager.js.map