import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { Post } from '../entities/Post';

export async function getAll(req: Request, res: Response, next: NextFunction, db: Repository<Post>) {
    // const id = parseInt(req.params.id);
    return db.find();
}

export async function make(req: Request, res: Response, next: NextFunction, db: Repository<Post>) {
    // const post = new Post();
    // post.title = req.body.title;
    // post.content = req.body.content;
    return db.save(req.body);
    // return db
}
