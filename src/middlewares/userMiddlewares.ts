import { NextFunction, Response } from 'express';
import { userService } from '../services';
import { IRequestExtended } from '../interfaces';
import { userValidators, paramValidator } from '../validators';
import { ErrorHendler } from '../error/errorHendler';

class UserMiddlewares {
    public async checkEmailExist(req:IRequestExtended, res:Response, next:NextFunction) {
        try {
            const { email } = req.body;
            const userFromEmail = await userService.getUserByEmail(email);

            if (!userFromEmail) {
                next(new ErrorHendler('User not Found', 404));
                return;
            }
            req.user = userFromEmail;
            next();
        } catch (e:any) {
            next(e);
        }
    }

    public async checkEmailNotExist(req:IRequestExtended, res:Response, next:NextFunction) {
        try {
            const { email } = req.body;
            const userFromEmail = await userService.getUserByEmail(email);

            if (userFromEmail) {
                next(new ErrorHendler('User not Found', 404));
                return;
            }
            next();
        } catch (e:any) {
            next(e);
        }
    }

    public async validateCreateUser(req:IRequestExtended, res:Response, next:NextFunction)
        :Promise<void> {
        try {
            const { error, value } = userValidators.crateUser.validate(req.body);

            if (error) {
                next(new ErrorHendler(error.details[0].message, 404));
                return;
            }
            req.body = value;
            next();
        } catch (e:any) {
            next(e);
        }
    }

    public async validateLoginUser(req:IRequestExtended, res:Response, next:NextFunction)
        :Promise<void> {
        try {
            const { error, value } = userValidators.loginUser.validate(req.body);

            if (error) {
                next(new ErrorHendler('Wrong email or password!', 404));
                return;
            }
            req.body = value;
            next();
        } catch (e:any) {
            next(e);
        }
    }

    public async validateId(req:IRequestExtended, res:Response, next:NextFunction)
        :Promise<void> {
        try {
            const { error, value } = paramValidator.id.validate(req.params);

            if (error) {
                next(new ErrorHendler('Wrong id user!', 404));
                return;
            }
            req.body = value;
            next();
        } catch (e:any) {
            next(e);
        }
    }

    public async validateUpdateUser(req:IRequestExtended, res:Response, next:NextFunction)
        :Promise<void> {
        try {
            const { error, value } = userValidators.updateUser.validate(req.body);

            if (error) {
                next(new ErrorHendler(error.details[0].message, 404));
                return;
            }
            req.body = value;
            next();
        } catch (e:any) {
            next(e);
        }
    }
}

export const userMiddlewares = new UserMiddlewares();
