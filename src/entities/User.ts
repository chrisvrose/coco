import { genSalt, hash } from 'bcryptjs';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}

export class LoginUser {
    @IsEmail()
    email: string;

    // @Length(8)
    @MinLength(8)
    pwd: string;
}

/**
 * Validation pair
 */
export class RegisterUser extends LoginUser {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @MinLength(8)
    pwd: string;
}
