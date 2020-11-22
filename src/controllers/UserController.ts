import { compare } from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { User } from '../entities/User';
export async function getOne(req: Request, res: Response, next: NextFunction, repo: Repository<User>) {
    const id: number = parseInt(req.params.id);
    return repo.findOneOrFail({ id }, { select: ['email', 'name', 'role'] });
}

export async function getAll(req: Request, res: Response, next: NextFunction, repo: Repository<User>) {
    const val = repo.find({ select: ['email', 'name', 'role'] });
    return val;
}

export async function save(req: Request, res: Response, next: NextFunction, repo: Repository<User>) {
    const result = await repo.save(req.body as User);
    return result.id;
}

export async function remove(req: Request, res: Response, next: NextFunction, repo: Repository<User>) {
    const id: number = parseInt(req.params.id);
    const userToRemove = await repo.findOneOrFail(id);
    await repo.remove(userToRemove);
}

/**
 * check password
 * @param req req
 * @param res res
 * @param next next
 */
export async function check(req: Request, res: Response, next: NextFunction, repo: Repository<User>) {
    const user = await repo.findOneOrFail({
        email: req.body.email,
    });
    return compare(req.body.pwd, user.pwd);
}

// export async function checkMiddleWare(req: Request, res: Response, next: NextFunction, repo: Repository<User>) {
//     if (await check(req, res, next, repo)) {
//         next();
//     } else {
//         throw new ResponseError('Unauthorized', 403);
//     }
// }
