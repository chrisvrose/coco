/**
 * @file Test for the Controller decorator
 */
import { assert } from 'chai';
import 'reflect-metadata';
import ControllerEntity from './ControllerEntity';

@ControllerEntity('abc')
class abc {}

describe('ControllerEntity Decorator', function () {
    it('Check if decorator was applied', async () => {
        assert.equal(Reflect.getMetadata('controllerEntity', abc), 'abc', 'Expected the decorator to apply');
    });
});
