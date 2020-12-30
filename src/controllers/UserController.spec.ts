import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import { Server } from 'http';
import 'mocha';
import 'reflect-metadata';
import Application, { appliance } from '../Application';
import routeIntegrator from '../misc/routeIntegrator';
import UserController from './UserController';
chai.use(chaiHttp);

describe('User Controller', function () {
    let application: appliance;
    let server: Server;
    let userid: string;
    before(async function () {
        application = await Application();
    });
    after(async function () {
        server.close();
        return application.close();
    });
    it('Can add routes for controller and start', async function () {
        routeIntegrator(application.app, UserController);
        server = application.start();
    });

    it('Register user', async function () {
        const res = await chai
            .request(server)
            .post('/user')
            .send({ email: 'foo@bar.baz', name: 'Foo bar', pwd: 'password', role: 1 });

        const text = res.text;
        assert.strictEqual(res.status, 200);
        const body = JSON.parse(text);
        assert(body, 'body exists');
        assert.strictEqual(typeof body.response, 'string', 'Expected string');
        userid = body.response;
    });
    it('get created user', async function () {
        const res = await chai.request(server).get('/user/' + userid);
        assert.strictEqual(res.status, 200);
        const { text } = res;
        const body = JSON.parse(text);
        assert.strictEqual(body.ok, true);
        assert.strictEqual(body.response.email, 'foo@bar.baz', 'Expected correct email');
        assert.notExists(body.response.pwd, 'Password should not be send');
    });
    it('get users', async function () {
        const res = await chai.request(server).get('/user');
        assert.strictEqual(res.status, 200);
        const { text } = res;
        const body = JSON.parse(text);
        assert.strictEqual(body.ok, true);
        //atleast one user
        assert.isAtLeast(body.response.length, 1);
    });
    it('remove user', async function () {
        const res = await chai.request(server).delete(`/user/${userid}`);
        assert.strictEqual(res.status, 200);
    });
});