import { assert } from 'chai';
import 'reflect-metadata';
import ResponseError from './ResponseError';

describe('ResponseError Class', function () {
    it('Has default status of 500', async function () {
        const error = new ResponseError('foo bar');
        assert.strictEqual(error.statusCode, 500);
        assert.strictEqual(error.message, 'foo bar');
    });
    it('Has Custom status codes', function () {
        const error = new ResponseError('foo bar2', 404);
        assert.strictEqual(error.statusCode, 404);
        assert.strictEqual(error.message, 'foo bar2');
    });
});
