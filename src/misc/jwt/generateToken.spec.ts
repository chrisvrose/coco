import { assert } from 'chai';
import jwt from 'jsonwebtoken';
import generateToken, { jwtPayload } from './generateToken';
describe('Token Generation', function () {
    let token: string;
    it('should be able to generate tokens', async function () {
        token = generateToken({ user: 'hello' });
        assert(token, 'Token exists');
    });

    it('Valid token', async function () {
        const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as jwtPayload;
        assert.strictEqual(data.user, 'hello');
    });
});
