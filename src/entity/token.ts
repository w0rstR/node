import {
    Column, Entity, JoinColumn, OneToOne,
} from 'typeorm';
import { User } from './user';
import { CommonFields } from './commonFields';

export interface IToken {
    refreshToken: string;
    accessToken:string;
    userId:number
}

@Entity('tokens', { database: 'db' })
export class Token extends CommonFields implements IToken {
    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        refreshToken: string;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        accessToken: string;

    @Column({
        type: 'int',
    })
        userId: number;

    @OneToOne(() => User)
    @JoinColumn({ name: 'userId' })
        user: User;
}
