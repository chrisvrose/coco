import baseAPI from '../misc/baseAPI';
import postAPI from './postAPI';
import userAPI from './userAPI';

const api: baseAPI[] = [userAPI, postAPI];

export default api;
