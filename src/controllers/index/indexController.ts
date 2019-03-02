"use strict";
import {controller, singleton, inject, EventDispatcher,Controller,get} from 'appolo';
import {view} from '@appolo/view';
import {IEnv} from "../../../config/env/IEnv";

@controller()
export class IndexController extends Controller{

    @inject() env:IEnv;

    @get("/")
    @view()
    public async index () {

       return {socketUrl: this.env.socketUrl};
    }
}