import { assert } from 'chai';
import 'reflect-metadata';
import Route from './Route';

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

        const loc1 = Reflect.getMetadata('routeMethod', test, 'method1');
        assert.exists(loc1?.verb === 'get', 'method1 was get');
        assert.exists(loc1?.path === '/url1', 'method1 was /url1');

        const loc2 = Reflect.getMetadata('routeMethod', test, 'method2');
        assert.exists(loc2?.verb === 'post', 'method2 was post');
        assert.exists(loc2?.path === '/url2', 'method2 was /url2');
    });
});
