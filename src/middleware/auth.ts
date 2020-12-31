import { assert } from 'chai';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { AuthToken } from '../entities/AuthToken';

export function authRoleEquals(role: number) {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            //get the repo
            const repo = getRepository<AuthToken>(AuthToken);
            assert.exists(req.header('authentication'));
            const token = await repo.findOneOrFail({ where: { authtoken: 'abc' } });
            assert.strictEqual(token.user.role, role);

            next();
        } catch (e) {
            res.status(403).json({ ok: false, status: 'auth failed' });
        }
    };
}
