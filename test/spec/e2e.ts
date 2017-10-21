import    chai = require('chai');
import    request = require('supertest');
import   appolo = require('appolo-http');
import   Q = require('bluebird');
let should = chai.should();

describe('Appolo Http e2e', () => {


    beforeEach(async () => {
        await appolo.launch({
            port: 8183,
            environment: "testing",
            paths: ['config', 'server']
        });
    });

    afterEach(() => {
        appolo.launcher.reset();
    });

    it('should get quotes', async () => {

        await Q.delay(1000)

        let res = await request(appolo.handleRequest)
            .get('/getAllQuotes');

        res.body.APPL.lastprice.should.be.eq
    })
});