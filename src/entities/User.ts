import { genSalt, hash } from 'bcryptjs';
import { Expose } from 'class-transformer';
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
    @Expose()
    @IsEmail()
    email: string;

    // @Length(8)
    @Expose()
    @MinLength(8)
    pwd: string;
}

/**
 * Validation pair
 */
export class RegisterUser extends LoginUser {
    @Expose()
    @IsString()
    name: string;
    @Expose()
    @IsEmail()
    email: string;
    @Expose()
    @MinLength(8)
    pwd: string;
}
