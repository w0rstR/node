import { NextFunction, Request, Response } from 'express';
import { IRequestExtended, ITokenPayload } from '../interfaces';
import { tokenService, authService, userService } from '../services';
import { IUser } from '../entity/user';
import { ErrorHendler } from '../error/errorHendler';

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
        const { email, id, password: hashPassword } = req.user as IUser;
        const { password } = req.body;

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
}

export const authController = new AuthController();
