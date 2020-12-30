import { PathParams } from 'express-serve-static-core';
export type validRouteMethod = 'get' | 'post' | 'put' | 'delete';
export interface routeMetadata {
    verb: validRouteMethod;
    path: PathParams;
    method: string | Symbol;
}

/**
 *
 * @param verb A valid route verb
 * @param path A v
 */
export default function Route(verb: validRouteMethod, path: PathParams): MethodDecorator {
    return function (target, propertyKey) {
        //get the metadata or a empty array
        const metadata: routeMetadata[] = Reflect.getMetadata('routeMethods', target) ?? [];
        metadata.push({ verb, path, method: propertyKey });
        Reflect.defineMetadata('routeMethods', metadata, target);
    };
}
