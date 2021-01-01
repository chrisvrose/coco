import assert from 'assert';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { AuthToken } from '../entities/AuthToken';

/**
 * passing (0,true) is just a simple auth for self
 * @param role The role identifier
 * @param geq Whether to allow greater role values too. False by default
 */
export function authRole(role: number, geq: boolean = false) {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            //get the repo
            const repo = getRepository<AuthToken>(AuthToken);
            //
            const tokenStr = req.header('authorization')?.split(' ')[1];
            assert(typeof tokenStr === 'string');
            // FIXME get the token
            const token = await repo.findOneOrFail({ where: { authtoken: tokenStr } });
            // console.log(`I>priviledge check:`, `req:${geq ? '>=' : '='}${role}`, `given:${token.user.role}`);
            assert(token.user.role === role || (geq && token.user.role >= role));

            next();
        } catch (e) {
            // console.log('error', e);
            res.status(403).json({ ok: false, status: 'auth failed' });
        }
    };
}
