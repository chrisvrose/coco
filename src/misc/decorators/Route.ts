export type validRouteMethod = 'get' | 'post' | 'put' | 'delete';
export interface routeMetadata {
    verb: string;
    path: string;
}
export default function Route(verb: validRouteMethod, path: string): MethodDecorator {
    return function (target, propertyKey) {
        // console.info('Route decorator called');
        Reflect.defineMetadata('routeMethod', { verb, path }, target, propertyKey);
    };
}
