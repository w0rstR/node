import {
    Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';
import { Post } from './post';
import { User } from './user';

import { CommonFields } from './commonFields';

export interface IComment {
    title: string;
    text: string;
    like: number,
    dislike: number,
    postId:number,
    authorId: number

}

@Entity('comments', { database: 'db' })
export class Comment extends CommonFields implements IComment {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        title: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        text: string;

    @Column({
        type: 'int',
        default: 0,
        nullable: false,
    })
        like: number;

    @Column({
        type: 'int',
        default: 0,
        nullable: false,
    })
        dislike: number;

    @Column({
        type: 'int',
    })
        postId: number;

    @Column({
        type: 'int',
    })
        authorId: number;

    @ManyToOne(() => User, (user) => user.comments)
    @JoinColumn({ name: 'authorId' })
        user: User;

    @ManyToOne(() => Post, (post) => post.comments)
    @JoinColumn({ name: 'postId' })
        post: Post;
}
