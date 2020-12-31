import { Handler } from 'express';
import { PathParams } from 'express-serve-static-core';
export type validRouteMethod = 'get' | 'post' | 'put' | 'delete';
export interface routeMetadata {
    verb: validRouteMethod;
    path: PathParams;
    method: string | Symbol;
    /**
     * Set by @see Middleware
     */
    authMiddleWare?: Handler;
}

/**
 * Set a route - Decorator
 * @param verb A valid route verb
 * @param path A valid path
 */
export default function Route(verb: validRouteMethod, path: PathParams, authMiddleWare?: Handler): MethodDecorator {
    return function (target, propertyKey) {
        //get the metadata or a empty array

        const metadata: routeMetadata[] = Reflect.getMetadata('routeMethods', target) ?? [];

        metadata.push({ verb, path, method: propertyKey, authMiddleWare });
        Reflect.defineMetadata('routeMethods', metadata, target);
    };
}
