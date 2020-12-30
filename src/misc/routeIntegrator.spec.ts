import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import { Server } from 'http';
import 'reflect-metadata';
import Application, { appliance as appl } from '../Application';
import { Post } from '../entities/Post';
import BaseController from './BaseController';
import ControllerEntity from './decorators/ControllerEntity';
import Route from './decorators/Route';
import routeIntegrator from './routeIntegrator';

chai.use(chaiHttp);
@ControllerEntity(Post)
class myTestController extends BaseController<Post> {
    @Route('get', '/get1')
    async fakeRoute() {
        return 1;
    }
    @Route('post', '/post1')
    async someOtherRoute() {
        return 5;
    }
    async someAnotherRoute() {
        return 6;
    }
}

describe('Route integrator', function () {
    let application: appl;
    let server: Server;
    before(async function () {
        application = await Application();
    });
    after(async function () {
        return application.close();
    });
    it('Can add methods (fake)', async function () {
        routeIntegrator(application.app, myTestController);
    });
    it('can start server', async function () {
        server = application.start();
    });
    it('Test fake route /get1', async function () {
        const res = await chai.request(server).get('/get1');
        assert.strictEqual(res.status, 200);
        const body = JSON.parse(res.text);
        assert.strictEqual(body.response, 1);
    });
    it('Test fake route /post1', async function () {
        const res = await chai.request(server).post('/post1');
        assert.strictEqual(res.status, 200);
        const body = JSON.parse(res.text);
        assert.strictEqual(body.response, 5);
    });
});
