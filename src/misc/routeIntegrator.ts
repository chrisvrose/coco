import { Application } from 'express';
import { EntityTarget, getRepository } from 'typeorm';
import { baseControllerClass } from './BaseController';
import compose from './compose';
import { routeMetadata } from './decorators/Route';

/**
 * Integrates apis based on api specification
 * @param app Express application
 * @param apis set of apis to add
 */
// export default function (app: Application, ...apis: baseAPI[]) {
//     for (const api of apis) {
//         const { pkg, methods, entity } = api;
//         const controller = new pkg(getRepository(entity));
//         methods.forEach(method => {
//             // warn if function missing
//             if (!controller[method.function]) {
//                 console.warn('W>Function missing', entity.name, controller.function);
//             }

//             // Compose this route - handle errors and responses
//             const composedRoute = compose(controller[method.function].bind(controller));
//             // add it as an express route
//             app[method.method](method.url, composedRoute);
//         });
//     }
// }

export default function integrator<T extends any>(app: Application, controller: baseControllerClass<T>) {
    const entity: EntityTarget<T> = Reflect?.getMetadata('controllerEntity', controller);
    if (entity) {
        const controllerObj = new controller(getRepository(entity));
        //get methods of class
        //get all methods except constructor
        const methods = Reflect.ownKeys(Object.getPrototypeOf(controllerObj)).filter(e => e !== 'constructor');
        for (const method of methods) {
            if (typeof method === 'string') {
                //attempt to get metadata
                const routeData: routeMetadata = Reflect.getMetadata('routeMethod', controllerObj, method);
                if (routeData) {
                    // console.log('I> Adding method', routeData);
                    //compose the route
                    const composedRoute = compose((controllerObj as any)[method].bind(controllerObj));
                    //add the composed route
                    (app as any)[routeData.verb](routeData.path, composedRoute);
                } else {
                    console.warn('W>', 'Missing route decorator on', method);
                }
            }
        }
    } else {
        console.warn('W>', controller.name, ' missing decorator for controller model');
    }
}
