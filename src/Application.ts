import express, { Application as ExpressApplication, NextFunction, Request, Response } from 'express';
import { Server } from 'http';
import morgan from 'morgan';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
// import apiList from './api';
import PostController from './controllers/PostController';
import UserController from './controllers/UserController';
import connectionConfig from './misc/dbconfig';
import routeIntegrator from './misc/routeIntegrator';
import testRoutes from './test';
/**
 * Obtain a server module
 */
export default async function getServer(port: number = 3000, doLogs: boolean = false): Promise<appliance> {
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
    routeIntegrator(app, PostController);
    routeIntegrator(app, UserController);
    // routeIntegrator(app, userAPI);
    // routeIntegrator(app, postAPI);

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
            // return new Promise<void>((res, rej) => {
            //     server.close(err => {
            //         if (err) {
            //             rej(err);
            //             return;
            //         }
            //         conn.close()
            //             .then(() => res())
            //             .catch(reason => rej(reason));
            //     });
            // });
        },
    };
}
export type appliance = {
    app: ExpressApplication;
    start: () => Server;
    close: () => Promise<void>;
};
