import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { authService } from '../services/authServices';
import { IRequestExtended } from '../interfaces/requestExtendedInterface';
import { tokenService } from '../services/tokenServices';
import { IUser } from '../entity/user';
import { userService } from '../services/userServices';

class AuthController {
    public async registration(req:Request, res:Response) {
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
        return res.json('Ok');
    }

    public async login(req:Request, res:Response) {
        const { email, password } = req.body;
        const userFromEmail = await userService.getUserByEmail(email);
        if (!userFromEmail) {
            throw new Error('This email not exists!');
        }
        const isPasswordCorrect = await bcrypt.compare(password, userFromEmail.password);
        if (!isPasswordCorrect) {
            throw new Error('This password is incorrect');
        }

        const tokenPair = await authService.login(userFromEmail);

        res.cookie(
            'refreshToken',
            tokenPair.refreshToken,
            { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true },
        );

        res.json('oke');
    }

    public async refresh(req:Request, res:Response) {
        const { refreshToken } = req.cookies;
        const payload = await authService.refresh(refreshToken);

        res.cookie(
            'refreshToken',
            payload.refreshToken,
            { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true },
        );
        res.json(payload);
    }
}

export const authController = new AuthController();
