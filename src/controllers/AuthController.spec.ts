import { assert } from 'chai';
import { Connection, createConnection } from 'typeorm';
import { AuthToken } from '../entities/AuthToken';
import config from '../misc/dbconfig';
import { routeMetadata } from '../misc/decorators/Route';
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
        const data: routeMetadata[] = Reflect.getMetadata('routeMethods', authController);
        //TODO FIN
        assert.strictEqual(data.length, 2, 'Two routes');
    });
});
