import {define, singleton, inject,initMethod, injectFactoryMethod} from 'appolo-http';
import    _ = require('lodash');
import    Q = require('bluebird');
import {SocketClient} from "../models/socketClient";


@define()
@singleton()
export class SocketClientsManager{

    private _clients:{[index:string]:SocketClient};
    @inject() io:SocketIO.Server;
    @injectFactoryMethod("socketClient") private createSocketClient:()=>SocketClient;

    constructor () {
        this._clients = {};
    }

    @initMethod()
    public initialize () {

        this.io.sockets.on('connection', this._onSocketConnection.bind(this));
    }

    public getClientById (id) {
        return this._clients[id]
    }

   private _onSocketConnection (socket) {
        let socketClient = this.createSocketClient();

        socketClient.initialize(socket);

        socketClient.on('disconnect', this._onSocketDisconnected, this);

        this._clients[socketClient.getId()] = socketClient;

    }

    private _onSocketDisconnected (socketClient:SocketClient) {

        socketClient.un('disconnect', this._onSocketDisconnected, this);

        let socketId = socketClient.getId();

        this._clients[socketId] = null;
        delete this._clients[socketId];
    }
}