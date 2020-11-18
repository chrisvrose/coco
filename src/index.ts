import express, { NextFunction, Request, Response } from 'express';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import apiRoutes from './api';
import connectionConfig from './misc/dbconfig';
import testRoutes from './test';

const app = express();
app.use(express.json());
const port = process.env.PORT ?? 3000;

async function getServer() {
    const conn = await createConnection(connectionConfig);
    app.use('/test', testRoutes);
    app.use(apiRoutes);
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
        console.error('E>Could not connect to db');
    });

export default res;
