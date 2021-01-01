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
    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    user: User;
}
