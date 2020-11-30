import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import apiList from './api';
import connectionConfig from './misc/dbconfig';
import routeIntegrator from './misc/routeIntegrator';
import testRoutes from './test';

const app = express();

app.use(morgan('tiny'));
app.use(express.json());
const port = process.env.PORT ?? 3000;

async function getServer() {
    const conn = await createConnection(connectionConfig);
    console.log('I>Connected');
    app.use('/test', testRoutes);

    //add all the routes of the app into the express application
    routeIntegrator(app, ...apiList);
    // routeIntegrator(app, userAPI);
    // routeIntegrator(app, postAPI);

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
}

const res = getServer()
    .then(res => {
        // console.log('I>Preparing');
        return res;
    })
    .catch(err => {
        console.error('E>Could not connect to db:', err?.message ?? err?.msg ?? err?.name ?? 'General error');
    });

export default res;
