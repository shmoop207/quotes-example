"use strict";
import {controller,Controller,get} from '@appolo/route';
import {inject} from '@appolo/inject';
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
