"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chai = require("chai");
const request = require("supertest");
const appolo = require("appolo-http");
const Q = require("bluebird");
let should = chai.should();
describe('Appolo Http e2e', () => {
    beforeEach(() => tslib_1.__awaiter(this, void 0, void 0, function* () {
        yield appolo.launch({
            port: 8183,
            environment: "testing",
            paths: ['config', 'server']
        });
    }));
    afterEach(() => {
        appolo.launcher.reset();
    });
    it('should get quotes', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        yield Q.delay(1000);
        let res = yield request(appolo.handleRequest)
            .get('/getAllQuotes');
        res.body.should.be.eq;
    }));
});
//# sourceMappingURL=e2e.js.map