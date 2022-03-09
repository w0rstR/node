import { Request, Response } from 'express';
import { userService } from './userServices';
// import { IUser } from '../entity/user';

class AuthServices {
    public async registaration(req:Request, res:Response) {
        // const user = req.body;
        const { email } = req.body;
        const userFromDb = await userService.getUserByEmail(email);
        if (userFromDb) {
            throw new Error(`User with email ${email} already exists`);
        }
        // const createdUser = userService.createUser(user);
    }

    // private _getTokenData(userData: IUser) {
    //     const tokenPair =
    // }
}

export const authService = new AuthServices();
