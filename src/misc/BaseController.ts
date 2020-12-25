import { Repository } from 'typeorm';

export default abstract class BaseController<T extends Object> {
    protected repo: Repository<T>;
    constructor(repo: Repository<T>) {
        this.repo = repo;
    }
}

export type baseControllerClass<T> = new (repo: Repository<T>) => BaseController<T>;
