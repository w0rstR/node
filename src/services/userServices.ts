import bcrypt from 'bcrypt';
import { IUser } from '../entity/user';
import { userRepository } from '../repositories/user/userRepository';

class UserServices {
    public async createUser(user:IUser):Promise<IUser> {
        const { password } = user;

        const hashedPassword = await this._hashPassword(password);
        const dataSave = { ...user, password: hashedPassword };

        const createdUser = await userRepository.createUser(dataSave);
        return createdUser;
    }

    public async getUserByEmail(email:string): Promise<IUser | undefined> {
        return userRepository.getUserByEmail(email);
    }

    public async getUsers():Promise<Array<IUser | undefined>> {
        return userRepository.getUsers();
    }

    public async getUserById(id: number):Promise<IUser | undefined> {
        return userRepository.getUserById(id);
    }

    public async updateUserById(id:number, email:string, password:string):Promise<Object> {
        return userRepository.updateUserById(id, password, email);
    }

    public async compareUserPassword(password:string, hashedPassword:string):Promise<boolean> {
        const isPasswordCorect = await bcrypt.compare(password, hashedPassword);
        return isPasswordCorect;
    }

    private async _hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    public async updateUserPassword(id: number, user: Partial<IUser>): Promise<object | undefined> {
        const password = await this._hashPassword(user.password as string);
        return userRepository.updateUserPassword(id, password);
    }
}

export const userService = new UserServices();
