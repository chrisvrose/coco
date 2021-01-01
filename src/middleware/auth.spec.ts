import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import { Server } from 'http';
import UserController from '../controllers/UserController';
import Route from '../misc/decorators/Route';
import { Controller } from '../misc/types/BaseController';
import Application, { appliance } from './../Application';
import { authRole } from './auth';
chai.use(chaiHttp);

class fakeController extends Controller {
    //strictly for 1 only
    @Route('get', '/fakeauthable1', authRole(0))
    async one42() {
        return 42;
    }
    //0 and above
    @Route('get', '/fakeauthable2', authRole(0, true))
    async one43() {
        return 43;
    }
    //two exactly
    @Route('get', '/fakeauthable3', authRole(1))
    async one44() {
        return 44;
    }
}

describe('Authenticators', function () {
    let application: appliance;
    let server: Server;
    let userid: string;
    let atoken: string;
    before(async function () {
        //add user controller directly
        application = await Application(3000, false, UserController, fakeController);
        server = application.start();
    });
    after(async function () {
        server.close();
        return application.close();
    });
    it('Add a user', async function () {
        assert(application);
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
    it('Login', async function () {
        const res = await chai.request(server).post('/auth').send({ email: 'foo@bar.baz', pwd: 'password' });
        assert.strictEqual(res.status, 200);
        const resJson = JSON.parse(res.text);
        // console.log(resJson);
        atoken = resJson.response;
        assert.typeOf(atoken, 'string', 'Atokens should be strings');
    });
    it('should not work not logged in', async function () {
        const res = await chai.request(server).get('/fakeauthable1');
        assert.strictEqual(res.status, 403);
    });
    it('= check', async function () {
        const res = await chai.request(server).get('/fakeauthable1').set('authorization', `bearer ${atoken}`);
        assert.strictEqual(res.status, 200);
    });

    it('= check, for incorrect role should yield 403', async function () {
        const res = await chai.request(server).get('/fakeauthable3').set('authorization', `bearer ${atoken}`);
        assert.strictEqual(res.status, 403);
    });
    it('>= check', async function () {
        const res = await chai.request(server).get('/fakeauthable2').set('authorization', `bearer ${atoken}`);
        assert.strictEqual(res.status, 200);
    });

    it('remove user', async function () {
        const res = await chai.request(server).delete(`/user/${userid}`).set('authorization', `bearer ${atoken}`);
        assert.strictEqual(res.status, 200, 'Error' + res.text);
    });
});
