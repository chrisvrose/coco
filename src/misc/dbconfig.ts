import dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';
import { User } from '../entities/User';
dotenv.config();
const config: ConnectionOptions = {
    type: 'postgres',
    host: process.env.DBHOST ?? 'localhost',
    port: parseInt(process.env.DBPORT ?? '5432'),
    username: process.env.DBUSER,
    password: process.env.DBPWD,
    database: process.env.DBDB,
    synchronize: true,
    entities: [User],
};
export default config;
