import { NextFunction, Response } from 'express';
import { userService } from '../services';
import { IRequestExtended } from '../interfaces';

class UserMiddlewares {
    public async checkEmailExist(req:IRequestExtended, res:Response, next:NextFunction) {
        try {
            const { email } = req.body;
            const userFromEmail = await userService.getUserByEmail(email);

            if (!userFromEmail) {
                res.status(404).json('User not found!');
                return;
            }
            req.user = userFromEmail;
            next();
        } catch (e:any) {
            res.json({ status: 400, message: e.message });
        }
    }

    public async checkEmailNotExist(req:IRequestExtended, res:Response, next:NextFunction) {
        try {
            const { email } = req.body;
            const userFromEmail = await userService.getUserByEmail(email);

            if (userFromEmail) {
                res.status(404).json('This email is already exists!');
                return;
            }
            next();
        } catch (e:any) {
            res.json({ status: 400, message: e.message });
        }
    }
}

export const userMiddlewares = new UserMiddlewares();
