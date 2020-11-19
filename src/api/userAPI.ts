import * as UserController from '../controllers/UserController';
import { User } from '../entities/User';
import baseAPI from '../misc/baseAPI';

const userAPI: baseAPI = {
    pkg: UserController,
    entity: User,
    methods: [
        {
            url: '/user/:id(\\d+)/',
            method: 'get',
            function: 'getOne',
        },
        {
            url: '/user',
            method: 'get',
            function: 'getAll',
        },
    ],
};

export default userAPI;
