import { assert } from 'chai';
import { Connection, createConnection } from 'typeorm';
import { AuthToken } from '../entities/AuthToken';
import config from '../misc/dbconfig';
import AuthController from './AuthController';

// import assert from 'assert';
describe('AuthController', function () {
    let conn: Connection;
    before(async function () {
        conn = await createConnection(config);
    });
    after(async function () {
        return conn.close();
    });
    it('should have basic work', async () => {
        const authController = new AuthController(conn.getRepository(AuthToken));
        const res = await authController.getOne();
        const data = Reflect.getMetadata('routeMethod', authController, 'getOne');
        //TODO FIN
        assert.equal(res, 1, 'one');
        assert.equal(data.verb, 'get', 'correct verb get');
    });
});
