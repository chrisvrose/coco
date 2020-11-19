import { genSalt, hash } from 'bcryptjs';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

const bcryptRounds = 10;

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
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
}
