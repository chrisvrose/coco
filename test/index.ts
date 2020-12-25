import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';
import app from '../src';
chai.use(chaiHttp);

describe('Sanity', function () {
    it('Server exists', async () => {
        assert((await app).app);
    });
    it('sanity test', async () => {
        const res = await chai.request((await app).app).get('/test');
        assert.strictEqual(res.status, 200);
        const resParsed = JSON.parse(res.text);
        assert.strictEqual(resParsed.ok, true);
        // resParsed.ok.should.be(true);
    });

    it('working status codes', async () => {
        const res = await chai.request((await app).app).get('/test/teapot');
        assert.strictEqual(res.status, 418);
        const resParsed = JSON.parse(res.text);
        assert.strictEqual(resParsed.ok, true);
        assert(resParsed.status);
    });
    it('working not found', async () => {
        const res = await chai.request((await app).app).get('/test/noop');
        assert.strictEqual(res.status, 404);
        const resParsed = JSON.parse(res.text);
        assert.strictEqual(resParsed.ok, false);
        assert.strictEqual(resParsed.status, 'not found');
    });
});

describe('User tests', function () {
    it('should get users', async () => {
        const res = await chai.request((await app).app).get('/user');
        console.log(res.text);
        assert.strictEqual(res.status, 200);
    });
    it('should make users', async () => {
        const res = await chai
            .request((await app).app)
            .post('/user')
            .set('content-type', 'application/json')
            .send({ email: 'habababa', pwd: 'password', role: 1 });
        console.log(res.text);
        assert.strictEqual(res.status, 200);
    });
});

describe('Close db', function () {
    it('Close server', async () => {
        await (await app).close();
    });
});
