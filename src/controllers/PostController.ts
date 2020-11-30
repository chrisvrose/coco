import { Request } from 'express';
import { Repository } from 'typeorm';
import { Post } from '../entities/Post';
import ResponseError from '../misc/ResponseError';

export async function getAll(req: Request, db: Repository<Post>) {
    // const id = parseInt(req.params.id);
    return db.find();
}

export async function getOne(req: Request, db: Repository<Post>) {
    const res = await db.findOne(parseInt(req.params.id));
    // console.log(res);
    if (res) return res;
    else throw new ResponseError('Could not get', 404);
}

export async function make(req: Request, db: Repository<Post>) {
    // const post = new Post();
    // post.title = req.body.title;
    // post.content = req.body.content;
    return db.save(req.body);
    // return db
}
