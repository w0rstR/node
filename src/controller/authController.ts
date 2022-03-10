import { Request, Response } from 'express';
import { authService } from '../services/authServices';

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
}

export const authController = new AuthController();
