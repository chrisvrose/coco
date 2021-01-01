import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import { Server } from 'http';
import UserController from '../controllers/UserController';
import { Controller } from '../misc/BaseController';
import Route from '../misc/decorators/Route';
import Application, { appliance } from './../Application';
import { authRole } from './auth';
chai.use(chaiHttp);

class fakeController extends Controller {
    @Route('get', '/fakeauthable', authRole(1))
    async one42() {
        return 42;
    }
}

describe('Authenticators', function () {
    let application: appliance;
    let server: Server;
    let userid: string;
    let atoken: string;
    before(async function () {
        //add user controller directly
        application = await Application(3000, false, UserController);
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
        const res = await chai.request(server).post('/auth/login').send({ email: 'foo@bar.baz', pwd: 'password' });
        assert.strictEqual(res.status, 200);
        const resJson = JSON.parse(res.text);
        // console.log(resJson);
        atoken = resJson.response;
        assert.typeOf(atoken, 'string', 'Atokens should be strings');
    });
    it('should assert role 1', async function () {});

    it('remove user', async function () {
        const res = await chai.request(server).delete(`/user/${userid}`);
        assert.strictEqual(res.status, 200, 'Error' + res.text);
    });

    it('Role ">="');
});
