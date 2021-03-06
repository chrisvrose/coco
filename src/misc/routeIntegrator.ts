import { Application } from 'express';
import { EntityTarget, getRepository } from 'typeorm';
import compose from './compose';
import { routeMetadata } from './decorators/Route';
import BaseController, { Controller, controllerClassish } from './types/BaseController';

export default function routeIntegrator<T extends Object>(app: Application, ...controllers: controllerClassish[]) {
    let baseObj: BaseController | Controller;

    //check if controller exists
    for (const controller of controllers) {
        const entity: EntityTarget<any> = Reflect.getMetadata('controllerEntity', controller);
        if (entity) {
            // console.log('a1');
            if (entity === undefined) {
                console.warn('W>Missing class decorator');
            }
            baseObj = new controller(getRepository(entity));
        } else {
            console.log('a2');
            // TODO find a better way to work with a controller
            baseObj = new (controller as any)();
        }
        // const baseObj = new controller(getRepository(entity));
        const methods: routeMetadata[] = Reflect.getMetadata('routeMethods', baseObj) ?? [];
        for (const method of methods) {
            const composedRoute = compose((baseObj as any)[method.method as any].bind(baseObj));
            if (typeof method.authMiddleWare === 'function') {
                // console.log('I>Added auth route');
                (app as any)[method.verb](method.path, method.authMiddleWare, composedRoute);
            } else {
                (app as any)[method.verb](method.path, composedRoute);
            }
        }
    }
}

export const ControllerIntegrator = routeIntegrator;
