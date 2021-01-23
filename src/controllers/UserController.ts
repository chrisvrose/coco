import { compare } from 'bcryptjs';
import { assert } from 'chai';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { Request } from 'express';
import { getRepository } from 'typeorm';
import { AuthToken } from '../entities/AuthToken';
import { LoginUser, RegisterUser, User } from '../entities/User';
import { authRole } from '../middleware/auth';
import ControllerEntity from '../misc/decorators/ControllerEntity';
import Route from '../misc/decorators/Route';
import ResponseError from '../misc/error/ResponseError';
import generateToken from '../misc/jwt/generateToken';
import BaseController from '../misc/types/BaseController';

@ControllerEntity(User)
export default class UserController extends BaseController<User> {
    @Route('post', '/auth')
    async login(req: Request) {
        try {
            const userpass = plainToClass(LoginUser, req.body, { excludeExtraneousValues: true });
            await validateOrReject(userpass);
            try {
                const user = await this.repo.findOneOrFail({ where: { email: userpass.email } });
                // validate pwd
                const res = await compare(userpass.pwd, user.pwd);
                assert(res);
                // generate new authtoken
                const authtoken = new AuthToken();
                authtoken.authtoken = generateToken({ user: user.id });
                authtoken.user = user;
                // save it
                await getRepository(AuthToken).save(authtoken);
                //ensure
                return authtoken.authtoken;
            } catch {
                // console.log('login error', e);
                throw new ResponseError('Invalid credentials', 401);
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
        const user = plainToClass(RegisterUser, req.body, { excludeExtraneousValues: true });
        // console.log('I>NEW USER after conversion', user);
        await validateOrReject(user);
        try {
            // console.log('I>new user', user);
            //transform to new class
            const userBody = plainToClass(User, user);
            const result = await this.repo.save(userBody);
            return result.id;
        } catch (e) {
            console.log(e);
            throw new ResponseError('could not save');
        }
    }
    //logout
    //TODO implement
    // @Route('delete', '/auth', authRole(0, true))
    // async logout(req: Request) {
    //     // await
    // }
    @Route('delete', '/user/:id', authRole(0, true))
    async remove(req: Request) {
        const { id } = req.params;
        const userToRemove = await this.repo.findOneOrFail(id);
        await this.repo.remove(userToRemove);
    }
}
