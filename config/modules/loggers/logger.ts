import winston = require('winston');
import {Injector} from 'appolo-http';



export = function(){

    return function(inject :Injector){
        let transports = [];


        transports.push(new (winston.transports.Console)({
            json: true,
            timestamp: true,
            handleExceptions: true
        }));


        let logger = new (winston.Logger)({
            transports: transports,
            exitOnError: false
        });

        inject.addObject('logger', logger);



    }
}
