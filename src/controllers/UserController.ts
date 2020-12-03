import { compare } from 'bcryptjs';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { Request } from 'express';
import { LoginUser, RegisterUser, User } from '../entities/User';
import baseAPI from '../misc/baseAPI';
import BaseController from '../misc/BaseController';
import ResponseError from '../misc/ResponseError';

export default class UserController extends BaseController<User> {
    async login(req: Request) {
        try {
            const userpass = plainToClass(LoginUser, req.body);
            await validateOrReject(userpass);
            try {
                const user = await this.repo.findOneOrFail({ where: { email: userpass.email } });
                await compare(userpass.pwd, user.pwd);
                return true;
            } catch {
                throw new ResponseError('Invalid credentials');
            }
        } catch (err) {
            if (err instanceof ResponseError) {
                throw err;
            } else throw new ResponseError('Could not format', 400);
        }
        // this.repo.find({where:{email:req}})
    }
    async getOne(req: Request) {
        // const id: number = parseInt(req.params.id);
        const { id } = req.params;
        return this.repo.findOneOrFail({ where: { id }, select: ['email', 'name', 'role'] });
    }

    async getAll(req: Request) {
        const val = this.repo.find({ select: ['email', 'name', 'role'] });
        return val;
    }

    async save(req: Request) {
        const user = plainToClass(RegisterUser, req.body);
        await validateOrReject(user);
        try {
            const result = await this.repo.save(user);
            return result.id;
        } catch (e) {
            console.log(e);
            throw new ResponseError('could not save');
        }
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
            url: '/user/:id/',
            method: 'get',
            function: 'getOne',
        },
        {
            url: '/user',
            method: 'get',
            function: 'getAll',
        },
        {
            url: '/user',
            method: 'post',
            function: 'save',
        },
    ],
};
