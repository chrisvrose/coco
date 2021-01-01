import { assert } from 'chai';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { AuthToken } from '../entities/AuthToken';

/**
 *
 * @param role The role identifier
 * @param geq Whether to allow greater role values too. False by default
 */
export function authRole(role: number, geq: boolean = false) {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            //get the repo
            const repo = getRepository<AuthToken>(AuthToken);
            assert.exists(req.header('authentication'));
            // FIXME get the token
            const token = await repo.findOneOrFail({ where: { authtoken: 'abc' } });
            assert(token.user.role === role || (geq && token.user.role >= role));

            next();
        } catch (e) {
            res.status(403).json({ ok: false, status: 'auth failed' });
        }
    };
}
