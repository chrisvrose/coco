import { assert } from 'chai';
import 'reflect-metadata';
import Route, { routeMetadata } from './Route';

/**
 * @file Test for the Route decorator
 */
class testClass {
    @Route('get', '/url1')
    method1() {
        return 1;
    }
    @Route('post', '/url2')
    method2() {
        return 2;
    }
}

describe('Route MiddleWare', function () {
    it('test class should work', function (done) {
        const test = new testClass();
        const res1 = test.method1();
        const res2 = test.method2();
        assert.equal(res1, 1);
        assert.equal(res2, 2);

        done();
    });
    it('test class should have decorator metadata', async function () {
        const test = new testClass();
        const metadata: routeMetadata[] = Reflect.getMetadata('routeMethods', test) ?? [];
        assert.strictEqual(metadata.length, 2, '2 routes');
        assert.strictEqual(metadata[0].verb, 'get', 'Route 1 has get');
        assert.strictEqual(metadata[0].path, '/url1', 'Route 1 has url1');
        assert.strictEqual(metadata[1].verb, 'post', 'Route 2 has post');
        assert.strictEqual(metadata[1].path, '/url2', 'Route 2 has url2');
    });
});
