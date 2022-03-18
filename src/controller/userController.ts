import { Request, Response } from 'express';
import { IUser } from '../entity/user';
import { userService } from '../services';

class UserController {
    public async createUser(req:Request, res:Response):Promise<Response<IUser>> {
        const createdUser = await userService.createUser(req.body);
        return res.json(createdUser);
    }

    public async getUsers(req:Request, res:Response) {
        const users = await userService.getUsers();
        res.json(users);
    }

    public async getUserByEmail(req:Request, res:Response):Promise<Response<IUser>> {
        const { email } = req.body;
        const user = await userService.getUserByEmail(email);
        return res.json(user);
    }

    public async getUserById(req:Request, res:Response) {
        const { id } = req.params;
        const user = await userService.getUserById(+id);
        res.json(user);
    }

    public async updateUserById(req:Request, res:Response) {
        const { email, password } = req.body;
        const { id } = req.params;
        const updatedUser = await userService.updateUserById(+id, email, password);
        res.json(updatedUser);
    }
}

export const userController = new UserController();
