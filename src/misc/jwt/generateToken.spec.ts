import { assert } from 'chai';
import generateToken from './generateToken';

describe('Token Generation', function () {
    it('should be able to generate tokens', async function () {
        const jwt = generateToken({ user: 'hello' });
        assert(jwt, 'Token exists');
    });
});
