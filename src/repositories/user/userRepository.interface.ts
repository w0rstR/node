import { IUser } from '../../entity/user';

export interface IUserRepository{
    createUser(user: IUser): Promise<IUser>;
    getUserByEmail(email:string): Promise<IUser | undefined>;
    getUsers():Promise<Array<IUser | undefined>>;
    getUserById(id:number):Promise<IUser | undefined>;
    updateUserById(id:number, email:string, password:string):Promise<Object>;
    updateUserPassword(id: number, user: string): Promise<object>;
}
