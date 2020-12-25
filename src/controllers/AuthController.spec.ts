import { assert } from 'chai';
import { createConnection } from 'typeorm';
import { AuthToken } from '../entities/AuthToken';
import config from '../misc/dbconfig';
import AuthController from './AuthController';

// import assert from 'assert';
describe('AuthController', function () {
    it('should have basic work', async () => {
        const conn = await createConnection(config);
        const authController = new AuthController(conn.getRepository(AuthToken));
        const res = await authController.getOne();
        const data = Reflect.getMetadata('routeMethod', authController, 'getOne');
        //TODO FIN
        assert.equal(res, 1, 'one');
        assert.equal(data.verb, 'get', 'correct verb get');
        await conn.close();
    });
});
