import winston = require('winston');
import    {Injector} from 'appolo';



export = function(){

    return function(inject :Injector){
        const logger = winston.createLogger({
            level: 'info',
            format: winston.format.json(),
            transports: [

            ]
        });

        logger.add(new winston.transports.Console({
            format: winston.format.simple()
        }));

        inject.addObject('logger', logger);



    }
}
