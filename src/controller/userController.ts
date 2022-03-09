import { getManager } from 'typeorm';
import { Request, Response } from 'express';
import { IUser, User } from '../entity/user';
import { userService } from '../services/userServices';

class UserController {
    public async createUser(req:Request, res:Response):Promise<Response<IUser>> {
        const createdUser = await userService.createUser(req.body);
        return res.json(createdUser);
    }

    public async getUsers(req:Request, res:Response) {
        const users = await getManager().getRepository(User).find({ relations: ['posts'] });
        res.json(users);
    }

    public async getUserByEmail(req:Request, res:Response):Promise<Response<IUser>> {
        const { email } = req.body;
        console.log(email);
        const user = await userService.getUserByEmail(email);
        return res.json(user);
    }
}

export const userController = new UserController();
