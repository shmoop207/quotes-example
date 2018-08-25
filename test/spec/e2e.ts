import    chai = require('chai');
import    request = require('supertest');
import   {createApp,App} from 'appolo'
import   Q = require('bluebird');
let should = chai.should();

describe('Appolo e2e', () => {
    let app:App;

    beforeEach(async () => {
        app = await createApp({
            port: 8183,
            environment: "testing",
        }).launch()
    });

    afterEach(async () => {
        await app.reset();
    });

    it('should get quotes', async () => {

        await Q.delay(1000)

        let res = await request(app.handle)
            .get('/getAllQuotes');

        res.body.AAPL.lastPrice.should.be.ok
    })
});