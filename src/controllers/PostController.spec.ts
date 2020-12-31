import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import { Server } from 'http';
import 'mocha';
import 'reflect-metadata';
import Application, { appliance } from '../Application';
import routeIntegrator from '../misc/routeIntegrator';
import PostController from './PostController';

chai.use(chaiHttp);

describe('Post Controller', function () {
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
        routeIntegrator(application.app, PostController);
        server = application.start();
    });
    it('should get all posts', async function () {
        const res = await chai.request(server).get('/post');
        assert.strictEqual(res.status, 200, 'Must respond');
        const response = JSON.parse(res.text)?.response;
        assert(Array.isArray(response));
    });
    it('should fail without auth');
});
