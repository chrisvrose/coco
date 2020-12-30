import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import { Server } from 'http';
import 'mocha';
import Application, { appliance } from './Application';
chai.use(chaiHttp);

describe('Base Routes test', function () {
    let application: appliance;
    let server: Server;

    before(async function () {
        application = await Application();
        server = application.start();
    });
    after(async function () {
        await application.close();
    });

    it('Server exists', async () => {
        assert(server);
    });
    it('/test', async () => {
        const res = await chai.request(server).get('/test');
        assert.strictEqual(res.status, 200);
        const resParsed = JSON.parse(res.text);
        assert.strictEqual(resParsed.ok, true);
        // resParsed.ok.should.be(true);
    });

    it('/teapot - test for status codes', async () => {
        const res = await chai.request(server).get('/test/teapot');
        assert.strictEqual(res.status, 418);
        const resParsed = JSON.parse(res.text);
        assert.strictEqual(resParsed.ok, true);
        assert(resParsed.status);
    });
    it('/noop - returns 404', async () => {
        const res = await chai.request(server).get('/test/noop');
        assert.strictEqual(res.status, 404);
        const resParsed = JSON.parse(res.text);
        assert.strictEqual(resParsed.ok, false);
        assert.strictEqual(resParsed.status, 'not found');
    });
});
