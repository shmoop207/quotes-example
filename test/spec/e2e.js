"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chai = require("chai");
const request = require("supertest");
const appolo_1 = require("appolo");
const Q = require("bluebird");
let should = chai.should();
describe('Appolo e2e', () => {
    let app;
    beforeEach(() => tslib_1.__awaiter(this, void 0, void 0, function* () {
        app = yield appolo_1.createApp({
            port: 8183,
            environment: "testing",
        }).launch();
    }));
    afterEach(() => tslib_1.__awaiter(this, void 0, void 0, function* () {
        yield app.reset();
    }));
    it('should get quotes', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        yield Q.delay(1000);
        let res = yield request(app.handle)
            .get('/getAllQuotes');
        res.body.AAPL.lastPrice.should.be.ok;
    }));
});
//# sourceMappingURL=e2e.js.map