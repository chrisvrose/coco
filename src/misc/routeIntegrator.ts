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
        const controller = new pkg(getRepository(entity));
        methods.forEach(method => {
            // warn if function missing
            if (!controller[method.function]) {
                console.warn('W>Function missing', entity.name, controller.function);
            }

            // Compose this route - handle errors and responses
            const composedRoute = compose(controller[method.function].bind(controller));
            // add it as an express route
            app[method.method](method.url, composedRoute);
        });
    }
}
