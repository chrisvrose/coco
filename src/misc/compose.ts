import { ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import ResponseError from './error/ResponseError';
import { AuthRequest } from './types/AuthRequest';

/**
 * Wrap database functions with error handling and return
 * @param fn Function to wrap
 */
export default function compose(fn: (req: AuthRequest) => Promise<any>) {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            const response = await fn(req);
            if (response === null || response === undefined) {
                res.json({ ok: true });
            } else {
                res.json({ ok: true, response });
            }
        } catch (e) {
            if (e instanceof ResponseError) {
                console.log('E>', e);
                res.status(e.statusCode).json({ ok: false, status: e.message });
            } else if (Array.isArray(e)) {
                console.log('E>array', e);
                if (e.length > 0) {
                    if (e[0] instanceof ValidationError) {
                        // console.warn('std error2');
                        //validation errors
                        res.status(400).json({ ok: false, status: 'bad request' });
                    } else {
                        // console.warn('std error');
                        //std error
                        res.status(500).json({ ok: false, status: 'error' });
                    }
                } else {
                    res.status(500).json({ ok: false, status: e.map(err => err) });
                }
            } else {
                console.log('E>General error', e);
                // console.log(e);
                res.status(500).json({ ok: false, status: 'error' });
            }
        }
    };
}
