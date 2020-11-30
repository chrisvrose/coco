import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { Request } from 'express';
import { Post } from '../entities/Post';
import baseAPI from '../misc/baseAPI';
import BaseController from '../misc/BaseController';
import ResponseError from '../misc/ResponseError';

export default class PostController extends BaseController<Post> {
    async getAll(req: Request) {
        // const id = parseInt(req.params.id);
        return this.repo.find();
    }

    async getOne(req: Request) {
        const res = await this.repo.findOne(parseInt(req.params.id));
        if (res) return res;
        else throw new ResponseError('Could not get', 404);
    }

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
export const api: baseAPI = {
    pkg: PostController,
    entity: Post,
    methods: [
        {
            url: '/post',
            method: 'get',
            function: 'getAll',
        },
        {
            url: '/post/:id',
            method: 'get',
            function: 'getOne',
        },
        {
            url: '/post',
            method: 'post',
            function: 'make',
        },
    ],
};
