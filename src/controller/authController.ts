import { Request, Response } from 'express';
import { IRequestExtended } from '../interfaces/requestExtendedInterface';
import { tokenService, authService } from '../services';
import { IUser } from '../entity/user';
import { ITokenPayload } from '../interfaces/tokenInterfaces';

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

    public async login(req:Request, res:Response):Promise<Response<ITokenPayload>> {
        const { email, password } = req.body;
        const tokenPair = await authService.login(email, password);
        return res.json(tokenPair);
    }

    public async refresh(req:Request, res:Response):Promise<Response<ITokenPayload>> {
        const { refreshToken } = req.cookies;
        const payload = await authService.refresh(refreshToken);

        res.cookie(
            'refreshToken',
            payload.refreshToken,
            { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true },
        );
        return res.json(payload);
    }
}

export const authController = new AuthController();
