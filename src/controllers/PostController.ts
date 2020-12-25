import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { Request } from 'express';
import { Post } from '../entities/Post';
import BaseController from '../misc/BaseController';
import ControllerEntity from '../misc/decorators/ControllerEntity';
import Route from '../misc/decorators/Route';
import ResponseError from '../misc/ResponseError';

@ControllerEntity(Post)
export default class PostController extends BaseController<Post> {
    @Route('get', '/post')
    async getAll(req: Request) {
        // const id = parseInt(req.params.id);
        return this.repo.find();
    }

    @Route('get', '/post/:id')
    async getOne(req: Request) {
        const res = await this.repo.findOne(parseInt(req.params.id));
        if (res) return res;
        else throw new ResponseError('Could not get', 404);
    }
    @Route('post', '/post')
    async make(req: Request) {
        try {
            const post = plainToClass(Post, req.body);
            await validateOrReject(post);
            console.log(post.title);
            return this.repo.save(req.body);
        } catch (e) {
            throw new ResponseError('Could not save user', 400);
        }
    }
}
