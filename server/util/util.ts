import _ = require('lodash');

export class Util {
    static toFixed(number: number, precision?: number) {

        number = parseFloat(number.toPrecision(12));

        if (precision) {
            number = parseFloat(number.toFixed(precision));
        }

        return number;
    }
}

