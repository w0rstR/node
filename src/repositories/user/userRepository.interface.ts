import { IUser } from '../../entity/user';
import { IPaginationResponse } from '../../interfaces';

export interface IUserRepository{
    createUser(user: IUser): Promise<IUser>;
    getUserByEmail(email:string): Promise<IUser | undefined>;
    getUsers():Promise<Array<IUser | undefined>>;
    getUserById(id:number):Promise<IUser | undefined>;
    updateUserById(id:number, email:string, password:string):Promise<Object>;
    updateUserPassword(id: number, user: string): Promise<object>;
    getNewUsers():Promise<IUser[]>;
    getUserPagination(
        limit: number,
        page:number,
        searchObject: Partial<IUser>,):Promise<IPaginationResponse<IUser>>;
}
