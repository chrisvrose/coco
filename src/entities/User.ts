import { genSalt, hash } from 'bcryptjs';
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AuthToken } from './AuthToken';

const bcryptRounds = 10;

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({ unique: true })
    email: string;
    @Column()
    name: string;

    @Column()
    pwd: string;

    @Column()
    role: number;

    @BeforeInsert()
    async beforeInsert() {
        const salt = await genSalt(bcryptRounds);
        this.pwd = await hash(this.pwd, salt);
    }

    @OneToMany(() => AuthToken, auth => auth.authtoken)
    authtokens: AuthToken[];
}
