"use strict";
import {controller, singleton, inject, EventDispatcher,Controller,get} from 'appolo';
import {IEnv} from "../../../config/env/IEnv";

@controller()
export class IndexController extends Controller{

    @inject() env:IEnv;

    @get("/")
    public async index () {

        await this.res.render({socketUrl: this.env.socketUrl});
    }
}