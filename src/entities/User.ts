import { genSalt, hash } from 'bcryptjs';
import { IsEmail, IsString, Length } from 'class-validator';
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AuthToken } from './AuthToken';

const bcryptRounds = 10;

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @IsEmail()
    @Column({ unique: true })
    email: string;

    @Column()
    name: string;

    @Column()
    pwd: string;

    @Column({ default: 0 })
    role: number;

    @BeforeInsert()
    async beforeInsert() {
        const salt = await genSalt(bcryptRounds);
        this.pwd = await hash(this.pwd, salt);
    }

    @OneToMany(() => AuthToken, auth => auth.authtoken)
    authtokens: AuthToken[];
}

export class LoginUser {
    @IsEmail()
    email: string;

    @Length(8)
    pwd: string;
}
export class RegisterUser extends LoginUser {
    // @Length(1)
    @IsString()
    name: string;
}
