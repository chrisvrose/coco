import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import { Server } from 'http';
import 'mocha';
import 'reflect-metadata';
import Application, { appliance } from '../Application';
import UserController from './UserController';
chai.use(chaiHttp);

describe('User Controller', function () {
    let application: appliance;
    let server: Server;
    let userid: string;
    let atoken: string;
    before(async function () {
        //add user controller directly
        application = await Application(3000, false, UserController);
    });
    after(async function () {
        server.close();
        return application.close();
    });
    it('Start Server', async function () {
        server = application.start();
    });
    //c
    it('Register user(with bogus role)', async function () {
        const res = await chai
            .request(server)
            .post('/user')
            .send({ email: 'foo@bar.baz', name: 'Foo bar', pwd: 'password', role: 1 });

        const text = res.text;
        assert.strictEqual(res.status, 200);
        const body = JSON.parse(text);
        assert(body, 'body exists');
        assert.typeOf(body.response, 'string', 'Expected string');
        userid = body.response;
    });
    it('login fails for incorrect pwd', async function () {
        const res = await chai.request(server).post('/auth').send({ email: 'foo@bar.baz', pwd: 'notpassword' });
        assert.strictEqual(res.status, 401);
    });
    it('login gets a token-like', async function () {
        const res = await chai.request(server).post('/auth').send({ email: 'foo@bar.baz', pwd: 'password' });
        const { text } = res;
        assert.strictEqual(res.status, 200);

        const body = JSON.parse(text);
        assert.typeOf(body.response, 'string');
        atoken = body.response;
    });
    //r
    it('get created user', async function () {
        const res = await chai.request(server).get('/user/' + userid);
        assert.strictEqual(res.status, 200);
        const { text } = res;
        const body = JSON.parse(text);
        assert.strictEqual(body.ok, true);
        assert.strictEqual(body.response.email, 'foo@bar.baz', 'Expected correct email');
        assert.notExists(body.response.pwd, 'Password should not be send');
        assert.strictEqual(body.response.role, 0, 'default role expected');
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
    //d
    it('cant remove user without authing', async function () {
        const res = await chai.request(server).delete(`/user/${userid}`);
        assert.strictEqual(res.status, 403);
    });
    it('remove user', async function () {
        const res = await chai.request(server).delete(`/user/${userid}`).set('authorization', `bearer ${atoken}`);
        assert.strictEqual(res.status, 200);
    });

    //update?
    it('update users');
    // TODO add logout
    it('logout');
    it('logout all works');
});
