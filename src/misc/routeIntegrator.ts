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
            console.log(controller[method.function]);
            if (!controller[method.function]) {
                console.warn('W>Function missing', entity.name, controller.function);
            }

            app[method.method](
                method.url,
                compose(controller[method.function].bind(controller), getRepository(entity))
            );
        });
    }
}
