import {
    Column, Entity, JoinColumn, OneToOne,
} from 'typeorm';
import { User } from './user';
import { CommonFields } from './commonFields';
import { ActionTokensTypes } from '../enums/actionTokensTypes.enum';

export interface IActionToken {
    actionToken: string;
    type:ActionTokensTypes;
    userId:number
}

export interface IActionTokenForSave {
    actionToken: string;
    type:ActionTokensTypes;
    userId:number
}

@Entity('actionTokens', { database: 'db' })
export class ActionToken extends CommonFields implements IActionToken {
    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        actionToken: string;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        type: ActionTokensTypes;

    @Column({
        type: 'int',
    })
        userId: number;

    @OneToOne(() => User)
    @JoinColumn({ name: 'userId' })
        user: User;
}
