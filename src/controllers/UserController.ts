import { compare } from 'bcryptjs';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { Request } from 'express';
import { LoginUser, RegisterUser, User } from '../entities/User';
import BaseController from '../misc/BaseController';
import ControllerEntity from '../misc/decorators/ControllerEntity';
import Route from '../misc/decorators/Route';
import ResponseError from '../misc/ResponseError';

@ControllerEntity(User)
export default class UserController extends BaseController<User> {
    @Route('post', '/auth/login')
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

    @Route('get', '/user/:id')
    async getOne(req: Request) {
        // const id: number = parseInt(req.params.id);
        const { id } = req.params;
        return this.repo.findOneOrFail({ where: { id }, select: ['email', 'name', 'role'] });
    }
    @Route('get', '/user')
    async getAll(req: Request) {
        const val = this.repo.find({ select: ['email', 'name', 'role'] });
        return val;
    }
    @Route('post', '/user')
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
    @Route('delete', '/user')
    async remove(req: Request) {
        const id: number = parseInt(req.params.id);
        const userToRemove = await this.repo.findOneOrFail(id);
        await this.repo.remove(userToRemove);
    }
}
