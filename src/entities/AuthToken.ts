import { Entity, ManyToOne, PrimaryColumn, Unique } from 'typeorm';
import { User } from './User';

/**
 * AuthToken entity
 */
@Entity()
@Unique(['authtoken'])
export class AuthToken {
    @PrimaryColumn()
    authtoken: string;
    //whenever we deal with atokens, we need users anyways to check priviledge
    @ManyToOne(() => User, { onDelete: 'CASCADE', eager: true })
    user: User;
}
