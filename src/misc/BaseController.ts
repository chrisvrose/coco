import { Repository } from 'typeorm';

/**
 * A Controller without an entity attached
 */
export abstract class Controller {}

/**
 * A Controller with a entity attached
 */
export default abstract class BaseController<T extends Object = any> extends Controller {
    protected repo: Repository<T>;
    constructor(repo: Repository<T>) {
        super();
        this.repo = repo;
    }
}

export type baseControllerClass<T extends Object = any> = new (repo: Repository<T>) => BaseController<T>;
export type controllerClass = new () => Controller;
export type controllerClassish = baseControllerClass | controllerClass;
