import { NextFunction, Response } from 'express';
import { userService, tokenService } from '../services';
import { IRequestExtended } from '../interfaces';
import { ErrorHendler } from '../error/errorHendler';
import { userValidators } from '../validators';
import { constans } from '../сonstans/constans';
import { actionTokenRepository } from '../repositories/actionTokenRepository/actionTokenRepository';

class AuthMiddlewares {
    public async checkAccessToken(req:IRequestExtended, res:Response, next:NextFunction) {
        try {
            const accessToken = req.header('authorization');

            if (!accessToken) {
                next(new ErrorHendler('You not have token', 401));
                return;
            }

            const { userEmail } = tokenService.verifyToken(accessToken);
            const userFromToken = await userService.getUserByEmail(userEmail);

            if (!userFromToken) {
                next(new ErrorHendler('User not found!', 404));
                return;
            }

            req.user = userFromToken;
            next();
        } catch (e: any) {
            next(e);
        }
    }

    public async checkRefreshToken(req:IRequestExtended, res:Response, next:NextFunction) {
        try {
            const { refreshToken } = req.cookies;
            const payloadFromToken = await tokenService.verifyToken(refreshToken, 'refresh');
            const userFromPayload = await userService.getUserByEmail(payloadFromToken.userEmail);
            const tokenFromDb = await tokenService.findRefreshToken(refreshToken);

            if (!payloadFromToken || !userFromPayload || !tokenFromDb) {
                next(new ErrorHendler('Wrong token', 401));
                return;
            }

            req.user = userFromPayload;
            next();
        } catch (e: any) {
            next(e);
        }
    }

    public async checkValidEmail(req:IRequestExtended, res:Response, next:NextFunction) {
        try {
            const { error, value } = userValidators.email.validate(req.body);

            if (error) {
                next(new ErrorHendler(error.details[0].message, 401));
                return;
            }

            req.body = value;
            next();
        } catch (e: any) {
            next(e);
        }
    }

    public async checkValidPassword(req:IRequestExtended, res:Response, next:NextFunction) {
        try {
            const { error, value } = userValidators.password.validate(req.body);

            if (error) {
                next(new ErrorHendler(error.details[0].message));
                return;
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkActionToken(req:IRequestExtended, res:Response, next:NextFunction) {
        try {
            const actionToken = req.get(constans.AUTHORIZATION);

            if (!actionToken) {
                next(new ErrorHendler('No token'));
                return;
            }

            const { userEmail } = await tokenService.verifyToken(actionToken, 'action');

            const tokenFromDB = await actionTokenRepository.findByParams({ actionToken });

            if (!tokenFromDB) {
                next(new ErrorHendler('Token not valid', 401));
                return;
            }

            const userFromToken = await userService.getUserByEmail(userEmail);

            if (!userFromToken) {
                next(new ErrorHendler('Token not valid', 401));
                return;
            }

            req.user = userFromToken;

            next();
        } catch (e: any) {
            next(e);
        }
    }
}
export const authMiddlewares = new AuthMiddlewares();
