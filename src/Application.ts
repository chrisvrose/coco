import express, { Application as ExpressApplication, NextFunction, Request, Response } from 'express';
import { Server } from 'http';
import morgan from 'morgan';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { controllerClassish } from './misc/BaseController';
import connectionConfig from './misc/dbconfig';
import routeIntegrator from './misc/routeIntegrator';
import testRoutes from './testRoutes';
/**
 * Obtain a server module
 */
export default async function getServer(
    port: number = 3000,
    doLogs: boolean = false,
    ...controllers: controllerClassish[]
): Promise<appliance> {
    const app = express();
    if (doLogs) {
        app.use(morgan('tiny'));
    }
    app.use(express.json());

    const conn = await createConnection(connectionConfig);
    if (doLogs) {
        console.log('I>Connected');
    }
    app.use('/test', testRoutes);

    //add all the routes of the app into the express application
    routeIntegrator(app, ...controllers);
    // const server = app.listen(port);
    return {
        app,
        start: () => {
            //add the error handles later
            app.use((req, res, next) => {
                res.status(404).json({ ok: false, status: 'not found' });
            });

            app.use((err: any, req: Request, res: Response, next: NextFunction) => {
                if (!res.headersSent) {
                    res.status(500).json({
                        ok: false,
                        status: err.toString(),
                    });
                } else {
                    console.error('E(error):Did not send error');
                    res.end();
                }
                console.error('E>', err);
            });
            return app.listen(port);
        },
        /**
         * closes db
         */
        close: async () => {
            return conn.close();
        },
    };
}
export type appliance = {
    app: ExpressApplication;
    start: () => Server;
    close: () => Promise<void>;
};
