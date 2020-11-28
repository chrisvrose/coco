import { Application } from 'express';
import { getRepository } from 'typeorm';
import baseAPI from './baseAPI';
import compose from './compose';

/**
 * Integrates apis based on api specification
 * @param app Express application
 * @param apis set of apis to add
 */
export default function (app: Application, ...apis: baseAPI[]) {
    for (const api of apis) {
        const { pkg, methods, entity } = api;
        methods.forEach(method => {
            // warn if function missing
            if (!pkg[method.function]) {
                console.warn('W>Function missing', entity.name, method.function);
            }
            //if base entity exists/required
            if (entity) {
                app[method.method](method.url, compose(pkg[method.function], getRepository(entity)));
            } else {
                app[method.method](method.url, compose(pkg[method.function]));
            }
        });
    }
}
