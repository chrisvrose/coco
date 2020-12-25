import { AuthToken } from '../entities/AuthToken';
import BaseController from '../misc/BaseController';
import Route from '../misc/decorators/Route';

// FIXME fix

export default class AuthController extends BaseController<AuthToken> {
    @Route('get', '/auth/login')
    async getOne(req?: Request) {
        return 1;
    }
}
