import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => User)
    author: User;
    @Column()
    title: string;
    @Column()
    content: string;
    @CreateDateColumn()
    createdAt: Date;
}
