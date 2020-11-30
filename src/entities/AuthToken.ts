import { Entity, ManyToOne, PrimaryColumn, Unique } from 'typeorm';
import { User } from './User';

@Entity()
@Unique(['authtoken'])
export class AuthToken {
    @PrimaryColumn()
    authtoken: string;
    @ManyToOne(() => User)
    user: User;
}
