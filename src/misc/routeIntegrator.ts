import { Application } from 'express';
import { EntityTarget, getRepository } from 'typeorm';
import { baseControllerClass } from './BaseController';
import compose from './compose';
import { routeMetadata } from './decorators/Route';

export default function integrator<T extends Object>(app: Application, controller: baseControllerClass<T>) {
    const entity: EntityTarget<T> = Reflect?.getMetadata('controllerEntity', controller);
    if (entity) {
        const controllerObj = new controller(getRepository(entity));
        const methods: routeMetadata[] = Reflect.getMetadata('routeMethods', controllerObj) ?? [];
        for (const method of methods) {
            // console.log('I>Adding', method, ((controllerObj as any)[method.method as any] as Function).toString());
            const composedRoute = compose((controllerObj as any)[method.method as any].bind(controllerObj));
            (app as any)[method.verb](method.path, composedRoute);
        }
        // console.log('I>Done,status', app._router.stack);
    } else {
        console.warn('W>', controller.name, ' missing decorator for controller model');
    }
}
