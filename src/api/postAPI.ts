import * as PostController from '../controllers/PostController';
import { Post } from '../entities/Post';
import baseAPI from '../misc/baseAPI';

const postAPI: baseAPI = {
    pkg: PostController,
    entity: Post,
    methods: [
        {
            url: '/post',
            method: 'get',
            function: 'getAll',
        },
        {
            url: '/post',
            method: 'post',
            function: 'make',
        },
    ],
};

export default postAPI;
