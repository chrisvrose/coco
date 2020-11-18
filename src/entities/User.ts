import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
