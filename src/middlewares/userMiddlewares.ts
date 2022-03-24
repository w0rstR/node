import { NextFunction, Response } from 'express';
import { userService } from '../services';
import { IRequestExtended } from '../interfaces';
import { userValidators, paramValidator } from '../validators';

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

    public async validateCreateUser(req:IRequestExtended, res:Response, next:NextFunction)
        :Promise<void> {
        try {
            const { error, value } = userValidators.crateUser.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }
            req.body = value;
            next();
        } catch (e:any) {
            res.status(400).json(e.message);
        }
    }

    public async validateLoginUser(req:IRequestExtended, res:Response, next:NextFunction)
        :Promise<void> {
        try {
            const { error, value } = userValidators.loginUser.validate(req.body);

            if (error) {
                throw new Error('Wrong email or password!');
            }
            req.body = value;
            next();
        } catch (e:any) {
            res.status(400).json(e.message);
        }
    }

    public async validateId(req:IRequestExtended, res:Response, next:NextFunction)
        :Promise<void> {
        try {
            const { error, value } = paramValidator.id.validate(req.params);

            if (error) {
                throw new Error('Wrong id user!');
            }
            req.body = value;
            next();
        } catch (e:any) {
            res.status(400).json(e.message);
        }
    }
}

export const userMiddlewares = new UserMiddlewares();
