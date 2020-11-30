import { Repository } from 'typeorm';
import baseAPI from './baseAPI';

export default abstract class BaseController<T extends Object> {
    protected repo: Repository<T>;
    static api: baseAPI;
    constructor(repo: Repository<T>) {
        this.repo = repo;
    }
}
