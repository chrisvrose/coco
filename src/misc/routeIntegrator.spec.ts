import { assert } from 'chai';
import express from 'express';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { Post } from '../entities/Post';
import BaseController from './BaseController';
import config from './dbconfig';
import ControllerEntity from './decorators/ControllerEntity';
import Route from './decorators/Route';
import routeIntegrator from './routeIntegrator';

@ControllerEntity(Post)
class myBaseController extends BaseController<Post> {
    @Route('get', '/post')
    fakeRoute() {
        return 1;
    }
    @Route('post', '/post1')
    someOtherRoute() {
        return 5;
    }
    someAnotherRoute() {
        return 6;
    }
}

describe('Route integrator', function () {
    it('should add methods', async () => {
        const app = express();
        const conn = await createConnection(config);

        // new myBaseController(conn.getRepository(Post));
        // console.log(Reflect.ownKeys(myBaseController));
        routeIntegrator(app, myBaseController);
        const count = app._router.stack.length;
        await conn.close();

        //express adds extras
        assert.isAtLeast(count, 4);
    });
});
