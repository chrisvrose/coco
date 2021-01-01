import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import { Server } from 'http';
import 'mocha';
import Application, { appliance } from './Application';
import Route from './misc/decorators/Route';
import { Controller } from './misc/types/BaseController';
chai.use(chaiHttp);

class abc extends Controller {
    @Route('get', '/fakeroute')
    async someRoute() {
        return 42;
    }
}
describe('Base Routes test', function () {
    let application: appliance;
    let server: Server;

    before(async function () {
        application = await Application(3000, false, abc);
        server = application.start();
    });
    after(async function () {
        server.close();
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
    it('/fakeroute - Can add routes controllers', async function () {
        const res = await chai.request(server).get('/fakeroute');
        assert.strictEqual(res.status, 200);
        const resParsed = JSON.parse(res.text);
        assert.strictEqual(resParsed.ok, true);
        assert.strictEqual(resParsed.response, 42);
    });
});
