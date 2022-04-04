import { NextFunction, Request, Response } from 'express';
import { IRequestExtended, ITokenPayload } from '../interfaces';
import {
    authService, emailService, tokenService, userService,
} from '../services';
import { IUser } from '../entity/user';
import { ErrorHendler } from '../error/errorHendler';
import { emailActionEnum } from '../сonstans/enums';
import { actionTokenRepository } from '../repositories/actionTokenRepository/actionTokenRepository';
import { ActionTokensTypes } from '../enums/actionTokensTypes.enum';
import { constans } from '../сonstans/constans';
import { userRepository } from '../repositories/user/userRepository';

class AuthController {
    public async registration(req:Request, res:Response):Promise<Response<ITokenPayload>> {
        const data = await authService.registaration(req.body);

        res.cookie(
            'refreshToken',
            data.refreshToken,
            { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true },
        );

        return res.json(data);
    }

    public async logout(req:IRequestExtended, res:Response):Promise<Response<String>> {
        const { id } = req.user as IUser;
        res.clearCookie('refreshToken');
        await tokenService.deleteUserToken(id);
        return res.json('Logout is successfully completed');
    }

    public async login(req:IRequestExtended, res:Response, next:NextFunction) {
        try {
            const { email, id, password: hashPassword } = req.user as IUser;
            const { password } = req.body;

            await emailService.sendMail(email, emailActionEnum.WELCOME, { userName: 'Nastya' });

            const isCorectPassword = await userService.compareUserPassword(password, hashPassword);

            if (!isCorectPassword) {
                next(new ErrorHendler('User not found', 404));
                return;
            }

            const { accessToken, refreshToken } = await tokenService
                .generateTokenPair({ userId: id, userEmail: email });
            await tokenService.saveToken(id, refreshToken, accessToken);

            res.cookie(
                'refreshToken',
                refreshToken,
                { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true },
            );

            res.json({
                accessToken,
                user: req.user,
            });
        } catch (e) {
            next(e);
        }
    }

    public async refresh(req:IRequestExtended, res:Response) {
        const { email, id } = req.user as IUser;

        const { refreshToken, accessToken } = await tokenService
            .generateTokenPair({ userId: id, userEmail: email });
        await tokenService.saveToken(id, refreshToken, accessToken);

        res.cookie(
            'refreshToken',
            refreshToken,
            { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true },
        );
        return res.json({
            refreshToken,
            accessToken,
        });
    }

    public async sendForgotPassword(req:IRequestExtended, res:Response, next:NextFunction) {
        try {
            const { email, id, firstName } = req.user as IUser;

            const token = await tokenService.generateActionToken({ userId: id, userEmail: email });

            console.log(token);
            await actionTokenRepository.createActionToken(
                { actionToken: token, type: ActionTokensTypes.forgotPassword, userId: id },
            );
            await emailService.sendMail(email, emailActionEnum.FORGOT_PASSWORD, { token, userName: firstName });

            res.sendStatus(201);
        } catch (e) {
            next(e);
        }
    }

    public async setPassword(req:IRequestExtended, res:Response, next:NextFunction) {
        try {
            const { id } = req.user as IUser;
            const actionToken = req.get(constans.AUTHORIZATION);

            await userRepository.updateUser(id, req.body);
            await actionTokenRepository.deleteByParams({ actionToken });

            // const token = await tokenService.generateActionToken({ userId: id, userEmail: email });
            // console.log(token);
            //
            // await actionTokenRepository.createActionToken(
            //     { actionToken: token, type: ActionTokensTypes.forgotPassword, userId: id },
            // );
            // await emailService.sendMail(email, emailActionEnum.FORGOT_PASSWORD, { token, userName: firstName });

            res.sendStatus(201);
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();
