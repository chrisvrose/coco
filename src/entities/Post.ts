import { IsString } from 'class-validator';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => User)
    author: User;
    @IsString()
    @Column()
    title: string;
    @IsString()
    @Column()
    content: string;
    @CreateDateColumn()
    createdAt: Date;
}
