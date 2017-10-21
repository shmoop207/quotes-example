"use strict";
import {define, singleton, inject, EventDispatcher,Controller,pathGet} from 'appolo-http';
import {IEnv} from "../../../config/environments/IEnv";

@define()
export class IndexController extends Controller{

    @inject() env:IEnv;

    @pathGet("/")
    public index () {

        this.res.render({socketUrl: this.env.socketUrl});
    }
}