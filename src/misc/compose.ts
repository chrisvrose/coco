import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
import ResponseError from './ResponseError';

/**
 * Wrap database functions with error handling and return
 * @param fn Function to wrap
 */
export default function compose(fn: (req: Request, repo?: Repository<any>) => Promise<any>, repo?: Repository<any>) {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            const response = await fn(req, repo);
            if (response === null || response === undefined) {
                res.json({ ok: true });
            } else {
                res.json({ ok: true, response });
            }
        } catch (e) {
            if (e instanceof ResponseError) {
                res.status(e.statusCode).json({ ok: false, status: e.message });
            } else {
                console.log(e);
                res.status(500).json({ ok: false, status: 'error' });
            }
        }
    };
}
