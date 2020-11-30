import { Request } from 'express';
import { User } from '../entities/User';
import baseAPI from '../misc/baseAPI';
import BaseController from '../misc/BaseController';

export default class UserController extends BaseController<User> {
    async getOne(req: Request) {
        const id: number = parseInt(req.params.id);
        return this.repo.findOneOrFail({ id }, { select: ['email', 'name', 'role'] });
    }

    async getAll(req: Request) {
        const val = this.repo.find({ select: ['email', 'name', 'role'] });
        return val;
    }

    async save(req: Request) {
        const result = await this.repo.save(req.body as User);
        return result.id;
    }

    async remove(req: Request) {
        const id: number = parseInt(req.params.id);
        const userToRemove = await this.repo.findOneOrFail(id);
        await this.repo.remove(userToRemove);
    }
}

/**
 * check password
 * @param req req
 * @param res res
 * @param next next
 */
// export async function check(req: Request, ) {
//     const user = await repo.findOneOrFail({
//         email: req.body.email,
//     });
//     return compare(req.body.pwd, user.pwd);
// }

// export async function checkMiddleWare(req: Request, res: Response) {
//     if (await check(req, res, next, repo)) {
//         next();
//     } else {
//         throw new ResponseError('Unauthorized', 403);
//     }
// }

export const api: baseAPI = {
    pkg: UserController,
    entity: User,
    methods: [
        {
            url: '/user/:id(\\d+)/',
            method: 'get',
            function: 'getOne',
        },
        {
            url: '/user',
            method: 'get',
            function: 'getAll',
        },
    ],
};
